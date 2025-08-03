const faqs = document.querySelectorAll(".faqbox")
faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("open")
  })
})

const backToTopBtn = document.getElementById("backToTopBtn")
const circularProgress = document.querySelector(".circular-progress .circle-progress")
const circumference = 2 * Math.PI * 15.9155 // Circumference of the circle (radius 15.9155)

// Set initial dasharray for the circle progress
circularProgress.style.strokeDasharray = `${circumference} ${circumference}`
circularProgress.style.strokeDashoffset = circumference // Start fully hidden

window.addEventListener("scroll", () => {
  // Calculate scroll percentage for the circular progress
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight

  const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100

  // Update the circular progress
  const offset = circumference - (scrollPercentage / 100) * circumference
  circularProgress.style.strokeDashoffset = offset

  // Show/hide back to top button
  if (scrollTop > 300) {
    backToTopBtn.style.display = "flex"
  } else {
    backToTopBtn.style.display = "none"
  }

  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function handleFormSubmit() {
  const emailInputs = document.querySelectorAll('input[type="email"]')
  let email = ""

  emailInputs.forEach((input) => {
    if (input.value) email = input.value
  })

  if (!email) {
    alert("Hey there! 👋 Please enter your email address to get started!")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    alert("Oops! 😅 Please enter a valid email address (like: you@example.com)")
    return
  }

  alert(`Awesome! 🎉 Welcome aboard! We'll send updates to ${email}`)

  emailInputs.forEach((input) => (input.value = ""))
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated")
    }
  })
}, observerOptions)

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el)
})

document.addEventListener("DOMContentLoaded", () => {
  const emailInputs = document.querySelectorAll('input[type="email"]')

  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      const email = this.value
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (email && !emailRegex.test(email)) {
        this.classList.add("error")
        setTimeout(() => {
          this.classList.remove("error")
        }, 3000)
      }
    })

    input.addEventListener("input", function () {
      this.classList.remove("error")
    })
  })
})

// Trending Now Section Interactions
document.addEventListener("DOMContentLoaded", () => {
  // Initialize trending section
  initTrendingSection()
})

function initTrendingSection() {
  const trendingItems = document.querySelectorAll('.trending-item')
  
  trendingItems.forEach((item, index) => {
    // Add staggered animation
    item.style.animationDelay = `${index * 0.1}s`
    item.classList.add('animate-on-scroll')
    
    // Add click handler
    item.addEventListener('click', () => {
      const contentId = item.dataset.contentId
      const title = item.querySelector('h3').textContent
      
      // Show coming soon message for now
      alert(`🎬 "${title}" - Coming Soon!\n\nThis feature will be available when the full Netflix clone is complete.`)
      
      // In a full app, you would redirect to a detail page:
      // window.location.href = `movie-details.html?id=${contentId}`
    })
    
    // Add hover sound effect (optional)
    item.addEventListener('mouseenter', () => {
      // Add a subtle scale effect
      item.style.zIndex = '100'
    })
    
    item.addEventListener('mouseleave', () => {
      item.style.zIndex = '1'
    })
  })
}

console.log("🍿 Welcome to Netflix Clone! Made with ❤️ ")


// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    // Prevent scrolling during loading
    body.style.overflow = 'hidden';
    
    // Simulate loading time (2.5 seconds)
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        body.style.overflow = 'auto'; // Re-enable scrolling
        
        // Remove loading screen from DOM after fade out
        setTimeout(() => {
            loadingScreen.remove();
        }, 800);
    }, 2000);
});

// Enhanced Trending Now Section Interactions
document.addEventListener("DOMContentLoaded", () => {
  // Initialize trending section after DOM is loaded
  setTimeout(() => {
    initTrendingSection()
  }, 100)
})

