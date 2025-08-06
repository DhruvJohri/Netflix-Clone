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

const container = document.getElementById('moviesContainer');

movies.forEach(movie => {
  const card = document.createElement('div');
  card.className = 'movie-card';

  card.innerHTML = `
    <img src="${movie.image}" alt="${movie.title}" />
    <p>${movie.title}</p>
  `;

  container.appendChild(card);
});

// Redirect to login if user is not signed in
const currentUser = JSON.parse(localStorage.getItem("netflixCurrentUser"));

if (!currentUser || !currentUser.email) {
  window.location.href = "login.html"; // or "signin.html", depending on your filename
}

