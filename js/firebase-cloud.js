// ═══════════════════════════ FIREBASE ═══════════════════════════
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRmQhtjspXxYzn4k2DnOngKIfngVY7WnY",
  authDomain: "study-project-a.firebaseapp.com",
  projectId: "study-project-a",
  storageBucket: "study-project-a.firebasestorage.app",
  messagingSenderId: "426333975738",
  appId: "1:426333975738:web:66f58f385cc5cd7cfa3e83",
  measurementId: "G-2LHGJH40DD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;
let unsubSnapshot = null;
let didLoadCloudOnce = false;

function readLocalStudyData() {
  try {
    return JSON.parse(localStorage.getItem('studypath') || 'null');
  } catch(e) {
    console.warn('Local data parse error:', e);
    return null;
  }
}

function queueCloudBackup(d) {
  try {
    const payload = JSON.stringify(d || {});
    const savedAt = String(Date.now());
    localStorage.setItem('studypath', payload);
    localStorage.setItem('studypath-cloud-pending', payload);
    localStorage.setItem('studypath-cloud-pending-at', savedAt);
    return { payload, savedAt };
  } catch(e) {
    console.error('Local backup error:', e);
    return null;
  }
}

function applyStudyData(d) {
  window.data = d || {};
  if (!window.data.chapters) window.data.chapters = {tgat:[],tpat:[],phys:[],math:[]};
  if (!window.data.dekPlan) window.data.dekPlan = 'dek70';
  if (typeof window.data.dailyGoalManual !== 'boolean') window.data.dailyGoalManual = false;
}

function renderStudyDataAfterLoad(allowNavigate = false) {
  if (window.applyTheme) window.applyTheme(window.data.theme || localStorage.getItem('studypath-theme') || 'light');
  setTimeout(() => {
    if (window.renderDashboard) {
      window.renderDashboard();
      window.renderLog();
      window.renderSubjects();
      window.renderGoals();
      window.renderSubjectSelects && window.renderSubjectSelects();
      window.renderQuickAddChips && window.renderQuickAddChips();
    }
    const hasSubjects = (window.data.selectedSubjects||[]).length > 0;
    if (allowNavigate && hasSubjects && window.data.onboarded && window.showPage) { window.showPage('dashboard'); }
    document.getElementById('loading-overlay').style.display = 'none';
  }, 100);
}

// ─── AUTH UI ───
function renderAuthBar(user) {
  const bar = document.getElementById('auth-bar');
  if (user) {
    bar.innerHTML = `
      <div style="position:relative">
        <img src="${user.photoURL||'https://ui-avatars.com/api/?name='+encodeURIComponent(user.displayName||'U')+'&background=f59e0b&color=000'}"
          title="${user.displayName||user.email}"
          onclick="showSignOutModal()"
          style="width:30px;height:30px;border-radius:50%;border:2px solid var(--amber);cursor:pointer;display:block;transition:opacity .2s"
          onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">
      </div>`;
  } else {
    bar.innerHTML = `
      <button class="btn btn-primary btn-sm" id="btn-signin" style="white-space:nowrap;font-size:12px;padding:6px 10px">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:3px"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>Login
      </button>`;
    document.getElementById('btn-signin').onclick = () => {
      window._fbSignIn && window._fbSignIn();
    };
  }
}

