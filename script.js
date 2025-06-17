document.addEventListener("DOMContentLoaded", function() {
  // Preloader
  const preloader = document.querySelector(".preloader");
  
  function hidePreloader() {
    preloader.style.opacity = "0";
    setTimeout(function() {
      preloader.style.display = "none";
    }, 500);
  }
  
  setTimeout(hidePreloader, 1500);

  // Mobile menu toggle
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", function() {
      navbarCollapse.classList.toggle("show");
    });
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      const headerHeight = document.querySelector(".header").offsetHeight;
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: "smooth"
        });
      }
      
      if (targetId && targetId.classList.contains("show")) {
        targetId.classList.remove("show");
      }
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  
  function updateActiveNav() {
    let scrollPosition = window.scrollY + 100;
    
    sections.forEach(function(section) {
      if (section.offsetTop <= scrollPosition && 
          section.offsetTop + section.offsetHeight > scrollPosition) {
        
        let sectionId = ("#" + section.getAttribute("id")).toLowerCase();
        if (!sectionId.startsWith("#")) {
          sectionId = "#" + sectionId;
        }
        
        navLinks.forEach(function(link) {
          link.classList.remove("active");
          if (link.getAttribute("href").toLowerCase() === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  
  window.addEventListener("scroll", function() {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        updateActiveNav();
      }, 100);
    };
  }());
  
  updateActiveNav();

  // Sticky header
  const header = document.querySelector(".header");
  
  function toggleStickyHeader() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  
  window.addEventListener("scroll", toggleStickyHeader);
  toggleStickyHeader();

  // Counter animation
  const aboutSection = document.querySelector("#about");
  const statNumbers = document.querySelectorAll(".stat-number");
  let counted = false;
  
  if (aboutSection && statNumbers.length) {
    const observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !counted) {
        statNumbers.forEach(function(number) {
          const target = parseInt(number.getAttribute("data-target"));
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;
          
          const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
              clearInterval(timer);
              number.textContent = target;
            } else {
              number.textContent = Math.floor(current);
            }
          }, 16);
        });
        
        counted = true;
        observer.unobserve(aboutSection);
      }
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
  }

  // Form validation
  const forms = document.querySelectorAll("form");
  
  forms.forEach(function(form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Validate required fields
      form.querySelectorAll("[required]").forEach(function(input) {
        if (!input.value.trim()) {
          input.classList.add("is-invalid");
          isValid = false;
        }
        input.classList.remove("is-invalid");
      });
      
      // Validate phone number
      const phoneInput = form.querySelector('input[type="tel"]');
      if (phoneInput && !/^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(phoneInput.value)) {
        phoneInput.classList.add("is-invalid");
        isValid = false;
      }
      
      // If form is valid
      if (isValid) {
        const successModal = document.querySelector("#successModal");
        if (successModal) {
          const modal = new bootstrap.Modal(successModal);
          modal.show();
          setTimeout(function() {
            modal.hide();
          }, 5000);
        }
        form.reset();
      }
    });
  });

  // Modal triggers
  const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"]');
  
  modalTriggers.forEach(function(trigger) {
    trigger.addEventListener("click", function() {
      const targetId = this.getAttribute("data-bs-target");
      const modal = document.querySelector(targetId);
      if (modal) {
        new bootstrap.Modal(modal).show();
      }
    });
  });

  // Swiper sliders
  const heroSlider = new Swiper(".hero-slider", {
    loop: true,
    effect: "fade",
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });

  const testimonialsSlider = new Swiper(".testimonials-slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      },
      992: {
        slidesPerView: 3
      }
    }
  });

  const partnersSlider = new Swiper(".partners-slider", {
    loop: true,
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    breakpoints: {
      576: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 6
      }
    }
  });

  // Animate elements on load
  window.addEventListener("load", function() {
    const animateElements = document.querySelectorAll(".animate-fadeIn");
    animateElements.forEach(function(element, index) {
      element.classList.add("animate-fadeIn");
      element.style.animationDelay = (100 * index + 100) + "ms";
    });
  });
});