import React from 'react';
import { NavLink } from 'react-router-dom';

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
  const navLinkClass = "text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors";
  const activeNavLinkClass = "text-[var(--color-accent)]";

  return (
    <header className="sticky top-0 bg-[var(--color-surface)]/80 backdrop-blur-sm border-b border-[var(--color-border)] z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-accent)] focus:outline-none"
              aria-controls="sidebar"
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Logo />
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink to="/most-popular" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}>
              Most Popular
            </NavLink>
            <NavLink to="/compare" className={({ isActive }) => `${navLinkClass} ${isActive ? activeNavLinkClass : ''}`}>
              Compare Tools
            </NavLink>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;