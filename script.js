import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const pages = {
  home: document.getElementById("home"),
  signup: document.getElementById("signupPage"),
  login: document.getElementById("loginPage"),
  dashboard: document.getElementById("dashboard")
};

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

// 화면 전환
function showPage(name, push=true){
  Object.values(pages).forEach(p => p.style.display="none");
  pages[name].style.display = "block";
  if(name === "dashboard") sidebar.classList.remove("open");
  if(push) location.hash = name==="home"?"":name;
}

// 버튼 이벤트
document.getElementById("startBtn").onclick = () => showPage("signup");
document.getElementById("gotoLogin").onclick = () => showPage("login");
document.getElementById("gotoSignup").onclick = () => showPage("signup");

// 회원가입
document.getElementById("signupSubmitBtn").onclick = async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  if(!email || !password) return alert("이메일과 비밀번호를 입력하세요");
  try{
    await createUserWithEmailAndPassword(auth,email,password);
    alert("회원가입 성공!");
    showPage("login");
  }catch(e){ alert(e.message);}
};

// 로그인
document.getElementById("loginSubmitBtn").onclick = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  if(!email || !password) return alert("이메일과 비밀번호를 입력하세요");
  try{
    await signInWithEmailAndPassword(auth,email,password);
    alert("로그인 성공!");
    showPage("dashboard");
  }catch(e){ alert(e.message);}
};

// 로그아웃
document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  showPage("login");
};

// 삼선 메뉴 toggle
menuBtn.onclick = () => {
  sidebar.classList.toggle("open");
  document.body.classList.toggle("sidebar-open");
};

// 해시 라우팅 처리
window.addEventListener("hashchange", ()=>{
  const page = location.hash.replace("#","");
  if(page && pages[page]) showPage(page,false);
});

// 페이지 직접 접속 시 처리
const initialPage = location.hash.replace("#","");
if(initialPage && pages[initialPage]) showPage(initialPage,false);
