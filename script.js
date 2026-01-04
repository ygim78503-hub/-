// Firebase Auth 함수 import
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* =====================
   화면 요소 가져오기
===================== */
const home = document.getElementById("home");
const auth = document.getElementById("auth");
const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");

const startBtn = document.getElementById("startBtn");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

/* =====================
   화면 전환
===================== */
startBtn.addEventListener("click", () => {
  home.style.display = "none";
  auth.style.display = "block";
});

signupBtn.addEventListener("click", () => {
  auth.style.display = "none";
  signupPage.style.display = "block";
});

loginBtn.addEventListener("click", () => {
  auth.style.display = "none";
  loginPage.style.display = "block";
});

/* =====================
   회원가입 (진짜 Firebase)
===================== */
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupSubmitBtn = document.getElementById("signupSubmitBtn");

signupSubmitBtn.addEventListener("click", async () => {
  const email = signupEmail.value;
  const password = signupPassword.value;

  if (!email || !password) {
    alert("이메일과 비밀번호를 입력하세요");
    return;
  }

  try {
    await createUserWithEmailAndPassword(
      window.auth,
      email,
      password
    );

    alert("회원가입 성공!");
    signupPage.style.display = "none";
    loginPage.style.display = "block";

  } catch (error) {
    alert(error.message);
  }
});

/* =====================
   로그인 (진짜 Firebase)
===================== */
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginSubmitBtn = document.getElementBy
