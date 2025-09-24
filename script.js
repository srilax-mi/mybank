// Save user data during registration
function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const accountNumber = document.getElementById("accountNumber").value;
  const password = document.getElementById("password").value;

  if (!username || !accountNumber || !password) {
    alert("Please fill all fields!");
    return;
  }

  if (localStorage.getItem(accountNumber)) {
    alert(" Account already registered!");
    return;
  }

  const user = { username, accountNumber, password };
  localStorage.setItem(accountNumber, JSON.stringify(user));

  alert(" Registration successful! You can now login.");
  document.getElementById("registerForm").reset();

  // Redirect to login page
  window.location.href = "login.html";
}

// Login user
function loginUser(event) {
  event.preventDefault();

  const accountNumber = document.getElementById("loginAccount").value;
  const password = document.getElementById("loginPassword").value;

  if (!accountNumber || !password) {
    alert("⚠ Please enter account number and password!");
    return;
  }

  const user = JSON.parse(localStorage.getItem(accountNumber));

  if (!user) {
    alert(" Account not found. Please register first.");
    return;
  }

  if (user.password === password) {
    alert(` Welcome back, ${user.username}! Login successful.`);

    // Save logged in user into sessionStorage
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));

    // Redirect to dashboard
    window.location.href = "./home.html";
  } else {
    alert(" Incorrect password!");
  }

  document.getElementById("loginForm").reset();
}

// Load dashboard user info
function loadDashboard() {
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!user) {
    // If no user logged in, go back to login
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeMessage").textContent =
    `Welcome, ${user.username}! (Acc No: ${user.accountNumber})`;
    
}
