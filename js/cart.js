/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — Cart System
   ═══════════════════════════════════════════════ */

const Cart = (() => {
  let items = [];

  // ── Core Methods ──────────────────────────────
  const add = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return false;

    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty++;
    } else {
      items.push({ ...product, qty: 1 });
    }

    _sync();
    return product;
  };

  const remove = (productId) => {
    items = items.filter(i => i.id !== productId);
    _sync();
  };

  const changeQty = (productId, delta) => {
    const item = items.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) remove(productId);
    else _sync();
  };

  const clear = () => {
    items = [];
    _sync();
  };

  const getItems = () => [...items];

  const getTotal = () => items.reduce((sum, i) => sum + (i.price * i.qty), 0);

  const getCount = () => items.reduce((sum, i) => sum + i.qty, 0);

  // ── UI Sync ────────────────────────────────────
  const _sync = () => {
    const count = getCount();
    const badge = document.getElementById('cartBadge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  };

  return { add, remove, changeQty, clear, getItems, getTotal, getCount };
})();
