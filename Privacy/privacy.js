// privacy.js

document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // Dark Mode Toggle
  // ----------------------------
  const darkToggleBtn = document.querySelector(".toggle-dark");
  if (darkToggleBtn) {
    darkToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      // Optional: Save preference
      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
      );
    });

    // Apply saved preference on load
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
    }
  }

  // ----------------------------
  // Scrollspy: Highlight active section
  // ----------------------------
  const sections = document.querySelectorAll(".scroll-section");
  const navLinks = document.querySelectorAll(".sidebar nav ul li a");

  if (sections.length && navLinks.length) {
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${current}`
        );
      });
    });
  }

  // ----------------------------
  // Smooth Scrolling
  // ----------------------------
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // ----------------------------
  // Search Functionality
  // ----------------------------
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchText = searchInput.value.toLowerCase();
      sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        section.style.display = text.includes(searchText) ? "block" : "none";
      });
    });
  }
});
