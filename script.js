/* ================================================
   KNOW LEAP STRATEGIES - JavaScript
   Simplified Animations
   ================================================ */

// prefers-reduced-motion check
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// TEXT SCRAMBLE EFFECT
// ==========================================
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// Apply scramble effect to elements
const scrambleElements = document.querySelectorAll('.scramble-text');
scrambleElements.forEach(el => {
  const originalText = el.innerText;
  const scrambler = new TextScramble(el);

  el.addEventListener('mouseenter', () => {
    scrambler.setText(originalText);
  });
});

// ==========================================
// HERO ANIMATIONS
// ==========================================
function initHeroAnimations() {
  if (reduceMotion) return;

  const heroTl = gsap.timeline();

  heroTl.from('.eyebrow-line', {
    scaleX: 0,
    transformOrigin: 'left',
    duration: 0.8,
    ease: 'power3.out'
  })
  .from('.eyebrow-text', {
    opacity: 0,
    x: -20,
    duration: 0.6
  }, '-=0.4');

  const titleWords = document.querySelectorAll('.title-word');
  heroTl.from(titleWords, {
    yPercent: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.3');

  heroTl.from('.hero-sub span', {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6');

  heroTl.from('.hero-cta a', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.4');

  heroTl.from('.hero-img--primary', {
    opacity: 0,
    y: 30,
    duration: 1.2,
    ease: 'power3.out'
  }, '-=0.8');

  heroTl.from('.hero-footer', {
    opacity: 0,
    y: 20,
    duration: 0.6
  }, '-=0.4');
}

document.addEventListener('DOMContentLoaded', initHeroAnimations);

// ==========================================
// BACKGROUND RING ANIMATIONS
// ==========================================
if (!reduceMotion) {
  gsap.to('.bg-ring--1', {
    x: 70,
    y: 50,
    duration: 14,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });

  gsap.to('.bg-ring--2', {
    x: -55,
    y: 70,
    rotation: 45,
    duration: 18,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 2
  });

  gsap.to('.bg-ring--3', {
    x: 45,
    y: -55,
    duration: 12,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 5
  });

  gsap.to('.bg-ring--4', {
    x: -65,
    y: -45,
    scale: 1.3,
    duration: 16,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1
  });

  gsap.to('.bg-ring--5', {
    scale: 1.12,
    rotation: 25,
    duration: 22,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  });

  gsap.to('.bg-ring--6', {
    x: -40,
    y: 60,
    scale: 0.75,
    duration: 10,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 3
  });
}

// ==========================================
// ABOUT SECTION - SIMPLE FADE REVEAL
// ==========================================
if (!reduceMotion) {
  gsap.from('.about-content > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 80%'
    }
  });

  gsap.from('.about-visual', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 75%'
    }
  });
}

// ==========================================
// SHOWCASE SECTION - STAGGERED REVEALS
// ==========================================
if (!reduceMotion) {
  gsap.from('.showcase-header > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.showcase-header',
      start: 'top 85%'
    }
  });

  gsap.from('.showcase-item', {
    y: 60,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.showcase-grid',
      start: 'top 85%'
    }
  });
}

// ==========================================
// WORK SECTION - VERTICAL CARD REVEAL
// ==========================================
if (!reduceMotion) {
  gsap.from('.work-card', {
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.work-track',
      start: 'top 80%'
    }
  });
}

// ==========================================
// SERVICES SECTION
// ==========================================
if (!reduceMotion) {
  gsap.from('.service-item', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%'
    }
  });
}

// KLS SERVICES (JUNK REMOVAL) SECTION
// ==========================================
if (!reduceMotion) {
  gsap.from('.kls-service-item', {
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.kls-services-grid',
      start: 'top 80%'
    }
  });
}

// ==========================================
// STACK SECTION - SIMPLE CARD REVEAL
// ==========================================
if (!reduceMotion) {
  gsap.from('.stack-header > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.stack-section',
      start: 'top 80%'
    }
  });

  gsap.from('.stack-card', {
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.stack-cards',
      start: 'top 80%'
    }
  });
}

// ==========================================
// BENTO GRID - SIMPLE FADE REVEALS
// ==========================================
const bentoSection = document.querySelector('.bento-section');

if (bentoSection && !reduceMotion) {
  gsap.from('.bento-header > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.bento-header',
      start: 'top 85%'
    }
  });

  gsap.from('.bento-item', {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.bento-grid',
      start: 'top 85%'
    }
  });
}

// ==========================================
// CONTACT SECTION ANIMATIONS
// ==========================================
if (!reduceMotion) {
  gsap.from('.contact-left', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 70%'
    }
  });

  gsap.from('.form-group', {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%'
    }
  });
}

// ==========================================
// FOOTER ANIMATIONS
// ==========================================
if (!reduceMotion) {
  gsap.from('.footer-top > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%'
    }
  });
}

// ==========================================
// GENERAL SCROLL ANIMATIONS
// ==========================================
if (!reduceMotion) {
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 85%'
      }
    });
  });
}

// ==========================================
// REFRESH SCROLLTRIGGER ON RESIZE
// ==========================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

// ==========================================
// FORM INTERACTIONS
// ==========================================
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
  input.addEventListener('focus', () => {
    gsap.to(input.parentElement, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  input.addEventListener('blur', () => {
    gsap.to(input.parentElement, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Form submit animation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('.btn-submit');
  const originalText = btn.querySelector('.btn-text').innerText;

  gsap.to(btn, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  });

  btn.querySelector('.btn-text').innerText = 'Sending...';

  setTimeout(() => {
    btn.querySelector('.btn-text').innerText = 'Message Sent!';
    gsap.to(btn, {
      background: '#10b981',
      duration: 0.3
    });

    setTimeout(() => {
      btn.querySelector('.btn-text').innerText = originalText;
      gsap.to(btn, {
        background: '#fafafa',
        duration: 0.3
      });
      form.reset();
    }, 2000);
  }, 1500);
});

// ==========================================
// NAVIGATION SCROLL BEHAVIOR
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.5
      });
    }
  });
});

console.log('Know Leap Strategies loaded successfully');
