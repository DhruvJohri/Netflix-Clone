// Profile Selection - Professional JavaScript

class ProfileSelection {
  constructor() {
    this.selectedProfile = null
    this.isSelecting = false
    this.init()
  }

  init() {
    this.setupProfileCards()
    this.setupManageButton()
  }

  setupProfileCards() {
    const profileCards = document.querySelectorAll(".profile-card")

    profileCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault()

        if (this.isSelecting) return // Prevent multiple clicks

        const profileName = card.dataset.profile
        this.selectProfile(card, profileName)
      })

      // Add hover sound effect (optional)
      card.addEventListener("mouseenter", () => {
        if (!this.isSelecting) {
          this.playHoverSound()
        }
      })
    })
  }

  setupManageButton() {
    const manageBtn = document.querySelector(".manage-profiles-btn")

    manageBtn.addEventListener("click", (e) => {
      e.preventDefault()
      this.openManageProfiles()
    })
  }

  selectProfile(card, profileName) {
    this.isSelecting = true
    this.selectedProfile = profileName

    // Add selecting class for visual feedback
    card.classList.add("selecting")

    // Play selection sound
    this.playSelectSound()

    // Simulate loading time (1.5 seconds)
    setTimeout(() => {
      this.completeSelection(card, profileName)
    }, 1500)
  }

  completeSelection(card, profileName) {
    // Add selected class for final animation
    card.classList.remove("selecting")
    card.classList.add("selected")

    // Play success sound
    this.playSuccessSound()

    // Redirect to main dashboard after animation
    setTimeout(() => {
      this.redirectToDashboard(profileName)
    }, 600)
  }

  redirectToDashboard(profileName) {
    // Store selected profile in localStorage
    localStorage.setItem("selectedProfile", profileName)

    // Redirect to dashboard.html instead of index.html
    window.location.href = "dashboard.html"

    // Alternative: You can also trigger a custom event
    // window.dispatchEvent(new CustomEvent('profileSelected', {
    //     detail: { profile: profileName }
    // }));
  }

  openManageProfiles() {
    // Implement manage profiles functionality
    console.log("Opening manage profiles...")

    // You can redirect to a manage profiles page
    // window.location.href = 'manage-profiles.html';

    // Or show a modal
    this.showManageModal()
  }

  showManageModal() {
    // Create and show manage profiles modal
    const modal = document.createElement("div")
    modal.className = "manage-modal"
    modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <h2>Manage Profiles</h2>
                    <p>Profile management functionality will be implemented here.</p>
                    <button class="close-modal-btn">Close</button>
                </div>
            </div>
        `

    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `

    const modalContent = modal.querySelector(".modal-content")
    modalContent.style.cssText = `
            background: var(--netflix-dark-gray);
            padding: 40px;
            border-radius: var(--border-radius);
            text-align: center;
            color: var(--netflix-white);
            font-family: "Poppins", sans-serif;
        `

    const closeBtn = modal.querySelector(".close-modal-btn")
    closeBtn.style.cssText = `
            background: var(--netflix-red);
            color: var(--netflix-white);
            border: none;
            padding: 10px 20px;
            border-radius: var(--border-radius);
            cursor: pointer;
            margin-top: 20px;
            font-family: "Poppins", sans-serif;
        `

    closeBtn.addEventListener("click", () => {
      document.body.removeChild(modal)
    })

    modal.addEventListener("click", (e) => {
      if (e.target === modal.querySelector(".modal-overlay")) {
        document.body.removeChild(modal)
      }
    })

    document.body.appendChild(modal)
  }

  // Sound effects (optional - you can add actual audio files)
  playHoverSound() {
    // Implement hover sound
    // const audio = new Audio('sounds/hover.mp3');
    // audio.volume = 0.3;
    // audio.play().catch(() => {}); // Ignore errors
  }

  playSelectSound() {
    // Implement select sound
    // const audio = new Audio('sounds/select.mp3');
    // audio.volume = 0.5;
    // audio.play().catch(() => {});
  }

  playSuccessSound() {
    // Implement success sound
    // const audio = new Audio('sounds/success.mp3');
    // audio.volume = 0.4;
    // audio.play().catch(() => {});
  }

  // Utility method to get selected profile
  static getSelectedProfile() {
    return localStorage.getItem("selectedProfile") || "primary"
  }

  // Utility method to clear selected profile
  static clearSelectedProfile() {
    localStorage.removeItem("selectedProfile")
  }

  // Add method to handle logout
  static logout() {
    try {
      // Clear user session
      localStorage.removeItem('netflixCurrentUser');
      localStorage.removeItem('selectedProfile');
      
      // Redirect to sign-in page
      window.location.href = 'signin.html';
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  // Check if user is authenticated
  static isAuthenticated() {
    const currentUser = localStorage.getItem('netflixCurrentUser');
    return !!currentUser;
  }

  // Get current user info
  static getCurrentUser() {
    try {
      const currentUser = localStorage.getItem('netflixCurrentUser');
      return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
}

// Initialize profile selection when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is authenticated
  if (!ProfileSelection.isAuthenticated()) {
    // Redirect to sign-in if not authenticated
    window.location.href = 'signin.html';
    return;
  }

  // Initialize profile selection if authenticated
  window.profileSelection = new ProfileSelection()
})

// Handle page visibility for better UX
document.addEventListener("visibilitychange", () => {
  if (document.hidden && window.profileSelection) {
    // Reset selection state if page becomes hidden
    window.profileSelection.isSelecting = false

    // Remove selecting classes
    document.querySelectorAll(".profile-card.selecting").forEach((card) => {
      card.classList.remove("selecting")
    })
  }
})
