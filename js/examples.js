import { industries } from './config.js';

export function initExamples() {
  const tabs = [...document.querySelectorAll('[data-industry]')];
  const panel = document.querySelector('#campaign-panel');
  if (!tabs.length || !panel) return;
  const select = tab => {
    const key = tab.dataset.industry;
    const item = industries[key];
    if (!item) return;
    tabs.forEach(button => {
      const active = button === tab;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    document.querySelector('#campaign-eyebrow').textContent = item.eyebrow;
    const title = document.querySelector('#campaign-title');
    title.replaceChildren();
    item.title.split('\n').forEach((line, index) => {
      if (index) title.append(document.createElement('br'));
      title.append(document.createTextNode(line));
    });
    document.querySelector('#campaign-description').textContent = item.description;
    document.querySelector('#campaign-focus').textContent = item.focus;
    document.querySelector('#campaign-action').textContent = item.action;
    document.querySelector('.campaign-image-label').textContent = item.imageLabel;
    const image = document.querySelector('#campaign-image');
    image.src = item.image;
    image.srcset = `${item.image.replace('.webp', '-480.webp')} 480w, ${item.image} 800w`;
    image.alt = item.alt;
    const cta = document.querySelector('#campaign-cta');
    cta.textContent = `${item.cta} ↗`;
    cta.href = `contact.html?industry=${encodeURIComponent(key)}`;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelector('.campaign-copy').animate(
        [{ opacity: 0.6, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 260, easing: 'ease-out' },
      );
    }
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(tabs[next]);
      tabs[next].focus();
    });
  });
  document.querySelector('.industry-tabs').hidden = false;
}
