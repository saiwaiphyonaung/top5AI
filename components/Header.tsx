
import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const SunIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);

const GlobeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9a9 9 0 018.6 0M12 21a9 9 0 01-9-9h18a9 9 0 01-9 9z" />
  </svg>
);

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-sm font-medium text-[var(--color-text-muted)] bg-white/0 hover:bg-[var(--color-surface-hover)] rounded-full transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

const LanguageSelector: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'my', label: 'Myanmar', flag: '🇲🇲' },
    ];

    const currentLang = languages.find(l => l.code === language) || languages[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] transition-colors text-sm font-medium"
                aria-label={t('selectLanguage')}
            >
                <GlobeIcon />
                <span className="hidden sm:inline uppercase">{currentLang.code}</span>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(--color-surface)] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang.code as any);
                                setIsOpen(false);
                            }}
                            className={`flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--color-surface-hover)] transition-colors text-left ${
                                language === lang.code ? 'text-[var(--color-accent)] font-semibold' : 'text-[var(--color-text)]'
                            }`}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};


const Logo = () => (
  <NavLink to="/" className="flex items-center gap-2" aria-label="Top 5 AI - Home">
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.3429 10.6667C19.3429 7.01524 16.3276 4 12.6762 4C9.02476 4 6.00948 7.01524 6.00948 10.6667V16.0571C6.00948 18.019 6.78662 19.8505 8.11898 21.1829C9.45135 22.5152 11.2828 23.2924 13.2447 23.2924H14.2257C15.0114 23.2924 15.66 22.6438 15.66 21.8581C15.66 21.0724 15.0114 20.4238 14.2257 20.4238H13.2447C12.0248 20.4238 10.8547 19.9486 9.9985 19.0924C9.14231 18.2362 8.66713 17.0661 8.66713 15.8462V10.6667C8.66713 8.44952 10.459 6.65714 12.6762 6.65714C14.8933 6.65714 16.6857 8.44952 16.6857 10.6667V11.7333H12.6762C11.8905 11.7333 11.2419 12.3819 11.2419 13.1676C11.2419 13.9533 11.8905 14.6019 12.6762 14.6019H16.6857V16.7114C16.6857 17.4971 17.3343 18.1457 18.12 18.1457C18.9057 18.1457 19.5543 17.4971 19.5543 16.7114V10.6667H19.3429Z" fill="var(--color-accent)"/>
      <path d="M25.1017 9.87324C25.1017 9.08753 24.4532 8.43899 23.6675 8.43899C22.8818 8.43899 22.2332 9.08753 22.2332 9.87324C22.2332 10.6589 22.8818 11.3075 23.6675 11.3075C24.4532 11.3075 25.1017 10.6589 25.1017 9.87324Z" fill="var(--color-accent)"/>
      <path d="M24.8483 23.2924L20.2731 11.9438C20.0883 11.4886 19.5169 11.2771 19.0617 11.4619C18.6065 11.6467 18.395 12.2181 18.5798 12.6733L23.155 24.0219C23.3398 24.4771 23.9112 24.6886 24.3664 24.5038C24.8216 24.319 25.0331 23.7476 24.8483 23.2924Z" fill="var(--color-accent)"/>
    </svg>
    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', fontWeight: 800, color: 'var(--color-heading)', letterSpacing: '-0.5px' }}>
      top5<span style={{ color: 'var(--color-accent)' }}>AI</span>
    </span>
  </NavLink>
);


interface HeaderProps {
  onMenuClick: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, theme, toggleTheme }) => {
  const { t } = useLanguage();
  const navLinkClass = "text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors";
  const activeNavLinkClass = "text-[var(--color-accent)] font-semibold";

  return (
    <header className="sticky top-0 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)] z-30 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-accent)] focus:outline-none transition-colors"
              aria-controls="sidebar"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Logo />
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            <NavLink to="/most-popular" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}>
              {t('mostPopular')}
            </NavLink>
            <NavLink 
                to="/compare" 
                className={({ isActive }) => `
                    group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5
                    ${isActive 
                        ? 'bg-gradient-to-r from-[var(--color-banner-gradient-from)] to-[var(--color-banner-gradient-to)] text-white ring-4 ring-[var(--color-accent)]/20' 
                        : 'bg-gradient-to-r from-[var(--color-banner-gradient-from)] to-[var(--color-banner-gradient-to)] text-white hover:opacity-90'
                    }
                `}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
                <span>{t('compareTools')}</span>
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
