let passwordAttempts = 0;
const maxAttempts = 3;
const lockDuration = 60; // seconds

const form = document.getElementById("regForm");
const submitBtn = document.getElementById("submitBtn");
const lockMessage = document.getElementById("lockMessage");

function lockForm() {
  submitBtn.disabled = true;
  let remaining = lockDuration;
  lockMessage.textContent = "Too many failed attempts. Locked for " + remaining + " seconds.";

  const countdown = setInterval(function () {
    remaining--;

    if (remaining <= 0) {
      clearInterval(countdown);
      submitBtn.disabled = false;
      passwordAttempts = 0;
      lockMessage.textContent = "";
    } else {
      lockMessage.textContent = "Too many failed attempts. Locked for " + remaining + " seconds.";
    }
  }, 1000);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const nameRegex = /^[A-Za-z]+$/;

  if (firstName === "" || !nameRegex.test(firstName)) {
    alert("First name is required and must contain alphabets only.");
    return;
  }

  const lastName = document.getElementById("lastName").value.trim();

  if (lastName === "" || !nameRegex.test(lastName)) {
    alert("Last name is required and must contain alphabets only.");
    return;
  }

  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "" || !emailRegex.test(email)) {
    alert("A valid email address is required.");
    return;
  }

  const password = document.getElementById("password").value;
  const correctPassword = "Club@123"; // predefined correct password

  if (submitBtn.disabled) {
    alert("Form is locked. Please wait until the timer ends.");
    return;
  } else if (password !== correctPassword) {
    passwordAttempts++;

    if (passwordAttempts >= maxAttempts) {
      lockForm();
    } else {
      alert("Incorrect password. Attempts left: " + (maxAttempts - passwordAttempts));
    }
    return;
  } else {
    passwordAttempts = 0;
  }

  const genderOptions = document.querySelectorAll('input[name="gender"]');
  let genderSelected = false;

  genderOptions.forEach(function (option) {
    if (option.checked) {
      genderSelected = true;
    }
  });

  if (!genderSelected) {
    alert("Please select a gender.");
    return;
  }

  const clubOptions = document.querySelectorAll('input[name="clubs"]');
  let clubSelected = false;

  clubOptions.forEach(function (option) {
    if (option.checked) {
      clubSelected = true;
    }
  });

  if (!clubSelected) {
    alert("Select at least one club.");
    return;
  }

  const category = document.getElementById("category").value;

  if (category === "") {
    alert("Please choose a valid category.");
    return;
  }

  const reason = document.getElementById("reason").value.trim();

  if (reason.length < 20) {
    alert("Minimum 20 characters required for the reason field.");
    return;
  }

  alert("Registration submitted successfully!");
  form.reset();
});