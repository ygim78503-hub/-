const startBtn = document.getElementById("startBtn");
const home = document.getElementById("home");
const auth = document.getElementById("auth");

startBtn.addEventListener("click", () => {
  home.style.display = "none";
  auth.style.display = "block";
});
