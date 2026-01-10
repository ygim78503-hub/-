// ===== 페이지 관리 =====
const pages = {
  home: document.getElementById("home"),
  signup: document.getElementById("signupPage"),
  login: document.getElementById("loginPage"),
  dashboard: document.getElementById("dashboard"),
  qna: document.getElementById("qnaPage")
};

function showPage(name) {
  Object.values(pages).forEach(p => p.style.display = "none");
  pages[name].style.display = "block";
  document.body.classList.remove("sidebar-open");
}

// 초기 화면
showPage("home");

// ===== 버튼 =====
document.getElementById("startBtn").onclick = () => showPage("signup");
document.getElementById("gotoLogin").onclick = () => showPage("login");
document.getElementById("gotoSignup").onclick = () => showPage("signup");
document.getElementById("loginSubmitBtn").onclick = () => showPage("dashboard");
document.getElementById("signupSubmitBtn").onclick = () => showPage("login");

// ===== 사이드바 =====
const menuBtn = document.getElementById("menuBtn");
const closeDashboardBtn = document.getElementById("closeDashboardBtn");

menuBtn.onclick = () => {
  document.body.classList.toggle("sidebar-open");
};

closeDashboardBtn.onclick = () => {
  document.body.classList.remove("sidebar-open");
};

document.getElementById("logoutBtn").onclick = () => {
  showPage("home");
};

// ===== 질문 등록 페이지 이동 =====
document.getElementById("openQnaPage").onclick = () => {
  showPage("qna");
};

document.getElementById("backToDashboard").onclick = () => {
  showPage("dashboard");
};

// ===== 웹 / 앱 선택 =====
const selectWeb = document.getElementById("selectWeb");
const selectApp = document.getElementById("selectApp");
const appSelectBox = document.getElementById("appSelectBox");

selectWeb.onclick = () => {
  selectWeb.classList.add("active");
  selectApp.classList.remove("active");
  appSelectBox.style.display = "none";
};

selectApp.onclick = () => {
  selectApp.classList.add("active");
  selectWeb.classList.remove("active");
  appSelectBox.style.display = "block";
};

// ===== 앱 버튼 선택 =====
document.querySelectorAll(".app-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".app-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  };
});

// ===== 저장 (현재는 UI만) =====
document.getElementById("saveQna").onclick = () => {
  alert("질문 / 응답이 저장되었습니다 (다음 단계에서 DB 연동)");
  showPage("dashboard");
};
