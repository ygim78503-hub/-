import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase 설정
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

// DOM
const home = document.getElementById("home");
const authPage = document.getElementById("auth");
const signupPage = document.getElementById("signupPage");
const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");

const startBtn = document.getElementById("startBtn");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const goLoginBtn = document.getElementById("goLoginBtn");
const goSignupBtn = document.getElementById("goSignupBtn");

const signupSubmitBtn = document.getElementById("signupSubmitBtn");
const loginSubmitBtn = document.getElementById("loginSubmitBtn");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const logoutBtn = document.getElementById("logoutBtn");

// 화면 전환 함수
function show(page) {
  home.style.display = "none";
  authPage.style.display = "none";
  signupPage.style.display = "none";
  loginPage.style.display = "none";
  dashboard.style.display = "none";
  page.style.display = "block";
  if(page===dashboard) document.body.classList.remove("sidebar-open");
}

// 화면 전환 이벤트
startBtn.onclick = () => show(authPage);
signupBtn.onclick = () => show(signupPage);
loginBtn.onclick = () => show(loginPage);
goLoginBtn.onclick = () => show(loginPage);
goSignupBtn.onclick = () => show(signupPage);

// 회원가입
signupSubmitBtn.onclick = async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  if(!email || !password) return alert("이메일과 비밀번호를 입력하세요");
  try {
    await createUserWithEmailAndPassword(auth,email,password);
    alert("회원가입 성공! 로그인해주세요.");
    show(loginPage);
  } catch(e) { alert(e.message); }
};

// 로그인
loginSubmitBtn.onclick = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  if(!email || !password) return alert("이메일과 비밀번호를 입력하세요");
  try {
    await signInWithEmailAndPassword(auth,email,password);
    show(dashboard);
  } catch(e) { alert(e.message); }
};

// 삼선 메뉴 열고 닫기 (애니메이션)
menuBtn.onclick = () => {
  if(sidebar.style.left === "0px") {
    sidebar.style.left = "-250px";
    document.body.classList.remove("sidebar-open");
  } else {
    sidebar.style.left = "0px";
    document.body.classList.add("sidebar-open");
  }
};

// 로그아웃
logoutBtn.onclick = async () => {
  await signOut(auth);
  show(home);
  sidebar.style.left="-250px";
  document.body.classList.remove("sidebar-open");
};
