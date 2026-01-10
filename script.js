document.addEventListener("DOMContentLoaded", () => {
  const home = document.getElementById("home");
  const dashboard = document.getElementById("dashboard");
  const qnaPage = document.getElementById("qnaPage");

  document.getElementById("goDashboard").onclick = () => {
    home.style.display = "none";
    dashboard.style.display = "block";
  };

  document.getElementById("openQnaPage").onclick = () => {
    dashboard.style.display = "none";
    qnaPage.style.display = "block";
  };

  document.getElementById("backToDashboard").onclick = () => {
    qnaPage.style.display = "none";
    dashboard.style.display = "block";
  };

  const webBtn = document.getElementById("selectWeb");
  const appBtn = document.getElementById("selectApp");
  const appArea = document.getElementById("appSelectArea");

  webBtn.onclick = () => {
    webBtn.classList.add("active");
    appBtn.classList.remove("active");
    appArea.style.display = "none";
  };

  appBtn.onclick = () => {
    appBtn.classList.add("active");
    webBtn.classList.remove("active");
    appArea.style.display = "block";
  };

  const appBtns = document.querySelectorAll(".app-btn");
  appBtns.forEach(btn => {
    btn.onclick = () => {
      appBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    };
  });

  document.getElementById("saveQna").onclick = () => {
    alert("질문/응답이 저장되었습니다 (연결 전 단계)");
  };
});
