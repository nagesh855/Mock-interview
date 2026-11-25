import { useLanguage } from '../context/useLanguage';

export default function About() {
  const { t } = useLanguage();
  const abtT = t.aboutSection;

  return (
    <section className="about-section" id="about">
      <div className="section-header">
        <span className="section-eyebrow">{abtT.eyebrow}</span>
        <h2 className="section-heading">{abtT.title}</h2>
        <p className="section-subtext">{abtT.subtitle}</p>
      </div>

      <div className="about-content-grid">
        <div className="about-card-large">
          <div className="about-icon-banner">🎓</div>
          <h3>{abtT.mainTitle}</h3>
          <p>{abtT.mainP1}</p>
          <p>{abtT.mainP2}</p>
        </div>

        <div className="about-benefits-grid">
          <div className="benefit-card">
            <span className="benefit-icon">📶</span>
            <h4>{abtT.b1Title}</h4>
            <p>{abtT.b1Desc}</p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">🗣️</span>
            <h4>{abtT.b2Title}</h4>
            <p>{abtT.b2Desc}</p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">🛡️</span>
            <h4>{abtT.b3Title}</h4>
            <p>{abtT.b3Desc}</p>
          </div>

          <div className="benefit-card">
            <span className="benefit-icon">💡</span>
            <h4>{abtT.b4Title}</h4>
            <p>{abtT.b4Desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
