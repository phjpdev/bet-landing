import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "app-language";
const DEFAULT_LANGUAGE = "zh-HK";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "zh-HK" ? stored : DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "zh-HK" ? "zh-Hant" : "en";
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (lang === "en" || lang === "zh-HK") {
      setLanguageState(lang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "zh-HK" ? "en" : "zh-HK"));
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isChinese: language === "zh-HK" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
