document.addEventListener("DOMContentLoaded", () => {
    // --- 1. API and Configuration ---
    const API_KEY = 'Your TMDB API KEY'; // Your working API key
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMG_URL = 'https://image.tmdb.org/t/p/original';
    const POSTER_URL = 'https://image.tmdb.org/t/p/w500';

    // --- 2. Initial Checks ---
    const selectedProfile = localStorage.getItem('selectedProfile');
    if (!selectedProfile) {
        window.location.href = 'profile-selection.html';
        return;
    }

    // --- 3. Element Selectors ---
    const dashboardView = document.getElementById('dashboard-view');
    const searchView = document.getElementById('search-view');
    const contentSections = document.getElementById('content-sections');
    const heroImage = document.getElementById('hero-bg-image');
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');
    const addToListBtn = document.getElementById('hero-add-btn');

    // --- 4. State Management ---
    let myList = JSON.parse(localStorage.getItem(`myNetflixList_${selectedProfile}`)) || [];
    const saveMyList = () => localStorage.setItem(`myNetflixList_${selectedProfile}`, JSON.stringify(myList));

    // --- 5. API Fetch Functions ---
    async function fetchFromAPI(endpoint, params = '') {
        try {
            const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&${params}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Failed to fetch from ${endpoint}:`, error);
            return null;
        }
    }

    // --- 6. UI Update Functions ---
    function updateHeroSection(item) {
        if (!item) return;
        heroImage.src = `${IMG_URL}${item.backdrop_path || item.poster_path}`;
        heroTitle.textContent = item.title || item.name;
        heroDescription.textContent = item.overview;
        addToListBtn.dataset.contentId = item.id.toString();
        updateMyListButton();
    }
    
    function updateMyListButton() {
        const contentId = addToListBtn.dataset.contentId;
        const icon = addToListBtn.querySelector('i');
        const text = addToListBtn.querySelector('span');
        if (myList.includes(contentId)) {
            icon.className = 'fas fa-check';
            text.textContent = 'Added';
            addToListBtn.classList.add('added');
        } else {
            icon.className = 'fas fa-plus';
            text.textContent = 'My List';
            addToListBtn.classList.remove('added');
        }
    }
    
    function createCarouselRow(title, items, iconClass) {
        if (!items || items.length === 0) return '';
        const itemsHtml = items.map(item => {
            if (!item.poster_path) return '';
            return `
                <div class="content-item" data-id="${item.id}" data-type="${item.title ? 'movie' : 'tv'}">
                    <img src="${POSTER_URL}${item.poster_path}" alt="${item.title || item.name}" class="content-poster">
                </div>
            `;
        }).join('');

        return `
            <div class="content-row">
                <h2 class="section-title"><i class="${iconClass} section-icon"></i>${title}</h2>
                <div class="carousel-container">
                    <button class="carousel-nav prev" disabled>&lsaquo;</button>
                    <div class="content-carousel">${itemsHtml}</div>
                    <button class="carousel-nav next">&rsaquo;</button>
                </div>
            </div>
        `;
    }

    // --- 7. View Rendering ---
    async function renderHomePage() {
        contentSections.innerHTML = '';
        const [trending, topRated, popularTV] = await Promise.all([
            fetchFromAPI('/trending/movie/week'),
            fetchFromAPI('/movie/top_rated'),
            fetchFromAPI('/tv/popular')
        ]);
        if (trending && trending.results.length > 0) updateHeroSection(trending.results[0]);
        contentSections.innerHTML += createCarouselRow('Trending Now', trending.results, 'fas fa-fire');
        contentSections.innerHTML += createCarouselRow('Top Rated Movies', topRated.results, 'fas fa-star');
        contentSections.innerHTML += createCarouselRow('Popular TV Shows', popularTV.results, 'fas fa-tv');
        addDynamicContentListeners();
    }
    
    async function renderMoviesPage() {
        contentSections.innerHTML = '';
        const [popular, topRated, upcoming] = await Promise.all([
            fetchFromAPI('/movie/popular'),
            fetchFromAPI('/movie/top_rated'),
            fetchFromAPI('/movie/upcoming')
        ]);
        if (popular && popular.results.length > 0) updateHeroSection(popular.results[0]);
        contentSections.innerHTML += createCarouselRow('Popular Movies', popular.results, 'fas fa-film');
        contentSections.innerHTML += createCarouselRow('Top Rated Movies', topRated.results, 'fas fa-star');
        contentSections.innerHTML += createCarouselRow('Upcoming Movies', upcoming.results, 'fas fa-calendar-alt');
        addDynamicContentListeners();
    }

    async function renderTvShowsPage() {
        contentSections.innerHTML = '';
        const [popular, topRated, onTheAir] = await Promise.all([
            fetchFromAPI('/tv/popular'),
            fetchFromAPI('/tv/top_rated'),
            fetchFromAPI('/tv/on_the_air')
        ]);
        if (popular && popular.results.length > 0) updateHeroSection(popular.results[0]);
        contentSections.innerHTML += createCarouselRow('Popular TV Shows', popular.results, 'fas fa-tv');
        contentSections.innerHTML += createCarouselRow('Top Rated TV Shows', topRated.results, 'fas fa-star');
        contentSections.innerHTML += createCarouselRow('Currently Airing', onTheAir.results, 'fas fa-broadcast-tower');
        addDynamicContentListeners();
    }
    
    // --- 8. Search and My List Display ---
    async function displayMyList() {
        if (myList.length === 0) {
            renderResultsGrid([], 'My List is Empty');
            return;
        }
        const listDetails = await Promise.all(
            myList.map(id => fetchFromAPI(`/movie/${id}`).catch(() => fetchFromAPI(`/tv/${id}`)))
        );
        renderResultsGrid(listDetails.filter(item => item), 'My List');
    }

    function renderSearchView() {
        searchView.innerHTML = `
            <div class="search-bar">
                <input type="text" id="search-input" placeholder="Search for movies, TV shows...">
                <button id="search-button"><i class="fas fa-search"></i></button>
            </div>
            <div class="results-grid" id="results-grid"></div>
        `;
        displayInitialSearchContent();
        
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const triggerSearch = async () => {
            const query = searchInput.value.trim();
            if (query) {
                const searchResults = await fetchFromAPI('/search/multi', `query=${encodeURIComponent(query)}`);
                const validResults = searchResults ? searchResults.results.filter(item => item.media_type !== 'person') : [];
                renderResultsGrid(validResults, `Results for "${query}"`);
            } else {
                displayInitialSearchContent(); // Show popular if search is cleared
            }
        };
        searchButton.addEventListener('click', triggerSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') triggerSearch();
        });
    }
    
    async function displayInitialSearchContent() {
        const discoverResults = await fetchFromAPI('/discover/movie', 'sort_by=popularity.desc');
        renderResultsGrid(discoverResults ? discoverResults.results : [], 'Popular Right Now');
    }

    function renderResultsGrid(items, title) {
        document.getElementById('search-view').querySelector('.results-header, .results-grid')?.remove();
        searchView.innerHTML += `
            <div class="results-header" style="margin-bottom: 20px;"><h2 class="section-title">${title}</h2></div>
            <div class="results-grid" id="results-grid"></div>`;
        const resultsGrid = document.getElementById('results-grid');
        if (!items || items.length === 0) {
            resultsGrid.innerHTML = '<p style="color: var(--netflix-light-gray);">No items found.</p>';
            return;
        }
        items.forEach(item => {
            if (!item.poster_path) return;
            const itemEl = document.createElement('div');
            itemEl.className = 'content-item';
            itemEl.addEventListener('click', () => {
                updateHeroSection(item);
                showView('home');
            });
            itemEl.innerHTML = `<img src="${POSTER_URL}${item.poster_path}" alt="${item.title || item.name}" class="content-poster">`;
            resultsGrid.appendChild(itemEl);
        });
    }
    
    // --- 9. View Management ---
    function showView(viewName) {
        document.querySelector('.nav-item.active').classList.remove('active');
        const navItem = document.querySelector(`.nav-item[data-category="${viewName}"]`);
        if (navItem) navItem.classList.add('active');

        dashboardView.style.display = 'none';
        searchView.style.display = 'none';

        if (['home', 'movies', 'tv'].includes(viewName)) {
            dashboardView.style.display = 'block';
            if (viewName === 'home') renderHomePage();
            else if (viewName === 'movies') renderMoviesPage();
            else if (viewName === 'tv') renderTvShowsPage();
        } else {
            searchView.style.display = 'block';
            if (viewName === 'search') renderSearchView();
            else if (viewName === 'mylist') displayMyList();
        }
    }

    // --- 10. Event Listeners ---
    function setupStaticEventListeners() {
        // For "My List" button - THIS IS STATIC and only needs to be set ONCE
        addToListBtn.addEventListener('click', () => {
            const contentId = addToListBtn.dataset.contentId;
            if (myList.includes(contentId)) {
                myList = myList.filter(id => id !== contentId);
            } else {
                myList.push(contentId);
            }
            saveMyList();
            updateMyListButton();
        });

        // For main navigation
        document.querySelectorAll('.nav-item').forEach(navItem => {
            navItem.addEventListener('click', (e) => {
                e.preventDefault();
                const category = navItem.dataset.category;
                showView(category);
            });
        });

        // For logout button
        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            if (window.ProfileSelection && typeof window.ProfileSelection.logout === 'function') {
                ProfileSelection.logout();
            }
        });
    }

    function addDynamicContentListeners() {
        // Listeners for content that is re-rendered (carousels)
        contentSections.querySelectorAll('.content-item').forEach(item => {
            item.addEventListener('click', async () => {
                const type = item.dataset.type;
                const id = item.dataset.id;
                const details = await fetchFromAPI(`/${type}/${id}`);
                if (details) updateHeroSection(details);
            });
        });

        contentSections.querySelectorAll('.carousel-container').forEach(container => {
            const carousel = container.querySelector('.content-carousel');
            const prevBtn = container.querySelector('.prev');
            const nextBtn = container.querySelector('.next');
            if (!carousel || !prevBtn || !nextBtn) return;
            const updateButtons = () => {
                prevBtn.disabled = carousel.scrollLeft < 10;
                nextBtn.disabled = carousel.scrollLeft > carousel.scrollWidth - carousel.clientWidth - 10;
            };
            prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -carousel.clientWidth, behavior: 'smooth' }));
            nextBtn.addEventListener('click', () => carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' }));
            carousel.addEventListener('scroll', updateButtons);
            updateButtons();
        });
    }

    // --- 11. Initial Page Load ---
    setupStaticEventListeners();
    showView('home'); // Load the home page by default
});