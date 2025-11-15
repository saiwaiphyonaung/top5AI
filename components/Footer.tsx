import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES, PROMPTS_CATEGORIES } from '../constants';
import { useVisitorCount } from '../../hooks/useVisitorCount';

const Footer: React.FC = () => {
  const visitorCount = useVisitorCount();

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
            <h4 className="font-semibold text-[var(--color-heading)] mb-4">Creative Tools</h4>
            <ul className="space-y-2">
              {creativeTools.map(cat => (
                <li key={cat.slug}>
                  <NavLink to={`/${cat.slug}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{cat.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[var(--color-heading)] mb-4">Business Tools</h4>
            <ul className="space-y-2">
              {businessTools.map(cat => (
                <li key={cat.slug}>
                  <NavLink to={`/${cat.slug}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{cat.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h4 className="font-semibold text-[var(--color-heading)] mb-4">Popular</h4>
             <ul className="space-y-2">
                <li><NavLink to="/most-popular" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">Most Popular Tools</NavLink></li>
                {PROMPTS_CATEGORIES.map(cat => (
                    <li key={cat.slug}><NavLink to={`/prompts/${cat.slug}`} className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">{cat.name} Prompts</NavLink></li>
                ))}
                <li><NavLink to="/compare" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">Compare Tools</NavLink></li>
             </ul>
          </div>
          
          <div>
             <h4 className="font-semibold text-[var(--color-heading)] mb-4">Company</h4>
             <ul className="space-y-2">
                <li><NavLink to="/#about" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">About Us</NavLink></li>
                <li><NavLink to="/#privacy" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">Privacy Policy</NavLink></li>
                <li><NavLink to="/#terms" className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors">Terms of Service</NavLink></li>
             </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-border)] pt-8 text-center text-sm text-[var(--color-text-muted)]">
          {visitorCount !== null && (
            <p className="mb-2" aria-live="polite">
              Total Visitors: {visitorCount.toLocaleString()}
            </p>
          )}
          &copy; {new Date().getFullYear()} Top 5 AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;