// Mobile Shop Website - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Configuration
  const config = {
    whatsappNumber: '+918808889992', // Replace with your WhatsApp number
    phoneNumber: '+918808889992'     // Replace with your phone number
  };

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
      if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Navbar scroll effects
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Background opacity based on scroll
    if (scrollTop > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active navigation highlighting
  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  // Product category filtering
  const categoryBtns = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (categoryBtns.length && productCards.length) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const category = this.getAttribute('data-category');

        // Filter products with animation
        productCards.forEach((card, index) => {
          card.style.transition = 'all 0.3s ease';

          if (category === 'all' || card.getAttribute('data-category') === category) {
            setTimeout(() => {
              card.style.display = 'block';
              card.classList.remove('hidden');
              card.classList.add('visible');
            }, index * 50);
          } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Enhanced product order functionality
  document.querySelectorAll('.btn-product').forEach((button, index) => {
    button.addEventListener('click', function () {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.product-price').textContent;
      const productDescription = productCard.querySelector('p:not(.product-price)').textContent;

      const message = `🛍️ *Product Inquiry*

*Product:* ${productName}
*Price Range:* ${productPrice}
*Description:* ${productDescription}

Hi! I'm interested in this product. Please provide more details about:
- Available models/variants
- Exact pricing
- Availability
- Warranty details

Thank you!`;

      const encodedMessage = encodeURIComponent(message);

      // Add loading state
      button.classList.add('loading');
      button.textContent = 'Opening WhatsApp...';

      setTimeout(() => {
        window.open(`https://wa.me/${config.whatsappNumber.replace('+', '')}?text=${encodedMessage}`, '_blank');
        button.classList.remove('loading');
        button.textContent = 'Order Now';
      }, 1000);
    });
  });

  // Contact form handling
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const phone = this.querySelector('input[type="tel"]').value;
      const serviceType = this.querySelector('select').value;
      const message = this.querySelector('textarea').value;

      // Basic validation
      if (!name || !email || !message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      // Submit button loading state
      const submitBtn = this.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Sending...';

      // Create WhatsApp message
      const whatsappMessage = `📝 *Contact Form Submission*

*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || 'Not provided'}
*Service Type:* ${serviceType || 'General Inquiry'}

*Message:*
${message}

Please respond to this inquiry at your earliest convenience.`;

      const encodedWhatsAppMessage = encodeURIComponent(whatsappMessage);

      // Simulate form processing
      setTimeout(() => {
        // Open WhatsApp
        window.open(`https://wa.me/${config.whatsappNumber.replace('+', '')}?text=${encodedWhatsAppMessage}`, '_blank');

        // Reset form and button
        this.reset();
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;

        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      }, 2000);
    });
  }

  // Service booking from hero section
  document.querySelector('a[href="#contact"]')?.addEventListener('click', function (e) {
    e.preventDefault();

    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Pre-fill service type
      setTimeout(() => {
        const serviceSelect = document.querySelector('#contactForm select');
        if (serviceSelect) {
          serviceSelect.value = 'repair';
          serviceSelect.focus();
        }
      }, 1000);
    }
  });

  // Enhanced phone call handling
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function (e) {
      // For desktop, show confirmation
      if (window.innerWidth > 768) {
        const confirmed = confirm(`Call ${this.textContent}?`);
        if (!confirmed) {
          e.preventDefault();
        }
      }
    });
  });

  // Back to top button
  const backToTopButton = document.querySelector('#backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    backToTopButton.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.service-card, .product-card, .info-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });

  // Floating action buttons enhanced functionality
  const whatsappFloat = document.querySelector('.whatsapp-float');
  const callFloat = document.querySelector('.call-float');

  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function (e) {
      e.preventDefault();

      const defaultMessage = `👋 Hi! I found your mobile shop online and I'm interested in your services.

I would like to know more about:
- Repair services
- Available accessories
- Pricing

Please let me know your availability. Thank you!`;

      const encodedMessage = encodeURIComponent(defaultMessage);
      window.open(`https://wa.me/${config.whatsappNumber.replace('+', '')}?text=${encodedMessage}`, '_blank');
    });
  }

  // Loading animation for buttons
  document.querySelectorAll('.btn').forEach(button => {
    if (!button.classList.contains('btn-product') && button.type !== 'submit') {
      button.addEventListener('click', function () {
        if (!this.classList.contains('loading')) {
          const originalText = this.textContent;
          this.classList.add('loading');
          this.textContent = 'Loading...';

          setTimeout(() => {
            this.classList.remove('loading');
            this.textContent = originalText;
          }, 1500);
        }
      });
    }
  });

  // Scroll event listeners with debouncing
  let scrollTimeout;
  window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(highlightNavigation, 10);
  });

  // Search functionality (if search input is added)
  const searchInput = document.querySelector('#searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();

      productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productDesc = card.querySelector('p:not(.product-price)').textContent.toLowerCase();

        if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Notification system
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;

    // Add notification styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Add CSS animations for notifications
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification button {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }
        .notification button:hover {
            background: rgba(255,255,255,0.2);
        }
    `;
  document.head.appendChild(notificationStyles);

  // Performance optimization
  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalculate positions if needed
      highlightNavigation();
    }, 250);
  });

  // Initialize everything
  highlightNavigation();

  // Show welcome message
  setTimeout(() => {
    showNotification('Welcome to TechFix Mobile Shop! 📱', 'success');
  }, 2000);
});

// Service Worker for PWA (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(function (registration) {
        console.log('SW registered: ', registration);
      })
      .catch(function (registrationError) {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Error handling
window.addEventListener('error', function (e) {
  console.error('JavaScript Error:', e.error);
});

// Utility functions
const utils = {
  // Format phone number
  formatPhoneNumber: function (phone) {
    return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  },

  // Validate email
  validateEmail: function (email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  // Get device type
  getDeviceType: function () {
    const width = window.innerWidth;
    if (width <= 480) return 'mobile';
    if (width <= 768) return 'tablet';
    return 'desktop';
  }
};

// Export utils for external use if needed
window.MobileShopUtils = utils;
