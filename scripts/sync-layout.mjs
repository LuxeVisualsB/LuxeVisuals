// Optional maintenance utility: keep static navigation and footer consistent.
// Run from any directory with: node scripts/sync-layout.mjs
// No build is needed to deploy or view the site.
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const source = await readFile(new URL('index.html', root), 'utf8');
const extract = tag => source.match(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}>`))[0];
const footer = extract('footer');
for (const filename of ['how-it-works.html', 'contact.html', 'terms.html']) {
  let header = extract('header').replaceAll('href="#approach"', 'href="index.html#approach"').replaceAll('href="#examples"', 'href="index.html#examples"');
  if (filename !== 'terms.html') header = header.replace(`href="${filename}"`, `href="${filename}" aria-current="page"`);
  const path = new URL(filename, root);
  const html = await readFile(path, 'utf8');
  await writeFile(path, html.replace(/<header\b[\s\S]*?<\/header>/, header).replace(/<footer\b[\s\S]*?<\/footer>/, footer));
}
console.log('Static page layouts synchronized.');
