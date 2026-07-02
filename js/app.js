// ═══════════════════════════ TCAS SUBJECTS DATABASE ═══════════════════════════
// All data constants are frozen for immutability — edit the source, not at runtime.
const TCAS_SUBJECTS = Object.freeze({
  tgat1:{id:'tgat1',group:'TGAT',name:'TGAT1 การสื่อสารภาษาอังกฤษ',code:'91',color:'#f59e0b',icon:'🌐',examDate:'2027-01-30',difficulty:3,
    chapters:['Reading Comprehension','Vocabulary in Context','Grammar & Usage','Sentence Completion','Error Identification','Paragraph Organization']},
  tgat2:{id:'tgat2',group:'TGAT',name:'TGAT2 การคิดอย่างมีเหตุผล',code:'92',color:'#f59e0b',icon:'🧠',examDate:'2027-01-30',difficulty:3,
    chapters:['การคิดเชิงวิพากษ์','การคิดเชิงวิเคราะห์','การอ่านเชิงวิเคราะห์','การใช้เหตุผลเชิงตรรกะ','การแก้ปัญหาเชิงสร้างสรรค์','การตัดสินใจ']},
  tgat3:{id:'tgat3',group:'TGAT',name:'TGAT3 สมรรถนะการทำงาน',code:'93',color:'#f59e0b',icon:'💼',examDate:'2027-01-30',difficulty:2,
    chapters:['การสร้างคุณค่าและนวัตกรรม','การแก้ไขปัญหาที่ซับซ้อน','การบริหารจัดการอารมณ์','ภาวะผู้นำ','การทำงานร่วมกับผู้อื่น']},
  tpat1:{id:'tpat1',group:'TPAT',name:'TPAT1 กสพท.',code:'10',color:'#ec4899',icon:'🏥',examDate:'2027-02-13',difficulty:5,
    chapters:['จริยธรรมทางการแพทย์','ทักษะการคิดเชิงวิเคราะห์','ความเชื่อมโยง','เชาวน์ปัญญา','จิตวิทยาการแพทย์','สถานการณ์จำลอง']},
  tpat2:{id:'tpat2',group:'TPAT',name:'TPAT2 ศิลปกรรมศาสตร์',code:'20',color:'#8b5cf6',icon:'🎨',examDate:'2027-01-30',difficulty:3,
    chapters:['ทัศนศิลป์','ดนตรี','นาฏศิลป์','ศิลปะการแสดง','ประวัติศาสตร์ศิลปะ','ความคิดสร้างสรรค์']},
  tpat3:{id:'tpat3',group:'TPAT',name:'TPAT3 วิศวกรรมศาสตร์',code:'30',color:'#8b5cf6',icon:'🔧',examDate:'2027-01-30',difficulty:4,
    chapters:['มิติสัมพันธ์','การใช้เหตุผลเชิงกล','ฟิสิกส์พื้นฐาน','คณิตศาสตร์เชิงวิศวกรรม','การอ่านแบบเทคนิค','วิเคราะห์แผนภาพวงจร','โจทย์บูรณาการ STEM']},
  tpat4:{id:'tpat4',group:'TPAT',name:'TPAT4 สถาปัตยกรรม',code:'40',color:'#8b5cf6',icon:'🏛️',examDate:'2027-01-30',difficulty:4,
    chapters:['ออกแบบ 2 มิติ','ออกแบบ 3 มิติ','มิติสัมพันธ์ทางสถาปัตย์','ทฤษฎีสีและองค์ประกอบ','ประวัติศาสตร์สถาปัตยกรรม','การเขียนแบบ']},
  tpat5:{id:'tpat5',group:'TPAT',name:'TPAT5 ครุศาสตร์',code:'50',color:'#8b5cf6',icon:'📚',examDate:'2027-01-30',difficulty:3,
    chapters:['ความรู้ทั่วไปทางการศึกษา','จิตวิทยาพัฒนาการ','การจัดการเรียนรู้','คุณธรรมจริยธรรมวิชาชีพครู','การวัดและประเมินผล','ความถนัดทางวิชาชีพครู']},
  alv_math1:{id:'alv_math1',group:'A-Level',name:'A-Level คณิตศาสตร์ 1',code:'61',color:'#3b82f6',icon:'📐',examDate:'2027-03-13',difficulty:5,
    chapters:['เซต','ตรรกศาสตร์','จำนวนจริง','ฟังก์ชัน','เรขาคณิตวิเคราะห์','เมทริกซ์','เวกเตอร์','ลำดับและอนุกรม','แคลคูลัส','สถิติ','ความน่าจะเป็น','จำนวนเชิงซ้อน']},
  alv_math2:{id:'alv_math2',group:'A-Level',name:'A-Level คณิตศาสตร์ 2',code:'62',color:'#3b82f6',icon:'🔢',examDate:'2027-03-13',difficulty:3,
    chapters:['สถิติศาสตร์','การวิเคราะห์ข้อมูล','ความน่าจะเป็น','การแจกแจง','ดัชนี','คณิตศาสตร์การเงิน']},
  alv_sci:{id:'alv_sci',group:'A-Level',name:'A-Level วิทยาศาสตร์ประยุกต์',code:'63',color:'#0d9488',icon:'🔬',examDate:'2027-03-13',difficulty:3,
    chapters:['กระบวนการทางวิทยาศาสตร์','ชีวิตกับสิ่งแวดล้อม','สารในชีวิตประจำวัน','แรงและพลังงาน','โลกและอวกาศ','เทคโนโลยี']},
  alv_phy:{id:'alv_phy',group:'A-Level',name:'A-Level ฟิสิกส์',code:'64',color:'#0d9488',icon:'⚡',examDate:'2027-03-13',difficulty:5,
    chapters:['กลศาสตร์','แรงและกฎการเคลื่อนที่','งานและพลังงาน','โมเมนตัม','การเคลื่อนที่แบบหมุน','คลื่น','เสียง','แสงและทัศนอุปกรณ์','ไฟฟ้าสถิต','ไฟฟ้ากระแส','แม่เหล็กไฟฟ้า','ฟิสิกส์อะตอม','ฟิสิกส์นิวเคลียร์']},
  alv_chem:{id:'alv_chem',group:'A-Level',name:'A-Level เคมี',code:'65',color:'#0d9488',icon:'🧪',examDate:'2027-03-13',difficulty:5,
    chapters:['โครงสร้างอะตอม','พันธะเคมี','สมบัติของธาตุ','ปริมาณสัมพันธ์','ของแข็ง ของเหลว แก๊ส','อัตราการเกิดปฏิกิริยา','สมดุลเคมี','กรด-เบส','ไฟฟ้าเคมี','เคมีอินทรีย์','พอลิเมอร์']},
  alv_bio:{id:'alv_bio',group:'A-Level',name:'A-Level ชีววิทยา',code:'66',color:'#0d9488',icon:'🧬',examDate:'2027-03-13',difficulty:4,
    chapters:['เซลล์','โครงสร้างและหน้าที่ของพืช','โครงสร้างและหน้าที่ของสัตว์','พันธุศาสตร์','วิวัฒนาการ','นิเวศวิทยา','ความหลากหลายทางชีวภาพ','เทคโนโลยีชีวภาพ']},
  alv_soc:{id:'alv_soc',group:'A-Level',name:'A-Level สังคมศึกษา',code:'70',color:'#f97316',icon:'🌍',examDate:'2027-03-13',difficulty:3,
    chapters:['ศาสนา ศีลธรรม จริยธรรม','หน้าที่พลเมือง','เศรษฐศาสตร์','ประวัติศาสตร์ไทย','ประวัติศาสตร์สากล','ภูมิศาสตร์']},
  alv_thai:{id:'alv_thai',group:'A-Level',name:'A-Level ภาษาไทย',code:'81',color:'#f97316',icon:'📝',examDate:'2027-03-13',difficulty:3,
    chapters:['การอ่าน','การเขียน','หลักภาษา','วรรณคดีและวรรณกรรม','การฟัง การดู การพูด','คำศัพท์และสำนวน']},
  alv_eng:{id:'alv_eng',group:'A-Level',name:'A-Level ภาษาอังกฤษ',code:'82',color:'#f97316',icon:'🔤',examDate:'2027-03-13',difficulty:4,
    chapters:['Listening & Speaking','Reading Comprehension','Writing','Grammar & Structure','Vocabulary','Functional Language']}
});
const SUBJECT_GROUPS=Object.freeze([
  {key:'TGAT',label:'TGAT (ความถนัดทั่วไป)',color:'#f59e0b',subjects:['tgat1','tgat2','tgat3']},
  {key:'TPAT',label:'TPAT (ความถนัดเฉพาะ)',color:'#8b5cf6',subjects:['tpat1','tpat2','tpat3','tpat4','tpat5']},
  {key:'A-Level',label:'A-Level',color:'#3b82f6',subjects:['alv_math1','alv_math2','alv_sci','alv_phy','alv_chem','alv_bio','alv_soc','alv_thai','alv_eng']}
]);
const DEK_PLANS=Object.freeze({
  dek70:{key:'dek70',label:'Dek70',extraDays:0,color:'#f59e0b',desc:'Baseline เดิม',short:'เดิม'},
  dek71:{key:'dek71',label:'Dek71',extraDays:365,color:'#14b8a6',desc:'เพิ่มเวลาอีก 365 วันจาก Dek70',short:'+365d'},
  dek72:{key:'dek72',label:'Dek72',extraDays:730,color:'#60a5fa',desc:'เพิ่มเวลาอีก 730 วันจาก Dek70',short:'+730d'},
  dek73:{key:'dek73',label:'Dek73',extraDays:1095,color:'#a78bfa',desc:'เพิ่มเวลาอีก 1,095 วันจาก Dek70',short:'+1095d'}
});
function getEstimatedHours(sid){const s=TCAS_SUBJECTS[sid];if(!s)return 0;const h={1:3,2:5,3:7,4:10,5:14};return s.chapters.length*(h[s.difficulty]||7);}
function getSelectedSubjects(){return(data.selectedSubjects||[]).map(id=>TCAS_SUBJECTS[id]).filter(Boolean);}
function getActiveExams(){const subs=getSelectedSubjects();const map={};subs.forEach(s=>{map[s.id]={name:s.name,date:s.examDate,color:s.color};});return map;}
function getActiveSubjectsData(){const subs=getSelectedSubjects();const map={};subs.forEach(s=>{map[s.id]={name:s.name,color:s.color,chapters:s.chapters,icon:s.icon};});return map;}

const ACHIEVEMENTS_DEF=Object.freeze([
  {id:'first',icon:'🌱',name:'เริ่มต้นแล้ว!',desc:'บันทึกวันแรก',cond:s=>s.totalLogs>0},
  {id:'week1',icon:'🔥',name:'ติดต่อ 7 วัน',desc:'Streak 7 วัน',cond:s=>s.streak>=7},
  {id:'week4',icon:'💎',name:'มืออาชีพ',desc:'Streak 30 วัน',cond:s=>s.streak>=30},
  {id:'h50',icon:'⏰',name:'50 ชั่วโมง',desc:'อ่านรวม 50h',cond:s=>s.totalHours>=50},
  {id:'h200',icon:'🚀',name:'200 ชั่วโมง',desc:'อ่านรวม 200h',cond:s=>s.totalHours>=200},
  {id:'chapter10',icon:'📖',name:'นักอ่านตัวจริง',desc:'อ่านครบ 10 บท',cond:s=>s.chapsDone>=10},
  {id:'chapter30',icon:'🏆',name:'ครบทุกบท',desc:'อ่านครบ 30 บท',cond:s=>s.chapsDone>=30},
  {id:'all4',icon:'⭐',name:'นักเรียนรอบด้าน',desc:'เรียนครบทุกวิชาที่เลือก',cond:s=>s.subjTouched>=s.totalSubj},
]);

// Weekly plan template (จ-อา) — sessions ใช้ cls ของกลุ่มวิชา dynamic
const WEEK_PLAN=Object.freeze([
  {day:'จันทร์', target:4, sessions:[{cls:'tgat',label:'TGAT',h:'2h'},{cls:'tpat',label:'TPAT',h:'2h'}]},
  {day:'อังคาร', target:5, sessions:[{cls:'tgat',label:'A-Level วิทย์/คณิต',h:'3h'},{cls:'tpat',label:'TGAT',h:'2h'}]},
  {day:'พุธ',   target:4, sessions:[{cls:'tpat',label:'TPAT',h:'2h'},{cls:'tgat',label:'A-Level',h:'2h'}]},
  {day:'พฤหัส', target:5, sessions:[{cls:'tgat',label:'A-Level วิทย์/คณิต',h:'3h'},{cls:'tpat',label:'ทบทวน',h:'2h'}]},
  {day:'ศุกร์', target:3, sessions:[{cls:'review',label:'ทบทวนรวม',h:'3h'}]},
  {day:'เสาร์', target:6, sessions:[{cls:'mock',label:'ทำข้อสอบเก่า',h:'4h'},{cls:'tgat',label:'เสริมจุดอ่อน',h:'2h'}]},
  {day:'อาทิตย์',target:3, sessions:[{cls:'review',label:'พักผ่อน/ทบทวนเบาๆ',h:'2h'},{cls:'tgat',label:'วางแผนสัปดาห์',h:'1h'}]},
]);

let data = window.data || JSON.parse(localStorage.getItem('studypath')||'null') || {
  logs:[], chapters:{}, streak:0, bestStreak:0, lastStudyDate:null, pomoDone:0, dailyGoal:4,
  selectedSubjects:[], onboarded:false, dekPlan:'dek70', dailyGoalManual:false
};
Object.defineProperty(window, 'data', {get:()=>data,set:(v)=>{data=v;},configurable:true});

