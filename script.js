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
  appId: "1:583700899332:web:6e9064ccf93f676dd03751"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 페이지
const pages = document.querySelectorAll(".page");
const home = document.getElementById("home");
const signup = document.getElementById("signupPage");
const login = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");
const qnaPage = document.getElementById("qnaPage");

function show(page) {
  pages.forEach(p => p.style.display = "none");
  page.style.display = "block";
}

// 기본
show(home);

// 이동
startBtn.onclick = () => show(signup);
gotoLogin.onclick = () => show(login);
gotoSignup.onclick = () => show(signup);

// 회원가입
signupSubmitBtn.onclick = async () => {
  await createUserWithEmailAndPassword(
    auth,
    signupEmail.value,
    signupPassword.value
  );
  show(login);
};

// 로그인
loginSubmitBtn.onclick = async () => {
  await signInWithEmailAndPassword(
    auth,
    loginEmail.value,
    loginPassword.value
  );
};

// 로그인 유지
onAuthStateChanged(auth, user => {
  if (user) show(dashboard);
});

// 로그아웃
logoutBtn.onclick = async () => {
  await signOut(auth);
  show(home);
};

// 사이드바
menuBtn.onclick = () => document.body.classList.toggle("sidebar-open");
closeSidebar.onclick = () => document.body.classList.remove("sidebar-open");

// 질문/응답 화면 이동
openQna.onclick = () => show(qnaPage);
backToDashboard.onclick = () => show(dashboard);

// 앱/웹 선택
let target = null;

selectWeb.onclick = () => {
  target = "web";
  appSelectBox.style.display = "none";
};

selectApp.onclick = () => {
  target = "app";
  appSelectBox.style.display = "block";
};

// 저장
saveQna.onclick = () => {
  if (!questionInput.value || !answerInput.value) {
    alert("질문과 응답을 입력하세요");
    return;
  }
  if (target === "app" && !appType.value) {
    alert("앱을 선택하세요");
    return;
  }

  console.log({
    question: questionInput.value,
    answer: answerInput.value,
    target,
    app: appType.value
  });

  alert("저장 완료 (현재 콘솔 출력)");
};
let target = "web";
let selectedApp = null;

selectWeb.onclick = () => {
  target = "web";
  selectWeb.classList.add("active");
  selectApp.classList.remove("active");
  appSelectBox.style.display = "none";
};

selectApp.onclick = () => {
  target = "app";
  selectApp.classList.add("active");
  selectWeb.classList.remove("active");
  appSelectBox.style.display = "block";
};

// 앱 버튼 선택
document.querySelectorAll(".app-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".app-btn")
      .forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedApp = btn.innerText;
  };
});

// 저장
saveQna.onclick = () => {
  if (!questionInput.value || !answerInput.value) {
    alert("질문과 응답을 입력하세요");
    return;
  }
  if (target === "app" && !selectedApp) {
    alert("앱을 선택하세요");
    return;
  }

  console.log({
    question: questionInput.value,
    answer: answerInput.value,
    target,
    app: selectedApp
  });

  alert("질문/응답이 저장되었습니다");
};
