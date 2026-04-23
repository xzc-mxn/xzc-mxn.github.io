/* ═══════════════════════════════════════════════
   LUXURY HUB EVO — Auth System
   ═══════════════════════════════════════════════ */
 
const Auth = (() => {
  const ADMIN = { username: 'xZc', password: 'xZcAdmin01xyz', isAdmin: true };
  const KEY_USERS   = 'lxh_users';
  const KEY_SESSION = 'lxh_session';
 
  // ── DB helpers ─────────────────────────────────
  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem(KEY_USERS)) || []; } catch { return []; }
  };
  const saveUsers = (u) => localStorage.setItem(KEY_USERS, JSON.stringify(u));
 
  // Ensure admin always exists
  const ensureAdmin = () => {
    const users = getUsers();
    if (!users.find(u => u.username === ADMIN.username)) {
      users.unshift({ ...ADMIN, credits: 999999, createdAt: Date.now(), orders: [] });
      saveUsers(users);
    }
  };
 
  // ── Session ────────────────────────────────────
  const getSession = () => {
    try { return JSON.parse(localStorage.getItem(KEY_SESSION)); } catch { return null; }
  };
  const setSession = (user) => localStorage.setItem(KEY_SESSION, JSON.stringify(user));
  const clearSession = () => localStorage.removeItem(KEY_SESSION);
 
  const getCurrentUser = () => {
    const s = getSession();
    if (!s) return null;
    return getUsers().find(u => u.username === s.username) || null;
  };
 
  const isAdmin = () => {
    const u = getCurrentUser();
    return u && u.isAdmin === true;
  };
 
  const isLoggedIn = () => !!getCurrentUser();
 
  // ── Login ──────────────────────────────────────
  const login = (username, password) => {
    ensureAdmin();
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return { ok: false, msg: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
    setSession({ username: user.username, isAdmin: user.isAdmin });
    return { ok: true, user };
  };
 
  // ── Register ───────────────────────────────────
  const register = (username, password, email) => {
    ensureAdmin();
    if (username === ADMIN.username) return { ok: false, msg: 'ชื่อผู้ใช้นี้ไม่สามารถใช้ได้' };
    if (username.length < 4) return { ok: false, msg: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 4 ตัวอักษร' };
    if (password.length < 6) return { ok: false, msg: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' };
    const users = getUsers();
    if (users.find(u => u.username === username)) return { ok: false, msg: 'ชื่อผู้ใช้นี้มีอยู่แล้ว' };
    const newUser = {
      username, password, email: email || '',
      isAdmin: false, credits: 0,
      createdAt: Date.now(), orders: []
    };
    users.push(newUser);
    saveUsers(users);
    setSession({ username, isAdmin: false });
    return { ok: true, user: newUser };
  };
 
  // ── Logout ─────────────────────────────────────
  const logout = () => {
    clearSession();
    updateNavUI();
    Modal.closeAll();
    location.reload();
  };
 
  // ── Credit management ──────────────────────────
  const addCredits = (username, amount) => {
    const users = getUsers();
    const u = users.find(u => u.username === username);
    if (!u) return false;
    u.credits = (u.credits || 0) + Number(amount);
    saveUsers(users);
    return true;
  };
 
  const deductCredits = (username, amount) => {
    const users = getUsers();
    const u = users.find(u => u.username === username);
    if (!u || (u.credits || 0) < amount) return false;
    u.credits -= Number(amount);
    saveUsers(users);
    return true;
  };
 
  const getUserCredits = (username) => {
    const u = getUsers().find(u => u.username === username);
    return u ? (u.credits || 0) : 0;
  };
 
  const getAllUsers = () => getUsers();
 
  // ── Update current user data ───────────────────
  const updateCurrentUser = (data) => {
    const users = getUsers();
    const s = getSession();
    if (!s) return;
    const idx = users.findIndex(u => u.username === s.username);
    if (idx === -1) return;
    users[idx] = { ...users[idx], ...data };
    saveUsers(users);
  };
 
  // ── Nav UI sync ────────────────────────────────
  const updateNavUI = () => {
    const user = getCurrentUser();
    const authBtn   = document.getElementById('navAuthBtn');
    const userMenu  = document.getElementById('navUserMenu');
    const adminBtn  = document.getElementById('navAdminBtn');
    const userCredit = document.getElementById('navUserCredit');
 
    if (!authBtn) return;
    if (user) {
      authBtn.style.display = 'none';
      if (userMenu)  userMenu.style.display  = 'flex';
      if (userCredit) userCredit.textContent = `฿${user.credits || 0}`;
      if (adminBtn)  adminBtn.style.display  = user.isAdmin ? 'flex' : 'none';
    } else {
      authBtn.style.display = 'flex';
      if (userMenu) userMenu.style.display = 'none';
      if (adminBtn) adminBtn.style.display = 'none';
    }
  };
 
  // ── Init ───────────────────────────────────────
  const init = () => {
    ensureAdmin();
    updateNavUI();
  };
 
  return {
    login, logout, register,
    getCurrentUser, isAdmin, isLoggedIn,
    addCredits, deductCredits, getUserCredits, getAllUsers,
    updateCurrentUser, updateNavUI, getSession, ensureAdmin
  };
})();
