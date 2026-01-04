const startBtn = document.getElementById("startBtn");
const home = document.getElementById("home");
const auth = document.getElementById("auth");
const signupBtn = document.getElementById("signup");
const signup = document.getElementById("signup");

startBtn.addEventListener("click", () => {
  home.style.display = "none";
  auth.style.display = "block";
});

signupBtn.addEventListener("click", () => {
  auth.style.display = "none";
  signup.style.display = "block";
});