// ═══════════════════════════ STATE MANAGER ═══════════════════════════
// Debounced save:
// - เมื่อ login: save ลง Firebase อย่างเดียว (Firebase = source of truth)
// - เมื่อไม่ login: save ลง localStorage อย่างเดียว
let _saveTimer = null;
function saveLocalBackup(snapshot = data) {
  try {
    localStorage.setItem('studypath', JSON.stringify(snapshot));
  } catch(e) {
    console.error('Local save error:', e);
  }
}
function save() {
  if (_saveTimer) clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    saveLocalBackup(data);
    const user = window.currentUserFn ? window.currentUserFn() : null;
    if (user) {
      if (window.fbSave) window.fbSave(data);
    } else {
      saveLocalBackup(data);
    }
    _saveTimer = null;
  }, 300);
}
// Force immediate save (for critical moments like page unload)
function saveNow() {
  if (_saveTimer) { clearTimeout(_saveTimer); _saveTimer = null; }
  saveLocalBackup(data);
  const user = window.currentUserFn ? window.currentUserFn() : null;
  if (user) {
    if (window.fbSave) window.fbSave(data);
  } else {
    saveLocalBackup(data);
  }
}
window.addEventListener('beforeunload', saveNow);
window.addEventListener('pagehide', saveNow);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') saveNow();
});

// Simple render scheduler — batches multiple render calls into one rAF
const _pendingRenders = new Set();
let _renderScheduled = false;
function scheduleRender(...fns) {
  fns.forEach(fn => _pendingRenders.add(fn));
  if (!_renderScheduled) {
    _renderScheduled = true;
    requestAnimationFrame(() => {
      _pendingRenders.forEach(fn => fn());
      _pendingRenders.clear();
      _renderScheduled = false;
    });
  }
}

function ensureChapters(){if(!data.chapters)data.chapters={};(data.selectedSubjects||[]).forEach(id=>{if(!data.chapters[id])data.chapters[id]=[];});}
// Migrate old data: if user had subjects selected before onboarded flag existed
function migrateData(){
  let changed=false;
  if(!DEK_PLANS[data.dekPlan]){data.dekPlan='dek70';changed=true;}
  if(typeof data.dailyGoalManual!=='boolean'){data.dailyGoalManual=false;changed=true;}
  if(!data.onboarded&&(data.selectedSubjects||[]).length>0){data.onboarded=true;changed=true;}
  if(changed)save();
}


// ═══════════════════════════ NAV ═══════════════════════════
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  const pageEl=document.getElementById('page-'+id);
  if(pageEl)pageEl.classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t=>{
    if(t.getAttribute('onclick')===`showPage('${id}')`)t.classList.add('active');
  });
  // Sync bottom nav
  document.querySelectorAll('.bn-tab[data-page]').forEach(t=>t.classList.remove('active'));
  const mainPages=['dashboard','timer','log'];
  if(mainPages.includes(id)){
    const bnTab=document.querySelector(`.bn-tab[data-page="${id}"]`);
    if(bnTab)bnTab.classList.add('active');
  }else{
    // pages reached via "more" sheet → highlight more tab
    const moreTab=document.querySelector('.bn-tab[data-page="more"]');
    if(moreTab)moreTab.classList.add('active');
  }
  if(id==='analysis')renderAnalysis();
  if(id==='dashboard')renderDashboard();
  if(id==='select')renderSelectPage();
  if(id==='exams')renderExamPapers();
  window.scrollTo(0,0);
}

// ═══════════════════════════ COUNTDOWN ═══════════════════════════
function daysUntil(dateStr){
  const now=new Date();now.setHours(0,0,0,0);
  const target=parseLocalDate(dateStr);
  return Math.max(0,Math.ceil((target-now)/(1000*60*60*24)));
}

// กลุ่มวันสอบตาม TCAS จริง
const EXAM_GROUPS=[
  {key:'tgat',   label:'TGAT',       subLabel:'TGAT1·2·3',       date:'2027-01-30', color:'#f59e0b', icon:'🧠', ids:['tgat1','tgat2','tgat3']},
  {key:'tpat25', label:'TPAT 2–5',   subLabel:'ศิลปะ·วิศวะ·สถาปัตย์·ครู', date:'2027-01-30', color:'#8b5cf6', icon:'🎨', ids:['tpat2','tpat3','tpat4','tpat5']},
  {key:'tpat1',  label:'TPAT 1',     subLabel:'กสพท.',           date:'2027-02-13', color:'#ec4899', icon:'🏥', ids:['tpat1']},
  {key:'alevel', label:'A-Level',    subLabel:'คณิต·วิทย์·ภาษา', date:'2027-03-13', color:'#3b82f6', icon:'📐', ids:['alv_math1','alv_math2','alv_sci','alv_phy','alv_chem','alv_bio','alv_soc','alv_thai','alv_eng']},
];

function parseLocalDate(dateStr){
  const [y,m,d]=(dateStr||'').split('-').map(Number);
  return new Date(y||1970,(m||1)-1,d||1);
}
function startOfToday(){const d=new Date();d.setHours(0,0,0,0);return d;}
function addDays(date,days){const d=new Date(date);d.setDate(d.getDate()+days);return d;}
function toISODate(date){
  const y=date.getFullYear();
  const m=String(date.getMonth()+1).padStart(2,'0');
  const d=String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function formatThaiDate(input){
  const d=typeof input==='string'?parseLocalDate(input):input;
  return d.toLocaleDateString('th-TH',{day:'numeric',month:'short',year:'numeric'});
}
function formatHourValue(value){
  if(!Number.isFinite(value)||value<=0)return '0';
  const rounded=Math.round(value*10)/10;
  return Number.isInteger(rounded)?String(rounded):rounded.toFixed(1);
}
function formatPlanHour(value){
  if(!Number.isFinite(value)||value<=0)return '0.5h';
  const rounded=Math.max(0.5,Math.round(value*2)/2);
  return Number.isInteger(rounded)?`${rounded}h`:`${rounded.toFixed(1)}h`;
}
function formatHourRange(min,max){
  return `${formatHourValue(min)}–${formatHourValue(max)}`;
}
function getGoalDailyTarget(avgDailyHours){
  const base=Math.max(avgDailyHours||0,1);
  let min,max;
  if(base<=1.15){min=1;max=1;}
  else if(base<=1.5){min=1;max=1.5;}
  else if(base<=2){min=1.5;max=2;}
  else{
    min=Math.max(1,Math.floor(base*2)/2);
    max=Math.max(min,Math.ceil(base*2)/2);
    if(max===min)max=min+0.5;
  }
  const label=min===max?`${formatHourValue(min)} ชม./วัน`:`${formatHourValue(min)}-${formatHourValue(max)} ชม./วัน`;
  const weeklyMin=min*7;
  const weeklyMax=max*7;
  const weeklyLabel=min===max?`${formatHourValue(weeklyMin)} ชม./สัปดาห์`:`${formatHourValue(weeklyMin)}-${formatHourValue(weeklyMax)} ชม./สัปดาห์`;
  return{min,max,label,weeklyLabel};
}
function formatGoalHourRange(min,max){
  return getGoalDailyTarget((min+max)/2).label.replace(' ชม./วัน','');
}
function getDekKey(){return DEK_PLANS[data.dekPlan]?data.dekPlan:'dek70';}
function getDekPlan(key=getDekKey()){return DEK_PLANS[key]||DEK_PLANS.dek70;}
function getEarliestSelectedExamDate(){
  const dates=(data.selectedSubjects||[]).map(id=>TCAS_SUBJECTS[id]?.examDate).filter(Boolean).sort();
  return dates[0]||EXAM_GROUPS[0].date;
}
function getDekDaysForDate(dateStr,key=getDekKey()){
  const baseDays=daysUntil(dateStr);
  return Math.max(0,baseDays+getDekPlan(key).extraDays);
}
function getDekExamDate(dateStr,key=getDekKey()){
  return toISODate(addDays(startOfToday(),getDekDaysForDate(dateStr,key)));
}
function getDekIntensityFactor(key=getDekKey()){
  const baselineDays=Math.max(daysUntil(getEarliestSelectedExamDate()),1);
  return Math.max(1,getDekDaysForDate(getEarliestSelectedExamDate(),key)/baselineDays);
}
function getDekPlanMetrics(key=getDekKey()){
  const plan=getDekPlan(key);
  const activeKeys=(data.selectedSubjects||[]).filter(id=>TCAS_SUBJECTS[id]);
  const baseExamDate=getEarliestSelectedExamDate();
  const baselineDays=daysUntil(baseExamDate);
  const prepDays=getDekDaysForDate(baseExamDate,key);
  const startDate=toISODate(startOfToday());
  const examDate=getDekExamDate(baseExamDate,key);
  const targetTotal=activeKeys.reduce((sum,id)=>sum+getSubjTarget(id),0);
  const avgDailyHours=targetTotal?targetTotal/Math.max(prepDays,1):0;
  const intensityFactor=Math.max(1,prepDays/Math.max(baselineDays,1));
  return{plan,activeKeys,activeCount:activeKeys.length,baseExamDate,baselineDays,prepDays,startDate,examDate,targetTotal,avgDailyHours,intensityFactor};
}
function getAdjustedWeekPlan(){
  const intensityFactor=getDekIntensityFactor();
  return WEEK_PLAN.map(day=>({
    ...day,
    target:Math.max(1,Math.round((day.target/intensityFactor)*2)/2),
    sessions:day.sessions.map(s=>({...s,h:formatPlanHour(parseFloat(s.h)/intensityFactor)}))
  }));
}
function renderDekPicker(){
  const current=getDekKey();
  return`<div class="dek-picker" role="group" aria-label="เลือกรุ่น Dek">
    ${Object.values(DEK_PLANS).map(p=>`<button type="button" class="dek-btn ${current===p.key?'active':''}" onclick="setDekPlan('${p.key}')" style="--dek-color:${p.color}">
      <strong>${p.label}</strong><small>${p.short}</small>
    </button>`).join('')}
  </div>`;
}
function getDekSummaryHTML(){
  const m=getDekPlanMetrics();
  const dailyTarget=m.activeCount?getGoalDailyTarget(m.avgDailyHours):null;
  const avg=dailyTarget?dailyTarget.label:'เลือกวิชา';
  const totalDays=m.prepDays?`${m.prepDays} วัน`:'วันนี้';
  const note=m.activeCount
    ? `เป้าหมายรวม ${m.targetTotal}h เท่าเดิม · ${dailyTarget.weeklyLabel} · ${m.plan.desc}`
    : 'เลือกวิชาที่จะสอบเพื่อคำนวณเป้าหมายอ่านต่อวัน';
  return`<div class="card dek-card" style="margin-bottom:16px">
    <div class="dek-head">
      <div>
        <div class="card-title" style="color:${m.plan.color};margin-bottom:6px">แผนเตรียมสอบ</div>
        <div class="dek-title">${m.plan.label}</div>
        <div class="dek-subtitle">${note}</div>
      </div>
      ${renderDekPicker()}
    </div>
    <div class="dek-summary-grid">
      <div class="dek-stat"><span>รุ่น Dek</span><strong style="color:${m.plan.color}">${m.plan.label}</strong><em>${m.plan.extraDays?`+${m.plan.extraDays} วันจาก Dek70`:'Baseline เดิม'}</em></div>
      <div class="dek-stat"><span>วันเตรียมตัวทั้งหมด</span><strong>${totalDays}</strong><em>นับจากวันนี้</em></div>
      <div class="dek-stat"><span>เป้าหมายต่อวัน</span><strong>${avg}</strong><em>${dailyTarget?dailyTarget.weeklyLabel:'ตามเป้าหมายรวม'}</em></div>
      <div class="dek-stat"><span>วันที่เริ่ม</span><strong>${formatThaiDate(m.startDate)}</strong><em>เริ่มตามแผนนี้</em></div>
      <div class="dek-stat"><span>วันที่สอบ</span><strong>${formatThaiDate(m.examDate)}</strong><em>${m.plan.label==='Dek70'?'วันสอบเดิม':'วันสอบตามแผน'}</em></div>
      <div class="dek-stat"><span>เหลือถึงวันสอบ</span><strong>${m.prepDays} วัน</strong><em>จาก baseline ${m.baselineDays} วัน</em></div>
    </div>
  </div>`;
}
function renderPlanHoursRanges(){
  const intensityFactor=getDekIntensityFactor();
  const metrics=getDekPlanMetrics();
  const dailyTarget=metrics.activeCount?getGoalDailyTarget(metrics.avgDailyHours):null;
  const weekday=document.getElementById('weekday-hours-display');
  const weekend=document.getElementById('weekend-hours-display');
  const weekdayNote=document.getElementById('weekday-hours-note');
  const weekendNote=document.getElementById('weekend-hours-note');
  const weekdayLabel=dailyTarget?dailyTarget.label.replace(' ชม./วัน',''):formatGoalHourRange(4/intensityFactor,5/intensityFactor);
  const weekendMin=dailyTarget?Math.max(dailyTarget.max,1.5):6/intensityFactor;
  const weekendMax=dailyTarget?Math.max(dailyTarget.max+1,weekendMin):8/intensityFactor;
  const weekendLabel=formatGoalHourRange(weekendMin,weekendMax);
  if(weekday)weekday.innerHTML=`${weekdayLabel} <span style="font-size:16px;color:var(--text2)">ชั่วโมง/วัน</span>`;
  if(weekend)weekend.innerHTML=`${weekendLabel} <span style="font-size:16px;color:var(--text2)">ชั่วโมง/วัน</span>`;
  if(weekdayNote)weekdayNote.textContent=intensityFactor===1?'แบ่งเช้า 2h + เย็น/ดึก 2-3h':'แบ่งเป็นช่วงสั้น 1-2 รอบต่อวัน';
  if(weekendNote)weekendNote.textContent=intensityFactor===1?'เช้า 3h + บ่าย 3-5h':'เพิ่มเวลาทำโจทย์และทบทวนเบาๆ';
}
function renderDekSections(){
  const plan=getDekPlan();
  const selectBox=document.getElementById('select-dek-section');
  if(selectBox)selectBox.innerHTML=getDekSummaryHTML();
  ['dashboard-dek-summary','plan-dek-summary'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.innerHTML=getDekSummaryHTML();
  });
  const dashSub=document.getElementById('dashboard-subtitle');
  if(dashSub)dashSub.textContent=`ภาพรวม ${plan.label}`;
  const planSub=document.getElementById('plan-subtitle');
  if(planSub)planSub.textContent=`ตารางอ่านแบบ 7 วัน · ${plan.label}${plan.extraDays?` (+${plan.extraDays} วัน)`:''}`;
  renderPlanHoursRanges();
}
function setDekPlan(key){
  if(!DEK_PLANS[key])return;
  data.dekPlan=key;
  save();
  renderDekSections();
  renderCountdowns();
  renderWeekPlan();
  renderDashboard();
  if(document.getElementById('page-analysis')?.classList.contains('active'))renderAnalysis();
  showToast(`เปลี่ยนเป็น ${DEK_PLANS[key].label} แล้ว`);
}