function initTrendingSection() {
  const trendingItems = document.querySelectorAll('.trending-item')
  
  if (trendingItems.length === 0) {
    console.warn('No trending items found. Make sure the HTML structure is correct.')
    return
  }

  trendingItems.forEach((item, index) => {
    // Add staggered animation
    item.style.animationDelay = `${index * 0.1}s`
    item.classList.add('animate-on-scroll')
    
    // Handle image loading
    const img = item.querySelector('.trending-poster')
    if (img) {
      img.addEventListener('error', (e) => {
        console.warn('Image failed to load:', e.target.src)
        // Fallback to a different image service
        e.target.src = `https://via.placeholder.com/280x400/333333/ffffff?text=Image+${index + 1}`
      })
      
      img.addEventListener('load', () => {
        item.classList.add('image-loaded')
      })
    }
    
    // Add click handler
    item.addEventListener('click', (e) => {
      e.preventDefault()
      const contentId = item.dataset.contentId
      const title = item.querySelector('h3')?.textContent || 'Unknown Title'
      
      // Add visual feedback
      item.style.transform = 'scale(0.95)'
      setTimeout(() => {
        item.style.transform = ''
      }, 150)
      
      // Show enhanced message
      showContentAlert(title, contentId)
    })
    
    // Enhanced hover effects
    item.addEventListener('mouseenter', () => {
      item.style.zIndex = '100'
      // Add subtle animation to other items
      trendingItems.forEach((otherItem, otherIndex) => {
        if (otherIndex !== index) {
          otherItem.style.opacity = '0.7'
          otherItem.style.transform = 'scale(0.95)'
        }
      })
    })
    
    item.addEventListener('mouseleave', () => {
      item.style.zIndex = '1'
      // Reset all items
      trendingItems.forEach((otherItem) => {
        otherItem.style.opacity = '1'
        otherItem.style.transform = 'scale(1)'
      })
    })
  })
  
  // Add keyboard navigation
  addKeyboardNavigation(trendingItems)
  
  console.log(`✅ Trending section initialized with ${trendingItems.length} items`)
}

function showContentAlert(title, contentId) {
  // Create a more professional modal instead of alert
  const modal = document.createElement('div')
  modal.className = 'content-modal'
  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h2>🎬 ${title}</h2>
          <button class="close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <p>This feature is coming soon!</p>
          <p>Content ID: ${contentId}</p>
          <p>The full Netflix clone will include movie details, trailers, and streaming capabilities.</p>
        </div>
        <div class="modal-footer">
          <button class="btn-primary">Add to List</button>
          <button class="btn-secondary">More Info</button>
        </div>
      </div>
    </div>
  `
  
  // Add styles
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  `
  
  const modalContent = modal.querySelector('.modal-content')
  modalContent.style.cssText = `
    background: #181818;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    color: white;
    font-family: 'Poppins', sans-serif;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    animation: slideUp 0.3s ease;
  `
  
  // Close functionality
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('close-btn')) {
      document.body.removeChild(modal)
    }
  })
  
  document.body.appendChild(modal)
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (document.body.contains(modal)) {
      document.body.removeChild(modal)
    }
  }, 5000)
}

function addKeyboardNavigation(items) {
  let currentIndex = -1
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
      currentIndex++
      focusItem(items[currentIndex])
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      currentIndex--
      focusItem(items[currentIndex])
    } else if (e.key === 'Enter' && currentIndex >= 0) {
      items[currentIndex].click()
    }
  })
}

function focusItem(item) {
  // Remove focus from other items
  document.querySelectorAll('.trending-item.focused').forEach(el => {
    el.classList.remove('focused')
  })
  
  // Add focus to current item
  item.classList.add('focused')
  item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}

// Add CSS for keyboard focus
const style = document.createElement('style')
style.textContent = `
  .trending-item.focused {
    outline: 3px solid #e50914;
    outline-offset: 2px;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .modal-header {
    padding: 20px 20px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #333;
  }
  
  .modal-body {
    padding: 20px;
    line-height: 1.6;
  }
  
  .modal-footer {
    padding: 10px 20px 20px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s ease;
  }
  
  .close-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .btn-primary, .btn-secondary {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
  }
  
  .btn-primary {
    background: #e50914;
    color: white;
  }
  
  .btn-primary:hover {
    background: #f40612;
  }
  
  .btn-secondary {
    background: transparent;
    color: white;
    border: 1px solid #666;
  }
  
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`
document.head.appendChild(style)

