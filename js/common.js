const logoutBtn = document.getElementById("logoutBtn");
const userIntro = document.getElementById("userIntro");
// const BASE_URL = 'http://13.235.87.215:4000';
const BASE_URL =
  "https://app-44587b86-5b3d-4fab-b8f5-bf9f99e3d4aa.cleverapps.io/ecomm/api/v1";

logoutBtn.addEventListener("click", logoutFn);

function logoutFn() {
  localStorage.removeItem("username");
  window.location.href = "login.html";
}

if (!localStorage.getItem("username")) {
  window.location.href = "login.html";
} else {
  userIntro.innerText = "Hi " + localStorage.getItem("username");
}
