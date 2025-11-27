import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES, PROMPTS_CATEGORIES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const creativeTools = CATEGORIES.filter(c => ['graphic-design', 'ai-writing', 'music-generation', 'video-generation'].includes(c.slug));
  const businessTools = CATEGORIES.filter(c => ['marketing-and-content', 'customer-support', 'sales-and-crm'].includes(c.slug));


  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-bold text-lg text-[var(--color-heading)]">Top 5 AI</h4>
            <p className="text-sm text-[var(--color-text)] mt-2">
              Curated reviews and rankings for the best AI tools on the market.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-heading)] mb-4">{t('creativeTools')}</h4>
            <ul className="space-y-2">
              {creativeTools.map(cat => (
                <li key={cat.slug}>
                  <NavLink to={`/${cat.slug}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{cat.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[var(--color-heading)] mb-4">{t('businessTools')}</h4>
            <ul className="space-y-2">
              {businessTools.map(cat => (
                <li key={cat.slug}>
                  <NavLink to={`/${cat.slug}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{cat.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h4 className="font-semibold text-[var(--color-heading)] mb-4">{t('popular')}</h4>
             <ul className="space-y-2">
                <li><NavLink to="/most-popular" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{t('mostPopular')}</NavLink></li>
                {PROMPTS_CATEGORIES.map(cat => (
                    <li key={cat.slug}><NavLink to={`/prompts/${cat.slug}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{cat.name}</NavLink></li>
                ))}
                <li><NavLink to="/compare" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{t('compareTools')}</NavLink></li>
             </ul>
          </div>
          
          <div>
             <h4 className="font-semibold text-[var(--color-heading)] mb-4">{t('company')}</h4>
             <ul className="space-y-2">
                <li><NavLink to="/#about" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{t('aboutUs')}</NavLink></li>
                <li><NavLink to="/#privacy" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{t('privacyPolicy')}</NavLink></li>
                <li><NavLink to="/#terms" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{t('termsOfService')}</NavLink></li>
             </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <div className="text-center text-sm text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} Top 5 AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;