// Enhanced Trending Now Section with Optimized Loading
let trendingInitialized = false;

// Multiple initialization attempts to ensure it loads
document.addEventListener("DOMContentLoaded", () => {
  initTrendingSection();
});

// Backup initialization after window load
window.addEventListener("load", () => {
  if (!trendingInitialized) {
    setTimeout(() => initTrendingSection(), 50);
  }
});

// Third backup - intersection observer for when section comes into view
const trendingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !trendingInitialized) {
      initTrendingSection();
    }
  });
}, { threshold: 0.1 });

// Observe the trending section
setTimeout(() => {
  const trendingSection = document.querySelector('.trending-section');
  if (trendingSection) {
    trendingObserver.observe(trendingSection);
  }
}, 100);

function initTrendingSection() {
  const trendingItems = document.querySelectorAll('.trending-item');
  const carousel = document.querySelector('.trending-carousel');
  const track = document.querySelector('.trending-carousel-track');
  
  if (trendingItems.length === 0 || trendingInitialized) {
    return;
  }

  console.log(`🎬 Initializing trending section with ${trendingItems.length} items`);
  
  // Mark as initialized to prevent multiple runs
  trendingInitialized = true;

  // Start animation immediately
  if (track) {
    track.style.animation = 'scrollHorizontal 30s linear infinite';
    track.style.willChange = 'transform';
  }

  // Add animation control buttons
  if (carousel) {
    addAnimationControls(carousel);
  }

  trendingItems.forEach((item, index) => {
    // Remove any existing animation delays
    item.style.animationDelay = '0s';
    item.classList.add('animate-on-scroll', 'trending-ready');
    
    // Preload images for faster display
    const img = item.querySelector('.trending-poster');
    if (img) {
      // Create a new image to preload
      const preloadImg = new Image();
      preloadImg.onload = () => {
        item.classList.add('image-loaded');
        img.style.opacity = '1';
      };
      preloadImg.onerror = (e) => {
        console.warn('Image failed to load:', img.src);
        // Use a reliable fallback image
        img.src = `https://via.placeholder.com/280x400/333333/ffffff?text=${encodeURIComponent(item.querySelector('h3')?.textContent || 'Movie')}`;
      };
      preloadImg.src = img.src;
      
      // Set initial opacity
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
    }
    
    // Enhanced hover effects with proper overlay display
    item.addEventListener('mouseenter', () => {
      if (track) {
        track.style.animationPlayState = 'paused';
      }
      item.style.zIndex = '100';
      
      // Ensure overlay is visible
      const overlay = item.querySelector('.trending-overlay');
      if (overlay) {
        overlay.style.opacity = '1';
        overlay.style.transform = 'translateY(0)';
      }
      
      // Dim other items slightly
      trendingItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.style.opacity = '0.7';
          otherItem.style.transform = 'scale(0.95)';
        }
      });
    });
    
    item.addEventListener('mouseleave', () => {
      if (track) {
        track.style.animationPlayState = 'running';
      }
      item.style.zIndex = '1';
      
      // Hide overlay
      const overlay = item.querySelector('.trending-overlay');
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(100%)';
      }
      
      // Reset all items
      trendingItems.forEach((otherItem) => {
        otherItem.style.opacity = '1';
        otherItem.style.transform = 'scale(1)';
      });
    });
    
    // Add click handler with animation pause
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const contentId = item.dataset.contentId;
      const title = item.querySelector('h3')?.textContent || 'Unknown Title';
      const rating = item.querySelector('.trending-rating')?.textContent || 'N/A';
      const genre = item.querySelector('.trending-genre')?.textContent || 'Unknown';
      
      // Pause animation on click
      if (track) {
        track.style.animationPlayState = 'paused';
        setTimeout(() => {
          if (track.style.animationPlayState === 'paused') {
            track.style.animationPlayState = 'running';
          }
        }, 3000);
      }
      
      // Add visual feedback
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        item.style.transform = '';
      }, 150);
      
      showContentAlert(title, contentId, rating, genre);
    });
  });
  
  // Add visibility control
  addVisibilityControl();
  
  console.log(`✅ Trending section initialized successfully!`);
}