function renderCountdowns(){
  const box=document.getElementById('countdown-dynamic');if(!box)return;
  const sel=data.selectedSubjects||[];
  if(!sel.length){box.innerHTML='<div style="color:var(--text3);font-size:13px;text-align:center;padding:20px;grid-column:1/-1">เลือกวิชาก่อนเพื่อดูนับถอยหลัง</div>';return;}

  // หา group ที่มีวิชาที่เลือกอยู่
  const activeGroups=EXAM_GROUPS.filter(g=>g.ids.some(id=>sel.includes(id)));
  if(!activeGroups.length){box.innerHTML='<div style="color:var(--text3);font-size:13px;text-align:center;padding:20px;grid-column:1/-1">เลือกวิชาก่อนเพื่อดูนับถอยหลัง</div>';return;}

  const plan=getDekPlan();
  box.innerHTML=activeGroups.map(g=>{
    const d=getDekDaysForDate(g.date);
    const thaiDate=formatThaiDate(getDekExamDate(g.date));
    const selectedInGroup=g.ids.filter(id=>sel.includes(id)).map(id=>TCAS_SUBJECTS[id]?.name.replace(/^(TGAT|TPAT\d*|A-Level)\s*/,'')||id);
    return`<div class="cd-card" style="border-top:2px solid ${g.color}">
      <div class="cd-subj" style="color:${g.color};font-size:13px;font-weight:700;margin-bottom:2px">${g.icon} ${g.label}</div>
      <div class="cd-days" style="color:${g.color};font-size:36px;font-weight:700;font-family:'DM Mono',monospace;line-height:1">${d===0?'วันนี้!':d}<span style="font-size:14px;font-weight:500;color:var(--text2);margin-left:4px">${d===0?'':'วัน'}</span></div>
      <div class="cd-date" style="margin-top:4px">${thaiDate} · ${plan.label}</div>
      <div style="margin-top:6px;font-size:10px;color:var(--text3);line-height:1.5">${selectedInGroup.join(' · ')}</div>
    </div>`;
  }).join('');
}

// ═══════════════════════════ STREAK ═══════════════════════════
function updateStreak(dateStr){
  const today=dateStr||new Date().toISOString().split('T')[0];
  if(data.lastStudyDate===today)return;
  const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
  const yStr=yesterday.toISOString().split('T')[0];
  if(data.lastStudyDate===yStr){data.streak++;} else if(data.lastStudyDate!==today){data.streak=1;}
  data.lastStudyDate=today;
  data.bestStreak=Math.max(data.bestStreak,data.streak);
  save();
}

// ═══════════════════════════ LOGS ═══════════════════════════
function addLog(){
  const date=document.getElementById('log-date').value;
  const subj=document.getElementById('log-subject').value;
  const hours=parseFloat(document.getElementById('log-hours').value)||0;
  const note=document.getElementById('log-note').value;
  if(!date||hours<=0||!subj||subj===''){showToast('กรุณากรอกข้อมูลให้ครบ');return;}
  data.logs.push({id:Date.now(),date,subj,hours,note});
  data.logs.sort((a,b)=>b.date.localeCompare(a.date));
  updateStreak(date);
  save(); scheduleRender(renderLog, renderDashboard); showToast('บันทึกแล้ว ✅');
  document.getElementById('log-hours').value='';
  document.getElementById('log-note').value='';
}
function deleteLog(id){
  data.logs=data.logs.filter(l=>l.id!==id); save(); scheduleRender(renderLog, renderDashboard); showToast('ลบแล้ว');
}
function renderLog(){
  const tbody=document.getElementById('log-tbody');
  if(!data.logs.length){tbody.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--text3);padding:20px">ยังไม่มีรายการ</td></tr>';return;}
  tbody.innerHTML=data.logs.map(l=>{
    const s=TCAS_SUBJECTS[l.subj];
    const color=s?s.color:'var(--text2)';
    const name=s?s.name:l.subj;
    return`<tr>
      <td style="font-family:'DM Mono',monospace;font-size:12px">${l.date}</td>
      <td><span class="badge" style="background:${color}20;color:${color}">${name}</span></td>
      <td style="font-family:'DM Mono',monospace">${l.hours}h</td>
      <td style="color:var(--text2)">${l.note||'—'}</td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteLog(${l.id})">ลบ</button></td>
    </tr>`;
  }).join('');
  renderLogChart();
}
function getHoursBySubj(){
  const h={};(data.selectedSubjects||[]).forEach(id=>h[id]=0);
  data.logs.forEach(l=>h[l.subj]=(h[l.subj]||0)+l.hours);return h;
}
function getHoursLast7(){
  const days=[];const today=new Date();
  for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);days.push(d.toISOString().split('T')[0]);}
  return days.map(d=>({date:d,hours:data.logs.filter(l=>l.date===d).reduce((a,b)=>a+b.hours,0)}));
}
let weekChart,logWeekChart,subjectChart,dailyChart,planVsChart;

// ═══════════════════════════ QUICK ADD ═══════════════════════════
let qaSelectedSubj='';
function renderQuickAddChips(){
  const box=document.getElementById('qa-subjects');if(!box)return;
  const subs=getSelectedSubjects();
  if(!subs.length){box.innerHTML='<span style="font-size:12px;color:var(--text3)">เลือกวิชาก่อน</span>';return;}
  qaSelectedSubj=subs[0].id;
  box.innerHTML=subs.map((s,i)=>`<button class="qa-chip ${i===0?'active':''}" data-subj="${s.id}" onclick="qaSelectSubj(this)" style="--chip-color:${s.color}">${s.icon} ${s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')}</button>`).join('');
}
function qaSelectSubj(btn){
  document.querySelectorAll('#qa-subjects .qa-chip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');qaSelectedSubj=btn.dataset.subj;
}
function qaAddTime(hours){
  const today=new Date().toISOString().split('T')[0];
  const s=TCAS_SUBJECTS[qaSelectedSubj];if(!s)return;
  data.logs.push({id:Date.now(),date:today,subj:qaSelectedSubj,hours,note:'Quick Add ⚡',source:'quick'});
  data.logs.sort((a,b)=>b.date.localeCompare(a.date));
  updateStreak(today);save(); scheduleRender(renderDashboard, renderLog);
  const fb=document.getElementById('qa-feedback');
  fb.textContent=`✅ บันทึกแล้ว! ${s.name} +${hours}h`;
  fb.style.opacity='1';setTimeout(()=>fb.style.opacity='0',2000);
  showToast(`⚡ ${s.name} +${hours}h`);
}
// ═══════════════════════════ FAB ═══════════════════════════
function toggleFabMenu(){
  const btn=document.getElementById('fab-btn'),menu=document.getElementById('fab-menu');
  btn.classList.toggle('open');menu.classList.toggle('show');
}
function renderFabMenu(){
  const box=document.getElementById('fab-menu');if(!box)return;
  const subs=getSelectedSubjects().slice(0,4);
  box.innerHTML=subs.map(s=>`<button class="fab-option" onclick="fabQuickAdd('${s.id}',1)" style="--c:${s.color}">${s.icon} ${s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')} +1h</button>`).join('')
    +`<button class="fab-option" onclick="showPage('timer')" style="--c:var(--coral)">🍅 Timer</button>`;
}
function fabQuickAdd(subj,hours){
  const today=new Date().toISOString().split('T')[0];
  const s=TCAS_SUBJECTS[subj];if(!s)return;
  data.logs.push({id:Date.now(),date:today,subj,hours,note:'Quick Add 📱',source:'quick'});
  data.logs.sort((a,b)=>b.date.localeCompare(a.date));
  updateStreak(today);save(); scheduleRender(renderDashboard, renderLog);
  toggleFabMenu();showToast(`⚡ ${s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')} +${hours}h`);
}
// ═══════════════════════════ DAILY GOAL ═══════════════════════════
function getSuggestedDailyGoal(){
  if(getDekKey()==='dek70')return data.dailyGoal||4;
  const avg=getDekPlanMetrics().avgDailyHours;
  if(!avg)return data.dailyGoal||1;
  return Math.min(10,getGoalDailyTarget(avg).min);
}
function getCurrentDailyGoal(){
  return data.dailyGoalManual?(data.dailyGoal||4):getSuggestedDailyGoal();
}
function setDailyGoal(val){
  data.dailyGoal=parseFloat(val);
  data.dailyGoalManual=true;
  document.getElementById('daily-goal-val').textContent=val+'h';
  save();renderDailyRing();
}
function getTodayHours(){
  const today=new Date().toISOString().split('T')[0];
  return data.logs.filter(l=>l.date===today).reduce((a,b)=>a+b.hours,0);
}
function renderDailyRing(){
  const goal=getCurrentDailyGoal();
  const done=getTodayHours();
  const pct=Math.min(done/goal,1);
  const circ=2*Math.PI*56;
  const ring=document.getElementById('daily-ring-progress');
  ring.style.strokeDashoffset=circ*(1-pct);
  // Color: red(<30%) → amber(30-70%) → green(>70%)
  ring.style.stroke=pct>=.7?'var(--green)':pct>=.3?'var(--amber)':'var(--red)';
  document.getElementById('daily-ring-pct').textContent=Math.round(pct*100)+'%';
  document.getElementById('daily-ring-pct').style.color=pct>=.7?'var(--green2)':pct>=.3?'var(--amber)':'var(--red2)';
  document.getElementById('daily-goal-display').textContent=`${done.toFixed(1)} / ${goal}h`;
  const slider=document.getElementById('daily-goal-slider');
  if(slider)slider.value=goal;
  const valEl=document.getElementById('daily-goal-val');
  if(valEl)valEl.textContent=goal+'h';
}

function getFocusSubjectItem(){
  const activeSubs=getActiveSubjectsData();
  const keys=Object.keys(activeSubs);
  if(!keys.length)return null;
  const hoursBySubj=getHoursBySubj();
  const totalHours=Object.values(hoursBySubj).reduce((a,b)=>a+b,0);
  const equalShare=1/keys.length;
  return keys.map(k=>{
    const s=activeSubs[k];
    const tcas=TCAS_SUBJECTS[k];
    const doneChapters=(data.chapters[k]||[]).length;
    const totalChapters=s.chapters.length||1;
    const actualShare=totalHours?(hoursBySubj[k]||0)/totalHours:0;
    const shareGap=Math.max(0,equalShare-actualShare);
    const chapterGap=1-(doneChapters/totalChapters);
    const examDays=tcas?getDekDaysForDate(tcas.examDate)||1:365;
    const score=(shareGap*2)+chapterGap+(45/Math.max(examDays,1));
    return{key:k,s,doneChapters,totalChapters,examDays,score};
  }).sort((a,b)=>b.score-a.score)[0];
}

function getNextChapterForSubject(key){
  const s=TCAS_SUBJECTS[key];
  if(!s)return null;
  const done=data.chapters[key]||[];
  const idx=s.chapters.findIndex((_,i)=>!done.includes(i));
  if(idx<0)return null;
  return{index:idx,title:s.chapters[idx]};
}

// ─── Today Focus selected subject (can override auto suggestion) ───
let focusOverrideSubj = null;

