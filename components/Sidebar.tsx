
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES, PROMPTS_CATEGORIES } from '../constants';
import SearchBar from './ui/SearchBar';
import { useLanguage } from '../contexts/LanguageContext';

// New Icons
const FireIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
);

const CompareIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);


const SidebarNavLink: React.FC<{ to: string, children: React.ReactNode, icon?: React.ReactNode, onClose: () => void }> = ({ to, children, icon, onClose }) => {
    return (
        <NavLink
            to={to}
            onClick={onClose}
            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                ${isActive 
                    ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] shadow-sm' 
                    : 'text-[var(--color-sidebar-text)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-sidebar-text-hover)]'
                }
            `}
        >
            {icon && (
                <span className="flex-shrink-0 w-5 h-5 transition-colors duration-200">
                    {icon}
                </span>
            )}
            <span className="flex-grow">{children}</span>
        </NavLink>
    );
};

// Collapsible section component
const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => (
  <details className="group mb-2" open={defaultOpen}>
    <summary className="flex items-center justify-between px-3 py-2 cursor-pointer text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider hover:text-[var(--color-sidebar-text-hover)] list-none rounded-md hover:bg-[var(--color-surface-hover)] transition-colors">
      <span>{title}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 text-gray-400 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div className="mt-1 space-y-0.5">
      {children}
    </div>
  </details>
);


const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { t, language, setLanguage } = useLanguage();

  React.useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset' };
  }, [isOpen]);
  
  const handleClose = () => {
    if (window.innerWidth < 1024) { // lg breakpoint
      onClose();
    }
  }

  // Group categories into 3 main sections
  const creativeCategories = CATEGORIES.filter(c => ['graphic-design', 'ai-writing', 'music-generation', 'video-generation'].includes(c.slug));
  const businessCategories = CATEGORIES.filter(c => ['marketing-and-content', 'customer-support', 'sales-and-crm', 'operations-and-automation', 'finance-and-analytics'].includes(c.slug));
  const technicalCategories = CATEGORIES.filter(c => ['code-generation', 'website-builder', 'app-builder', 'cloud-platforms'].includes(c.slug));


  return (
    <>
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-40 w-72 h-screen bg-[var(--color-sidebar-bg)] transition-transform duration-300 lg:translate-x-0 border-r border-[var(--color-sidebar-border)] shadow-xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 p-4 border-b border-[var(--color-sidebar-border)] flex-shrink-0 lg:hidden">
                <span className="text-lg font-bold text-[var(--color-heading)]">{t('menu')}</span>
                <button onClick={onClose} className="p-2 rounded-md hover:bg-[var(--color-surface-hover)] text-[var(--color-text-muted)]" aria-label="Close sidebar">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div className="p-4 flex-shrink-0">
                <SearchBar onSearch={handleClose} />
            </div>

            <nav className="flex-1 px-3 pb-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                <div>
                    <div className="space-y-1">
                      <SidebarNavLink to="/most-popular" icon={<FireIcon className="w-5 h-5 text-orange-500"/>} onClose={handleClose}>{t('mostPopular')}</SidebarNavLink>
                      <SidebarNavLink to="/compare" icon={<CompareIcon className="w-5 h-5 text-blue-500"/>} onClose={handleClose}>{t('compareTools')}</SidebarNavLink>
                    </div>
                </div>

                <div className="border-t border-[var(--color-sidebar-border)] pt-4">
                    <CollapsibleSection title={t('creativeContent')}>
                    {creativeCategories.map(item => (
                        <SidebarNavLink 
                            key={item.slug} 
                            to={`/${item.slug}`} 
                            icon={item.icon && React.cloneElement(item.icon, { className: 'w-5 h-5' })} 
                            onClose={handleClose}
                        >
                            {t(`${item.slug}_name`)}
                        </SidebarNavLink>
                    ))}
                    </CollapsibleSection>
                </div>

                <div className="border-t border-[var(--color-sidebar-border)] pt-4">
                    <CollapsibleSection title={t('businessProductivity')}>
                    {businessCategories.map(item => (
                        <SidebarNavLink 
                            key={item.slug} 
                            to={`/${item.slug}`} 
                            icon={item.icon && React.cloneElement(item.icon, { className: 'w-5 h-5' })} 
                            onClose={handleClose}
                        >
                            {t(`${item.slug}_name`)}
                        </SidebarNavLink>
                    ))}
                    </CollapsibleSection>
                </div>
                
                <div className="border-t border-[var(--color-sidebar-border)] pt-4">
                    <CollapsibleSection title={t('technicalDevelopment')}>
                    {technicalCategories.map(item => (
                        <SidebarNavLink 
                            key={item.slug} 
                            to={`/${item.slug}`} 
                            icon={item.icon && React.cloneElement(item.icon, { className: 'w-5 h-5' })} 
                            onClose={handleClose}
                        >
                            {t(`${item.slug}_name`)}
                        </SidebarNavLink>
                    ))}
                    </CollapsibleSection>
                </div>

                <div className="border-t border-[var(--color-sidebar-border)] pt-4">
                    <CollapsibleSection title={t('promptLibrary')} defaultOpen={false}>
                        {PROMPTS_CATEGORIES.map(item => (
                            <SidebarNavLink 
                                key={item.slug} 
                                to={`/prompts/${item.slug}`} 
                                icon={<SparklesIcon className="w-5 h-5 text-purple-500"/>}
                                onClose={handleClose}
                            >
                                {t(`${item.slug}_name`)}
                            </SidebarNavLink>
                        ))}
                    </CollapsibleSection>
                </div>

                <div className="border-t border-[var(--color-sidebar-border)] pt-4 px-2">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">{t('selectLanguage')}</p>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setLanguage('en')}
                            className={`flex-1 py-2 px-3 text-xs rounded-md border transition-colors ${language === 'en' ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]' : 'bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-accent)]'}`}
                        >
                            🇺🇸 English
                        </button>
                        <button 
                             onClick={() => setLanguage('my')}
                             className={`flex-1 py-2 px-3 text-xs rounded-md border transition-colors ${language === 'my' ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]' : 'bg-[var(--color-bg)] text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-accent)]'}`}
                        >
                            🇲🇲 Myanmar
                        </button>
                    </div>
                </div>
            </nav>
        </div>
      </aside>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;
