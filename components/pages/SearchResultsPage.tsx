import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../../constants';
import AIToolCard from '../ui/AIToolCard';
import { useSeo } from '../../hooks/useSeo';
import type { AiTool } from '../../types';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useSeo({
    title: query ? `Search results for "${query}"` : 'Search | Top 5 AI',
    description: `Find the best AI tools based on your search for: ${query}.`,
    canonical: `#!/search?q=${query || ''}`,
  });

  const searchResults: AiTool[] = React.useMemo(() => {
    if (!query) {
      return [];
    }

    const lowerCaseQuery = query.toLowerCase();
    const results: AiTool[] = [];
    const addedTools = new Set<string>();

    CATEGORIES.forEach(category => {
      const categoryNameMatch = category.name.toLowerCase().includes(lowerCaseQuery);

      category.tools.forEach(tool => {
        if (addedTools.has(tool.name)) {
          return;
        }

        const toolNameMatch = tool.name.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch = tool.description.toLowerCase().includes(lowerCaseQuery);
        const bestForMatch = tool.bestFor.toLowerCase().includes(lowerCaseQuery);

        if (toolNameMatch || descriptionMatch || bestForMatch || categoryNameMatch) {
          results.push(tool);
          addedTools.add(tool.name);
        }
      });
    });

    return results;
  }, [query]);

  return (
    <div className="space-y-12">
      <section className="text-center pt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-heading)]">
          {query ? `Search Results for "${query}"` : 'Search for an AI Tool'}
        </h1>
        {query && (
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}.
          </p>
        )}
      </section>

      <section>
        {query && searchResults.length > 0 ? (
          <div className="space-y-6">
            {searchResults.map(tool => (
              <AIToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-[var(--color-heading)]">
              {query ? 'No Results Found' : 'Please enter a term to search.'}
            </h2>
            <p className="text-[var(--color-text-muted)] mt-2">
              {query ? `We couldn't find any tools matching your search.` : 'Try searching for a tool name, category, or feature.'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResultsPage;
