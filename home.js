
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("netflixCurrentUser");

  if (!currentUser) {
    alert("Please sign in to access the Home page.");
    window.location.href = "index.html"; 
  }
});