/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — Products Data
   เพิ่ม image: URL รูปภาพสินค้า (หรือ path เช่น 'assets/products/blox.png')
   ถ้าไม่มีรูป ให้ใส่ '' หรือ null แล้ว emoji จะแสดงแทน
   ═══════════════════════════════════════════════ */

const PRODUCTS = [
  {
    id: 1,
    name: 'Blox Fruit Auto Farm',
    category: 'script',
    emoji: '🌊',
    image: 'https://assets.games.gg/Blox_Fruits_Cover_5a642274db.webp',    // ← ใส่ URL หรือ path รูปสินค้า
    price: 120,
    oldPrice: null,
    badge: 'hot',
    desc: 'ฟาร์มอัตโนมัติ รองรับทุก Sea, Auto Quest, Auto Devil Fruit และ Auto Raid'
  },
  {
    id: 2,
    name: 'Custom GUI By Luxury Teams',
    category: 'gui',
    emoji: '🐾',
    image: 'https://cdn.discordapp.com/attachments/935800897395626004/1497224105018130482/Screenshot_2024-11-28_143652.png?ex=69ecbe1b&is=69eb6c9b&hm=2857153e6dcffbbbf14ec78f5f85592a8bb1f2852ba8daf9920c09c4ecde7d0c',
    price: 459,
    oldPrice: 899,
    badge: 'hot',
    desc: 'GUI ฟังชั่นครบจบ Toggle, Button, Dropdown, Slider, Textbox'
  },
  {
    id: 3,
    name: 'Efootball Account',
    category: 'account',
    emoji: '💎',
    image: 'https://img.konami.com/efootball/s/img/main_page_1_sp.png?v=949',
    price: 499,
    oldPrice: 699,
    badge: 'new',
    desc: 'บัญชี Efootball มี Epic เยอะ สะอาด รับประกัน 30 วัน'
  },
  {
    id: 4,
    name: 'Script Optimize Service',
    category: 'service',
    emoji: '🔍',
    image: 'https://cdn.discordapp.com/attachments/935800897395626004/1497224915156205659/Screenshot_2023-07-09_164822.png?ex=69ecbedc&is=69eb6d5c&hm=33b6e8e10a76684b7e2568f792ed122bf240813eb1fee7f322409a23e94f4665',
    price: 299,
    oldPrice: null,
    badge: 'new',
    desc: 'ตรวจสอบสคริปต์ของคุณ Bug Fix, Optimize และ Clean Code'
  },
  {
    id: 5,
    name: 'Custom Script Build',
    category: 'service',
    emoji: '🛠️',
    image: 'https://cdn.discordapp.com/attachments/935800897395626004/1497224515527245967/image.png?ex=69ecbe7d&is=69eb6cfd&hm=78e62df2de3234a340ea4d0fad58b6ef08b5192d72f7cb4df818ff1f2198dae1',
    price: 1999,
    oldPrice: 4999,
    badge: null,
    desc: 'สร้างสคริปต์ตามสั่ง ออกแบบให้ตรงความต้องการของคุณโดยเฉพาะ'
  }
];

const CATEGORIES = {
  all: 'ทั้งหมด',
  script: 'สคริปต์',
  gui: 'GUI',
  account: 'บัญชี',
  service: 'บริการ'
};

/* ── Helper: แสดงรูปหรือ emoji ─────────────────
   ใช้ในทุก renderer เพื่อความสม่ำเสมอ
   ─────────────────────────────────────────── */
function productThumbHTML(p) {
  if (p.image) {
    return `<img
      src="${p.image}"
      alt="${p.name}"
      style="width:100%;height:100%;object-fit:contain;object-position:center center;position:absolute;inset:0;z-index:1;background:#0a0a14;"
      onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
    /><span class="product-emoji-fallback" style="display:none;position:absolute;z-index:2;font-size:3rem;inset:0;align-items:center;justify-content:center;">${p.emoji}</span>`;
  }
  return `<span style="position:relative;z-index:1;">${p.emoji}</span>`;
}
