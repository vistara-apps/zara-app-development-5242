import React, { useState, useContext } from 'react';
import { Filter, BookOpen, Sparkles } from 'lucide-react';
import SearchBox from '../components/SearchBox';
import VerseCard from '../components/VerseCard';
import AuthContext from '../contexts/AuthContext';
import { findRelevantVerses } from '../services/aiService';

const Search = () => {
  const [verses, setVerses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScriptures, setSelectedScriptures] = useState(['bible', 'quran', 'bhagavad-gita', 'ramayana']);
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useContext(AuthContext);

  const scriptures = [
    { id: 'bible', name: 'Bible', tradition: 'Christianity' },
    { id: 'quran', name: 'Quran', tradition: 'Islam' },
    { id: 'bhagavad-gita', name: 'Bhagavad Gita', tradition: 'Hinduism' },
    { id: 'ramayana', name: 'Ramayana', tradition: 'Hinduism' },
    { id: 'buddhist', name: 'Buddhist Texts', tradition: 'Buddhism' },
    { id: 'psalms', name: 'Book of Psalms', tradition: 'Christianity' }
  ];

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    try {
      const foundVerses = await findRelevantVerses(query, selectedScriptures);
      setVerses(foundVerses);
    } catch (error) {
      console.error('Search error:', error);
      setVerses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleScripture = (scriptureId) => {
    setSelectedScriptures(prev => {
      if (prev.includes(scriptureId)) {
        return prev.filter(id => id !== scriptureId);
      } else {
        return [...prev, scriptureId];
      }
    });
  };

  const recentSearches = user ? [
    "How to find peace in difficult times",
    "Guidance for making hard decisions",
    "Dealing with loss and grief",
    "Finding purpose in life"
  ] : [];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Spiritual Search
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover divine wisdom tailored to your personal challenges and questions
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <SearchBox 
            onSearch={handleSearch} 
            isLoading={isLoading}
            placeholder="What spiritual guidance do you seek today?"
          />

          {/* Filters */}
          <div className="mt-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <Filter className="h-4 w-4" />
              <span>Filter Scriptures</span>
            </button>

            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Select scriptures to search:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {scriptures.map((scripture) => (
                    <label key={scripture.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedScriptures.includes(scripture.id)}
                        onChange={() => toggleScripture(scripture.id)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{scripture.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Searches */}
        {user && recentSearches.length > 0 && !searchQuery && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-purple-600" />
              <span>Your Recent Searches</span>
            </h3>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="w-full text-left p-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Searching for divine guidance...</p>
          </div>
        )}

        {verses.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span>Guidance Found</span>
              </h2>
              <span className="text-sm text-gray-500">
                {verses.length} verse{verses.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {verses.map((verse, index) => (
                <VerseCard 
                  key={index} 
                  {...verse} 
                  userQuery={searchQuery}
                />
              ))}
            </div>
          </div>
        )}

        {searchQuery && !isLoading && verses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No verses found</h3>
            <p className="text-gray-500 mb-6">Try rephrasing your search or selecting different scriptures</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setVerses([]);
              }}
              className="btn-secondary"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;