import { initNavigation, initReveals, initCopyButtons } from './js/site.js';

// Enhance complete, static pages. Page-specific features load only where needed.
document.documentElement.classList.add('js');
initNavigation();
initReveals();
initCopyButtons();
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

const page = document.body.dataset.page;
if (page === 'home') {
  import('./js/examples.js').then(module => module.initExamples()).catch(() => {});
  import('./js/planner.js').then(module => module.initPlanner()).catch(() => {
    const error = document.querySelector('#planner-fallback');
    if (error) error.textContent = 'The interactive planner could not load. You can discuss the numbers with us directly.';
  });
}
if (page === 'contact') {
  import('./js/contact.js').then(module => module.initContact()).catch(() => {
    const form = document.querySelector('#brief-form');
    if (form) form.hidden = true;
    const status = document.querySelector('#brief-fallback');
    if (status) status.textContent = 'Use the direct WhatsApp or email links below to get in touch.';
  });
}
