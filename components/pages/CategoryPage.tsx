import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { CATEGORIES } from '../../constants';
import AIToolCard from '../ui/AIToolCard';
import { useSeo } from '../../hooks/useSeo';
import { useLanguage } from '../../contexts/LanguageContext';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { t } = useLanguage();
  const category = CATEGORIES.find(c => c.slug === categorySlug);

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
        "name": category ? t(`${category.slug}_name`) : categorySlug,
        "item": `${window.location.origin}/#/${categorySlug}`
      }
    ]
  };

  useSeo({
    title: category ? `${t(`${category.slug}_name`)} | Top 5 AI` : 'Category Not Found | Top 5 AI',
    description: category ? t(`${category.slug}_desc`) : 'The requested AI tool category could not be found.',
    canonical: `#!/${categorySlug}`,
    schemas: [breadcrumbSchema],
  });

  if (!category) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-12">
      <section className="text-center pt-8">
        <div className="flex items-center justify-center gap-4 mb-4">
           {category.icon && React.cloneElement(category.icon, { className: 'w-12 h-12 text-[var(--color-accent)]' })}
           <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-heading)]">
            {t(`${category.slug}_name`)}
          </h1>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--color-text)]">
          {t(`${category.slug}_desc`)}
        </p>
      </section>

      <section>
        <div className="space-y-6">
          {category.tools.map((tool) => (
            <AIToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;