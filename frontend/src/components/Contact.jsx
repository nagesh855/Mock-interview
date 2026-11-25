import { useState } from 'react';
import { useLanguage } from '../context/useLanguage';
import { CONTACT_INFO } from '../data/interviewData';

export default function Contact() {
  const { t } = useLanguage();
  const contactT = t.contactSection;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    examTrack: 'APPSC',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email || !formData.message) {
      setFormError(contactT.errorRequired);
      return;
    }

    if (!formData.email.includes('@')) {
      setFormError(contactT.errorEmail);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', examTrack: 'APPSC', message: '' });
    }, 4000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <span className="section-eyebrow">{contactT.eyebrow}</span>
        <h2 className="section-heading">{contactT.title}</h2>
        <p className="section-subtext">{contactT.subtitle}</p>
      </div>

      <div className="contact-grid">
        {/* Left Column: Contact Information Cards */}
        <div className="contact-info-col">
          <div className="contact-info-card">
            <span className="contact-card-icon">✉️</span>
            <div>
              <h4>{contactT.emailTitle}</h4>
              <p className="contact-card-val">{CONTACT_INFO.email}</p>
              <span className="contact-subtext">{contactT.emailResponse}</span>
            </div>
          </div>

          <div className="contact-info-card">
            <span className="contact-card-icon">📞</span>
            <div>
              <h4>{contactT.helplineTitle}</h4>
              <p className="contact-card-val">{CONTACT_INFO.phone}</p>
              <span className="contact-subtext">{CONTACT_INFO.hours}</span>
            </div>
          </div>

          <div className="contact-info-card">
            <span className="contact-card-icon">📍</span>
            <div>
              <h4>{contactT.hubTitle}</h4>
              <p className="contact-card-val">{CONTACT_INFO.address}</p>
              <span className="contact-subtext">{contactT.hubLocation}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Feedback / Inquiry Form */}
        <div className="contact-form-col">
          <div className="contact-form-card">
            <h3 className="form-card-title">{contactT.formTitle}</h3>
            <p className="form-card-subtitle">{contactT.formSubtitle}</p>

            {submitted ? (
              <div className="contact-success-box" role="status">
                <span className="success-icon">✅</span>
                <h4>{contactT.successTitle}, {formData.name || 'Aspirant'}!</h4>
                <p>{contactT.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="contact-name">{contactT.nameLabel}</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input"
                      placeholder={contactT.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">{contactT.emailLabel}</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="form-input"
                      placeholder={contactT.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-exam">{contactT.examLabel}</label>
                  <select
                    id="contact-exam"
                    className="form-input form-select"
                    value={formData.examTrack}
                    onChange={(e) => setFormData({ ...formData, examTrack: e.target.value })}
                  >
                    <option value="UPSC">UPSC Civil Services</option>
                    <option value="APPSC">APPSC (Group 1 & 2)</option>
                    <option value="RRB">RRB (Railways)</option>
                    <option value="SSC CGL">SSC CGL</option>
                    <option value="Banking">Banking (IBPS/SBI)</option>
                    <option value="SI">Police Sub Inspector (SI)</option>
                    <option value="Constable">Police Constable</option>
                    <option value="Other">Other Competitive Exam</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">{contactT.msgLabel}</label>
                  <textarea
                    id="contact-message"
                    rows="4"
                    className="form-input"
                    placeholder={contactT.msgPlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                {formError && (
                  <div className="form-error-banner" role="alert">
                    ⚠️ {formError}
                  </div>
                )}

                <button type="submit" className="btn btn-primary full-width">
                  ✉️ {contactT.btnSubmit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
