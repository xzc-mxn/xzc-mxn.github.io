/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — Webhook Notifications
   Discord Embed alerts for purchase events
   ═══════════════════════════════════════════════ */

const Webhook = (() => {

  /* ── ส่ง embed ไปยัง Discord Webhook URL ── */
  const send = async (url, payload) => {
    if (!url || url.includes('YOUR_WEBHOOK')) return; // ยังไม่ได้ตั้งค่า
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('[Webhook] ส่งไม่สำเร็จ:', e.message);
    }
  };

  /* ── แจ้งเตือนซื้อสินค้าสำเร็จ ── */
  const notifyPurchase = (order) => {
    const url = CONFIG?.webhooks?.purchase;
    if (!url) return;

    const product = StoreSystem.getProduct(order.productId);
    const thumbUrl = (product?.image && product.image.startsWith('http'))
      ? product.image
      : null;

    const payload = {
      username: CONFIG.site?.name || 'LUXURY HUB',
      avatar_url: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      embeds: [{
        title: '🛒 คำสั่งซื้อใหม่!',
        color: CONFIG.site?.color || 0xC9A055,
        fields: [
          { name: '👤 ผู้ซื้อ',     value: `\`${order.username}\``,      inline: true },
          { name: '📦 สินค้า',      value: `\`${order.productName}\``,   inline: true },
          { name: '💰 ราคา',        value: `\`฿${order.price}\``,        inline: true },
          { name: '🆔 Order ID',    value: `\`${order.id}\``,            inline: true },
          { name: '📂 หมวดหมู่',   value: `\`${product?.category || '-'}\``, inline: true },
          { name: '⏱ เวลา',        value: `<t:${Math.floor(order.createdAt/1000)}:R>`, inline: true }
        ],
        thumbnail: thumbUrl ? { url: thumbUrl } : undefined,
        footer: {
          text: CONFIG.site?.name + ' · ระบบแจ้งเตือนอัตโนมัติ'
        },
        timestamp: new Date(order.createdAt).toISOString()
      }]
    };

    send(url, payload);
  };

  /* ── แจ้งเตือนเติมเงิน (PromptPay / TrueMoney) ── */
  const notifyPaymentRequest = (entry) => {
    const url = CONFIG?.webhooks?.payment || CONFIG?.webhooks?.purchase;
    if (!url) return;

    const typeLabel = entry.type === 'promptpay' ? '📲 พร้อมเพย์' : '🧧 TrueMoney';
    const payload = {
      username: CONFIG.site?.name || 'LUXURY HUB',
      avatar_url: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      embeds: [{
        title: `${typeLabel} · คำขอเติมเงินใหม่`,
        color: 0x4FC3F7,
        fields: [
          { name: '👤 ผู้ใช้',        value: `\`${entry.username}\``,  inline: true },
          { name: '💳 วิธีชำระ',      value: `\`${entry.type}\``,      inline: true },
          { name: '💰 ยอดเงิน',       value: `\`฿${entry.amount}\``,  inline: true },
          { name: '🆔 Payment ID',    value: `\`${entry.id}\``,        inline: false },
          ...(entry.envelopeUrl ? [{ name: '🔗 ลิ้งก์ซอง', value: entry.envelopeUrl, inline: false }] : []),
          ...(entry.note ? [{ name: '📝 หมายเหตุ', value: entry.note, inline: false }] : [])
        ],
        footer: { text: CONFIG.site?.name + ' · รอแอดมินยืนยัน' },
        timestamp: new Date(entry.createdAt).toISOString()
      }]
    };

    send(url, payload);
  };

  return { notifyPurchase, notifyPaymentRequest };
})();
