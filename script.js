const home = document.getElementById("home");
const auth = document.getElementById("auth");
const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");

const startBtn = document.getElementById("startBtn");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");

// 홈 → 설명 화면
startBtn.addEventListener("click", () => {
  home.style.display = "none";
  auth.style.display = "block";
});

// 설명 → 회원가입
signupBtn.addEventListener("click", () => {
  auth.style.display = "none";
  signupPage.style.display = "block";
});

// 설명 → 로그인
loginBtn.addEventListener("click", () => {
  auth.style.display = "none";
  loginPage.style.display = "block";
});
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
