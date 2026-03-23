/* ================================================
   KNOW LEAP STRATEGIES - JavaScript
   Advanced GSAP Animations & Interactions
   ================================================ */

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
// CUSTOM CURSOR
// ==========================================
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smooth cursor follow
gsap.ticker.add(() => {
  const dt = 1.0 - Math.pow(0.9, gsap.ticker.deltaRatio());

  cursorX += (mouseX - cursorX) * dt;
  cursorY += (mouseY - cursorY) * dt;

  gsap.set(cursor, { x: cursorX, y: cursorY });
});

// Cursor hover states
const hoverElements = document.querySelectorAll('a, button, .magnetic-btn');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
});

// Cursor view state for work cards
const viewElements = document.querySelectorAll('[data-cursor="view"]');
viewElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('is-viewing');
    cursor.classList.remove('is-hovering');
  });
  el.addEventListener('mouseleave', () => cursor.classList.remove('is-viewing'));
});

// ==========================================
// MAGNETIC BUTTONS
// ==========================================
const magneticButtons = document.querySelectorAll('.magnetic-btn');

magneticButtons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.4,
      ease: 'power2.out'
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});

// ==========================================
// TEXT SCRAMBLE EFFECT
// ==========================================
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
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
// LOADER ANIMATION
// ==========================================
const loader = document.querySelector('.loader');
const loaderNumber = document.querySelector('.loader-number');
const loaderFill = document.querySelector('.loader-fill');

const loaderTl = gsap.timeline({
  onComplete: () => {
    // Enable scroll after loader
    lenis.start();
    initHeroAnimations();
  }
});

// Stop scroll during load
lenis.stop();

loaderTl
  .to(loaderNumber, {
    innerText: 100,
    duration: 2.5,
    ease: 'power2.inOut',
    snap: { innerText: 1 },
    onUpdate: function() {
      loaderNumber.innerText = Math.round(this.targets()[0].innerText);
    }
  })
  .to(loaderFill, {
    width: '100%',
    duration: 2.5,
    ease: 'power2.inOut'
  }, 0)
  .to(loader, {
    yPercent: -100,
    duration: 1,
    ease: 'power4.inOut'
  }, '+=0.3');

