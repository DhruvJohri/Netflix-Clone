// breadcrumb.js - Breadcrumb navigation component

class BreadcrumbNavigation {
  constructor(containerId) {
    this.containerId = containerId;
    this.breadcrumbs = [];
    this.init();
  }

  init() {
    this.generateBreadcrumbs();
    this.render();
  }

  generateBreadcrumbs() {
    // Get the current page filename from the URL or default to index
    let currentPage = this.getCurrentPage();
    
    this.breadcrumbs = [
      { label: 'Home', href: 'index.html', icon: 'fas fa-home' }
    ];

    // Add current page if it's not the home page
    if (currentPage && currentPage !== 'index.html') {
      const pageLabel = this.formatPageName(currentPage);
      this.breadcrumbs.push({
        label: pageLabel,
        href: currentPage,
        icon: this.getPageIcon(currentPage),
        isCurrent: true
      });
    }
  }

  getCurrentPage() {
    // Try to get the current page from the URL
    const url = window.location.href;
    const filename = url.split('/').pop().split('?')[0];
    
    // If we're on the home page or no filename, return null
    if (!filename || filename === '' || filename === 'index.html') {
      return null;
    }
    
    return filename;
  }

  formatPageName(filename) {
    // Remove .html extension and format the name
    const name = filename.replace('.html', '');
    
    // Convert kebab-case or snake_case to Title Case
    const formatted = name
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    // Handle special cases
    const specialCases = {
      'tvshows': 'TV Shows',
      'signin': 'Sign In',
      'signup': 'Sign Up',
      'register': 'Register',
      'contact-us': 'Contact Us',
      'terms-of-use': 'Terms of Use',
      'privacy-policy': 'Privacy Policy',
      'legal-notices': 'Legal Notices'
    };
    
    return specialCases[name] || formatted;
  }

  getPageIcon(filename) {
    // Return appropriate icons for different pages
    const iconMap = {
      'tvshows': 'fas fa-tv',
      'movies': 'fas fa-film',
      'home': 'fas fa-home',
      'signin': 'fas fa-sign-in-alt',
      'register': 'fas fa-user-plus',
      'contact-us': 'fas fa-envelope',
      'dashboard': 'fas fa-tachometer-alt'
    };
    
    const name = filename.replace('.html', '');
    return iconMap[name] || 'fas fa-file';
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) return;

    const breadcrumbHtml = this.breadcrumbs.map((crumb, index) => {
      const isLast = index === this.breadcrumbs.length - 1;
      const separator = isLast ? '' : '<span class="breadcrumb-separator">/</span>';
      
      if (isLast) {
        return `<span class="breadcrumb-item current">${crumb.icon ? `<i class="${crumb.icon}"></i>` : ''}${crumb.label}</span>${separator}`;
      } else {
        return `<a href="${crumb.href}" class="breadcrumb-item">${crumb.icon ? `<i class="${crumb.icon}"></i>` : ''}${crumb.label}</a>${separator}`;
      }
    }).join('');

    container.innerHTML = breadcrumbHtml;
  }

  update() {
    this.generateBreadcrumbs();
    this.render();
  }
}

// Initialize breadcrumb when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const breadcrumbContainer = document.querySelector('[data-breadcrumb]');
  if (breadcrumbContainer) {
    new BreadcrumbNavigation(breadcrumbContainer.id);
  }
});
