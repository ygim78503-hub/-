import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
  home: document.getElementById("home"),
  signup: document.getElementById("signupPage"),
  login: document.getElementById("loginPage"),
  dashboard: document.getElementById("dashboard")
};

const sidebar = document.getElementById("sidebar");

/* 페이지 전환 */
function showPage(name) {
  Object.values(pages).forEach(p => p.style.display = "none");
  pages[name].style.display = "block";
}

/* 초기 */
showPage("home");

/* 버튼 */
document.getElementById("startBtn").onclick = () => showPage("signup");
document.getElementById("gotoLogin").onclick = () => showPage("login");
document.getElementById("gotoSignup").onclick = () => showPage("signup");

/* 회원가입 */
document.getElementById("signupSubmitBtn").onclick = async () => {
  const email = signupEmail.value;
  const password = signupPassword.value;
  await createUserWithEmailAndPassword(auth, email, password);
};

/* 로그인 */
document.getElementById("loginSubmitBtn").onclick = async () => {
  const email = loginEmail.value;
  const password = loginPassword.value;
  await signInWithEmailAndPassword(auth, email, password);
};

/* 로그인 유지 */
onAuthStateChanged(auth, user => {
  if (user) showPage("dashboard");
  else showPage("home");
});

/* 로그아웃 */
document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  document.body.classList.remove("sidebar-open");
};

/* 삼선 메뉴 */
document.getElementById("menuBtn").onclick = () => {
  document.body.classList.toggle("sidebar-open");
};

/* 사이드바 닫기 */
document.getElementById("closeSidebarBtn").onclick = () => {
  document.body.classList.remove("sidebar-open");
};

/* 질문 응답 등록 */
document.getElementById("addQAButton").onclick = () => {
  alert("다음 단계에서 질문/응답 등록 화면을 만들 예정입니다!");
};
