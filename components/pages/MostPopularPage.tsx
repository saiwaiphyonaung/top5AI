import React from 'react';
import { useSeo } from '../../hooks/useSeo';
import { MOST_POPULAR_TOOLS } from '../../constants';
import AIToolCard from '../ui/AIToolCard';

const MostPopularPage: React.FC = () => {

  useSeo({
    title: "Editor's Pick: Top 10 Most Used AI Tools | Top 5 AI",
    description: 'Our curated list of the top 10 most popular and widely used AI tools in the world right now, including ChatGPT, Gemini, Midjourney, and more.',
    canonical: '#!/most-popular',
  });

  return (
    <div className="space-y-12">
      <section className="text-center pt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-heading)]">
          Editor's Pick: Top 10 Most Used AI Tools
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--color-text)]">
          These are the AI tools that have become daily drivers for millions worldwide. From writing emails to creating art and coding, this is the definitive list of AI that people actually use every day.
        </p>
      </section>
      
      <section>
        <div className="space-y-6">
          {MOST_POPULAR_TOOLS.map((tool) => (
              <AIToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MostPopularPage;
