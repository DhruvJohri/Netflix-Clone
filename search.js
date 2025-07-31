const apiKey = TMDB API KEY ;
const moviesContainer = document.getElementById("movies");

async function fetchTrendingMovies() {
  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  renderMovies(data.results);
}

function renderMovies(movies) {
  moviesContainer.innerHTML = ""; // Clear previous
  movies.forEach(media => {
    const movieCard = createMovieCard(media);
    moviesContainer.appendChild(movieCard);
  });
}

function createMovieCard(media) {
  const { title, name, backdrop_path } = media;
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie_item");

  movieCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${backdrop_path}" class="movie_img_rounded">
    <div class="title">${title || name}</div>
  `;
  return movieCard;
}

async function searchMovies() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();
  renderMovies(data.results);
}

fetchTrendingMovies(); // Load trending by default
