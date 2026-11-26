import { useState, useEffect } from 'react';
import { useLanguage } from '../context/useLanguage';
import { getInterviewHistory, getInterviewAnswers, getQuestionsByCategory } from '../services/db';

export default function InterviewHistory({ onClose, onStartNew }) {
  const { t } = useLanguage();
  const histT = t.historyModal || {
    title: 'Offline Interview Practice History',
    subtitle: 'IndexedDB Local Records • Fully accessible offline',
    emptyTitle: 'No Practice Sessions Recorded Yet',
    emptyDesc: 'Complete a mock interview session to save your performance and answers to local browser storage.',
    date: 'Date & Time',
    category: 'Category',
    difficulty: 'Difficulty',
    status: 'Status',
    duration: 'Duration',
    viewDetails: 'Review Answers',
    completed: 'Completed',
    initiated: 'Incomplete / Initiated',
    btnStart: 'Start Practice Session',
    btnClose: 'Close History',
    sessionDetailsTitle: 'Session Answer Review',
    btnBack: '← Back to History List'
  };

  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionAnswers, setSessionAnswers] = useState([]);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    let active = true;
    async function fetchHistory() {
      try {
        setLoading(true);
        const records = await getInterviewHistory(50);
        if (active) {
          setHistoryList(records || []);
        }
      } catch (err) {
        console.error('Failed to load interview history from IndexedDB:', err);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchHistory();
    return () => {
      active = false;
    };
  }, []);

  const handleOpenSessionDetails = async (sessionRecord) => {
    setSelectedSession(sessionRecord);
    setLoadingDetails(true);
    try {
      const answers = await getInterviewAnswers(sessionRecord.id);
      const questions = await getQuestionsByCategory(sessionRecord.category, sessionRecord.language);
      setSessionAnswers(answers || []);
      setSessionQuestions(questions || []);
    } catch (e) {
      console.warn('Error fetching session details:', e);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card history-modal-card">
        <div className="modal-header">
          <div className="modal-header-title">
            <span className="modal-icon">📜</span>
            <div>
              <h3>{histT.title}</h3>
              <p className="modal-subtitle">{histT.subtitle}</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <div className="history-modal-body">
          {loading ? (
            <div className="loading-state-card">
              <div className="spinner"></div>
              <p>Loading sessions from IndexedDB...</p>
            </div>
          ) : selectedSession ? (
            <div className="session-detail-view">
              <button
                type="button"
                className="btn btn-sm btn-outline btn-back-hist"
                onClick={() => setSelectedSession(null)}
              >
                {histT.btnBack}
              </button>

              <div className="session-detail-header">
                <h4>{histT.sessionDetailsTitle}: {selectedSession.category.toUpperCase()}</h4>
                <span className="detail-meta">
                  {new Date(selectedSession.startedAt).toLocaleString()} • {selectedSession.difficulty}
                </span>
              </div>

              {loadingDetails ? (
                <div className="spinner"></div>
              ) : (
                <div className="session-answers-list">
                  {sessionAnswers.length === 0 ? (
                    <p className="no-answers-note">No written answers were recorded in this session.</p>
                  ) : (
                    sessionAnswers.map((ans, idx) => {
                      const matchedQ = sessionQuestions.find((q) => q.id === ans.questionId);
                      return (
                        <div key={ans.id || idx} className="history-answer-item">
                          <span className="item-num">Q{idx + 1}</span>
                          <p className="item-q-text">
                            {matchedQ ? matchedQ.question : `Question ID: ${ans.questionId}`}
                          </p>
                          <div className="item-ans-box">
                            <strong>Candidate Answer:</strong>
                            <p>{ans.answer || 'Blank answer'}</p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          ) : historyList.length === 0 ? (
            <div className="history-empty-state">
              <span className="empty-icon">📭</span>
              <h4>{histT.emptyTitle}</h4>
              <p>{histT.emptyDesc}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  onStartNew();
                }}
              >
                {histT.btnStart}
              </button>
            </div>
          ) : (
            <div className="history-table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>{histT.date}</th>
                    <th>{histT.category}</th>
                    <th>{histT.difficulty}</th>
                    <th>{histT.status}</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {historyList.map((rec) => {
                    const formattedDate = new Date(rec.startedAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });
                    const isComp = rec.status === 'completed';
                    return (
                      <tr key={rec.id}>
                        <td>{formattedDate}</td>
                        <td>
                          <strong>{rec.category.toUpperCase()}</strong>
                        </td>
                        <td>
                          <span className="table-tier-pill">● {rec.difficulty}</span>
                        </td>
                        <td>
                          <span className={`table-status-pill ${isComp ? 'status-completed' : 'status-init'}`}>
                            {isComp ? histT.completed : histT.initiated}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline"
                            onClick={() => handleOpenSessionDetails(rec)}
                          >
                            {histT.viewDetails}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            {histT.btnClose}
          </button>
        </div>
      </div>
    </div>
  );
}
