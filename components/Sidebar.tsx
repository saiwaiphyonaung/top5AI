import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES, PROMPTS_CATEGORIES } from '../constants';
import SearchBar from './ui/SearchBar';

const SidebarNavLink: React.FC<{ to: string, children: React.ReactNode, icon?: React.ReactNode, onClose: () => void }> = ({ to, children, icon, onClose }) => {
    return (
        <NavLink
            to={to}
            onClick={onClose}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-[var(--color-sidebar-accent)] text-white' : 'text-[var(--color-sidebar-text)] hover:bg-gray-200/50 hover:text-[var(--color-sidebar-text-hover)]'
            }`}
        >
            {icon && <span className="flex-shrink-0 w-4 h-4">{icon}</span>}
            <span className="flex-grow">{children}</span>
        </NavLink>
    );
};

// Collapsible section component
const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => (
  <details className="group" open={defaultOpen}>
    <summary className="flex items-center justify-between px-3 py-2 cursor-pointer text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-[var(--color-sidebar-text-hover)] list-none">
      <span>{title}</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <div className="mt-1 space-y-1">
      {children}
    </div>
  </details>
);


const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {

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
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[var(--color-sidebar-bg)] transition-transform lg:translate-x-0 border-r border-[var(--color-sidebar-border)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-end h-16 p-4 border-b border-[var(--color-sidebar-border)] flex-shrink-0">
                <button onClick={onClose} className="lg:hidden text-[var(--color-sidebar-text)] hover:text-[var(--color-sidebar-text-hover)]" aria-label="Close sidebar">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div className="p-4 flex-shrink-0">
                <SearchBar onSearch={handleClose} />
            </div>

            <nav className="flex-1 px-4 pb-4 space-y-4 overflow-y-auto">
                <div>
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Main</h3>
                    <div className="space-y-1">
                      <SidebarNavLink to="/most-popular" onClose={handleClose}>Most Popular</SidebarNavLink>
                      <SidebarNavLink to="/new-and-trending" onClose={handleClose}>New & Trending</SidebarNavLink>
                      <SidebarNavLink to="/compare" onClose={handleClose}>Compare Tools</SidebarNavLink>
                    </div>
                </div>

                <CollapsibleSection title="Creative & Content">
                  {creativeCategories.map(item => (
                      <SidebarNavLink 
                          key={item.slug} 
                          to={`/${item.slug}`} 
                          icon={item.icon && React.cloneElement(item.icon, { className: 'w-4 h-4' })} 
                          onClose={handleClose}
                      >
                          {item.name}
                      </SidebarNavLink>
                  ))}
                </CollapsibleSection>

                <CollapsibleSection title="Business & Productivity">
                  {businessCategories.map(item => (
                      <SidebarNavLink 
                          key={item.slug} 
                          to={`/${item.slug}`} 
                          icon={item.icon && React.cloneElement(item.icon, { className: 'w-4 h-4' })} 
                          onClose={handleClose}
                      >
                          {item.name}
                      </SidebarNavLink>
                  ))}
                </CollapsibleSection>
                
                <CollapsibleSection title="Technical & Development">
                  {technicalCategories.map(item => (
                      <SidebarNavLink 
                          key={item.slug} 
                          to={`/${item.slug}`} 
                          icon={item.icon && React.cloneElement(item.icon, { className: 'w-4 h-4' })} 
                          onClose={handleClose}
                      >
                          {item.name}
                      </SidebarNavLink>
                  ))}
                </CollapsibleSection>

                <CollapsibleSection title="Prompts">
                    {PROMPTS_CATEGORIES.map(item => (
                        <SidebarNavLink key={item.slug} to={`/prompts/${item.slug}`} onClose={handleClose}>{item.name}</SidebarNavLink>
                    ))}
                </CollapsibleSection>
            </nav>
        </div>
      </aside>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onClose}></div>}
    </>
  );
};

export default Sidebar;