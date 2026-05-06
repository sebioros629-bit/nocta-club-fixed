(function () {
  'use strict';

  /* ═══════════════════════════════════════════
     TRANSLATIONS
     ═══════════════════════════════════════════ */
  const T = {
    en: {
      'loader.status': 'ENTERING THE VOID...',
      'nav.home': 'HOME',
      'nav.menu': 'MENU',
      'nav.book': 'RESERVATIONS',
      'nav.gallery': 'GALLERY',
      'nav.cta': 'BOOK A TABLE',

      'hero.eyebrow': 'THE ARCHIVE OF NIGHT',
      'hero.subtitle': 'Where quiet luxury meets the frequency of the future. Experience the standard of Baia Mare.',
      'hero.cta.book': 'BOOK EXPERIENCE',
      'hero.cta.menu': 'VIEW MENU',
      'hero.scroll': 'SCROLL TO DISCOVER',

      'about.eyebrow': 'OUR PHILOSOPHY',
      'about.title': 'QUIET LUXURY,<br>LOUD ENERGY',
      'about.desc': 'Nocta is more than a destination; it\'s a sensory sanctuary designed for those who seek exclusivity without pretension. From the custom-tuned acoustics to our curated beverage library, every detail is engineered for the perfect sequence.',
      'about.stat.vip': 'VIP SUITES',
      'about.stat.capacity': 'CAPACITY',

      'sequences.eyebrow': 'UPCOMING SEQUENCES',
      'sequences.title': 'BEYOND<br>THE LIMIT',
      'sequences.subtitle': 'The archive expands this season with international sounds.',
      'sequences.event1.desc': 'A night of pure energy and traditional infusion with the master of flow.',
      'sequences.event2.desc': 'High-contrast visuals paired with melodic house structures.',
      'sequences.event3.desc': 'Classic grooves filtered through modern luxury.',
      'sequences.cta': 'RESERVE SUITE',

      'menu.eyebrow': 'THE LIBRARY',
      'menu.title': 'CURATED TASTES',
      'menu.tab.glass': 'BY THE GLASS',
      'menu.tab.bottles': 'PROMO BY BOTTLE',
      'menu.tab.signature': 'SIGNATURE',
      'menu.full.desc': 'View our complete spirits library and vintage selections.',
      'menu.cta.full': 'DOWNLOAD FULL MENU',

      'book.title': 'SECURE YOUR<br>SEQUENCE',
      'book.desc': 'Experience Nocta from the comfort of our VIP suites. Prime tables are limited.',
      'form.name': 'NAME',
      'form.phone': 'PHONE',
      'form.date': 'DATE',
      'form.guests': 'GUESTS',
      'form.submit': 'REQUEST RESERVATION',
      'form.note': 'Your request will be confirmed via WhatsApp.',

      'footer.tagline': 'The standard of nightlife in Baia Mare.',
      'footer.col1': 'NAVIGATION',
      'footer.col2': 'LEGAL',
      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms & Conditions'
    },
    ro: {
      'loader.status': 'INTRĂM ÎN VID...',
      'nav.home': 'ACASĂ',
      'nav.menu': 'MENIU',
      'nav.book': 'REZERVĂRI',
      'nav.gallery': 'GALERIE',
      'nav.cta': 'REZERVĂ O MASĂ',

      'hero.eyebrow': 'ARHIVA NOPȚII',
      'hero.subtitle': 'Unde luxul discret întâlnește frecvența viitorului. Experimentează standardul din Baia Mare.',
      'hero.cta.book': 'REZERVĂ ACUM',
      'hero.cta.menu': 'VEZI MENIUL',
      'hero.scroll': 'SCROLL PENTRU EXPLORARE',

      'about.eyebrow': 'FILOZOFIA NOASTRĂ',
      'about.title': 'LUX DISCRET,<br>ENERGIE PURĂ',
      'about.desc': 'Nocta este mai mult decât o destinație; este un sanctuar senzorial conceput pentru cei care caută exclusivitate fără pretenții. De la acustica personalizată la biblioteca noastră de băuturi, fiecare detaliu este creat pentru secvența perfectă.',
      'about.stat.vip': 'SUITE VIP',
      'about.stat.capacity': 'CAPACITATE',

      'sequences.eyebrow': 'SECVENȚE VIITOARE',
      'sequences.title': 'DINCOLO DE<br>LIMITE',
      'sequences.subtitle': 'Arhiva se extinde în acest sezon cu sunete internaționale.',
      'sequences.event1.desc': 'O noapte de energie pură și infuzie tradițională cu maestrul flow-ului.',
      'sequences.event2.desc': 'Visualuri de înalt contrast asociate cu structuri house melodice.',
      'sequences.event3.desc': 'Groove-uri clasice filtrate prin luxul modern.',
      'sequences.cta': 'REZERVĂ MASĂ',

      'menu.eyebrow': 'BIBLIOTECA',
      'menu.title': 'GUSTURI CURATE',
      'menu.tab.glass': 'LA PAHAR',
      'menu.tab.bottles': 'PROMO STICLE',
      'menu.tab.signature': 'SIGNATURE',
      'menu.full.desc': 'Vezi biblioteca noastră completă de spirtoase și selecțiile vintage.',
      'menu.cta.full': 'DESCARCĂ MENIUL COMPLET',

      'book.title': 'ASIGURĂ-ȚI<br>SECVENȚA',
      'book.desc': 'Experimentează Nocta din confortul suitelor noastre VIP. Mesele premium sunt limitate.',
      'form.name': 'NUME',
      'form.phone': 'TELEFON',
      'form.date': 'DATA',
      'form.guests': 'PERSOANE',
      'form.submit': 'SOLICITĂ REZERVARE',
      'form.note': 'Solicitarea ta va fi confirmată prin WhatsApp.',

      'footer.tagline': 'Standardul vieții de noapte din Baia Mare.',
      'footer.col1': 'NAVIGARE',
      'footer.col2': 'LEGAL',
      'footer.privacy': 'Politică de Confidențialitate',
      'footer.terms': 'Termeni și Condiții'
    }
  };

  /* ═══════════════════════════════════════════
     STATE & CONFIG
     ═══════════════════════════════════════════ */
  let currentLang = localStorage.getItem('nocta_lang') || 'en';
  
  const MENU_DATA = {
    glass: [
      { name: 'CHIVAS REGAL 12 YO', detail: '40% / 0,04l', price: '25 RON' },
      { name: 'GLENFIDDICH 12 YO', detail: '40% / 0,04l', price: '35 RON' },
      { name: 'JACK DANIEL’S', detail: '40% / 0,04l', price: '25 RON' },
      { name: 'GREY GOOSE VODKA', detail: '40% / 0,04l', price: '35 RON' },
      { name: 'BELVEDERE VODKA', detail: '40% / 0,04l', price: '35 RON' },
      { name: 'HENDRICK’S GIN', detail: '41,4% / 0,04l', price: '35 RON' },
      { name: 'BUMBU RUM', detail: '40% / 0,04l', price: '35 RON' },
      { name: 'DON JULIO BLANCO', detail: '38% / 0,04l', price: '35 RON' }
    ],
    bottles: [
      { name: 'GREY GOOSE NIGHT 0,7l', detail: 'Vodka + 4 RedBull/Juice', price: '550 RON' },
      { name: 'BELVEDERE 0,7l', detail: 'Vodka + 4 RedBull/Juice', price: '550 RON' },
      { name: 'BUMBU RUM 0,7l', detail: 'Rum + 4 Pepsi', price: '500 RON' },
      { name: 'JACK DANIEL’S 0,7l', detail: 'Whiskey + 4 Pepsi', price: '450 RON' },
      { name: 'CLASE AZUL REPOSADO', detail: 'Tequila 0,7l', price: '2800 RON' },
      { name: 'DON JULIO 1942', detail: 'Tequila 0,7l', price: '2500 RON' }
    ],
    signature: [
      { name: 'PURPLE NEON', detail: 'Gin, Lavender, Tonic, Lime', price: '40 RON' },
      { name: 'NOCTA SPRITZ', detail: 'Prosecco, Elderflower, Mint', price: '35 RON' },
      { name: 'VELVET VOID', detail: 'Vodka, Raspberry, Egg White', price: '45 RON' }
    ]
  };

  /* ═══════════════════════════════════════════
     DOM ELEMENTS
     ═══════════════════════════════════════════ */
  const $loader = document.getElementById('loader');
  const $navbar = document.getElementById('navbar');
  const $hamburger = document.getElementById('nav-hamburger');
  const $mobileOverlay = document.getElementById('mobile-nav-overlay');
  const $langToggle = document.getElementById('lang-toggle');
  const $langDropdown = document.getElementById('lang-dropdown');
  const $langCurrent = document.getElementById('lang-current');
  const $menuGrid = document.getElementById('menu-grid');
  const $menuTabs = document.querySelectorAll('.menu-tab-btn');
  const $cursorGlow = document.getElementById('cursor-glow');

  /* ═══════════════════════════════════════════
     INITIALIZATION
     ═══════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    initI18n();
    initLoader();
    initNavigation();
    initMenu('glass');
    initAnimations();
    initHorizontalScroll();
    initCursorGlow();
  });

  /* ═══════════════════════════════════════════
     I18N (Localization)
     ═══════════════════════════════════════════ */
  function initI18n() {
    updateContent();

    $langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      $langDropdown.classList.toggle('active');
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.dataset.lang;
        currentLang = lang;
        localStorage.setItem('nocta_lang', lang);
        
        updateContent();
        
        // Update UI
        $langCurrent.textContent = lang.toUpperCase();
        document.querySelectorAll('.lang-option').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
        $langDropdown.classList.remove('active');
      });
    });

    document.addEventListener('click', () => $langDropdown.classList.remove('active'));
  }

  function updateContent() {
    const dict = T[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.innerHTML = dict[key];
    });
  }

  /* ═══════════════════════════════════════════
     LOADER
     ═══════════════════════════════════════════ */
  function initLoader() {
    let progress = 0;
    const $bar = document.getElementById('progress');
    
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(finishLoading, 500);
      }
      $bar.style.width = progress + '%';
    }, 200);
  }

  function finishLoading() {
    $loader.classList.add('loaded');
    document.body.classList.remove('loading');
    
    // Trigger initial reveals
    gsap.to('.reveal-up', {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.5
    });
  }

  /* ═══════════════════════════════════════════
     NAVIGATION
     ═══════════════════════════════════════════ */
  function initNavigation() {
    window.addEventListener('scroll', () => {
      $navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    $hamburger.addEventListener('click', () => {
      $mobileOverlay.classList.toggle('active');
      const isActive = $mobileOverlay.classList.contains('active');
      $hamburger.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        $mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ═══════════════════════════════════════════
     MENU LOGIC
     ═══════════════════════════════════════════ */
  function initMenu(category) {
    const items = MENU_DATA[category];
    $menuGrid.style.opacity = 0;
    
    setTimeout(() => {
      $menuGrid.innerHTML = items.map(item => `
        <div class="menu-item">
          <div class="item-main">
            <span class="item-name">${item.name}</span>
            <span class="item-detail">${item.detail}</span>
          </div>
          <span class="item-price">${item.price}</span>
        </div>
      `).join('');
      
      gsap.to($menuGrid, { opacity: 1, y: 0, duration: 0.5 });
    }, 300);

    $menuTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.tab;
        $menuTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        initMenu(cat);
      });
    });
  }

  /* ═══════════════════════════════════════════
     GSAP HORIZONTAL SCROLL
     ═══════════════════════════════════════════ */
  function initHorizontalScroll() {
    const container = document.querySelector('.horizontal-scroll-container');
    const inner = document.querySelector('.horizontal-inner');
    if (!container || !inner) return;

    const sections = gsap.utils.toArray('.scroll-slide');
    
    gsap.to(inner, {
      x: () => -(inner.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => "+=" + inner.scrollWidth,
        invalidateOnRefresh: true,
      }
    });

    // Parallax effect for images in slides
    sections.forEach(section => {
      const img = section.querySelector('img');
      if (img) {
        gsap.to(img, {
          x: 40,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            containerAnimation: gsap.getProperty(inner, "x"), // This is tricky in GSAP 3
            scrub: true
          }
        });
      }
    });
  }

  /* ═══════════════════════════════════════════
     CORE REVEALS & ANIMATIONS
     ═══════════════════════════════════════════ */
  function initAnimations() {
    // Parallax Hero
    gsap.to('.hero-image-layer', {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-in');
    revealElements.forEach(el => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        onEnter: () => el.classList.add('revealed')
      });
    });

    // Stats Counter
    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      ScrollTrigger.create({
        trigger: stat,
        onEnter: () => {
          let current = 0;
          const interval = setInterval(() => {
            current += Math.ceil(target / 20);
            if (current >= target) {
              stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
              clearInterval(interval);
            } else {
              stat.textContent = current + (stat.textContent.includes('+') ? '+' : '');
            }
          }, 40);
        }
      });
    });
  }

  /* ═══════════════════════════════════════════
     CURSOR GLOW
     ═══════════════════════════════════════════ */
  function initCursorGlow() {
    window.addEventListener('mousemove', (e) => {
      gsap.to($cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }

})();