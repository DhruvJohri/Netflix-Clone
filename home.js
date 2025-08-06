document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("netflixCurrentUser");

  if (!currentUser) {
    alert("Please sign in to access the Home page.");
    window.location.href = "index.html";
  }
});

// Mobile menu functionality
const menuToggle = document.querySelector(".menu-toggle");
const leftSidebar = document.querySelector(".left");
const overlay = document.querySelector(".overlay");

// Toggle mobile menu
menuToggle.addEventListener("click", () => {
  leftSidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Close menu when clicking overlay
overlay.addEventListener("click", () => {
  leftSidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Close menu when clicking a nav link (optional)
const navLinks = document.querySelectorAll(".left ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      leftSidebar.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    leftSidebar.classList.remove("active");
    overlay.classList.remove("active");
  }
});

// Add loading states for images (optional enhancement)
const images = document.querySelectorAll(".card img");
images.forEach((img) => {
  img.addEventListener("load", () => {
    img.style.opacity = "1";
  });
});
