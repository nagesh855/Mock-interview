import { useState } from 'react';
import { useLanguage } from '../context/useLanguage';

export default function AuthModal({ initialMode = 'login', onClose }) {
  const { t } = useLanguage();
  const authT = t.authModal;

  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password || (mode === 'register' && !name)) {
      setFormError(authT.errorRequired);
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setFormError(authT.errorEmail);
      return;
    }

    if (password.length < 6) {
      setFormError(authT.errorPassLength);
      return;
    }

    const actionLabel = mode === 'login' ? authT.welcomeBack : authT.accountCreated;
    setAuthSuccessMsg(`${actionLabel} (${email})`);

    setTimeout(() => {
      onClose();
    }, 1600);
  };

  const handleFillDemo = () => {
    setEmail('candidate.demo@practice.ai');
    setPassword('InterviewReady2026!');
    setName('Demo Candidate');
    setFormError('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setMode('login');
                setFormError('');
                setAuthSuccessMsg('');
              }}
            >
              {authT.signInTab}
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => {
                setMode('register');
                setFormError('');
                setAuthSuccessMsg('');
              }}
            >
              {authT.registerTab}
            </button>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {authSuccessMsg ? (
            <div className="auth-success-state">
              <span className="success-icon">🎉</span>
              <h4>{mode === 'login' ? authT.welcomeBack : authT.accountCreated}</h4>
              <p>{authSuccessMsg}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              {mode === 'register' && (
                <div className="form-group">
                  <label htmlFor="auth-name">{authT.nameLabel}</label>
                  <input
                    id="auth-name"
                    type="text"
                    className="form-input"
                    placeholder={authT.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="auth-email">{authT.emailLabel}</label>
                <input
                  id="auth-email"
                  type="email"
                  className="form-input"
                  placeholder={authT.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="auth-password">{authT.passLabel}</label>
                  <button
                    type="button"
                    className="btn-text-small"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? authT.hide : authT.show}
                  </button>
                </div>
                <input
                  id="auth-password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-options-row">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>{authT.rememberMe}</span>
                </label>

                {mode === 'login' && (
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => alert(authT.forgotAlert)}
                  >
                    {authT.forgotPass}
                  </button>
                )}
              </div>

              {formError && (
                <div className="form-error-banner" role="alert">
                  ⚠️ {formError}
                </div>
              )}

              <button type="submit" className="btn btn-primary full-width">
                {mode === 'login' ? authT.btnSignIn : authT.btnRegister}
              </button>

              <div className="demo-fill-wrap">
                <button
                  type="button"
                  className="btn btn-ghost-demo"
                  onClick={handleFillDemo}
                >
                  {authT.btnAutofill}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
