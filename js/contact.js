import { industries, whatsappURL, emailURL, rand } from './config.js';

const clean = (value, limit = 1000) => String(value || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, limit);
const boundedNumber = (params, key, minimum) => {
  const text = params.get(key);
  if (text === null || text.trim() === '') return null;
  const value = Number(text);
  return Number.isFinite(value) && value >= minimum && value <= 1000000 ? value : null;
};

export function initContact() {
  const form = document.querySelector('#brief-form');
  const preview = document.querySelector('#brief-preview');
  const status = document.querySelector('#form-status');
  if (!form || !preview) return;
  const params = new URLSearchParams(location.search);
  if (params.has('industry') && industries[params.get('industry')]) form.elements.industry.value = params.get('industry');
  const budget = boundedNumber(params, 'budget', 0);
  const profit = boundedNumber(params, 'profit', 1);
  const fee = boundedNumber(params, 'fee', 0);
  const scenario = params.get('source') === 'planner' && budget !== null && profit !== null && fee !== null;
  const createBrief = () => {
    const data = new FormData(form);
    const value = key => clean(data.get(key));
    const industry = value('industry');
    const label = industries[industry]?.label || ({ other: 'Another local business', online: 'Online business' }[industry] || '[Type of business]');
    const lines = [
      'Hi LuxeVisuals, I’d like to discuss a plan for my business.', '',
      `Business: ${value('business') || '[Your business name]'}`,
      `Area: ${value('area') || '[Your service area]'}`,
      `Business type: ${label}`,
      `My goal: ${value('goal') || 'more enquiries'}`,
    ];
    if (value('website')) lines.push(`Website / social page: ${value('website')}`);
    if (value('details')) lines.push('', `More context: ${value('details')}`);
    if (scenario) {
      lines.push('', 'My illustrative break-even scenario (not a quote):',
        `Advertising investment: ${rand(budget)}`,
        `Service payment input: ${rand(fee)} — to be discussed`,
        `Profit per completed booking: ${rand(profit)}`,
        `Bookings to cover these inputs: ${Math.ceil((budget + fee) / profit)}`);
    }
    lines.push('', 'Please let me know what approach would suit my business and how we would agree the service payment amount and method.');
    return lines.join('\n');
  };
  const update = () => { preview.textContent = createBrief(); };
  const validate = () => {
    // Required text fields must contain more than whitespace.
    ['business', 'area'].forEach(key => {
      const input = form.elements[key];
      input.setCustomValidity(input.value.trim() ? '' : 'Please enter a name or area.');
    });
    return form.reportValidity();
  };
  form.addEventListener('input', () => {
    ['business', 'area'].forEach(key => form.elements[key].setCustomValidity(''));
    if (status) status.textContent = '';
    update();
  });
  form.addEventListener('change', update);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validate()) return;
    update();
    // Opens a draft; WhatsApp still requires the visitor to send the message.
    window.open(whatsappURL(createBrief()), '_blank', 'noopener,noreferrer');
    if (status) status.textContent = 'Continue in WhatsApp to review and send your message. If it didn’t open, use the direct WhatsApp link.';
  });
  document.querySelector('#email-brief')?.addEventListener('click', () => {
    if (!validate()) return;
    update();
    location.href = emailURL(createBrief());
    if (status) status.textContent = 'Review the draft in your email app before sending. You can also copy our email address below.';
  });
  form.hidden = false;
  document.querySelector('#brief-fallback').hidden = true;
  update();
}
