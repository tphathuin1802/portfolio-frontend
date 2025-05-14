// Arrow icon chuyển section
function scrollToNextSection(el) {
  let section = el.closest("section");
  if (section) {
    let next = section.nextElementSibling;
    // Lặp đến khi gặp section tiếp theo
    while (
      next &&
      (next.nodeType !== 1 || next.tagName.toLowerCase() !== "section")
    ) {
      next = next.nextElementSibling;
    }
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Animation configuration
const ANIMATION = {
  THRESHOLD: 0.1,
  ROOT_MARGIN: "0px",
};

// Animation observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: Unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: ANIMATION.THRESHOLD,
    rootMargin: ANIMATION.ROOT_MARGIN,
  }
);

// Initialize animations
function initAnimations() {
  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Add animation classes to elements
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.add("scale-in");
  });

  // Add fade-in to specific elements
  document.querySelectorAll(".fade-in-element").forEach((element) => {
    element.classList.add("fade-in");
  });

  // Add slide-up to specific elements
  document.querySelectorAll(".slide-up-element").forEach((element) => {
    element.classList.add("slide-up");
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for fade-in elements
  const fadeElements = document.querySelectorAll(".fade-in-element");
  const slideElements = document.querySelectorAll(".slide-up-element");
  const scaleElements = document.querySelectorAll(".scale-in-element");

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animation elements
  fadeElements.forEach((el) => observer.observe(el));
  slideElements.forEach((el) => observer.observe(el));
  scaleElements.forEach((el) => observer.observe(el));

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileMenuBtn.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("active").toString()
      );
    });
  }

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add("active");
        } else {
          navLink.classList.remove("active");
        }
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);

  // Arrow Down Button scroll behavior
  const arrowBtn = document.getElementById("arrowDownBtn");
  if (arrowBtn) {
    let lastClick = 0;
    arrowBtn.addEventListener("click", function (e) {
      const now = Date.now();
      if (now - lastClick < 300) return; // ignore if double click
      lastClick = now;
      // Scroll to next section
      const hero = document.getElementById("home");
      let nextSection = hero && hero.nextElementSibling;
      while (nextSection && nextSection.tagName !== "SECTION") {
        nextSection = nextSection.nextElementSibling;
      }
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
    arrowBtn.addEventListener("dblclick", function (e) {
      // Scroll to footer
      const footer = document.querySelector("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
