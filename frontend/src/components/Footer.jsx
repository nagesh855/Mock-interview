import { useLanguage } from '../context/useLanguage';
import { CONTACT_INFO } from '../data/interviewData';

export default function Footer({ isOnline, onNavigate }) {
  const { language, setLanguage, languages, t } = useLanguage();
  const ftrT = t.footer;
  const navT = t.nav;

  return (
    <footer className="footer-container">
      <div className="footer-top">
        {/* Brand Information */}
        <div className="footer-brand">
          <div className="brand-logo" onClick={() => onNavigate('home')} role="button" tabIndex={0}>
            <div className="logo-icon-wrap">
              <span className="logo-icon-main">⚡</span>
            </div>
            <div className="brand-text-wrap">
              <div className="brand-title-row">
                <span className="brand-title">{navT.brandTitle}</span>
                <span className="brand-badge-offline">{navT.offlineTag}</span>
              </div>
              <span className="brand-subtitle">{navT.brandSubtitle}</span>
            </div>
          </div>

          <p className="footer-desc">
            {ftrT.desc}
          </p>

          <div className="footer-status-row">
            <span className={`status-indicator-badge ${isOnline ? 'online' : 'offline'}`}>
              <span className="status-dot"></span>
              {isOnline ? ftrT.statusOnline : ftrT.statusOffline}
            </span>
          </div>
        </div>

        {/* Navigation & Contact Links */}
        <div className="footer-links-group">
          <div className="footer-col">
            <h4>{ftrT.navCol}</h4>
            <ul>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate('home')}>
                  {navT.home}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate('features')}>
                  {navT.features}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate('categories')}>
                  {navT.categories}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate('about')}>
                  {navT.about}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate('faqs')}>
                  {navT.faqs}
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => onNavigate('contact')}>
                  {navT.contact}
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{ftrT.examsCol}</h4>
            <ul>
              <li>UPSC Civil Services</li>
              <li>APPSC Group 1 & 2</li>
              <li>RRB NTPC & Technical</li>
              <li>SSC CGL Central Posts</li>
              <li>Banking (IBPS / SBI)</li>
              <li>Police SI & Constable</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{ftrT.contactCol}</h4>
            <div className="footer-contact-details">
              <p><strong>{ftrT.emailLabel}</strong> {CONTACT_INFO.email}</p>
              <p><strong>{ftrT.phoneLabel}</strong> {CONTACT_INFO.phone}</p>
              <p><strong>{ftrT.locLabel}</strong> {ftrT.locVal}</p>
            </div>

            <h4 style={{ marginTop: '16px' }}>{ftrT.langsCol}</h4>
            <div className="footer-lang-pills">
              {languages.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`footer-lang-pill ${l.id === language ? 'active' : ''}`}
                  onClick={() => setLanguage(l.id)}
                >
                  {l.flag} {l.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{ftrT.copyright}</p>
        <p className="footer-subtext">
          {ftrT.tagline}
        </p>
      </div>
    </footer>
  );
}
