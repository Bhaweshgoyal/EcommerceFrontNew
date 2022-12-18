const showSignupBtn = document.getElementById("showSignupBtn");
const showLoginBtn = document.getElementById("showLoginBtn");
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const signupUsername = document.getElementById("signupUsername");
const signupPassword = document.getElementById("signupPassword");
const signupEmail = document.getElementById("signupEmail");

const authErrMsg = document.getElementById("authErrMsg");
const succErrMsg = document.getElementById("succErrMsg");

function showSignup() {
  signupForm.classList.remove("d-none");
  loginForm.classList.add("d-none");
}

function showLogin() {
  signupForm.classList.add("d-none");
  loginForm.classList.remove("d-none");
}
const BASE_URL =
  "https://app-44587b86-5b3d-4fab-b8f5-bf9f99e3d4aa.cleverapps.io/ecomm/api/v1";

function createCart() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  //   console.log(userId, token, "33");
  const headers = {
    "Content-Type": "application/json",
    "x-access-token": token,
  };
  fetch(BASE_URL + "/createcart", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ userId }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("cartId", data.cartId);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function loginFn() {
  if (loginEmail.value == "") {
    updateAuthErrorMsg("Username should not be empty");
  } else if (loginPassword.value == "") {
    updateAuthErrorMsg("Password should not be empty");
  } else {
    // console.log(loginPassword.value)
    const data = {
      email: loginEmail.value,
      password: loginPassword.value,
    };
    fetch(BASE_URL + "/signin", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data.token);
        if (data.token) {
          localStorage.setItem("username", data.username);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          createCart();
          // window.location.href = "index.html";
        } else {
          updateAuthErrorMsg(data.msg);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function signupFn() {
  if (signupUsername.value == "") {
    updateAuthErrorMsg("Username should not be empty");
  } else if (signupPassword.value == "") {
    updateAuthErrorMsg("Password should not be empty");
  } else {
    const data = {
      username: signupUsername.value,
      password: signupPassword.value,
      email: signupEmail.value,
    };
    fetch(BASE_URL + "/signup", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        updateSuccErrorMsg(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function updateAuthErrorMsg(msg) {
  authErrMsg.innerText = msg;
}
function updateSuccErrorMsg(msg) {
  succErrMsg.innerText = msg;
}

function redirectToHome() {
  window.location.href = "/";
}

showSignupBtn.addEventListener("click", showSignup);
showLoginBtn.addEventListener("click", showLogin);
signupBtn.addEventListener("click", signupFn);
loginBtn.addEventListener("click", loginFn);

if (localStorage.getItem("username")) {
  window.location.href = "index.html";
}
