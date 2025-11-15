import React, { useState } from 'react';
import type { Prompt } from '../../types';

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);


const PromptCard: React.FC<{ prompt: Prompt }> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 sm:p-6 flex-grow">
        <h3 className="text-lg font-bold text-[var(--color-heading)]">{prompt.title}</h3>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">{prompt.description}</p>
      </div>
      <div className="px-4 sm:px-6 pb-4">
        <pre className="bg-[var(--color-bg)] text-sm text-[var(--color-text)] p-4 rounded-md overflow-x-auto font-mono border border-[var(--color-border)]">
          <code>{prompt.promptText}</code>
        </pre>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 border-t border-[var(--color-border)]">
        <button
          onClick={handleCopy}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-[var(--color-accent)] text-white hover:opacity-90'
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
        </button>
      </div>
    </div>
  );
};

export default PromptCard;