const faqs = document.querySelectorAll(".faqbox")
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("open")
  })
})

const backToTopBtn = document.getElementById("backToTopBtn")
const circularProgress = document.querySelector(".circular-progress .circle-progress")
const circumference = 2 * Math.PI * 15.9155 // Circumference of the circle (radius 15.9155)

// Set initial dasharray for the circle progress
circularProgress.style.strokeDasharray = `${circumference} ${circumference}`
circularProgress.style.strokeDashoffset = circumference // Start fully hidden

window.addEventListener("scroll", () => {
  // Calculate scroll percentage for the circular progress
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight

  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100

  // Update the circular progress
  const offset = circumference - (scrollPercentage / 100) * circumference
  circularProgress.style.strokeDashoffset = offset

  // Show/hide back to top button
  if (scrollTop > 300) {
    backToTopBtn.style.display = "flex"
  } else {
    backToTopBtn.style.display = "none"
  }

  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function handleFormSubmit() {
  const emailInputs = document.querySelectorAll('input[type="email"]')
  let email = ""

  emailInputs.forEach((input) => {
    if (input.value) email = input.value
  })

  if (!email) {
    alert("Hey there! 👋 Please enter your email address to get started!")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Oops! 😅 Please enter a valid email address (like: you@example.com)")
    return
  }

  alert(`Awesome! 🎉 Welcome aboard! We'll send updates to ${email}`)

  emailInputs.forEach((input) => (input.value = ""))
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated")
    }
  })
}, observerOptions)

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el)
})

document.addEventListener("DOMContentLoaded", () => {
  const emailInputs = document.querySelectorAll('input[type="email"]')

  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      const email = this.value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (email && !emailRegex.test(email)) {
        this.classList.add("error")
        setTimeout(() => {
          this.classList.remove("error")
        }, 3000)
      }
    })

    input.addEventListener("input", function () {
      this.classList.remove("error")
    })
  })
})

console.log("🍿 Welcome to Netflix Clone! Made with ❤️ ")


// Loading Animation with Netflix Intro
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;

    if (loadingScreen) {
        // Prevent scrolling during loading
        body.style.overflow = 'hidden';

        // Listen for message from iframe when animation completes
        window.addEventListener('message', function(event) {
            if (event.data === 'netflix-animation-complete') {
                // Fade out loading screen
                loadingScreen.classList.add('fade-out');
                body.style.overflow = 'auto';

                // Remove loading screen after fade
                setTimeout(() => {
                    if (loadingScreen && loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                }, 800);
            }
        });

        // Fallback timeout in case message doesn't come through
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.classList.add('fade-out');
                body.style.overflow = 'auto';
                setTimeout(() => {
                    if (loadingScreen && loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                }, 800);
            }
        }, 5500); // 5.5 seconds fallback
    }
});





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
    function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  // Optional: Set default language to English on page load
  document.addEventListener('DOMContentLoaded', () => setLanguage('en'));

  // Toggle button listener
  document.querySelector("#lang-toggle").addEventListener("click", function () {
    const currentLang = this.getAttribute("data-lang");
    const newLang = currentLang === "en" ? "hi" : "en";
    setLanguage(newLang);
    this.setAttribute("data-lang", newLang);
    this.innerHTML = newLang === "en" ? `<i class="fas fa-globe"></i> English` : `<i class="fas fa-globe"></i> हिन्दी`;
  });

  // Language data
  const translations = {
    en: {
        "faq_heading": "Frequently Asked Questions",
        "faq_q1": "What is Netflix?",
        "faq_a1": "Netflix is a streaming service that offers award-winning TV shows, movies, anime, documentaries, and more.",
        "faq_q2": "How much does Netflix cost?",
        "faq_a2": "Netflix plans range from ₹149 to ₹649 per month. You can watch on your phone, tablet, TV, laptop, and more.",
        "faq_q3": "What can I watch on Netflix?",
        "faq_a3": "You can watch movies, TV shows, anime, Netflix originals, and much more on Netflix.",
        "faq_q4": "Where can I watch?",
        "faq_a4": "You can watch Netflix on any internet-connected device — mobile, laptop, TV, or computer.",
       "faq_q5": "Is Netflix good for kids?",
       "faq_a5": "The Netflix Kids experience provides parental controls while offering family-friendly content for children.",
       "faq_cta": "Ready to watch? Enter your email to create or restart your membership."
       },
    hi: {
      faq_heading: "अक्सर पूछे जाने वाले प्रश्न",
      faq_q1: "नेटफ्लिक्स क्या है?",
      faq_a1: "नेटफ्लिक्स एक स्ट्रीमिंग सेवा है जो पुरस्कार विजेता टीवी शो, फिल्में, एनीमे, वृत्तचित्र और बहुत कुछ प्रदान करती है।",
      faq_heading: "अक्सर पूछे जाने वाले सवाल",
      faq_q1: "Netflix क्या है?",
      faq_a1: "Netflix एक स्ट्रीमिंग सेवा है जो टीवी शो, फिल्में, एनीमे, डोक्यूमेंट्री और बहुत कुछ प्रदान करती है।",
      faq_q2: "Netflix की कीमत कितनी है?",
      faq_a2: "Netflix की योजनाएं ₹149 से ₹649 प्रति माह तक हैं। आप अपने फ़ोन, टैबलेट, टीवी, लैपटॉप आदि पर देख सकते हैं।",
      faq_q3: "मैं Netflix पर क्या देख सकता हूँ?",
      faq_a3: "Netflix पर आपको फिल्में, टीवी शो, एनीमे, नेटफ्लिक्स ओरिजिनल्स और बहुत कुछ देखने को मिलेगा।",
      faq_q4: "मैं कहां देख सकता हूँ?",
      faq_a4: "आप किसी भी इंटरनेट से जुड़े डिवाइस पर Netflix देख सकते हैं — मोबाइल, लैपटॉप, टीवी, या कंप्यूटर पर।",
      faq_q5: "क्या Netflix बच्चों के लिए अच्छा है?",
      faq_a5: "Netflix Kids अनुभव माता-पिता को नियंत्रण देते हुए बच्चों को परिवार के अनुकूल सामग्री प्रदान करता है।",
      faq_cta: "देखना शुरू करें? अपनी ईमेल दर्ज करें और सदस्यता शुरू करें।"
    }
  };

  let currentLang = 'en';

  function switchLanguage() {
    // Toggle between 'en' and 'hi'
    currentLang = currentLang === 'en' ? 'hi' : 'en';

    // Get correct language content
    const langData = translations[currentLang];

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (langData[key]) {
        el.textContent = langData[key];
      }
    });

    // Update button text
    const btn = document.getElementById('lang-btn');
    btn.textContent = currentLang === 'en' ? '🌐 हिंदी' : '🌐 English';
  }