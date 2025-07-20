import React, { useState } from 'react';
import { BookOpen, Quote, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

const VerseCard = ({ verse, reference, scripture, explanation, guidance, userQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScriptureColor = (scripture) => {
    const colors = {
      'Bible': 'from-blue-500 to-blue-600',
      'Quran': 'from-green-500 to-green-600', 
      'Bhagavad Gita': 'from-orange-500 to-orange-600',
      'Ramayana': 'from-purple-500 to-purple-600',
      'Buddhist': 'from-yellow-500 to-yellow-600',
      'default': 'from-gray-500 to-gray-600'
    };
    return colors[scripture] || colors.default;
  };

  const getScriptureIcon = (scripture) => {
    // For simplicity, using BookOpen for all. In a real app, you'd use specific icons
    return <BookOpen className="h-5 w-5" />;
  };

  return (
    <div className="verse-card card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Scripture Header */}
      <div className={`flex items-center justify-between mb-4 p-3 -mx-3 -mt-3 rounded-t-lg bg-gradient-to-r ${getScriptureColor(scripture)}`}>
        <div className="flex items-center space-x-2 text-white">
          {getScriptureIcon(scripture)}
          <span className="font-semibold">{scripture}</span>
        </div>
        <span className="text-white/90 text-sm font-medium">{reference}</span>
      </div>

      {/* Verse Content */}
      <div className="space-y-4">
        <blockquote className="relative">
          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-gray-200" />
          <p className="text-lg font-serif text-gray-800 leading-relaxed pl-6 italic">
            "{verse}"
          </p>
        </blockquote>

        {/* Quick Insight */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Lightbulb className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Key Insight</h4>
              <p className="text-gray-700 text-sm">
                {explanation.substring(0, 150)}
                {explanation.length > 150 && !isExpanded && '...'}
              </p>
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        {explanation.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors"
          >
            <span>{isExpanded ? 'Show less' : 'Read more'}</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}

        {isExpanded && (
          <div className="space-y-3 border-t pt-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Full Explanation</h4>
              <p className="text-gray-700 text-sm leading-relaxed">{explanation}</p>
            </div>
            
            {guidance && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Practical Guidance</h4>
                <p className="text-green-700 text-sm leading-relaxed">{guidance}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerseCard;