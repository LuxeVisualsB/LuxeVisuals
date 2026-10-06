# LuxeVisuals

A fast, static website for a South African local-growth studio. Deploy the contents of this folder to the root of the existing GitHub Pages repository. No package installation, build, framework, database, or tracking service is required.

## Run locally

Serve the folder over HTTP, for example `python -m http.server 4173`, then open `http://localhost:4173`. Opening an HTML file directly still displays the content and direct contact links, but browsers require HTTP to load JavaScript modules.

## Client features

- Industry-specific campaign concepts for barbers, plumbers and salons, with keyboard-accessible tabs and tailored enquiry links.
- Break-even planner: `(advertising + entered service payment) / profit per completed booking`, rounded up. It is an illustration using visitor inputs, never a forecast of bookings. All costs must refer to the same planning period.
- Guided brief with a live preview. Planner values and chosen industry carry into the enquiry. WhatsApp/email opens a draft; nothing is automatically sent, and there is no form backend.
- Native FAQs, responsive navigation, visible keyboard focus and reduced-motion support. Content and direct contact links remain available without JavaScript.

## Business details and pricing

The R1,500 starting amount is used for test advertising. Ongoing advertising investment is chosen by the client. Service payment amount and method are discussed individually; there is no fixed monthly price or percentage.

Interactive contact details, test budget and campaign content live in `js/config.js`. Static copy, prices and direct contact links remain in the HTML for a resilient, accessible baseline. When changing a business detail, update both places. The shared header/footer is maintained in `index.html`; run `node scripts/sync-layout.mjs` to copy it to the other pages. This optional maintenance step has no deployment requirement.

## Structure

- `style.css`: design tokens, components, responsive layouts and motion preferences.
- `main.js`: shared initialization and lazy page feature loading.
- `js/site.js`: navigation, scroll reveals and email copy.
- `js/examples.js`: campaign selector.
- `js/planner.js`: validated break-even calculations.
- `js/contact.js`: validated, safely encoded enquiry drafts.
- `assets/`: optimized responsive WebP images and SVG favicon.
- `robots.txt`, `sitemap.xml`: existing GitHub Pages discovery URLs.

## Images and proof

The three photographs are AI-generated illustrative campaign concepts, explicitly identified on the site. They are not actual clients or portfolio results. Replace them with real business photography when available, retaining the dimensions and responsive image variants. Sample testimonials and the unverified 343-client count from the previous site were removed.

No results, timelines or response-time guarantees have been invented. The existing non-refundable-payment and no-guarantee terms were retained; test scope and payment should be agreed directly before work starts.

## Performance

Core content is static HTML. The hero uses a responsive, prioritized local image; below-the-fold imagery is lazy loaded. Page features load only where needed. There is no artificial loading screen, delayed navigation, animation library or framework. Google Fonts uses `display=swap` and system fallbacks. Actual production performance also depends on hosting, font requests and visitor devices.
