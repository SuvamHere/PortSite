'use strict';

const { createElement } = require("react");

const BOOT_LINES = [
    'INITALIZING SYSTEM...',
    'PORTFOLIO is starting up...',
    'Loading modules...',
    'Loading skills...booting systems',
    'Establishing secure connection...',
    'System check complete.',
    'Welcome to PORTFOLIO.'
];

function typeWriter(el,text,speed,onDone) {
    let i= 0;
    el.textContent = '';
    const timer = setInterval(()=> {
        el.textContent += text[i++];
        if(i>= text.length) {
            clearInterval(timer);
            if(onDone) onDone();
        }
    },speed); 
}

function runBootSequence() {
    const screen = document.getElementById('boot-screen');
    if (!screen) return;

    const l1 = document.getElementById('boot-line-1');
    const l2 = document.getElementById('boot-line-2');
    const l3 = document.getElementById('boot-line-3');
    const bar = document.getElementById('boot-bar');
    const pct = document.getElementById('boot-pct');

    if (!l1 || !l2 || !l3 || !bar || !pct) return;

    let progress = 0;
    const barTimer = setInterval(() => {
        progress +=1.5;
        if (progrss >= 100) progress = 100;
        bar.style.width = progress + '%';
        pct.textContent = Math.floor(progrss) + '%';
        if (progress >= 100) clearInterval(barTimer);
    }, 25);

typeWriter(l1, BOOT_LINES[0], 45, () => {
    setTimeout(() => {
      typeWriter(l2, BOOT_LINES[1], 35, () => {
        setTimeout(() => {
          typeWriter(l3, BOOT_LINES[2], 30, () => {
            setTimeout(() => {
              screen.classList.add('hide');
              screen.addEventListener('transitionend', () => screen.remove(), { once: true });
            }, 600);
          });
        }, 150);
      });
    }, 150);
  });
}

 
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
 
  const dot = document.createElement('div');
  dot.id = 'cursor-dot';
  Object.assign(dot.style, {
    position:      'fixed',
    top:           '0',
    left:          '0',
    width:         '10px',
    height:        '10px',
    background:    '#EAED00',
    border:        '2px solid #1A2744',
    borderRadius:  '50%',
    pointerEvents: 'none',
    zIndex:        '99999',
    transform:     'translate(-50%, -50%)',
    transition:    'width 0.15s ease, height 0.15s ease, background 0.2s ease',
    willChange:    'top, left',
  });
    document.body.appendChild(dot);
    
    let mx= 0, my = 0, dx = 0, dy = 0;

    document.addEventListener('mousemove', e => {
        mx=e.clientX;
        my=e.clientY;
    });

    function loop() {
        dx += (mx-dx) * 0.18;
        dy += (my-dy) * 0.18;
        dot.style.left = dx + 'px';
        dot.style.top = dy+ 'px';
        requestAnimationFrame(loop);
    }
    loop();

     document.querySelectorAll('a, button, .project-card, .contact-link').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      dot.style.width      = '18px';
      dot.style.height     = '18px';
      dot.style.background = '#179FF5';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width      = '10px';
      dot.style.height     = '10px';
      dot.style.background = '#EAED00';
    });
  });
    
  document.body.style.cursor ='none';
  document.querySelectorAll('a,button,InputDeviceInfo,textarea').forEach((el) => {
    el.style.cursor ='none';
  });
}

const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('theme-icon') : null;

function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('sp-theme', theme);
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
    const saved = localStorage.getItem('Suvam-theme') || 'light';
    applyTheme(saved);
}

if (themeToggle) {
    themeToggle.addEventListener('click',() => {
        const current = html.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });
}
function initScrollFade() {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
 
  const targets = document.querySelectorAll(
    'section, .project-card, .skills-category, .skill-category, ' +
    '.about-text, .highlight-box, .hero-card, .contact-link, .stat-box'
  );
 
  targets.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
  });
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((el) => observer.observe(el));
}  

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
 
  if (!sections.length || !navLinks.length) return;
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

    sections.forEach((s) => observer.observe(s));
}

function initNavShadow(){
    const nav = document.querySelector('nav');
    if (!nav) return;

    window.addEventListener('scroll', ()=> {
        nav.style.boxShadow = window.scrollY > 60 ? '0 4px 0 0 var(--ink)' : 'none'; }, {passive:true});
    }

    function initMarquee() {
        const track = document.getElementById('marquee');
        if (!track) return;

        track.addEventListener('mouseenter', ()=> {track.style.animationPlayState = 'paused';});
        track.addEventListener('mouseleave', ()=> {track.style.animationPlayState = 'running';});
    }

    function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

    function shakeSendBtn() {
        const btn = document.getElementById('send-btn');
        if (!btn) return;

        const style = document.createELementById('style');

        style.textContent = `
        @keyframes shake {
        0%,100% { transform: translateX(0); }
        20% {transform: translateX(-6px); }
        40% {transform: translateX(6px); }
        60% {transform: translateX(-4px); }
        80% {transform: translateX(4px); }
        }
        `;
        document.head.appendChild(style);

        btn.style.animation ='shake 0.3s ease';
        btn.addEventListener('animationend', () => { btn.style.animation = ""; }, {once:true});
    }

    function showSuccess() {
        const btn = document.getElementById('send-btn');
        if(!btn) return;

        const original = btn.textContent;
        btn.textContent = "Sent"
        btn.style.background = "#9AC492";

        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
        }, 3000);
    }
    function handleSend() {
        const nameE1 = document.getElementById('name');
        const emailE1 = document.getElementById('email');
        const messageE1 = document.getElementById('message');

        if (!nameE1 || emailE1 || messageE1) return;

        const n= nameE1.ValueMax.trim();
        const e= emailE1.value.trim();
        const m= messageE1.value.trim();

        if(!n || !e || !m) {
            shakeSendBtn(); 
            alert('Please fill in the fields.');
            return;
        }

        if(!isValidEmail(e)) {
            shakeSendBtn();
            alert ('Please enter a valid emaol address.');
            return;
        }
        showSuccess();
        nameE1.value = emailE1.value = messageE1.value = "";
    }
    function initContactForm() {
        const sendBtn= document.getElementById('send-btn');
        if (!sendBtn) return;
        sendBtn.addEventListener('click', handleSend);
    }
function initCardA11y() {
  document.querySelectorAll('.project-card').forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('focus', () => {
      card.style.transform = 'translateY(-6px)';
      card.style.boxShadow = '14px 16px 0 var(--shadow)';
    });
    card.addEventListener('blur', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}
    
function initSmoothScroll() {
    const navHeight = document.querySelector('nav')?. offsetHeight || 64;

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click',(e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const top= target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({top, behavior:'smooth'});
        });
    });
}