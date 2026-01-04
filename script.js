// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyD6y7KMQ9T9LbvectgYOldxYAmq-_Zrjgs",
  authDomain: "reply-service-f3d73.firebaseapp.com",
  projectId: "reply-service-f3d73",
  storageBucket: "reply-service-f3d73.appspot.com",
  messagingSenderId: "583700899332",
  appId: "1:583700899332:web:6e9064ccf93f676dd03751"
};

// 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM
const home = document.getElementById("home");
const authPage = document.getElementById("auth");
const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");

document.getElementById("startBtn").onclick = () => {
  home.style.display = "none";
  authPage.style.display = "block";
};

document.getElementById("signupBtn").onclick = () => {
  authPage.style.display = "none";
  signupPage.style.display = "block";
};

document.getElementById("loginBtn").onclick = () => {
  authPage.style.display = "none";
  loginPage.style.display = "block";
};

// 회원가입 ↔ 로그인 이동
document.getElementById("toLoginBtn").onclick = () => {
  signupPage.style.display = "none";
  loginPage.style.display = "block";
};

document.getElementById("toSignupBtn").onclick = () => {
  loginPage.style.display = "none";
  signupPage.style.display = "block";
};

// 회원가입
document.getElementById("signupSubmitBtn").onclick = async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("회원가입 완료! 로그인 해주세요.");
    signupPage.style.display = "none";
    loginPage.style.display = "block";
  } catch (error) {
    alert(error.message);
  }
};

// 로그인
document.getElementById("loginSubmitBtn").onclick = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("로그인 성공!");
  } catch (error) {
    alert(error.message);
  }
};
