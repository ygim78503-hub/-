import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* Firebase 설정 */
const firebaseConfig = {
  apiKey: "AIzaSyD6y7KMQ9T9LbvectgYOldxYAmq-_Zrjgs",
  authDomain: "reply-service-f3d73.firebaseapp.com",
  projectId: "reply-service-f3d73",
  storageBucket: "reply-service-f3d73.appspot.com",
  messagingSenderId: "583700899332",
  appId: "1:583700899332:web:6e9064ccf93f676dd03751"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* 페이지 관리 */
const pages = {
  home: document.getElementById("home"),
  signup: document.getElementById("signupPage"),
  login: document.getElementById("loginPage"),
  dashboard: document.getElementById("dashboard"),
  rule: document.getElementById("rulePage")
};

function showPage(name) {
  Object.values(pages).forEach(p => p.style.display = "none");
  pages[name].style.display = "block";
}

/* 초기 화면 */
showPage("home");

/* 홈 */
startBtn.onclick = () => showPage("signup");

/* 이동 */
gotoLogin.onclick = () => showPage("login");
gotoSignup.onclick = () => showPage("signup");

/* 회원가입 */
signupSubmitBtn.onclick = async () => {
  await createUserWithEmailAndPassword(
    auth,
    signupEmail.value,
    signupPassword.value
  );
  showPage("dashboard");
};

/* 로그인 */
loginSubmitBtn.onclick = async () => {
  await signInWithEmailAndPassword(
    auth,
    loginEmail.value,
    loginPassword.value
  );
  showPage("dashboard");
};

/* 로그인 유지 */
onAuthStateChanged(auth, user => {
  if (user) showPage("dashboard");
});

/* 로그아웃 */
logoutBtn.onclick = async () => {
  await signOut(auth);
  document.body.classList.remove("sidebar-open");
  showPage("home");
};

/* 사이드바 */
menuBtn.onclick = () => {
  document.body.classList.toggle("sidebar-open");
};

closeSidebarBtn.onclick = () => {
  document.body.classList.remove("sidebar-open");
};

/* 질문 응답 등록 */
openRulePage.onclick = () => showPage("rule");
backToDashboard.onclick = () => showPage("dashboard");

/* 저장 버튼 (현재는 동작만) */
saveRuleBtn.onclick = () => {
  alert("다음 단계에서 Firebase에 저장됩니다!");
};
