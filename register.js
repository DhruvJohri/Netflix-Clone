/**
 * Registration Form Handler
 * This script handles the registration form functionality including:
 * - Email pre-fill from URL parameters
 * - Password visibility toggle
 * - Password strength indicator
 * - Form validation
 */
document.addEventListener("DOMContentLoaded", function() {
  // ============================================
  // Email Pre-fill from URL
  // ============================================
  // Get email from URL parameters (used when coming from index.html's Get Started form)
  const urlParams = new URLSearchParams(window.location.search);
  const urlEmail = urlParams.get('email');
  
  // If email is provided in URL, pre-fill the email field and focus on password
  if (urlEmail) {
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.value = decodeURIComponent(urlEmail);
      // Focus on the next field for better UX
      const passwordInput = document.querySelector('input[type="password"]');
      if (passwordInput) {
        passwordInput.focus();
      }
    }
  }

  // ============================================
  // Password Visibility Toggle
  // ============================================
  const pwInput = document.getElementById('password');
  const pwToggle = document.getElementById('pwToggle');

  // Toggle password visibility and update icon
  pwToggle.addEventListener('click', () => {
    pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
    pwToggle.textContent = pwInput.type === 'password' ? '👁️' : '🙈';
  });

  // ============================================
  // Password Strength Indicator
  // ============================================
  const pwStrength = document.getElementById('pwStrength');
  const strengthBar = document.getElementById('strengthBar');

  // Update password strength as user types
  pwInput.addEventListener('input', () => {
    const v = pwInput.value;
    let s = 0;
    
    // Calculate strength score (0-4)
    if(v.length >= 8) s++;          // Minimum length
    if(/[A-Z]/.test(v)) s++;        // Contains uppercase
    if(/[0-9]/.test(v)) s++;        // Contains number
    if(/[^A-Za-z0-9]/.test(v)) s++; // Contains special char
    
    // Visual feedback
    const widths = ['10%','32%','67%','100%'];  // Widths for strength bar
    const colors = ['#fc256b','#e58223','#e8d300','#09d681']; // Colors from weak to strong
    pwStrength.style.width = widths[s] || '0';
    pwStrength.style.background = colors[s] || '#232332';
    strengthBar.style.display = v.length > 0 ? 'block' : 'none';
  });

  // ============================================
  // Form Validation
  // ============================================
  const form = document.getElementById("registerForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const confirmPassword = document.getElementById("confirmPassword");

  // Display error message for a specific field
  function showError(id, msg) {
    document.getElementById(id).textContent = msg;
  }

  // Clear all error messages
  function clearErrors() {
    ["usernameHelp","emailHelp","passwordHelp","confirmHelp"].forEach(id => showError(id,""));
  }

  // Clear individual field errors when user starts typing
  [username, email, pwInput, confirmPassword].forEach(input =>
    input.addEventListener("input", clearErrors)
  );

  // Form submission handler
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    clearErrors();
    let valid = true;

    // Username validation
    if(!username.value.trim()) {
      showError("usernameHelp", "Username required.");
      valid = false;
    }

    // Email format validation
    if(!/^\S+@\S+\.\S+$/.test(email.value)) {
      showError("emailHelp", "Valid email required.");
      valid = false;
    }

    // Password length validation
    if(pwInput.value.length < 8 || pwInput.value.length > 20) {
      showError("passwordHelp", "Password: 8–20 chars.");
      valid = false;
    }

    // Password match validation
    if(pwInput.value !== confirmPassword.value) {
      showError("confirmHelp", "Passwords do not match.");
      valid = false;
    }

    // If all validations pass
    if(valid) {
      form.reset();
      pwStrength.style.width = '0';
      showError("confirmHelp", "✅ Registration successful!");
      strengthBar.style.display = 'none';
    }
  });

  document.getElementById('submitBtn').addEventListener('click', function(e){
    const btn = this;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    let rect = btn.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) * 1.18 + 'px';
    btn.appendChild(ripple);
    setTimeout(() => {
      if(ripple.parentNode) ripple.remove();
    }, 400);
  });
});