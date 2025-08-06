document.addEventListener('DOMContentLoaded', function() {
  // Mood Filter Functionality
  const moodOptions = document.querySelectorAll('.mood-option');
  const cards = document.querySelectorAll('.card');
  
  moodOptions.forEach(option => {
    option.addEventListener('click', function() {
      const selectedMood = this.getAttribute('data-mood');
      
      // Update active state
      moodOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      // Filter cards
      cards.forEach(card => {
        const cardMoods = card.getAttribute('data-mood').split(',');
        
        if (selectedMood === 'all' || cardMoods.includes(selectedMood)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Search Functionality
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') performSearch();
  });
  
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    alert(`Searching for: ${searchTerm}`);
    // In a real app, you would filter content here
  }
  
  // Card Hover Effects
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });
  
  // Simulate loading content
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500);
});