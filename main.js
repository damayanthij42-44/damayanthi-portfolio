/* =========================================================
   DAMAYANTHI J – PORTFOLIO JAVASCRIPT
   Features: Navbar, Typewriter, Scroll Reveal,
             PDF Modal, Zoom, Back to Top, Hamburger
   ========================================================= */

'use strict';

// =============================================
// 1. NAVBAR – scroll shrink + active section
// =============================================
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll-based navbar class
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveSection();
    toggleBackToTop();
  }

  // Highlight active nav link by scroll position
  function highlightActiveSection() {
    let current = '';
    sections.forEach(section => {
      const sectionTop    = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

  // Smooth scroll via nav links + close mobile menu
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
          const top    = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
        closeMobileMenu();
      }
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
})();

// =============================================
// 2. HAMBURGER MENU
// =============================================
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMobileMenu();
    }
  });
})();

function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}

// =============================================
// 3. TYPEWRITER ANIMATION
// =============================================
(function initTypewriter() {
  const el     = document.getElementById('typewriter');
  const texts  = [
    'Aspiring IT Professional',
    'Web Developer',
    'AI Enthusiast',
    'Problem Solver'
  ];

  let textIndex    = 0;
  let charIndex    = 0;
  let isDeleting   = false;
  let pauseMs      = 0;

  function type() {
    const current = texts[textIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    el.textContent = current.substring(0, charIndex);

    let speed = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === current.length) {
      // Finished typing – pause before delete
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting – move to next
      isDeleting = false;
      textIndex  = (textIndex + 1) % texts.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  // Start after a short delay
  setTimeout(type, 800);
})();

// =============================================
// 4. SCROLL REVEAL ANIMATION
// =============================================
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el, i) => {
    // Stagger delay based on position within parent
    const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
    const idx      = siblings.indexOf(el);
    el.style.transitionDelay = `${idx * 0.08}s`;
    observer.observe(el);
  });
})();

// =============================================
// 5. BACK TO TOP BUTTON
// =============================================
function toggleBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// =============================================
// 6. CERTIFICATE / PDF MODAL
// =============================================
(function initModal() {
  const overlay     = document.getElementById('certModal');
  const closeBtn    = document.getElementById('modalClose');
  const title       = document.getElementById('modalTitle');
  const frame       = document.getElementById('certFrame');
  const placeholder = document.getElementById('pdfPlaceholder');
  const pathHint    = document.getElementById('pdfPathHint');
  const downloadBtn = document.getElementById('modalDownload');
  const zoomInBtn   = document.getElementById('zoomIn');
  const zoomOutBtn  = document.getElementById('zoomOut');
  const zoomLabel   = document.getElementById('zoomLevel');

  // Zoom levels as PDF URL hash values (browser-native PDF zoom)
  // 'page-fit' = fit whole page; numbers = percentage zoom
  const ZOOM_LEVELS = [50, 67, 75, 'page-fit', 100, 125, 150, 175, 200];
  let zoomIndex = 3; // start at 'page-fit'
  let currentPdfPath = '';

  // Build the iframe src with the zoom hash appended
  function buildSrc(path, zoom) {
    // Strip any existing hash first
    const base = path.split('#')[0];
    if (zoom === 'page-fit') {
      // 'page-fit' works in Chrome/Edge; Firefox uses FitH – we append both hints
      return base + '#zoom=page-fit&view=FitH';
    }
    return base + '#zoom=' + zoom;
  }

  // Reload iframe with the current zoom level
  function applyZoom() {
    const zoom = ZOOM_LEVELS[zoomIndex];
    const displayLabel = zoom === 'page-fit' ? 'Fit' : zoom + '%';
    zoomLabel.textContent = displayLabel;

    // Reloading src triggers the PDF viewer to re-render at new zoom
    frame.src = buildSrc(currentPdfPath, zoom);
  }

  // Open modal – called from HTML onclick attributes
  window.openCertModal = function(pdfPath, certTitle) {
    title.textContent    = certTitle || 'Certificate';
    downloadBtn.href     = pdfPath;
    downloadBtn.download = '';
    currentPdfPath       = pdfPath;
    zoomIndex            = 3; // reset to 'page-fit' on every open

    // Show placeholder until iframe confirms load
    placeholder.style.display = 'flex';
    frame.style.display       = 'none';
    pathHint.textContent      = pdfPath;
    zoomLabel.textContent     = 'Fit';

    frame.src = buildSrc(pdfPath, ZOOM_LEVELS[zoomIndex]);

    frame.onload = function() {
      placeholder.style.display = 'none';
      frame.style.display       = 'block';
    };

    frame.onerror = function() {
      placeholder.style.display = 'flex';
      frame.style.display       = 'none';
    };

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      frame.src                 = '';
      frame.style.display       = 'none';
      placeholder.style.display = 'flex';
      currentPdfPath            = '';
    }, 300);
  }

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });

  // Zoom In
  zoomInBtn.addEventListener('click', () => {
    if (zoomIndex < ZOOM_LEVELS.length - 1) {
      zoomIndex++;
      applyZoom();
    }
  });

  // Zoom Out
  zoomOutBtn.addEventListener('click', () => {
    if (zoomIndex > 0) {
      zoomIndex--;
      applyZoom();
    }
  });

  // Keyboard zoom: + / -
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === '+' || e.key === '=') {
      if (zoomIndex < ZOOM_LEVELS.length - 1) { zoomIndex++; applyZoom(); }
    }
    if (e.key === '-') {
      if (zoomIndex > 0) { zoomIndex--; applyZoom(); }
    }
  });

})();

// =============================================
// 7. SKILL CARDS – entrance animation tweak
// =============================================
(function initSkillCards() {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      card.style.transitionDelay = '0s';
    });
  });
})();

// =============================================
// 8. PROJECT CARDS – subtle glow on hover
// =============================================
(function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const dx     = (x - cx) / cx;
      const dy     = (y - cy) / cy;
      card.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(124,58,237,0.07) 0%,
          rgba(255,255,255,0.03) 60%
        )
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();

// =============================================
// 9. INTERNSHIP CARD – glow on hover
// =============================================
(function initInternCards() {
  const cards = document.querySelectorAll('.internship-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(124,58,237,0.06) 0%,
          rgba(255,255,255,0.03) 70%
        )
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();

// =============================================
// 10. PAGE LOAD – initial hero animation
// =============================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Ensure hero content is visible
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'fadeInUp 0.9s ease both';
  }
});
