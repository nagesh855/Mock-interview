import { useLanguage } from '../context/useLanguage';

export default function Hero({ isOnline, onStartClick, onExploreFeatures }) {
  const { language, languages, t } = useLanguage();
  const currentLang = languages.find((l) => l.id === language) || languages[0];
  const heroT = t.hero;

  return (
    <section className="hero-section" id="home">
      <div className="hero-radial-glow"></div>
      
      <div className="hero-layout-grid">
        {/* Left Column: Hero Copy & Actions */}
        <div className="hero-content-col">
          <div className="hero-top-badges">
            <span className="hero-pill-badge">
              <span className="pill-dot"></span>
              {heroT.offlineBadge}
            </span>
            <div className={`status-indicator-badge ${isOnline ? 'online' : 'offline'}`}>
              <span className="status-dot"></span>
              <span className="status-label">{isOnline ? heroT.statusOnline : heroT.statusOffline}</span>
            </div>
          </div>

          <h1 className="hero-heading">
            {heroT.headingStart}
            <span className="gradient-text">{heroT.headingHighlight}</span>
          </h1>

          <p className="hero-subtext">
            {heroT.subtext}
          </p>

          <div className="hero-actions-row">
            <button
              type="button"
              className="btn btn-hero-primary"
              onClick={onStartClick}
            >
              <span>🚀</span> {heroT.btnStart}
            </button>
            <button
              type="button"
              className="btn btn-hero-secondary"
              onClick={onExploreFeatures}
            >
              <span>✨</span> {heroT.btnExplore}
            </button>
          </div>

          <div className="hero-feature-pills">
            <div className="hero-feature-pill">
              <span className="feature-pill-icon">🏛️</span>
              <span>{heroT.pillTracks}</span>
            </div>
            <div className="hero-feature-pill">
              <span className="feature-pill-icon">🗣️</span>
              <span>{heroT.pillLangs}</span>
            </div>
            <div className="hero-feature-pill">
              <span className="feature-pill-icon">📶</span>
              <span>{heroT.pillBandwidth}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Interview Mockup Visual */}
        <div className="hero-visual-col">
          <div className="interview-visual-card">
            {/* Window Topbar */}
            <div className="visual-card-topbar">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="visual-session-info">
                <span className="visual-live-dot"></span>
                <span>{heroT.visualTitle} • {currentLang.nativeName}</span>
              </div>
              <span className="visual-offline-tag">{isOnline ? heroT.visualCloud : heroT.visualOffline}</span>
            </div>

            {/* AI Interviewer Prompt Box */}
            <div className="visual-interviewer-box">
              <div className="interviewer-avatar-row">
                <div className="interviewer-avatar">
                  <span>🏛️</span>
                </div>
                <div className="interviewer-meta">
                  <span className="interviewer-name">{heroT.interviewerTitle}</span>
                  <span className="interviewer-role">{heroT.interviewerRole}</span>
                </div>
                <span className="question-tag">{heroT.questionTag}</span>
              </div>
              <p className="interviewer-quote">
                &ldquo;{heroT.sampleQuestion}&rdquo;
              </p>
            </div>

            {/* Audio Waveform Visualization */}
            <div className="visual-audio-wave-box">
              <div className="audio-wave-bars">
                <span className="wave-bar h1"></span>
                <span className="wave-bar h2"></span>
                <span className="wave-bar h4"></span>
                <span className="wave-bar h3"></span>
                <span className="wave-bar h5"></span>
                <span className="wave-bar h2"></span>
                <span className="wave-bar h4"></span>
                <span className="wave-bar h1"></span>
                <span className="wave-bar h3"></span>
              </div>
              <span className="audio-status-label">{heroT.speechStatus}</span>
            </div>

            {/* Candidate Response Preview */}
            <div className="visual-candidate-box">
              <div className="candidate-header">
                <span className="candidate-badge">{heroT.candidateSpeaking} ({currentLang.name})</span>
                <span className="candidate-timer">⏱️ 01:42 / 03:00</span>
              </div>
              <div className="candidate-feedback-preview">
                <div className="metric-chip">
                  <span className="metric-title">{heroT.fluency}</span>
                  <span className="metric-score">92%</span>
                </div>
                <div className="metric-chip">
                  <span className="metric-title">{heroT.clarity}</span>
                  <span className="metric-score">88%</span>
                </div>
                <div className="metric-chip">
                  <span className="metric-title">{heroT.content}</span>
                  <span className="metric-score">85%</span>
                </div>
              </div>
              <div className="visual-demo-notice">
                <span>ℹ️ {heroT.visualNotice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
