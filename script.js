const faqs = document.querySelectorAll(".faqbox");

faqs.forEach(faq=>{
    faq.addEventListener("click",()=>{
        faq.classList.toggle("open");
    })
})

window.onscroll = function () {
  const btn = document.getElementById("backToTopBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Top Rated Content Functionality
class TopRatedContent {
  constructor() {
    // TMDB API configuration
    this.apiKey = '8265bd1679663a7ea12ac168da84d2e8'; // Free API key for demo
    this.baseURL = 'https://api.themoviedb.org/3';
    this.imageBaseURL = 'https://image.tmdb.org/t/p/w500';
    
    this.init();
  }

  init() {
    this.setupTabSwitching();
    this.loadContent();
  }

  setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const contentGrids = document.querySelectorAll('.content-grid');

    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Remove active class from all tabs and grids
        tabButtons.forEach(btn => btn.classList.remove('active'));
        contentGrids.forEach(grid => grid.classList.remove('active'));

        // Add active class to clicked tab
        button.classList.add('active');

        // Show corresponding content grid
        const tabType = button.getAttribute('data-tab');
        document.getElementById(`${tabType}-content`).classList.add('active');
      });
    });
  }

  async loadContent() {
    try {
      // Load both movies and TV shows
      await Promise.all([
        this.loadMovies(),
        this.loadTVShows()
      ]);
    } catch (error) {
      console.error('Error loading content:', error);
      this.showError();
    }
  }

  async loadMovies() {
    try {
      const response = await fetch(`${this.baseURL}/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`);
      const data = await response.json();
      
      if (data.results) {
        this.renderContent(data.results.slice(0, 12), 'movies-content');
      }
    } catch (error) {
      console.error('Error loading movies:', error);
      this.showError('movies-content');
    }
  }

  async loadTVShows() {
    try {
      const response = await fetch(`${this.baseURL}/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=1`);
      const data = await response.json();
      
      if (data.results) {
        this.renderContent(data.results.slice(0, 12), 'shows-content');
      }
    } catch (error) {
      console.error('Error loading TV shows:', error);
      this.showError('shows-content');
    }
  }

  renderContent(items, containerId) {
    const container = document.getElementById(containerId);
    
    if (!items || items.length === 0) {
      container.innerHTML = '<div class="loading">No content available</div>';
      return;
    }

    const contentHTML = items.map(item => this.createContentCard(item)).join('');
    container.innerHTML = contentHTML;

    // Add click event listeners to cards
    container.querySelectorAll('.content-card').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.querySelector('.card-title').textContent;
        const rating = card.querySelector('.rating-value').textContent;
        alert(`${title}\nRating: ${rating}/10\n\nClick OK to continue browsing!`);
      });
    });
  }

  createContentCard(item) {
    const title = item.title || item.name;
    const releaseDate = item.release_date || item.first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
    const overview = item.overview || 'No description available.';
    const posterPath = item.poster_path 
      ? `${this.imageBaseURL}${item.poster_path}` 
      : 'https://via.placeholder.com/500x750/333/fff?text=No+Image';

    return `
      <div class="content-card">
        <img src="${posterPath}" alt="${title}" loading="lazy">
        <div class="play-overlay">▶</div>
        <div class="card-info">
          <h3 class="card-title">${title}</h3>
          <div class="card-meta">
            <span class="card-year">${year}</span>
            <div class="card-rating">
              <span class="rating-star">★</span>
              <span class="rating-value">${rating}</span>
            </div>
          </div>
          <p class="card-overview">${overview}</p>
        </div>
      </div>
    `;
  }

  showError(containerId = null) {
    const errorMessage = '<div class="loading">Unable to load content. Please try again later.</div>';
    
    if (containerId) {
      document.getElementById(containerId).innerHTML = errorMessage;
    } else {
      document.getElementById('movies-content').innerHTML = errorMessage;
      document.getElementById('shows-content').innerHTML = errorMessage;
    }
  }
}

// Fallback data in case API fails
const fallbackMovies = [
  {
    title: "The Shawshank Redemption",
    vote_average: 9.3,
    release_date: "1994-09-23",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster_path: null
  },
  {
    title: "The Godfather",
    vote_average: 9.2,
    release_date: "1972-03-24",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster_path: null
  },
  {
    title: "The Dark Knight",
    vote_average: 9.0,
    release_date: "2008-07-18",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    poster_path: null
  }
];

const fallbackTVShows = [
  {
    name: "Breaking Bad",
    vote_average: 9.5,
    first_air_date: "2008-01-20",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
    poster_path: null
  },
  {
    name: "Game of Thrones",
    vote_average: 9.3,
    first_air_date: "2011-04-17",
    overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    poster_path: null
  },
  {
    name: "The Sopranos",
    vote_average: 9.2,
    first_air_date: "1999-01-10",
    overview: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life.",
    poster_path: null
  }
];

// Initialize top rated content when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

  // Check if the top-rated section exists (only on main page)
  if (document.querySelector('.top-rated-section')) {
    const topRatedContent = new TopRatedContent();
    
    // Fallback to static data if API fails after 5 seconds
    setTimeout(() => {
      const moviesContainer = document.getElementById('movies-content');
      const showsContainer = document.getElementById('shows-content');
      
      if (moviesContainer && moviesContainer.innerHTML.includes('Loading')) {
        console.log('API timeout, using fallback data');
        topRatedContent.renderContent(fallbackMovies, 'movies-content');
        topRatedContent.renderContent(fallbackTVShows, 'shows-content');
      }
    }, 5000);
  }
});
