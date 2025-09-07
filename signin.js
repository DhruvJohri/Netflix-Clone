document.addEventListener("DOMContentLoaded", () => {
  const signinForm = document.getElementById("signinForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailHelp = document.getElementById("emailHelp");
  const passwordHelp = document.getElementById("passwordHelp");
  const toggleBtn = document.getElementById("pwToggle");
  const toggleIcon = document.getElementById("toggleIcon");

  // Toggle password visibility
  toggleBtn.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    toggleIcon.classList.toggle("fa-eye");
    toggleIcon.classList.toggle("fa-eye-slash");
  });

  // Basic form validation + fake auth
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let valid = true;

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      emailHelp.textContent = "Please enter a valid email address.";
      valid = false;
    } else {
      emailHelp.textContent = "";
    }

    // Password validation
    if (!password || password.length < 4) {
      passwordHelp.textContent = "Password must be at least 4 characters.";
      valid = false;
    } else {
      passwordHelp.textContent = "";
    }

    if (!valid) return;

    // Save user (fake login)
    localStorage.setItem(
      "netflixCurrentUser",
      JSON.stringify({ email, signedIn: true })
    );

    // Redirect → Profile Selection
    window.location.href = "profile-selection.html";
  });
});