function renderTodayFocus(){
  const box=document.getElementById('today-focus-card');
  if(!box)return;
  const item=getFocusSubjectItem();
  if(!item){
    box.innerHTML=`<div class="card focus-card">
      <div class="focus-layout">
        <div class="focus-main">
          <div class="focus-kicker">แผนวันนี้</div>
          <div class="focus-title">เลือกวิชาที่จะสอบก่อน</div>
          <div class="focus-meta">ระบบจะจัดวิชาเร่งด่วน บทถัดไป และเป้าชั่วโมงรายวันให้จากวิชาที่เลือก</div>
          <div class="focus-actions"><button class="focus-action primary" onclick="showPage('select')">เลือกวิชา</button></div>
        </div>
      </div>
    </div>`;
    focusOverrideSubj=null;
    return;
  }
  const subs=getSelectedSubjects();
  // Validate override still exists
  if(focusOverrideSubj&&!subs.find(s=>s.id===focusOverrideSubj))focusOverrideSubj=null;
  const activeKey=focusOverrideSubj||item.key;
  const activeSubj=TCAS_SUBJECTS[activeKey];
  if(!activeSubj)return;

  const goal=getCurrentDailyGoal();
  const done=getTodayHours();
  const remaining=Math.max(0,goal-done);
  const nextChapter=getNextChapterForSubject(activeKey);
  const name=activeSubj.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'');
  const chapterText=nextChapter?nextChapter.title:'ทบทวนข้อสอบเก่า';
  const remainText=remaining>0?`${formatHourValue(remaining)}h`:'ครบแล้ว';
  const doneChapters=(data.chapters[activeKey]||[]).length;
  const totalChapters=(getActiveSubjectsData()[activeKey]||{chapters:[]}).chapters.length||1;
  const examDays=getDekDaysForDate(activeSubj.examDate)||'—';

  // Subject picker chips
  const chipsHtml=subs.map(s=>{
    const isActive=s.id===activeKey;
    return`<button class="focus-subj-chip ${isActive?'active':''}" style="--chip-color:${s.color}" onclick="focusSelectSubj('${s.id}')" title="${s.name}">${s.icon} ${s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')}</button>`;
  }).join('');

  box.innerHTML=`<div class="card focus-card">
    <div class="focus-layout">
      <div class="focus-main">
        <div class="focus-kicker" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
          <span>แผนวันนี้</span>
          <span style="font-size:10px;color:var(--text3);font-weight:400">${focusOverrideSubj?'(เลือกเอง)':'(แนะนำ)'}</span>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin:6px 0 8px" id="focus-subj-chips">${chipsHtml}</div>
        <div class="focus-title" style="color:${activeSubj.color}">${name}</div>
        <div class="focus-meta">บทถัดไป: ${chapterText}</div>
        <div class="focus-actions">
          <button class="focus-action primary" onclick="startFocusTimer('${activeKey}')">จับเวลา</button>
          <button class="focus-action" onclick="quickAddFocus('${activeKey}',0.5)">+30m</button>
          <button class="focus-action" onclick="quickAddFocus('${activeKey}',1)">+1h</button>
          <button class="focus-action" onclick="quickAddFocus('${activeKey}',1.5)">+1.5h</button>
        </div>
      </div>
      <div class="focus-side">
        <div class="focus-stat"><span>เหลือวันนี้</span><strong>${remainText}</strong><em>${done.toFixed(1)} / ${goal}h</em></div>
        <div class="focus-stat"><span>บทเรียน</span><strong>${doneChapters}/${totalChapters}</strong><em>${Math.round(doneChapters/totalChapters*100)}%</em></div>
        <div class="focus-stat"><span>วันสอบ</span><strong>${examDays}</strong><em>วัน</em></div>
        <div class="focus-stat"><span>แผน</span><strong>${getDekPlan().label}</strong><em>${getDekPlan().short}</em></div>
      </div>
    </div>
  </div>`;
}

function focusSelectSubj(subjId){
  focusOverrideSubj=(focusOverrideSubj===subjId)?null:subjId;
  renderTodayFocus();
}

function quickAddFocus(subj,hours){
  const today=new Date().toISOString().split('T')[0];
  const s=TCAS_SUBJECTS[subj];if(!s)return;
  data.logs.push({id:Date.now(),date:today,subj,hours,note:'Today Focus',source:'focus'});
  data.logs.sort((a,b)=>b.date.localeCompare(a.date));
  updateStreak(today);save();scheduleRender(renderDashboard,renderLog);
  showToast(`${s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')} +${hours}h`);
}

function startFocusTimer(subj){
  const timerSelect=document.getElementById('timer-subject');
  if(timerSelect)timerSelect.value=subj;
  showPage('timer');
}
// ═══════════════════════════ HIGHLIGHTS ═══════════════════════════
function renderHighlights(){
  const activeSubs=getActiveSubjectsData();
  const nameMap={};Object.entries(activeSubs).forEach(([k,s])=>nameMap[k]=s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,''));
  // Best day
  const dayMap={};
  data.logs.forEach(l=>{dayMap[l.date]=(dayMap[l.date]||0)+l.hours;});
  const days=Object.entries(dayMap);
  if(days.length){
    days.sort((a,b)=>b[1]-a[1]);
    const best=days[0];
    const dt=new Date(best[0]);
    const dayNames=['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'];
    document.getElementById('best-day-text').textContent=dayNames[dt.getDay()]+' '+dt.getDate()+'/'+(dt.getMonth()+1);
    document.getElementById('best-day-sub').textContent=best[1].toFixed(1)+' ชั่วโมง';
  }
  // Weakest subject
  const subj=getHoursBySubj();const total=Object.values(subj).reduce((a,b)=>a+b,0)||1;
  const activeKeys=Object.keys(activeSubs);
  const equalShare=activeKeys.length?1/activeKeys.length:0.25;
  const targets={};activeKeys.forEach(k=>targets[k]=equalShare);
  let weakest=null,maxDiff=0;
  activeKeys.forEach(k=>{
    const diff=(targets[k]||0)-(subj[k]||0)/total;
    if(diff>maxDiff){maxDiff=diff;weakest=k;}
  });
  if(weakest&&maxDiff>0.05){
    document.getElementById('weak-subj-text').textContent=nameMap[weakest]||weakest;
    document.getElementById('weak-subj-sub').textContent=`เป้า ${Math.round((targets[weakest]||0)*100)}% — ทำได้ ${Math.round((subj[weakest]||0)/total*100)}%`;
  }else{
    document.getElementById('weak-subj-text').textContent='สมดุลดี ✅';
    document.getElementById('weak-subj-sub').textContent='ทุกวิชาอยู่ในเกณฑ์';
  }
}

