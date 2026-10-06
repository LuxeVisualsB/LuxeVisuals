export function initNavigation() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  if (!button || !nav) return;
  document.documentElement.classList.add('nav-ready');
  const close = (returnFocus = false) => {
    button.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (returnFocus) button.focus();
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') close(true); });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) close(); });
  nav.addEventListener('focusout', event => {
    if (event.relatedTarget && !nav.contains(event.relatedTarget) && event.relatedTarget !== button) close();
  });
  const desktop = matchMedia('(min-width: 901px)');
  desktop.addEventListener('change', event => { if (event.matches) close(); });
}

export function initReveals() {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      entry.target.classList.remove('reveal-pending');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => {
    // Never hide already visible content while the page is loading.
    if (el.getBoundingClientRect().top > innerHeight) el.classList.add('reveal-pending');
    observer.observe(el);
  });
}

export function initCopyButtons() {
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      const { business } = await import('./config.js');
      const status = document.querySelector('#copy-status') || document.querySelector('#form-status');
      try {
        await navigator.clipboard.writeText(business.email);
        if (status) status.textContent = 'Email address copied.';
        button.textContent = 'Copied ✓';
      } catch {
        if (status) status.textContent = `Copy isn’t available here. Email us at ${business.email}.`;
      }
    });
  });
}
