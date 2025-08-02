document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".content-carousel");

  carousels.forEach((carousel) => {
    // Configuration
    const config = {
      scrollSpeed: parseInt(carousel.dataset.scrollSpeed) || 2, // pixels per frame
      scrollInterval: 20, // milliseconds between frames
      pauseOnHover: true,
      pauseAtEnd: 2000, // milliseconds to pause at end
      rewindSpeed: 50, // speed when rewinding to start
      direction: 'left', // or 'right' for RTL languages
      responsive: {
        mobile: {
          enabled: false,
          breakpoint: 768
        }
      }
    };

    // State management
    let state = {
      interval: null,
      isPaused: false,
      isAtEnd: false,
      isMobile: window.innerWidth < config.responsive.mobile.breakpoint
    };

    // Initialize carousel
    const initCarousel = () => {
      addNavigation();
      startAutoScroll();
      setupEventListeners();
    };

    // Auto-scroll functionality
    const startAutoScroll = () => {
      if (state.isMobile && !config.responsive.mobile.enabled) return;
      
      state.interval = setInterval(() => {
        if (state.isPaused) return;
        
        const isNearEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 10;
        
        if (isNearEnd && !state.isAtEnd) {
          handleEndReached();
          return;
        }
        
        if (state.isAtEnd) return;
        
        carousel.scrollLeft += config.direction === 'left' ? config.scrollSpeed : -config.scrollSpeed;
      }, config.scrollInterval);
    };

    const handleEndReached = () => {
      state.isAtEnd = true;
      clearInterval(state.interval);
      
      setTimeout(() => {
        rewindCarousel();
      }, config.pauseAtEnd);
    };

    const rewindCarousel = () => {
      const rewindInterval = setInterval(() => {
        if (carousel.scrollLeft <= 0) {
          clearInterval(rewindInterval);
          state.isAtEnd = false;
          startAutoScroll();
          return;
        }
        carousel.scrollLeft -= config.rewindSpeed;
      }, config.scrollInterval);
    };

    const stopAutoScroll = () => {
      clearInterval(state.interval);
    };

    // Navigation controls
    const addNavigation = () => {
      if (state.isMobile) return;
      
      const prevBtn = document.createElement('button');
      prevBtn.className = 'carousel-nav prev';
      prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevBtn.ariaLabel = 'Previous items';
      prevBtn.addEventListener('click', () => manualScroll(-1));
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'carousel-nav next';
      nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextBtn.ariaLabel = 'Next items';
      nextBtn.addEventListener('click', () => manualScroll(1));
      
      carousel.parentNode.appendChild(prevBtn);
      carousel.parentNode.appendChild(nextBtn);
    };

    const manualScroll = (direction) => {
      stopAutoScroll();
      const scrollAmount = carousel.clientWidth * 0.8 * direction;
      carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      // Restart auto-scroll after manual interaction
      setTimeout(startAutoScroll, 5000);
    };

    // Event listeners
    const setupEventListeners = () => {
      if (config.pauseOnHover) {
        carousel.addEventListener('mouseenter', () => {
          state.isPaused = true;
        });
        
        carousel.addEventListener('mouseleave', () => {
          state.isPaused = false;
        });
      }
      
      // Touch events for mobile
      carousel.addEventListener('touchstart', () => {
        state.isPaused = true;
      });
      
      carousel.addEventListener('touchend', () => {
        setTimeout(() => {
          state.isPaused = false;
        }, 1000);
      });
      
      // Responsive behavior
      window.addEventListener('resize', () => {
        state.isMobile = window.innerWidth < config.responsive.mobile.breakpoint;
        if (state.isMobile && !config.responsive.mobile.enabled) {
          stopAutoScroll();
        } else {
          stopAutoScroll();
          startAutoScroll();
        }
      });
    };

    // Initialize
    initCarousel();

    // Cleanup on carousel removal
    return () => {
      stopAutoScroll();
      carousel.removeEventListener('mouseenter', () => {});
      carousel.removeEventListener('mouseleave', () => {});
    };
  });
});