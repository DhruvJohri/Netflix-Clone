document.addEventListener("DOMContentLoaded", function() {
  const pwInput = document.getElementById('password');
  const pwToggle = document.getElementById('pwToggle');

  pwToggle.addEventListener('click', () => {
    pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
    pwToggle.textContent = pwInput.type === 'password' ? '👁️' : '🙈';
  });

  const pwStrength = document.getElementById('pwStrength');
  const strengthBar = document.getElementById('strengthBar');

  pwInput.addEventListener('input', () => {
    const v = pwInput.value;
    let s = 0;
    if(v.length >= 8) s++;
    if(/[A-Z]/.test(v)) s++;
    if(/[0-9]/.test(v)) s++;
    if(/[^A-Za-z0-9]/.test(v)) s++;
    const widths = ['10%','32%','67%','100%'];
    const colors = ['#fc256b','#e58223','#e8d300','#09d681'];
    pwStrength.style.width = widths[s] || '0';
    pwStrength.style.background = colors[s] || '#232332';
    strengthBar.style.display = v.length > 0 ? 'block' : 'none';
  });

  const form = document.getElementById("registerForm");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const confirmPassword = document.getElementById("confirmPassword");

  function showError(id, msg) {
    document.getElementById(id).textContent = msg;
  }

  function clearErrors() {
    ["usernameHelp","emailHelp","passwordHelp","confirmHelp"].forEach(id=>showError(id,""));
  }

  [username, email, pwInput, confirmPassword].forEach(input =>
    input.addEventListener("input", clearErrors)
  );

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    clearErrors();
    let valid = true;

    if(!username.value.trim()) {
      showError("usernameHelp", "Username required.");
      valid = false;
    }

    if(!/^\S+@\S+\.\S+$/.test(email.value)) {
      showError("emailHelp", "Valid email required.");
      valid = false;
    }

    if(pwInput.value.length < 8 || pwInput.value.length > 20) {
      showError("passwordHelp", "Password: 8–20 chars.");
      valid = false;
    }

    if(pwInput.value !== confirmPassword.value) {
      showError("confirmHelp", "Passwords do not match.");
      valid = false;
    }

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
