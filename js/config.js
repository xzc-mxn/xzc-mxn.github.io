/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — Site Configuration
   แก้ไขค่าต่าง ๆ ที่นี่เพียงที่เดียว
   ═══════════════════════════════════════════════ */

const CONFIG = {

  /* ──────────────────────────────────────────────
     🏦  บัญชีธนาคาร (Bank Account)
  ────────────────────────────────────────────── */
  bank: {
    name:          'ธนาคารออมสิน (GSB )',  // ชื่อธนาคาร
    account_name:  'นาย อัสดาฟี่ ศรีไสยเพชร',         // ชื่อเจ้าของบัญชี
    account_number: '020-3-9983081-7',            // หมายเลขบัญชี
    account_type:  ''                  // ประเภทบัญชี
  },

  /* ──────────────────────────────────────────────
     📱  พร้อมเพย์ (PromptPay)
  ────────────────────────────────────────────── */
  promptpay: {
    phone: '0952408955',   // หมายเลขโทรศัพท์ที่ผูกพร้อมเพย์
    name:  'นาย อัสดาฟี่ ศรีไสยเพชร'     // ชื่อที่แสดงบน QR
  },

  /* ──────────────────────────────────────────────
     🧧  ซองอั่งเปา TrueMoney Wallet
  ────────────────────────────────────────────── */
  truemoney: {
    phone: '0952408955',   // หมายเลขรับเงินซองอั่งเปา TrueMoney
    name:  'นาย อัสดาฟี่ ศรีไสยเพชร'     // ชื่อที่แสดง
  },

  /* ──────────────────────────────────────────────
     🔔  Discord Webhook Notifications
     วางลิ้งก์ Webhook ของ Discord Channel ที่นี่
     วิธีสร้าง: Channel Settings → Integrations → Webhooks → New Webhook → Copy URL
  ────────────────────────────────────────────── */
  webhooks: {
    purchase:  'https://discord.com/api/webhooks/1449804583638401190/o-rl-JBU1lFdWr6zLJmuce5Rlu62KW9ZyUYyZ-SMt3um78DIQlifwpYMjkbM3bV1uXd7',
    // payment:   '',   // uncommment เพื่อรับแจ้งเตือนเติมเงิน (แยก channel ได้)
    // admin:     '',   // uncommment เพื่อรับ alert admin events
  },

  /* ──────────────────────────────────────────────
     🌐  General Site Info
  ────────────────────────────────────────────── */
  site: {
    name:    'LUXURY HUB EVO',
    discord: 'https://discord.gg/yourinvite',  // ลิ้งก์ Discord Server
    color:   0xC9A055                           // สีทอง (สำหรับ Discord embed)
  }

};
