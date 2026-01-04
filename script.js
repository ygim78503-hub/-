// Firebase SDK 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔑 Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyD6y7KMQ9T9LbvectgYOldxYAmq-_Zrjgs",
  authDomain: "reply-service-f3d73.firebaseapp.com",
  projectId: "reply-service-f3d73",
  storageBucket: "reply-service-f3d73.firebasestorage.app",
  messagingSenderId: "583700899332",
  appId: "1:583700899332:web:6e9064ccf93f676dd03751"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ==================
// DOM 요소
// ==================
const home = document.getElementById("home");
const authPage = document.getElementById("auth");
const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");

const startBtn = document.getElementById("startBtn");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const goLoginBtn = document.getElementById("goLoginBtn");
const goSignupBtn = document.getElementById("goSignupBtn");

const signupSubmitBtn = document.getElementById("signupSubmitBtn");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");

// ==================
// 화면 전환 함수
// ==================
function show(page) {
  home.style.display = "none";
  authPage.style.display = "none";
  signupPage.style.display = "none";
  loginPage.style.display = "none";
  page.style.display = "block";
}

// ==================
// 화면 전환 이벤트
// ==================
startBtn.onclick = () => show(authPage);
signupBtn.onclick = () => show(signupPage);
loginBtn.onclick = () => show(loginPage);

goLoginBtn.onclick = () => show(loginPage);
goSignupBtn.onclick = () => show(signupPage);

// ==================
// 회원가입
// ==================
signupSubmitBtn.onclick = async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  if (!email || !password) {
    alert("이메일과 비밀번호를 입력하세요");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("회원가입 성공! 로그인해주세요.");
    show(loginPage);
  } catch (error) {
    alert(error.message);
  }
};

// ==================
// 로그인
// ==================
loginSubmitBtn.onclick = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("이메일과 비밀번호를 입력하세요");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("로그인 성공!");
    // 다음 단계에서 여기서 대시보드로 이동하게 됨
  } catch (error) {
    alert(error.message);
  }
};
