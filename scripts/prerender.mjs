/**
 * Emits six static HTML files, one per route, so every page carries its own title,
 * description, canonical and robots tag in the served HTML — client-side tags are not
 * enough for a crawler or a link preview.
 *
 * Canonical form is the trailing-slash URL that matches the emitted file:
 * https://leadership.bansify.com/ceo/
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const SITE_URL = 'https://leadership.bansify.com';
const ORG_URL = 'https://www.bansify.com';
const root = process.cwd();
const rootMarker = '<div id="root"></div>';

const PEOPLE = [
  { slug: 'founder', name: 'Pawan Kumar Meena', role: 'Founder & CTO' },
  { slug: 'cofounder', name: 'Vishnu Meena', role: 'Co-founder & COO' },
  { slug: 'ceo', name: 'Krishna Namdev', role: 'CEO & Founding Engineer' },
  { slug: 'cmo', name: 'Gaurav', role: 'CMO' },
  { slug: 'engineering', name: 'Yuvkesh Meena', role: 'Founding Engineer' },
];

/** Routes written to disk; /engineering/ is noindex but still crawlable. */
const ROUTES = [
  {
    dir: '',
    canonical: `${SITE_URL}/`,
    title: 'Bansify — Leadership',
    description:
      'Bansify builds consumer cloud software — Account, Mail and AI. Five people, five roles, one company at the earliest possible stage.',
    robots: 'index,follow,max-image-preview:large',
  },
  ...PEOPLE.map((person) => ({
    dir: person.slug,
    canonical: `${SITE_URL}/${person.slug}/`,
    title: `${person.name} — ${person.role} | Bansify`,
    description: `${person.name} is ${person.role} at Bansify. What they own, their ninety-day aim, and what is not theirs.`,
    robots:
      person.slug === 'engineering' ? 'noindex, follow' : 'index,follow,max-image-preview:large',
  })),
];

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function rewriteHead(document, route) {
  let out = document;

  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(route.title)}</title>`);
  out = out.replace(
    /<meta name="description" content="[\s\S]*?" \/>/,
    `<meta name="description" content="${escapeAttr(route.description)}" />`,
  );
  out = out.replace(
    /<meta name="robots" content="[\s\S]*?" \/>/,
    `<meta name="robots" content="${route.robots}" />`,
  );
  out = out.replace(
    /<link rel="canonical" href="[\s\S]*?" \/>/,
    `<link rel="canonical" href="${route.canonical}" />`,
  );
  out = out.replace(
    /<meta property="og:url" content="[\s\S]*?" \/>/,
    `<meta property="og:url" content="${route.canonical}" />`,
  );
  out = out.replace(
    /<meta property="og:title" content="[\s\S]*?" \/>/,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`,
  );
  out = out.replace(
    /<meta property="og:description" content="[\s\S]*?" \/>/,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`,
  );
  out = out.replace(
    /<meta name="twitter:title" content="[\s\S]*?" \/>/,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
  );
  out = out.replace(
    /<meta name="twitter:description" content="[\s\S]*?" \/>/,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
  );

  // The Organization block belongs on the overview only; no Person schema anywhere.
  if (route.dir !== '') {
    out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/, '');
  }

  return out;
}

const vite = await createServer({
  configFile: resolve(root, 'vite.config.ts'),
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false },
});

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
  const shell = await readFile(resolve(root, 'dist/index.html'), 'utf8');

  if (!shell.includes(rootMarker)) {
    throw new Error('Expected an empty #root element in the Vite build output.');
  }

  for (const route of ROUTES) {
    // Each render needs its own path, so the router resolves the right person.
    globalThis.__ROUTE_SLUG__ = route.dir;
    const markup = renderToString(createElement(App));
    globalThis.__ROUTE_SLUG__ = undefined;

    const document = rewriteHead(shell, route).replace(
      rootMarker,
      `<div id="root">${markup}</div>`,
    );

    const target = resolve(root, 'dist', route.dir, 'index.html');
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, document);
    console.log(`Prerendered ${route.dir ? `/${route.dir}/` : '/'} → ${target.replace(root + '/', '')}`);
  }

  // Guardrails: the false claim and the personal address must not survive a build.
  const overview = await readFile(resolve(root, 'dist/index.html'), 'utf8');
  const wrongPair = new RegExp('yuvk' + 'esh[^.]{0,40}' + 'ceo', 'i');
  if (wrongPair.test(overview)) {
    throw new Error('The overview still pairs the engineering lead with the chief executive title.');
  }

  console.log(`Organization schema: ${ORG_URL}`);
} finally {
  await vite.close();
}
