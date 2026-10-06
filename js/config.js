// Business details have one source of truth for interactive features.
export const business = Object.freeze({
  name: 'LuxeVisuals',
  phone: '27816143454',
  email: 'miked.vanbrummelen@gmail.com',
  testAdBudget: 1500,
});
export const rand = value => new Intl.NumberFormat('en-ZA', {
  style: 'currency', currency: 'ZAR', maximumFractionDigits: 0,
}).format(value);
export const whatsappURL = message => `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`;
export const emailURL = message => `mailto:${business.email}?subject=${encodeURIComponent('Let’s grow my business — LuxeVisuals')}&body=${encodeURIComponent(message)}`;

export const industries = Object.freeze({
  barber: { label: 'Barbershop', eyebrow: 'For the chair worth coming back to', title: 'A great cut.\nA stronger first impression.', description: 'Let people see the finish, the detail and the experience before they walk through your door. Give nearby clients a clear reason to book their next cut with you.', focus: 'Your signature work, your space and the care behind every cut.', action: 'A booking enquiry from someone in your neighbourhood.', cta: 'Build a plan for my barbershop', image: 'assets/barber.webp', alt: 'Illustrative campaign concept: a barber carefully shaping a client’s hair', imageLabel: 'The craft is the creative.' },
  plumber: { label: 'Plumbing business', eyebrow: 'For the expert they want on speed dial', title: 'Be the name they trust.\nBefore they need you.', description: 'When something goes wrong, people want capable hands and a clear next step. Show the quality of your work and make it easy for nearby customers to request a quote.', focus: 'Careful workmanship, professional service and the jobs you take on.', action: 'A quote request from a customer inside your service area.', cta: 'Build a plan for my plumbing business', image: 'assets/plumber.webp', alt: 'Illustrative campaign concept: a skilled plumber working on a tap', imageLabel: 'Give people confidence to call.' },
  salon: { label: 'Salon', eyebrow: 'For the appointment they look forward to', title: 'Show the transformation.\nMake the booking easy.', description: 'Your finished work says more than a list of treatments. Put your style and attention to detail in front of nearby people looking for their next salon.', focus: 'Your signature styles, finished results and the experience in your salon.', action: 'An appointment enquiry for a service you want to grow.', cta: 'Build a plan for my salon', image: 'assets/salon.webp', alt: 'Illustrative campaign concept: a woman’s finished hairstyle in a softly lit salon', imageLabel: 'Let your finished work speak.' },
});
