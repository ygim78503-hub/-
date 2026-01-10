/* =========================
   페이지 요소 가져오기
========================= */

// 페이지들
const home = document.getElementById("home");
const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const qnaPage = document.getElementById("qnaPage");

// 버튼들
const startBtn = document.getElementById("startBtn");
const gotoLogin = document.getElementById("gotoLogin");
const gotoSignup = document.getElementById("gotoSignup");
const signupSubmitBtn = document.getElementById("signupSubmitBtn");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");

const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");
const logoutBtn = document.getElementById("logoutBtn");

const goQna = document.getElementById("goQna");
const backBtn = document.getElementById("backBtn");

/* =========================
   페이지 관리 객체
========================= */

const pages = {
  home: home,
  signup: signupPage,
  login: loginPage,
  dashboard: dashboard,
  qna: qnaPage
};

/* =========================
   화면 전환 함수 (핵심)
========================= */

function showPage(pageName) {
  // 모든 페이지 숨김
  Object.values(pages).forEach(page => {
    page.classList.remove("active");
  });

  // 선택한 페이지만 표시
  pages[pageName].classList.add("active");

  // 사이드바는 항상 닫음
  document.body.classList.remove("sidebar-open");
}

/* =========================
   초기 화면
========================= */

showPage("home");

/* =========================
   홈 → 회원가입
========================= */

startBtn.addEventListener("click", () => {
  showPage("signup");
});

/* =========================
   회원가입 / 로그인 이동
========================= */

gotoLogin.addEventListener("click", () => {
  showPage("login");
});

gotoSignup.addEventListener("click", () => {
  showPage("signup");
});

/* =========================
   회원가입 처리 (임시)
   ⚠ 나중에 Firebase 연결
========================= */

signupSubmitBtn.addEventListener("click", () => {
  // 여기 나중에 Firebase createUserWithEmailAndPassword
  showPage("login");
});

/* =========================
   로그인 처리 (임시)
   ⚠ 나중에 Firebase signIn
========================= */

loginSubmitBtn.addEventListener("click", () => {
  // 여기 나중에 Firebase 로그인 성공 시
  showPage("dashboard");
});

/* =========================
   삼선 메뉴 열기 / 닫기
========================= */

menuBtn.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-open");
});

closeSidebar.addEventListener("click", () => {
  document.body.classList.remove("sidebar-open");
});

/* =========================
   로그아웃
========================= */

logoutBtn.addEventListener("click", () => {
  // 나중에 Firebase signOut()
  showPage("home");
});

/* =========================
   질문 · 응답 등록 화면 이동
========================= */

goQna.addEventListener("click", () => {
  showPage("qna");
});

/* =========================
   질문 등록 → 대시보드 복귀
========================= */

backBtn.addEventListener("click", () => {
  showPage("dashboard");
});