// ─── SIGN OUT MODAL ───
window.showSignOutModal = function() {
  const user = window.currentUserFn && window.currentUserFn();
  if (!user) return;
  const modal = document.getElementById('signout-modal');
  document.getElementById('modal-avatar').src = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName||'U')}&background=f59e0b&color=000`;
  document.getElementById('modal-name').textContent = user.displayName || 'ผู้ใช้';
  document.getElementById('modal-email').textContent = user.email || '';
  modal.style.display = 'flex';
  requestAnimationFrame(() => modal.classList.add('show'));
};
window.hideSignOutModal = function() {
  const modal = document.getElementById('signout-modal');
  modal.classList.remove('show');
  setTimeout(() => modal.style.display = 'none', 250);
};
window.confirmSignOut = function() {
  window.hideSignOutModal();
  setTimeout(() => window._fbSignOut && window._fbSignOut(), 200);
};

// ─── CLOUD SAVE/LOAD ───
async function saveToCloud(d) {
  if (!currentUser) return;
  const backup = queueCloudBackup(d);
  if (!backup) return;
  try {
    await setDoc(doc(db, 'users', currentUser.uid), {
      studypath: backup.payload,
      updatedAt: Number(backup.savedAt),
    }, { merge: true });
    localStorage.removeItem('studypath-cloud-pending');
    localStorage.removeItem('studypath-cloud-pending-at');
  } catch(e) {
    console.error('Save error:', e);
    window.showToast && window.showToast('บันทึกขึ้น Firebase ไม่สำเร็จ เก็บสำรองไว้ในเครื่องแล้ว');
  }
}


// ─── AUTH STATE ───
onAuthStateChanged(auth, user => {
  currentUser = user;
  didLoadCloudOnce = false;
  renderAuthBar(user);
  if (user) {
    document.getElementById('loading-overlay').style.display = 'flex';
    subscribeUserData(user.uid);
    // Fallback: hide overlay after 8s even if snapshot never fires
    setTimeout(() => { document.getElementById('loading-overlay').style.display = 'none'; }, 8000);
    // showToast after main script loaded
    setTimeout(() => window.showToast && window.showToast('ยินดีต้อนรับ ' + (user.displayName || user.email) + ' 👋'), 500);
  } else {
    if (unsubSnapshot) { unsubSnapshot(); unsubSnapshot = null; }
    document.getElementById('loading-overlay').style.display = 'none';
    applyStudyData(readLocalStudyData() || {
      logs:[], chapters:{tgat:[],tpat:[],phys:[],math:[]}, streak:0, bestStreak:0, lastStudyDate:null, pomoDone:0, dailyGoal:4, dailyGoalManual:false, dekPlan:'dek70'
    });
    // ─── Apply theme from local data ───
    if (window.applyTheme) window.applyTheme(window.data.theme || localStorage.getItem('studypath-theme') || 'light');
    setTimeout(() => {
      if (window.renderDashboard) { window.renderDashboard(); window.renderLog(); window.renderSubjects(); window.renderGoals(); window.renderSubjectSelects && window.renderSubjectSelects(); window.renderQuickAddChips && window.renderQuickAddChips(); }
      // ถ้าเคยเลือกวิชาแล้ว ไม่ต้องแสดงหน้าเลือกวิชา
      const hasSubjects = (window.data.selectedSubjects||[]).length > 0;
      if (hasSubjects && window.data.onboarded && window.showPage) { window.showPage('dashboard'); }
    }, 300);
  }
});

// ─── EXPOSE to global scope ───
window.fbSave = saveToCloud;
window.currentUserFn = () => currentUser;
window._fbSignIn = () => signInWithPopup(auth, provider).catch(e => { window.showToast && window.showToast('Login ไม่สำเร็จ: ' + e.message); });
window._fbSignOut = () => signOut(auth);

// ─── subscribeUserData calls render via window ───
function subscribeUserData(uid) {
  if (unsubSnapshot) unsubSnapshot();
  unsubSnapshot = onSnapshot(doc(db, 'users', uid), snap => {
    if (snap.exists()) {
      const docData = snap.data();
      const cloud = JSON.parse(docData.studypath || 'null');
      const pending = localStorage.getItem('studypath-cloud-pending');
      const pendingAt = Number(localStorage.getItem('studypath-cloud-pending-at') || 0);
      const cloudAt = Number(docData.updatedAt || 0);
      if (!didLoadCloudOnce && pending && pendingAt > cloudAt) {
        const pendingData = JSON.parse(pending);
        applyStudyData(pendingData);
        saveToCloud(pendingData);
        didLoadCloudOnce = true;
        renderStudyDataAfterLoad(true);
        return;
      }
      if (cloud) {
        const allowNavigate = !didLoadCloudOnce;
        applyStudyData(cloud);
        didLoadCloudOnce = true;
        renderStudyDataAfterLoad(allowNavigate);
        return; // early return — overlay จะถูกซ่อนใน setTimeout แทน
      }
    }
    const localData = readLocalStudyData();
    if (!didLoadCloudOnce && localData) {
      applyStudyData(localData);
      saveToCloud(localData);
      didLoadCloudOnce = true;
      renderStudyDataAfterLoad(true);
      return;
    }
    didLoadCloudOnce = true;
    // กรณีไม่มีข้อมูลใน cloud (user ใหม่) — ซ่อน overlay ทันที
    document.getElementById('loading-overlay').style.display = 'none';
  }, err => {
    console.error('Cloud load error:', err);
    const localData = readLocalStudyData();
    if (localData) applyStudyData(localData);
    renderStudyDataAfterLoad(true);
    window.showToast && window.showToast('โหลดข้อมูล Firebase ไม่สำเร็จ ใช้ข้อมูลสำรองในเครื่องแทน');
  });
}
