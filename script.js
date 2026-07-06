// Smooth-scroll for in-page nav links (CSS scroll-behavior covers most
// browsers already; this keeps focus handling correct for keyboard users).
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
});

// Highlight the current section in the nav as the page is scrolled.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-header nav a');

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--navy)'
            : '';
        });
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// Theme toggle (light/dark), persisted in localStorage.
const themeToggle = document.getElementById('theme-toggle');

function applyThemeButtonState(theme) {
  if (!themeToggle) return;
  const isDark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

if (themeToggle) {
  // Reflect whatever theme the inline head script already applied.
  applyThemeButtonState(document.documentElement.getAttribute('data-theme'));

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    applyThemeButtonState(next);
  });
}
