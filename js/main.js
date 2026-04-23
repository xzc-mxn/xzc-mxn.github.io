/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — Main Controller
   ═══════════════════════════════════════════════ */

// ── Product Renderer ───────────────────────────
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = list.map((p, i) => `
    <div class="product-card reveal delay-${((i % 4) + 1) * 100}">
      <div class="product-thumb">
        <span style="position:relative;z-index:1;">${p.emoji}</span>
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${
          p.badge === 'hot' ? '🔥 HOT' : p.badge === 'new' ? '✦ NEW' : '◆ SALE'
        }</span>` : ''}
      </div>
      <div class="product-body">
        <div class="product-cat">${CATEGORIES[p.category]}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">
            ${p.oldPrice ? `<span class="price-old">฿${p.oldPrice}</span>` : ''}
            <span class="price-current">฿${p.price}<span class="price-unit"> /ชิ้น</span></span>
          </div>
          <button class="add-to-cart" id="atcBtn-${p.id}" onclick="handleAddToCart(${p.id})">
            + เพิ่ม
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe new elements for scroll reveal
  ScrollReveal.init();
}

// ── Filter ─────────────────────────────────────
function filterProducts(cat, btn) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProducts(cat);
}

// ── Add to Cart ────────────────────────────────
function handleAddToCart(id) {
  const product = Cart.add(id);
  if (!product) return;

  const btn = document.getElementById(`atcBtn-${id}`);
  if (btn) {
    btn.classList.add('added');
    btn.textContent = '✓ เพิ่มแล้ว';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.textContent = '+ เพิ่ม';
    }, 2200);
  }

  Toast.show('✦', 'เพิ่มสินค้าแล้ว', product.name);
}

// ── Cart Modal ─────────────────────────────────
function openCartModal() {
  renderCartModal();
  Modal.open('cartModal');
}

function renderCartModal() {
  const items = Cart.getItems();
  const listEl = document.getElementById('cartList');
  const footerEl = document.getElementById('cartFooter');

  if (items.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <div class="empty-text">ตะกร้าว่างเปล่า</div>
      </div>`;
    footerEl.style.display = 'none';
    return;
  }

  listEl.innerHTML = `<div class="cart-list">${items.map(i => `
    <div class="cart-item">
      <div class="cart-item-emoji">${i.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${i.name}</div>
        <div class="cart-item-price">฿${i.price} × ${i.qty} = ฿${i.price * i.qty}</div>
      </div>
      <div class="qty-control">
        <button class="icon-btn" onclick="cartQty(${i.id},-1)">−</button>
        <span class="qty-val">${i.qty}</span>
        <button class="icon-btn" onclick="cartQty(${i.id},1)">+</button>
      </div>
      <button class="icon-btn danger" onclick="cartRemove(${i.id})">✕</button>
    </div>
  `).join('')}</div>`;

  document.getElementById('cartTotal').textContent = `฿${Cart.getTotal()}`;
  footerEl.style.display = 'block';
}

function cartQty(id, delta) { Cart.changeQty(id, delta); renderCartModal(); }
function cartRemove(id) {
  Cart.remove(id);
  renderCartModal();
  Toast.show('✕', 'นำออกแล้ว', 'ลบสินค้าออกจากตะกร้า');
}

// ── Checkout ───────────────────────────────────
function openCheckout() {
  Modal.close('cartModal');
  // populate totals
  document.getElementById('ckSubtotal').textContent = `฿${Cart.getTotal()}`;
  document.getElementById('ckTotal').textContent    = `฿${Cart.getTotal()}`;
  Modal.open('checkoutModal');
}

function completeOrder() {
  const user = document.getElementById('ckUserInput').value.trim();
  if (!user) {
    Toast.show('⚠', 'กรุณากรอกข้อมูล', 'ระบุอีเมลหรือ Discord ID ของคุณ');
    return;
  }

  const orderId = 'LXHB-' + Math.random().toString(36).substr(2, 8).toUpperCase();

  document.getElementById('ckContent').innerHTML = `
    <div class="success-screen">
      <div class="success-icon">✦</div>
      <div class="success-title">สั่งซื้อสำเร็จ</div>
      <div class="success-desc">
        สินค้าจะถูกส่งไปยัง Discord / อีเมลของคุณ<br>ภายใน 5 นาที — ขอบคุณที่ไว้วางใจ
      </div>
      <div class="order-id-box">ORDER : ${orderId}</div>
      <div style="margin-top:28px;">
        <button class="btn btn-gold" onclick="Modal.close('checkoutModal'); Cart.clear();">
          เสร็จสิ้น
        </button>
      </div>
    </div>
  `;

  // Mark step 3 done
  document.getElementById('ckStep3').classList.add('done');
  document.getElementById('ckStep3').classList.remove('active');
  document.getElementById('ckStep2').classList.add('done');
}

// ── Topup ──────────────────────────────────────
function processTopup() {
  const user = document.getElementById('topupUser').value.trim();
  if (!user) {
    Toast.show('⚠', 'กรุณากรอกข้อมูล', 'ระบุอีเมลหรือ Discord ID ของคุณ');
    return;
  }
  Toast.show('⏳', 'กำลังดำเนินการ', 'กำลังสร้างคำสั่งชำระเงิน...');
  setTimeout(() => Toast.show('✦', 'พร้อมชำระ', 'โปรดสแกน QR หรือทำตามขั้นตอนที่ปรากฏ'), 2000);
}

// ── Init ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  ScrollReveal.init();

  // Select default amount tile
  const defaultAmtBtn = document.querySelector('.amount-tile[data-default]');
  if (defaultAmtBtn) defaultAmtBtn.classList.add('active');

  // Select default pay tile
  const defaultPay = document.querySelector('.pay-tile[data-default]');
  if (defaultPay) defaultPay.classList.add('active');

  // Animate hero stats counter
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = Math.ceil(target / 60);
    const tick = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
      if (current >= target) clearInterval(tick);
    }, 20);
  });
});
