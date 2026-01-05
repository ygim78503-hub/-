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
  if(push) history.pushState({page:name}, "", name==="home"?"/":"/"+name);
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
    showPage("dashboard");
  }catch(e){ alert(e.message);}
};

// 로그아웃
document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  showPage("login");
  sidebar.style.left = "-250px";
  document.body.classList.remove("sidebar-open");
};

// 삼선 메뉴 열기/닫기
menuBtn.onclick = () => {
  if(sidebar.style.left === "0px"){
    sidebar.style.left="-250px";
    document.body.classList.remove("sidebar-open");
  } else {
    sidebar.style.left="0px";
    document.body.classList.add("sidebar-open");
  }
};

// 대시보드 닫기 버튼 추가 (헤더에 버튼 만들어야 함)
const dashboardCloseBtn = document.createElement("button");
dashboardCloseBtn.textContent = "← 홈";
dashboardCloseBtn.style.marginLeft = "10px";
dashboardCloseBtn.onclick = () => showPage("home");
document.querySelector("#dashboard header").prepend(dashboardCloseBtn);

// 새로고침 후 로그인 상태 유지
auth.onAuthStateChanged(user => {
  if(user){
    showPage("dashboard", false);
  } else {
    showPage("login", false);
  }
});

// 브라우저 뒤로/앞 버튼 처리
window.onpopstate = (event)=>{
  const page = event.state?.page || "home";
  showPage(page,false);
};

// 페이지 직접 접속 시 처리
const path = window.location.pathname.replace("/","");
if(path && pages[path]) showPage(path,false);
