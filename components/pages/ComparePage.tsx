
import React, { useState, useMemo } from 'react';
import { useSeo } from '../../hooks/useSeo';
import { CATEGORIES } from '../../constants';
import type { AiTool, PricingPlan } from '../../types';
import { useToolReviews, calculateDisplayScore } from '../../hooks/useToolReviews';
import { useLanguage } from '../../contexts/LanguageContext';

const ToolScore: React.FC<{ tool: AiTool }> = ({ tool }) => {
    const { reviews } = useToolReviews(tool.name);
    const displayScore = calculateDisplayScore(tool.baseScore, reviews);
    return (
      <div 
        className="text-3xl font-extrabold text-center text-[var(--color-accent)]"
        title="This score is a blend of our expert rating (70%) and user reviews (30%)."
      >
        {displayScore.toFixed(1)}
      </div>
    );
};

const ComparePage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTools, setSelectedTools] = useState<(AiTool | null)[]>([null, null, null]);

  const allTools = useMemo(() => {
    const uniqueTools = new Map<string, AiTool>();
    CATEGORIES.flatMap(cat => cat.tools).forEach(tool => {
        if (!uniqueTools.has(tool.name)) {
            uniqueTools.set(tool.name, tool);
        }
    });
    return Array.from(uniqueTools.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const groupedTools = useMemo(() => 
    CATEGORIES.map(category => ({
      label: category.name,
      options: category.tools.sort((a, b) => a.name.localeCompare(b.name))
    })), []);


  const handleSelectTool = (index: number, toolName: string) => {
    const newSelectedTools = [...selectedTools];
    const tool = allTools.find(t => t.name === toolName) || null;
    newSelectedTools[index] = tool;
    setSelectedTools(newSelectedTools);
  };
  
  const activeTools = selectedTools.filter((t): t is AiTool => t !== null);
  const title = activeTools.length > 1 ? `Compare: ${activeTools.map(t => t.name).join(' vs ')}` : t('compareTitle');
  const description = t('compareDesc');

  useSeo({
    title: `${title} | Top 5 AI`,
    description: description,
    canonical: '#!/compare',
  });

  const comparisonFields = [
    { key: 'our_score', label: t('ourScore') },
    { key: 'description', label: t('description') },
    { key: 'bestFor', label: t('bestFor') },
    { key: 'pricing', label: t('pricingModel') },
    { key: 'startingPrice', label: t('startsFrom') },
    { key: 'pricingPlans', label: t('pricingPlans') },
    { key: 'totalUsers', label: t('userBase') },
    { key: 'pros', label: t('pros') },
    { key: 'cons', label: t('cons') },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center pt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-heading)]">
          {t('compareTitle')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--color-text)]">
          {t('compareDesc')}
        </p>
      </section>

      <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map(index => (
            <div key={index}>
              <label htmlFor={`tool-select-${index}`} className="block text-sm font-bold text-[var(--color-heading)] mb-2">
                {t(`tool${index + 1}`)}
              </label>
              <select
                id={`tool-select-${index}`}
                value={selectedTools[index]?.name || ''}
                onChange={e => handleSelectTool(index, e.target.value)}
                className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
              >
                <option value="">{t('selectTool')}</option>
                {groupedTools.map(group => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map(tool => (
                      <option 
                        key={tool.name} 
                        value={tool.name}
                        disabled={selectedTools.some(st => st?.name === tool.name && st?.name !== selectedTools[index]?.name)}
                      >
                        {tool.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      {activeTools.length > 1 ? (
        <section className="overflow-x-auto">
          <div className="min-w-full align-middle">
            <table className="min-w-full border-collapse border border-[var(--color-border)] bg-[var(--color-surface)] rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-[var(--color-bg)] sticky top-0 z-10">
                <tr>
                  <th className="sticky left-0 bg-[var(--color-bg)] w-1/4 p-5 text-left text-sm font-bold text-[var(--color-heading)] border-r border-b border-[var(--color-border)] z-20">{t('feature')}</th>
                  {activeTools.map(tool => (
                    <th key={tool.name} className="p-5 text-center text-sm font-bold text-[var(--color-heading)] border-b border-[var(--color-border)] w-1/4">
                       <div className="flex flex-col items-center gap-2">
                        <img 
                          src={`https://www.google.com/s2/favicons?sz=64&domain_url=${new URL(tool.url).hostname}`} 
                          alt={`${tool.name} logo`}
                          className="w-12 h-12 rounded-lg object-contain bg-white p-1 border border-[var(--color-border)]"
                          onError={(e) => { 
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = `https://picsum.photos/seed/${tool.name}/64`;
                          }}
                        />
                        <span className="text-lg">{tool.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {comparisonFields.map(field => (
                  <tr key={field.key} className="group hover:bg-[var(--color-bg)] transition-colors">
                    <td className="sticky left-0 bg-[var(--color-surface)] group-hover:bg-[var(--color-bg)] p-5 font-semibold text-[var(--color-heading)] border-r border-[var(--color-border)] align-top transition-colors z-10">{field.label}</td>
                    {activeTools.map(tool => (
                      <td key={tool.name} className="p-5 text-sm text-[var(--color-text)] align-top">
                        {(() => {
                          if (field.key === 'our_score') {
                            return <ToolScore tool={tool} />;
                          }
                          const value = tool[field.key as keyof AiTool];
                          if (field.key === 'pros' || field.key === 'cons') {
                            return (
                              <ul className={`list-disc list-inside space-y-1 ${field.key === 'pros' ? 'text-green-700' : 'text-red-700'}`}>
                                {(value as string[] || []).map((item, i) => <li key={i}><span className="text-[var(--color-text)]">{item}</span></li>)}
                              </ul>
                            );
                          }
                          if (field.key === 'pricingPlans' && Array.isArray(value)) {
                            return (
                                <div className="space-y-3">
                                    {(value as PricingPlan[]).map((plan, i) => (
                                        <div key={i} className="text-xs">
                                            <p className="font-bold text-[var(--color-heading)] flex justify-between items-baseline">
                                                <span>{plan.name}</span>
                                                <span className="font-semibold">{plan.price}</span>
                                            </p>
                                            <ul className="list-disc list-inside text-[var(--color-text-muted)] text-xs mt-1 pl-1">
                                                {plan.features.map((f, j) => <li key={j}>{f}</li>)}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            );
                          }
                          return String(value || 'N/A');
                        })()}
                      </td>
                    ))}
                  </tr>
                ))}
                 <tr className="group hover:bg-[var(--color-bg)] transition-colors">
                    <td className="sticky left-0 bg-[var(--color-surface)] group-hover:bg-[var(--color-bg)] p-5 font-semibold text-[var(--color-heading)] border-r border-[var(--color-border)] align-top transition-colors"></td>
                    {activeTools.map(tool => (
                        <td key={tool.name} className="p-5">
                            <a 
                                href={tool.url}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="block text-center bg-[var(--color-accent)] text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-all text-sm"
                            >
                                {t('visitSite')}
                            </a>
                        </td>
                    ))}
                 </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="text-center py-16 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <h2 className="text-xl font-semibold text-[var(--color-heading)]">
              {t('selectTwoTools')}
            </h2>
            <p className="text-[var(--color-text-muted)] mt-2">
              {t('useDropdowns')}
            </p>
          </div>
      )}
    </div>
  );
};

export default ComparePage;
