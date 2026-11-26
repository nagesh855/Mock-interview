import { useState, useEffect } from 'react';
import { useLanguage } from '../context/useLanguage';
import { getQuestionsByCategory, saveInterviewSession, updateUserProgress } from '../services/db';

export default function SessionModal({ sessionConfig, isOnline, onClose, onStartInterview }) {
  const { t } = useLanguage();
  const modalT = t.sessionModal;

  const [availableQuestionsCount, setAvailableQuestionsCount] = useState(null);
  const [micStatus, setMicStatus] = useState(() => {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return 'checking';
    }
    return 'unsupported';
  });

  useEffect(() => {
    let active = true;
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          if (active) setMicStatus('ready');
          stream.getTracks().forEach((track) => track.stop());
        })
        .catch(() => {
          if (active) setMicStatus('prompt_needed');
        });
    }

    return () => {
      active = false;
    };
  }, []);

  // Query local IndexedDB for matching offline questions
  useEffect(() => {
    let active = true;
    if (sessionConfig && sessionConfig.category) {
      getQuestionsByCategory(sessionConfig.category.id, sessionConfig.language.id)
        .then((questions) => {
          if (active) setAvailableQuestionsCount(questions.length);
        })
        .catch(() => {
          if (active) setAvailableQuestionsCount(0);
        });
    }
    return () => {
      active = false;
    };
  }, [sessionConfig]);

  if (!sessionConfig) return null;

  const { category, difficulty, language, duration, questionCount, timestamp } = sessionConfig;
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card session-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <span className="modal-icon">📋</span>
            <div>
              <h3>{modalT.title}</h3>
              <p className="modal-subtitle">{modalT.subtitle}</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <div className="session-modal-body">
          {/* Key Parameters 4-Grid */}
          <div className="session-summary-grid">
            <div className="summary-item">
              <span className="summary-label">{modalT.trackLabel}</span>
              <span className="summary-val highlight">
                {category.icon} {category.name} ({category.badge})
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">{modalT.tierLabel}</span>
              <span className="summary-val" style={{ color: difficulty.color, fontWeight: 'bold' }}>
                ● {difficulty.level} ({difficulty.label})
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">{modalT.langLabel}</span>
              <span className="summary-val">
                {language.flag} {language.nativeName} ({language.name})
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">{modalT.pacingLabel}</span>
              <span className="summary-val">
                ⏱️ {duration.label} • {questionCount.label}
              </span>
            </div>
          </div>

          {/* Topics covered */}
          <div className="session-topics-box">
            <span className="box-title">{modalT.topicsTitle}</span>
            <div className="topics-list">
              {category.sampleTopics.map((topic, idx) => (
                <span key={idx} className="topic-badge">✓ {topic}</span>
              ))}
            </div>
          </div>

          {/* System & Hardware Readiness Check */}
          <div className="readiness-checklist">
            <h4>{modalT.preflightTitle} ({formattedTime})</h4>
            <div className="checklist-items">
              <div className="check-item">
                <span className="check-icon">
                  {isOnline ? '🟢' : '🟡'}
                </span>
                <div className="check-detail">
                  <span className="check-name">{modalT.networkStatus}</span>
                  <span className="check-status">
                    {isOnline ? modalT.onlineDesc : modalT.offlineDesc}
                  </span>
                </div>
              </div>

              <div className="check-item">
                <span className="check-icon">
                  {micStatus === 'ready' ? '🟢' : micStatus === 'checking' ? '🟡' : '🟠'}
                </span>
                <div className="check-detail">
                  <span className="check-name">{modalT.micStatus}</span>
                  <span className="check-status">
                    {micStatus === 'ready'
                      ? modalT.micReady
                      : micStatus === 'checking'
                      ? modalT.micChecking
                      : modalT.micPrompt}
                  </span>
                </div>
              </div>

              <div className="check-item">
                <span className="check-icon">🟢</span>
                <div className="check-detail">
                  <span className="check-name">{modalT.ttsStatus}</span>
                  <span className="check-status">{modalT.ttsReady} {language.name}</span>
                </div>
              </div>

              <div className="check-item">
                <span className="check-icon">💾</span>
                <div className="check-detail">
                  <span className="check-name">Offline Database (IndexedDB)</span>
                  <span className="check-status">
                    {availableQuestionsCount !== null
                      ? `${availableQuestionsCount} offline questions ready in ${language.name}`
                      : 'Connecting to local storage...'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transparent Architecture Notice */}
          <div className="backend-readiness-notice">
            <span className="notice-icon">ℹ️</span>
            <div>
              <strong>{modalT.archNoticeBold}</strong> {modalT.archNoticeText}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            {modalT.btnBack}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={async () => {
              const sessionId = `session-${Date.now()}`;
              const sessionRecord = {
                id: sessionId,
                category: category.id,
                language: language.id,
                difficulty: difficulty.id,
                duration: parseInt(duration.id, 10) || 30,
                questionCount: parseInt(questionCount.id, 10) || 10,
                startedAt: new Date().toISOString(),
                completedAt: null,
                status: 'initiated'
              };
              try {
                await saveInterviewSession(sessionRecord);
                await updateUserProgress(category.id, {
                  sessionIncrement: 1,
                  questionsIncrement: 0
                });
              } catch (e) {
                console.warn('Could not persist session to IndexedDB:', e);
              }

              if (onStartInterview) {
                onStartInterview(sessionRecord);
              } else {
                alert(
                  `${modalT.alertMsg}\n\nExam: ${category.name} (${category.fullName})\nDifficulty: ${difficulty.level}\nLanguage: ${language.name} (${language.nativeName})\nDuration: ${duration.label} (${questionCount.label})\nSession ID: ${sessionId} (Saved to local IndexedDB)`
                );
                onClose();
              }
            }}
          >
            {modalT.btnConfirm}
          </button>
        </div>
      </div>
    </div>
  );
}
