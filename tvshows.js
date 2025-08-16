// tvshows.js - TV Shows page functionality

// TV Shows data
const tvShows = {
  popular: [
    {
      title: "Stranger Things",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-14",
      year: "2016",
      genre: "Sci-Fi, Horror, Drama",
      seasons: "4 Seasons"
    },
    {
      title: "The Crown",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2016",
      genre: "Drama, History",
      seasons: "6 Seasons"
    },
    {
      title: "Bridgerton",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2020",
      genre: "Drama, Romance",
      seasons: "3 Seasons"
    },
    {
      title: "Wednesday",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-14",
      year: "2022",
      genre: "Comedy, Fantasy",
      seasons: "1 Season"
    },
    {
      title: "The Witcher",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2019",
      genre: "Action, Adventure",
      seasons: "3 Seasons"
    },
    {
      title: "Money Heist",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2017",
      genre: "Action, Crime",
      seasons: "5 Seasons"
    }
  ],
  
  originals: [
    {
      title: "House of Cards",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2013",
      genre: "Drama, Political",
      seasons: "6 Seasons"
    },
    {
      title: "Orange is the New Black",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2013",
      genre: "Comedy, Drama",
      seasons: "7 Seasons"
    },
    {
      title: "Narcos",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2015",
      genre: "Crime, Drama",
      seasons: "3 Seasons"
    },
    {
      title: "Dark",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2017",
      genre: "Crime, Drama",
      seasons: "3 Seasons"
    },
    {
      title: "The Queen's Gambit",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2020",
      genre: "Drama, Sport",
      seasons: "1 Season"
    },
    {
      title: "Squid Game",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2021",
      genre: "Action, Thriller",
      seasons: "1 Season"
    }
  ],
  
  trending: [
    {
      title: "Wednesday",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-14",
      year: "2022",
      genre: "Comedy, Fantasy",
      seasons: "1 Season"
    },
    {
      title: "Stranger Things",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-14",
      year: "2016",
      genre: "Sci-Fi, Horror",
      seasons: "4 Seasons"
    },
    {
      title: "The Witcher",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2019",
      genre: "Action, Fantasy",
      seasons: "3 Seasons"
    },
    {
      title: "Bridgerton",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2020",
      genre: "Drama, Romance",
      seasons: "3 Seasons"
    },
    {
      title: "Money Heist",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2017",
      genre: "Action, Crime",
      seasons: "5 Seasons"
    },
    {
      title: "Squid Game",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2021",
      genre: "Action, Thriller",
      seasons: "1 Season"
    }
  ],
  
  newReleases: [
    {
      title: "Wednesday Season 2",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-14",
      year: "2024",
      genre: "Comedy, Fantasy",
      seasons: "New Season"
    },
    {
      title: "The Crown Final Season",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2024",
      genre: "Drama, History",
      seasons: "Final Season"
    },
    {
      title: "Bridgerton Season 4",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2024",
      genre: "Drama, Romance",
      seasons: "New Season"
    },
    {
      title: "The Witcher Season 4",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2024",
      genre: "Action, Fantasy",
      seasons: "New Season"
    },
    {
      title: "Stranger Things Season 5",
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&h=600&fit=crop",
      rating: "TV-14",
      year: "2024",
      genre: "Sci-Fi, Horror",
      seasons: "Final Season"
    },
    {
      title: "Squid Game Season 2",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      rating: "TV-MA",
      year: "2024",
      genre: "Action, Thriller",
      seasons: "New Season"
    }
  ]
};

// Function to create TV show cards
function createTVShowCard(show) {
  const card = document.createElement('div');
  card.className = 'tvshow-card';
  
  card.innerHTML = `
    <img src="${show.image}" alt="${show.title}" />
    <div class="tvshow-info">
      <h3 class="tvshow-title">${show.title}</h3>
      <div class="tvshow-meta">
        <span class="tvshow-rating">${show.rating}</span>
        <span class="tvshow-year">${show.year}</span>
      </div>
      <p class="tvshow-genre">${show.genre}</p>
      <div class="tvshow-actions">
        <button class="btn btn-play" onclick="playTVShow('${show.title}')">
          <i class="fas fa-play"></i>
          Play
        </button>
        <button class="btn btn-info" onclick="showTVShowInfo('${show.title}')">
          <i class="fas fa-info-circle"></i>
          Info
        </button>
        <button class="btn btn-add" onclick="addToMyList('${show.title}')">
          <i class="fas fa-plus"></i>
          Add
        </button>
      </div>
    </div>
  `;
  
  return card;
}

// Function to populate TV show sections
function populateTVShowSection(containerId, shows) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  shows.forEach(show => {
    const card = createTVShowCard(show);
    container.appendChild(card);
  });
}

// Function to handle play button click
function playTVShow(title) {
  // Check if user is signed in
  const currentUser = localStorage.getItem("netflixCurrentUser");
  if (!currentUser) {
    alert("Please sign in to watch TV shows");
    window.location.href = "signin.html";
    return;
  }
  
  alert(`🎬 Now playing: ${title}`);
  // Here you would typically redirect to a video player or show a video
}

// Function to handle info button click
function showTVShowInfo(title) {
  const show = [...tvShows.popular, ...tvShows.originals, ...tvShows.trending, ...tvShows.newReleases]
    .find(s => s.title === title);
  
  if (show) {
    const info = `
🎭 ${show.title}
📺 ${show.seasons}
⭐ ${show.rating}
📅 ${show.year}
🎬 ${show.genre}

This is a sample TV show description. In a real Netflix clone, this would contain detailed information about the plot, cast, and reviews.
    `;
    alert(info);
  }
}

// Function to handle add to my list
function addToMyList(title) {
  const currentUser = localStorage.getItem("netflixCurrentUser");
  if (!currentUser) {
    alert("Please sign in to add shows to your list");
    window.location.href = "signin.html";
    return;
  }
  
  // Get existing my list or create new one
  let myList = JSON.parse(localStorage.getItem("netflixMyList") || "[]");
  
  if (myList.includes(title)) {
    alert(`${title} is already in your list!`);
  } else {
    myList.push(title);
    localStorage.setItem("netflixMyList", JSON.stringify(myList));
    alert(`✅ ${title} added to your list!`);
  }
}

// Function to check authentication
function checkAuth() {
  const currentUser = localStorage.getItem("netflixCurrentUser");
  if (!currentUser) {
    // Optional: Redirect to signin page
    // window.location.href = "signin.html";
  }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check authentication
  checkAuth();
  
  // Populate all TV show sections
  populateTVShowSection('popularContainer', tvShows.popular);
  populateTVShowSection('originalsContainer', tvShows.originals);
  populateTVShowSection('trendingContainer', tvShows.trending);
  populateTVShowSection('newReleasesContainer', tvShows.newReleases);
  
  // Add smooth scrolling for navigation
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add header scroll effect
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      header.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 70%, transparent 100%)';
    }
  });
  
  console.log("🍿 TV Shows page loaded successfully!");
});

// Export functions for global access
window.playTVShow = playTVShow;
window.showTVShowInfo = showTVShowInfo;
window.addToMyList = addToMyList;
