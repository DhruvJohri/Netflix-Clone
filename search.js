// Sample data for search functionality
const searchData = {
  movies: [
    { title: "Stranger Things", type: "tvshows", genre: "Sci-Fi", year: "2016", rating: "TV-14", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "The Crown", type: "tvshows", genre: "Drama", year: "2016", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "Money Heist", type: "tvshows", genre: "Crime", year: "2017", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "Bridgerton", type: "tvshows", genre: "Romance", year: "2020", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "The Witcher", type: "tvshows", genre: "Fantasy", year: "2019", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "Ozark", type: "tvshows", genre: "Crime", year: "2017", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "The Queen's Gambit", type: "tvshows", genre: "Drama", year: "2020", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "Dark", type: "tvshows", genre: "Sci-Fi", year: "2017", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "Narcos", type: "tvshows", genre: "Crime", year: "2015", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "The Haunting of Hill House", type: "tvshows", genre: "Horror", year: "2018", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "The Irishman", type: "movies", genre: "Crime", year: "2019", rating: "R", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "Marriage Story", type: "movies", genre: "Drama", year: "2019", rating: "R", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "Roma", type: "movies", genre: "Drama", year: "2018", rating: "R", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "The Ballad of Buster Scruggs", type: "movies", genre: "Western", year: "2018", rating: "R", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { title: "Okja", type: "movies", genre: "Adventure", year: "2017", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" }
  ],
  actors: [
    { name: "Millie Bobby Brown", type: "actor", knownFor: "Stranger Things", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { name: "Anya Taylor-Joy", type: "actor", knownFor: "The Queen's Gambit", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { name: "Henry Cavill", type: "actor", knownFor: "The Witcher", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { name: "Jason Bateman", type: "actor", knownFor: "Ozark", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" },
    { name: "Ursula Corbero", type: "actor", knownFor: "Money Heist", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop" }
  ]
};

let currentFilter = 'all';
let searchResults = [];

// DOM elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResultsContainer = document.getElementById('searchResults');
const filterBtns = document.querySelectorAll('.filter-btn');
const popularTags = document.querySelectorAll('.tag');

// Initialize search functionality
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  showPopularContent();
});

function setupEventListeners() {
  // Search input events
  searchInput.addEventListener('input', handleSearchInput);
  searchInput.addEventListener('keypress', handleKeyPress);
  searchBtn.addEventListener('click', performSearch);
  
  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveFilter(btn.dataset.filter);
      applyCurrentFilter();
    });
  });
  
  // Popular tags
  popularTags.forEach(tag => {
    tag.addEventListener('click', () => {
      searchInput.value = tag.textContent;
      performSearch();
    });
  });
}

function handleSearchInput(e) {
  const query = e.target.value.trim();
  if (query.length >= 2) {
    performSearch();
  } else if (query.length === 0) {
    showPopularContent();
  }
}

function handleKeyPress(e) {
  if (e.key === 'Enter') {
    performSearch();
  }
}

function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  
  if (query.length < 2) {
    showPopularContent();
    return;
  }
  
  // Search through all data
  const results = [];
  
  // Search movies and TV shows
  searchData.movies.forEach(item => {
    if (item.title.toLowerCase().includes(query) || 
        item.genre.toLowerCase().includes(query) ||
        item.year.toString().includes(query)) {
      results.push(item);
    }
  });
  
  // Search actors
  searchData.actors.forEach(item => {
    if (item.name.toLowerCase().includes(query) || 
        item.knownFor.toLowerCase().includes(query)) {
      results.push(item);
    }
  });
  
  searchResults = results;
  displaySearchResults();
}

function setActiveFilter(filter) {
  currentFilter = filter;
  
  // Update active button
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

function applyCurrentFilter() {
  if (searchInput.value.trim().length >= 2) {
    performSearch();
  } else {
    showPopularContent();
  }
}

function showPopularContent() {
  let content = '';
  
  if (currentFilter === 'all' || currentFilter === 'tvshows') {
    content += '<h3>Popular TV Shows</h3>';
    content += '<div class="content-grid">';
    searchData.movies.filter(item => item.type === 'tvshows').slice(0, 6).forEach(item => {
      content += createContentCard(item);
    });
    content += '</div>';
  }
  
  if (currentFilter === 'all' || currentFilter === 'movies') {
    content += '<h3>Popular Movies</h3>';
    content += '<div class="content-grid">';
    searchData.movies.filter(item => item.type === 'movies').slice(0, 6).forEach(item => {
      content += createContentCard(item);
    });
    content += '</div>';
  }
  
  if (currentFilter === 'all' || currentFilter === 'actors') {
    content += '<h3>Popular Actors</h3>';
    content += '<div class="content-grid">';
    searchData.actors.slice(0, 5).forEach(item => {
      content += createActorCard(item);
    });
    content += '</div>';
  }
  
  searchResultsContainer.innerHTML = content;
}

function displaySearchResults() {
  if (searchResults.length === 0) {
    searchResultsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>No results found for "${searchInput.value}"</p>
        <p>Try different keywords or check your spelling</p>
      </div>
    `;
    return;
  }
  
  let content = `<h3>Search Results (${searchResults.length})</h3>`;
  content += '<div class="content-grid">';
  
  searchResults.forEach(item => {
    if (item.type === 'actor') {
      content += createActorCard(item);
    } else {
      content += createContentCard(item);
    }
  });
  
  content += '</div>';
  searchResultsContainer.innerHTML = content;
}

function createContentCard(item) {
  return `
    <div class="content-card" onclick="playContent('${item.title}')">
      <img src="${item.image}" alt="${item.title}">
      <div class="card-info">
        <h4>${item.title}</h4>
        <p class="card-meta">${item.year} • ${item.rating} • ${item.genre}</p>
        <div class="card-actions">
          <button class="play-btn"><i class="fas fa-play"></i> Play</button>
          <button class="info-btn"><i class="fas fa-info-circle"></i> Info</button>
        </div>
      </div>
    </div>
  `;
}

function createActorCard(item) {
  return `
    <div class="actor-card" onclick="showActorInfo('${item.name}')">
      <img src="${item.image}" alt="${item.name}">
      <div class="actor-info">
        <h4>${item.name}</h4>
        <p>Known for: ${item.knownFor}</p>
      </div>
    </div>
  `;
}

function playContent(title) {
  alert(`🎬 Playing: ${title}`);
  // Here you would implement actual video playback
}

function showActorInfo(name) {
  alert(`👤 Actor: ${name}`);
  // Here you would show detailed actor information
}

// Add CSS for content cards
const style = document.createElement('style');
style.textContent = `
  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .content-card, .actor-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    backdrop-filter: blur(10px);
  }
  
  .content-card:hover, .actor-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(229, 9, 20, 0.3);
  }
  
  .content-card img, .actor-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  .card-info, .actor-info {
    padding: 15px;
  }
  
  .card-info h4, .actor-info h4 {
    margin: 0 0 8px 0;
    font-size: 16px;
  }
  
  .card-meta {
    color: #ccc;
    font-size: 14px;
    margin: 0 0 15px 0;
  }
  
  .card-actions {
    display: flex;
    gap: 10px;
  }
  
  .play-btn, .info-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s ease;
  }
  
  .play-btn:hover {
    background: #e50914;
    border-color: #e50914;
  }
  
  .info-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  .actor-info p {
    color: #ccc;
    font-size: 14px;
    margin: 0;
  }
  
  h3 {
    color: #e50914;
    margin: 30px 0 20px 0;
    font-size: 24px;
  }
`;
document.head.appendChild(style);
