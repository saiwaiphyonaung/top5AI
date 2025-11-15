import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import HomePage from './components/pages/HomePage';
import CategoryPage from './components/pages/CategoryPage';
import PromptsPage from './components/pages/PromptsPage';
import SearchResultsPage from './components/pages/SearchResultsPage';
import ComparePage from './components/pages/ComparePage';
import MostPopularPage from './components/pages/MostPopularPage';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex flex-col flex-1 lg:ml-64">
          <Header
            onMenuClick={() => setIsSidebarOpen(true)}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/most-popular" element={<MostPopularPage />} />
              <Route path="/:categorySlug" element={<CategoryPage />} />
              <Route path="/prompts/:promptCategorySlug" element={<PromptsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;