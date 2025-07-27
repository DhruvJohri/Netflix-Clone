// Navigation handling
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const category = item.getAttribute('data-category');
                
                // Remove active class from all nav items
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                // Add active class to clicked nav item
                item.classList.add('active');

                // Handle content display based on category
                const heroSection = document.getElementById('hero-section');
                const contentSections = document.getElementById('content-sections');
                const searchResults = document.getElementById('search-results');
                const loadingOverlay = document.getElementById('loading-overlay');

                heroSection.style.display = 'block';
                contentSections.style.display = 'block';
                searchResults.style.display = 'none';
                loadingOverlay.style.display = 'none';
                searchInput.value = '';
                searchResults.innerHTML = '';
                // Additional logic for other categories (home, tv, movies, mylist) can be added here
            });
        });

        // Search functionality
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const searchResults = document.getElementById('search-results');
        const heroSection = document.getElementById('hero-section');
        const contentSections = document.getElementById('content-sections');
        const loadingOverlay = document.getElementById('loading-overlay');

        // Sample content data (in a real app, this would come from a backend API)
        const allContent = [
            { id: 1, title: 'Movie Title', type: 'movie', rating: 8.5, genres: ['Action', 'Thriller'] },
            { id: 2, title: 'TV Show Title', type: 'tv', rating: 9.2, genres: ['Drama', 'Mystery'] },
            { id: 3, title: 'Another Movie', type: 'movie', rating: 7.8, genres: ['Comedy', 'Romance'] },
            { id: 4, title: 'Comedy Series', type: 'tv', rating: 8.9, genres: ['Comedy'] },
            { id: 5, title: 'Sci-Fi Movie', type: 'movie', rating: 8.1, genres: ['Sci-Fi', 'Adventure'] },
            { id: 6, title: 'Mystery Series', type: 'tv', rating: 9.0, genres: ['Mystery', 'Crime'] },
            { id: 7, title: 'Popular Movie 1', type: 'movie', rating: 8.7, genres: ['Action', 'Drama'] },
            { id: 8, title: 'Popular Movie 2', type: 'movie', rating: 9.1, genres: ['Sci-Fi', 'Thriller'] },
            { id: 9, title: 'Popular Movie 3', type: 'movie', rating: 8.3, genres: ['Comedy', 'Family'] },
            { id: 10, title: 'Popular Movie 4', type: 'movie', rating: 7.9, genres: ['Action', 'Adventure'] },
            { id: 11, title: 'Popular Movie 5', type: 'movie', rating: 8.5, genres: ['Drama', 'Romance'] },
            { id: 12, title: 'Popular Movie 6', type: 'movie', rating: 8.8, genres: ['Thriller', 'Mystery'] },
            { id: 13, title: 'Popular TV Show 1', type: 'tv', rating: 9.3, genres: ['Drama', 'Fantasy'] },
            { id: 14, title: 'Popular TV Show 2', type: 'tv', rating: 8.9, genres: ['Comedy', 'Drama'] },
            { id: 15, title: 'Popular TV Show 3', type: 'tv', rating: 8.6, genres: ['Crime', 'Thriller'] },
            { id: 16, title: 'Popular TV Show 4', type: 'tv', rating: 9.0, genres: ['Sci-Fi', 'Drama'] },
            { id: 17, title: 'Popular TV Show 5', type: 'tv', rating: 8.7, genres: ['Mystery', 'Horror'] },
            { id: 18, title: 'Popular TV Show 6', type: 'tv', rating: 9.2, genres: ['Action', 'Adventure'] },
            { id: 19, title: 'Netflix Original 1', type: 'tv', rating: 9.1, genres: ['Drama', 'Sci-Fi'] },
            { id: 20, title: 'Netflix Original 2', type: 'movie', rating: 8.8, genres: ['Comedy', 'Romance'] },
            { id: 21, title: 'Netflix Original 3', type: 'tv', rating: 8.4, genres: ['Thriller', 'Crime'] },
            { id: 22, title: 'Netflix Original 4', type: 'movie', rating: 9.0, genres: ['Action', 'Sci-Fi'] },
            { id: 23, title: 'Netflix Original 5', type: 'tv', rating: 8.9, genres: ['Fantasy', 'Drama'] },
            { id: 24, title: 'Netflix Original 6', type: 'movie', rating: 8.6, genres: ['Horror', 'Mystery'] }
        ];

        // Function to show loading state
        function showLoading() {
            loadingOverlay.style.display = 'flex';
            searchResults.style.display = 'none';
        }

        // Function to hide loading state
        function hideLoading() {
            loadingOverlay.style.display = 'none';
        }

        // Function to show error state
        function showError() {
            const errorTemplate = document.querySelector('.error-template').innerHTML;
            searchResults.innerHTML = errorTemplate;
            searchResults.style.display = 'flex';
            hideLoading();
            // Add event listener to retry button
            searchResults.querySelector('.btn-info').addEventListener('click', performSearch);
        }

        // Function to perform search
        async function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            searchResults.innerHTML = ''; // Clear previous results
            if (!query) {
                searchResults.innerHTML = '<p class="no-results">Please enter a search query.</p>';
                searchResults.style.display = 'flex';
                heroSection.style.display = 'none';
                contentSections.style.display = 'none';
                hideLoading();
                return;
            }

            showLoading();
            heroSection.style.display = 'none';
            contentSections.style.display = 'none';
            searchResults.style.display = 'flex';

            try {
                // Simulate API call with a delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Filter content based on title or genres
                const filteredContent = allContent.filter(item => 
                    item.title.toLowerCase().includes(query) || 
                    item.genres.some(genre => genre.toLowerCase().includes(query))
                );

                // Remove loading state
                hideLoading();

                if (filteredContent.length === 0) {
                    searchResults.innerHTML = '<p class="no-results">No results found for "' + query + '".</p>';
                    searchResults.style.display = 'flex';
                    return;
                }

                // Display search results
                filteredContent.forEach(item => {
                    const contentItem = document.createElement('div');
                    contentItem.className = 'content-item';
                    contentItem.setAttribute('data-content-id', item.id);
                    contentItem.setAttribute('data-content-type', item.type);
                    contentItem.innerHTML = `
                        <img src="/placeholder.svg?height=240&width=160" alt="${item.title}" class="content-poster">
                        <div class="content-overlay">
                            <h3>${item.title}</h3>
                            <div class="content-rating">★ ${item.rating}</div>
                            <div class="content-genres">${item.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join(' ')}</div>
                        </div>
                    `;
                    searchResults.appendChild(contentItem);
                });
                searchResults.style.display = 'flex';
            } catch (error) {
                console.error('Search error:', error);
                showError();
            }
        }

        // Event listeners for search
        searchBtn.addEventListener('click', performSearch);

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Clear search input and results when navigating away
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                searchInput.value = '';
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                heroSection.style.display = 'block';
                contentSections.style.display = 'block';
                hideLoading();
            });
        });

        // Clear search results when input is cleared
        searchInput.addEventListener('input', () => {
            if (!searchInput.value.trim()) {
                searchResults.innerHTML = '';
                searchResults.style.display = 'none';
                heroSection.style.display = 'block';
                contentSections.style.display = 'block';
                hideLoading();
            }
        });