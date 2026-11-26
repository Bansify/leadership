import { HeroSection } from './components/HeroSection';
import { ProfileSection } from './components/ProfileSection';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { PEOPLE, personBySlug } from './data/profileData';

/**
 * Six routes on one host, resolved from the path: "/" is the overview and every person has a
 * directory of their own. No router dependency — the prerenderer writes the same paths as
 * static files, so a deep link works on first paint and on refresh.
 */
function currentSlug(): string {
  const forced = (globalThis as { __ROUTE_SLUG__?: string }).__ROUTE_SLUG__;
  if (typeof forced === 'string') return forced;
  if (typeof window === 'undefined') return '';
  return window.location.pathname.replace(/^\/+|\/+$/g, '');
}

export default function App() {
  const slug = currentSlug();
  const person = slug ? personBySlug(slug) : undefined;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        {person ? <ProfileSection person={person} /> : <HeroSection />}
      </main>
      <SiteFooter />
    </div>
  );
}

export { PEOPLE };
