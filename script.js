const faqs = document.querySelectorAll(".faqbox");
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("open");
  });
});

// Mood Filter Functionality
  const moodBubbles = document.querySelectorAll('.mood-bubble');
  const allCards = document.querySelectorAll('.card');
  
  moodBubbles.forEach(bubble => {
    bubble.addEventListener('click', function() {
      // Remove active class from all bubbles
      moodBubbles.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked bubble with animation
      this.classList.add('active');
      this.style.animation = 'pulse 0.5s ease';
      
      // Remove animation after it completes
      setTimeout(() => {
        this.style.animation = '';
      }, 500);
      
      // Filter cards
      const selectedMood = this.getAttribute('data-mood');
      filterCardsByMood(selectedMood);
    });
  });



const backToTopBtn = document.getElementById("backToTopBtn");
const circularProgress = document.querySelector(".circular-progress .circle-progress");
const circumference = 2 * Math.PI * 15.9155; // Circumference of the circle (radius 15.9155)

// Set initial dasharray for the circle progress
circularProgress.style.strokeDasharray = `${circumference} ${circumference}`;
circularProgress.style.strokeDashoffset = circumference; // Start fully hidden

window.addEventListener("scroll", () => {
  // Calculate scroll percentage for the circular progress
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;

  // Update the circular progress
  const offset = circumference - (scrollPercentage / 100) * circumference;
  circularProgress.style.strokeDashoffset = offset;

  // Show/hide back to top button
  if (scrollTop > 300) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }

  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ✅ Updated handleFormSubmit: navigates to home.html
function handleFormSubmit() {
  const emailInput = document.querySelector('input[type="email"]');
  const email = emailInput.value.trim();

  if (!email) {
    alert("Please enter your email to continue.");
    return;
  }

  // Save user in localStorage for home.html
  localStorage.setItem("netflixCurrentUser", email);

  // ✅ Redirect to home.html
  window.location.href = "home.html";
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

document.addEventListener("DOMContentLoaded", () => {
  const emailInputs = document.querySelectorAll('input[type="email"]');

  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      const email = this.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email && !emailRegex.test(email)) {
        this.classList.add("error");
        setTimeout(() => {
          this.classList.remove("error");
        }, 3000);
      }
    });

    input.addEventListener("input", function () {
      this.classList.remove("error");
    });
  });
});

console.log("🍿 Welcome to Netflix Clone! Made with ❤️ ");

// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    // Prevent scrolling during loading
    body.style.overflow = 'hidden';
    
    // Simulate loading time (2.5 seconds)
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        body.style.overflow = 'auto'; // Re-enable scrolling
        
        // Remove loading screen from DOM after fade out
        setTimeout(() => {
            loadingScreen.remove();
        }, 800);
    }, 2000);
});

// Restrict home.html access if not signed in
document.addEventListener("DOMContentLoaded", function () {
    const currentUser = localStorage.getItem("netflixCurrentUser");

    const homeLink = document.querySelector('a[href="home.html"]');
    if (!currentUser && homeLink) {
      homeLink.addEventListener("click", function (e) {
        e.preventDefault(); 
        alert("Please sign in to access Home.");
        window.location.href = "index.html"; 
      });
    }
});
