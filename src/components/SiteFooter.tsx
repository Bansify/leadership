import { SITE } from '../data/profileData';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <a className="footer-brand" href="/">
          <span>
            <strong>{SITE.name}</strong>
            <small>Leadership</small>
          </span>
        </a>

        <p className="footer-note">{SITE.disclaimer}</p>

        <div className="footer-links">
          <a href={SITE.orgUrl} target="_blank" rel="noopener noreferrer">
            bansify.com
          </a>
          <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
