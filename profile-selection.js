// Profile Selection - Professional JavaScript
class ProfileSelection {
  constructor() {
    this.selectedProfile = null;
    this.isSelecting = false;
    this.init();
  }

  init() {
    this.setupProfileCards();
    this.setupManageButton();
  }

  setupProfileCards() {
    const profileCards = document.querySelectorAll(".profile-card");

    profileCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isSelecting) return;
        const profileName = card.dataset.profile;
        this.selectProfile(card, profileName);
      });
    });
  }

  setupManageButton() {
    const manageBtn = document.querySelector(".manage-profiles-btn");
    if (manageBtn) {
      manageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.openManageProfiles();
      });
    }
  }

  selectProfile(card, profileName) {
    this.isSelecting = true;
    this.selectedProfile = profileName;
    card.classList.add("selecting");
    setTimeout(() => this.completeSelection(card, profileName), 1500);
  }

  completeSelection(card, profileName) {
    card.classList.remove("selecting");
    card.classList.add("selected");
    setTimeout(() => this.redirectToDashboard(profileName), 600);
  }

  redirectToDashboard(profileName) {
    localStorage.setItem("selectedProfile", profileName);
    window.location.href = "dashboard.html";
  }

  openManageProfiles() {
    alert("Manage profiles functionality coming soon!");
  }

  static getSelectedProfile() {
    return localStorage.getItem("selectedProfile") || "primary";
  }

  static clearSelectedProfile() {
    localStorage.removeItem("selectedProfile");
  }

  static logout() {
    localStorage.removeItem("netflixCurrentUser");
    localStorage.removeItem("selectedProfile");
    window.location.href = "signin.html";
  }

  static isAuthenticated() {
    return !!localStorage.getItem("netflixCurrentUser");
  }

  static getCurrentUser() {
    try {
      const currentUser = localStorage.getItem("netflixCurrentUser");
      return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }
}

// Init on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  if (!ProfileSelection.isAuthenticated() &&
      !window.location.pathname.includes("signin.html")) {
    window.location.href = "signin.html";
    return;
  }
  if (document.querySelector(".profile-card")) {
    window.profileSelection = new ProfileSelection();
  }
});
