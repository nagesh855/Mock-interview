import { useState } from 'react';
import { useLanguage } from '../context/useLanguage';

export default function Faq() {
  const { faqs, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const faqT = t.faqSection;

  return (
    <section className="faq-section" id="faqs">
      <div className="section-header">
        <span className="section-eyebrow">{faqT.eyebrow}</span>
        <h2 className="section-heading">{faqT.title}</h2>
        <p className="section-subtext">{faqT.subtitle}</p>
      </div>

      <div className="faq-container-box">
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <button
                  type="button"
                  className="faq-question-button"
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="faq-answer-panel">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
