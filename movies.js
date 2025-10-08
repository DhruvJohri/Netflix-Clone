// movies.js
const movies = [
  {
    title: "Bhola",
    image: "assets/Bholaa.png"
  },
  {
    title: "RRR",
    image: "assets/RRR.png"
  },
  {
    title: "Pathaan",
    image: "assets/Pathaan.png"
  },
  {
    title: "Chaava",
    image: "assets/Chaava.png"
  },
  {
    title: "Baaghi 3",
    image: "assets/Baaghi 3.png"
  },
  {
    title: "Baazigar",
    image: "assets/Baazigar.png"
  },
  {
    title: "DevDas",
    image: "assets/Devdas.png"
  },
  {
    title: "Ek Tha Tiger",
    image: "assets/EkThaTiger.png"
  },
  {
    title: "Half Girlfriend",
    image: "assets/half.png"
  },
  {
    title: "Tu Jhooti Mai Makaar",
    image: "assets/jhooti.png"
  },
  {
    title: "Kabir Singh",
    image: "assets/KabirSingh.png"
  },
  {
    title: "Mother India",
    image: "assets/MotherIndia.png"
  },
  {
    title: "Om Shanti Om",
    image: "assets/OmShantiOm.png"
  },
  {
    title: "Padmaavati",
    image: "assets/Padmaavat.png"
  },
  {
    title: "Saiyaara",
    image: "assets/Saiyaara.png"
  },
  {
    title: "Sholay",
    image: "assets/Sholay.png"
  },
  {
    title: "Sonu Ke Titu Ki Sweety",
    image: "assets/Sonu.png"
  },
  {
    title: "Tanhaji",
    image: "assets/Tanhaji.png"
  }
];


// Ensure movies and container exist before rendering
const container = document.getElementById('moviesContainer');

if (Array.isArray(movies) && container) {
  const fragment = document.createDocumentFragment();

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    // Escape title to avoid HTML injection
    const safeTitle = document.createTextNode(movie?.title || 'Untitled');
    const img = document.createElement('img');
    img.src = movie?.image || 'default-image.jpg';
    img.alt = movie?.title || 'Movie Poster';

    const titleElem = document.createElement('p');
    titleElem.appendChild(safeTitle);

    card.appendChild(img);
    card.appendChild(titleElem);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
} else {
  console.error('Movies array or container element is missing.');
}

// Redirect to login if user is not signed in
try {
  const currentUser = JSON.parse(localStorage.getItem('netflixCurrentUser'));
  if (!currentUser?.email) {
    window.location.href = 'login.html'; // or 'signin.html'
  }
} catch (err) {
  console.error('Error reading user data from localStorage:', err);
  window.location.href = 'login.html';
}
