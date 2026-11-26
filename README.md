# Bansify — Leadership

The leadership page for Bansify, served at **https://leadership.bansify.com**.

Five people, five roles, one company at the earliest possible stage. Each person has a page
that states what they own, their ninety-day aim, and what is not theirs.

| Route | Person | Role | Reports to |
| --- | --- | --- | --- |
| `/` | — | overview, five cards | — |
| `/founder/` | Pawan Kumar Meena | Founder & CTO | nobody |
| `/cofounder/` | Vishnu Meena | Co-founder & COO | Founder & CTO |
| `/ceo/` | Krishna Namdev | CEO & Founding Engineer | Founder & CTO |
| `/cmo/` | Gaurav | CMO | Founder & CTO |
| `/engineering/` | Yuvkesh Meena | Founding Engineer | Founder & CTO |

## Rules the site holds to

- Bansify is **not a registered company**; the footer says so on every page, in the HTML.
- "Founding Engineer" is a date, not a rank — the CEO and the Founding Engineer hold the same
  title. Nobody is described as junior, an intern, a contributor or a future executive.
- No photographs, no analytics, no cookies, no contact form, no `@bansify.com` address (the
  zone has no MX record).
- `/engineering/` carries `noindex, follow` and is left out of `sitemap.xml`; `robots.txt`
  does not disallow it, so a crawler can fetch the page and read the tag.
- JSON-LD is an `Organization` on the overview only. There is no `Person` schema.

## Build and deploy

```bash
npm install
npm run build          # vite build, then scripts/prerender.mjs writes six static HTML files
```

Cloudflare Pages: project `leadership`, production branch `main`, build `npm run build`,
output `dist`. `public/_redirects` sends every path to `index.html` so a deep link survives a
refresh; the prerendered directories serve their own file first.

## Verifying a deploy

```bash
curl -sI https://leadership.bansify.com/ceo/
curl -s  https://leadership.bansify.com/ceo/ | grep -c "Krishna Namdev"
CEO_PAGE=https://leadership.bansify.com/ceo/
curl -s "$CEO_PAGE" | grep -ci "the engineering lead"   # 0
curl -s  https://leadership.bansify.com/engineering/ | grep -i noindex
curl -s  https://leadership.bansify.com/sitemap.xml | grep -c "<loc>"
```