// ==========================================
// HERO ANIMATIONS
// ==========================================
function initHeroAnimations() {
  const heroTl = gsap.timeline();

  // Animate eyebrow
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

  // Animate title words with stagger
  const titleWords = document.querySelectorAll('.title-word');
  heroTl.from(titleWords, {
    yPercent: 100,
    opacity: 0,
    rotationX: -45,
    stagger: 0.1,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.3');

  // Animate subtitle
  heroTl.from('.hero-sub span', {
    yPercent: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6');

  // Animate CTA buttons
  heroTl.from('.hero-cta a', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power3.out'
  }, '-=0.4');

  // Hero image reveals - clip-path animations
  heroTl.to('.hero-img--primary', {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    duration: 1.4,
    ease: 'power4.inOut'
  }, '-=0.8')
  .to('.hero-img--secondary', {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    duration: 1.2,
    ease: 'power4.inOut'
  }, '-=0.8')
  .add(() => {
    document.querySelectorAll('.hero-img').forEach(img => img.classList.add('revealed'));
  });

  // Animate scroll indicator
  heroTl.from('.hero-scroll', {
    opacity: 0,
    y: 20,
    duration: 0.6
  }, '-=0.6');

  // Animate stats with counting
  heroTl.from('.hero-footer', {
    opacity: 0,
    y: 30,
    duration: 0.6
  }, '-=0.4');

  // Counter animation for hero stats
  const statNumbers = document.querySelectorAll('.hero-stat .stat-number');
  statNumbers.forEach(stat => {
    const target = parseInt(stat.dataset.count);
    gsap.to(stat, {
      innerText: target,
      duration: 2,
      ease: 'power2.out',
      snap: { innerText: 1 },
      scrollTrigger: {
        trigger: stat,
        start: 'top 90%'
      }
    });
  });

  // Floating shapes + hero images parallax on mouse move
  const shapes = document.querySelectorAll('.shape');
  const heroImages = document.querySelectorAll('.hero-img');

  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Shapes parallax
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 0.02;
      const x = (clientX - centerX) * speed;
      const y = (clientY - centerY) * speed;

      gsap.to(shape, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out'
      });
    });

    // Hero images 3D parallax
    heroImages.forEach(img => {
      const speed = parseFloat(img.dataset.speed) || 0.04;
      const x = (clientX - centerX) * speed;
      const y = (clientY - centerY) * speed;
      const rotateY = (clientX - centerX) * 0.01;
      const rotateX = (clientY - centerY) * -0.01;

      gsap.to(img, {
        x: x,
        y: y,
        rotateY: rotateY,
        rotateX: rotateX,
        duration: 1.2,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });
  });

  // Hero images parallax on scroll
  gsap.to('.hero-img--primary', {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.hero-img--secondary', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

// ==========================================
// ABOUT SECTION - PINNED TEXT REVEAL
// ==========================================
const aboutSection = document.querySelector('.about');
const aboutWords = document.querySelectorAll('.about-text .word');

// Pin the about section
ScrollTrigger.create({
  trigger: aboutSection,
  start: 'top top',
  end: 'bottom bottom',
  pin: '.about-pin',
  pinSpacing: false
});

// Reveal words on scroll
aboutWords.forEach((word, i) => {
  gsap.to(word, {
    opacity: 1,
    scrollTrigger: {
      trigger: aboutSection,
      start: () => `top+=${(i / aboutWords.length) * 150}% top`,
      end: () => `top+=${((i + 1) / aboutWords.length) * 150}% top`,
      scrub: true
    }
  });
});

// Rotate and scale the about image on scroll
gsap.to('.about-image-wrap', {
  rotation: 360,
  scale: 1.15,
  scrollTrigger: {
    trigger: aboutSection,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1
  }
});

// About image inner parallax
gsap.to('.about-image', {
  scale: 1,
  filter: 'grayscale(0) brightness(1)',
  scrollTrigger: {
    trigger: aboutSection,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1
  }
});

// ==========================================
// SHOWCASE SECTION - STAGGERED REVEALS
// ==========================================
const showcaseItems = document.querySelectorAll('.showcase-item');

// Showcase header reveal
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

// Each showcase item reveals differently
showcaseItems.forEach((item, i) => {
  const img = item.querySelector('.showcase-img');
  const directions = [
    { y: 120, x: 0, rotation: 2 },
    { y: 0, x: 100, rotation: -3 },
    { y: 80, x: -60, rotation: 1 }
  ];
  const dir = directions[i] || directions[0];

  // Container clip reveal
  gsap.from(item, {
    y: dir.y,
    x: dir.x,
    rotation: dir.rotation,
    opacity: 0,
    scale: 0.85,
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 90%',
    }
  });

  // Inner image parallax on scroll
  gsap.to(img, {
    yPercent: -12,
    scale: 1.05,
    ease: 'none',
    scrollTrigger: {
      trigger: item,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
});

// ==========================================
// WORK SECTION - HORIZONTAL SCROLL
// ==========================================
const workSection = document.querySelector('.work');
const workTrack = document.querySelector('.work-track');
const workCards = document.querySelectorAll('.work-card');
const progressFill = document.querySelector('.progress-fill');
const currentNumber = document.querySelector('.progress-numbers .current');

// Calculate how far to scroll
const getScrollAmount = () => {
  const trackWidth = workTrack.scrollWidth;
  const viewportWidth = window.innerWidth;
  return -(trackWidth - viewportWidth + 100);
};

// Horizontal scroll animation
const workScrollTween = gsap.to(workTrack, {
  x: getScrollAmount,
  ease: 'none',
  scrollTrigger: {
    trigger: workSection,
    start: 'top top',
    end: () => `+=${workTrack.scrollWidth}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      // Update progress bar
      gsap.to(progressFill, {
        width: `${self.progress * 100}%`,
        duration: 0.1
      });

      // Update current number
      const cardIndex = Math.min(
        Math.floor(self.progress * workCards.length) + 1,
        workCards.length
      );
      currentNumber.textContent = cardIndex.toString().padStart(2, '0');
    }
  }
});

// Card photos parallax during horizontal scroll
workCards.forEach((card, i) => {
  const photo = card.querySelector('.card-photo');
  if (!photo) return;

  gsap.fromTo(photo,
    { scale: 1.2 },
    {
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: workSection,
        start: 'top top',
        end: () => `+=${workTrack.scrollWidth}`,
        scrub: 1
      }
    }
  );
});

// ==========================================
// CINEMATIC SECTION - CIRCLE REVEAL
// ==========================================
const cinematicSection = document.querySelector('.cinematic');
const cinematicImgWrap = document.querySelector('.cinematic-img-wrap');
const cinematicImg = document.querySelector('.cinematic-img');

if (cinematicSection && cinematicImgWrap) {
  // Pin and expand circle clip-path
  gsap.to(cinematicImgWrap, {
    clipPath: 'circle(75% at 50% 50%)',
    ease: 'none',
    scrollTrigger: {
      trigger: cinematicSection,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: 1,
    }
  });

  // Parallax zoom on the image within
  gsap.to(cinematicImg, {
    scale: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: cinematicSection,
      start: 'top top',
      end: '+=150%',
      scrub: 1
    }
  });

  // Cinematic text reveal
  gsap.from('.cinematic-text', {
    opacity: 0,
    y: 60,
    scale: 0.9,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: cinematicSection,
      start: 'top 40%',
    }
  });

  // Cinematic title lines stagger
  gsap.from('.cinematic-title span', {
    yPercent: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: cinematicSection,
      start: 'top 30%',
    }
  });
}

// ==========================================
// SERVICES SECTION - COUNTER ANIMATION
// ==========================================
const serviceCounters = document.querySelectorAll('.stat-counter');

serviceCounters.forEach(counter => {
  const target = parseInt(counter.dataset.count);

  gsap.from(counter, {
    innerText: 0,
    duration: 2,
    ease: 'power2.out',
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: counter,
      start: 'top 80%'
    },
    onUpdate: function() {
      counter.innerText = Math.round(this.targets()[0].innerText);
    }
  });
});

// Service items stagger reveal
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

// ==========================================
// DUO SECTION - SPLIT REVEAL + PARALLAX
// ==========================================
const duoSection = document.querySelector('.duo-section');

if (duoSection) {
  // Left item slides in from left
  gsap.from('.duo-item--left', {
    x: -120,
    opacity: 0,
    rotation: -3,
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: duoSection,
      start: 'top 75%'
    }
  });

  // Right item slides in from right
  gsap.from('.duo-item--right', {
    x: 120,
    opacity: 0,
    rotation: 3,
    duration: 1.4,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: duoSection,
      start: 'top 75%'
    }
  });

  // Divider line grows
  gsap.from('.duo-divider-line', {
    scaleY: 0,
    duration: 1.2,
    ease: 'power3.inOut',
    scrollTrigger: {
      trigger: duoSection,
      start: 'top 70%'
    }
  });

  // Opposing parallax: left rises, right sinks
  gsap.to('.duo-item--left', {
    y: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: duoSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.duo-item--right', {
    y: 50,
    ease: 'none',
    scrollTrigger: {
      trigger: duoSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Inner image parallax for depth
  gsap.to('.duo-item--left .duo-img', {
    yPercent: -8,
    ease: 'none',
    scrollTrigger: {
      trigger: duoSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  gsap.to('.duo-item--right .duo-img', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: {
      trigger: duoSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });

  // Captions reveal
  gsap.from('.duo-caption', {
    y: 20,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: duoSection,
      start: 'top 60%'
    }
  });
}

// ==========================================
// MARQUEE ANIMATION
// ==========================================
// Accelerate marquee on scroll
gsap.to('.marquee-track', {
  x: '-=200',
  ease: 'none',
  scrollTrigger: {
    trigger: '.marquee-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0.5
  }
});

// ==========================================
// CONTACT SECTION ANIMATIONS
// ==========================================
// Title reveal
gsap.from('.contact-title .line', {
  yPercent: 100,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 70%'
  }
});

// Form fields reveal
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

// ==========================================
// FOOTER ANIMATIONS
// ==========================================
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

// ==========================================
// GENERAL SCROLL ANIMATIONS
// ==========================================
// Section headers
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

  // Simulate form submission
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

// ==========================================
// NEW: IMAGE REEL - SCROLL SPEED BOOST
// ==========================================
const reelSection = document.querySelector('.reel-section');
if (reelSection) {
  // Speed up reel on scroll
  gsap.to('.reel-track--left', {
    x: '-=300',
    ease: 'none',
    scrollTrigger: {
      trigger: reelSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5
    }
  });

  gsap.to('.reel-track--right', {
    x: '+=300',
    ease: 'none',
    scrollTrigger: {
      trigger: reelSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5
    }
  });

  // Reel items fade in on scroll
  gsap.from('.reel-section', {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: reelSection,
      start: 'top 90%'
    }
  });
}

// ==========================================
// NEW: STACK CARDS - PINNED STACKING
// ==========================================
const stackSection = document.querySelector('.stack-section');
const stackCards = document.querySelectorAll('.stack-card');

if (stackSection && stackCards.length > 0) {
  // Pin the stack container
  ScrollTrigger.create({
    trigger: stackSection,
    start: 'top top',
    end: 'bottom bottom',
    pin: '.stack-container',
    pinSpacing: false
  });

  // Stack header reveal
  gsap.from('.stack-header > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: stackSection,
      start: 'top 80%'
    }
  });

  // Each card animates in on scroll
  stackCards.forEach((card, i) => {
    const rotations = [0, -2, 3];
    const offsets = [0, 8, 16];

    if (i === 0) {
      // First card is visible by default
      gsap.set(card, { zIndex: stackCards.length - i });
    } else {
      // Subsequent cards fly in from below with rotation
      gsap.set(card, {
        yPercent: 110,
        rotation: rotations[i] || 0,
        opacity: 0,
        zIndex: stackCards.length - i
      });

      gsap.to(card, {
        yPercent: 0,
        y: offsets[i] || 0,
        rotation: rotations[i] * 0.3,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stackSection,
          start: () => `top+=${(i / stackCards.length) * 200}% top`,
          end: () => `top+=${((i + 0.5) / stackCards.length) * 200}% top`,
          scrub: true
        }
      });
    }

    // Parallax on the photo inside each card
    const photo = card.querySelector('.stack-photo');
    if (photo) {
      gsap.to(photo, {
        yPercent: -8,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: stackSection,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
        }
      });
    }
  });
}

// ==========================================
// NEW: BENTO GRID - STAGGERED CLIP REVEALS
// ==========================================
const bentoSection = document.querySelector('.bento-section');

if (bentoSection) {
  // Bento header reveal
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

  // Each bento item has a unique clip-path reveal animation
  const bentoItems = document.querySelectorAll('.bento-item');
  const clipAnimations = [
    { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },     // slide up
    { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },      // slide from right
    { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },      // slide from left
    { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },      // slide down
    { from: 'inset(50% 50% 50% 50%)', to: 'inset(0 0 0 0)' },  // expand from center
    { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },      // slide up
  ];

  bentoItems.forEach((item, i) => {
    const clip = clipAnimations[i] || clipAnimations[0];
    const imgWrap = item.querySelector('.bento-img-wrap');
    const img = item.querySelector('.bento-img');

    // Clip-path reveal
    gsap.fromTo(imgWrap,
      { clipPath: clip.from },
      {
        clipPath: clip.to,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        }
      }
    );

    // Inner image parallax
    gsap.to(img, {
      yPercent: -10,
      scale: 1.02,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
}

// ==========================================
// NEW: DIAGONAL SPLIT - SCROLL WIPE REVEAL
// ==========================================
const splitSection = document.querySelector('.split-section');

if (splitSection) {
  const splitLeft = splitSection.querySelector('.split-panel--left .split-img-wrap');
  const splitRight = splitSection.querySelector('.split-panel--right .split-img-wrap');
  const splitImgs = splitSection.querySelectorAll('.split-img');

  // Pin and reveal
  const splitTl = gsap.timeline({
    scrollTrigger: {
      trigger: splitSection,
      start: 'top top',
      end: '+=120%',
      pin: true,
      scrub: 1,
    }
  });

  // Left panel wipes in from left
  splitTl.to(splitLeft, {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    duration: 1,
    ease: 'none'
  }, 0);

  // Right panel wipes in from right
  splitTl.to(splitRight, {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    duration: 1,
    ease: 'none'
  }, 0.1);

  // Images zoom out during reveal
  splitImgs.forEach(img => {
    splitTl.to(img, {
      scale: 1,
      duration: 1,
      ease: 'none'
    }, 0);
  });

  // Overlay text reveal
  gsap.from('.split-overlay', {
    y: 60,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: splitSection,
      start: 'top 30%'
    }
  });
}

// ==========================================
// NEW: IMAGE RIBBON - SCROLL ACCELERATION
// ==========================================
const ribbonSection = document.querySelector('.ribbon-section');

if (ribbonSection) {
  // Accelerate ribbon on scroll
  gsap.to('.ribbon-track', {
    x: '-=250',
    ease: 'none',
    scrollTrigger: {
      trigger: ribbonSection,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5
    }
  });

  // Tilt the ribbon on scroll for dynamic feel
  gsap.fromTo('.ribbon-section',
    { rotation: -1.5 },
    {
      rotation: 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: ribbonSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    }
  );
}

console.log('Know Leap Strategies loaded successfully');
