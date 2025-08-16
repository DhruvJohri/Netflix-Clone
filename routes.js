// routes.js - Centralized routing configuration for Netflix Clone

const ROUTES = {
  // Main pages
  HOME: 'index.html',
  DASHBOARD: 'home.html',
  TV_SHOWS: 'tvshows.html',
  MOVIES: 'movies.html',
  SIGNIN: 'signin.html',
  REGISTER: 'register.html',
  PROFILE_SELECTION: 'profile-selection.html',
  DASHBOARD_ADMIN: 'dashboard.html',
  
  // Legal pages
  TERMS: 'Terms of use/terms.html',
  PRIVACY: 'Privacy/privacy.html',
  LEGAL: 'Legal Notices/legal.html',
  
  // Support pages
  CONTACT: 'contact-us.html'
};

// Navigation menu structure
const NAVIGATION_MENU = {
  main: [
    { label: 'Home', href: ROUTES.HOME, icon: 'fas fa-home' },
    { label: 'TV Shows', href: ROUTES.TV_SHOWS, icon: 'fas fa-tv' },
    { label: 'Movies', href: ROUTES.MOVIES, icon: 'fas fa-film' },
    { label: 'New & Popular', href: '#', icon: 'fas fa-star' },
    { label: 'My List', href: ROUTES.DASHBOARD, icon: 'fas fa-bookmark' }
  ],
  
  sidebar: [
    { label: 'Home', href: ROUTES.HOME, icon: 'fas fa-home' },
    { label: 'TV Shows', href: ROUTES.TV_SHOWS, icon: 'fas fa-tv' },
    { label: 'Movies', href: ROUTES.MOVIES, icon: 'fas fa-film' },
    { label: 'Search', href: '#', icon: 'fas fa-search' },
    { label: 'Trending', href: '#', icon: 'fas fa-fire' },
    { label: 'New Releases', href: '#', icon: 'fas fa-calendar' },
    { label: 'Popular', href: '#', icon: 'fas fa-thumbs-up' },
    { label: 'Top Rated', href: '#', icon: 'fas fa-crown' },
    { label: 'Genres', href: '#', icon: 'fas fa-tags' },
    { label: 'My List', href: ROUTES.DASHBOARD, icon: 'fas fa-bookmark' },
    { label: 'Watch Again', href: '#', icon: 'fas fa-redo' },
    { label: 'Settings', href: '#', icon: 'fas fa-cog' },
    { label: 'Log Out', href: ROUTES.SIGNIN, icon: 'fas fa-sign-out-alt' }
  ],
  
  footer: [
    { label: 'About Netflix', href: '#' },
    { label: 'Jobs', href: '#' },
    { label: 'Investor Relations', href: '#' },
    { label: 'Media Centre', href: '#' },
    { label: 'Help Centre', href: '#' },
    { label: 'Contact Us', href: ROUTES.CONTACT },
    { label: 'Account', href: '#' },
    { label: 'Speed Test', href: '#' },
    { label: 'Ways to Watch', href: '#' },
    { label: 'Corporate Information', href: '#' },
    { label: 'Only on Netflix', href: '#' },
    { label: 'Cookie Preferences', href: '#' },
    { label: 'Terms of Use', href: ROUTES.TERMS },
    { label: 'Privacy Policy', href: ROUTES.PRIVACY },
    { label: 'Legal Notices', href: ROUTES.LEGAL }
  ]
};

// Route validation
function isValidRoute(route) {
  return Object.values(ROUTES).includes(route);
}

// Navigation function
function navigateTo(route) {
  if (isValidRoute(route)) {
    window.location.href = route;
  } else {
    console.warn(`Invalid route: ${route}`);
    return false;
  }
  return true;
}

// Get current page route
function getCurrentRoute() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();
  return filename || 'index.html';
}

// Check if user is authenticated
function isAuthenticated() {
  return localStorage.getItem("netflixCurrentUser") !== null;
}

// Protected route navigation
function navigateToProtected(route) {
  if (isAuthenticated()) {
    navigateTo(route);
  } else {
    alert("Please sign in to access this page");
    navigateTo(ROUTES.SIGNIN);
  }
}

// Generate navigation menu HTML
function generateNavigationMenu(type = 'main') {
  const menu = NAVIGATION_MENU[type];
  if (!menu) return '';
  
  return menu.map(item => {
    const isActive = getCurrentRoute() === item.href ? ' class="active"' : '';
    const icon = item.icon ? `<i class="${item.icon}"></i>` : '';
    
    if (item.href === '#') {
      return `<li><a href="#"${isActive}>${icon} ${item.label}</a></li>`;
    } else {
      return `<li><a href="${item.href}"${isActive}>${icon} ${item.label}</a></li>`;
    }
  }).join('');
}

// Export for global use
window.ROUTES = ROUTES;
window.NAVIGATION_MENU = NAVIGATION_MENU;
window.navigateTo = navigateTo;
window.navigateToProtected = navigateToProtected;
window.getCurrentRoute = getCurrentRoute;
window.isAuthenticated = isAuthenticated;
window.generateNavigationMenu = generateNavigationMenu;

console.log("🗺️ Routes configuration loaded successfully!");