function renderDashboard(){
  renderDekSections();
  renderCountdowns();
  renderTodayFocus();
  const total=data.logs.reduce((a,b)=>a+b.hours,0);
  // Streak with fire animation
  const streakEl=document.getElementById('dash-streak');
  streakEl.innerHTML=data.streak+(data.streak>=3?' <span class="streak-fire" style="font-size:20px">🔥</span>':'');
  document.getElementById('dash-total-hours').textContent=total.toFixed(1);
  const days=new Set(data.logs.map(l=>l.date)).size;
  document.getElementById('dash-avg').textContent=days?+(total/days).toFixed(1):0;
  const chapsDone=Object.values(data.chapters).reduce((a,b)=>a+b.length,0);
  document.getElementById('dash-chapters').textContent=chapsDone;

  // progress per subject (dynamic)
  const SUBJECTS_DATA_DASH=getActiveSubjectsData();
  const progContainer=document.getElementById('dash-progress-container');
  if(progContainer){
    progContainer.innerHTML=Object.entries(SUBJECTS_DATA_DASH).map(([k,s])=>{
      const done=(data.chapters[k]||[]).length;
      const total=s.chapters.length;
      const pct=total?Math.round(done/total*100):0;
      return`<div class="subj-progress">
        <div class="subj-header">
          <span class="subj-name" style="color:${s.color}">${s.icon} ${s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')}</span>
          <span class="subj-pct" style="color:${s.color}">${pct}%</span>
        </div>
        <div class="prog-track"><div class="prog-fill" style="width:${pct}%;background:${s.color}"></div></div>
      </div>`;
    }).join('')||'<p style="color:var(--text3);font-size:12px">ยังไม่ได้เลือกวิชา</p>';
  }

  // Daily ring + highlights
  renderDailyRing();
  renderHighlights();

  // week chart
  const last7=getHoursLast7();
  const labels=last7.map(d=>{const dt=new Date(d.date);return['อา','จ','อ','พ','พฤ','ศ','ส'][dt.getDay()]});
  const vals=last7.map(d=>d.hours);
  const maxVal=Math.max(...vals,1);
  const barColors=vals.map(v=>v>=4?'rgba(34,197,94,0.7)':v>=2?'rgba(245,158,11,0.7)':'rgba(239,68,68,0.5)');
  const cc=getChartColors();
  const ctx=document.getElementById('weekChart').getContext('2d');
  if(weekChart)weekChart.destroy();
  weekChart=new Chart(ctx,{type:'bar',data:{labels,datasets:[{label:'ชั่วโมง',data:vals,backgroundColor:barColors,borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:cc.tick}},y:{grid:{color:cc.grid},ticks:{color:cc.tick},beginAtZero:true}}}});

  renderRecommendation();renderPrediction();
  renderQuickAddChips();
}
function renderLogChart(){
  const activeSubs=getActiveSubjectsData();
  const subj=getHoursBySubj();
  const activeKeys=Object.keys(activeSubs);
  if(!activeKeys.length)return;
  const dataVals=activeKeys.map(k=>subj[k]||0);
  // If all zero, Chart.js doughnut renders empty — add tiny sentinel to avoid crash
  const allZero=dataVals.every(v=>v===0);
  const labels=activeKeys.map(k=>activeSubs[k].name.replace(/^(TGAT|TPAT|A-Level)\s*/,''));
  const bgColors=activeKeys.map(k=>(activeSubs[k].color||'#888')+'99');
  const ctx2=document.getElementById('logWeekChart').getContext('2d');
  if(logWeekChart)logWeekChart.destroy();
  if(allZero){
    logWeekChart=new Chart(ctx2,{type:'doughnut',data:{labels:['ยังไม่มีข้อมูล'],datasets:[{data:[1],backgroundColor:[document.documentElement.classList.contains('light')?'#e4ebe4':'#2a353d'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{enabled:false}}}});
    return;
  }
  logWeekChart=new Chart(ctx2,{type:'doughnut',data:{labels,datasets:[{data:dataVals,backgroundColor:bgColors,borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'bottom',labels:{color:getChartColors().label,font:{size:11}}}}}});
}

// ═══════════════════════════ SMART RECOMMENDATION ═══════════════════════════
function renderRecommendation(){
  const box=document.getElementById('today-rec');
  const activeSubs=getActiveSubjectsData();
  if(!Object.keys(activeSubs).length){box.innerHTML='<p style="color:var(--text3);font-size:12px">เลือกวิชาก่อนเพื่อดูคำแนะนำ</p>';return;}
  const subj=getHoursBySubj();
  const total=Object.values(subj).reduce((a,b)=>a+b,0)||1;
  const activeKeys=Object.keys(activeSubs);
  const equalShare=1/activeKeys.length;
  const priorityLabels=['🔴 สำคัญมาก','🟡 สำคัญ','🟢 ปกติ'];
  const scores=activeKeys.map(k=>{
    const s=TCAS_SUBJECTS[k];
    const gap=equalShare-(subj[k]||0)/total;
    const examDays=s?getDekDaysForDate(s.examDate)||1:100;
    return{key:k,gap,urgency:gap*(300/examDays),examDays,s:activeSubs[k]};
  }).sort((a,b)=>b.urgency-a.urgency);
  const day=new Date().getDay();
  const dayPlan=getAdjustedWeekPlan()[day===0?6:day-1];
  box.innerHTML=scores.slice(0,3).map((item,i)=>{
    const gapPct=Math.abs(Math.round(item.gap*100));
    const desc=item.gap>0.05?`ขาดอีก ${gapPct}% จากเป้า · สอบอีก ${item.examDays} วัน`:`อยู่ในเป้า ✅ · สอบอีก ${item.examDays} วัน`;
    return`<div class="rec-item">
      <div class="rec-icon" style="background:${item.s.color}20">${item.s.icon}</div>
      <div>
        <div class="rec-title">${item.s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')} <span style="font-size:10px;color:var(--text3)">${priorityLabels[Math.min(i,2)]}</span></div>
        <div class="rec-desc">${desc}</div>
      </div>
    </div>`;
  }).join('')+(dayPlan?`<div style="font-size:11px;color:var(--text3);margin-top:8px">📅 แผนวันนี้: ${dayPlan.sessions.map(s=>s.label+' '+s.h).join(' · ')}</div>`:'');
}
// น้ำหนักชั่วโมงเป้าหมายรายวิชา (ตาม difficulty + ปริมาณเนื้อหา)
// A-Level วิทย์/คณิต (diff 4-5) = 120-150h, A-Level ภาษา/สังคม = 80h
// TPAT1 (diff 5) = 80h, TPAT อื่น (diff 3-4) = 60h
// TGAT (diff 2-3) = 40-50h
const SUBJECT_HOUR_TARGETS={
  tgat1:45, tgat2:50, tgat3:35,
  tpat1:80, tpat2:55, tpat3:70, tpat4:60, tpat5:50,
  alv_math1:150, alv_math2:80, alv_sci:70,
  alv_phy:140, alv_chem:130, alv_bio:110,
  alv_soc:70, alv_thai:65, alv_eng:80,
};
function getSubjTarget(id){return SUBJECT_HOUR_TARGETS[id]||60;}

function renderPrediction(){
  const box=document.getElementById('prediction-box');
  const studyDays=new Set(data.logs.map(l=>l.date)).size;
  const total=data.logs.reduce((a,b)=>a+b.hours,0);
  const avgPerDay=studyDays?total/studyDays:0;
  const activeSubs=getActiveSubjectsData();
  const subj=getHoursBySubj();
  const activeKeys=Object.keys(activeSubs);

  // คำนวณเป้ารวมจากวิชาที่เลือก
  const targetTotal=activeKeys.reduce((a,k)=>a+getSubjTarget(k),0);

  // แสดงรายวิชาแบบ group
  const groups=[
    {label:'TGAT',color:'#f59e0b',keys:activeKeys.filter(k=>k.startsWith('tgat'))},
    {label:'TPAT',color:'#8b5cf6',keys:activeKeys.filter(k=>k.startsWith('tpat'))},
    {label:'A-Level',color:'#3b82f6',keys:activeKeys.filter(k=>k.startsWith('alv'))},
  ].filter(g=>g.keys.length);

  let perSubjHTML='';
  groups.forEach(g=>{
    perSubjHTML+=`<div style="font-size:10px;font-weight:700;color:${g.color};letter-spacing:.5px;margin:8px 0 3px;text-transform:uppercase">${g.label}</div>`;
    g.keys.forEach(k=>{
      const s=activeSubs[k];const tcas=TCAS_SUBJECTS[k];
      const done=subj[k]||0;
      const need=getSubjTarget(k);
      const examDays=tcas?getDekDaysForDate(tcas.examDate)||1:100;
      const remaining=Math.max(0,need-done);
      const reqDaily=remaining/examDays;
      const ok=remaining<=0||reqDaily<=Math.max(avgPerDay*0.35,0.5);
      const pct=Math.min(Math.round(done/need*100),100);
      perSubjHTML+=`<div style="margin-bottom:5px">
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;margin-bottom:3px">
          <span style="color:var(--text)">${s.icon} ${s.name.replace(/^(TGAT|TPAT\d*|A-Level)\s*/,'')}</span>
          <span style="color:${ok?'var(--green2)':'var(--red2)'};font-family:'DM Mono',monospace;font-size:11px">${done.toFixed(0)}/${need}h ${ok?'✅':'⚠️ +'+reqDaily.toFixed(1)+'/d'}</span>
        </div>
        <div style="height:3px;background:var(--bg4);border-radius:2px;overflow:hidden">
          <div style="height:100%;width:${pct}%;background:${s.color};border-radius:2px;transition:width .6s"></div>
        </div>
      </div>`;
    });
  });

  // คาดการณ์จาก earliest exam date
  const earliestExam=activeKeys.reduce((min,k)=>{
    const d=TCAS_SUBJECTS[k]?.examDate;return(!min||d<min)?d:min;
  },null)||'2027-01-30';
  const daysLeft=getDekDaysForDate(earliestExam);
  const projectedTotal=total+avgPerDay*daysLeft;
  const onTrack=projectedTotal>=targetTotal;
  const gap=targetTotal-projectedTotal;

  box.innerHTML=`
    <div style="font-size:12px;margin-bottom:4px;color:var(--text2)">เฉลี่ย: <strong style="color:var(--amber)">${avgPerDay.toFixed(1)}h/วัน</strong> · เป้ารวม: <strong style="color:var(--amber)">${targetTotal}h</strong> · คาดการณ์: <strong style="color:${onTrack?'var(--green2)':'var(--red2)'}">${Math.round(projectedTotal)}h</strong></div>
    ${perSubjHTML}
    <div style="font-size:12px;padding:8px 10px;border-radius:8px;margin-top:8px;background:${onTrack?'rgba(34,197,94,.1)':'rgba(239,68,68,.1)'};color:${onTrack?'var(--green2)':'var(--red2)'}">
      ${onTrack?`✅ อยู่ในเกณฑ์ดี เหลือ ${daysLeft} วัน`:`⚠️ ต้องเพิ่ม ${Math.ceil(gap/Math.max(daysLeft,1)*10)/10}h/วัน (ขาด ${Math.round(gap)}h จากเป้า)`}
    </div>`;
}

// ═══════════════════════════ WEEKLY PLAN ═══════════════════════════
function renderWeekPlan(){
  renderDekSections();
  const grid=document.getElementById('week-grid');
  const today=new Date().getDay();// 0=sun,1=mon
  const startOfWeek=new Date();startOfWeek.setDate(startOfWeek.getDate()-(today===0?6:today-1));
  grid.innerHTML=getAdjustedWeekPlan().map((d,i)=>{
    const date=new Date(startOfWeek);date.setDate(date.getDate()+i);
    const isToday=date.toDateString()===new Date().toDateString();
    return`<div class="day-card ${isToday?'today':''}">
      <div class="day-name">${d.day}</div>
      <div class="day-date">${date.getDate()}/${date.getMonth()+1}</div>
      ${d.sessions.map(s=>`<div class="session ${s.cls}">${s.label}<br><small>${s.h}</small></div>`).join('')}
      <div class="day-hours">เป้า ${d.target}h</div>
    </div>`;
  }).join('');
}

// ═══════════════════════════ SUBJECTS/CHAPTERS ═══════════════════════════
function renderSubjects(){
  ensureChapters();
  const grid=document.getElementById('subjects-grid');
  const SUBJECTS_DATA=getActiveSubjectsData();
  if(!Object.keys(SUBJECTS_DATA).length){
    grid.innerHTML='<div class="card" style="grid-column:1/-1;text-align:center;padding:40px"><p style="color:var(--text3)">ยังไม่ได้เลือกวิชา — กรุณาเลือกวิชาที่ต้องการเรียนก่อน</p></div>';
    return;
  }
  grid.innerHTML=Object.entries(SUBJECTS_DATA).map(([k,s])=>{
    const done=(data.chapters[k]||[]).length;
    const total=s.chapters.length;
    const pct=total?Math.round(done/total*100):0;
    return`<div class="card">
      <div class="card-title" style="color:${s.color}">${s.name}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span style="font-size:12px;color:var(--text2)">${done}/${total} บท</span>
        <span style="font-size:14px;font-weight:700;color:${s.color}">${pct}%</span>
      </div>
      <div class="prog-track" style="margin-bottom:14px"><div class="prog-fill" style="width:${pct}%;background:${s.color}"></div></div>
      ${s.chapters.map((ch,i)=>{
        const isDone=(data.chapters[k]||[]).includes(i);
        return`<div class="chapter-item" onclick="toggleChapter('${k}',${i})">
          <div class="chapter-check ${isDone?'done':''}">${isDone?'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#fff" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>':''}</div>
          <div class="chapter-title ${isDone?'done':''}">${ch}</div>
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
}
function toggleChapter(subj,idx){
  ensureChapters();
  if(!data.chapters[subj])data.chapters[subj]=[];
  const arr=data.chapters[subj];
  const pos=arr.indexOf(idx);
  if(pos>=0)arr.splice(pos,1);else arr.push(idx);
  save(); scheduleRender(renderSubjects, renderDashboard);
}

// ═══════════════════════════ ANALYSIS ═══════════════════════════
function renderAnalysis(){
  const subj=getHoursBySubj();
  const activeSubs=getActiveSubjectsData();
  const activeKeys=Object.keys(activeSubs);
  // Subject hours bar chart (dynamic)
  const cc=getChartColors();
  const ctx1=document.getElementById('subjectHoursChart').getContext('2d');
  if(subjectChart)subjectChart.destroy();
  subjectChart=new Chart(ctx1,{type:'bar',data:{
    labels:activeKeys.map(k=>activeSubs[k].name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')),
    datasets:[{data:activeKeys.map(k=>subj[k]||0),backgroundColor:activeKeys.map(k=>activeSubs[k].color||'#888'),borderRadius:8,borderSkipped:false}]
  },options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:cc.grid},ticks:{color:cc.tick}},y:{grid:{display:false},ticks:{color:cc.label}}}}});

  // Daily last 30
  const days30=[];const now=new Date();
  for(let i=29;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);days30.push(d.toISOString().split('T')[0]);}
  const dailyVals=days30.map(d=>data.logs.filter(l=>l.date===d).reduce((a,b)=>a+b.hours,0));
  const ctx2=document.getElementById('dailyChart').getContext('2d');
  if(dailyChart)dailyChart.destroy();
  dailyChart=new Chart(ctx2,{type:'line',data:{
    labels:days30.map((_,i)=>i%5===0?days30[i].slice(5):''),
    datasets:[{data:dailyVals,borderColor:getComputedStyle(document.documentElement).getPropertyValue('--amber').trim()||'#b56f18',backgroundColor:document.documentElement.classList.contains('light')?'rgba(181,111,24,0.1)':'rgba(226,164,71,0.12)',borderWidth:2,tension:.4,fill:true,pointRadius:2,pointBackgroundColor:getComputedStyle(document.documentElement).getPropertyValue('--amber').trim()||'#b56f18'}]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:cc.grid},ticks:{color:cc.tick,maxRotation:0}},y:{grid:{color:cc.grid},ticks:{color:cc.tick},beginAtZero:true}}}});

  // Plan vs actual
  const last7=getHoursLast7();
  const adjustedWeekPlan=getAdjustedWeekPlan();
  const planned=last7.map(d=>{
    const dayIdx=new Date(d.date).getDay();
    return adjustedWeekPlan[dayIdx===0?6:dayIdx-1].target;
  });
  const ctx3=document.getElementById('planVsActualChart').getContext('2d');
  if(planVsChart)planVsChart.destroy();
  planVsChart=new Chart(ctx3,{type:'bar',data:{
    labels:last7.map(d=>{const dt=new Date(d.date);return['อา','จ','อ','พ','พฤ','ศ','ส'][dt.getDay()]}),
    datasets:[
      {label:'เป้า',data:planned,borderColor:'rgba(94,94,120,0.4)',backgroundColor:'rgba(94,94,120,0.4)',borderRadius:4,borderSkipped:false},
      {label:'จริง',data:last7.map(d=>d.hours),backgroundColor:'rgba(245,158,11,0.75)',borderRadius:4,borderSkipped:false}
    ]
  },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'top',labels:{color:cc.label,font:{size:11}}}},scales:{x:{grid:{display:false},ticks:{color:cc.tick}},y:{grid:{color:cc.grid},ticks:{color:cc.tick},beginAtZero:true}}}});

  renderInsights(subj,dailyVals);
}
function renderInsights(subj,dailyVals){
  const box=document.getElementById('insights-box');
  const total=Object.values(subj).reduce((a,b)=>a+b,0)||1;
  const insights=[];
  const activeSubs=getActiveSubjectsData();
  const activeKeys=Object.keys(activeSubs);
  const equalShare=activeKeys.length?1/activeKeys.length:0.25;
  // 1. Weak subject alerts
  activeKeys.forEach(k=>{
    const actual=(subj[k]||0)/total;
    if(actual<equalShare-0.08){
      const diff=Math.round((equalShare-actual)*100);
      insights.push({icon:'⚠️',title:`${activeSubs[k].name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')} น้อยกว่าแผน ${diff}%`,desc:`ทำได้ ${Math.round(actual*100)}% (เป้า ${Math.round(equalShare*100)}%)`});
    }
  });
  // 2. Productive day analysis
  const dayHours=[0,0,0,0,0,0,0],dayCounts=[0,0,0,0,0,0,0];
  data.logs.forEach(l=>{const d=new Date(l.date).getDay();dayHours[d]+=l.hours;dayCounts[d]++;});
  const dayAvg=dayHours.map((h,i)=>dayCounts[i]?h/dayCounts[i]:0);
  const bestDayIdx=dayAvg.indexOf(Math.max(...dayAvg));
  const dayLabels=['อาทิตย์','จันทร์','อังคาร','พุธ','พฤหัสบดี','ศุกร์','เสาร์'];
  if(Math.max(...dayAvg)>0) insights.push({icon:'📅',title:`วัน${dayLabels[bestDayIdx]} productive ที่สุด`,desc:`เฉลี่ย ${dayAvg[bestDayIdx].toFixed(1)}h`});
  // 3. Plan vs actual
  const last7=getHoursLast7();
  const weekActual=last7.reduce((a,b)=>a+b.hours,0);
  const weekTarget=getAdjustedWeekPlan().reduce((a,b)=>a+b.target,0);
  if(weekTarget>0){
    const completion=Math.round(weekActual/weekTarget*100);
    insights.push({icon:completion>=80?'✅':'📊',title:`สัปดาห์นี้ ${completion}% ของแผน`,desc:`${weekActual.toFixed(1)}h / ${weekTarget}h`});
  }
  // 4. Trend (this vs last week)
  if(dailyVals.length>=14){
    const tw=dailyVals.slice(-7).reduce((a,b)=>a+b,0);
    const lw=dailyVals.slice(-14,-7).reduce((a,b)=>a+b,0);
    if(lw>0){const ch=Math.round((tw-lw)/lw*100);if(Math.abs(ch)>=10)insights.push({icon:ch>0?'📈':'📉',title:`ชั่วโมง${ch>0?'เพิ่ม':'ลด'} ${Math.abs(ch)}%`,desc:`${tw.toFixed(1)}h vs ${lw.toFixed(1)}h สัปดาห์ก่อน`});}
  }
  // 5. Active days
  const activeDay=dailyVals.filter(v=>v>0).length;
  if(activeDay>0){const avg=dailyVals.filter(v=>v>0).reduce((a,b)=>a+b,0)/activeDay;insights.push({icon:'📈',title:`อ่าน ${activeDay}/30 วัน · เฉลี่ย ${avg.toFixed(1)}h`,desc:'เฉพาะวันที่มีบันทึก'});}
  if(data.streak>=3)insights.push({icon:'🔥',title:`Streak ${data.streak} วัน!`,desc:'ต่อเนื่องดีมาก!'});
  if(!insights.length)insights.push({icon:'📊',title:'ยังไม่มีข้อมูลพอ',desc:'บันทึก 1 สัปดาห์เพื่อดู Insights'});
  box.innerHTML=insights.map(ins=>`<div class="insight-card"><div class="insight-title">${ins.icon} ${ins.title}</div><div class="insight-desc">${ins.desc}</div></div>`).join('');
}

