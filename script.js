/* =====================
 Firebase 설정
===================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

/* =====================
 페이지 관리
===================== */
const pages = {
  home: document.getElementById("home"),
  login: document.getElementById("loginPage"),
  dashboard: document.getElementById("dashboard"),
  rule: document.getElementById("rulePage")
};

function showPage(name) {
  Object.values(pages).forEach(p => p.style.display = "none");
  pages[name].style.display = "block";
}

/* =====================
 로그인
===================== */
document.getElementById("loginBtn").onclick = async () => {
  const email = loginEmail.value;
  const pw = loginPassword.value;

  try {
    await signInWithEmailAndPassword(auth, email, pw);
  } catch (e) {
    alert("로그인 실패");
  }
};

onAuthStateChanged(auth, user => {
  if (user) {
    showPage("dashboard");
  } else {
    showPage("home");
  }
});

/* =====================
 로그아웃
===================== */
document.getElementById("logoutBtn").onclick = async () => {
  await signOut(auth);
  showPage("home");
};

/* =====================
 사이드바
===================== */
const body = document.body;

menuBtn.onclick = () => {
  body.classList.add("sidebar-open");
};

closeSidebarBtn.onclick = () => {
  body.classList.remove("sidebar-open");
};

/* =====================
 자동응답 등록 페이지 이동
===================== */
openRulePage.onclick = () => {
  body.classList.remove("sidebar-open");
  showPage("rule");
};

backToDashboard.onclick = () => {
  showPage("dashboard");
};

/* =====================
 자동응답 저장
===================== */
saveRuleBtn.onclick = async () => {
  const keyword = ruleKeyword.value.trim();
  const answer = ruleAnswer.value.trim();
  const user = auth.currentUser;

  if (!keyword || !answer) {
    alert("모두 입력하세요");
    return;
  }

  await addDoc(collection(db, "rules"), {
    userId: user.uid,
    keyword,
    answer,
    createdAt: new Date()
  });

  alert("자동응답이 저장되었습니다");
  ruleKeyword.value = "";
  ruleAnswer.value = "";
  showPage("dashboard");
};
