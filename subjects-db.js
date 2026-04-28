// ═══════════════════════════ TCAS SUBJECTS DATABASE ═══════════════════════════
// Based on https://www.mytcas.com/blueprint/
// Exam dates: TGAT,TPAT2-5 = 30 Jan 2570 | TPAT1 = 13 Feb 2570 | A-Level = 13 Mar 2570

const TCAS_SUBJECTS = {
  // ─── TGAT (รหัส 91-93) ───
  tgat1: {
    id:'tgat1', group:'TGAT', name:'TGAT1 การสื่อสารภาษาอังกฤษ', code:'91',
    color:'#f59e0b', icon:'🌐', examDate:'2027-01-30', difficulty: 3,
    chapters: [
      'Reading Comprehension', 'Vocabulary in Context', 'Grammar & Usage',
      'Sentence Completion', 'Error Identification', 'Paragraph Organization'
    ]
  },
  tgat2: {
    id:'tgat2', group:'TGAT', name:'TGAT2 การคิดอย่างมีเหตุผล', code:'92',
    color:'#f59e0b', icon:'🧠', examDate:'2027-01-30', difficulty: 3,
    chapters: [
      'การคิดเชิงวิพากษ์', 'การคิดเชิงวิเคราะห์', 'การอ่านเชิงวิเคราะห์',
      'การใช้เหตุผลเชิงตรรกะ', 'การแก้ปัญหาเชิงสร้างสรรค์', 'การตัดสินใจ'
    ]
  },
  tgat3: {
    id:'tgat3', group:'TGAT', name:'TGAT3 สมรรถนะการทำงาน', code:'93',
    color:'#f59e0b', icon:'💼', examDate:'2027-01-30', difficulty: 2,
    chapters: [
      'การสร้างคุณค่าและนวัตกรรม', 'การแก้ไขปัญหาที่ซับซ้อน',
      'การบริหารจัดการอารมณ์', 'ภาวะผู้นำ', 'การทำงานร่วมกับผู้อื่น'
    ]
  },

  // ─── TPAT (รหัส 10-50) ───
  tpat1: {
    id:'tpat1', group:'TPAT', name:'TPAT1 วิชาเฉพาะ กสพท.', code:'10',
    color:'#ec4899', icon:'🏥', examDate:'2027-02-13', difficulty: 5,
    chapters: [
      'จริยธรรมทางการแพทย์', 'ทักษะการคิดเชิงวิเคราะห์', 'ความเชื่อมโยง (Connected)',
      'เชาวน์ปัญญา', 'จิตวิทยาการแพทย์', 'สถานการณ์จำลองทางการแพทย์'
    ]
  },
  tpat2: {
    id:'tpat2', group:'TPAT', name:'TPAT2 ศิลปกรรมศาสตร์', code:'20',
    color:'#8b5cf6', icon:'🎨', examDate:'2027-01-30', difficulty: 3,
    chapters: [
      'ทัศนศิลป์', 'ดนตรี', 'นาฏศิลป์', 'ศิลปะการแสดง',
      'ประวัติศาสตร์ศิลปะ', 'ความคิดสร้างสรรค์ทางศิลปะ'
    ]
  },
  tpat3: {
    id:'tpat3', group:'TPAT', name:'TPAT3 วิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์', code:'30',
    color:'#8b5cf6', icon:'🔧', examDate:'2027-01-30', difficulty: 4,
    chapters: [
      'มิติสัมพันธ์ (Spatial Reasoning)', 'การใช้เหตุผลเชิงกล (Mechanical)',
      'ฟิสิกส์พื้นฐาน', 'คณิตศาสตร์เชิงวิศวกรรม', 'การอ่านแบบเทคนิค',
      'วิเคราะห์แผนภาพวงจร', 'โจทย์บูรณาการ STEM'
    ]
  },
  tpat4: {
    id:'tpat4', group:'TPAT', name:'TPAT4 สถาปัตยกรรมศาสตร์', code:'40',
    color:'#8b5cf6', icon:'🏛️', examDate:'2027-01-30', difficulty: 4,
    chapters: [
      'ออกแบบ 2 มิติ', 'ออกแบบ 3 มิติ', 'มิติสัมพันธ์ทางสถาปัตย์',
      'ทฤษฎีสีและองค์ประกอบ', 'ประวัติศาสตร์สถาปัตยกรรม', 'การเขียนแบบ'
    ]
  },
  tpat5: {
    id:'tpat5', group:'TPAT', name:'TPAT5 ครุศาสตร์/ศึกษาศาสตร์', code:'50',
    color:'#8b5cf6', icon:'📚', examDate:'2027-01-30', difficulty: 3,
    chapters: [
      'ความรู้ทั่วไปทางการศึกษา', 'จิตวิทยาพัฒนาการ', 'การจัดการเรียนรู้',
      'คุณธรรมจริยธรรมวิชาชีพครู', 'การวัดและประเมินผล', 'ความถนัดทางวิชาชีพครู'
    ]
  },

  // ─── A-Level ───
  alv_math1: {
    id:'alv_math1', group:'A-Level', name:'A-Level คณิตศาสตร์ประยุกต์ 1', code:'61',
    color:'#3b82f6', icon:'📐', examDate:'2027-03-13', difficulty: 5,
    chapters: [
      'เซต', 'ตรรกศาสตร์', 'จำนวนจริง', 'ฟังก์ชัน', 'เรขาคณิตวิเคราะห์',
      'เมทริกซ์', 'เวกเตอร์', 'ลำดับและอนุกรม', 'แคลคูลัส',
      'สถิติ', 'ความน่าจะเป็น', 'จำนวนเชิงซ้อน'
    ]
  },
  alv_math2: {
    id:'alv_math2', group:'A-Level', name:'A-Level คณิตศาสตร์ประยุกต์ 2', code:'62',
    color:'#3b82f6', icon:'🔢', examDate:'2027-03-13', difficulty: 3,
    chapters: [
      'สถิติศาสตร์', 'การวิเคราะห์ข้อมูล', 'ความน่าจะเป็น',
      'การแจกแจงความน่าจะเป็น', 'ดัชนี', 'คณิตศาสตร์การเงิน'
    ]
  },
  alv_sci: {
    id:'alv_sci', group:'A-Level', name:'A-Level วิทยาศาสตร์ประยุกต์', code:'63',
    color:'#0d9488', icon:'🔬', examDate:'2027-03-13', difficulty: 3,
    chapters: [
      'กระบวนการทางวิทยาศาสตร์', 'ชีวิตกับสิ่งแวดล้อม', 'สารในชีวิตประจำวัน',
      'แรงและพลังงาน', 'โลกและอวกาศ', 'เทคโนโลยี'
    ]
  },
  alv_phy: {
    id:'alv_phy', group:'A-Level', name:'A-Level ฟิสิกส์', code:'64',
    color:'#0d9488', icon:'⚡', examDate:'2027-03-13', difficulty: 5,
    chapters: [
      'กลศาสตร์', 'แรงและกฎการเคลื่อนที่', 'งานและพลังงาน', 'โมเมนตัม',
      'การเคลื่อนที่แบบหมุน', 'สมบัติเชิงกลของสาร', 'คลื่น', 'เสียง',
      'แสงและทัศนอุปกรณ์', 'ไฟฟ้าสถิต', 'ไฟฟ้ากระแส', 'แม่เหล็กไฟฟ้า',
      'ฟิสิกส์อะตอม', 'ฟิสิกส์นิวเคลียร์'
    ]
  },
  alv_chem: {
    id:'alv_chem', group:'A-Level', name:'A-Level เคมี', code:'65',
    color:'#0d9488', icon:'🧪', examDate:'2027-03-13', difficulty: 5,
    chapters: [
      'โครงสร้างอะตอม', 'พันธะเคมี', 'สมบัติของธาตุ', 'ปริมาณสัมพันธ์',
      'ของแข็ง ของเหลว แก๊ส', 'อัตราการเกิดปฏิกิริยา', 'สมดุลเคมี',
      'กรด-เบส', 'ไฟฟ้าเคมี', 'เคมีอินทรีย์', 'พอลิเมอร์'
    ]
  },
  alv_bio: {
    id:'alv_bio', group:'A-Level', name:'A-Level ชีววิทยา', code:'66',
    color:'#0d9488', icon:'🧬', examDate:'2027-03-13', difficulty: 4,
    chapters: [
      'เซลล์', 'โครงสร้างและหน้าที่ของพืช', 'โครงสร้างและหน้าที่ของสัตว์',
      'พันธุศาสตร์', 'วิวัฒนาการ', 'นิเวศวิทยา', 'ความหลากหลายทางชีวภาพ',
      'เทคโนโลยีชีวภาพ'
    ]
  },
  alv_soc: {
    id:'alv_soc', group:'A-Level', name:'A-Level สังคมศึกษา', code:'70',
    color:'#f97316', icon:'🌍', examDate:'2027-03-13', difficulty: 3,
    chapters: [
      'ศาสนา ศีลธรรม จริยธรรม', 'หน้าที่พลเมือง', 'เศรษฐศาสตร์',
      'ประวัติศาสตร์ไทย', 'ประวัติศาสตร์สากล', 'ภูมิศาสตร์'
    ]
  },
  alv_thai: {
    id:'alv_thai', group:'A-Level', name:'A-Level ภาษาไทย', code:'81',
    color:'#f97316', icon:'📝', examDate:'2027-03-13', difficulty: 3,
    chapters: [
      'การอ่าน', 'การเขียน', 'หลักภาษา', 'วรรณคดีและวรรณกรรม',
      'การฟัง การดู การพูด', 'คำศัพท์และสำนวน'
    ]
  },
  alv_eng: {
    id:'alv_eng', group:'A-Level', name:'A-Level ภาษาอังกฤษ', code:'82',
    color:'#f97316', icon:'🔤', examDate:'2027-03-13', difficulty: 4,
    chapters: [
      'Listening & Speaking', 'Reading Comprehension', 'Writing',
      'Grammar & Structure', 'Vocabulary', 'Functional Language'
    ]
  }
};

// Group definitions for the selection UI
const SUBJECT_GROUPS = [
  { key: 'TGAT', label: 'TGAT (ความถนัดทั่วไป)', color: '#f59e0b', subjects: ['tgat1','tgat2','tgat3'] },
  { key: 'TPAT', label: 'TPAT (ความถนัดเฉพาะ)', color: '#8b5cf6', subjects: ['tpat1','tpat2','tpat3','tpat4','tpat5'] },
  { key: 'A-Level', label: 'A-Level', color: '#3b82f6', subjects: ['alv_math1','alv_math2','alv_sci','alv_phy','alv_chem','alv_bio','alv_soc','alv_thai','alv_eng'] }
];

// Estimated study hours per chapter based on difficulty
function getEstimatedHours(subjectId) {
  const s = TCAS_SUBJECTS[subjectId];
  if (!s) return 0;
  const hoursPerChapter = { 1: 3, 2: 5, 3: 7, 4: 10, 5: 14 };
  return s.chapters.length * (hoursPerChapter[s.difficulty] || 7);
}
