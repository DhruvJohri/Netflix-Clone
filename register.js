/**
 * Registration Form Handler with User Storage
 * This script handles the registration form functionality including:
 * - Email pre-fill from URL parameters
 * - Professional password visibility toggle
 * - Enhanced password strength indicator with strong validation
 * - Form validation with comprehensive password requirements
 * - User data storage in localStorage
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
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        passwordInput.focus();
      }
    }
  }

  // ============================================
  // Professional Password Visibility Toggle
  // ============================================
  const pwInput = document.getElementById('password');
  const pwToggle = document.getElementById('pwToggle');
  const toggleIcon = document.getElementById('toggleIcon');
  
  const confirmInput = document.getElementById('confirmPassword');
  const confirmToggle = document.getElementById('confirmToggle');
  const confirmToggleIcon = document.getElementById('confirmToggleIcon');

  // Main password toggle
  pwToggle.addEventListener('click', () => {
    const isPassword = pwInput.type === 'password';
    pwInput.type = isPassword ? 'text' : 'password';
    toggleIcon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    
    // Add visual feedback
    pwToggle.style.transform = 'translateY(-50%) scale(0.9)';
    setTimeout(() => {
      pwToggle.style.transform = 'translateY(-50%) scale(1)';
    }, 150);
  });

  // Confirm password toggle
  confirmToggle.addEventListener('click', () => {
    const isPassword = confirmInput.type === 'password';
    confirmInput.type = isPassword ? 'text' : 'password';
    confirmToggleIcon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    
    // Add visual feedback
    confirmToggle.style.transform = 'translateY(-50%) scale(0.9)';
    setTimeout(() => {
      confirmToggle.style.transform = 'translateY(-50%) scale(1)';
    }, 150);
  });

  // ============================================
  // Enhanced Password Strength Validation
  // ============================================
  const pwStrength = document.getElementById('pwStrength');
  const strengthBar = document.getElementById('strengthBar');
  const strengthLabel = document.getElementById('strengthLabel');
  const passwordRequirements = document.getElementById('passwordRequirements');

  // Strong password regex: uppercase, lowercase, digit, special char, min 8 chars
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Individual requirement checks
  const passwordChecks = {
    length: /^.{8,}$/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    digit: /\d/,
    special: /[@$!%*?&]/
  };

  // Update password strength and requirements display
  pwInput.addEventListener('input', () => {
    const password = pwInput.value;
    
    // Calculate strength score and update visual indicators
    updatePasswordStrength(password);
    
    // Update individual requirement indicators
    updatePasswordRequirements(password);
    
    // Show/hide requirements based on input
    if (password.length > 0) {
      strengthBar.style.display = 'block';
      passwordRequirements.style.display = 'block';
    } else {
      strengthBar.style.display = 'none';
      passwordRequirements.style.display = 'none';
    }
  });

  function updatePasswordStrength(password) {
    let score = 0;
    const checks = Object.values(passwordChecks);
    
    // Calculate how many requirements are met
    checks.forEach(regex => {
      if (regex.test(password)) score++;
    });
    
    // Update strength bar - Fixed indexing issue
    const strengthPercentages = ['0%', '20%', '40%', '60%', '80%', '100%'];
    const strengthColors = ['#666', '#ff4757', '#ff6b7a', '#ffa502', '#2ed573', '#20bf6b'];
    const strengthLabels = ['', 'Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    
    // Use score directly as index (0-5)
    pwStrength.style.width = strengthPercentages[score];
    pwStrength.style.background = strengthColors[score];
    
    // Update strength label
    if (strengthLabel) {
      strengthLabel.textContent = password.length > 0 ? strengthLabels[score] : '';
      strengthLabel.style.color = strengthColors[score];
    }
  }

  function updatePasswordRequirements(password) {
    const requirements = [
      { id: 'req-length', regex: passwordChecks.length, text: 'At least 8 characters' },
      { id: 'req-lowercase', regex: passwordChecks.lowercase, text: 'One lowercase letter (a-z)' },
      { id: 'req-uppercase', regex: passwordChecks.uppercase, text: 'One uppercase letter (A-Z)' },
      { id: 'req-digit', regex: passwordChecks.digit, text: 'One number (0-9)' },
      { id: 'req-special', regex: passwordChecks.special, text: 'One special character (@$!%*?&)' }
    ];

    requirements.forEach(req => {
      const element = document.getElementById(req.id);
      if (element) {
        const isMet = req.regex.test(password);
        element.classList.toggle('met', isMet);
        element.classList.toggle('unmet', !isMet);
        
        // Update the requirement icon
        const icon = element.querySelector('.requirement-icon');
        if (icon) {
          icon.textContent = isMet ? '✓' : '✗';
        }
      }
    });
  }

  // Function to reset all password strength indicators
  function resetPasswordStrengthIndicators() {
    // Hide strength bar and requirements
    if (strengthBar) {
      strengthBar.style.display = 'none';
    }
    
    if (passwordRequirements) {
      passwordRequirements.style.display = 'none';
    }
    
    // Reset strength progress bar
    if (pwStrength) {
      pwStrength.style.width = '0%';
      pwStrength.style.background = '#ff4757';
    }
    
    // Clear strength label
    if (strengthLabel) {
      strengthLabel.textContent = '';
      strengthLabel.style.color = '#ff4757';
    }
    
    // Reset all requirement indicators to unmet state
    const requirementIds = ['req-length', 'req-lowercase', 'req-uppercase', 'req-digit', 'req-special'];
    requirementIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.classList.remove('met');
        element.classList.add('unmet');
        
        const icon = element.querySelector('.requirement-icon');
        if (icon) {
          icon.textContent = '✗';
        }
      }
    });
  }

  // ============================================
  // Enhanced Form Validation and Storage
  // ============================================
  const form = document.getElementById("registerForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");

  // Display error message for a specific field
  function showError(id, msg) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = msg;
      element.style.color = '#ff4757';
    }
  }

  // Display success message for a specific field
  function showSuccess(id, msg) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = msg;
      element.style.color = '#20bf6b';
    }
  }

  // Clear all error messages
  function clearErrors() {
    ["usernameHelp", "emailHelp", "passwordHelp", "confirmHelp"].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.textContent = "";
      }
    });
  }

  // Real-time validation feedback
  [username, email, pwInput, confirmInput].forEach(input => {
    if (input) {
      input.addEventListener("input", () => {
        clearErrors();
        validateField(input);
      });
    }
  });

  // Validate individual form fields
  function validateField(field) {
    const value = field.value.trim();
    
    switch(field.id) {
      case 'username':
        if (value && value.length < 3) {
          showError("usernameHelp", "Username must be at least 3 characters.");
        } else if (value && value.length >= 3) {
          showSuccess("usernameHelp", "✓ Valid username");
        }
        break;
        
      case 'email':
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (value && !emailRegex.test(value)) {
          showError("emailHelp", "Please enter a valid email address.");
        } else if (value && emailRegex.test(value)) {
          showSuccess("emailHelp", "✓ Valid email");
        }
        break;
        
      case 'password':
        if (value && !strongPasswordRegex.test(value)) {
          showError("passwordHelp", "Password must meet all requirements above.");
        } else if (value && strongPasswordRegex.test(value)) {
          showSuccess("passwordHelp", "✓ Strong password");
        }
        break;
        
      case 'confirmPassword':
        if (value && value !== pwInput.value) {
          showError("confirmHelp", "Passwords do not match.");
        } else if (value && value === pwInput.value && value.length > 0) {
          showSuccess("confirmHelp", "✓ Passwords match");
        }
        break;
    }
  }

  // Form submission with user data storage
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    clearErrors();
    
    let isValid = true;
    const formData = {
      username: username.value.trim(),
      email: email.value.trim(),
      password: pwInput.value,
      confirmPassword: confirmInput.value
    };

    // Username validation
    if (!formData.username) {
      showError("usernameHelp", "Username is required.");
      isValid = false;
    } else if (formData.username.length < 3) {
      showError("usernameHelp", "Username must be at least 3 characters.");
      isValid = false;
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!formData.email) {
      showError("emailHelp", "Email is required.");
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      showError("emailHelp", "Please enter a valid email address.");
      isValid = false;
    }

    // Strong password validation
    if (!formData.password) {
      showError("passwordHelp", "Password is required.");
      isValid = false;
    } else if (!strongPasswordRegex.test(formData.password)) {
      showError("passwordHelp", "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters long.");
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      showError("confirmHelp", "Please confirm your password.");
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      showError("confirmHelp", "Passwords do not match.");
      isValid = false;
    }

    // If all validations pass
    if (isValid) {
      // Store user registration data in localStorage
      storeUserData(formData);
      
      // Show success message
      showSuccess("confirmHelp", "✅ Registration successful! Redirecting to sign in...");
      
      // Reset form and redirect after brief delay
      setTimeout(() => {
        // Reset the form completely
        form.reset();
        clearErrors();
        resetPasswordStrengthIndicators();
        
        // Reset password toggle icons to default state
        if (toggleIcon) {
          toggleIcon.className = 'fas fa-eye';
        }
        if (confirmToggleIcon) {
          confirmToggleIcon.className = 'fas fa-eye';
        }
        
        // Reset password input types to password
        if (pwInput) {
          pwInput.type = 'password';
        }
        if (confirmInput) {
          confirmInput.type = 'password';
        }
        
        // Redirect to sign-in page
        window.location.href = 'signin.html';
      }, 2000);
    }
  });

  // Function to store user data securely
  function storeUserData(userData) {
    try {
      // Get existing users or create empty array
      const existingUsers = JSON.parse(localStorage.getItem('netflixUsers') || '[]');
      
      // Check if user already exists
      const userExists = existingUsers.find(user => 
        user.email.toLowerCase() === userData.email.toLowerCase() || 
        user.username.toLowerCase() === userData.username.toLowerCase()
      );
      
      if (userExists) {
        showError("emailHelp", "User already exists with this email or username.");
        return false;
      }
      
      // Create new user object (password should be hashed in real app)
      const newUser = {
        id: Date.now(), // Simple ID generation
        username: userData.username,
        email: userData.email.toLowerCase(),
        password: userData.password, // In real app, hash this password
        registeredAt: new Date().toISOString(),
        isActive: true
      };
      
      // Add new user to array
      existingUsers.push(newUser);
      
      // Store updated users array
      localStorage.setItem('netflixUsers', JSON.stringify(existingUsers));
      
      return true;
    } catch (error) {
      console.error('Error storing user data:', error);
      showError("confirmHelp", "Registration failed. Please try again.");
      return false;
    }
  }

  // Button ripple effect
  document.getElementById('submitBtn')?.addEventListener('click', function(e) {
    const btn = this;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) * 1.18 + 'px';
    btn.appendChild(ripple);
    setTimeout(() => {
      if (ripple.parentNode) ripple.remove();
    }, 400);
  });
});
