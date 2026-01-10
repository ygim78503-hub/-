/* =========================
   Firebase 인증 상태 감지
========================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const menuBtn = document.getElementById("menuBtn");

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
  Object.values(pages).forEach(page => {
    page.classList.remove("active");
  });

  pages[pageName].classList.add("active");

  // 사이드바 닫기
  document.body.classList.remove("sidebar-open");
}

/* =========================
   ⭐ 로그인 상태 감지 (핵심 추가)
========================= */

onAuthStateChanged(auth, (user) => {
  if (user) {
    // 로그인 상태
    showPage("dashboard");
  } else {
    // 로그아웃 상태
    showPage("home");
  }
});

/* =========================
   홈 → 로그인 / 회원가입
========================= */

window.goLogin = function () {
  showPage("login");
};

window.goSignup = function () {
  showPage("signup");
};

/* =========================
   회원가입
========================= */

window.signup = async function () {
  const email = signupPage.querySelector("input[type='text'], input[type='email']").value;
  const password = signupPage.querySelector("input[type='password']").value;

  if (!email || !password) {
    alert("이메일과 비밀번호를 입력하세요");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("회원가입 성공!");
    showPage("dashboard");
  } catch (error) {
    alert(error.message);
  }
};

/* =========================
   로그인
========================= */

window.login = async function () {
  const email = loginPage.querySelector("input[type='text'], input[type='email']").value;
  const password = loginPage.querySelector("input[type='password']").value;

  if (!email || !password) {
    alert("이메일과 비밀번호를 입력하세요");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("로그인 성공!");
    showPage("dashboard");
  } catch (error) {
    alert("로그인 실패: " + error.message);
  }
};

/* =========================
   로그아웃
========================= */

window.logout = async function () {
  await signOut(auth);
  showPage("home");
};

/* =========================
   삼선 메뉴
========================= */

window.toggleSidebar = function () {
  document.body.classList.toggle("sidebar-open");
};

window.closeSidebar = function () {
  document.body.classList.remove("sidebar-open");
};

/* =========================
   질문 · 응답 등록 화면
========================= */

window.openQna = function () {
  showPage("qna");
};

window.backToDashboard = function () {
  showPage("dashboard");
};
