/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — Store System
   Stock, Inventory & Order Management
   ═══════════════════════════════════════════════ */

const StoreSystem = (() => {
  const KEY_PRODUCTS = 'lxh_products';
  const KEY_STOCK    = 'lxh_stock';     // { productId: [{content, delivered}] }
  const KEY_ORDERS   = 'lxh_orders';

  // ══════════════════════════════════════════════
  //  Products DB (extends PRODUCTS from product.js)
  // ══════════════════════════════════════════════
  const initProducts = () => {
    if (localStorage.getItem(KEY_PRODUCTS)) return;
    // Seed from product.js PRODUCTS constant
    const seeded = PRODUCTS.map(p => ({
      ...p,
      price: p.price,
      active: true,
      stockCount: 0   // default 0 = sold out until admin adds stock
    }));
    localStorage.setItem(KEY_PRODUCTS, JSON.stringify(seeded));
    // Seed empty stock
    const stock = {};
    PRODUCTS.forEach(p => { stock[p.id] = []; });
    localStorage.setItem(KEY_STOCK, JSON.stringify(stock));
  };

  const getProducts = () => {
    try { return JSON.parse(localStorage.getItem(KEY_PRODUCTS)) || []; } catch { return []; }
  };
  const saveProducts = (p) => localStorage.setItem(KEY_PRODUCTS, JSON.stringify(p));

  const getProduct = (id) => getProducts().find(p => p.id == id);

  const addProduct = (data) => {
    const products = getProducts();
    const id = Date.now();
    const newP = {
      id,
      name: data.name,
      category: data.category || 'other',
      emoji: data.emoji || '📦',
      price: Number(data.price) || 0,
      oldPrice: data.oldPrice ? Number(data.oldPrice) : null,
      badge: data.badge || null,
      desc: data.desc || '',
      active: true,
      stockCount: 0
    };
    products.push(newP);
    saveProducts(products);
    // Init empty stock
    const stock = getStock();
    stock[id] = [];
    saveStock(stock);
    return newP;
  };

  const updateProduct = (id, data) => {
    const products = getProducts();
    const idx = products.findIndex(p => p.id == id);
    if (idx === -1) return false;
    products[idx] = { ...products[idx], ...data };
    saveProducts(products);
    return true;
  };

  const deleteProduct = (id) => {
    let products = getProducts();
    products = products.filter(p => p.id != id);
    saveProducts(products);
    const stock = getStock();
    delete stock[id];
    saveStock(stock);
    return true;
  };

  // ══════════════════════════════════════════════
  //  Stock / Inventory
  // ══════════════════════════════════════════════
  const getStock = () => {
    try { return JSON.parse(localStorage.getItem(KEY_STOCK)) || {}; } catch { return {}; }
  };
  const saveStock = (s) => localStorage.setItem(KEY_STOCK, JSON.stringify(s));

  const getStockItems = (productId) => {
    const stock = getStock();
    return (stock[productId] || []).filter(s => !s.delivered);
  };

  const getStockCount = (productId) => getStockItems(productId).length;

  const addStockItem = (productId, content) => {
    const stock = getStock();
    if (!stock[productId]) stock[productId] = [];
    stock[productId].push({ id: Date.now() + Math.random(), content, delivered: false, addedAt: Date.now() });
    saveStock(stock);
    // Update product stockCount
    updateProduct(productId, { stockCount: getStockItems(productId).length });
    return true;
  };

  const addStockBulk = (productId, contents) => {
    contents.forEach(c => addStockItem(productId, c));
  };

  const removeStockItem = (productId, itemId) => {
    const stock = getStock();
    if (!stock[productId]) return;
    stock[productId] = stock[productId].filter(s => s.id != itemId);
    saveStock(stock);
    updateProduct(productId, { stockCount: getStockItems(productId).length });
  };

  // Deliver (pop) one item from stock
  const popStockItem = (productId) => {
    const stock = getStock();
    if (!stock[productId]) return null;
    const available = stock[productId].filter(s => !s.delivered);
    if (!available.length) return null;
    const item = available[0];
    // Mark as delivered
    const idx = stock[productId].findIndex(s => s.id === item.id);
    stock[productId][idx].delivered = true;
    stock[productId][idx].deliveredAt = Date.now();
    saveStock(stock);
    updateProduct(productId, { stockCount: getStockItems(productId).length });
    return item;
  };

  // ══════════════════════════════════════════════
  //  Orders
  // ══════════════════════════════════════════════
  const getOrders = () => {
    try { return JSON.parse(localStorage.getItem(KEY_ORDERS)) || []; } catch { return []; }
  };
  const saveOrders = (o) => localStorage.setItem(KEY_ORDERS, JSON.stringify(o));

  const getUserOrders = (username) => getOrders().filter(o => o.username === username);

  // ── Purchase flow ──────────────────────────────
  const purchase = (productId) => {
    const user = Auth.getCurrentUser();
    if (!user) return { ok: false, msg: 'กรุณาเข้าสู่ระบบก่อน' };

    const product = getProduct(productId);
    if (!product) return { ok: false, msg: 'ไม่พบสินค้า' };
    if (!product.active) return { ok: false, msg: 'สินค้านี้ไม่พร้อมขาย' };

    const stockItem = popStockItem(productId);
    if (!stockItem) return { ok: false, msg: 'สินค้าหมดแล้ว กรุณาติดต่อแอดมิน' };

    const userCredits = Auth.getUserCredits(user.username);
    if (userCredits < product.price) return { ok: false, msg: `เครดิตไม่พอ (มี ฿${userCredits} ต้องการ ฿${product.price})` };

    Auth.deductCredits(user.username, product.price);
    Auth.updateNavUI();

    const order = {
      id: 'ORD-' + Math.random().toString(36).substr(2,8).toUpperCase(),
      username: user.username,
      productId,
      productName: product.name,
      productEmoji: product.emoji,
      price: product.price,
      delivery: stockItem.content,
      createdAt: Date.now()
    };

    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);

    return { ok: true, order };
  };

  // ── Cart purchase ──────────────────────────────
  const purchaseCart = (cartItems) => {
    const user = Auth.getCurrentUser();
    if (!user) return { ok: false, msg: 'กรุณาเข้าสู่ระบบก่อน' };

    let total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    if (Auth.getUserCredits(user.username) < total) {
      return { ok: false, msg: `เครดิตไม่พอ (มี ฿${Auth.getUserCredits(user.username)} ต้องการ ฿${total})` };
    }

    const results = [];
    for (const item of cartItems) {
      for (let q = 0; q < item.qty; q++) {
        const r = purchase(item.id);
        if (!r.ok) return { ok: false, msg: r.msg };
        results.push(r.order);
      }
    }
    return { ok: true, orders: results };
  };

  return {
    initProducts,
    getProducts, getProduct, addProduct, updateProduct, deleteProduct,
    getStock, getStockItems, getStockCount, addStockItem, addStockBulk, removeStockItem,
    getOrders, getUserOrders,
    purchase, purchaseCart
  };
})();