// ═══════════════════════════ GOALS & ACHIEVEMENTS ═══════════════════════════
function renderGoals(){
  document.getElementById('streak-num').textContent=data.streak;
  document.getElementById('best-streak').textContent=data.bestStreak;
  // 7-day dots
  const dots=document.getElementById('streak-dots-7');
  const days7=[];const now=new Date();
  for(let i=6;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);days7.push(d.toISOString().split('T')[0]);}
  const studiedDates=new Set(data.logs.map(l=>l.date));
  dots.innerHTML=days7.map((d,i)=>{
    const isToday=i===6;const done=studiedDates.has(d);
    const dt=new Date(d);const label=['อา','จ','อ','พ','พฤ','ศ','ส'][dt.getDay()];
    const cls=done?(isToday?'today done':'done'):(isToday?'today':'');
    return`<div class="streak-dot ${cls}" title="${d}">${label}</div>`;
  }).join('');

  // Milestones
  const chapsDone=Object.values(data.chapters).reduce((a,b)=>a+b.length,0);
  const totalChs=Object.values(getActiveSubjectsData()).reduce((a,b)=>a+b.chapters.length,0);
  const totalHours=data.logs.reduce((a,b)=>a+b.hours,0);
  const milestones=[
    {name:'อ่านครบ 50 ชั่วโมง',target:50,current:Math.min(totalHours,50),unit:'h'},
    {name:'อ่านครบ 200 ชั่วโมง',target:200,current:Math.min(totalHours,200),unit:'h'},
    {name:'อ่านครบ 500 ชั่วโมง',target:500,current:Math.min(totalHours,500),unit:'h'},
    {name:'อ่านครบทุกบทเรียน',target:totalChs,current:chapsDone,unit:'บท'},
    {name:'Streak 7 วัน',target:7,current:Math.min(data.streak,7),unit:'วัน'},
    {name:'Streak 30 วัน',target:30,current:Math.min(data.streak,30),unit:'วัน'},
  ];
  document.getElementById('milestones-list').innerHTML=milestones.map(m=>{
    const pct=Math.round(m.current/m.target*100);
    return`<div style="margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
        <span>${m.name}</span><span style="color:var(--text2)">${m.current}/${m.target} ${m.unit}</span>
      </div>
      <div class="prog-track"><div class="prog-fill" style="width:${pct}%;background:${pct>=100?'var(--green)':'var(--amber)'}"></div></div>
    </div>`;
  }).join('');

  // Achievements
  const hoursBySubj=getHoursBySubj();
  const state={streak:data.streak,totalHours,chapsDone,totalLogs:data.logs.length,subjTouched:Object.keys(hoursBySubj).filter(k=>hoursBySubj[k]>0).length,totalSubj:(data.selectedSubjects||[]).length};
  document.getElementById('achievements-grid').innerHTML=ACHIEVEMENTS_DEF.map(a=>{
    const unlocked=a.cond(state);
    return`<div class="achievement ${unlocked?'':'ach-locked'}">
      <div class="ach-icon">${a.icon}</div>
      <div><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div>
    </div>`;
  }).join('');
}

// ═══════════════════════════ POMODORO TIMER (Timestamp-based) ═══════════════════════════
// FIX: Old timer used setInterval + timeLeft-- which drifts when Chrome throttles
// background tabs (intervals drop to ~1/min). New approach stores an absolute
// endTime (Date.now() + remaining) and recomputes on every tick + on visibility change.
let pomoState = {
  running: false,
  mode: 'focus',            // 'focus' | 'break'
  remainingMs: 25 * 60000,  // ms remaining when paused
  endTime: 0,               // absolute timestamp when timer should fire (only valid when running)
  focusDuration: 25 * 60000,
  breakDuration: 5 * 60000,
  session: 0,
  interval: null,
  todaySessions: []
};

function setPomoMode(v) {
  const [f, b] = v.split('-').map(Number);
  pomoState.focusDuration = f * 60000;
  pomoState.breakDuration = b * 60000;
  timerReset();
}

/** Core tick — computes remaining from absolute endTime */
function _pomoTick() {
  if (!pomoState.running) return;
  const now = Date.now();
  const remaining = pomoState.endTime - now;

  if (remaining <= 0) {
    // Phase completed
    clearInterval(pomoState.interval);
    pomoState.running = false;
    pomoState.remainingMs = 0;

    if (pomoState.mode === 'focus') {
      const subj = document.getElementById('timer-subject').value;
      const minutes = Math.round(pomoState.focusDuration / 60000);
      pomoState.todaySessions.push({ subj, minutes });
      pomoState.session = (pomoState.session + 1);
      if (pomoState.session >= 4) pomoState.session = 0;
      data.logs.push({
        id: Date.now(), date: new Date().toISOString().split('T')[0],
        subj, hours: +(minutes / 60).toFixed(2), note: 'Pomodoro ⏱'
      });
      updateStreak(); save(); renderDashboard();
      showToast(`✅ เสร็จ! ${minutes}m ${subj.toUpperCase()}`);
      // Switch to break
      pomoState.mode = 'break';
      pomoState.remainingMs = pomoState.breakDuration;
    } else {
      pomoState.mode = 'focus';
      pomoState.remainingMs = pomoState.focusDuration;
      showToast('☕ พักเสร็จ! เริ่มใหม่ได้เลย');
    }
  } else {
    pomoState.remainingMs = remaining;
  }
  updateTimerDisplay();
}

/** Recalculate immediately when user returns to tab */
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && pomoState.running) _pomoTick();
});

function updateTimerDisplay() {
  const totalSec = Math.max(0, Math.ceil(pomoState.remainingMs / 1000));
  const m = Math.floor(totalSec / 60), s = totalSec % 60;
  document.getElementById('timer-display').textContent =
    `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

  const phaseDuration = pomoState.mode === 'focus' ? pomoState.focusDuration : pomoState.breakDuration;
  const prog = 1 - pomoState.remainingMs / phaseDuration;
  const circ = 2 * Math.PI * 80;
  document.getElementById('pomo-progress').style.strokeDashoffset = circ * (1 - prog);
  document.getElementById('timer-phase-label').textContent =
    pomoState.mode === 'focus' ? '🍅 โฟกัส' : '☕ พัก';
  document.getElementById('pomo-progress').style.stroke =
    pomoState.mode === 'focus' ? 'var(--amber)' : 'var(--teal2)';
  document.getElementById('timer-start-btn').textContent =
    pomoState.running ? 'หยุด' : 'เริ่ม';

  // dots
  const dots = document.getElementById('pomo-dots');
  dots.innerHTML = Array.from({ length: 4 }, (_, i) =>
    `<div class="pomo-dot ${i < pomoState.session ? 'done' : ''}"></div>`
  ).join('');

  // today sessions list
  const box = document.getElementById('today-sessions');
  if (!pomoState.todaySessions.length) {
    box.innerHTML = '<div style="font-size:13px;color:var(--text3);padding:20px 0;text-align:center">ยังไม่มีเซสชัน<br>กดเริ่มเพื่อเริ่มจับเวลา</div>';
    return;
  }
  box.innerHTML = pomoState.todaySessions.map(s => {
    const subjData = TCAS_SUBJECTS[s.subj];
    const color = subjData ? subjData.color : 'var(--text2)';
    const name = subjData ? subjData.name.replace(/^(TGAT|TPAT|A-Level)\s*/, '') : s.subj.toUpperCase();
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
      <span style="width:8px;height:8px;border-radius:50%;background:${color};flex-shrink:0"></span>
      <span style="font-size:12px;flex:1">${name}</span>
      <span style="font-size:12px;font-family:'DM Mono';color:var(--amber)">${s.minutes}m</span>
    </div>`;
  }).join('');
  const totalMin = pomoState.todaySessions.reduce((a, b) => a + b.minutes, 0);
  document.getElementById('today-total-timer').textContent =
    `${Math.floor(totalMin / 60)}:${String(totalMin % 60).padStart(2, '0')}`;
}

function timerToggle() {
  if (pomoState.running) {
    // Pause — freeze remaining time
    clearInterval(pomoState.interval);
    pomoState.remainingMs = Math.max(0, pomoState.endTime - Date.now());
    pomoState.running = false;
  } else {
    // Start — set absolute end timestamp
    pomoState.endTime = Date.now() + pomoState.remainingMs;
    pomoState.running = true;
    pomoState.interval = setInterval(_pomoTick, 250); // 250ms for smooth display even in bg
  }
  updateTimerDisplay();
}

function timerReset() {
  clearInterval(pomoState.interval);
  pomoState.running = false;
  pomoState.mode = 'focus';
  pomoState.remainingMs = pomoState.focusDuration;
  updateTimerDisplay();
}

// ═══════════════════════════ SUBJECT SELECTION PAGE ═══════════════════════════
function renderSelectPage(){
  const container=document.getElementById('select-groups');
  if(!container)return;
  const sel=data.selectedSubjects||[];
  container.innerHTML=Object.values(SUBJECT_GROUPS).map(g=>`
    <div class="card" style="margin-bottom:16px">
      <div class="card-title" style="color:${g.color}">${g.label}</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${g.subjects.map(id=>{
          const s=TCAS_SUBJECTS[id];if(!s)return'';
          const active=sel.includes(id);
          return`<button class="subject-chip ${active?'active':''}" onclick="toggleSelectSubj('${id}')" style="--chip-color:${s.color}">${s.icon} ${s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')}</button>`;
        }).join('')}
      </div>
    </div>`).join('');
  renderDekSections();
  updateSelectSummary();
}
function toggleSelectSubj(id){
  if(!data.selectedSubjects)data.selectedSubjects=[];
  const idx=data.selectedSubjects.indexOf(id);
  if(idx>=0)data.selectedSubjects.splice(idx,1);
  else data.selectedSubjects.push(id);
  renderSelectPage();
}
function updateSelectSummary(){
  const el=document.getElementById('select-summary');
  if(!el)return;
  const sel=data.selectedSubjects||[];
  if(!sel.length){el.textContent='ยังไม่ได้เลือกวิชา';return;}
  const total=sel.reduce((a,id)=>a+getEstimatedHours(id),0);
  const metrics=getDekPlanMetrics();
  const target=getGoalDailyTarget(metrics.avgDailyHours);
  el.textContent=`เลือก ${sel.length} วิชา · ประมาณ ${total} ชั่วโมง · ${metrics.plan.label} เป้า ${target.label}`;
}
function confirmSubjects(){
  if(!(data.selectedSubjects||[]).length){showToast('กรุณาเลือกอย่างน้อย 1 วิชา');return;}
  ensureChapters();
  data.onboarded=true;
  save();
  renderSubjectSelects();
  renderQuickAddChips();
  renderFabMenu();
  renderDashboard();
  renderLog();
  renderSubjects();
  showToast('✅ บันทึกวิชาที่เลือกแล้ว');
  showPage('dashboard');
}

// ═══════════════════════════ SUBJECT SELECTS ═══════════════════════════
function renderSubjectSelects(){
  const subs=getSelectedSubjects();
  const opts=subs.length
    ? subs.map(s=>`<option value="${s.id}">${s.icon} ${s.name}</option>`).join('')
    : '<option value="">-- ยังไม่ได้เลือกวิชา --</option>';
  ['log-subject','timer-subject'].forEach(id=>{
    const el=document.getElementById(id);
    if(el){el.innerHTML=opts;}
  });
}

// ═══════════════════════════ BOTTOM SHEETS ═══════════════════════════
let qaSheetSelectedSubj='';
function openQuickAddSheet(){
  renderQaSheetSubjects();
  document.getElementById('qa-sheet').classList.add('show');
  document.getElementById('sheet-overlay').classList.add('show');
}
function openMoreSheet(){
  // show/hide auth button based on login state
  const authBtn=document.getElementById('more-auth-btn');
  if(authBtn){
    const user=window.currentUserFn&&window.currentUserFn();
    authBtn.querySelector('span').textContent=user?'🔓':'👤';
    authBtn.querySelector('span').nextSibling&&(authBtn.childNodes[1].textContent=user?'ออกจากระบบ':'เข้าสู่ระบบ');
    authBtn.onclick=user?()=>{closeAllSheets();setTimeout(()=>window.showSignOutModal&&window.showSignOutModal(),200);}:()=>{closeAllSheets();setTimeout(()=>window._fbSignIn&&window._fbSignIn(),200);};
  }
  document.getElementById('more-sheet').classList.add('show');
  document.getElementById('sheet-overlay').classList.add('show');
}
function closeAllSheets(){
  document.querySelectorAll('.bottom-sheet').forEach(s=>s.classList.remove('show'));
  document.getElementById('sheet-overlay').classList.remove('show');
}
// Keyboard accessibility: Escape key closes any open sheet or modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // Close bottom sheets first
    const openSheet = document.querySelector('.bottom-sheet.show');
    if (openSheet) { closeAllSheets(); return; }
    // Close signout modal
    const modal = document.getElementById('signout-modal');
    if (modal && modal.classList.contains('show')) { window.hideSignOutModal(); }
  }
});
function renderQaSheetSubjects(){
  const box=document.getElementById('qa-sheet-subjects');if(!box)return;
  const subs=getSelectedSubjects();
  if(!subs.length){box.innerHTML='<span style="font-size:13px;color:var(--text3)">กรุณาเลือกวิชาก่อน</span>';return;}
  if(!qaSheetSelectedSubj||!subs.find(s=>s.id===qaSheetSelectedSubj))qaSheetSelectedSubj=subs[0].id;
  box.innerHTML=subs.map(s=>`<button class="qa-chip ${s.id===qaSheetSelectedSubj?'active':''}" data-subj="${s.id}" onclick="qaSheetSelectSubj(this)" style="--chip-color:${s.color}">${s.icon} ${s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')}</button>`).join('');
}
function qaSheetSelectSubj(btn){
  document.querySelectorAll('#qa-sheet .qa-chip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');qaSheetSelectedSubj=btn.dataset.subj;
}
function qaSheetAdd(hours){
  const subj=qaSheetSelectedSubj||qaSelectedSubj;
  const today=new Date().toISOString().split('T')[0];
  const s=TCAS_SUBJECTS[subj];if(!s){showToast('กรุณาเลือกวิชาก่อน');return;}
  data.logs.push({id:Date.now(),date:today,subj,hours,note:'Quick Add ⚡',source:'quick'});
  data.logs.sort((a,b)=>b.date.localeCompare(a.date));
  updateStreak(today);save();renderDashboard();renderLog();
  const fb=document.getElementById('qa-sheet-feedback');
  fb.textContent=`✅ บันทึกแล้ว! ${s.name.replace(/^(TGAT|TPAT|A-Level)\s*/,'')} +${hours}h`;
  fb.style.opacity='1';
  setTimeout(()=>{fb.style.opacity='0';closeAllSheets();},1400);
}
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

