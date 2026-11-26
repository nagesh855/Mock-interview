import { useState, useEffect } from 'react';
import { useLanguage } from '../context/useLanguage';

export default function Navbar({
  isOnline,
  onOpenAuth,
  activeSection,
  onNavigate
}) {
  const { language, setLanguage, languages, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest('.lang-dropdown-wrapper')) {
        setLangDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const currentLangObj = languages.find((l) => l.id === language) || languages[0];

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  const navT = t.nav;

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo & Name */}
        <div
          className="brand-logo"
          onClick={() => handleNavClick('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleNavClick('home');
          }}
        >
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

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button
            type="button"
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            {navT.home}
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
            onClick={() => handleNavClick('features')}
          >
            {navT.features}
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'categories' ? 'active' : ''}`}
            onClick={() => handleNavClick('categories')}
          >
            {navT.categories}
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            {navT.about}
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'faqs' ? 'active' : ''}`}
            onClick={() => handleNavClick('faqs')}
          >
            {navT.faqs}
          </button>
          <button
            type="button"
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            {navT.contact}
          </button>
        </nav>

        {/* Right Controls: Online/Offline, Language, Auth */}
        <div className="navbar-actions">
          {/* Online / Offline status indicator */}
          <div
            className={`status-indicator-badge ${isOnline ? 'online' : 'offline'}`}
            title={isOnline ? navT.onlineTooltip : navT.offlineTooltip}
            role="status"
            aria-live="polite"
          >
            <span className="status-dot"></span>
            <span className="status-label">{isOnline ? navT.online : navT.offline}</span>
          </div>

          {/* Language Selector (Telugu, English, Hindi) */}
          <div className="lang-dropdown-wrapper">
            <button
              type="button"
              className="lang-select-button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Interview Language"
              aria-expanded={langDropdownOpen}
            >
              <span className="lang-flag">{currentLangObj.flag}</span>
              <span className="lang-name">{currentLangObj.nativeName}</span>
              <span className="lang-arrow">{langDropdownOpen ? '▲' : '▼'}</span>
            </button>

            {langDropdownOpen && (
              <div className="lang-dropdown-menu">
                {languages.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className={`lang-option-item ${l.id === language ? 'selected' : ''}`}
                    onClick={() => {
                      setLanguage(l.id);
                      setLangDropdownOpen(false);
                    }}
                  >
                    <span className="lang-option-flag">{l.flag}</span>
                    <div className="lang-option-text">
                      <span className="lang-option-native">{l.nativeName}</span>
                      <span className="lang-option-en">({l.name})</span>
                    </div>
                    {l.id === language && <span className="lang-check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Action Buttons */}
          <div className="auth-buttons-group">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => onOpenAuth('login')}
            >
              {navT.login}
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => onOpenAuth('register')}
            >
              {navT.register}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="mobile-nav-panel">
          <button
            type="button"
            className={`mobile-nav-link ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            {navT.home}
          </button>
          <button
            type="button"
            className={`mobile-nav-link ${activeSection === 'features' ? 'active' : ''}`}
            onClick={() => handleNavClick('features')}
          >
            {navT.features}
          </button>
          <button
            type="button"
            className={`mobile-nav-link ${activeSection === 'categories' ? 'active' : ''}`}
            onClick={() => handleNavClick('categories')}
          >
            {navT.categories}
          </button>
          <button
            type="button"
            className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            {navT.about}
          </button>
          <button
            type="button"
            className={`mobile-nav-link ${activeSection === 'faqs' ? 'active' : ''}`}
            onClick={() => handleNavClick('faqs')}
          >
            {navT.faqs}
          </button>
          <button
            type="button"
            className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleNavClick('contact')}
          >
            {navT.contact}
          </button>

          <div className="mobile-menu-divider"></div>

          <div className="mobile-status-row">
            <span className="mobile-status-text">{navT.networkMode}</span>
            <span className={`status-indicator-badge ${isOnline ? 'online' : 'offline'}`}>
              <span className="status-dot"></span>
              {isOnline ? navT.online : navT.offline}
            </span>
          </div>

          <div className="mobile-auth-actions">
            <button
              type="button"
              className="btn btn-outline full-width"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
            >
              {navT.login}
            </button>
            <button
              type="button"
              className="btn btn-primary full-width"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('register');
              }}
            >
              {navT.register}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
