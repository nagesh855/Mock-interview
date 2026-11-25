import { useState, useEffect, useCallback, useMemo } from 'react';
import { LanguageContext, STORAGE_KEY } from './LanguageContext';
import { TRANSLATIONS } from '../data/translations';
import {
  LANGUAGES,
  getCategories,
  getDifficulties,
  getDurations,
  getQuestionCounts,
  getFeatures,
  getHowItWorks,
  getFaqs
} from '../data/interviewData';

export function LanguageProvider({ children, onLanguageChangeNotify }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'en' || saved === 'te' || saved === 'hi')) {
        return saved;
      }
    } catch {
      // Ignore localStorage errors (e.g., in private mode)
    }
    return 'en';
  });

  const setLanguage = useCallback((newLang) => {
    if (newLang !== 'en' && newLang !== 'te' && newLang !== 'hi') return;
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // Ignore error
    }
    if (onLanguageChangeNotify) {
      onLanguageChangeNotify(newLang);
    }
  }, [onLanguageChangeNotify]);

  // Sync to localStorage if state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore
    }
  }, [language]);

  const value = useMemo(() => {
    const t = TRANSLATIONS[language] || TRANSLATIONS.en;
    const categories = getCategories(language);
    const difficulties = getDifficulties(language);
    const durations = getDurations(language);
    const questionCounts = getQuestionCounts(language);
    const features = getFeatures(language);
    const howItWorks = getHowItWorks(language);
    const faqs = getFaqs(language);

    return {
      language,
      setLanguage,
      languages: LANGUAGES,
      t,
      categories,
      difficulties,
      durations,
      questionCounts,
      features,
      howItWorks,
      faqs
    };
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
