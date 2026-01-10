/* =========================
   페이지 요소 가져오기
========================= */

const home = document.getElementById("home");
const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const qnaPage = document.getElementById("qnaPage");

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
   페이지 관리
========================= */

const pages = {
  home,
  signup: signupPage,
  login: loginPage,
  dashboard,
  qna: qnaPage
};

function showPage(pageName) {
  Object.values(pages).forEach(page => {
    page.classList.remove("active");
  });
  pages[pageName].classList.add("active");
  document.body.classList.remove("sidebar-open");
}

/* =========================
   초기 화면
========================= */

document.addEventListener("DOMContentLoaded", () => {
  showPage("home");
});

/* =========================
   이동 로직
========================= */

gotoLogin.addEventListener("click", () => {
  showPage("login");
});

gotoSignup.addEventListener("click", () => {
  showPage("signup");
});

signupSubmitBtn.addEventListener("click", () => {
  showPage("login");
});

loginSubmitBtn.addEventListener("click", () => {
  showPage("dashboard");
});

/* =========================
   사이드바
========================= */

menuBtn.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-open");
});

closeSidebar.addEventListener("click", () => {
  document.body.classList.remove("sidebar-open");
});

logoutBtn.addEventListener("click", () => {
  showPage("home");
});

/* =========================
   질문·응답 등록
========================= */

goQna.addEventListener("click", () => {
  showPage("qna");
});

backBtn.addEventListener("click", () => {
  showPage("dashboard");
});
