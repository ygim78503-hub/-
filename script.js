/* =========================
   Firebase SDK
========================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* =========================
   Firebase 설정
========================= */
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
const db = getFirestore(app);

/* =========================
   페이지 요소
========================= */
const pages = {
  home: document.getElementById("home"),
  login: document.getElementById("loginPage"),
  signup: document.getElementById("signupPage"),
  dashboard: document.getElementById("dashboard"),
  qna: document.getElementById("qnaPage")
};

function showPage(name) {
  Object.values(pages).forEach(p => p.classList.remove("active"));
  pages[name].classList.add("active");
  document.body.classList.remove("sidebar-open");
}

/* =========================
   로그인 상태 감지
========================= */
onAuthStateChanged(auth, (user) => {
  if (user) {
    showPage("dashboard");
  } else {
    showPage("home");
  }
});

/* =========================
   화면 이동
========================= */
window.goLogin = () => showPage("login");
window.goSignup = () => showPage("signup");
window.openQna = () => showPage("qna");
window.backToDashboard = () => showPage("dashboard");

/* =========================
   회원가입
========================= */
window.signup = async () => {
  const email = document.querySelector("#signupPage input[type='text'], #signupPage input[type='email']").value;
  const password = document.querySelector("#signupPage input[type='password']").value;

  await createUserWithEmailAndPassword(auth, email, password);
};

/* =========================
   로그인
========================= */
window.login = async () => {
  const email = document.querySelector("#loginPage input[type='text'], #loginPage input[type='email']").value;
  const password = document.querySelector("#loginPage input[type='password']").value;

  await signInWithEmailAndPassword(auth, email, password);
};

/* =========================
   로그아웃
========================= */
window.logout = async () => {
  await signOut(auth);
};

/* =========================
   질문 · 응답 저장 🔥 핵심
========================= */
window.saveQna = async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("로그인이 필요합니다");
    return;
  }

  const question = document.querySelector("#qnaPage input").value;
  const answer = document.querySelector("#qnaPage textarea").value;

  const usageType = document.querySelector(".usage-select button.active")?.innerText || "웹사이트";
  const appType = document.querySelector("#qnaPage select").value;

  if (!question || !answer) {
    alert("질문과 답변을 입력하세요");
    return;
  }

  await addDoc(
    collection(db, "users", user.uid, "qna"),
    {
      question,
      answer,
      usageType,
      appType,
      createdAt: serverTimestamp()
    }
  );

  alert("저장 완료!");
  showPage("dashboard");
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
