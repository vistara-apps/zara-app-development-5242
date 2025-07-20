import React, { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';

const SearchBox = ({ onSearch, isLoading, placeholder = "Share what's on your heart..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const suggestions = [
    "I'm feeling anxious about my future",
    "How can I forgive someone who hurt me?",
    "I'm struggling with loss and grief",
    "Need guidance on making a difficult decision",
    "Feeling lost and seeking purpose"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="search-input w-full pl-12 pr-16 py-4 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Seek</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Suggestions */}
      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3 text-center">Or try one of these:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setQuery(suggestion)}
              className="px-3 py-2 bg-white/80 hover:bg-white text-gray-700 text-sm rounded-full border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;