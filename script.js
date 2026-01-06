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
const closeDashboardBtn = document.getElementById("closeDashboardBtn");

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
    alert("로그인 성공!");
    showPage("dashboard");
  }catch(e){ alert(e.message);}
};

// 로그아웃
document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  showPage("home");
  sidebar.style.left="-250px";
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

// 대시보드 닫기 버튼
closeDashboardBtn.onclick = () => {
  sidebar.style.left="-250px";
  document.body.classList.remove("sidebar-open");
};

// 브라우저 뒤로/앞 버튼 처리
window.onpopstate = (event)=>{
  const page = event.state?.page || "home";
  showPage(page,false);
};

// 페이지 직접 접속 시 처리
const path = window.location.pathname.replace("/","");
if(path && pages[path]) showPage(path,false);

// 새 질문 / 통계 버튼 예제
document.getElementById("addQuestionBtn").onclick = () => alert("새 질문 등록 기능은 아직 개발 중입니다.");
document.getElementById("viewStatsBtn").onclick = () => alert("응답 통계 확인 기능은 아직 개발 중입니다.");

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const db = getFirestore(app);

/**
 * 자동응답 처리 함수
 * @param {string} questionText 사용자가 보낸 질문
 * @param {string} userId 로그인한 사용자 UID
 */
async function autoReply(questionText, userId) {
  // 1. 내 자동응답 규칙 불러오기
  const q = query(
    collection(db, "rules"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  let matchedAnswer = null;

  snapshot.forEach(doc => {
    const rule = doc.data();
    if (questionText.includes(rule.keyword)) {
      matchedAnswer = rule.answer;
    }
  });

  // 2. 질문 기록 저장
  await addDoc(collection(db, "questions"), {
    userId,
    text: questionText,
    autoAnswer: matchedAnswer || "자동응답 없음",
    createdAt: serverTimestamp()
  });

  // 3. 결과 반환
  return matchedAnswer;
}
