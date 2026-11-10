
// ── Nav scroll shadow
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
});
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    });
});

// ── Scroll reveal (IntersectionObserver)
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── Smooth active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}`
        ? 'var(--black)' : '';
    });
}, { passive: true });

// ── Contact form (demo – logs to console; wire up to your backend)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.form-submit');
    const success = document.getElementById('form-success');

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async submission
    setTimeout(() => {
    btn.style.display = 'none';
    success.classList.add('visible');
    this.reset();
    // Re-show button after 5s
    setTimeout(() => {
        btn.style.display = '';
        btn.textContent = 'Send message';
        btn.disabled = false;
        btn.insertAdjacentHTML('beforeend',
        `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M3 8h10M9 4l4 4-4 4"/></svg>`);
        success.classList.remove('visible');
    }, 5000);
    }, 900);
});
