(function () {
  "use strict";

  const MYTCAS_ANSWERS_URL = "https://www.mytcas.com/answers/";
  const MYTCAS_ANSWER_KEY_URL = "https://assets.mytcas.com/68/alevel/alevel-answers.pdf";
  const MYTCAS_BLUEPRINT_URL = "https://www.mytcas.com/blueprint/";
  const DEKUNI_TGAT_URL = "https://dekuni.com/tgat-test/";
  const KRU_TGAT_URL = "https://www.kruchiangrai.net/2025/12/27/%E0%B8%94%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C%E0%B9%82%E0%B8%AB%E0%B8%A5%E0%B8%94%E0%B8%82%E0%B9%89%E0%B8%AD%E0%B8%AA%E0%B8%AD%E0%B8%9A-tgat-68/";
  const MEDDENT_TGAT_URL = "https://www.meddentgat.com/posts/free-exam-tgat2-3";

  const examState = {
    group: "all",
    year: "all",
    status: "all",
    source: "all",
    query: ""
  };

  const A_LEVEL_2568 = [
    ["alv_math1", "A-Level คณิตศาสตร์ประยุกต์ 1", "61", "https://assets.mytcas.com/68/answer/tcas68-math1-a-level.pdf", 21],
    ["alv_math2", "A-Level คณิตศาสตร์ประยุกต์ 2", "62", "https://assets.mytcas.com/68/answer/tcas68-math2-a-level.pdf", 21],
    ["alv_sci", "A-Level วิทยาศาสตร์ประยุกต์", "63", "https://assets.mytcas.com/68/answer/tcas68-sci-a-level.pdf", 31],
    ["alv_phy", "A-Level ฟิสิกส์", "64", "https://assets.mytcas.com/68/answer/tcas68-phy-a-level.pdf", 23],
    ["alv_chem", "A-Level เคมี", "65", "https://assets.mytcas.com/68/answer/tcas68-chem-a-level.pdf", 27],
    ["alv_bio", "A-Level ชีววิทยา", "66", "https://assets.mytcas.com/68/answer/tcas68-bio-a-level.pdf", 36],
    ["alv_soc", "A-Level สังคมศึกษา", "70", "https://assets.mytcas.com/68/answer/tcas68-soc-a-level.pdf", 27],
    ["alv_thai", "A-Level ภาษาไทย", "81", "https://assets.mytcas.com/68/answer/tcas68-thai-a-level.pdf", 23],
    ["alv_eng", "A-Level ภาษาอังกฤษ", "82", "https://assets.mytcas.com/68/answer/tcas68-eng-a-level.pdf", 37]
  ].map(([subjectId, title, code, examUrl, pages]) => ({
    id: `${subjectId}_2568_official`,
    group: "A-Level",
    subjectId,
    title,
    code,
    year: 2568,
    pages,
    minutes: 90,
    maxScore: 100,
    kind: "ข้อสอบจริง",
    sourceType: "official",
    sourceLabel: "ทางการ",
    sourceBadge: "Official",
    description: "ข้อสอบจริงปีการศึกษา 2568 จาก MyTCAS เปิดเป็นไฟล์ PDF รายวิชาโดยตรง",
    primaryUrl: examUrl,
    answerUrl: MYTCAS_ANSWER_KEY_URL,
    credit: "MyTCAS / TCAS",
    creditUrl: MYTCAS_ANSWERS_URL,
    verifiedNote: "เปิดลิงก์แล้วเป็น PDF ข้อสอบรายวิชา"
  }));

  const SP_EXAM_LIBRARY = Object.freeze([
    ...A_LEVEL_2568,
    {
      id: "tgat23_2569_meddent_real",
      group: "TGAT",
      subjectId: "tgat2",
      title: "TGAT2&3 ปี 2569",
      code: "92-93",
      year: 2569,
      pages: 17,
      minutes: 180,
      maxScore: 100,
      kind: "ข้อสอบจริง",
      sourceType: "community",
      sourceLabel: "ชุมชนรวบรวม",
      sourceBadge: "Real exam",
      description: "ชุดข้อสอบจริง TGAT2&3 จากหน้าแจกฟรีของ MEDDENT",
      primaryUrl: "https://drive.google.com/file/d/1OL3bQQCpVV-1aCCnoDtrRzeM7driW8Qt/view?usp=sharing",
      answerUrl: "",
      credit: "MEDDENT ความถนัดแพทย์",
      creditUrl: MEDDENT_TGAT_URL,
      verifiedNote: "หน้าเครดิตระบุว่าเป็นข้อสอบจริง TGAT2&3 ปี69"
    },
    {
      id: "tgat23_2568_dekuni_round1",
      group: "TGAT",
      subjectId: "tgat2",
      title: "TGAT2&3 ปี 2568 ชุดที่ 1",
      code: "92-93",
      year: 2568,
      pages: 17,
      minutes: 180,
      maxScore: 100,
      kind: "ข้อสอบจริง",
      sourceType: "community",
      sourceLabel: "ชุมชนรวบรวม",
      sourceBadge: "Real exam",
      description: "ไฟล์ข้อสอบ TGAT2&3 จากคลัง Dekuni พร้อมลิงก์เฉลยแยก",
      primaryUrl: "https://drive.google.com/file/d/1E3yokL3uWemLoiaaLCKCbX21wEA8tN9B/view?usp=share_link",
      answerUrl: "https://drive.google.com/file/d/1tl4ApTbUJa5MtuYI1zCrgLgBVH8aGDIj/view",
      credit: "Dekuni / คลังข้อสอบ TGAT",
      creditUrl: DEKUNI_TGAT_URL,
      verifiedNote: "หน้าเครดิตรวมข้อสอบ TGAT ทุกพาร์ทย้อนหลัง 2566-2568"
    },
    {
      id: "tgat23_2568_dekuni_round2",
      group: "TGAT",
      subjectId: "tgat3",
      title: "TGAT2&3 ปี 2568 ชุดที่ 2",
      code: "92-93",
      year: 2568,
      pages: 17,
      minutes: 180,
      maxScore: 100,
      kind: "ข้อสอบจริง",
      sourceType: "community",
      sourceLabel: "ชุมชนรวบรวม",
      sourceBadge: "Real exam",
      description: "ชุดที่ 2 ของ TGAT2&3 จากคลัง Dekuni พร้อมลิงก์เฉลย",
      primaryUrl: "https://drive.google.com/file/d/105N7tfobcaIhG9DfHozuL4uwEMa5ToVf/view",
      answerUrl: "https://drive.google.com/file/d/1ZLxhT3YX35oDh2A_O8fHDjRd98iaA58H/view",
      credit: "Dekuni / คลังข้อสอบ TGAT",
      creditUrl: DEKUNI_TGAT_URL,
      verifiedNote: "หน้าเครดิตรวมข้อสอบ TGAT ทุกพาร์ทย้อนหลัง 2566-2568"
    },
    {
      id: "tgat_all_2568_kru_folder",
      group: "TGAT",
      subjectId: "tgat1",
      title: "TGAT 68 รวมทุกพาร์ท",
      code: "91-93",
      year: 2568,
      pages: null,
      minutes: 180,
      maxScore: 300,
      kind: "ข้อสอบจริง",
      sourceType: "community",
      sourceLabel: "โฟลเดอร์รวม",
      sourceBadge: "Drive folder",
      description: "โฟลเดอร์ Google Drive ที่แหล่งเครดิตระบุว่ามี TGAT1, TGAT2, TGAT3 และเฉลยในรูปแบบ PDF",
      primaryUrl: "https://drive.google.com/drive/folders/1jpUpYVFasZxEivUEQYo04f34jh8qAxMm",
      answerUrl: "",
      credit: "ครูเชียงรายดอทเน็ต / รวบรวมข้อมูลการศึกษาเพื่อเด็กไทย",
      creditUrl: KRU_TGAT_URL,
      verifiedNote: "หน้าเครดิตระบุว่าในโฟลเดอร์มีไฟล์ข้อสอบ TGAT 68 แยกชุดพร้อมเฉลย"
    },
    {
      id: "tgat2_2567_dekuni",
      group: "TGAT",
      subjectId: "tgat2",
      title: "TGAT2 ปี 2567",
      code: "92",
      year: 2567,
      pages: null,
      minutes: 90,
      maxScore: 100,
      kind: "ข้อสอบจริง",
      sourceType: "community",
      sourceLabel: "ชุมชนรวบรวม",
      sourceBadge: "Real exam",
      description: "ข้อสอบ TGAT2 ปี 2567 จากคลัง Dekuni พร้อมลิงก์เฉลย",
      primaryUrl: "https://drive.google.com/file/d/1FTm6qQ9KYHE7FSzl4uGa0LGBH2j2UbpV/view?usp=sharing",
      answerUrl: "https://drive.google.com/file/d/1wuM2h-HWp-IPlrExCxeC3ZC4rhL6R2z5/view",
      credit: "Dekuni / คลังข้อสอบ TGAT",
      creditUrl: DEKUNI_TGAT_URL,
      verifiedNote: "หน้าเครดิตระบุว่าเป็นข้อสอบ TGAT2 ปี2567 พร้อมเฉลย"
    },
    {
      id: "tgat2_2566_dekuni",
      group: "TGAT",
      subjectId: "tgat2",
      title: "TGAT2 ปี 2566",
      code: "92",
      year: 2566,
      pages: null,
      minutes: 90,
      maxScore: 100,
      kind: "ข้อสอบจริง",
      sourceType: "community",
      sourceLabel: "ชุมชนรวบรวม",
      sourceBadge: "Real exam",
      description: "ข้อสอบ TGAT2 ปี 2566 จากคลัง Dekuni",
      primaryUrl: "https://drive.google.com/file/d/16HSRGCag0YDaPGWk_fwH0bV9uKNtDLgq/view?usp=sharing",
      answerUrl: "",
      credit: "Dekuni / เครดิตเดิมหน้าเว็บระบุเพจ Jax สอนสังคมและภาษาไทย",
      creditUrl: DEKUNI_TGAT_URL,
      verifiedNote: "หน้าเครดิตระบุว่าเป็นข้อสอบ TGAT2 ปี2566"
    },
    {
      id: "tgat3_2566_dekuni",
      group: "TGAT",
      subjectId: "tgat3",
      title: "TGAT3 ปี 2566",
      code: "93",
      year: 2566,
      pages: null,
      minutes: 90,
      maxScore: 100,
      kind: "ข้อสอบจริง",
      sourceType: "community",
      sourceLabel: "ชุมชนรวบรวม",
      sourceBadge: "Real exam",
      description: "ข้อสอบ TGAT3 ปี 2566 จากคลัง Dekuni",
      primaryUrl: "https://drive.google.com/file/d/1oB_5yME_j3jnosH8UfFr3s1t9SIInPle/view?usp=sharing",
      answerUrl: "",
      credit: "Dekuni / เครดิตเดิมหน้าเว็บระบุเพจ Jax สอนสังคมและภาษาไทย",
      creditUrl: DEKUNI_TGAT_URL,
      verifiedNote: "หน้าเครดิตระบุว่าเป็นข้อสอบ TGAT3 ปี2566"
    },
    {
      id: "mytcas_blueprint_tgat_tpat_2569",
      group: "TPAT",
      subjectId: "tpat3",
      title: "Blueprint และตัวอย่างข้อสอบ TCAS69",
      code: "TGAT/TPAT/A-Level",
      year: 2569,
      pages: null,
      minutes: null,
      maxScore: 100,
      kind: "ตัวอย่างทางการ",
      sourceType: "sample",
      sourceLabel: "ตัวอย่าง",
      sourceBadge: "Sample",
      description: "หน้าโครงสร้างข้อสอบและตัวอย่างข้อสอบจาก MyTCAS ใช้ดูแนวทาง ไม่ใช่ข้อสอบจริงทั้งฉบับ",
      primaryUrl: MYTCAS_BLUEPRINT_URL,
      answerUrl: "",
      credit: "MyTCAS / TCAS Blueprint",
      creditUrl: MYTCAS_BLUEPRINT_URL,
      verifiedNote: "แหล่งทางการระบุว่าเป็นแนวทางและตัวอย่างข้อสอบ"
    }
  ]);

  const GROUP_FILTERS = [
    { key: "all", label: "ทั้งหมด", color: "var(--teal)" },
    { key: "A-Level", label: "A-Level", color: "var(--blue2)" },
    { key: "TGAT", label: "TGAT", color: "var(--amber)" },
    { key: "TPAT", label: "TPAT / ตัวอย่าง", color: "var(--purple2)" }
  ];

  const STATUS_FILTERS = [
    { key: "all", label: "ทุกสถานะ" },
    { key: "todo", label: "ยังไม่ทำ" },
    { key: "planned", label: "วางแผนแล้ว" },
    { key: "done", label: "ทำแล้ว" },
    { key: "scored", label: "มีคะแนน" }
  ];

  const SOURCE_FILTERS = [
    { key: "all", label: "ทุกแหล่ง" },
    { key: "official", label: "ทางการ" },
    { key: "community", label: "ข้อสอบจริง/ชุมชน" },
    { key: "sample", label: "ตัวอย่าง" }
  ];

  function appData() {
    if (!window.data || typeof window.data !== "object") window.data = {};
    return window.data;
  }

  function ensureStudyData() {
    const data = appData();
    if (!Array.isArray(data.examAttempts)) data.examAttempts = [];
    if (!data.examStatus || typeof data.examStatus !== "object") data.examStatus = {};
    if (!Array.isArray(data.mistakes)) data.mistakes = [];
    if (!data.dailyTasks || typeof data.dailyTasks !== "object") data.dailyTasks = {};
    if (!data.activeMock || typeof data.activeMock !== "object") data.activeMock = null;
    return data;
  }

  function saveStudyData() {
    if (typeof window.studySave === "function") window.studySave();
    else showToast("Login ก่อนเพื่อบันทึกข้อมูลขึ้น Firebase");
  }

  function showToast(message) {
    if (typeof window.showToast === "function") window.showToast(message);
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function escapeAttr(value) {
    return escapeHTML(value).replace(/`/g, "&#96;");
  }

  function todayKey() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatThaiDate(dateKey) {
    if (!dateKey) return "-";
    const [year, month, day] = String(dateKey).split("-").map(Number);
    return new Date(year, (month || 1) - 1, day || 1).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function normalizeText(value) {
    return String(value ?? "").toLowerCase().trim();
  }

  function subjectMeta(subjectId) {
    const subject = (window.TCAS_SUBJECTS || {})[subjectId];
    if (subject) return subject;
    return {
      id: subjectId,
      name: subjectId || "ข้อสอบ",
      code: "",
      group: "",
      color: "var(--teal)",
      icon: "📄"
    };
  }

  function cleanSubjectName(name) {
    return String(name || "").replace(/^(TGAT|TPAT|A-Level)\s*/i, "").trim();
  }

  function findExam(examId) {
    return SP_EXAM_LIBRARY.find((exam) => exam.id === examId) || null;
  }

  function attemptsFor(examId) {
    const data = ensureStudyData();
    return data.examAttempts
      .filter((attempt) => attempt.examId === examId)
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")) || (b.id || 0) - (a.id || 0));
  }

  function bestAttempt(examId) {
    return attemptsFor(examId).sort((a, b) => (b.percent || 0) - (a.percent || 0))[0] || null;
  }

  function paperStatus(examId) {
    const data = ensureStudyData();
    if (attemptsFor(examId).length) return "scored";
    return data.examStatus[examId]?.status || "todo";
  }

  function statusLabel(status) {
    const labels = {
      todo: "ยังไม่ทำ",
      planned: "วางแผนแล้ว",
      done: "ทำแล้ว",
      scored: "มีคะแนน"
    };
    return labels[status] || labels.todo;
  }

  function sourceLabel(sourceType) {
    const labels = {
      official: "ทางการ",
      community: "ข้อสอบจริง/ชุมชน",
      sample: "ตัวอย่าง"
    };
    return labels[sourceType] || "แหล่งรวม";
  }

  function selectedSubjectsSet() {
    const data = ensureStudyData();
    return new Set(data.selectedSubjects || []);
  }

  function filteredExams() {
    const query = normalizeText(examState.query);
    return SP_EXAM_LIBRARY.filter((exam) => {
      const subject = subjectMeta(exam.subjectId);
      const status = paperStatus(exam.id);
      const haystack = normalizeText(`${exam.title} ${exam.code} ${exam.year} ${exam.kind} ${exam.credit} ${subject.name}`);
      if (examState.group !== "all" && exam.group !== examState.group) return false;
      if (examState.year !== "all" && Number(examState.year) !== exam.year) return false;
      if (examState.status === "scored" && !attemptsFor(exam.id).length) return false;
      if (examState.status !== "all" && examState.status !== "scored" && status !== examState.status) return false;
      if (examState.source !== "all" && exam.sourceType !== examState.source) return false;
      if (query && !haystack.includes(query)) return false;
      return true;
    });
  }

  function examStats() {
    const data = ensureStudyData();
    const scored = data.examAttempts.length;
    const percents = data.examAttempts.map((attempt) => attempt.percent).filter(Number.isFinite);
    const avg = percents.length ? Math.round(percents.reduce((sum, value) => sum + value, 0) / percents.length) : 0;
    const done = SP_EXAM_LIBRARY.filter((exam) => ["done", "scored"].includes(paperStatus(exam.id))).length;
    const official = SP_EXAM_LIBRARY.filter((exam) => exam.sourceType === "official").length;
    const unresolvedMistakes = data.mistakes.filter((item) => !item.resolved).length;
    return { done, scored, avg, official, unresolvedMistakes, total: SP_EXAM_LIBRARY.length };
  }

  function renderStatChip(icon, label, value, tone) {
    return `
      <div class="exam-stat-chip sp-stat-chip ${tone ? `sp-${tone}` : ""}">
        <span>${icon}</span>
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `;
  }

  function ensureExamScaffold() {
    const statsBar = document.getElementById("exam-stats-bar");
    const grid = document.getElementById("exam-papers-grid");
    if (statsBar && !document.getElementById("sp-exam-tools")) {
      statsBar.insertAdjacentHTML("afterend", `
        <div id="sp-exam-tools" class="sp-exam-tools"></div>
      `);
    }
    if (grid && !document.getElementById("sp-exam-after-grid")) {
      grid.insertAdjacentHTML("afterend", `
        <div id="sp-exam-after-grid" class="sp-exam-after-grid"></div>
      `);
    }
  }

  function renderExamFilters() {
    const groupBox = document.getElementById("exam-group-tabs");
    if (groupBox) {
      groupBox.innerHTML = GROUP_FILTERS.map((group) => `
        <button class="exam-group-tab ${examState.group === group.key ? "active" : ""}"
          style="--eg-color:${escapeAttr(group.color)}"
          onclick="spSetExamGroup('${escapeAttr(group.key)}')">${escapeHTML(group.label)}</button>
      `).join("");
    }

    const years = [...new Set(SP_EXAM_LIBRARY.map((exam) => exam.year))].sort((a, b) => b - a);
    const yearBox = document.getElementById("exam-year-tabs");
    if (yearBox) {
      yearBox.innerHTML = [
        `<button class="exam-year-tab ${examState.year === "all" ? "active" : ""}" onclick="spSetExamYear('all')">ทุกปี</button>`,
        ...years.map((year) => {
          const count = SP_EXAM_LIBRARY.filter((exam) => exam.year === year && (examState.group === "all" || exam.group === examState.group)).length;
          return `<button class="exam-year-tab ${Number(examState.year) === year ? "active" : ""}" onclick="spSetExamYear('${year}')">${year} (${count})</button>`;
        })
      ].join("");
    }

    const tools = document.getElementById("sp-exam-tools");
    if (tools) {
      tools.innerHTML = `
        <div class="sp-search-wrap">
          <span aria-hidden="true">ค้นหา</span>
          <input class="sp-exam-search" type="search" value="${escapeAttr(examState.query)}"
            placeholder="ค้นหาวิชา ปี แหล่งที่มา..."
            oninput="spSetExamQuery(this.value)">
        </div>
        <div class="sp-filter-row" aria-label="ตัวกรองสถานะ">
          ${STATUS_FILTERS.map((item) => `
            <button class="sp-filter-chip ${examState.status === item.key ? "active" : ""}" onclick="spSetExamStatusFilter('${item.key}')">
              ${escapeHTML(item.label)}
            </button>
          `).join("")}
        </div>
        <div class="sp-filter-row" aria-label="ตัวกรองแหล่งที่มา">
          ${SOURCE_FILTERS.map((item) => `
            <button class="sp-filter-chip ${examState.source === item.key ? "active" : ""}" onclick="spSetExamSourceFilter('${item.key}')">
              ${escapeHTML(item.label)}
            </button>
          `).join("")}
        </div>
      `;
    }
  }

  function renderExamCard(exam) {
    const subject = subjectMeta(exam.subjectId);
    const attempts = attemptsFor(exam.id);
    const best = bestAttempt(exam.id);
    const status = paperStatus(exam.id);
    const statusClass = status === "scored" ? "done" : status;
    const isOfficial = exam.sourceType === "official";
    const activeMock = ensureStudyData().activeMock?.examId === exam.id ? ensureStudyData().activeMock : null;
    const startedAt = activeMock ? new Date(activeMock.startedAt).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }) : "";
    const selected = selectedSubjectsSet().has(exam.subjectId);
    const metaItems = [
      `ปี ${exam.year}`,
      exam.pages ? `${exam.pages} หน้า` : "",
      exam.minutes ? `${exam.minutes} นาที` : "",
      exam.maxScore ? `${exam.maxScore} คะแนน` : ""
    ].filter(Boolean);
    const badgeClass = isOfficial ? "official" : exam.sourceType === "sample" ? "sample" : "community";

    return `
      <article class="exam-card sp-exam-card ${selected ? "is-selected-subject" : ""}" style="--ec-color:${escapeAttr(subject.color || "var(--teal)")};">
        <div class="exam-card-header">
          <div class="exam-card-icon">${escapeHTML(subject.icon || "📄")}</div>
          <div class="sp-exam-head-text">
            <div class="exam-card-title">
              ${escapeHTML(exam.title)}
              <span class="sp-source-badge ${badgeClass}">${escapeHTML(exam.sourceBadge)}</span>
            </div>
            <div class="exam-card-code">รหัส ${escapeHTML(exam.code)} · ${escapeHTML(cleanSubjectName(subject.name))}</div>
          </div>
          <span class="sp-status-pill ${statusClass}">${escapeHTML(statusLabel(status))}</span>
        </div>

        <div class="sp-exam-meta">
          ${metaItems.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}
        </div>

        <div class="exam-card-info">
          ${escapeHTML(exam.description)}
          <div class="sp-verified-note">${escapeHTML(exam.verifiedNote)}</div>
        </div>

        ${best ? `
          <div class="sp-score-strip">
            <div>
              <span>คะแนนดีที่สุด</span>
              <strong>${Math.round(best.percent)}%</strong>
            </div>
            <div class="sp-score-bar"><i style="width:${Math.min(100, Math.max(0, best.percent || 0))}%"></i></div>
            <em>${escapeHTML(best.score)}/${escapeHTML(best.maxScore)} · ${escapeHTML(formatThaiDate(best.date))}</em>
          </div>
        ` : activeMock ? `
          <div class="sp-score-strip active">
            <div>
              <span>กำลังจับ Mock</span>
              <strong>${escapeHTML(startedAt)}</strong>
            </div>
            <em>ทำเสร็จแล้วกดบันทึกคะแนน</em>
          </div>
        ` : ""}

        <div class="exam-card-actions">
          <a href="${escapeAttr(exam.primaryUrl)}" target="_blank" rel="noopener" class="exam-link-btn primary" onclick="spMarkExamTouched('${escapeAttr(exam.id)}')">
            เปิดข้อสอบ
          </a>
          ${exam.answerUrl ? `<a href="${escapeAttr(exam.answerUrl)}" target="_blank" rel="noopener" class="exam-link-btn">เฉลย</a>` : ""}
          <a href="${escapeAttr(exam.creditUrl)}" target="_blank" rel="noopener" class="exam-link-btn">เครดิต</a>
        </div>

        <div class="sp-card-actions">
          <button class="sp-action-btn" onclick="spStartMock('${escapeAttr(exam.id)}')">เริ่ม Mock</button>
          <button class="sp-action-btn primary" onclick="spRecordExamScore('${escapeAttr(exam.id)}')">บันทึกคะแนน</button>
          <button class="sp-action-btn" onclick="spSetPaperStatus('${escapeAttr(exam.id)}','done')">ทำแล้ว</button>
          <button class="sp-action-btn" onclick="spAddMistake('${escapeAttr(exam.id)}')">จดข้อผิดพลาด</button>
        </div>

        <div class="sp-credit-line">
          เครดิต: <a href="${escapeAttr(exam.creditUrl)}" target="_blank" rel="noopener">${escapeHTML(exam.credit)}</a>
          · ประเภท: ${escapeHTML(sourceLabel(exam.sourceType))}
          ${attempts.length ? `· ทำแล้ว ${attempts.length} ครั้ง` : ""}
        </div>
      </article>
    `;
  }

  function renderAttemptHistory() {
    const data = ensureStudyData();
    const recent = [...data.examAttempts]
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")) || (b.id || 0) - (a.id || 0))
      .slice(0, 8);
    if (!recent.length) {
      return `
        <section class="sp-side-panel">
          <div class="sp-panel-head">
            <div>
              <span>Score Log</span>
              <strong>ยังไม่มีคะแนน</strong>
            </div>
          </div>
          <p class="sp-muted">ลองเปิดข้อสอบ ทำแบบจับเวลา แล้วกดบันทึกคะแนนเพื่อให้ระบบช่วยติดตามพัฒนาการ</p>
        </section>
      `;
    }

    return `
      <section class="sp-side-panel">
        <div class="sp-panel-head">
          <div>
            <span>Score Log</span>
            <strong>คะแนนล่าสุด</strong>
          </div>
        </div>
        <div class="sp-attempt-list">
          ${recent.map((attempt) => {
            const exam = findExam(attempt.examId);
            return `
              <div class="sp-attempt-item">
                <div>
                  <strong>${escapeHTML(exam ? exam.title : "ข้อสอบ")}</strong>
                  <span>${escapeHTML(formatThaiDate(attempt.date))}${attempt.wrong ? ` · ผิด ${escapeHTML(attempt.wrong)} ข้อ` : ""}</span>
                </div>
                <b>${Math.round(attempt.percent || 0)}%</b>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderMistakeBook() {
    const data = ensureStudyData();
    const items = data.mistakes
      .filter((item) => !item.resolved)
      .sort((a, b) => String(a.nextReview || "").localeCompare(String(b.nextReview || "")))
      .slice(0, 10);

    if (!items.length) {
      return `
        <section class="sp-side-panel">
          <div class="sp-panel-head">
            <div>
              <span>Mistake Book</span>
              <strong>ยังไม่มีข้อผิดพลาดค้างทบทวน</strong>
            </div>
          </div>
          <p class="sp-muted">เวลาทำข้อสอบผิด ให้จดหัวข้อหรือสาเหตุไว้ ระบบจะดันขึ้น checklist ให้ทบทวน</p>
        </section>
      `;
    }

    return `
      <section class="sp-side-panel">
        <div class="sp-panel-head">
          <div>
            <span>Mistake Book</span>
            <strong>${items.length} จุดต้องทบทวน</strong>
          </div>
        </div>
        <div class="sp-mistake-list">
          ${items.map((item) => {
            const exam = findExam(item.examId);
            return `
              <div class="sp-mistake-item">
                <div>
                  <strong>${escapeHTML(item.topic || "ยังไม่ระบุหัวข้อ")}</strong>
                  <span>${escapeHTML(exam ? exam.title : "ข้อสอบ")} · ทบทวน ${escapeHTML(formatThaiDate(item.nextReview || todayKey()))}</span>
                  ${item.note ? `<p>${escapeHTML(item.note)}</p>` : ""}
                </div>
                <button class="sp-icon-btn" title="ทบทวนแล้ว" onclick="spResolveMistake('${escapeAttr(item.id)}')">✓</button>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderExamCenter() {
    ensureStudyData();
    ensureExamScaffold();
    renderExamFilters();

    const stats = examStats();
    const statsBar = document.getElementById("exam-stats-bar");
    if (statsBar) {
      statsBar.innerHTML = [
        renderStatChip("คลัง", "ชุดข้อสอบ", stats.total, ""),
        renderStatChip("จริง", "ลิงก์ทางการ", stats.official, "official"),
        renderStatChip("ทำ", "เสร็จแล้ว", `${stats.done}/${stats.total}`, "done"),
        renderStatChip("เฉลี่ย", "คะแนน", stats.scored ? `${stats.avg}%` : "-", "score"),
        renderStatChip("ทวน", "ข้อผิดพลาด", stats.unresolvedMistakes, "mistake")
      ].join("");
    }

    const exams = filteredExams();
    const grid = document.getElementById("exam-papers-grid");
    if (grid) {
      grid.innerHTML = exams.length
        ? exams.map(renderExamCard).join("")
        : `<div class="exam-empty sp-empty">ไม่พบข้อสอบตามตัวกรองนี้ ลองเปลี่ยนปีหรือคำค้นหาอีกนิด</div>`;
    }

    const afterGrid = document.getElementById("sp-exam-after-grid");
    if (afterGrid) {
      afterGrid.innerHTML = `
        <div class="sp-exam-side-grid">
          ${renderAttemptHistory()}
          ${renderMistakeBook()}
        </div>
      `;
    }

    const note = document.querySelector("#page-exams .exam-source-note");
    if (note) {
      note.innerHTML = `
        <strong>เครดิตและความน่าเชื่อถือ:</strong>
        A-Level ใช้ไฟล์ข้อสอบจริงจาก <a href="${MYTCAS_ANSWERS_URL}" target="_blank" rel="noopener">MyTCAS Answers</a>
        และลิงก์ PDF เปิดตรงเป็นข้อสอบรายวิชา ส่วน TGAT เป็นแหล่งรวมชุมชนที่หน้าเครดิตระบุว่าเป็นข้อสอบจริง/ไฟล์ PDF
        จาก <a href="${MEDDENT_TGAT_URL}" target="_blank" rel="noopener">MEDDENT</a>,
        <a href="${DEKUNI_TGAT_URL}" target="_blank" rel="noopener">Dekuni</a> และ
        <a href="${KRU_TGAT_URL}" target="_blank" rel="noopener">ครูเชียงราย</a>.
        รายการที่เป็นตัวอย่างจะติดป้าย “ตัวอย่าง” แยกจากข้อสอบจริงชัดเจน
      `;
    }
  }

  function todayStudyHours() {
    const data = ensureStudyData();
    const today = todayKey();
    return (data.logs || []).filter((log) => log.date === today).reduce((sum, log) => sum + (Number(log.hours) || 0), 0);
  }

  function nextRecommendedExam() {
    const selected = selectedSubjectsSet();
    const list = SP_EXAM_LIBRARY
      .filter((exam) => exam.kind === "ข้อสอบจริง")
      .filter((exam) => !selected.size || selected.has(exam.subjectId) || exam.group === "TGAT")
      .filter((exam) => !["done", "scored"].includes(paperStatus(exam.id)))
      .sort((a, b) => b.year - a.year);
    return list[0] || SP_EXAM_LIBRARY.find((exam) => exam.kind === "ข้อสอบจริง") || null;
  }

  function dailyTasks() {
    const data = ensureStudyData();
    const today = todayKey();
    if (!data.dailyTasks[today]) data.dailyTasks[today] = {};
    const nextExam = nextRecommendedExam();
    const dueMistake = data.mistakes.find((item) => !item.resolved && (!item.nextReview || item.nextReview <= today));
    const selected = typeof window.getSelectedSubjects === "function" ? window.getSelectedSubjects() : [];
    const firstSubject = selected[0];
    const tasks = [
      {
        id: "log-study",
        title: "บันทึกเวลาอ่านวันนี้",
        detail: `${todayStudyHours().toFixed(1)} ชั่วโมงแล้ว`,
        done: todayStudyHours() > 0
      },
      {
        id: "review-subject",
        title: firstSubject ? `ทวนบท ${cleanSubjectName(firstSubject.name)}` : "เลือกวิชาและทวนบทแรก",
        detail: "เก็บพื้นฐานให้ครบก่อนตะลุยข้อสอบ",
        done: Boolean(data.dailyTasks[today]["review-subject"])
      },
      {
        id: "mock-exam",
        title: nextExam ? `ทำข้อสอบ: ${nextExam.title}` : "หาโจทย์ฝึกทำ",
        detail: nextExam ? `${nextExam.year} · ${nextExam.credit}` : "ยังไม่มีข้อสอบแนะนำ",
        done: Boolean(nextExam && ["done", "scored"].includes(paperStatus(nextExam.id)))
      },
      {
        id: "mistake-review",
        title: dueMistake ? `ทวนข้อผิดพลาด: ${dueMistake.topic || "ยังไม่ระบุหัวข้อ"}` : "ทวน Mistake Book",
        detail: dueMistake ? "มีรายการครบกำหนดทบทวน" : "ไม่มีรายการค้างวันนี้",
        done: !dueMistake || Boolean(data.dailyTasks[today]["mistake-review"])
      }
    ];
    return tasks.map((task) => ({ ...task, done: task.done || Boolean(data.dailyTasks[today][task.id]) }));
  }

  function renderDailyChecklist() {
    ensureStudyData();
    const focus = document.getElementById("today-focus-card");
    if (!focus) return;
    if (!document.getElementById("sp-daily-checklist")) {
      focus.insertAdjacentHTML("afterend", `<div id="sp-daily-checklist"></div>`);
    }
    const host = document.getElementById("sp-daily-checklist");
    const tasks = dailyTasks();
    const completed = tasks.filter((task) => task.done).length;
    const pct = Math.round((completed / Math.max(1, tasks.length)) * 100);
    host.innerHTML = `
      <section class="card sp-check-card">
        <div class="sp-panel-head">
          <div>
            <span>Daily Study Patch</span>
            <strong>${completed}/${tasks.length} งานวันนี้</strong>
          </div>
          <button class="sp-action-btn" onclick="showPage('exams')">ไปหน้าข้อสอบ</button>
        </div>
        <div class="sp-check-progress"><i style="width:${pct}%"></i></div>
        <div class="sp-task-list">
          ${tasks.map((task) => `
            <button class="sp-task ${task.done ? "done" : ""}" onclick="spToggleDailyTask('${escapeAttr(task.id)}')">
              <span>${task.done ? "✓" : ""}</span>
              <div>
                <strong>${escapeHTML(task.title)}</strong>
                <em>${escapeHTML(task.detail)}</em>
              </div>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderAnalysisExtras() {
    const page = document.getElementById("page-analysis");
    if (!page) return;
    if (!document.getElementById("sp-analysis-exams")) {
      const insights = document.getElementById("insights-box");
      const card = insights ? insights.closest(".card") : null;
      if (card) card.insertAdjacentHTML("afterend", `<div id="sp-analysis-exams"></div>`);
      else page.insertAdjacentHTML("beforeend", `<div id="sp-analysis-exams"></div>`);
    }

    const stats = examStats();
    const latest = [...ensureStudyData().examAttempts]
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
      .slice(0, 4);
    const weak = ensureStudyData().mistakes.filter((item) => !item.resolved).slice(0, 4);
    const host = document.getElementById("sp-analysis-exams");
    host.innerHTML = `
      <section class="card sp-analysis-card">
        <div class="card-title">Exam Intelligence</div>
        <div class="sp-analysis-grid">
          <div class="sp-analysis-stat"><span>ทำข้อสอบแล้ว</span><strong>${stats.done}/${stats.total}</strong><em>ชุด</em></div>
          <div class="sp-analysis-stat"><span>คะแนนเฉลี่ย</span><strong>${stats.scored ? `${stats.avg}%` : "-"}</strong><em>${stats.scored} attempts</em></div>
          <div class="sp-analysis-stat"><span>ต้องทวน</span><strong>${stats.unresolvedMistakes}</strong><em>ข้อผิดพลาด</em></div>
        </div>
        <div class="sp-mini-grid">
          <div>
            <div class="sp-mini-title">คะแนนล่าสุด</div>
            ${latest.length ? latest.map((attempt) => {
              const exam = findExam(attempt.examId);
              return `<p>${escapeHTML(exam ? exam.title : "ข้อสอบ")} <b>${Math.round(attempt.percent || 0)}%</b></p>`;
            }).join("") : `<p class="sp-muted">ยังไม่มีคะแนน</p>`}
          </div>
          <div>
            <div class="sp-mini-title">จุดที่ควรทวน</div>
            ${weak.length ? weak.map((item) => `<p>${escapeHTML(item.topic || "ยังไม่ระบุหัวข้อ")}</p>`).join("") : `<p class="sp-muted">ยังไม่มีรายการค้าง</p>`}
          </div>
        </div>
      </section>
    `;
  }

  function mutateAndRefresh(message) {
    saveStudyData();
    renderExamCenter();
    renderDailyChecklist();
    renderAnalysisExtras();
    if (message) showToast(message);
  }

  window.spSetExamGroup = function (group) {
    examState.group = group;
    renderExamCenter();
  };

  window.spSetExamYear = function (year) {
    examState.year = year === "all" ? "all" : Number(year);
    renderExamCenter();
  };

  window.spSetExamStatusFilter = function (status) {
    examState.status = status;
    renderExamCenter();
  };

  window.spSetExamSourceFilter = function (source) {
    examState.source = source;
    renderExamCenter();
  };

  window.spSetExamQuery = function (query) {
    examState.query = query;
    renderExamCenter();
  };

  window.spMarkExamTouched = function (examId) {
    const data = ensureStudyData();
    if (!data.examStatus[examId]) {
      data.examStatus[examId] = { status: "planned", updatedAt: Date.now() };
      saveStudyData();
      renderDailyChecklist();
    }
  };

  window.spSetPaperStatus = function (examId, status) {
    const exam = findExam(examId);
    if (!exam) return;
    const data = ensureStudyData();
    data.examStatus[examId] = { status, updatedAt: Date.now() };
    mutateAndRefresh(status === "done" ? `ทำ ${exam.title} แล้ว` : "อัปเดตสถานะแล้ว");
  };

  window.spStartMock = function (examId) {
    const exam = findExam(examId);
    if (!exam) return;
    const data = ensureStudyData();
    data.activeMock = { examId, startedAt: Date.now() };
    data.examStatus[examId] = { status: "planned", updatedAt: Date.now() };
    saveStudyData();
    window.open(exam.primaryUrl, "_blank", "noopener");
    renderExamCenter();
    showToast("เริ่ม Mock แล้ว ทำเสร็จกลับมากดบันทึกคะแนน");
  };

  window.spRecordExamScore = function (examId) {
    const exam = findExam(examId);
    if (!exam) return;
    const scoreRaw = prompt(`คะแนนที่ได้ของ ${exam.title}`, "");
    if (scoreRaw === null) return;
    const maxRaw = prompt("คะแนนเต็ม", String(exam.maxScore || 100));
    if (maxRaw === null) return;
    const score = Number(scoreRaw);
    const maxScore = Number(maxRaw);
    if (!Number.isFinite(score) || !Number.isFinite(maxScore) || maxScore <= 0 || score < 0) {
      showToast("คะแนนไม่ถูกต้อง");
      return;
    }

    const wrongRaw = prompt("ผิดกี่ข้อ? (เว้นว่างได้)", "");
    const topic = prompt("หัวข้อ/พาร์ทที่พลาดบ่อย (เว้นว่างได้)", "") || "";
    const note = prompt("โน้ตสั้น ๆ (เว้นว่างได้)", "") || "";
    const data = ensureStudyData();
    const percent = Math.max(0, Math.min(100, (score / maxScore) * 100));
    data.examAttempts.push({
      id: Date.now(),
      examId,
      date: todayKey(),
      score,
      maxScore,
      percent,
      wrong: wrongRaw ? Number(wrongRaw) || "" : "",
      topic,
      note
    });
    data.examStatus[examId] = { status: "done", updatedAt: Date.now() };
    if (data.activeMock?.examId === examId) data.activeMock = null;

    if (topic || note) {
      data.mistakes.push({
        id: `mistake_${Date.now()}`,
        examId,
        topic: topic || "ข้อที่ควรทบทวน",
        note,
        createdAt: todayKey(),
        nextReview: todayKey(),
        resolved: false
      });
    }
    mutateAndRefresh(`บันทึกคะแนน ${Math.round(percent)}% แล้ว`);
  };

  window.spAddMistake = function (examId) {
    const exam = findExam(examId);
    if (!exam) return;
    const topic = prompt("หัวข้อ/ข้อที่พลาด", "");
    if (topic === null) return;
    const note = prompt("สาเหตุหรือสิ่งที่ต้องทวน", "") || "";
    const nextReview = prompt("วันที่ทบทวน (YYYY-MM-DD)", todayKey()) || todayKey();
    const data = ensureStudyData();
    data.mistakes.push({
      id: `mistake_${Date.now()}`,
      examId,
      topic: topic || "ข้อที่ควรทบทวน",
      note,
      createdAt: todayKey(),
      nextReview,
      resolved: false
    });
    mutateAndRefresh("เพิ่มลง Mistake Book แล้ว");
  };

  window.spResolveMistake = function (mistakeId) {
    const data = ensureStudyData();
    const item = data.mistakes.find((mistake) => mistake.id === mistakeId);
    if (!item) return;
    item.resolved = true;
    item.resolvedAt = todayKey();
    mutateAndRefresh("ทำเครื่องหมายว่าทบทวนแล้ว");
  };

  window.spToggleDailyTask = function (taskId) {
    const data = ensureStudyData();
    const today = todayKey();
    if (!data.dailyTasks[today]) data.dailyTasks[today] = {};
    data.dailyTasks[today][taskId] = !data.dailyTasks[today][taskId];
    saveStudyData();
    renderDailyChecklist();
  };

  const baseShowPage = window.showPage;
  const baseRenderDashboard = window.renderDashboard;
  const baseRenderAnalysis = window.renderAnalysis;

  function renderDashboardWithStudyTools() {
    if (typeof baseRenderDashboard === "function") baseRenderDashboard();
    renderDailyChecklist();
  }

  function renderAnalysisWithStudyTools() {
    if (typeof baseRenderAnalysis === "function") baseRenderAnalysis();
    renderAnalysisExtras();
  }

  function showPageWithStudyTools(id) {
    if (typeof baseShowPage === "function") baseShowPage(id);
    if (id === "dashboard") renderDailyChecklist();
    if (id === "analysis") renderAnalysisExtras();
    if (id === "exams") renderExamCenter();
  }

  window.renderExamPapers = renderExamCenter;
  window.renderDashboard = renderDashboardWithStudyTools;
  window.renderAnalysis = renderAnalysisWithStudyTools;
  window.showPage = showPageWithStudyTools;

  try { renderExamPapers = renderExamCenter; } catch (error) { /* ignored */ }
  try { renderDashboard = renderDashboardWithStudyTools; } catch (error) { /* ignored */ }
  try { renderAnalysis = renderAnalysisWithStudyTools; } catch (error) { /* ignored */ }
  try { showPage = showPageWithStudyTools; } catch (error) { /* ignored */ }

  ensureStudyData();
  if (document.getElementById("page-dashboard")?.classList.contains("active")) renderDailyChecklist();
  if (document.getElementById("page-analysis")?.classList.contains("active")) renderAnalysisExtras();
  if (document.getElementById("page-exams")?.classList.contains("active")) renderExamCenter();
})();