// ═══════════════════════════ THEME ═══════════════════════════
function getChartColors(){
  const light=document.documentElement.classList.contains('light');
  return{
    grid:light?'#d9ded5':'#2a353d',
    tick:light?'#788278':'#87938e',
    label:light?'#59645b':'#b8c1bd',
    zero:light?'#d9ded5':'#2a353d',
  };
}
function applyTheme(theme){
  const root=document.documentElement;
  const isLight=theme==='light';
  if(isLight)root.classList.add('light');
  else root.classList.remove('light');
  // Update nav icon
  const navIcon=document.getElementById('theme-icon-nav');
  if(navIcon)navIcon.textContent=isLight?'🌙':'☀️';
  // Update more-sheet button
  const moreIcon=document.getElementById('more-theme-icon');
  const moreLabel=document.getElementById('more-theme-label');
  if(moreIcon)moreIcon.textContent=isLight?'🌙':'☀️';
  if(moreLabel)moreLabel.textContent=isLight?'โหมดมืด':'โหมดสว่าง';
  // Re-render charts after transition (theme colors change)
  clearTimeout(window._themeChartTimer);
  window._themeChartTimer=setTimeout(()=>{
    if(typeof renderDashboard==='function')renderDashboard();
    if(typeof renderAnalysis==='function'&&document.getElementById('page-analysis')?.classList.contains('active'))renderAnalysis();
  },60);
}
function toggleTheme(){
  const isLight=document.documentElement.classList.contains('light');
  const next=isLight?'dark':'light';
  // Save to standalone localStorage key (fallback before data loads)
  localStorage.setItem('studypath-theme',next);
  // Save to data object → syncs to Firebase via save()
  if(typeof data!=='undefined'&&data!==null){
    data.theme=next;
    if(typeof save==='function')save();
  }
  applyTheme(next);
}
// Init theme — read from data.theme in localStorage first, then standalone key, then default light
(function(){
  const savedData=JSON.parse(localStorage.getItem('studypath')||'null');
  const theme=savedData?.theme||localStorage.getItem('studypath-theme')||'light';
  applyTheme(theme);
})();
window.applyTheme=applyTheme;
window.toggleTheme=toggleTheme;

// ═══════════════════════════ INIT ═══════════════════════════
function init(){
  migrateData();
  // Set today's date in log form
  document.getElementById('log-date').value=new Date().toISOString().split('T')[0];
  renderDekSections();
  renderCountdowns();
  renderSubjectSelects();
  renderQuickAddChips();
  renderFabMenu();
  renderDashboard();
  renderWeekPlan();
  renderLog();
  renderSubjects();
  renderGoals();
  updateTimerDisplay();
  // ถ้าเคย onboard แล้ว (เลือกวิชาและกด confirm) ให้ไปหน้า dashboard เลย
  const hasSubjects=(data.selectedSubjects||[]).length>0;
  if(hasSubjects&&data.onboarded){
    showPage('dashboard');
  }else{
    showPage('select');
  }
  // Determine current phase
  const now=new Date();
  let phase='ระยะปูพื้น';
  if(now>new Date('2026-11-01'))phase='ระยะทำโจทย์';
  if(now>new Date('2027-01-01'))phase='ระยะตะลุยข้อสอบ';
  document.getElementById('current-phase-badge').textContent=phase;
  // Refresh countdown every minute
  setInterval(renderCountdowns,60000);
}

// Refresh goals when switching to that page
document.querySelectorAll('.nav-tab').forEach(t=>{
  t.addEventListener('click',()=>{
    setTimeout(()=>{if(document.getElementById('page-goals').classList.contains('active'))renderGoals();},50);
    setTimeout(()=>{if(document.getElementById('page-log').classList.contains('active'))renderLog();},50);
    setTimeout(()=>{if(document.getElementById('page-subjects').classList.contains('active'))renderSubjects();},50);
  });
});

// ═══ EXPOSE to window for Firebase module & onclick handlers ═══
window.renderDashboard = renderDashboard;
window.renderLog = renderLog;
window.renderSubjects = renderSubjects;
window.renderGoals = renderGoals;
window.showToast = showToast;
window.showPage = showPage;
window.addLog = addLog;
window.deleteLog = deleteLog;
window.toggleChapter = toggleChapter;
window.timerToggle = timerToggle;
window.timerReset = timerReset;
window.setPomoMode = setPomoMode;
window.qaSelectSubj = qaSelectSubj;
window.qaAddTime = qaAddTime;
window.toggleFabMenu = toggleFabMenu;
window.fabQuickAdd = fabQuickAdd;
window.setDailyGoal = setDailyGoal;
window.setDekPlan = setDekPlan;
window.quickAddFocus = quickAddFocus;
window.startFocusTimer = startFocusTimer;
window.confirmSubjects = confirmSubjects;
window.toggleSelectSubj = toggleSelectSubj;
window.renderSubjectSelects = renderSubjectSelects;
window.renderQuickAddChips = renderQuickAddChips;
window.focusSelectSubj = focusSelectSubj;
window.openQuickAddSheet = openQuickAddSheet;
window.openMoreSheet = openMoreSheet;
window.closeAllSheets = closeAllSheets;
window.qaSheetSelectSubj = qaSheetSelectSubj;
window.qaSheetAdd = qaSheetAdd;
window.renderAnalysis = renderAnalysis;
window.renderExamPapers = renderExamPapers;
window.selectExamGroup = selectExamGroup;
window.selectExamYear = selectExamYear;

// ═══════════════════════════ EXAM PAPERS DATABASE ═══════════════════════════
// Research notes:
// - ปี 2566-2567: ทปอ. ไม่เผยแพร่ข้อสอบจริง มีเฉพาะโครงสร้าง/ตัวอย่าง + ข้อสอบจากสถาบัน
// - ปี 2568: ทปอ. เปลี่ยนนโยบาย ให้นำข้อสอบกลับบ้านได้ → มีข้อสอบ A-Level จริง + เฉลย
// - ปี 2569: ปีปัจจุบัน มี Blueprint + ตัวอย่าง
const EXAM_PAPERS = Object.freeze({
  // ─── TGAT ───
  tgat1: {
    2566: { label:'TGAT1 สื่อสารอังกฤษ ปี 66 · แนวข้อสอบ/ตัวอย่าง', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TCASter ฝึกทำ', url:'https://tcaster.net/examhub/', type:'practice' },
      { name:'SmartMathPro', url:'https://www.smartmathpro.com', type:'web' },
    ]},
    2567: { label:'TGAT1 สื่อสารอังกฤษ ปี 67 · แนวข้อสอบ/ตัวอย่าง', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TCASter ฝึกทำ', url:'https://tcaster.net/examhub/', type:'practice' },
      { name:'Dek-D รวมข้อสอบ', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'TGAT1 สื่อสารอังกฤษ ปี 68 · นร.นำข้อสอบกลับบ้านได้', tag:'ข้อสอบจริง', sources: [
      { name:'Dek-D รวมข้อสอบ', url:'https://www.dek-d.com/tcas/', type:'web' },
      { name:'SmartMathPro', url:'https://www.smartmathpro.com', type:'web' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
      { name:'Engstitute (อังกฤษ)', url:'https://engstitute.com', type:'web' },
    ]},
    2569: { label:'TGAT1 สื่อสารอังกฤษ ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
      { name:'TCASter ฝึกทำ', url:'https://tcaster.net/examhub/', type:'practice' },
    ]},
  },
  tgat2: {
    2566: { label:'TGAT2 คิดเชิงเหตุผล ปี 66 · แนวข้อสอบ/ตัวอย่าง', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TCASter ฝึกทำ', url:'https://tcaster.net/examhub/', type:'practice' },
    ]},
    2567: { label:'TGAT2 คิดเชิงเหตุผล ปี 67 · แนวข้อสอบ/ตัวอย่าง', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'Dek-D รวมข้อสอบ', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'TGAT2 คิดเชิงเหตุผล ปี 68 · นร.นำข้อสอบกลับบ้านได้', tag:'ข้อสอบจริง', sources: [
      { name:'Dek-D รวมข้อสอบ', url:'https://www.dek-d.com/tcas/', type:'web' },
      { name:'SmartMathPro', url:'https://www.smartmathpro.com', type:'web' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
    ]},
    2569: { label:'TGAT2 คิดเชิงเหตุผล ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
    ]},
  },
  tgat3: {
    2566: { label:'TGAT3 สมรรถนะทำงาน ปี 66 · แนวข้อสอบ/ตัวอย่าง', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TCASter ฝึกทำ', url:'https://tcaster.net/examhub/', type:'practice' },
    ]},
    2567: { label:'TGAT3 สมรรถนะทำงาน ปี 67 · แนวข้อสอบ/ตัวอย่าง', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'Dek-D รวมข้อสอบ', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'TGAT3 สมรรถนะทำงาน ปี 68 · นร.นำข้อสอบกลับบ้านได้', tag:'ข้อสอบจริง', sources: [
      { name:'Dek-D รวมข้อสอบ', url:'https://www.dek-d.com/tcas/', type:'web' },
      { name:'SmartMathPro', url:'https://www.smartmathpro.com', type:'web' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
    ]},
    2569: { label:'TGAT3 สมรรถนะทำงาน ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
    ]},
  },
  // ─── TPAT ───
  tpat1: {
    2566: { label:'TPAT1 กสพท. ปี 66 · แนวข้อสอบ/ตัวอย่าง', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'MedDent GAT', url:'https://meddentgat.com', type:'web' },
    ]},
    2567: { label:'TPAT1 กสพท. ปี 67 · แนวข้อสอบ/ตัวอย่าง', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'MedDent GAT', url:'https://meddentgat.com', type:'web' },
      { name:'Dek-D รวมข้อสอบ', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'TPAT1 กสพท. ปี 68 · แนวข้อสอบ', tag:'แนวข้อสอบ', sources: [
      { name:'Dek-D รวมข้อสอบ', url:'https://www.dek-d.com/tcas/', type:'web' },
      { name:'MedDent GAT', url:'https://meddentgat.com', type:'web' },
      { name:'Washi Tutor', url:'https://washitutor.com', type:'web' },
    ]},
    2569: { label:'TPAT1 กสพท. ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
    ]},
  },
  tpat2: {
    2566: { label:'TPAT2 ศิลปกรรม ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2567: { label:'TPAT2 ศิลปกรรม ปี 67 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'TPAT2 ศิลปกรรม ปี 68', tag:'แนวข้อสอบ', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
  },
  tpat3: {
    2566: { label:'TPAT3 วิศวกรรม ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2567: { label:'TPAT3 วิศวกรรม ปี 67 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'TPAT3 วิศวกรรม ปี 68', tag:'แนวข้อสอบ', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
      { name:'SmartMathPro', url:'https://www.smartmathpro.com', type:'web' },
    ]},
  },
  tpat4: {
    2566: { label:'TPAT4 สถาปัตย์ ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2567: { label:'TPAT4 สถาปัตย์ ปี 67', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'TPAT4 สถาปัตย์ ปี 68', tag:'แนวข้อสอบ', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
  },
  tpat5: {
    2566: { label:'TPAT5 ครุศาสตร์ ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2567: { label:'TPAT5 ครุศาสตร์ ปี 67', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'TPAT5 ครุศาสตร์ ปี 68', tag:'แนวข้อสอบ', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
  },
  // ─── A-Level (ปี 2568: ข้อสอบจริง+เฉลยจาก ทปอ.) ───
  alv_math1: {
    2566: { label:'A-Level คณิต1 ปี 66 · ข้อสอบ+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'Washi Tutor', url:'https://www.washi-tutor.com/exam', type:'web' },
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
    ]},
    2567: { label:'A-Level คณิต1 ปี 67 · ข้อสอบ+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'Washi Tutor', url:'https://www.washi-tutor.com/exam', type:'web' },
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
    ]},
    2568: { label:'A-Level คณิต1 ปี 68 · ✅ ข้อสอบจริง+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'Washi Tutor', url:'https://www.washi-tutor.com/exam', type:'web' },
      { name:'MyTCAS เฉลย', url:'https://www.mytcas.com/answers', type:'official' },
    ]},
    2569: { label:'A-Level คณิต1 ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'Washi Tutor', url:'https://www.washi-tutor.com/exam', type:'web' },
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
    ]},
  },
  alv_math2: {
    2566: { label:'A-Level คณิต2 ปี 66 · ข้อสอบ+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'Washi Tutor', url:'https://www.washi-tutor.com/exam', type:'web' },
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
    ]},
    2567: { label:'A-Level คณิต2 ปี 67 · ข้อสอบ+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'Washi Tutor', url:'https://www.washi-tutor.com/exam', type:'web' },
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
    ]},
    2568: { label:'A-Level คณิต2 ปี 68 · ✅ ข้อสอบจริง+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'Washi Tutor', url:'https://www.washi-tutor.com/exam', type:'web' },
      { name:'MyTCAS เฉลย', url:'https://www.mytcas.com/answers', type:'official' },
    ]},
    2569: { label:'A-Level คณิต2 ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'Washi Tutor', url:'https://www.washi-tutor.com/exam', type:'web' },
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
    ]},
  },
  alv_sci: {
    2566: { label:'A-Level วิทย์ประยุกต์ ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TruePlookpanya', url:'https://www.trueplookpanya.com', type:'practice' },
    ]},
    2567: { label:'A-Level วิทย์ประยุกต์ ปี 67 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
      { name:'TruePlookpanya', url:'https://www.trueplookpanya.com', type:'practice' },
    ]},
    2568: { label:'A-Level วิทย์ประยุกต์ ปี 68 · ✅ ข้อสอบจริง+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'MyTCAS เฉลย', url:'https://www.mytcas.com/answers', type:'official' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
  },
  alv_phy: {
    2566: { label:'A-Level ฟิสิกส์ ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TruePlookpanya', url:'https://www.trueplookpanya.com', type:'practice' },
    ]},
    2567: { label:'A-Level ฟิสิกส์ ปี 67 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
      { name:'Washi Tutor', url:'https://washitutor.com', type:'web' },
    ]},
    2568: { label:'A-Level ฟิสิกส์ ปี 68 · ✅ ข้อสอบจริง+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'MyTCAS เฉลย', url:'https://www.mytcas.com/answers', type:'official' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
      { name:'Washi Tutor', url:'https://washitutor.com', type:'web' },
    ]},
    2569: { label:'A-Level ฟิสิกส์ ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
    ]},
  },
  alv_chem: {
    2566: { label:'A-Level เคมี ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TruePlookpanya', url:'https://www.trueplookpanya.com', type:'practice' },
    ]},
    2567: { label:'A-Level เคมี ปี 67 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'A-Level เคมี ปี 68 · ✅ ข้อสอบจริง+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'MyTCAS เฉลย', url:'https://www.mytcas.com/answers', type:'official' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2569: { label:'A-Level เคมี ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
    ]},
  },
  alv_bio: {
    2566: { label:'A-Level ชีววิทยา ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TruePlookpanya', url:'https://www.trueplookpanya.com', type:'practice' },
    ]},
    2567: { label:'A-Level ชีววิทยา ปี 67 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'A-Level ชีววิทยา ปี 68 · ✅ ข้อสอบจริง+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'MyTCAS เฉลย', url:'https://www.mytcas.com/answers', type:'official' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
    ]},
  },
  alv_soc: {
    2566: { label:'A-Level สังคม ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TruePlookpanya', url:'https://www.trueplookpanya.com', type:'practice' },
    ]},
    2567: { label:'A-Level สังคม ปี 67 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'A-Level สังคม ปี 68 · ✅ ข้อสอบจริง+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'MyTCAS เฉลย', url:'https://www.mytcas.com/answers', type:'official' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
    ]},
    2569: { label:'A-Level สังคม ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
    ]},
  },
  alv_thai: {
    2566: { label:'A-Level ไทย ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TruePlookpanya', url:'https://www.trueplookpanya.com', type:'practice' },
    ]},
    2567: { label:'A-Level ไทย ปี 67 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
    ]},
    2568: { label:'A-Level ไทย ปี 68 · ✅ ข้อสอบจริง+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'MyTCAS เฉลย', url:'https://www.mytcas.com/answers', type:'official' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
    ]},
    2569: { label:'A-Level ไทย ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
    ]},
  },
  alv_eng: {
    2566: { label:'A-Level อังกฤษ ปี 66 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'MyTCAS Blueprint', url:'https://www.mytcas.com', type:'official' },
      { name:'TruePlookpanya', url:'https://www.trueplookpanya.com', type:'practice' },
      { name:'Engstitute', url:'https://engstitute.com', type:'web' },
    ]},
    2567: { label:'A-Level อังกฤษ ปี 67 · แนวข้อสอบ', tag:'ตัวอย่าง', sources: [
      { name:'Dek-D', url:'https://www.dek-d.com/tcas/', type:'web' },
      { name:'Engstitute', url:'https://engstitute.com', type:'web' },
    ]},
    2568: { label:'A-Level อังกฤษ ปี 68 · ✅ ข้อสอบจริง+เฉลย', tag:'ข้อสอบจริง', sources: [
      { name:'MyTCAS เฉลย', url:'https://www.mytcas.com/answers', type:'official' },
      { name:'Engstitute', url:'https://engstitute.com', type:'web' },
      { name:'KruChiangRai', url:'https://www.kruchiangrai.net', type:'web' },
    ]},
    2569: { label:'A-Level อังกฤษ ปี 69 · โครงสร้าง+ตัวอย่าง', tag:'Blueprint', sources: [
      { name:'MyTCAS โครงสร้างข้อสอบ', url:'https://www.mytcas.com', type:'official' },
      { name:'Engstitute', url:'https://engstitute.com', type:'web' },
    ]},
  },
});

