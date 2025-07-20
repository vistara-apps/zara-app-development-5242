import React, { useState } from 'react';
import { Search, BookOpen, Globe, Compass, Crown, Lock } from 'lucide-react';
import { compareAcrossScriptures } from '../services/aiService';
import { usePaymentContext } from '../hooks/usePaymentContext';

const CrossScripture = () => {
  const [topic, setTopic] = useState('');
  const [comparison, setComparison] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const { createSession } = usePaymentContext();

  const popularTopics = [
    'Love and Compassion',
    'Forgiveness',
    'Hope and Faith',
    'Wisdom and Knowledge',
    'Peace and Harmony',
    'Justice and Fairness',
    'Gratitude',
    'Courage and Strength'
  ];

  const handleSearch = async (searchTopic) => {
    if (!isPremium) {
      return;
    }

    setTopic(searchTopic);
    setIsLoading(true);
    
    try {
      const result = await compareAcrossScriptures(searchTopic);
      setComparison(result);
    } catch (error) {
      console.error('Cross-scripture search error:', error);
      setComparison(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePremiumUpgrade = async () => {
    try {
      await createSession();
      setIsPremium(true);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  const getScriptureColor = (name) => {
    const colors = {
      'Bible': 'from-blue-500 to-blue-600',
      'Quran': 'from-green-500 to-green-600',
      'Bhagavad Gita': 'from-orange-500 to-orange-600',
      'Buddhist': 'from-yellow-500 to-yellow-600',
      'Torah': 'from-purple-500 to-purple-600'
    };
    return colors[name] || 'from-gray-500 to-gray-600';
  };

  if (!isPremium) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Feature Showcase */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Cross-Scripture Comparison
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Discover how different faiths approach life's big questions. Compare wisdom across traditions and find universal truths.
            </p>
          </div>

          {/* Premium Features */}
          <div className="card mb-8 border-2 border-purple-200">
            <div className="text-center mb-6">
              <Lock className="h-12 w-12 text-purple-600 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Premium Feature</h2>
              <p className="text-gray-600">Unlock cross-scripture comparison for deeper spiritual insights</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <span>What you'll get:</span>
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Compare verses across 5+ major scriptures</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Identify common themes and differences</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Practical insights for interfaith understanding</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Unlimited searches and comparisons</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3">Example Topic: "Forgiveness"</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-blue-800">Bible</p>
                    <p className="text-sm text-gray-600">"Forgive as you have been forgiven"</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-green-500">
                    <p className="text-sm font-medium text-green-800">Quran</p>
                    <p className="text-sm text-gray-600">"Forgiveness is closer to righteousness"</p>
                  </div>
                  <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                    <p className="text-sm font-medium text-orange-800">Bhagavad Gita</p>
                    <p className="text-sm text-gray-600">"Forgiveness is virtue; forgiveness is sacrifice"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl mb-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">$10/month</div>
                <p className="text-gray-600">Full access to premium features</p>
              </div>

              <button
                onClick={handlePremiumUpgrade}
                className="btn-primary text-lg px-8 py-3"
              >
                <Crown className="h-5 w-5 mr-2" />
                Upgrade to Premium
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Secure payment via blockchain • Cancel anytime
              </p>
            </div>
          </div>

          {/* Popular Topics Preview */}
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Compass className="h-5 w-5 text-purple-600" />
              <span>Popular Comparison Topics</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularTopics.map((topic, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg text-center text-gray-600 opacity-75"
                >
                  <Lock className="h-4 w-4 mx-auto mb-1" />
                  <span className="text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Cross-Scripture Comparison
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore how different faiths approach the same spiritual concepts and find universal wisdom
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (topic.trim()) handleSearch(topic.trim());
            }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a spiritual topic or concept..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!topic.trim() || isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-6 py-2"
              >
                {isLoading ? 'Comparing...' : 'Compare'}
              </button>
            </div>
          </form>

          {/* Popular Topics */}
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3 text-center">Popular topics:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularTopics.map((popularTopic, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(popularTopic)}
                  className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm rounded-full border border-purple-200 hover:border-purple-300 transition-all duration-200"
                >
                  {popularTopic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Comparing across scriptures...</p>
          </div>
        )}

        {/* Comparison Results */}
        {comparison && (
          <div className="space-y-8">
            {/* Topic Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                "{comparison.topic}"
              </h2>
              <p className="text-gray-600">Across Different Faith Traditions</p>
            </div>

            {/* Scripture Comparisons */}
            <div className="grid gap-6 md:grid-cols-2">
              {comparison.scriptures?.map((scripture, index) => (
                <div key={index} className="card">
                  <div className={`flex items-center justify-between mb-4 p-3 -mx-3 -mt-3 rounded-t-lg bg-gradient-to-r ${getScriptureColor(scripture.name)}`}>
                    <div className="flex items-center space-x-2 text-white">
                      <BookOpen className="h-5 w-5" />
                      <span className="font-semibold">{scripture.name}</span>
                    </div>
                  </div>

                  <blockquote className="text-gray-800 font-serif text-lg mb-4 italic">
                    "{scripture.verse}"
                  </blockquote>
                  
                  {scripture.reference && (
                    <p className="text-sm text-gray-500 mb-4">— {scripture.reference}</p>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">This Tradition's Approach:</h4>
                    <p className="text-gray-700 text-sm">{scripture.approach}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Common Themes */}
            {comparison.commonThemes && comparison.commonThemes.length > 0 && (
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Compass className="h-5 w-5 text-purple-600" />
                  <span>Common Themes</span>
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {comparison.commonThemes.map((theme, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-purple-800 font-medium">{theme}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Practical Insights */}
            {comparison.practicalInsights && (
              <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">
                  Practical Insights for Integration
                </h3>
                <p className="text-blue-700 leading-relaxed">{comparison.practicalInsights}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrossScripture;