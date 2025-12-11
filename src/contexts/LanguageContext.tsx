import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { translations, Language } from '../data/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLang = localStorage.getItem('language');
        return (savedLang as Language) || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: string): string => {
        const keys = key.split('.');
        let value: any = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English if translation missing
                let fallbackValue: any = translations['en'];
                for (const fbK of keys) {
                    if (fallbackValue && typeof fallbackValue === 'object' && fbK in fallbackValue) {
                        fallbackValue = fallbackValue[fbK];
                    } else {
                        return key; // Return key if not found in en either
                    }
                }
                return fallbackValue || key;
            }
        }

        return value as string;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
