(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     TRANSLATIONS
  ═══════════════════════════════════════════ */
  const T = {
    en: {
      'nav.home': 'HOME',
      'nav.menu': 'MENU',
      'nav.book': 'RESERVATIONS',
      'nav.location': 'LOCATION',
      'nav.gallery': 'GALLERY',
      'nav.cta': 'BOOK A TABLE',

      'gallery.hero.eyebrow': 'GALLERY',
      'gallery.title': 'THE NOCTA ARCHIVE',
      'gallery.subtitle': 'Moments. Energy. Atmosphere.',
      'gallery.filter.all': 'ALL',
      'gallery.filter.events': 'EVENTS',
      'gallery.filter.vip': 'VIP',
      'gallery.filter.crowd': 'CROWD',
      'gallery.featured.eyebrow': 'FEATURED',
      'gallery.featured.title': 'FRIDAY NIGHTS<br>AT NOCTA',
      'gallery.featured.cta': 'VIEW GALLERY',
      'gallery.loadmore': 'LOAD MORE',

      'footer.book': 'BOOK A TABLE',
      'footer.copy': '© 2026 Nocta. All rights reserved.',
      'footer.privacy': 'PRIVACY POLICY',
      'footer.terms': 'TERMS & CONDITIONS'
    },
    ro: {
      'nav.home': 'ACASĂ',
      'nav.menu': 'MENIU',
      'nav.book': 'REZERVĂRI',
      'nav.location': 'LOCAȚIE',
      'nav.gallery': 'GALERIE',
      'nav.cta': 'REZERVĂ O MASĂ',

      'gallery.hero.eyebrow': 'GALERIE',
      'gallery.title': 'ARHIVA NOCTA',
      'gallery.subtitle': 'Momente. Energie. Atmosferă.',
      'gallery.filter.all': 'TOATE',
      'gallery.filter.events': 'EVENIMENTE',
      'gallery.filter.vip': 'VIP',
      'gallery.filter.crowd': 'PUBLIC',
      'gallery.featured.eyebrow': 'RECOMANDAT',
      'gallery.featured.title': 'VINERI NOAPTEA<br>LA NOCTA',
      'gallery.featured.cta': 'VEZI GALERIA',
      'gallery.loadmore': 'ÎNCARCĂ MAI MULTE',

      'footer.book': 'REZERVĂ O MASĂ',
      'footer.copy': '© 2026 Nocta. Toate drepturile rezervate.',
      'footer.privacy': 'POLITICA DE CONFIDENȚIALITATE',
      'footer.terms': 'TERMENI ȘI CONDIȚII'
    }
  };

  /* ═══════════════════════════════════════════
     STATE
  ═══════════════════════════════════════════ */
  let lang = localStorage.getItem('nocta_lang') || 'en';

  /* ═══════════════════════════════════════════
     DOM REFS
  ═══════════════════════════════════════════ */
  const $loader       = document.getElementById('loader');
  const $navbar       = document.getElementById('navbar');
  const $hamburger    = document.getElementById('nav-hamburger');
  const $mobileOverlay= document.getElementById('mobile-nav-overlay');
  const $langToggle   = document.getElementById('lang-toggle');
  const $langCurrent  = document.getElementById('lang-current');
  const $langDropdown = document.getElementById('lang-dropdown');
  const $cursorGlow   = document.getElementById('cursor-glow');
  const $lightbox     = document.getElementById('lightbox');
  const $lightboxImg   = document.getElementById('lightbox-img');

  /* ═══════════════════════════════════════════
     LOADER
  ═══════════════════════════════════════════ */
  function removeLoader() {
    if ($loader && !$loader.classList.contains('loaded')) {
      $loader.classList.add('loaded');
      setTimeout(() => {
        initReveal();
      }, 400);
    }
  }

  window.addEventListener('load', removeLoader);
  // Fail-safe: remove loader after 4s anyway
  setTimeout(removeLoader, 4000);

  /* ═══════════════════════════════════════════
     INTERNATIONALIZATION (i18n)
  ═══════════════════════════════════════════ */
  function setLang(newLang) {
    lang = newLang;
    localStorage.setItem('nocta_lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (T[lang] && T[lang][key]) {
        el.innerHTML = T[lang][key];
      }
    });

    if ($langCurrent) $langCurrent.textContent = lang.toUpperCase();
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    closeLangDropdown();
  }

  function toggleLangDropdown() {
    $langDropdown?.classList.toggle('active');
  }

  function closeLangDropdown() {
    $langDropdown?.classList.remove('active');
  }

  $langToggle?.addEventListener('click', e => {
    e.stopPropagation();
    toggleLangDropdown();
  });

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const newLang = opt.getAttribute('data-lang');
      setLang(newLang);
    });
  });

  document.addEventListener('click', closeLangDropdown);

  setLang(lang);

  /* ═══════════════════════════════════════════
     MOBILE NAV
  ═══════════════════════════════════════════ */
  function toggleMobileNav() {
    $hamburger?.classList.toggle('active');
    $mobileOverlay?.classList.toggle('active');
    document.body.style.overflow = $mobileOverlay?.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileNav() {
    $hamburger?.classList.remove('active');
    $mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  $hamburger?.addEventListener('click', toggleMobileNav);
  $mobileOverlay?.addEventListener('click', e => {
    if (e.target === $mobileOverlay) closeMobileNav();
  });

  /* ═══════════════════════════════════════════
     GALLERY FILTERING
  ═══════════════════════════════════════════ */
  const $filters = document.querySelectorAll('.filter-btn');
  const $items   = document.querySelectorAll('.gallery-card');

  $filters.forEach(btn => {
    btn.addEventListener('click', () => {
      $filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      $items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ═══════════════════════════════════════════
     LIGHTBOX
  ═══════════════════════════════════════════ */
  window.openLightbox = function(el) {
    const img = el.querySelector('img');
    if ($lightbox && $lightboxImg && img) {
      $lightboxImg.src = img.src;
      $lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeLightbox = function() {
    if ($lightbox) {
      $lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  /* ═══════════════════════════════════════════
     SCROLL EFFECTS
  ═══════════════════════════════════════════ */
  window.addEventListener('scroll', () => {
    if ($navbar) {
      if (window.scrollY > 50) $navbar.classList.add('scrolled');
      else $navbar.classList.remove('scrolled');
    }
  });

  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up, .reveal-in').forEach(el => observer.observe(el));
  }

  /* ═══════════════════════════════════════════
     CURSOR GLOW
  ═══════════════════════════════════════════ */
  window.addEventListener('mousemove', e => {
    if ($cursorGlow) {
      $cursorGlow.style.left = e.clientX + 'px';
      $cursorGlow.style.top  = e.clientY + 'px';
    }
  });

  initReveal();

})();