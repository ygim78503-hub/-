import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* Firebase 설정 */
const firebaseConfig = {
  apiKey: "AIzaSyD6y7KMQ9T9LbvectgYOldxYAmq-_Zrjgs",
  authDomain: "reply-service-f3d73.firebaseapp.com",
  projectId: "reply-service-f3d73",
  storageBucket: "reply-service-f3d73.firebasestorage.app",
  messagingSenderId: "583700899332",
  appId: "1:583700899332:web:6e9064ccf93f676dd03751"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* 페이지 */
const pages = {
  home,
  signupPage,
  loginPage,
  dashboard,
  qnaPage
};

/* 공통 페이지 전환 */
function showPage(name) {
  Object.values(pages).forEach(p => p.style.display = "none");
  pages[name].style.display = "block";
}

/* 초기 화면 */
showPage("home");

/* 홈 */
startBtn.onclick = () => showPage("signupPage");

/* 회원가입 */
signupSubmitBtn.onclick = async () => {
  await createUserWithEmailAndPassword(
    auth,
    signupEmail.value,
    signupPassword.value
  );
};

/* 로그인 */
loginSubmitBtn.onclick = async () => {
  await signInWithEmailAndPassword(
    auth,
    loginEmail.value,
    loginPassword.value
  );
};

/* 로그인 유지 */
onAuthStateChanged(auth, user => {
  if (user) showPage("dashboard");
});

/* 페이지 이동 */
gotoLogin.onclick = () => showPage("loginPage");
gotoSignup.onclick = () => showPage("signupPage");

/* 로그아웃 */
logoutBtn.onclick = async () => {
  await signOut(auth);
  showPage("home");
};

/* 사이드바 */
menuBtn.onclick = () =>
  document.body.classList.toggle("sidebar-open");

closeSidebarBtn.onclick = () =>
  document.body.classList.remove("sidebar-open");

/* 질문 응답 등록 화면 */
qnaBtn.onclick = () => showPage("qnaPage");
backToDashboardBtn.onclick = () => showPage("dashboard");

/* 임시 저장 버튼 */
saveQnaBtn.onclick = () => {
  alert("다음 단계에서 질문/응답 저장 기능이 추가됩니다!");
};
/* ===== 질문 응답 등록 UI 로직 ===== */

let selectedType = null;

const typeWeb = document.getElementById("typeWeb");
const typeApp = document.getElementById("typeApp");
const appSelectBox = document.getElementById("appSelectBox");
const appType = document.getElementById("appType");

typeWeb.onclick = () => {
  selectedType = "web";
  appSelectBox.style.display = "none";
  typeWeb.classList.remove("secondary");
  typeApp.classList.add("secondary");
};

typeApp.onclick = () => {
  selectedType = "app";
  appSelectBox.style.display = "block";
  typeApp.classList.remove("secondary");
  typeWeb.classList.add("secondary");
};

saveQnaBtn.onclick = () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (!question || !answer) {
    alert("질문과 답변을 입력하세요");
    return;
  }

  if (!selectedType) {
    alert("사용 위치를 선택하세요");
    return;
  }

  if (selectedType === "app" && !appType.value) {
    alert("앱 종류를 선택하세요");
    return;
  }

  alert(
    `저장 준비 완료!\n\n질문: ${question}\n답변: ${answer}\n유형: ${selectedType}\n앱: ${appType.value || "-"}`
  );

  // 👉 다음 단계: Firestore에 저장
};

/* ===== 질문 응답 등록 UI 로직 ===== */

let selectedType = null;

const typeWeb = document.getElementById("typeWeb");
const typeApp = document.getElementById("typeApp");
const appSelectBox = document.getElementById("appSelectBox");
const appType = document.getElementById("appType");

typeWeb.onclick = () => {
  selectedType = "web";
  appSelectBox.style.display = "none";
  typeWeb.classList.remove("secondary");
  typeApp.classList.add("secondary");
};

typeApp.onclick = () => {
  selectedType = "app";
  appSelectBox.style.display = "block";
  typeApp.classList.remove("secondary");
  typeWeb.classList.add("secondary");
};

saveQnaBtn.onclick = () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();

  if (!question || !answer) {
    alert("질문과 답변을 입력하세요");
    return;
  }

  if (!selectedType) {
    alert("사용 위치를 선택하세요");
    return;
  }

  if (selectedType === "app" && !appType.value) {
    alert("앱 종류를 선택하세요");
    return;
  }

  alert(
    `저장 준비 완료!\n\n질문: ${question}\n답변: ${answer}\n유형: ${selectedType}\n앱: ${appType.value || "-"}`
  );

  // 👉 다음 단계: Firestore에 저장
};
