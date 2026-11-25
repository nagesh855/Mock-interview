import { useState, useEffect, useCallback, useRef } from 'react';
import { LanguageProvider } from './context/LanguageProvider';
import { useLanguage } from './context/useLanguage';
import { initAndSeedQuestions, getInterviewSession } from './services/db';
import { INITIAL_QUESTIONS } from './data/initialQuestions';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InterviewConfigurator from './components/InterviewConfigurator';
import PracticeCategories from './components/PracticeCategories';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import SessionModal from './components/SessionModal';
import InterviewArena from './components/InterviewArena';
import InterviewResultsModal from './components/InterviewResultsModal';
import InterviewHistory from './components/InterviewHistory';
import './App.css';

function AppContent() {
  const { language, languages, t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState('upsc');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedDuration, setSelectedDuration] = useState('30');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState('10');
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });
  const [sessionConfig, setSessionConfig] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [toast, setToast] = useState('');

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast('');
    }, 4000);
  }, []);

  // Track language changes to display toast
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const currentLangObj = languages.find((l) => l.id === language);
    showToast(`${t.toasts.langSwitched} ${currentLangObj?.nativeName || language}`);
  }, [language, languages, showToast, t]);

  // Initialize and seed native IndexedDB for offline capability
  // And recover any unfinished session from IndexedDB using active_interview_session_id
  useEffect(() => {
    initAndSeedQuestions(INITIAL_QUESTIONS)
      .then((res) => {
        if (res.insertedCount > 0) {
          console.info(`IndexedDB: Seeded ${res.insertedCount} offline practice questions.`);
        }
      })
      .catch((err) => {
        console.warn('IndexedDB initialization failed:', err);
      });

    // Reload Recovery: Check if user reloaded during an active session
    const savedActiveSessionId = localStorage.getItem('active_interview_session_id');
    if (savedActiveSessionId) {
      getInterviewSession(savedActiveSessionId)
        .then((existing) => {
          if (existing && existing.status === 'initiated') {
            setActiveSession(existing);
            showToast('🔄 Resumed active mock interview session from local IndexedDB.');
          } else {
            localStorage.removeItem('active_interview_session_id');
          }
        })
        .catch(() => {
          localStorage.removeItem('active_interview_session_id');
        });
    }
  }, [showToast]);

  // Online / Offline window event listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast(t.toasts.onlineRestored);
    };
    const handleOffline = () => {
      setIsOnline(false);
      showToast(t.toasts.offlineActive);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [showToast, t]);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthModal({ open: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModal({ open: false, mode: 'login' });
  };

  const handleLaunchSession = (config) => {
    setSessionConfig(config);
  };

  const handleCloseSessionModal = () => {
    setSessionConfig(null);
  };

  const handleStartActiveInterview = (sessionRecord) => {
    setSessionConfig(null);
    setActiveSession(sessionRecord);
  };

  const handleCompleteInterview = (sessionRecord, questions, answers) => {
    setActiveSession(null);
    setResultsData({
      session: sessionRecord,
      questions,
      answers
    });
  };

  const handleExitInterview = () => {
    setActiveSession(null);
  };

  const handleStartAnotherInterview = () => {
    setResultsData(null);
    handleNavigate('configurator');
  };

  // If in an active interview session, render full-screen InterviewArena
  if (activeSession) {
    return (
      <InterviewArena
        session={activeSession}
        isOnline={isOnline}
        onComplete={handleCompleteInterview}
        onExit={handleExitInterview}
      />
    );
  }

  return (
    <div className="app-layout">
      {/* Real-time Global Toast Alert */}
      {toast && (
        <div className="global-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}

      {/* 1. Navigation Header */}
      <Navbar
        isOnline={isOnline}
        onOpenAuth={handleOpenAuth}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        {/* 2. Hero Section */}
        <Hero
          isOnline={isOnline}
          onStartClick={() => handleNavigate('configurator')}
          onExploreFeatures={() => handleNavigate('features')}
        />

        {/* 3. Interview Configuration Area */}
        <InterviewConfigurator
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          selectedDuration={selectedDuration}
          setSelectedDuration={setSelectedDuration}
          selectedQuestionCount={selectedQuestionCount}
          setSelectedQuestionCount={setSelectedQuestionCount}
          isOnline={isOnline}
          onLaunchSession={handleLaunchSession}
        />

        {/* 4. Practice Categories (UPSC, APPSC, RRB, SSC CGL, Banking, SI, Constable, Other) */}
        <PracticeCategories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onNavigate={handleNavigate}
        />

        {/* 5. Platform Features (With Answer Evaluation UI Demo) */}
        <Features />

        {/* 6. How It Works (3-step workflow) */}
        <HowItWorks onStartClick={() => handleNavigate('configurator')} />

        {/* 7. About Section */}
        <About />

        {/* 8. FAQ Section */}
        <Faq />

        {/* 9. Contact Section */}
        <Contact />
      </main>

      {/* 10. Footer */}
      <Footer
        isOnline={isOnline}
        onNavigate={handleNavigate}
      />

      {/* Auth Modal (Login / Register) */}
      {authModal.open && (
        <AuthModal
          initialMode={authModal.mode}
          onClose={handleCloseAuth}
        />
      )}

      {/* Session Modal (Configuration Summary & Readiness) */}
      {sessionConfig && (
        <SessionModal
          sessionConfig={sessionConfig}
          isOnline={isOnline}
          onClose={handleCloseSessionModal}
          onStartInterview={handleStartActiveInterview}
        />
      )}

      {/* Results Modal */}
      {resultsData && (
        <InterviewResultsModal
          session={resultsData.session}
          questions={resultsData.questions}
          answers={resultsData.answers}
          onClose={() => setResultsData(null)}
          onOpenHistory={() => {
            setResultsData(null);
            setShowHistoryModal(true);
          }}
          onStartNew={handleStartAnotherInterview}
        />
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <InterviewHistory
          onClose={() => setShowHistoryModal(false)}
          onStartNew={handleStartAnotherInterview}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
