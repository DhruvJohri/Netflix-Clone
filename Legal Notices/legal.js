// theme-and-scroll.js

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // Toggle Dark Mode
  // ----------------------------
  const themeToggleBtn = document.getElementById("themeToggle");
  if (themeToggleBtn) {
    // Apply saved dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      themeToggleBtn.textContent = "☀️";
    } else {
      themeToggleBtn.textContent = "🌙";
    }

    themeToggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      const isDarkMode = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", isDarkMode);

      this.textContent = isDarkMode ? "☀️" : "🌙";
    });
  }

  // ----------------------------
  // Scroll-to-Top Button
  // ----------------------------
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ----------------------------
  // Auto Update Year
  // ----------------------------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
