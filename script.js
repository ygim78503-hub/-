/* =========================
   페이지 요소
========================= */
const home = document.getElementById("home");
const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const dashboard = document.getElementById("dashboard");
const qnaPage = document.getElementById("qnaPage");

/* =========================
   페이지 관리
========================= */
const pages = {
  home,
  login: loginPage,
  signup: signupPage,
  dashboard,
  qna: qnaPage
};

function showPage(name) {
  Object.values(pages).forEach(p => p.classList.remove("active"));
  pages[name].classList.add("active");
  document.body.classList.remove("sidebar-open");
}

/* =========================
   초기 화면
========================= */
document.addEventListener("DOMContentLoaded", () => {
  showPage("home");
});

/* =========================
   홈 / 로그인 / 회원가입
========================= */
window.goLogin = () => showPage("login");
window.goSignup = () => showPage("signup");

window.login = () => {
  showPage("dashboard");
};

window.signup = () => {
  showPage("login");
};

/* =========================
   사이드바
========================= */
window.toggleSidebar = () => {
  document.body.classList.toggle("sidebar-open");
};

window.closeSidebar = () => {
  document.body.classList.remove("sidebar-open");
};

window.logout = () => {
  showPage("home");
};

/* =========================
   질문 응답 화면 이동
========================= */
window.openQna = () => {
  showPage("qna");
};

window.backToDashboard = () => {
  showPage("dashboard");
};

/* =========================
   Firebase
========================= */
const auth = firebase.auth();
const db = firebase.firestore();
let currentUser = null;

auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    loadMyQna();
  } else {
    currentUser = null;
  }
});

/* =========================
   질문 · 응답 저장
========================= */
window.saveQna = async () => {
  if (!currentUser) {
    alert("로그인이 필요합니다");
    return;
  }

  const question = qnaPage.querySelector("input").value.trim();
  const answer = qnaPage.querySelector("textarea").value.trim();

  if (!question || !answer) {
    alert("질문과 답변을 입력하세요");
    return;
  }

  await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("qna")
    .add({
      question,
      answer,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

  alert("저장 완료");

  qnaPage.querySelector("input").value = "";
  qnaPage.querySelector("textarea").value = "";
};

/* =========================
   저장된 질문 불러오기
========================= */
async function loadMyQna() {
  if (!currentUser) return;

  const snapshot = await db
    .collection("users")
    .doc(currentUser.uid)
    .collection("qna")
    .orderBy("createdAt", "desc")
    .get();

  snapshot.forEach(doc => {
    const data = doc.data();
    console.log("질문:", data.question);
    console.log("답변:", data.answer);
  });
}
