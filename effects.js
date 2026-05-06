/* ═══════════════════════════════════════════════════════ */
/*  NOCTA THE CLUB — VISUAL EFFECTS ENGINE               */
/*  Canvas Particles, Lightning, Anti-Gravity Effects     */
/* ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Canvas Setup ───
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  let particles = [];
  let mouseX = -1000, mouseY = -1000;
  let animationId;
  let lastTime = 0;
  const FPS_TARGET = 60;
  const FRAME_DURATION = 1000 / FPS_TARGET;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', debounce(resize, 200));
  resize();

  // ─── Particle Class ───
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * W;
      this.y = H + Math.random() * 100;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 0.6 + 0.15); // Float upward (anti-gravity)
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.maxOpacity = this.opacity;
      this.fadeSpeed = Math.random() * 0.003 + 0.001;
      this.wobbleSpeed = Math.random() * 0.02 + 0.005;
      this.wobbleAmount = Math.random() * 30 + 10;
      this.wobbleOffset = Math.random() * Math.PI * 2;
      this.life = 0;
      this.maxLife = Math.random() * 600 + 300;

      // Purple hue variations
      const hueShift = Math.random() * 40 - 20;
      this.hue = 270 + hueShift;
      this.saturation = 60 + Math.random() * 30;
      this.lightness = 50 + Math.random() * 30;
    }

    update(dt) {
      this.life++;
      this.y += this.speedY * dt;
      this.x += this.speedX * dt + Math.sin(this.life * this.wobbleSpeed + this.wobbleOffset) * 0.3;

      // Fade in and out
      const lifeRatio = this.life / this.maxLife;
      if (lifeRatio < 0.1) {
        this.opacity = this.maxOpacity * (lifeRatio / 0.1);
      } else if (lifeRatio > 0.8) {
        this.opacity = this.maxOpacity * (1 - (lifeRatio - 0.8) / 0.2);
      }

      // Mouse interaction — subtle attraction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200 * 0.5;
        this.x += dx * force * 0.01;
        this.y += dy * force * 0.01;
      }

      // Reset if off screen or life exceeded
      if (this.y < -20 || this.life > this.maxLife) {
        this.reset();
      }
    }

    draw() {
      if (this.opacity <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity})`;
      ctx.fill();

      // Glow effect for larger particles
      if (this.size > 1.5) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.opacity * 0.15})`;
        ctx.fill();
      }
    }
  }

  // ─── Energy Lines (subtle lightning-like connectors) ───
  class EnergyLine {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H * 0.5;
      this.length = Math.random() * 80 + 30;
      this.angle = Math.random() * Math.PI * 2;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.08 + 0.02;
      this.life = 0;
      this.maxLife = Math.random() * 120 + 60;
      this.active = false;
      this.delay = Math.random() * 300 + 100;
    }

    update() {
      this.delay--;
      if (this.delay > 0) return;
      this.active = true;
      this.life++;

      const lifeRatio = this.life / this.maxLife;
      if (lifeRatio < 0.2) {
        this.opacity = this.maxOpacity * (lifeRatio / 0.2);
      } else if (lifeRatio > 0.6) {
        this.opacity = this.maxOpacity * (1 - (lifeRatio - 0.6) / 0.4);
      }

      if (this.life > this.maxLife) {
        this.reset();
      }
    }

    draw() {
      if (!this.active || this.opacity <= 0) return;
      const endX = this.x + Math.cos(this.angle) * this.length;
      const endY = this.y + Math.sin(this.angle) * this.length;

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);

      // Create jagged lightning path
      const segments = 4;
      let prevX = this.x, prevY = this.y;
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const px = this.x + (endX - this.x) * t + (Math.random() - 0.5) * 15;
        const py = this.y + (endY - this.y) * t + (Math.random() - 0.5) * 15;
        ctx.lineTo(px, py);
        prevX = px;
        prevY = py;
      }

      ctx.strokeStyle = `hsla(270, 80%, 70%, ${this.opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // ─── Initialize Particles ───
  const PARTICLE_COUNT = Math.min(80, Math.floor(W * H / 15000));
  const ENERGY_LINE_COUNT = 5;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = new Particle();
    p.y = Math.random() * H; // Start distributed
    p.life = Math.random() * p.maxLife; // Stagger life
    particles.push(p);
  }

  const energyLines = [];
  for (let i = 0; i < ENERGY_LINE_COUNT; i++) {
    energyLines.push(new EnergyLine());
  }

  // ─── Animation Loop ───
  function animate(timestamp) {
    animationId = requestAnimationFrame(animate);

    const elapsed = timestamp - lastTime;
    if (elapsed < FRAME_DURATION * 0.8) return;

    const dt = Math.min(elapsed / FRAME_DURATION, 3);
    lastTime = timestamp;

    ctx.clearRect(0, 0, W, H);

    // Draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(dt);
      particles[i].draw();
    }

    // Draw energy lines
    for (let i = 0; i < energyLines.length; i++) {
      energyLines[i].update();
      energyLines[i].draw();
    }
  }

  animate(0);

  // ─── Mouse Tracking (throttled) ───
  let mouseThrottle = false;
  document.addEventListener('mousemove', (e) => {
    if (mouseThrottle) return;
    mouseThrottle = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    requestAnimationFrame(() => { mouseThrottle = false; });
  });

  // ─── Lightning Flash Effect ───
  const heroLightning = document.getElementById('hero-lightning');

  function triggerLightning() {
    if (heroLightning && document.getElementById('page-home')?.classList.contains('active')) {
      heroLightning.classList.add('flash');
      setTimeout(() => heroLightning.classList.remove('flash'), 200);
      // Quick double flash sometimes
      if (Math.random() > 0.5) {
        setTimeout(() => {
          heroLightning.classList.add('flash');
          setTimeout(() => heroLightning.classList.remove('flash'), 150);
        }, 300);
      }
    }
    // Random interval for next flash
    setTimeout(triggerLightning, Math.random() * 8000 + 4000);
  }

  setTimeout(triggerLightning, 3000);

  // ─── Utility ───
  function debounce(fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

  // ─── Parallax on Scroll ───
  let scrollThrottle = false;
  window.addEventListener('scroll', () => {
    if (scrollThrottle) return;
    scrollThrottle = true;

    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const heroOrbs = document.querySelector('.hero-orbs');
      if (heroOrbs) {
        heroOrbs.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
        heroContent.style.opacity = Math.max(0, 1 - scrollY / 600);
      }
      scrollThrottle = false;
    });
  });

  // ─── Pause animation when tab is not visible ───
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      lastTime = performance.now();
      animate(lastTime);
    }
  });

})();