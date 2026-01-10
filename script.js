/********************************
 기본 페이지 상태
********************************/
document.addEventListener("DOMContentLoaded", () => {
  const dashboardPage = document.getElementById("dashboard");
  const qnaPage = document.getElementById("qnaPage");

  if (dashboardPage) dashboardPage.style.display = "block";
  if (qnaPage) qnaPage.style.display = "none";
});


/********************************
 질문·응답 등록 화면 이동
********************************/
const openQnaBtn = document.getElementById("openQnaPage");
const backToDashboardBtn = document.getElementById("backToDashboard");

const dashboardPage = document.getElementById("dashboard");
const qnaPage = document.getElementById("qnaPage");

if (openQnaBtn) {
  openQnaBtn.addEventListener("click", () => {
    dashboardPage.style.display = "none";
    qnaPage.style.display = "block";
  });
}

if (backToDashboardBtn) {
  backToDashboardBtn.addEventListener("click", () => {
    qnaPage.style.display = "none";
    dashboardPage.style.display = "block";
  });
}


/********************************
 웹 / 앱 선택 버튼
********************************/
const webBtn = document.getElementById("selectWeb");
const appBtn = document.getElementById("selectApp");
const appSelectArea = document.getElementById("appSelectArea");

if (webBtn && appBtn) {
  webBtn.addEventListener("click", () => {
    webBtn.classList.add("active");
    appBtn.classList.remove("active");
    if (appSelectArea) appSelectArea.style.display = "none";
  });

  appBtn.addEventListener("click", () => {
    appBtn.classList.add("active");
    webBtn.classList.remove("active");
    if (appSelectArea) appSelectArea.style.display = "block";
  });
}


/********************************
 앱 종류 선택 (단일 선택)
********************************/
const appButtons = document.querySelectorAll(".app-btn");

appButtons.forEach(button => {
  button.addEventListener("click", () => {
    appButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});


/********************************
 저장 버튼 (현재는 콘솔 확인용)
********************************/
const saveBtn = document.getElementById("saveQna");

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const question = document.getElementById("questionInput")?.value;
    const answer = document.getElementById("answerInput")?.value;

    let location = "웹사이트";
    if (appBtn && appBtn.classList.contains("active")) {
      location = "앱";
    }

    let selectedApp = null;
    appButtons.forEach(btn => {
      if (btn.classList.contains("active")) {
        selectedApp = btn.dataset.app;
      }
    });

    console.log("질문:", question);
    console.log("응답:", answer);
    console.log("사용 위치:", location);
    console.log("앱 종류:", selectedApp);

    alert("질문/응답이 저장되었습니다 (임시)");
  });
}
