// Trending data with rankings and popularity metrics
const trendingData = {
  top10: [
    { 
      title: "Stranger Things", 
      type: "tvshows", 
      genre: "Sci-Fi", 
      year: "2016", 
      rating: "TV-14", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 1,
      views: "2.5M",
      trending: "+15%",
      country: "Global"
    },
    { 
      title: "The Crown", 
      type: "tvshows", 
      genre: "Drama", 
      year: "2016", 
      rating: "TV-MA", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 2,
      views: "2.1M",
      trending: "+12%",
      country: "Global"
    },
    { 
      title: "Money Heist", 
      type: "tvshows", 
      genre: "Crime", 
      year: "2017", 
      rating: "TV-MA", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 3,
      views: "1.9M",
      trending: "+8%",
      country: "Global"
    },
    { 
      title: "The Irishman", 
      type: "movies", 
      genre: "Crime", 
      year: "2019", 
      rating: "R", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 4,
      views: "1.7M",
      trending: "+20%",
      country: "Global"
    },
    { 
      title: "Bridgerton", 
      type: "tvshows", 
      genre: "Romance", 
      year: "2020", 
      rating: "TV-MA", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 5,
      views: "1.6M",
      trending: "+25%",
      country: "Global"
    },
    { 
      title: "The Witcher", 
      type: "tvshows", 
      genre: "Fantasy", 
      year: "2019", 
      rating: "TV-MA", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 6,
      views: "1.5M",
      trending: "+10%",
      country: "Global"
    },
    { 
      title: "Ozark", 
      type: "tvshows", 
      genre: "Crime", 
      year: "2017", 
      rating: "TV-MA", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 7,
      views: "1.4M",
      trending: "+5%",
      country: "Global"
    },
    { 
      title: "Marriage Story", 
      type: "movies", 
      genre: "Drama", 
      year: "2019", 
      rating: "R", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 8,
      views: "1.3M",
      trending: "+18%",
      country: "Global"
    },
    { 
      title: "The Queen's Gambit", 
      type: "tvshows", 
      genre: "Drama", 
      year: "2020", 
      rating: "TV-MA", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 9,
      views: "1.2M",
      trending: "+22%",
      country: "Global"
    },
    { 
      title: "Dark", 
      type: "tvshows", 
      genre: "Sci-Fi", 
      year: "2017", 
      rating: "TV-MA", 
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      ranking: 10,
      views: "1.1M",
      trending: "+7%",
      country: "Global"
    }
  ],
  popular: [
    { title: "Narcos", type: "tvshows", genre: "Crime", year: "2015", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", views: "980K", trending: "+30%" },
    { title: "The Haunting of Hill House", type: "tvshows", genre: "Horror", year: "2018", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", views: "920K", trending: "+18%" },
    { title: "Roma", type: "movies", genre: "Drama", year: "2018", rating: "R", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", views: "890K", trending: "+25%" },
    { title: "The Ballad of Buster Scruggs", type: "movies", genre: "Western", year: "2018", rating: "R", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", views: "850K", trending: "+12%" },
    { title: "Okja", type: "movies", genre: "Adventure", year: "2017", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", views: "820K", trending: "+15%" },
    { title: "Mindhunter", type: "tvshows", genre: "Crime", year: "2017", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", views: "780K", trending: "+8%" }
  ],
  global: [
    { title: "Squid Game", type: "tvshows", genre: "Thriller", year: "2021", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", country: "South Korea", views: "3.2M" },
    { title: "Lupin", type: "tvshows", genre: "Crime", year: "2021", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", country: "France", views: "2.8M" },
    { title: "Call My Agent!", type: "tvshows", genre: "Comedy", year: "2015", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", country: "France", views: "2.1M" },
    { title: "Dark", type: "tvshows", genre: "Sci-Fi", year: "2017", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", country: "Germany", views: "1.9M" },
    { title: "Money Heist", type: "tvshows", genre: "Crime", year: "2017", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", country: "Spain", views: "1.8M" },
    { title: "The Platform", type: "movies", genre: "Horror", year: "2019", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", country: "Spain", views: "1.6M" }
  ],
  india: [
    { title: "Sacred Games", type: "tvshows", genre: "Crime", year: "2018", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", language: "Hindi", views: "2.1M" },
    { title: "Delhi Crime", type: "tvshows", genre: "Crime", year: "2019", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", language: "Hindi", views: "1.8M" },
    { title: "Lust Stories", type: "movies", genre: "Romance", year: "2018", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", language: "Hindi", views: "1.6M" },
    { title: "Ghoul", type: "tvshows", genre: "Horror", year: "2018", rating: "TV-MA", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", language: "Hindi", views: "1.4M" },
    { title: "Selection Day", type: "tvshows", genre: "Drama", year: "2018", rating: "TV-14", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", language: "Hindi", views: "1.2M" },
    { title: "Little Things", type: "tvshows", genre: "Romance", year: "2016", rating: "TV-14", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop", language: "Hindi", views: "1.1M" }
  ]
};

let currentFilter = 'all';

// DOM elements
const filterBtns = document.querySelectorAll('.filter-btn');
const top10Container = document.getElementById('top10Container');
const popularContainer = document.getElementById('popularContainer');
const globalContainer = document.getElementById('globalContainer');
const indiaContainer = document.getElementById('indiaContainer');

// Initialize trending page
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  populateAllSections();
});

function setupEventListeners() {
  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveFilter(btn.dataset.filter);
      applyCurrentFilter();
    });
  });
}

function setActiveFilter(filter) {
  currentFilter = filter;
  
  // Update active button
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
}

function applyCurrentFilter() {
  populateAllSections();
}

function populateAllSections() {
  if (currentFilter === 'all' || currentFilter === 'tvshows' || currentFilter === 'movies') {
    populateTop10();
    populatePopular();
  }
  
  if (currentFilter === 'all' || currentFilter === 'global') {
    populateGlobal();
  }
  
  if (currentFilter === 'all' || currentFilter === 'india') {
    populateIndia();
  }
}

function populateTop10() {
  let content = '';
  
  trendingData.top10.forEach(item => {
    if (currentFilter === 'all' || 
        (currentFilter === 'tvshows' && item.type === 'tvshows') ||
        (currentFilter === 'movies' && item.type === 'movies')) {
      content += createTop10Card(item);
    }
  });
  
  top10Container.innerHTML = content;
}

function populatePopular() {
  let content = '';
  
  trendingData.popular.forEach(item => {
    if (currentFilter === 'all' || 
        (currentFilter === 'tvshows' && item.type === 'tvshows') ||
        (currentFilter === 'movies' && item.type === 'movies')) {
      content += createTrendingCard(item);
    }
  });
  
  popularContainer.innerHTML = content;
}

function populateGlobal() {
  let content = '';
  
  trendingData.global.forEach(item => {
    content += createTrendingCard(item);
  });
  
  globalContainer.innerHTML = content;
}

function populateIndia() {
  let content = '';
  
  trendingData.india.forEach(item => {
    content += createTrendingCard(item);
  });
  
  indiaContainer.innerHTML = content;
}

function createTop10Card(item) {
  return `
    <div class="top-10-item" onclick="playContent('${item.title}')">
      <div class="ranking-badge">${item.ranking}</div>
      <img src="${item.image}" alt="${item.title}">
      <div class="top-10-info">
        <h3>${item.title}</h3>
        <div class="top-10-meta">
          <span>${item.year} • ${item.rating}</span>
          <span>${item.country}</span>
        </div>
        <div class="trending-stats">
          <div class="stat-item">
            <i class="fas fa-eye"></i>
            <span>${item.views}</span>
          </div>
          <div class="stat-item">
            <i class="fas fa-trending-up"></i>
            <span>${item.trending}</span>
          </div>
        </div>
        <div class="top-10-actions">
          <button class="action-btn play"><i class="fas fa-play"></i> Play</button>
          <button class="action-btn" onclick="showInfo('${item.title}')"><i class="fas fa-info-circle"></i> Info</button>
          <button class="action-btn" onclick="addToList('${item.title}')"><i class="fas fa-plus"></i> List</button>
        </div>
      </div>
    </div>
  `;
}

function createTrendingCard(item) {
  const metaInfo = item.country ? item.country : (item.language ? item.language : `${item.year} • ${item.rating}`);
  
  return `
    <div class="trending-item" onclick="playContent('${item.title}')">
      <img src="${item.image}" alt="${item.title}">
      <div class="trending-item-info">
        <h4>${item.title}</h4>
        <p class="trending-item-meta">${metaInfo} • ${item.genre}</p>
        <div class="trending-item-actions">
          <button onclick="playContent('${item.title}')"><i class="fas fa-play"></i> Play</button>
          <button onclick="showInfo('${item.title}')"><i class="fas fa-info-circle"></i> Info</button>
        </div>
      </div>
    </div>
  `;
}

// Global functions for content interaction
function playContent(title) {
  alert(`🎬 Playing: ${title}`);
  // Here you would implement actual video playback
}

function showInfo(title) {
  alert(`ℹ️ Information for: ${title}`);
  // Here you would show detailed content information
}

function addToList(title) {
  alert(`➕ Added to My List: ${title}`);
  // Here you would add content to user's list
}

// Add CSS for additional styling
const style = document.createElement('style');
style.textContent = `
  .top-10-item .ranking-badge {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
  
  .trending-item:hover .trending-item-actions {
    opacity: 1;
  }
  
  .trending-item-actions {
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }
  
  .stat-item i {
    animation: bounce 1s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
    60% { transform: translateY(-3px); }
  }
`;
document.head.appendChild(style);
