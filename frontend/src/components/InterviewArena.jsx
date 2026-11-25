import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/useLanguage';
import {
  getQuestionsByCategory,
  saveInterviewAnswer,
  getInterviewAnswers,
  saveInterviewSession,
  getInterviewSession,
  updateUserProgress
} from '../services/db';

export default function InterviewArena({ session, onComplete, onExit }) {
  const { t } = useLanguage();
  const arenaT = t.arena || {
    loading: 'Loading offline interview questions from IndexedDB...',
    noQuestions: 'No offline questions found for this configuration in local storage.',
    questionNum: 'Question',
    of: 'of',
    timeRemaining: 'Time Remaining',
    timeExpired: 'Time Expired!',
    category: 'Exam Track',
    difficulty: 'Difficulty',
    language: 'Language',
    offlineActive: 'Offline Mode Active • Saved locally in IndexedDB',
    typeAnswerPlaceholder: 'Type your answer here. Formulate your response using standard structure (Introduction, Core Points, Practical Examples, and Conclusion)...',
    micNotice: 'Microphone speech recognition requires active browser/OS online engines. Typed response is fully functional and recommended offline.',
    saving: 'Saving...',
    allSaved: 'Auto-saved to local IndexedDB',
    saveError: 'Save error! Retry saving answer.',
    btnPrev: '← Previous',
    btnNext: 'Next Question →',
    btnFinish: 'Complete Interview',
    btnExit: 'Exit Session',
    confirmFinishTitle: 'Submit and Complete Interview?',
    confirmFinishText: 'Are you sure you want to finish? All your recorded answers will be evaluated with local practice metrics.',
    btnConfirmFinish: 'Yes, Complete',
    btnCancel: 'Cancel',
    exitConfirm: 'Are you sure you want to exit? Your answers entered so far have been saved to local IndexedDB.',
    modelAnswerTitle: 'Official Board Guidance & Syllabus Hints:',
    charCount: 'characters',
    wordCount: 'words',
    answered: 'Answered',
    unanswered: 'Unanswered',
    active: 'Active',
    fewerQuestionsNotice: 'Offline question availability notice: You requested {requested} questions, but {available} questions are currently stored offline for {category} ({language}). All available questions have been loaded.'
  };

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionId]: string }
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fewerNotice, setFewerNotice] = useState('');

  // Wall-clock based countdown timer to survive reloads and background tab throttling
  const [timeRemaining, setTimeRemaining] = useState(0);

  const autoSaveTimeoutRef = useRef(null);
  const deadlineRef = useRef(null);

  // 1. Load questions and recover saved answers
  useEffect(() => {
    let active = true;

    async function loadSessionData() {
      if (!session) return;
      try {
        setLoading(true);

        // 1. Fetch exact matching questions (category + language + requested difficulty)
        const requestedTierQuestions = await getQuestionsByCategory(
          session.category,
          session.language,
          session.difficulty
        );

        // 2. Fetch all questions for category + language to enable safe fallback
        const allCategoryLangQuestions = await getQuestionsByCategory(
          session.category,
          session.language
        );

        // 3. Assemble question list prioritizing requested difficulty first, then fallback
        const seenIds = new Set();
        const selectedList = [];

        // Add matching difficulty questions first
        for (const q of requestedTierQuestions || []) {
          if (!seenIds.has(q.id)) {
            seenIds.add(q.id);
            selectedList.push(q);
          }
        }

        // If fewer than requested question count, supplement with other difficulties from same category & language
        const targetCount = parseInt(session.questionCount, 10) || 5;
        if (selectedList.length < targetCount && allCategoryLangQuestions) {
          for (const q of allCategoryLangQuestions) {
            if (!seenIds.has(q.id)) {
              seenIds.add(q.id);
              selectedList.push(q);
              if (selectedList.length >= targetCount) break;
            }
          }
        }

        const finalQuestionList = selectedList.slice(0, targetCount);

        if (active) {
          setQuestions(finalQuestionList);

          if (finalQuestionList.length < targetCount) {
            const noticeMsg = (arenaT.fewerQuestionsNotice || 'Notice: You requested {requested} questions, but only {available} questions are stored offline for this exam track. All available questions are loaded.')
              .replace('{requested}', targetCount)
              .replace('{available}', finalQuestionList.length)
              .replace('{category}', session.category.toUpperCase())
              .replace('{language}', session.language.toUpperCase());
            setFewerNotice(noticeMsg);
          } else {
            setFewerNotice('');
          }
        }

        // Recover existing saved answers from IndexedDB for this session
        const existingAnswers = await getInterviewAnswers(session.id);
        if (active && existingAnswers && existingAnswers.length > 0) {
          const answerMap = {};
          existingAnswers.forEach((ans) => {
            answerMap[ans.questionId] = ans.answer || '';
          });
          setAnswers(answerMap);
        }

        // Recover saved active question index
        const savedIndex = sessionStorage.getItem(`arena_qindex_${session.id}`);
        if (savedIndex && !isNaN(parseInt(savedIndex, 10))) {
          const parsed = parseInt(savedIndex, 10);
          if (parsed >= 0 && parsed < finalQuestionList.length) {
            setCurrentIndex(parsed);
          }
        }

        // Initialize wall-clock deadline
        const totalDurationSec = (session.duration ? session.duration * 60 : 1800);
        let deadline = session.deadline ? new Date(session.deadline).getTime() : null;

        if (!deadline) {
          const startTime = session.startedAt ? new Date(session.startedAt).getTime() : Date.now();
          deadline = startTime + totalDurationSec * 1000;
          // Persist deadline on session
          saveInterviewSession({
            ...session,
            deadline: new Date(deadline).toISOString()
          }).catch(console.warn);
        }

        deadlineRef.current = deadline;
        const remaining = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
        setTimeRemaining(remaining);
      } catch (err) {
        console.error('Failed to load session questions from IndexedDB:', err);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadSessionData();

    return () => {
      active = false;
    };
  }, [arenaT.fewerQuestionsNotice, session]);

  // 2. Persist active question index & session ID for page reload recovery
  useEffect(() => {
    if (session && session.id) {
      sessionStorage.setItem(`arena_qindex_${session.id}`, currentIndex.toString());
      localStorage.setItem('active_interview_session_id', session.id);
    }
  }, [currentIndex, session]);

  // 4. Save answer to IndexedDB
  const persistAnswer = useCallback(
    async (qId, answerText) => {
      if (!session || !qId) return;
      try {
        setIsSaving(true);
        setSaveError(false);
        const answerRecord = {
          id: `ans-${session.id}-${qId}`,
          sessionId: session.id,
          questionId: qId,
          answer: answerText !== undefined ? answerText : '',
          savedAt: new Date().toISOString()
        };
        await saveInterviewAnswer(answerRecord);
        setLastSavedTime(
          new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        );
      } catch (err) {
        console.warn('Failed to auto-save answer to IndexedDB:', err);
        setSaveError(true);
      } finally {
        setIsSaving(false);
      }
    },
    [session]
  );

  // 5. Complete interview session (Idempotent)
  const finalizeSession = useCallback(async () => {
    const currentQ = questions[currentIndex];
    if (currentQ && answers[currentQ.id] !== undefined) {
      await persistAnswer(currentQ.id, answers[currentQ.id]);
    }

    try {
      const completedAt = new Date().toISOString();
      const existingRecord = (await getInterviewSession(session.id)) || session;

      // Idempotency check: if already completed, do not re-increment progress
      const isAlreadyCompleted = existingRecord.status === 'completed';

      const totalDurationSec = session.duration ? session.duration * 60 : 1800;
      const durationTakenSeconds = Math.max(0, totalDurationSec - timeRemaining);

      const finalSession = {
        ...existingRecord,
        status: 'completed',
        completedAt: existingRecord.completedAt || completedAt,
        durationTakenSeconds
      };

      await saveInterviewSession(finalSession);

      if (!isAlreadyCompleted) {
        const answeredCount = Object.values(answers).filter((a) => a && a.trim().length > 0).length;
        await updateUserProgress(session.category, {
          sessionIncrement: 0, // already incremented on initiation
          questionsIncrement: answeredCount
        });
      }

      // Clear recovery pointer
      localStorage.removeItem('active_interview_session_id');
      sessionStorage.removeItem(`arena_qindex_${session.id}`);

      onComplete(finalSession, questions, answers);
    } catch (err) {
      console.error('Error completing session in IndexedDB:', err);
      onComplete(session, questions, answers);
    }
  }, [answers, currentIndex, onComplete, persistAnswer, questions, session, timeRemaining]);

  // 3. Wall-clock countdown timer
  useEffect(() => {
    if (loading || !deadlineRef.current) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diffSec = Math.max(0, Math.floor((deadlineRef.current - now) / 1000));
      setTimeRemaining(diffSec);

      if (diffSec <= 0) {
        clearInterval(interval);
        finalizeSession();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [finalizeSession, loading]);

  // Debounced auto-save on typing
  const handleAnswerChange = (e) => {
    const newText = e.target.value;
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: newText
    }));

    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      persistAnswer(currentQ.id, newText);
    }, 500);
  };

  // Navigate questions with immediate persistence
  const goToQuestion = (index) => {
    const currentQ = questions[currentIndex];
    if (currentQ && answers[currentQ.id] !== undefined) {
      persistAnswer(currentQ.id, answers[currentQ.id]);
    }
    setCurrentIndex(index);
  };

  const handleExit = () => {
    if (window.confirm(arenaT.exitConfirm)) {
      localStorage.removeItem('active_interview_session_id');
      sessionStorage.removeItem(`arena_qindex_${session.id}`);
      onExit();
    }
  };

  // Format timer
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (loading) {
    return (
      <div className="arena-backdrop">
        <div className="arena-loading-card">
          <div className="spinner"></div>
          <p>{arenaT.loading}</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="arena-backdrop">
        <div className="arena-empty-card">
          <h3>Notice</h3>
          <p>{arenaT.noQuestions}</p>
          <button type="button" className="btn btn-primary" onClick={onExit}>
            {arenaT.btnExit}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentAnswer = (currentQuestion && answers[currentQuestion.id]) || '';
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="arena-container" role="region" aria-label="Mock Interview Arena">
      {/* Top Status & Controls Bar */}
      <header className="arena-header">
        <div className="arena-header-left">
          <button type="button" className="arena-exit-btn" onClick={handleExit} title={arenaT.btnExit}>
            ✕ {arenaT.btnExit}
          </button>
          <div className="arena-track-badge">
            <span className="track-icon">🏛️</span>
            <span className="track-name">{session.category.toUpperCase()}</span>
            <span className="track-tier">● {session.difficulty}</span>
          </div>
        </div>

        <div className="arena-header-center">
          <div className={`arena-timer-pill ${timeRemaining < 300 ? 'timer-warning' : ''}`}>
            <span className="timer-icon">⏱️</span>
            <span className="timer-val">{timeRemaining > 0 ? formattedTime : arenaT.timeExpired}</span>
          </div>
          <div className="arena-storage-status">
            <span className="status-indicator-dot online"></span>
            <span className="status-label">{arenaT.offlineActive}</span>
          </div>
        </div>

        <div className="arena-header-right">
          <div className="arena-autosave-indicator">
            {isSaving ? (
              <span className="saving-text">💾 {arenaT.saving}</span>
            ) : saveError ? (
              <span className="save-error-text">⚠️ {arenaT.saveError}</span>
            ) : lastSavedTime ? (
              <span className="saved-text">✓ {arenaT.allSaved} ({lastSavedTime})</span>
            ) : null}
          </div>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => setShowConfirmModal(true)}
          >
            {arenaT.btnFinish}
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="arena-progress-track">
        <div className="arena-progress-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <main className="arena-main-content">
        {/* Left Column: Question Navigator Palette */}
        <aside className="arena-question-nav">
          <h4 className="palette-title">
            Questions ({questions.length})
          </h4>
          <div className="palette-grid">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] && answers[q.id].trim().length > 0;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  type="button"
                  className={`palette-num-btn ${isCurrent ? 'active' : ''} ${isAnswered ? 'answered' : ''}`}
                  onClick={() => goToQuestion(idx)}
                  title={`Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="palette-legend">
            <span className="legend-item"><span className="legend-dot active"></span> {arenaT.active}</span>
            <span className="legend-item"><span className="legend-dot answered"></span> {arenaT.answered}</span>
            <span className="legend-item"><span className="legend-dot"></span> {arenaT.unanswered}</span>
          </div>
        </aside>

        {/* Right Column: Active Question & Answer Area */}
        <div className="arena-workspace">
          {/* Availability Alert if fewer questions exist offline */}
          {fewerNotice && (
            <div className="arena-notice-banner" role="status">
              <span className="notice-icon">ℹ️</span>
              <p>{fewerNotice}</p>
            </div>
          )}

          {/* Question Prompt Card */}
          <section className="arena-question-card">
            <div className="question-card-header">
              <span className="question-badge">
                {arenaT.questionNum} {currentIndex + 1} {arenaT.of} {questions.length}
              </span>
              <span className="question-lang-pill">
                🌐 {currentQuestion.language.toUpperCase()}
              </span>
            </div>

            <h2 className="question-prompt-text">{currentQuestion.question}</h2>

            {currentQuestion.explanation && (
              <div className="question-guidance-box">
                <span className="guidance-title">💡 {arenaT.modelAnswerTitle}</span>
                <p className="guidance-desc">{currentQuestion.explanation}</p>
              </div>
            )}
          </section>

          {/* Candidate Response Workspace */}
          <section className="arena-answer-card">
            <div className="answer-card-header">
              <div className="answer-label-group">
                <h3>Candidate Response</h3>
                <span className="char-count">
                  {currentAnswer.length} {arenaT.charCount} • {currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0} {arenaT.wordCount}
                </span>
              </div>
              <div className="voice-notice-badge" title="Microphone Status">
                🎙️ <span className="mic-subtext">{arenaT.micNotice}</span>
              </div>
            </div>

            <textarea
              className="arena-answer-textarea"
              rows={9}
              value={currentAnswer}
              onChange={handleAnswerChange}
              placeholder={arenaT.typeAnswerPlaceholder}
              aria-label="Your response"
            />

            {/* Bottom Actions */}
            <div className="arena-actions-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => goToQuestion(currentIndex - 1)}
                disabled={currentIndex === 0}
              >
                {arenaT.btnPrev}
              </button>

              <div className="center-actions">
                {currentIndex === questions.length - 1 ? (
                  <button
                    type="button"
                    className="btn btn-success btn-finish-prominent"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    ✓ {arenaT.btnFinish}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => goToQuestion(currentIndex + 1)}
                  >
                    {arenaT.btnNext}
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Confirmation Dialog Before Final Submission */}
      {showConfirmModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card confirm-modal-card">
            <h3>{arenaT.confirmFinishTitle}</h3>
            <p>{arenaT.confirmFinishText}</p>
            <div className="confirm-summary-row">
              <span>{arenaT.answered}: {Object.values(answers).filter(a => a && a.trim().length > 0).length} / {questions.length}</span>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowConfirmModal(false)}
              >
                {arenaT.btnCancel}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setShowConfirmModal(false);
                  finalizeSession();
                }}
              >
                {arenaT.btnConfirmFinish}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
