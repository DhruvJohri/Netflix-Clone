// FAQ toggling
const faqs = document.querySelectorAll('.faqbox');
faqs.forEach((faq) => {
  faq.addEventListener('click', () => {
    faq.classList.toggle('open');
  });
});

// Movie Search Logic
document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.getElementById('movie-search-btn');
  if (searchBtn) {
    searchBtn.onclick = async function () {
      const title = document.getElementById('movie-title').value.trim();
      const resultDiv = document.getElementById('movie-result');
      resultDiv.innerHTML = '';
      if (!title) {
        resultDiv.innerHTML = `<div class="movie-error">Please enter a movie title.</div>`;
        return;
      }
      resultDiv.innerHTML = 'Loading...';
      try {
        const res = await fetch(
          `/movie-api/search?title=${encodeURIComponent(title)}`
        );
        const data = await res.json();
        if (data.error) {
          resultDiv.innerHTML = `<div class="movie-error">${data.error}</div>`;
        } else {
          resultDiv.innerHTML = `
            <div class="movie-details">
              <h3>${data.Title} (${data.Year})</h3>
              <img src="${
                data.Poster && data.Poster !== 'N/A' ? data.Poster : ''
              }" alt="Poster"/>
              <p><strong>Director:</strong> ${data.Director}</p>
              <p><strong>Genre:</strong> ${data.Genre}</p>
              <p><strong>Plot:</strong> ${data.Plot}</p>
            </div>
          `;
        }
      } catch (err) {
        resultDiv.innerHTML = `<div class="movie-error">Error fetching movie data.</div>`;
      }
    };
  }
});
