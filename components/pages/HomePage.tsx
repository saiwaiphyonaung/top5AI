





import React, { useMemo, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSeo } from '../../hooks/useSeo';
import { FAQ_DATA, CATEGORIES } from '../../constants';
import AIToolCard from '../ui/AIToolCard';
import useCountUp from '../../hooks/useCountUp';
import type { AiTool } from '../../types';
import CompareToolsBanner from '../ui/CompareToolsBanner';
import ContactForm from '../ui/ContactForm';

// Icons for About, Privacy, Terms
const InfoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ShieldIcon: React.FC<{className?: string}> = ({className = "h-8 w-8"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} text-[var(--color-accent)]`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 019-4.016l.146.066a11.955 11.955 0 019 4.016l-.01-14.975z" />
    </svg>
);
const DocumentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
const UsersIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
const TrophyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);

const HomePage: React.FC = () => {
  const usersCardRef = useRef<HTMLDivElement>(null);
  const businessesCardRef = useRef<HTMLDivElement>(null);

  const usersCount = useCountUp(usersCardRef, 90);
  const businessesCount = useCountUp(businessesCardRef, 1);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": window.location.origin,
    "name": "Top 5 AI",
    "description": "Your ultimate guide to the best AI tools. We rank, review, and compare the top 5 AI solutions in graphics, writing, education, and more.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/#search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Top 5 AI",
    "url": window.location.origin,
    "logo": "https://picsum.photos/seed/top5ai-logo/200/60" // Placeholder logo
  };

  useSeo({
    title: "Top 5 AI - Your Ultimate Guide to the Best AI Tools",
    description: "Discover the best AI tools on the market. We provide expert reviews, in-depth analysis, and rankings for categories like Graphic Design, Writing, Music, and more.",
    canonical: '#!/',
    schemas: [websiteSchema, organizationSchema, FAQ_DATA],
  });

  const allToolsFromCategories = useMemo(() => {
    const uniqueTools = new Map<string, AiTool>();
    CATEGORIES.forEach(category => {
        category.tools.forEach(tool => {
            if (!uniqueTools.has(tool.name)) {
                uniqueTools.set(tool.name, tool);
            }
        });
    });
    return Array.from(uniqueTools.values());
  }, []);

  const newReleaseToolNames = ['Sora', 'Udio', 'Magnific AI', 'Durable', 'Fireflies.ai'];
  const newReleaseTools = newReleaseToolNames
      .map(name => allToolsFromCategories.find(tool => tool.name === name))
      .filter((tool): tool is AiTool => !!tool)
      .sort((a, b) => b.baseScore - a.baseScore)
      .map((tool, index) => ({ ...tool, rank: index + 1 }));

  return (
    <div className="space-y-24 md:space-y-32">
      {/* Hero Section */}
      <section className="text-center pt-8">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[var(--color-heading)] leading-tight">
          Find the <span className="text-[var(--color-accent)]">Best AI Tools</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--color-text)]">
          We rank, review, and compare the top AI solutions to supercharge your creativity and productivity. Your definitive guide to the world of artificial intelligence.
        </p>
      </section>

      {/* Stats Section */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-[var(--color-surface)] rounded-xl shadow-sm border border-[var(--color-border)] flex flex-col md:flex-row items-center justify-around p-8 gap-8 md:gap-4">
          <div ref={usersCardRef} className="flex flex-col items-center text-center">
            <UsersIcon />
            <p className="text-5xl font-extrabold text-[var(--color-heading)] mt-3">
              {usersCount}M+
            </p>
            <p className="text-lg text-[var(--color-text-muted)] mt-1">Users Empowered by AI</p>
          </div>
          <div className="w-full md:w-px h-px md:h-20 bg-[var(--color-border)]"></div>
          <div ref={businessesCardRef} className="flex flex-col items-center text-center">
            <TrophyIcon />
            <p className="text-5xl font-extrabold text-[var(--color-heading)] mt-3">
              #{businessesCount}
            </p>
            <p className="text-lg text-[var(--color-text-muted)] mt-1">Trusted Resource for AI Reviews</p>
          </div>
        </div>
      </section>

      {/* New Release AI Tools */}
      <section>
        <h2 className="text-3xl font-bold text-center text-[var(--color-heading)]">New Release AI Tools</h2>
        <p className="mt-3 max-w-xl mx-auto text-center text-[var(--color-text)]">
          Check out the latest and most exciting AI tools hitting the market. Stay ahead of the curve with these cutting-edge solutions.
        </p>
        <div className="mt-12 space-y-6">
          {newReleaseTools.map(tool => (
            <AIToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>

      {/* Compare Tools Banner */}
      <CompareToolsBanner />

      {/* Categories Section */}
      <section id="categories">
        <h2 className="text-3xl font-bold text-center text-[var(--color-heading)]">Explore AI by Category</h2>
        <p className="mt-3 max-w-xl mx-auto text-center text-[var(--color-text)]">
          Whether you're a creative, a developer, or a business professional, find the perfect AI tool for your specific needs.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.slice(0, 9).map(category => (
            <NavLink
              key={category.slug}
              to={`/${category.slug}`}
              className="group block bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] transition-all duration-300 hover:shadow-lg hover:border-[var(--color-accent)]"
            >
              <div className="flex items-center gap-4">
                {category.icon && React.cloneElement(category.icon, { className: 'w-8 h-8 text-[var(--color-accent)]' })}
                <h3 className="text-lg font-bold text-[var(--color-heading)]">{category.name}</h3>
              </div>
              <p className="text-sm text-[var(--color-text)] mt-3">
                {category.metaDescription.substring(0, 100)}...
              </p>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Info Sections */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" id="about">
          <div className="bg-[var(--color-surface)] p-8 rounded-xl shadow-sm border border-[var(--color-border)]">
              <InfoIcon />
              <h3 className="text-xl font-bold mt-4">About Us</h3>
              <p className="mt-2 text-sm">We are a dedicated team of AI enthusiasts and experts committed to providing clear, unbiased, and practical reviews of AI tools.</p>
          </div>
          <div className="bg-[var(--color-surface)] p-8 rounded-xl shadow-sm border border-[var(--color-border)]" id="privacy">
              <ShieldIcon />
              <h3 className="text-xl font-bold mt-4">Privacy First</h3>
              <p className="mt-2 text-sm">Your trust is paramount. We are committed to protecting your privacy and being transparent about how we operate.</p>
          </div>
          <div className="bg-[var(--color-surface)] p-8 rounded-xl shadow-sm border border-[var(--color-border)]" id="terms">
              <DocumentIcon />
              <h3 className="text-xl font-bold mt-4">Terms of Service</h3>
              <p className="mt-2 text-sm">By using our site, you agree to our terms, which ensure a fair and reliable experience for our entire community.</p>
          </div>
      </section>
      
      {/* Contact Us Section */}
      <section id="contact-us" className="max-w-4xl mx-auto">
        <div className="bg-[var(--color-surface)] p-8 sm:p-12 rounded-xl shadow-sm border border-[var(--color-border)]">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-[var(--color-heading)]">Get in Touch</h2>
                <p className="mt-3 max-w-xl mx-auto text-[var(--color-text)]">
                    Have questions, feedback, or suggestions? We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.
                </p>
            </div>
            <ContactForm />
        </div>
      </section>

    </div>
  );
};

export default HomePage;