const EXAM_GROUP_DEFS = [
  { key:'TGAT', label:'🧠 TGAT', color:'#f59e0b', subjects:['tgat1','tgat2','tgat3'] },
  { key:'TPAT', label:'🔧 TPAT', color:'#8b5cf6', subjects:['tpat1','tpat2','tpat3','tpat4','tpat5'] },
  { key:'A-Level', label:'📐 A-Level', color:'#3b82f6', subjects:['alv_math1','alv_math2','alv_sci','alv_phy','alv_chem','alv_bio','alv_soc','alv_thai','alv_eng'] },
];
const EXAM_YEARS = [2569, 2568, 2567, 2566];

const MYTCAS_ANSWERS_URL = 'https://www.mytcas.com/answers/';
const MYTCAS_A_LEVEL_69_NEWS_URL = 'https://www.mytcas.com/news/94/';
const MYTCAS_A_LEVEL_69_ANSWERS_PDF = 'https://assets.mytcas.com/69/alevel/69_answers_61-89.pdf';
const MYTCAS_A_LEVEL_LINKS = Object.freeze({
  alv_math1: { shortName:'คณิต1', pdf68:'https://assets.mytcas.com/68/answer/tcas68-math1-a-level.pdf', page69:1 },
  alv_math2: { shortName:'คณิต2', pdf68:'https://assets.mytcas.com/68/answer/tcas68-math2-a-level.pdf', page69:2 },
  alv_sci: { shortName:'วิทย์ประยุกต์', pdf68:'https://assets.mytcas.com/68/answer/tcas68-sci-a-level.pdf', page69:3 },
  alv_phy: { shortName:'ฟิสิกส์', pdf68:'https://assets.mytcas.com/68/answer/tcas68-phy-a-level.pdf', page69:4 },
  alv_chem: { shortName:'เคมี', pdf68:'https://assets.mytcas.com/68/answer/tcas68-chem-a-level.pdf', page69:5 },
  alv_bio: { shortName:'ชีววิทยา', pdf68:'https://assets.mytcas.com/68/answer/tcas68-bio-a-level.pdf', page69:6 },
  alv_soc: { shortName:'สังคม', pdf68:'https://assets.mytcas.com/68/answer/tcas68-soc-a-level.pdf', page69:7 },
  alv_thai: { shortName:'ไทย', pdf68:'https://assets.mytcas.com/68/answer/tcas68-thai-a-level.pdf', page69:8 },
  alv_eng: { shortName:'อังกฤษ', pdf68:'https://assets.mytcas.com/68/answer/tcas68-eng-a-level.pdf', page69:9 },
});
const MYTCAS_A_LEVEL_OFFICIAL = Object.freeze(
  Object.entries(MYTCAS_A_LEVEL_LINKS).reduce((acc, [sid, meta]) => {
    acc[sid] = {
      2568: { label:`A-Level ${meta.shortName} ปี 68 · ข้อสอบ+เฉลยทางการจาก MyTCAS`, tag:'ข้อสอบจริง', sources: [
        { name:'MyTCAS ข้อสอบ+เฉลย PDF', url:meta.pdf68, type:'pdf' },
        { name:'หน้า MyTCAS Answers', url:MYTCAS_ANSWERS_URL, type:'official' },
      ]},
      2569: { label:`A-Level ${meta.shortName} ปี 69 · เฉลยทางการจาก MyTCAS`, tag:'เฉลยทางการ', sources: [
        { name:'MyTCAS เฉลยรายวิชา PDF', url:`${MYTCAS_A_LEVEL_69_ANSWERS_PDF}#page=${meta.page69}`, type:'pdf' },
        { name:'ประกาศ MyTCAS ปี 69', url:MYTCAS_A_LEVEL_69_NEWS_URL, type:'official' },
      ]},
    };
    return acc;
  }, {})
);
const LIVE_LINK_SUBJECTS = Object.keys(MYTCAS_A_LEVEL_OFFICIAL);
function getExamPapers(sid) {
  if (!LIVE_LINK_SUBJECTS.includes(sid)) return null;
  return { ...(EXAM_PAPERS[sid] || {}), ...MYTCAS_A_LEVEL_OFFICIAL[sid] };
}

let examActiveGroup = 'A-Level';
let examActiveYear = 2568;

function selectExamGroup(key) {
  examActiveGroup = key;
  renderExamPapers();
}
function selectExamYear(year) {
  examActiveYear = year;
  renderExamPapers();
}

// Tag color/style helper
function getTagStyle(tag) {
  if (!tag) return '';
  const styles = {
    'ข้อสอบจริง': 'background:rgba(34,197,94,.15);color:var(--green2);border:1px solid rgba(34,197,94,.3)',
    'เฉลยทางการ': 'background:rgba(59,130,246,.14);color:var(--blue2);border:1px solid rgba(59,130,246,.3)',
    'Blueprint': 'background:rgba(59,130,246,.12);color:var(--blue2);border:1px solid rgba(59,130,246,.25)',
    'ตัวอย่าง': 'background:rgba(245,158,11,.1);color:var(--amber);border:1px solid rgba(245,158,11,.2)',
    'แนวข้อสอบ': 'background:rgba(139,92,246,.1);color:var(--purple2);border:1px solid rgba(139,92,246,.2)',
  };
  return styles[tag] || styles['ตัวอย่าง'];
}
function getSourceIcon(type) {
  const icons = { official:'🏛️', web:'🌐', practice:'🎯', pdf:'📥' };
  return icons[type] || '🔗';
}

function renderExamPapers() {
  const groupDef = EXAM_GROUP_DEFS.find(g => g.key === examActiveGroup) || EXAM_GROUP_DEFS[0];

  // Stats bar
  const statsBar = document.getElementById('exam-stats-bar');
  if (statsBar) {
    let totalPapers = 0;
    let totalSubjects = 0;
    EXAM_GROUP_DEFS.forEach(g => {
      g.subjects.forEach(sid => {
        const papers = getExamPapers(sid);
        if (papers) {
          totalSubjects++;
          totalPapers += Object.keys(papers).length;
        }
      });
    });
    statsBar.innerHTML = `
      <div class="exam-stat-chip"><span>📚</span> วิชาทั้งหมด <strong>${totalSubjects}</strong></div>
      <div class="exam-stat-chip"><span>📄</span> ชุดข้อสอบรวม <strong>${totalPapers}</strong></div>
      <div class="exam-stat-chip"><span>📅</span> ปี <strong>${EXAM_YEARS[EXAM_YEARS.length-1]}–${EXAM_YEARS[0]}</strong></div>
    `;
  }

  // Group tabs
  const groupBox = document.getElementById('exam-group-tabs');
  if (groupBox) {
    groupBox.innerHTML = EXAM_GROUP_DEFS.map(g =>
      `<button class="exam-group-tab ${g.key === examActiveGroup ? 'active' : ''}" style="--eg-color:${g.color}" onclick="selectExamGroup('${g.key}')">${g.label}</button>`
    ).join('');
  }

  // Year tabs with availability indicator
  const yearBox = document.getElementById('exam-year-tabs');
  if (yearBox) {
    yearBox.innerHTML = EXAM_YEARS.map(y => {
      // Count how many subjects have papers for this year in active group
      const avail = groupDef.subjects.filter(sid => getExamPapers(sid) && getExamPapers(sid)[y]).length;
      const total = groupDef.subjects.length;
      const pctLabel = avail > 0 ? ` (${avail})` : '';
      return `<button class="exam-year-tab ${y === examActiveYear ? 'active' : ''}" onclick="selectExamYear(${y})">${y}${pctLabel}</button>`;
    }).join('');
  }

  // Exam cards
  const grid = document.getElementById('exam-papers-grid');
  if (!grid) return;

  const subjects = groupDef.subjects;
  let cards = [];

  subjects.forEach(sid => {
    const tcas = TCAS_SUBJECTS[sid];
    if (!tcas) return;
    const papers = getExamPapers(sid);
    const yearData = papers ? papers[examActiveYear] : null;

    if (yearData && yearData.sources.length > 0) {
      const tagHTML = yearData.tag ? `<span style="display:inline-block;font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;margin-left:6px;${getTagStyle(yearData.tag)}">${yearData.tag}</span>` : '';

      const linksHTML = yearData.sources.map((src, i) =>
        `<a href="${src.url}" target="_blank" rel="noopener" class="exam-link-btn ${i === 0 ? 'primary' : ''}" style="--ec-color:${tcas.color}">
          ${getSourceIcon(src.type)}
          ${src.name}
        </a>`
      ).join('');

      cards.push(`<div class="exam-card" style="--ec-color:${tcas.color}">
        <div class="exam-card-header">
          <div class="exam-card-icon">${tcas.icon}</div>
          <div>
            <div class="exam-card-title">${tcas.name}${tagHTML}</div>
            <div class="exam-card-code">รหัส ${tcas.code} · ปี ${examActiveYear}</div>
          </div>
        </div>
        <div class="exam-card-info">${yearData.label}</div>
        <div class="exam-card-actions">${linksHTML}</div>
      </div>`);
    } else {
      cards.push(`<div class="exam-card" style="--ec-color:${tcas.color}">
        <div class="exam-card-header">
          <div class="exam-card-icon" style="opacity:.5">${tcas.icon}</div>
          <div>
            <div class="exam-card-title" style="color:var(--text2)">${tcas.name}</div>
            <div class="exam-card-code">รหัส ${tcas.code} · ปี ${examActiveYear}</div>
          </div>
        </div>
        <div class="exam-card-info" style="color:var(--text3);display:flex;align-items:center;gap:6px;margin-bottom:0">
          <span style="font-size:15px">🔜</span>
          <span>จะเพิ่มเข้ามาภายในเร็วๆนี้</span>
        </div>
      </div>`);
    }
  });

  grid.innerHTML = cards.length ? cards.join('') : '<div class="exam-empty">ยังไม่มีข้อสอบในกลุ่มนี้</div>';
}

init();
