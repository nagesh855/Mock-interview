import { useLanguage } from '../context/useLanguage';

export default function Features() {
  const { features, t } = useLanguage();
  const featT = t.featuresSection;

  return (
    <section className="features-section" id="features">
      <div className="section-header">
        <span className="section-eyebrow">{featT.eyebrow}</span>
        <h2 className="section-heading">{featT.title}</h2>
        <p className="section-subtext">{featT.subtitle}</p>
      </div>

      {/* 6 Core Platform Features Grid */}
      <div className="features-grid">
        {features.map((feat) => (
          <div key={feat.id} className="feature-card">
            <div className="feature-card-top">
              <div className="feature-icon-wrapper">
                <span className="feature-icon">{feat.icon}</span>
              </div>
              <span className={`feature-status-pill ${feat.isDemo ? 'pill-demo' : 'pill-active'}`}>
                {feat.badge}
              </span>
            </div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-desc">{feat.description}</p>
          </div>
        ))}
      </div>

      {/* Interactive Answer Evaluation UI Demonstration Card */}
      <div className="evaluation-demo-card">
        <div className="evaluation-demo-header">
          <div>
            <div className="demo-tag-row">
              <span className="badge-demo-highlight">{featT.demoBadge}</span>
              <span className="badge-roadmap">{featT.roadmapBadge}</span>
            </div>
            <h3 className="evaluation-demo-title">{featT.evalTitle}</h3>
            <p className="evaluation-demo-subtext">
              {featT.evalSubtext}
            </p>
          </div>
          <div className="overall-score-box">
            <span className="overall-score-number">88</span>
            <span className="overall-score-max">/100</span>
            <span className="overall-score-label">{featT.compositeScore}</span>
          </div>
        </div>

        <div className="evaluation-metrics-grid">
          <div className="eval-metric-card">
            <div className="metric-header">
              <span className="metric-name">{featT.metricContent}</span>
              <span className="metric-value">90%</span>
            </div>
            <div className="metric-progress-bar">
              <div className="metric-progress-fill" style={{ width: '90%' }}></div>
            </div>
            <p className="metric-detail">{featT.metricContentDesc}</p>
          </div>

          <div className="eval-metric-card">
            <div className="metric-header">
              <span className="metric-name">{featT.metricFluency}</span>
              <span className="metric-value">92%</span>
            </div>
            <div className="metric-progress-bar">
              <div className="metric-progress-fill" style={{ width: '92%' }}></div>
            </div>
            <p className="metric-detail">{featT.metricFluencyDesc}</p>
          </div>

          <div className="eval-metric-card">
            <div className="metric-header">
              <span className="metric-name">{featT.metricStructure}</span>
              <span className="metric-value">84%</span>
            </div>
            <div className="metric-progress-bar">
              <div className="metric-progress-fill" style={{ width: '84%' }}></div>
            </div>
            <p className="metric-detail">{featT.metricStructureDesc}</p>
          </div>

          <div className="eval-metric-card">
            <div className="metric-header">
              <span className="metric-name">{featT.metricComposure}</span>
              <span className="metric-value">86%</span>
            </div>
            <div className="metric-progress-bar">
              <div className="metric-progress-fill" style={{ width: '86%' }}></div>
            </div>
            <p className="metric-detail">{featT.metricComposureDesc}</p>
          </div>
        </div>

        <div className="evaluation-disclaimer-bar">
          <span className="disclaimer-icon">ℹ️</span>
          <span>{featT.disclaimerNotice}</span>
        </div>
      </div>
    </section>
  );
}
