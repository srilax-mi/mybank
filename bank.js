// Load accounts from localStorage (or start fresh)
let accounts = JSON.parse(localStorage.getItem("accounts")) || {};

const depositAmountInput = document.getElementById("depositAmount");
const withdrawAmountInput = document.getElementById("withdrawAmount");

const depositAccountInput = document.querySelector("#depositAmount + input"); // second input in Deposit
const withdrawAccountInput = document.querySelector("#withdrawAmount + input"); // second input in Withdraw

const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");
const logoutBtn = document.getElementById("logoutBtn");

const depositBalance = document.getElementById("depositBalance");
const withdrawBalance = document.getElementById("withdrawBalance");

// Save to localStorage
function saveAccounts() {
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Update balance displays (for the last used account)
function updateBalances(accountId) {
  if (accountId && accounts[accountId] !== undefined) {
    depositBalance.textContent = `Your Current Balance ${accounts[accountId]}`;
    withdrawBalance.textContent = `Your Current Balance ${accounts[accountId]}`;
  } else {
    depositBalance.textContent = `Your Current Balance 0`;
    withdrawBalance.textContent = `Your Current Balance 0`;
  }
}

// Deposit action
depositBtn.addEventListener("click", () => {
  const amount = parseFloat(depositAmountInput.value);
  const accountId = depositAccountInput.value.trim();

  if (!accountId) {
    alert("⚠️ Please enter an Account ID!");
    return;
  }

  if (!isNaN(amount) && amount > 0) {
    if (!accounts[accountId]) {
      accounts[accountId] = 0; // create account if not exists
    }
    accounts[accountId] += amount;
    saveAccounts();
    updateBalances(accountId);
    alert(` Deposit successful! Added ${amount} to Account ${accountId}. Current Balance: ${accounts[accountId]}`);
  } else {
    alert(" Enter a valid deposit amount!");
  }

  depositAmountInput.value = "";
  depositAccountInput.value = "";
});

// Withdraw action
withdrawBtn.addEventListener("click", () => {
  const amount = parseFloat(withdrawAmountInput.value);
  const accountId = withdrawAccountInput.value.trim();

  if (!accountId) {
    alert(" Please enter an Account ID!");
    return;
  }

  if (!accounts[accountId]) {
    alert(" Account not found!");
    return;
  }

  if (!isNaN(amount) && amount > 0) {
    if (amount <= accounts[accountId]) {
      accounts[accountId] -= amount;
      saveAccounts();
      updateBalances(accountId);
      alert(`Withdrawal successful! You withdrew ${amount} from Account ${accountId}. Current Balance: ${accounts[accountId]}`);
    } else {
      alert("Insufficient funds!");
    }
  } else {
    alert(" Enter a valid withdrawal amount!");
  }

  withdrawAmountInput.value = "";
  withdrawAccountInput.value = "";
});

// Logout (optional reset all accounts)
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("accounts");
    accounts = {};
    updateBalances();
    alert("Logged out.");
  });
}

// Initial display
updateBalances();
