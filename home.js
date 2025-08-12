
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("netflixCurrentUser");

  if (!currentUser) {
    alert("Please sign in to access the Home page.");
    window.location.href = "index.html"; 
  }
});

const translations = {
  en: {
    nav_home: "Home",
    nav_search: "Search",
    nav_trending: "Trending",
    nav_new: "New Releases",
    nav_popular: "Popular",
    nav_top: "Top Rated",
    nav_genres: "Genres",
    nav_list: "My List",
    nav_again: "Watch Again",
    nav_settings: "Settings",
    nav_logout: "Log Out",
    search_placeholder: "Search Movies Here",
    section_trending: "Trendings",
    section_recommended: "Recommended for you",
    section_new: "New-Releases"
  },
  hi: {
    nav_home: "होम",
    nav_search: "खोजें",
    nav_trending: "ट्रेंडिंग",
    nav_new: "नई रिलीज़",
    nav_popular: "लोकप्रिय",
    nav_top: "टॉप रेटेड",
    nav_genres: "श्रेणियाँ",
    nav_list: "मेरी सूची",
    nav_again: "फिर से देखें",
    nav_settings: "सेटिंग्स",
    nav_logout: "लॉग आउट",
    search_placeholder: "फिल्में खोजें",
    section_trending: "ट्रेंडिंग",
    section_recommended: "आपके लिए सिफारिशें",
    section_new: "नई रिलीज़"
  }
};

function changeLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Placeholder change
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}
