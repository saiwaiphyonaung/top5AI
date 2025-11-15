import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PROMPTS_CATEGORIES } from '../../constants';
import PromptCard from '../ui/PromptCard';
import { useSeo } from '../../hooks/useSeo';

const PromptsPage: React.FC = () => {
  const { promptCategorySlug } = useParams<{ promptCategorySlug: string }>();
  const category = PROMPTS_CATEGORIES.find(c => c.slug === promptCategorySlug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Prompts",
        "item": `${window.location.origin}/#/prompts/${PROMPTS_CATEGORIES[0].slug}`
      },
       {
        "@type": "ListItem",
        "position": 3,
        "name": category?.name,
        "item": `${window.location.origin}/#/prompts/${category?.slug}`
      }
    ]
  };

  useSeo({
    title: category?.metaTitle || 'Prompts Not Found | Top 5 AI',
    description: category?.metaDescription || 'The requested category of prompts could not be found.',
    canonical: `#!/prompts/${promptCategorySlug}`,
    schemas: [breadcrumbSchema],
  });

  if (!category) {
    // Navigate to the first prompt category if the slug is invalid
    return <Navigate to={`/prompts/${PROMPTS_CATEGORIES[0].slug}`} replace />;
  }

  return (
    <div className="space-y-12">
      <section className="text-center pt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-heading)]">
          AI Prompts for <span className="text-[var(--color-accent)]">{category.name}</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--color-text-muted)]">
          {category.metaDescription}
        </p>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {category.prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </section>
    </div>
  );
};

export default PromptsPage;