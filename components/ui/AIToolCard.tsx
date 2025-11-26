
import React, { useState, useEffect, useRef } from 'react';
import type { AiTool, PricingTier } from '../../types';
import AIToolDetails from './AIToolDetails';
import { useToolReviews, calculateDisplayScore } from '../../hooks/useToolReviews';
import { useLanguage } from '../../contexts/LanguageContext';

const UserGroupIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
  
const GlobeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9a9 9 0 018.6 0M12 21a9 9 0 01-9-9h18a9 9 0 01-9 9z" />
    </svg>
);

// --- Share Icons ---
const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);
const TwitterIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const LinkedInIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" /></svg>
);
const FacebookIcon: React.FC = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
);
const CopyLinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const FlagIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-5 h-5"} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
    </svg>
);


const getPricingBadgeStyles = (pricing: PricingTier) => {
    switch (pricing) {
      case 'Free': return 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20';
      case 'Freemium': return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
      case 'Paid': return 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20';
      case 'Free Trial': return 'bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20';
      default: return 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20';
    }
};

const AIToolCard: React.FC<{ tool: AiTool; }> = ({ tool }) => {
  const { t } = useLanguage();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);
  
  const { reviews } = useToolReviews(tool.name);
  const displayScore = calculateDisplayScore(tool.baseScore, reviews);

  const domain = new URL(tool.url).hostname.replace('www.', '');
  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
  const detailsId = `details-${tool.name.replace(/\s+/g, '-')}`;

  const handleReportData = () => {
    const subject = `Incorrect Data Report for ${tool.name}`;
    const body = `Hello Top 5 AI Team,

I've noticed some incorrect information for the tool "${tool.name}".

Tool URL: ${tool.url}
Our Page Link: ${window.location.href}

Please specify what is incorrect below:
- 
- 
- 

Thank you!
`;
    window.location.href = `mailto:feedback@top5.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shareMenuRef]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tool.url).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsShareMenuOpen(false);
      }, 1500);
    });
  };

  const shareText = `Check out ${tool.name} - a powerful AI tool for ${tool.bestFor}! #AI #Top5AI`;
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(tool.url)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(tool.url)}&title=${encodeURIComponent(`Discover ${tool.name}`)}&summary=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tool.url)}`,
  };

  return (
    <article className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl transition-shadow duration-300 hover:shadow-md">
      <div className="absolute top-4 right-4 z-10" ref={shareMenuRef}>
        <button 
          onClick={() => setIsShareMenuOpen(prev => !prev)}
          className="p-2 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-accent)] transition-colors"
          aria-label="Share tool"
        >
          <ShareIcon />
        </button>
        {isShareMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-[var(--color-surface)] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
            <div className="px-1 py-1 ">
              <p className="px-3 pb-2 text-xs font-semibold text-[var(--color-text)] border-b border-[var(--color-border)]">Share on</p>
              <div className="pt-2 space-y-1">
                <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] rounded-md">
                  <TwitterIcon /> Twitter / X
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] rounded-md">
                  <LinkedInIcon /> LinkedIn
                </a>
                 <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] rounded-md">
                  <FacebookIcon /> Facebook
                </a>
                <button onClick={handleCopyLink} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] rounded-md">
                  {copied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyLinkIcon />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>
            <div className="pt-2 mt-2 border-t border-[var(--color-border)] px-1">
                <button onClick={handleReportData} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-text-muted)] hover:text-red-600 hover:bg-[var(--color-surface-hover)] transition-colors group rounded-md">
                    <FlagIcon className="w-5 h-5 text-red-500/80 group-hover:text-red-600 transition-colors" /> {t('reportIncorrectData')}
                </button>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
        {/* Rank */}
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full text-center self-start sm:self-center">
            <span className="text-xl font-bold text-[var(--color-accent)]">{tool.rank}</span>
        </div>
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            src={faviconUrl} 
            alt={`${tool.name} logo`}
            className="w-16 h-16 rounded-lg object-contain bg-white p-1 border border-[var(--color-border)]"
            onError={(e) => { 
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://picsum.photos/seed/${tool.name}/64`;
            }}
          />
        </div>
        
        {/* Main Info */}
        <div className="flex-grow text-center sm:text-left">
            <h3 className="text-lg font-bold text-[var(--color-heading)]">{tool.name}</h3>
            <p className="text-sm text-[var(--color-text)] mt-1">{tool.description}</p>

            <div className="mt-3 flex items-center justify-center sm:justify-start gap-x-4 gap-y-2 flex-wrap text-sm text-[var(--color-text-muted)]">
              <div className="flex items-center gap-1.5" title="Total Worldwide Users">
                <UserGroupIcon />
                <span className="font-semibold text-[var(--color-text)]">{tool.totalUsers}</span>
              </div>
              {tool.usageByNation && tool.usageByNation.length > 0 && (
                <div className="flex items-center gap-1.5" title={`Top users by nation: ${tool.usageByNation.map(n => `${n.nation} ${n.percentage}%`).join(', ')}`}>
                  <GlobeIcon />
                  <div className="flex items-center gap-1.5">
                    {tool.usageByNation.slice(0, 4).map(item => (
                      <span key={item.nation} className="text-lg" role="img" aria-label={`${item.nation} flag`}>{item.flag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-md ${getPricingBadgeStyles(tool.pricing)}`}>
                  {tool.pricing}
              </span>
              <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-md bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20">
                  {tool.bestFor}
              </span>
            </div>
        </div>

        {/* Score */}
        <div 
            className="w-24 text-center flex-shrink-0"
            title="This score is a blend of our expert rating (70%) and user reviews (30%)."
        >
            <div className="text-4xl font-extrabold text-[var(--color-accent)]">{displayScore.toFixed(1)}</div>
        </div>

        {/* Actions */}
        <div className="w-full sm:w-32 flex-shrink-0 flex sm:flex-col items-stretch gap-2">
          <a 
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex-1 text-center bg-[var(--color-accent)] text-white font-bold py-2.5 px-4 rounded-lg hover:opacity-90 transition-all text-sm shadow-sm"
          >
            {t('visitSite')}
          </a>
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="flex-1 flex items-center justify-center gap-1 text-center bg-white border border-[var(--color-border)] text-[var(--color-text)] font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-all text-sm"
            aria-expanded={isDetailsOpen}
            aria-controls={detailsId}
          >
            <span>{t('details')}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${isDetailsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      {isDetailsOpen && <AIToolDetails tool={tool} />}

    </article>
  );
};

export default AIToolCard;
