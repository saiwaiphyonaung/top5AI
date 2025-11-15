import React, { useState, useEffect, useRef } from 'react';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../constants';
import AIToolCard from '../ui/AIToolCard';
import { useSeo } from '../../hooks/useSeo';

const TOOLS_PER_PAGE = 10;

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  
  const [currentPage, setCurrentPage] = useState(1);
  const listRef = useRef<HTMLElement>(null);

  // Effect to reset page and scroll to top on category change
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [categorySlug]);

  // Effect to scroll to top of list when paginating
  useEffect(() => {
    if (currentPage > 1) {
      listRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);


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
        "name": category?.name,
        "item": `${window.location.origin}/#/${category?.slug}`
      }
    ]
  };

  const itemListSchema = category ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Top AI ${category.name} Tools`,
    "description": category.metaDescription,
    "itemListElement": category.tools.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": tool.name,
        "url": tool.url,
        "description": tool.description,
        "applicationCategory": `${category.name}Tool`,
        "aggregateRating": {
          "@type": "AggregateRating",
          // FIX: Replaced `tool.score` with `tool.baseScore` as `score` does not exist on the AiTool type.
          "ratingValue": tool.baseScore,
          "bestRating": "10",
          "ratingCount": "1"
        }
      }
    }))
  } : null;

  const schemas: object[] = [breadcrumbSchema];
  if (itemListSchema) {
    schemas.push(itemListSchema);
  }

  useSeo({
    title: category?.metaTitle || 'Category Not Found | Top 5 AI',
    description: category?.metaDescription || 'The requested category of AI tools could not be found.',
    canonical: `#!/${categorySlug}`,
    schemas: schemas,
  });

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const sortedTools = category.tools.sort((a, b) => a.rank - b.rank);
  
  // Pagination logic
  const needsPagination = sortedTools.length > TOOLS_PER_PAGE;
  const totalPages = Math.ceil(sortedTools.length / TOOLS_PER_PAGE);
  const paginatedTools = needsPagination
    ? sortedTools.slice((currentPage - 1) * TOOLS_PER_PAGE, currentPage * TOOLS_PER_PAGE)
    : sortedTools;

  const relatedCategories = CATEGORIES
    .filter(c => c.slug !== category.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <div className="space-y-16">
      <section className="text-center pt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-heading)]">
          Top AI <span className="text-[var(--color-accent)]">{category.name}</span> Tools
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--color-text)]">
          {category.metaDescription}
        </p>
         <p className="text-sm text-[var(--color-text-muted)] mt-4">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </section>

      <section ref={listRef} className="scroll-mt-28">
        <div className="space-y-6">
          {paginatedTools.map((tool) => (
              <AIToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>

      {needsPagination && (
        <nav aria-label="Tool list pagination" className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[var(--color-surface)] text-[var(--color-text)] rounded-lg border border-[var(--color-border)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <span className="text-sm font-medium text-[var(--color-text-muted)]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[var(--color-surface)] text-[var(--color-text)] rounded-lg border border-[var(--color-border)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
        </nav>
      )}

      <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-[var(--color-heading)] mb-6 text-center">Discover More Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedCategories.map((cat) => (
            <NavLink 
              key={cat.slug} 
              to={`/${cat.slug}`}
              className="text-center font-semibold p-4 sm:p-6 bg-white border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-200 hover:bg-blue-50/40 flex items-center justify-center min-h-[100px] sm:min-h-[120px]"
            >
                {cat.name}
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;