import { PEOPLE, SITE } from '../data/profileData';

/** Overview: the title, one line, and five cards — the founder first but not larger. */
export function HeroSection() {
  return (
    <section className="hero-section" id="top" aria-labelledby="page-title">
      <div className="page-container">
        <p className="eyebrow hero-eyebrow">
          <span className="eyebrow-rule" aria-hidden="true" />
          {SITE.name}
        </p>

        <h1 id="page-title">{SITE.title}</h1>

        <p className="hero-lede">{SITE.tagline}</p>

        <div className="theme-grid" style={{ marginTop: '2.5rem' }}>
          {PEOPLE.map((person) => (
            <article className="theme-item" key={person.slug}>
              <h2 style={{ fontSize: '1.05rem' }}>{person.name}</h2>
              <p style={{ fontWeight: 600, marginTop: '0.15rem' }}>{person.role}</p>
              <p style={{ marginTop: '0.6rem' }}>{person.owns[0]}</p>
              <a className="inline-arrow-link" href={`/${person.slug}/`}>
                Read the remit →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
