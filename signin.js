document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signinForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailHelp = document.getElementById("emailHelp");
  const passwordHelp = document.getElementById("passwordHelp");
  const pwToggle = document.getElementById("pwToggle");
  const searchBar = document.getElementById('searchBar');

  if (searchBar) {
    searchBar.addEventListener('input', (event) => {
      const query = event.target.value.toLowerCase();
      const allMovies = document.querySelectorAll('.movie-card'); // Assuming each movie/show has class 'movie-card'

      allMovies.forEach(card => {
        const title = card.textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  //toggle password visibility
  if (pwToggle && passwordInput) {
    pwToggle.addEventListener("click", function () {
      const type = passwordInput.getAttribute("type");
      if (type === "password") {
        passwordInput.setAttribute("type", "text");
        pwToggle.textContent = "Hide";
      } else {
        passwordInput.setAttribute("type", "password");
        pwToggle.textContent = "Show";
      }
    });
  }

  // Form submit handler
  if (form && emailInput && passwordInput && emailHelp && passwordHelp) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      let isValid = true;
      emailHelp.textContent = "";
      passwordHelp.textContent = "";

      if (!email || !email.includes("@") || !email.includes(".")) {
        emailHelp.textContent = "Enter a valid email address.";
        isValid = false;
      }

      if (!password || password.length < 6) {
        passwordHelp.textContent = "Password must be at least 6 characters.";
        isValid = false;
      }

      if (isValid) {
        // Simulate login success
        alert("Sign in successful!");
        window.location.href = "profile-selection.html"; // Redirect to profile selection
        form.reset();
      }
    });
  }
});
