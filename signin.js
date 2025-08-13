/**
 * Sign-In Form Handler with Authentication
 */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signinForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailHelp = document.getElementById("emailHelp");
  const passwordHelp = document.getElementById("passwordHelp");
  const pwToggle = document.getElementById("pwToggle");
  const toggleIcon = document.getElementById("toggleIcon");

  /** ------------------------------
   * Helper: Retrieve LocalStorage JSON Safely
   * ------------------------------ */
  const getLocalData = (key, fallback = []) => {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch {
      return fallback;
    }
  };

  /** ------------------------------
   * Helper: Show / Clear Messages
   * ------------------------------ */
  const showError = (element, message) => {
    element.textContent = message;
    element.className = "help-text error";
    element.style.opacity = 1;
  };

  const showSuccess = (element, message) => {
    element.textContent = message;
    element.className = "help-text success";
    element.style.opacity = 1;
  };

  const clearErrors = () => {
    [emailHelp, passwordHelp].forEach(el => {
      el.textContent = "";
      el.className = "help-text";
      el.style.opacity = 0;
    });
  };

  /** ------------------------------
   * Helper: User Registration Check
   * ------------------------------ */
  const isUserRegistered = () => {
    const users = getLocalData("netflixUsers");
    return users.length > 0;
  };

  /** ------------------------------
   * Helper: Authenticate User
   * ------------------------------ */
  const authenticateUser = (email, password) => {
    const users = getLocalData("netflixUsers");
    return users.find(
      u =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        u.isActive === true
    ) || null;
  };

  /** ------------------------------
   * Helper: Store Current Session
   * ------------------------------ */
  const storeUserSession = user => {
    try {
      localStorage.setItem(
        "netflixCurrentUser",
        JSON.stringify({
          userId: user.id,
          username: user.username,
          email: user.email,
          loginTime: new Date().toISOString()
        })
      );
      return true;
    } catch {
      return false;
    }
  };

  /** ------------------------------
   * Event: Password Visibility Toggle
   * ------------------------------ */
  pwToggle.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleIcon.className = isPassword ? "fas fa-eye-slash" : "fas fa-eye";

    // Subtle click animation
    pwToggle.style.transform = "translateY(-50%) scale(0.9)";
    setTimeout(() => (pwToggle.style.transform = "translateY(-50%) scale(1)"), 150);
  });

  /** ------------------------------
   * Event: Form Submission
   * ------------------------------ */
  form.addEventListener("submit", e => {
    e.preventDefault();
    clearErrors();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;

    // Email validation using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError(emailHelp, "Enter a valid email address.");
      isValid = false;
    }

    if (password.length < 8) {
      showError(passwordHelp, "Password must be at least 8 characters.");
      isValid = false;
    }

    if (!isValid) return;

    // No registered users
    if (!isUserRegistered()) {
      showError(emailHelp, "No registered users found. Redirecting to register...");
      setTimeout(() => (window.location.href = "register.html"), 2000);
      return;
    }

    // Authentication
    const user = authenticateUser(email, password);
    if (user) {
      if (storeUserSession(user)) {
        showSuccess(passwordHelp, "✅ Sign in successful! Redirecting...");
        form.reset();
        passwordInput.type = "password";
        toggleIcon.className = "fas fa-eye";
        setTimeout(() => (window.location.href = "profile-selection.html"), 1500);
      } else {
        showError(passwordHelp, "Login failed. Please try again.");
      }
    } else {
      const users = getLocalData("netflixUsers");
      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

      if (emailExists) {
        showError(passwordHelp, "Incorrect password. Please try again.");
        passwordInput.value = "";
        passwordInput.focus();
      } else {
        showError(emailHelp, "Email not found. Please register first.");
        emailInput.value = "";
        passwordInput.value = "";
        emailInput.focus();
      }
    }
  });

  /** ------------------------------
   * Real-time Input Feedback
   * ------------------------------ */
  [emailInput, passwordInput].forEach(input =>
    input.addEventListener("input", clearErrors)
  );

  /** ------------------------------
   * Auto Redirect if Already Logged In
   * ------------------------------ */
  window.addEventListener("load", () => {
    if (localStorage.getItem("netflixCurrentUser")) {
      setTimeout(() => (window.location.href = "profile-selection.html"), 1000);
    }
  });
});
