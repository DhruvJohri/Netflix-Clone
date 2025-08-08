document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("netflixCurrentUser") || "null");

  if (!currentUser || !currentUser.email) {
    // Optional: Show a temporary banner instead of alert
    const warning = document.createElement("div");
    warning.textContent = "⚠ Please sign in to access the Home page.";
    warning.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #ff4444;
      color: white;
      padding: 12px;
      text-align: center;
      font-family: Arial, sans-serif;
      z-index: 9999;
    `;
    document.body.appendChild(warning);

    // Redirect after short delay
    setTimeout(() => {
      window.location.href = "index.html"; // Or "login.html"
    }, 1500);
  }
});
