import type { Person } from '../data/profileData';

/** One person: name, role, who they report to, then the three written sections. */
export function ProfileSection({ person }: { person: Person }) {
  return (
    <section className="profile-section section-space" aria-labelledby="person-name">
      <div className="page-container profile-layout">
        <div className="section-aside">
          <p className="eyebrow">{person.role}</p>
          <p className="aside-note">Reports to {person.reportsTo}.</p>
        </div>

        <div className="profile-main">
          <h1 id="person-name">{person.name}</h1>

          <div className="profile-prose">
            <h2>What they own</h2>
            <ul>
              {person.owns.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <h2>Ninety-day aim</h2>
            <p>{person.aim}</p>

            <h2>What is not theirs</h2>
            <p>{person.boundary}</p>
          </div>

          <a className="inline-arrow-link" href="/">
            Back to leadership
          </a>
        </div>
      </div>
    </section>
  );
}
