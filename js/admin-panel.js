/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — Admin Panel
   ═══════════════════════════════════════════════ */

const AdminPanel = (() => {

  // ══════════════════════════════════════════════
  //  Open / Close
  // ══════════════════════════════════════════════
  const open = () => {
    if (!Auth.isAdmin()) { Toast.show('⛔', 'ไม่มีสิทธิ์', 'เฉพาะ Admin เท่านั้น'); return; }
    render();
    document.getElementById('adminModal').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    document.getElementById('adminModal').classList.remove('open');
    document.body.style.overflow = '';
    // Refresh product grid
    if (typeof renderProducts === 'function') renderProducts();
  };

  // ══════════════════════════════════════════════
  //  Tab navigation
  // ══════════════════════════════════════════════
  const switchTab = (tab) => {
    document.querySelectorAll('.adm-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.adm-panel').forEach(p => p.style.display = 'none');
    document.getElementById(`admTab-${tab}`)?.classList.add('active');
    const panel = document.getElementById(`admPanel-${tab}`);
    if (panel) panel.style.display = 'block';
    renderTab(tab);
  };

  const renderTab = (tab) => {
    switch (tab) {
      case 'products':  renderProductsTab();  break;
      case 'stock':     renderStockTab();      break;
      case 'payments':  renderPaymentsTab();   break;
      case 'orders':    renderOrdersTab();     break;
      case 'users':     renderUsersTab();      break;
    }
  };

  // ══════════════════════════════════════════════
  //  Render main admin modal
  // ══════════════════════════════════════════════
  const render = () => {
    const body = document.getElementById('adminModalBody');
    body.innerHTML = `
      <div class="adm-tabs">
        <button class="adm-tab active" id="admTab-products" onclick="AdminPanel.switchTab('products')">📦 สินค้า</button>
        <button class="adm-tab" id="admTab-stock"    onclick="AdminPanel.switchTab('stock')">🗃 สต็อก</button>
        <button class="adm-tab" id="admTab-payments" onclick="AdminPanel.switchTab('payments')">💳 ชำระเงิน</button>
        <button class="adm-tab" id="admTab-orders"   onclick="AdminPanel.switchTab('orders')">📋 ออเดอร์</button>
        <button class="adm-tab" id="admTab-users"    onclick="AdminPanel.switchTab('users')">👥 ผู้ใช้</button>
      </div>
      <div id="admPanel-products" class="adm-panel"></div>
      <div id="admPanel-stock"    class="adm-panel" style="display:none"></div>
      <div id="admPanel-payments" class="adm-panel" style="display:none"></div>
      <div id="admPanel-orders"   class="adm-panel" style="display:none"></div>
      <div id="admPanel-users"    class="adm-panel" style="display:none"></div>
    `;
    renderTab('products');
  };

  // ══════════════════════════════════════════════
  //  Products Tab
  // ══════════════════════════════════════════════
  const renderProductsTab = () => {
    const el = document.getElementById('admPanel-products');
    const products = StoreSystem.getProducts();
    el.innerHTML = `
      <div class="adm-section-head">
        <span>จัดการสินค้า (${products.length} รายการ)</span>
        <button class="btn btn-gold" style="font-size:0.72rem;padding:8px 16px;" onclick="AdminPanel.showAddProduct()">+ เพิ่มสินค้า</button>
      </div>
      <div id="admAddProductForm" style="display:none;" class="adm-form-box">
        <div class="adm-form-title">➕ เพิ่มสินค้าใหม่</div>
        <div class="adm-grid-2">
          <div class="field-group"><label class="field-label">ชื่อสินค้า *</label><input class="field-input" id="apName" placeholder="ชื่อสินค้า"/></div>
          <div class="field-group"><label class="field-label">อีโมจิ</label><input class="field-input" id="apEmoji" placeholder="🎮" style="max-width:80px"/></div>
        </div>
        <div class="adm-grid-2">
          <div class="field-group"><label class="field-label">ราคา (฿) *</label><input class="field-input" id="apPrice" type="number" placeholder="0"/></div>
          <div class="field-group"><label class="field-label">ราคาเดิม (฿)</label><input class="field-input" id="apOldPrice" type="number" placeholder="ว่างเว้น = ไม่มี"/></div>
        </div>
        <div class="adm-grid-2">
          <div class="field-group"><label class="field-label">หมวดหมู่</label>
            <select class="field-select" id="apCategory">
              <option value="script">สคริปต์</option><option value="gui">GUI</option>
              <option value="account">บัญชี</option><option value="service">บริการ</option>
              <option value="other">อื่นๆ</option>
            </select>
          </div>
          <div class="field-group"><label class="field-label">Badge</label>
            <select class="field-select" id="apBadge">
              <option value="">ไม่มี</option><option value="hot">🔥 HOT</option>
              <option value="new">✦ NEW</option><option value="sale">◆ SALE</option>
            </select>
          </div>
        </div>
        <div class="field-group"><label class="field-label">รายละเอียด</label><textarea class="field-input" id="apDesc" rows="2" style="resize:vertical;"></textarea></div>
        <div style="display:flex;gap:10px;margin-top:12px;">
          <button class="btn btn-gold" onclick="AdminPanel.saveNewProduct()">💾 บันทึก</button>
          <button class="btn btn-ghost" onclick="AdminPanel.hideAddProduct()">ยกเลิก</button>
        </div>
      </div>
      <div class="adm-table-wrap">
        <table class="adm-table">
          <thead><tr><th>สินค้า</th><th>ราคา</th><th>หมวด</th><th>สต็อก</th><th>สถานะ</th><th>จัดการ</th></tr></thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td><span style="font-size:1.2rem;">${p.emoji}</span> ${p.name}</td>
                <td class="mono gold">฿${p.price}</td>
                <td><span class="adm-badge">${p.category}</span></td>
                <td>
                  <span class="${StoreSystem.getStockCount(p.id) > 0 ? 'adm-stock-ok' : 'adm-stock-empty'}">
                    ${StoreSystem.getStockCount(p.id)}
                  </span>
                </td>
                <td>
                  <label class="adm-toggle">
                    <input type="checkbox" ${p.active ? 'checked' : ''} onchange="AdminPanel.toggleProduct(${p.id}, this.checked)">
                    <span class="adm-toggle-slider"></span>
                  </label>
                </td>
                <td>
                  <button class="icon-btn" onclick="AdminPanel.editProduct(${p.id})" title="แก้ไข">✏️</button>
                  <button class="icon-btn danger" onclick="AdminPanel.deleteProduct(${p.id})" title="ลบ">🗑</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  };

  const showAddProduct = () => { document.getElementById('admAddProductForm').style.display = 'block'; };
  const hideAddProduct = () => { document.getElementById('admAddProductForm').style.display = 'none'; };

  const saveNewProduct = () => {
    const name  = document.getElementById('apName')?.value?.trim();
    const price = document.getElementById('apPrice')?.value;
    if (!name || !price) { Toast.show('⚠','กรอกข้อมูลให้ครบ','ชื่อสินค้าและราคาจำเป็นต้องกรอก'); return; }
    StoreSystem.addProduct({
      name, price: Number(price),
      oldPrice: document.getElementById('apOldPrice')?.value || null,
      emoji: document.getElementById('apEmoji')?.value || '📦',
      category: document.getElementById('apCategory')?.value || 'other',
      badge: document.getElementById('apBadge')?.value || null,
      desc: document.getElementById('apDesc')?.value || ''
    });
    Toast.show('✦','เพิ่มสินค้าแล้ว', name);
    renderProductsTab();
    hideAddProduct();
  };

  const toggleProduct = (id, active) => {
    StoreSystem.updateProduct(id, { active });
    Toast.show('✦', active ? 'เปิดขายแล้ว' : 'ปิดขายแล้ว', `สินค้า #${id}`);
  };

  const deleteProduct = (id) => {
    if (!confirm('ยืนยันลบสินค้านี้?')) return;
    StoreSystem.deleteProduct(id);
    Toast.show('✕','ลบสินค้าแล้ว','');
    renderProductsTab();
  };

  const editProduct = (id) => {
    const p = StoreSystem.getProduct(id);
    if (!p) return;
    const name     = prompt('ชื่อสินค้า:', p.name);
    if (name === null) return;
    const price    = prompt('ราคา (฿):', p.price);
    if (price === null) return;
    const desc     = prompt('รายละเอียด:', p.desc);
    StoreSystem.updateProduct(id, { name: name.trim(), price: Number(price), desc: desc || p.desc });
    Toast.show('✦','อัปเดตสินค้าแล้ว', name);
    renderProductsTab();
  };

  // ══════════════════════════════════════════════
  //  Stock Tab
  // ══════════════════════════════════════════════
  const renderStockTab = () => {
    const el = document.getElementById('admPanel-stock');
    const products = StoreSystem.getProducts();
    el.innerHTML = `
      <div class="adm-section-head"><span>จัดการสต็อกสินค้า</span></div>
      <div class="field-group" style="margin-bottom:16px;">
        <label class="field-label">เลือกสินค้า</label>
        <select class="field-select" id="stockProductSel" onchange="AdminPanel.loadStockItems()">
          <option value="">-- เลือกสินค้า --</option>
          ${products.map(p => `<option value="${p.id}">${p.emoji} ${p.name} (สต็อก: ${StoreSystem.getStockCount(p.id)})</option>`).join('')}
        </select>
      </div>
      <div id="stockItemsArea"></div>
    `;
  };

  const loadStockItems = () => {
    const pid = document.getElementById('stockProductSel')?.value;
    const area = document.getElementById('stockItemsArea');
    if (!pid || !area) return;

    const stock = StoreSystem.getStock();
    const all   = stock[pid] || [];
    const available = all.filter(s => !s.delivered);
    const delivered  = all.filter(s => s.delivered);

    area.innerHTML = `
      <div class="adm-form-box">
        <div class="adm-form-title">➕ เพิ่มสต็อก (กรอก 1 รายการต่อบรรทัด)</div>
        <div style="margin-bottom:8px;font-size:0.75rem;color:var(--muted);">
          ตัวอย่าง: User: player123 | Pass: secretpass123<br>
          หรือรหัสเกม/ลิ้งก์ใดก็ได้ตามต้องการ
        </div>
        <textarea class="field-input" id="stockBulkInput" rows="6" style="resize:vertical;font-family:var(--font-mono);font-size:0.82rem;"
          placeholder="User: player1&#10;Pass: pass1&#10;---&#10;User: player2&#10;Pass: pass2"></textarea>
        <div style="display:flex;gap:10px;margin-top:10px;align-items:center;">
          <button class="btn btn-gold" onclick="AdminPanel.addStockBulk('${pid}')">💾 เพิ่มสต็อก</button>
          <span style="font-size:0.75rem;color:var(--muted);">แยกแต่ละรายการด้วยบรรทัดว่าง หรือ "---"</span>
        </div>
      </div>

      <div class="adm-section-head" style="margin-top:20px;">
        <span>สต็อกที่พร้อมส่ง (${available.length} รายการ)</span>
      </div>
      ${available.length === 0 ? '<div class="adm-empty">ไม่มีสต็อก</div>' : `
        <div class="adm-table-wrap">
          <table class="adm-table">
            <thead><tr><th>#</th><th>เนื้อหา</th><th>เพิ่มเมื่อ</th><th>ลบ</th></tr></thead>
            <tbody>
              ${available.map((s,i) => `
                <tr>
                  <td class="mono">${i+1}</td>
                  <td><pre class="adm-content-pre">${escHtml(s.content)}</pre></td>
                  <td class="mono" style="font-size:0.7rem;">${new Date(s.addedAt).toLocaleString('th-TH')}</td>
                  <td><button class="icon-btn danger" onclick="AdminPanel.removeStock('${pid}','${s.id}')">✕</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}

      ${delivered.length ? `
        <div class="adm-section-head" style="margin-top:20px;">
          <span style="color:var(--muted);">ที่ส่งแล้ว (${delivered.length} รายการ)</span>
        </div>
        <div class="adm-table-wrap">
          <table class="adm-table" style="opacity:0.5;">
            <thead><tr><th>เนื้อหา</th><th>ส่งเมื่อ</th></tr></thead>
            <tbody>
              ${delivered.map(s => `
                <tr>
                  <td><pre class="adm-content-pre">${escHtml(s.content)}</pre></td>
                  <td class="mono" style="font-size:0.7rem;">${new Date(s.deliveredAt||s.addedAt).toLocaleString('th-TH')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}
    `;
  };

  const addStockBulk = (productId) => {
    const raw = document.getElementById('stockBulkInput')?.value || '';
    if (!raw.trim()) { Toast.show('⚠','ไม่มีข้อมูล','กรุณากรอกเนื้อหาสต็อก'); return; }
    // Split by blank line or ---
    const items = raw.split(/\n(?:---|\n)/g).map(s => s.trim()).filter(Boolean);
    if (!items.length) { Toast.show('⚠','ไม่มีข้อมูล','ไม่พบรายการ'); return; }
    StoreSystem.addStockBulk(productId, items);
    Toast.show('✦',`เพิ่มสต็อก ${items.length} รายการ`,'');
    document.getElementById('stockBulkInput').value = '';
    loadStockItems();
    renderStockTab(); // refresh dropdown
    // Re-select
    setTimeout(() => {
      const sel = document.getElementById('stockProductSel');
      if (sel) { sel.value = productId; loadStockItems(); }
    }, 50);
  };

  const removeStock = (productId, itemId) => {
    StoreSystem.removeStockItem(productId, itemId);
    Toast.show('✕','ลบสต็อกแล้ว','');
    loadStockItems();
  };

  // ══════════════════════════════════════════════
  //  Payments Tab
  // ══════════════════════════════════════════════
  const renderPaymentsTab = () => {
    const el = document.getElementById('admPanel-payments');
    const pending = PaymentSystem.getPending();
    const byStatus = (s) => pending.filter(p => p.status === s);

    el.innerHTML = `
      <div class="adm-section-head">
        <span>คำขอชำระเงิน</span>
        <button class="btn btn-ghost" style="font-size:0.72rem;padding:6px 14px;" onclick="AdminPanel.renderTab('payments')">🔄 รีเฟรช</button>
      </div>

      <div style="display:flex;gap:10px;margin-bottom:16px;flex-wrap:wrap;">
        <div class="adm-stat-box"><div class="adm-stat-n">${byStatus('pending').length}</div><div class="adm-stat-l">รอยืนยัน</div></div>
        <div class="adm-stat-box"><div class="adm-stat-n" style="color:var(--success)">${byStatus('approved').length}</div><div class="adm-stat-l">อนุมัติแล้ว</div></div>
        <div class="adm-stat-box"><div class="adm-stat-n" style="color:var(--danger)">${byStatus('rejected').length}</div><div class="adm-stat-l">ปฏิเสธ</div></div>
      </div>

      ${byStatus('pending').length === 0 ? '<div class="adm-empty">ไม่มีคำขอรอยืนยัน</div>' : ''}
      ${byStatus('pending').map(p => `
        <div class="adm-pay-card pending">
          <div class="adm-pay-head">
            <span class="mono">${p.id}</span>
            <span class="adm-badge-type ${p.type}">${p.type === 'promptpay' ? '📱 PromptPay' : '💚 TrueMoney'}</span>
          </div>
          <div class="adm-pay-info">
            <span>👤 ${p.username}</span>
            <span class="gold mono">฿${p.amount}</span>
            <span style="color:var(--muted);font-size:0.72rem;">${new Date(p.createdAt).toLocaleString('th-TH')}</span>
          </div>
          ${p.envelopeUrl ? `<div style="margin:6px 0;font-size:0.75rem;color:var(--info);">🔗 ${p.envelopeUrl}</div>` : ''}
          ${p.note ? `<div style="color:var(--muted);font-size:0.75rem;">📝 ${p.note}</div>` : ''}
          <div style="display:flex;gap:8px;margin-top:10px;">
            <button class="btn" style="background:var(--success);color:#000;padding:6px 16px;font-size:0.72rem;"
              onclick="AdminPanel.approvePayment('${p.id}')">✓ อนุมัติ ฿${p.amount}</button>
            <button class="btn btn-danger" style="padding:6px 16px;font-size:0.72rem;"
              onclick="AdminPanel.rejectPayment('${p.id}')">✕ ปฏิเสธ</button>
          </div>
        </div>
      `).join('')}

      ${byStatus('approved').length + byStatus('rejected').length > 0 ? `
        <div class="adm-section-head" style="margin-top:20px;">
          <span style="color:var(--muted);">ประวัติ</span>
        </div>
        <div class="adm-table-wrap">
          <table class="adm-table">
            <thead><tr><th>ID</th><th>ผู้ใช้</th><th>จำนวน</th><th>ประเภท</th><th>สถานะ</th></tr></thead>
            <tbody>
              ${[...byStatus('approved'),...byStatus('rejected')].reverse().slice(0,20).map(p => `
                <tr>
                  <td class="mono" style="font-size:0.7rem;">${p.id}</td>
                  <td>${p.username}</td>
                  <td class="gold mono">฿${p.amount}</td>
                  <td>${p.type}</td>
                  <td><span class="${p.status === 'approved' ? 'adm-stock-ok' : 'adm-stock-empty'}">${p.status === 'approved' ? '✓ อนุมัติ' : '✕ ปฏิเสธ'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}
    `;
  };

  const approvePayment = (id) => {
    PaymentSystem.updatePaymentStatus(id, 'approved');
    const p = PaymentSystem.getPending().find(x => x.id === id);
    Toast.show('✦','อนุมัติแล้ว', p ? `เติม ฿${p.amount} ให้ ${p.username}` : '');
    renderPaymentsTab();
  };
  const rejectPayment = (id) => {
    PaymentSystem.updatePaymentStatus(id, 'rejected');
    Toast.show('✕','ปฏิเสธแล้ว','');
    renderPaymentsTab();
  };

  // ══════════════════════════════════════════════
  //  Orders Tab
  // ══════════════════════════════════════════════
  const renderOrdersTab = () => {
    const el = document.getElementById('admPanel-orders');
    const orders = StoreSystem.getOrders().reverse().slice(0, 50);
    el.innerHTML = `
      <div class="adm-section-head"><span>ออเดอร์ทั้งหมด (${StoreSystem.getOrders().length})</span></div>
      ${orders.length === 0 ? '<div class="adm-empty">ยังไม่มีออเดอร์</div>' : `
        <div class="adm-table-wrap">
          <table class="adm-table">
            <thead><tr><th>ID</th><th>ผู้ใช้</th><th>สินค้า</th><th>ราคา</th><th>วันที่</th><th>ข้อมูล</th></tr></thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td class="mono" style="font-size:0.68rem;">${o.id}</td>
                  <td>${o.username}</td>
                  <td>${o.productEmoji} ${o.productName}</td>
                  <td class="gold mono">฿${o.price}</td>
                  <td class="mono" style="font-size:0.68rem;">${new Date(o.createdAt).toLocaleString('th-TH')}</td>
                  <td><button class="btn btn-ghost" style="padding:4px 10px;font-size:0.68rem;" onclick="AdminPanel.viewDelivery('${o.id}')">ดูข้อมูล</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;
  };

  const viewDelivery = (orderId) => {
    const order = StoreSystem.getOrders().find(o => o.id === orderId);
    if (!order) return;
    alert(`ORDER: ${order.id}\nผู้ใช้: ${order.username}\nสินค้า: ${order.productName}\n\n=== ข้อมูลที่ส่ง ===\n${order.delivery}`);
  };

  // ══════════════════════════════════════════════
  //  Users Tab
  // ══════════════════════════════════════════════
  const renderUsersTab = () => {
    const el = document.getElementById('admPanel-users');
    const users = Auth.getAllUsers();
    el.innerHTML = `
      <div class="adm-section-head"><span>ผู้ใช้ทั้งหมด (${users.length})</span></div>

      <div class="adm-form-box" style="margin-bottom:20px;">
        <div class="adm-form-title">💰 เสกเครดิต (Admin)</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;">
          <div class="field-group" style="margin:0;flex:1;min-width:140px;">
            <label class="field-label">ชื่อผู้ใช้</label>
            <input class="field-input" id="creditUsername" placeholder="username"/>
          </div>
          <div class="field-group" style="margin:0;flex:1;min-width:100px;">
            <label class="field-label">จำนวน (฿)</label>
            <input class="field-input" id="creditAmount" type="number" placeholder="0"/>
          </div>
          <button class="btn btn-gold" style="padding:10px 20px;font-size:0.78rem;" onclick="AdminPanel.giveCredit()">💰 เสกเครดิต</button>
          <button class="btn btn-danger" style="padding:10px 20px;font-size:0.78rem;" onclick="AdminPanel.deductCreditAdmin()">➖ หักเครดิต</button>
        </div>
      </div>

      <div class="adm-table-wrap">
        <table class="adm-table">
          <thead><tr><th>ชื่อผู้ใช้</th><th>เครดิต</th><th>บทบาท</th><th>ออเดอร์</th><th>สมัครเมื่อ</th></tr></thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td class="mono">${u.username}</td>
                <td class="gold mono">฿${u.credits || 0}</td>
                <td><span class="adm-badge ${u.isAdmin ? 'admin' : ''}">${u.isAdmin ? '👑 Admin' : '👤 User'}</span></td>
                <td>${StoreSystem.getOrders().filter(o => o.username === u.username).length}</td>
                <td class="mono" style="font-size:0.68rem;">${new Date(u.createdAt).toLocaleDateString('th-TH')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  };

  const giveCredit = () => {
    const username = document.getElementById('creditUsername')?.value?.trim();
    const amount   = Number(document.getElementById('creditAmount')?.value || 0);
    if (!username || amount <= 0) { Toast.show('⚠','กรอกข้อมูล','ระบุชื่อผู้ใช้และจำนวนเครดิต'); return; }
    const ok = Auth.addCredits(username, amount);
    if (!ok) { Toast.show('⚠','ไม่พบผู้ใช้',username); return; }
    Auth.updateNavUI();
    Toast.show('✦',`เสกเครดิต ฿${amount}`,`ให้ ${username} แล้ว`);
    renderUsersTab();
  };

  const deductCreditAdmin = () => {
    const username = document.getElementById('creditUsername')?.value?.trim();
    const amount   = Number(document.getElementById('creditAmount')?.value || 0);
    if (!username || amount <= 0) { Toast.show('⚠','กรอกข้อมูล',''); return; }
    Auth.deductCredits(username, amount);
    Auth.updateNavUI();
    Toast.show('✕',`หัก ฿${amount}`,`จาก ${username}`);
    renderUsersTab();
  };

  // ══════════════════════════════════════════════
  //  Helpers
  // ══════════════════════════════════════════════
  const escHtml = (str) => (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  return {
    open, close, render, switchTab, renderTab,
    showAddProduct, hideAddProduct, saveNewProduct, toggleProduct, deleteProduct, editProduct,
    loadStockItems, addStockBulk, removeStock,
    renderPaymentsTab, approvePayment, rejectPayment,
    viewDelivery,
    giveCredit, deductCreditAdmin
  };
})();
