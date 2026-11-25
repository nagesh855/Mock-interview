import { useState } from 'react';
import { useLanguage } from '../context/useLanguage';

export default function InterviewConfigurator({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedDuration,
  setSelectedDuration,
  selectedQuestionCount,
  setSelectedQuestionCount,
  isOnline,
  onLaunchSession
}) {
  const { language, setLanguage, languages, categories, difficulties, durations, questionCounts, t } = useLanguage();
  const [validationError, setValidationError] = useState('');

  const cfgT = t.configurator;

  const currentCategoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];
  const currentDiffObj = difficulties.find((d) => d.id === selectedDifficulty) || difficulties[0];
  const currentLangObj = languages.find((l) => l.id === language) || languages[0];
  const currentDurationObj = durations.find((d) => d.id === selectedDuration) || durations[1];
  const currentQuestionObj = questionCounts.find((q) => q.id === selectedQuestionCount) || questionCounts[1];

  const handleReset = () => {
    setSelectedCategory(categories[0].id);
    setSelectedDifficulty(difficulties[1].id);
    setLanguage('en');
    setSelectedDuration('30');
    setSelectedQuestionCount('10');
    setValidationError('');
  };

  const handleStartInterview = () => {
    if (!selectedCategory || !selectedDifficulty || !language || !selectedDuration || !selectedQuestionCount) {
      setValidationError(cfgT.validationError);
      return;
    }

    setValidationError('');
    onLaunchSession({
      category: currentCategoryObj,
      difficulty: currentDiffObj,
      language: currentLangObj,
      duration: currentDurationObj,
      questionCount: currentQuestionObj,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <section className="configurator-section" id="configurator">
      <div className="section-header">
        <span className="section-eyebrow">{cfgT.eyebrow}</span>
        <h2 className="section-heading">{cfgT.title}</h2>
        <p className="section-subtext">{cfgT.subtitle}</p>
      </div>

      <div className="configurator-card">
        {/* Step 1: Category Selection (Competitive Exams) */}
        <div className="config-block">
          <div className="config-block-header">
            <span className="step-badge">{cfgT.step1}</span>
            <h3>{cfgT.step1Title}</h3>
            <span className="selected-tag">
              {currentCategoryObj.icon} {currentCategoryObj.name} ({currentCategoryObj.badge})
            </span>
          </div>

          <div className="categories-grid-8">
            {categories.map((cat) => {
              const isSelected = cat.id === selectedCategory;
              return (
                <div
                  key={cat.id}
                  className={`category-item-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedCategory(cat.id);
                  }}
                >
                  <div className="cat-card-top">
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-badge-label">{cat.badge}</span>
                  </div>
                  <h4 className="cat-name">{cat.name}</h4>
                  <p className="cat-full-title">{cat.fullName}</p>
                  <p className="cat-desc">{cat.description}</p>
                  {isSelected && <span className="cat-selected-indicator">{cfgT.selectedTrackBadge}</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Difficulty Selection (Easy, Medium, Hard) */}
        <div className="config-block">
          <div className="config-block-header">
            <span className="step-badge">{cfgT.step2}</span>
            <h3>{cfgT.step2Title}</h3>
            <span className="selected-tag" style={{ color: currentDiffObj.color, borderColor: currentDiffObj.color }}>
              ● {currentDiffObj.level} ({currentDiffObj.label})
            </span>
          </div>

          <div className="difficulties-grid-3">
            {difficulties.map((diff) => {
              const isSelected = diff.id === selectedDifficulty;
              return (
                <div
                  key={diff.id}
                  className={`difficulty-item-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  role="button"
                  tabIndex={0}
                  style={{ '--diff-color': diff.color }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedDifficulty(diff.id);
                  }}
                >
                  <div className="diff-header">
                    <span className="diff-level-pill" style={{ background: diff.color }}>
                      {diff.level}
                    </span>
                    <span className="diff-tier-label">{diff.label}</span>
                  </div>
                  <p className="diff-desc">{diff.description}</p>
                  {isSelected && <span className="diff-selected-pill">{cfgT.activeTierBadge}</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Spoken Language Selection (Telugu, English, Hindi) */}
        <div className="config-block">
          <div className="config-block-header">
            <span className="step-badge">{cfgT.step3}</span>
            <h3>{cfgT.step3Title}</h3>
            <span className="selected-tag">
              {currentLangObj.flag} {currentLangObj.nativeName} ({currentLangObj.name})
            </span>
          </div>

          <div className="languages-grid">
            {languages.map((lang) => {
              const isSelected = lang.id === language;
              return (
                <div
                  key={lang.id}
                  className={`language-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setLanguage(lang.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setLanguage(lang.id);
                  }}
                >
                  <div className="lang-card-header">
                    <span className="lang-large-flag">{lang.flag}</span>
                    <div className="lang-title-group">
                      <span className="lang-title-native">{lang.nativeName}</span>
                      <span className="lang-title-english">{lang.name}</span>
                    </div>
                    {isSelected && <span className="lang-checked-badge">✓ Active</span>}
                  </div>
                  <p className="lang-desc-text">{lang.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: Duration & Number of Questions */}
        <div className="config-block">
          <div className="config-block-header">
            <span className="step-badge">{cfgT.step4}</span>
            <h3>{cfgT.step4Title}</h3>
          </div>

          <div className="session-options-row">
            {/* Interview Duration Selection */}
            <div className="option-group">
              <label className="option-label">{cfgT.durationLabel}</label>
              <div className="toggle-pill-group">
                {durations.map((dur) => (
                  <button
                    key={dur.id}
                    type="button"
                    className={`toggle-pill ${selectedDuration === dur.id ? 'active' : ''}`}
                    onClick={() => setSelectedDuration(dur.id)}
                  >
                    ⏱️ {dur.label} <span className="pill-subtext">({dur.desc})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Questions Selection */}
            <div className="option-group">
              <label className="option-label">{cfgT.questionCountLabel}</label>
              <div className="toggle-pill-group">
                {questionCounts.map((cnt) => (
                  <button
                    key={cnt.id}
                    type="button"
                    className={`toggle-pill ${selectedQuestionCount === cnt.id ? 'active' : ''}`}
                    onClick={() => setSelectedQuestionCount(cnt.id)}
                  >
                    📝 {cnt.label} <span className="pill-subtext">({cnt.desc})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Notification / Offline Alert */}
        {!isOnline && (
          <div className="offline-notice-box" role="status">
            <span className="notice-icon">📶</span>
            <div>
              <strong>{cfgT.offlineNoticeBold}</strong> {cfgT.offlineNoticeText}
            </div>
          </div>
        )}

        {/* Validation Error Banner */}
        {validationError && (
          <div className="validation-error-banner" role="alert">
            ⚠️ {validationError}
          </div>
        )}

        {/* Footer Summary & Action Controls */}
        <div className="config-footer-actions">
          <div className="config-summary-pill">
            <span className="summary-dot"></span>
            <span>
              {cfgT.targetLabel} <strong>{currentCategoryObj.name}</strong> • <strong>{currentDiffObj.level}</strong> • <strong>{currentLangObj.name}</strong> • <strong>{currentDurationObj.label}</strong> ({currentQuestionObj.label})
            </span>
          </div>

          <div className="config-btn-group">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleReset}
            >
              🔄 {cfgT.btnReset}
            </button>
            <button
              type="button"
              className="btn btn-primary btn-large"
              onClick={handleStartInterview}
            >
              🚀 {cfgT.btnStart}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
