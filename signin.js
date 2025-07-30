/**
 * Sign-In Form Handler with Authentication
 */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signinForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailHelp = document.getElementById("emailHelp");
  const passwordHelp = document.getElementById("passwordHelp");
  const pwToggle = document.getElementById("pwToggle");
  const toggleIcon = document.getElementById("toggleIcon");

  // Professional Password Toggle
  pwToggle.addEventListener("click", function () {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    toggleIcon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    
    // Add visual feedback
    pwToggle.style.transform = 'translateY(-50%) scale(0.9)';
    setTimeout(() => {
      pwToggle.style.transform = 'translateY(-50%) scale(1)';
    }, 150);
  });

  // Helper functions for messaging
  function showError(element, message) {
    element.textContent = message;
    element.className = 'help-text';
  }

  function showSuccess(element, message) {
    element.textContent = message;
    element.className = 'help-text success';
  }

  function clearErrors() {
    emailHelp.textContent = "";
    passwordHelp.textContent = "";
    emailHelp.className = 'help-text';
    passwordHelp.className = 'help-text';
  }

  // Check if user is registered
  function isUserRegistered() {
    try {
      const users = JSON.parse(localStorage.getItem('netflixUsers') || '[]');
      return users.length > 0;
    } catch (error) {
      console.error('Error checking registration:', error);
      return false;
    }
  }

  // Authenticate user
  function authenticateUser(email, password) {
    try {
      const users = JSON.parse(localStorage.getItem('netflixUsers') || '[]');
      
      const user = users.find(user => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.password === password &&
        user.isActive === true
      );
      
      return user || null;
    } catch (error) {
      console.error('Error during authentication:', error);
      return null;
    }
  }

  // Store current session
  function storeUserSession(user) {
    try {
      const sessionData = {
        userId: user.id,
        username: user.username,
        email: user.email,
        loginTime: new Date().toISOString()
      };
      
      localStorage.setItem('netflixCurrentUser', JSON.stringify(sessionData));
      return true;
    } catch (error) {
      console.error('Error storing session:', error);
      return false;
    }
  }

  // Form submit handler with proper authentication
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let isValid = true;

    // Basic validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      showError(emailHelp, "Enter a valid email address.");
      isValid = false;
    }

    if (!password || password.length < 8) {
      showError(passwordHelp, "Password must be at least 8 characters.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Check if any users are registered
    if (!isUserRegistered()) {
      showError(emailHelp, "No registered users found. Please register first.");
      setTimeout(() => {
        window.location.href = "register.html";
      }, 2000);
      return;
    }

    // Authenticate user
    const authenticatedUser = authenticateUser(email, password);
    
    if (authenticatedUser) {
      // Store user session
      if (storeUserSession(authenticatedUser)) {
        showSuccess(passwordHelp, "✅ Sign in successful! Redirecting...");
        
        // Clear form
        form.reset();
        
        // Reset password toggle
        passwordInput.type = 'password';
        toggleIcon.className = 'fas fa-eye';
        
        // Redirect to profile selection after successful login
        setTimeout(() => {
          window.location.href = "profile-selection.html";
        }, 1500);
      } else {
        showError(passwordHelp, "Login failed. Please try again.");
      }
    } else {
      // Check if email exists but password is wrong
      const users = JSON.parse(localStorage.getItem('netflixUsers') || '[]');
      const emailExists = users.find(user => 
        user.email.toLowerCase() === email.toLowerCase()
      );
      
      if (emailExists) {
        showError(passwordHelp, "Incorrect password. Please try again.");
        // Clear password field but keep email
        passwordInput.value = '';
        passwordInput.focus();
      } else {
        showError(emailHelp, "Email not found. Please register first.");
        // Clear both fields
        emailInput.value = '';
        passwordInput.value = '';
        emailInput.focus();
      }
    }
  });

  // Real-time validation feedback
  emailInput.addEventListener("input", () => {
    clearErrors();
  });

  passwordInput.addEventListener("input", () => {
    clearErrors();
  });

  // Check if user is already logged in
  window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('netflixCurrentUser');
    if (currentUser) {
      // User is already logged in, redirect to profile selection
      setTimeout(() => {
        window.location.href = "profile-selection.html";
      }, 1000);
    }
  });
});
