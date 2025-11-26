
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const Versus: React.FC = () => (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold text-sm shadow-md">
        VS
    </div>
);

const ToolIcon: React.FC<{ name: string; url: string }> = ({ name, url }) => {
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${new URL(url).hostname}`;
    return (
        <div className="group relative">
            <img 
                src={faviconUrl} 
                alt={`${name} logo`}
                className="w-16 h-16 rounded-2xl object-contain bg-white p-2 border-2 border-white/50 shadow-lg transition-transform duration-300 group-hover:-translate-y-1"
                onError={(e) => { 
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://picsum.photos/seed/${name}/64`;
                }}
            />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{name}</span>
        </div>
    );
};

const CompareToolsBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section 
        className="rounded-2xl shadow-xl overflow-hidden text-white"
        style={{ background: 'linear-gradient(to right, var(--color-banner-gradient-from), var(--color-banner-gradient-to))' }}
    >
        <div className="container mx-auto p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                    {t('compareBannerTitle')}
                </h2>
                <p className="mt-4 max-w-lg mx-auto lg:mx-0 text-lg text-white/90">
                    {t('compareBannerDesc')}
                </p>
                <NavLink 
                    to="/compare"
                    className="mt-8 inline-block bg-white text-[var(--color-accent)] font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                    {t('compareNow')}
                </NavLink>
            </div>
            
            {/* Visuals */}
            <div className="lg:w-1/2 flex items-center justify-center gap-4 sm:gap-6">
                <ToolIcon name="ChatGPT" url="https://chat.openai.com/" />
                <Versus />
                <ToolIcon name="Midjourney" url="https://www.midjourney.com/" />
                <Versus />
                <ToolIcon name="Gemini" url="https://gemini.google.com/" />
            </div>
        </div>
    </section>
  );
};

export default CompareToolsBanner;
