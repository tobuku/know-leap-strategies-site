/* ================================================
   KNOW LEAP STRATEGIES - JavaScript
   Junk Removal & Hauling + Studio Division
   ================================================ */

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
// YEAR
// ==========================================
document.getElementById('yr').textContent = new Date().getFullYear();

// ==========================================
// HEADER SCROLL BEHAVIOR
// ==========================================
const hdr = document.getElementById('hdr');
function onScroll() {
  hdr.classList.toggle('scrolled', window.scrollY > 24);
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ==========================================
// MOBILE MENU
// ==========================================
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navlinks');

menuBtn.addEventListener('click', function () {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? 'Close' : 'Menu';
});

navLinks.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    navLinks.classList.remove('open');
    menuBtn.textContent = 'Menu';
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

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
    const promise = new Promise((resolve) => (this.resolve = resolve));
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
        output += '<span class="scramble-char">' + char + '</span>';
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

// Apply scramble to elements
document.querySelectorAll('.scramble-text').forEach(function (el) {
  const originalText = el.innerText;
  const scrambler = new TextScramble(el);
  el.addEventListener('mouseenter', function () {
    scrambler.setText(originalText);
  });
});

// ==========================================
// REVEAL + STAGGER OBSERVER
// ==========================================
const io = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('in');

      // stagger children
      if (el.hasAttribute('data-stagger') && !reduceMotion) {
        Array.prototype.forEach.call(el.children, function (c, i) {
          c.style.transitionDelay = i * 0.08 + 's';
        });
      }

      // count-ups inside
      el.querySelectorAll('[data-count]').forEach(runCount);

      // meter fill
      el.querySelectorAll('[data-fill]').forEach(function (m) {
        m.style.width = m.getAttribute('data-fill') + '%';
      });

      io.unobserve(el);
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal, [data-stagger], .meter-card').forEach(function (el) {
  io.observe(el);
});

// ==========================================
// COUNT ANIMATION
// ==========================================
function runCount(node) {
  if (node.dataset.done) return;
  node.dataset.done = '1';
  var target = parseFloat(node.getAttribute('data-count'));
  var suffix = node.getAttribute('data-suffix') || '';
  if (reduceMotion) {
    node.textContent = formatNum(target) + suffix;
    return;
  }
  var dur = 1400;
  var start = performance.now();
  function tick(now) {
    var p = Math.min((now - start) / dur, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    node.textContent = formatNum(Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function formatNum(n) {
  return n.toLocaleString('en-US');
}

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
    yoyo: true,
  });

  gsap.to('.bg-ring--2', {
    x: -55,
    y: 70,
    rotation: 45,
    duration: 18,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 2,
  });

  gsap.to('.bg-ring--3', {
    x: 45,
    y: -55,
    duration: 12,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 5,
  });

  gsap.to('.bg-ring--4', {
    x: -65,
    y: -45,
    scale: 1.3,
    duration: 16,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    delay: 1,
  });
}

// ==========================================
// HERO ENTRANCE ANIMATION
// ==========================================
function initHeroAnimations() {
  if (reduceMotion) return;

  const heroTl = gsap.timeline();

  heroTl.from('.hero .eyebrow', {
    opacity: 0,
    x: -20,
    duration: 0.6,
    ease: 'power3.out',
  });

  heroTl.from(
    '.hero-title',
    {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power4.out',
    },
    '-=0.3'
  );

  heroTl.from(
    '.hero-lead',
    {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
    },
    '-=0.6'
  );

  heroTl.from(
    '.hero-actions .btn',
    {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
    },
    '-=0.4'
  );

  heroTl.from(
    '.hero-note',
    {
      opacity: 0,
      y: 15,
      duration: 0.5,
    },
    '-=0.3'
  );

  heroTl.from(
    '.hero-image',
    {
      opacity: 0,
      y: 30,
      duration: 1.2,
      ease: 'power3.out',
    },
    '-=0.8'
  );
}

document.addEventListener('DOMContentLoaded', initHeroAnimations);

// ==========================================
// SECTION SCROLL ANIMATIONS
// ==========================================
if (!reduceMotion) {
  // Services header
  gsap.from('.services .sec-head > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.services .sec-head',
      start: 'top 85%',
    },
  });

  // How it works header
  gsap.from('.how-section .sec-head > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.how-section .sec-head',
      start: 'top 85%',
    },
  });

  // Showcase items
  gsap.from('.showcase-item', {
    y: 60,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.showcase-grid',
      start: 'top 85%',
    },
  });

  // Bento items
  var bentoSection = document.querySelector('.bento-section');
  if (bentoSection) {
    gsap.from('.bento-item', {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 85%',
      },
    });
  }

  // How It Works image
  var howImage = document.querySelector('.how-image');
  if (howImage) {
    gsap.from('.how-image', {
      x: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.how-image',
        start: 'top 85%',
      },
    });
  }

  // Scenic strip items
  gsap.from('.scenic-item', {
    y: 30,
    opacity: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.scenic-strip',
      start: 'top 85%',
    },
  });

  // Studio client images
  gsap.from('.studio-client-img', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.studio-clients-strip',
      start: 'top 85%',
    },
  });

  // Contact
  gsap.from('.contact-left', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact',
      start: 'top 70%',
    },
  });

  gsap.from('.form-group', {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%',
    },
  });

  // Footer
  gsap.from('.footer-top > *', {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 85%',
    },
  });
}

// ==========================================
// MAGNETIC CTA BUTTON
// ==========================================
var magnet = document.getElementById('magnet');
if (magnet && !reduceMotion && window.matchMedia('(hover:hover)').matches) {
  magnet.addEventListener('mousemove', function (e) {
    var r = magnet.getBoundingClientRect();
    var x = (e.clientX - r.left - r.width / 2) / r.width;
    var y = (e.clientY - r.top - r.height / 2) / r.height;
    magnet.style.transform = 'translate(' + x * 8 + 'px,' + y * 8 + 'px)';
  });
  magnet.addEventListener('mouseleave', function () {
    magnet.style.transform = '';
  });
}

// ==========================================
// NAVIGATION SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    var target = document.querySelector(targetId);
    if (target) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.5,
      });
    }
  });
});

// ==========================================
// FORM INTERACTIONS
// ==========================================
var formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(function (input) {
  input.addEventListener('focus', function () {
    gsap.to(input.parentElement, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  input.addEventListener('blur', function () {
    gsap.to(input.parentElement, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
});

// Form submit animation
var form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('.btn-submit');
    var originalText = btn.querySelector('.btn-text').innerText;

    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    btn.querySelector('.btn-text').innerText = 'Sending...';

    setTimeout(function () {
      btn.querySelector('.btn-text').innerText = 'Message Sent!';
      gsap.to(btn, {
        background: '#10b981',
        duration: 0.3,
      });

      setTimeout(function () {
        btn.querySelector('.btn-text').innerText = originalText;
        gsap.to(btn, {
          background: '#111111',
          duration: 0.3,
        });
        form.reset();
      }, 2000);
    }, 1500);
  });
}

// ==========================================
// SCROLLTRIGGER REFRESH ON RESIZE
// ==========================================
var resizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    ScrollTrigger.refresh();
  }, 250);
});

// ==========================================
// CONSOLE NOTE
// ==========================================
try {
  console.log(
    '%cBuilt in-house by the Studio.',
    'color:#111;font:600 14px monospace'
  );
  console.log(
    '%cLike the site? That\'s the other half of what we do. → knowleapstrategies.com',
    'color:#585858;font:13px monospace'
  );
} catch (e) {}

console.log('Know Leap Strategies loaded successfully');
