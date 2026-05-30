'use strict';

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
    if {window.matchMedia('hover:none').matches) return;

})