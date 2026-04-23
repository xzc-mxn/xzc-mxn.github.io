/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — Payment System
   PromptPay QR + TrueMoney Wallet
   ═══════════════════════════════════════════════ */

const PaymentSystem = (() => {
  const PHONE       = '0952408955';
  const KEY_PENDING = 'lxh_pending_payments';

  // ══════════════════════════════════════════════
  //  PromptPay QR Generator (EMV QR Standard)
  // ══════════════════════════════════════════════
  const crc16 = (str) => {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= (str.charCodeAt(i) << 8);
      for (let j = 0; j < 8; j++) {
        crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  };

  const tlv = (tag, value) => {
    const len = value.length.toString().padStart(2, '0');
    return `${tag.toString().padStart(2, '0')}${len}${value}`;
  };

  const buildPromptPayPayload = (phone, amount) => {
    // Format: 0066xxxxxxxxx (remove leading 0, add 0066)
    const formatted = '0066' + phone.replace(/^0/, '');

    const merchantAcct = tlv('00', 'A000000677010111') + tlv('01', formatted);

    let payload =
      tlv('00', '01') +
      tlv('01', amount ? '12' : '11') +
      tlv('29', merchantAcct) +
      tlv('52', '0000') +
      tlv('53', '764') +
      (amount ? tlv('54', parseFloat(amount).toFixed(2)) : '') +
      tlv('58', 'TH') +
      tlv('59', 'LUXURYHUB') +
      tlv('60', 'BANGKOK') +
      '6304';

    return payload + crc16(payload);
  };

  const generateQR = (canvasId, amount) => {
    const payload = buildPromptPayPayload(PHONE, amount);
    const canvas  = document.getElementById(canvasId);
    if (!canvas || typeof QRCode === 'undefined') return payload;

    QRCode.toCanvas(canvas, payload, {
      width: 220,
      margin: 2,
      color: { dark: '#c9a055', light: '#0c0c16' }
    }, (err) => { if (err) console.error(err); });

    return payload;
  };

  // ══════════════════════════════════════════════
  //  Pending Payments DB
  // ══════════════════════════════════════════════
  const getPending = () => {
    try { return JSON.parse(localStorage.getItem(KEY_PENDING)) || []; } catch { return []; }
  };
  const savePending = (p) => localStorage.setItem(KEY_PENDING, JSON.stringify(p));

  const addPendingPayment = (type, data) => {
    const pending = getPending();
    const entry = {
      id: 'PAY-' + Math.random().toString(36).substr(2,8).toUpperCase(),
      type, // 'promptpay' | 'truemoney'
      username: Auth.getCurrentUser()?.username || 'guest',
      amount: data.amount,
      slipUrl: data.slipUrl || '',
      envelopeUrl: data.envelopeUrl || '',
      note: data.note || '',
      status: 'pending', // pending | approved | rejected
      createdAt: Date.now()
    };
    pending.push(entry);
    savePending(pending);
    return entry;
  };

  const updatePaymentStatus = (id, status) => {
    const pending = getPending();
    const p = pending.find(x => x.id === id);
    if (!p) return false;
    p.status = status;
    p.resolvedAt = Date.now();
    savePending(pending);
    if (status === 'approved') {
      Auth.addCredits(p.username, p.amount);
      Auth.updateNavUI();
    }
    return true;
  };

  // ══════════════════════════════════════════════
  //  Modal: PromptPay
  // ══════════════════════════════════════════════
  const openPromptPayModal = (amount) => {
    if (!Auth.isLoggedIn()) {
      Toast.show('⚠', 'กรุณาเข้าสู่ระบบ', 'ต้องเข้าสู่ระบบก่อนชำระเงิน');
      openAuthModal('login');
      return;
    }
    const amt = amount || document.getElementById('topupSelectedAmt')?.value || '';
    const modal = document.getElementById('promptpayModal');
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Set amount display
    const amtEl = document.getElementById('ppAmount');
    if (amtEl) amtEl.textContent = amt ? `฿${amt}` : 'ตามที่ต้องการ';

    // Generate QR
    setTimeout(() => generateQR('ppQRCanvas', amt), 100);

    // Store selected amount
    if (modal._selectedAmt !== undefined) modal._selectedAmt = amt;
    modal.dataset.amount = amt;
  };

  const submitPromptPaySlip = () => {
    const amount = document.getElementById('promptpayModal')?.dataset.amount || 0;
    const note   = document.getElementById('ppSlipNote')?.value?.trim() || '';
    if (!amount || Number(amount) <= 0) {
      Toast.show('⚠', 'ระบุจำนวนเงิน', 'กรุณาระบุจำนวนเงินที่โอน'); return;
    }
    const entry = addPendingPayment('promptpay', { amount: Number(amount), note });
    Toast.show('✦', 'ส่งคำขอแล้ว', `รหัส: ${entry.id} · รอแอดมินยืนยัน`);
    Modal.closeAll();
  };

  // ══════════════════════════════════════════════
  //  Modal: TrueMoney Wallet (อั่งเปา)
  // ══════════════════════════════════════════════
  const openTrueMoneyModal = () => {
    if (!Auth.isLoggedIn()) {
      Toast.show('⚠', 'กรุณาเข้าสู่ระบบ', 'ต้องเข้าสู่ระบบก่อนชำระเงิน');
      openAuthModal('login');
      return;
    }
    Modal.open('truemoneyModal');
  };

  const submitTrueMoneyEnvelope = () => {
    const url    = document.getElementById('tmEnvelopeUrl')?.value?.trim() || '';
    const amount = document.getElementById('tmAmount')?.value?.trim() || '';
    if (!url) { Toast.show('⚠', 'กรุณากรอกลิ้งก์', 'วางลิ้งก์ซองอั่งเปา TrueMoney'); return; }
    if (!amount || Number(amount) <= 0) { Toast.show('⚠', 'ระบุจำนวนเงิน', 'ระบุยอดเงินในซอง'); return; }
    if (!url.includes('gift.truemoney') && !url.includes('truemoney')) {
      Toast.show('⚠', 'ลิ้งก์ไม่ถูกต้อง', 'กรุณาวางลิ้งก์ซองอั่งเปา TrueMoney ที่ถูกต้อง'); return;
    }
    const entry = addPendingPayment('truemoney', { amount: Number(amount), envelopeUrl: url });
    document.getElementById('tmEnvelopeUrl').value = '';
    document.getElementById('tmAmount').value = '';
    Toast.show('✦', 'ส่งซองแล้ว', `รหัส: ${entry.id} · ระบบกำลังตรวจสอบ`);
    Modal.closeAll();
  };

  return {
    generateQR, buildPromptPayPayload,
    openPromptPayModal, submitPromptPaySlip,
    openTrueMoneyModal, submitTrueMoneyEnvelope,
    addPendingPayment, updatePaymentStatus,
    getPending, PHONE
  };
})();
