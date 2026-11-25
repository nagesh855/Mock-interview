import { useLanguage } from '../context/useLanguage';

export default function HowItWorks({ onStartClick }) {
  const { howItWorks, t } = useLanguage();
  const hiwT = t.howItWorks;

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="section-header">
        <span className="section-eyebrow">{hiwT.eyebrow}</span>
        <h2 className="section-heading">{hiwT.title}</h2>
        <p className="section-subtext">{hiwT.subtitle}</p>
      </div>

      <div className="steps-workflow-grid">
        {howItWorks.map((stepItem, index) => (
          <div key={index} className="step-workflow-card">
            <div className="step-card-topbar">
              <span className="step-num-badge">{stepItem.step}</span>
              <span className="step-icon-wrap">{stepItem.icon}</span>
            </div>
            <h3 className="step-card-title">{stepItem.title}</h3>
            <p className="step-card-desc">{stepItem.desc}</p>
            <div className="step-indicator-line"></div>
          </div>
        ))}
      </div>

      <div className="workflow-cta-strip">
        <div className="cta-strip-text">
          <h3>{hiwT.ctaTitle}</h3>
          <p>{hiwT.ctaSubtext}</p>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-large"
          onClick={onStartClick}
        >
          🚀 {hiwT.ctaBtn}
        </button>
      </div>
    </section>
  );
}
