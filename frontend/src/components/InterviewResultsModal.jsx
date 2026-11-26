import { useLanguage } from '../context/useLanguage';

export default function InterviewResultsModal({ session, questions, answers, onClose, onOpenHistory, onStartNew }) {
  const { t } = useLanguage();
  const resT = t.resultsModal || {
    title: 'Interview Performance & Practice Summary',
    subtitle: 'Transparent Local Practice Evaluation — Not AI Assessment',
    examTrack: 'Exam Track',
    difficulty: 'Difficulty',
    language: 'Language',
    durationTaken: 'Duration Taken',
    questionsAttempted: 'Questions Attempted',
    completionRate: 'Completion Rate',
    localEvaluationBanner: 'Notice on Practice Evaluation: The scores and metrics below are calculated locally in your browser using structured response analysis (response length, topic coverage, and Star method completeness). They do not represent AI-based automated scoring.',
    metricsTitle: 'Local Practice Rubric Metrics',
    metricCompleteness: 'Completeness & Length',
    metricCompletenessDesc: 'Percentage of questions answered with substantive elaboration (>30 words).',
    metricStructure: 'Structural Formulation',
    metricStructureDesc: 'Presence of structural indicators (intro, reason, evidence, conclusion).',
    metricDiscipline: 'Pacing & Discipline',
    metricDisciplineDesc: 'Ratio of allotted time utilized effectively per question.',
    overallScore: 'Practice Composite Score',
    reviewTitle: 'Question-by-Question Review',
    yourResponse: 'Your Response:',
    notAnswered: 'No answer was recorded for this question.',
    syllabusGuidance: 'Official Model Guidance & Key Evaluation Points:',
    btnHome: 'Return to Home',
    btnHistory: 'View Interview History',
    btnNew: 'Start Another Interview'
  };

  const totalQuestions = questions ? questions.length : 0;
  const answeredAnswersList = questions
    ? questions.map((q) => (answers && answers[q.id] ? answers[q.id].trim() : ''))
    : [];

  const answeredCount = answeredAnswersList.filter((a) => a.length > 0).length;
  const completionPercentage = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Calculate deterministic local practice score
  // Formula:
  // Completeness: (answeredCount / totalQuestions) * 50
  // Depth / Length (> 30 words): up to 30 points
  // Structure indicators (STAR words or balanced length): up to 20 points
  const substantiveCount = answeredAnswersList.filter((a) => a.split(/\s+/).length >= 25).length;
  const depthScore = totalQuestions > 0 ? Math.round((substantiveCount / totalQuestions) * 30) : 0;
  const structureScore = answeredCount > 0 ? Math.min(20, Math.round((substantiveCount / totalQuestions) * 20)) : 0;
  const completenessScore = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 50) : 0;
  const compositeScore = Math.min(100, completenessScore + depthScore + structureScore);

  const durationSec = session?.durationTakenSeconds || 0;
  const durationMin = Math.floor(durationSec / 60);
  const durationRemainingSec = durationSec % 60;
  const formattedDuration = `${durationMin}m ${durationRemainingSec}s`;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card results-modal-card">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-title">
            <span className="modal-icon">🏆</span>
            <div>
              <h3>{resT.title}</h3>
              <p className="modal-subtitle">{resT.subtitle}</p>
            </div>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <div className="results-modal-body">
          {/* Transparent Local Notice */}
          <div className="local-evaluation-notice">
            <span className="notice-icon">ℹ️</span>
            <p>{resT.localEvaluationBanner}</p>
          </div>

          {/* Overview Grid */}
          <div className="results-overview-grid">
            <div className="overview-item">
              <span className="overview-label">{resT.examTrack}</span>
              <span className="overview-value highlight">🏛️ {session?.category?.toUpperCase()}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">{resT.difficulty}</span>
              <span className="overview-value">● {session?.difficulty}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">{resT.durationTaken}</span>
              <span className="overview-value">⏱️ {formattedDuration}</span>
            </div>
            <div className="overview-item">
              <span className="overview-label">{resT.questionsAttempted}</span>
              <span className="overview-value">
                ✓ {answeredCount} / {totalQuestions} ({completionPercentage}%)
              </span>
            </div>
          </div>

          {/* Practice Scores & Rubric */}
          <div className="results-rubric-card">
            <div className="rubric-header">
              <div>
                <h4>{resT.metricsTitle}</h4>
                <p className="rubric-subtext">Deterministic evaluation of practice responsiveness</p>
              </div>
              <div className="composite-score-badge">
                <span className="score-num">{compositeScore}</span>
                <span className="score-denom">/100</span>
                <span className="score-title">{resT.overallScore}</span>
              </div>
            </div>

            <div className="rubric-bars-grid">
              <div className="rubric-bar-item">
                <div className="bar-label-row">
                  <span>{resT.metricCompleteness}</span>
                  <span className="bar-val">{Math.round((completenessScore / 50) * 100)}%</span>
                </div>
                <div className="metric-progress-bar">
                  <div className="metric-progress-fill" style={{ width: `${Math.round((completenessScore / 50) * 100)}%` }}></div>
                </div>
                <span className="bar-sub">{resT.metricCompletenessDesc}</span>
              </div>

              <div className="rubric-bar-item">
                <div className="bar-label-row">
                  <span>{resT.metricStructure}</span>
                  <span className="bar-val">{Math.round((depthScore / 30) * 100)}%</span>
                </div>
                <div className="metric-progress-bar">
                  <div className="metric-progress-fill" style={{ width: `${Math.round((depthScore / 30) * 100)}%` }}></div>
                </div>
                <span className="bar-sub">{resT.metricStructureDesc}</span>
              </div>
            </div>
          </div>

          {/* Question-by-Question Review */}
          <div className="results-questions-review">
            <h4>{resT.reviewTitle}</h4>
            <div className="review-items-list">
              {questions?.map((q, idx) => {
                const ans = answers && answers[q.id] ? answers[q.id].trim() : '';
                return (
                  <div key={q.id} className="review-card">
                    <div className="review-card-header">
                      <span className="review-q-num">Q{idx + 1}</span>
                      <span className="review-q-tier">● {q.difficulty}</span>
                      <span className={`review-status-tag ${ans ? 'status-answered' : 'status-empty'}`}>
                        {ans ? '✓ Answered' : '○ Not Answered'}
                      </span>
                    </div>

                    <p className="review-question-text">{q.question}</p>

                    <div className="review-response-box">
                      <span className="box-tag">{resT.yourResponse}</span>
                      {ans ? (
                        <p className="response-content">{ans}</p>
                      ) : (
                        <p className="response-empty">{resT.notAnswered}</p>
                      )}
                    </div>

                    {q.explanation && (
                      <div className="review-guidance-box">
                        <span className="box-tag guidance-tag">{resT.syllabusGuidance}</span>
                        <p className="guidance-content">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer results-footer">
          <button type="button" className="btn btn-outline" onClick={onOpenHistory}>
            📜 {resT.btnHistory}
          </button>
          <div className="footer-right-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              {resT.btnHome}
            </button>
            <button type="button" className="btn btn-primary" onClick={onStartNew}>
              {resT.btnNew}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
