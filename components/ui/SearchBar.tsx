import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const SearchBar: React.FC<{ onSearch?: () => void }> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
            setQuery('');
            if(onSearch) {
                onSearch();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-xs">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for tools..."
                className="w-full pl-4 pr-10 py-2 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-colors"
                aria-label="Search for AI tools"
            />
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-text-muted)] hover:text-[var(--color-accent)]" aria-label="Submit search">
                <SearchIcon />
            </button>
        </form>
    );
};

export default SearchBar;