function addAnimationControls(carousel) {
  // Create control panel
  const controlPanel = document.createElement('div');
  controlPanel.className = 'animation-controls';
  // controlPanel.innerHTML = `
  //   <div class="control-buttons">
  //     <button class="control-btn" data-action="play" title="Play">▶️</button>
  //     <button class="control-btn" data-action="pause" title="Pause">⏸️</button>
  //     <button class="control-btn" data-action="slow" title="Slow">🐌</button>
  //     <button class="control-btn" data-action="fast" title="Fast">🚀</button>
  //     <button class="control-btn" data-action="reverse" title="Reverse">↩️</button>
  //     <button class="control-btn" data-action="bounce" title="Bounce">🏀</button>
  //   </div>
  // `;
  
  // Add styles for control panel
  controlPanel.style.cssText = `
    position: absolute;
    top: 10px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 25px;
    padding: 8px 15px;
    display: flex;
    gap: 8px;
    backdrop-filter: blur(10px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
  `;
  
  // Show controls on carousel hover
  carousel.addEventListener('mouseenter', () => {
    controlPanel.style.opacity = '1';
  });
  
  carousel.addEventListener('mouseleave', () => {
    controlPanel.style.opacity = '0';
  });
  
  // Add control functionality
  const track = carousel.querySelector('.trending-carousel-track');
  const buttons = controlPanel.querySelectorAll('.control-btn');
  
  buttons.forEach(button => {
    button.style.cssText = `
      background: none;
      border: none;
      font-size: 14px;
      cursor: pointer;
      padding: 5px 8px;
      border-radius: 15px;
      transition: all 0.3s ease;
    `;
    
    button.addEventListener('mouseenter', () => {
      button.style.background = 'rgba(229, 9, 20, 0.2)';
      button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.background = 'none';
      button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      
      // Reset classes
      carousel.classList.remove('slow', 'fast', 'reverse', 'bounce', 'wave');
      
      switch(action) {
        case 'play':
          track.style.animationPlayState = 'running';
          break;
        case 'pause':
          track.style.animationPlayState = 'paused';
          break;
        case 'slow':
          carousel.classList.add('slow');
          track.style.animationPlayState = 'running';
          break;
        case 'fast':
          carousel.classList.add('fast');
          track.style.animationPlayState = 'running';
          break;
        case 'reverse':
          carousel.classList.add('reverse');
          track.style.animationPlayState = 'running';
          break;
        case 'bounce':
          carousel.classList.add('bounce');
          track.style.animationPlayState = 'running';
          break;
      }
      
      // Visual feedback
      button.style.background = 'rgba(229, 9, 20, 0.5)';
      setTimeout(() => {
        button.style.background = 'rgba(229, 9, 20, 0.2)';
      }, 200);
    });
  });
  
  carousel.style.position = 'relative';
  carousel.appendChild(controlPanel);
}

// Add intersection observer to pause animation when not visible
function addVisibilityControl() {
  const carousel = document.querySelector('.trending-carousel');
  const track = document.querySelector('.trending-carousel-track');
  
  if (!carousel || !track) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        track.style.animationPlayState = 'running';
      } else {
        track.style.animationPlayState = 'paused';
      }
    });
  }, {
    threshold: 0.1
  });
  
  observer.observe(carousel);
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initTrendingSection()
    addVisibilityControl()
  }, 100)
})