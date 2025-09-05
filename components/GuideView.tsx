'use client';

import { useState } from 'react';
import { Book, MessageSquare, Globe, Share2, Coins } from 'lucide-react';
import { RightsCard } from '@/lib/types';
import { cn } from '@/lib/utils';

interface GuideViewProps {
  card: RightsCard;
  onMintCard?: () => void;
  onShareCard?: () => void;
  className?: string;
}

export function GuideView({ card, onMintCard, onShareCard, className }: GuideViewProps) {
  const [activeTab, setActiveTab] = useState<'rights' | 'scripts'>('rights');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'traffic', 'search', 'arrest', 'questioning', 'general'];
  
  const filteredRights = selectedCategory === 'all' 
    ? card.content.rights 
    : card.content.rights.filter(right => right.category === selectedCategory);

  const filteredScripts = selectedCategory === 'all'
    ? card.content.scripts.filter(script => script.language === card.language)
    : card.content.scripts.filter(script => 
        script.category === selectedCategory && script.language === card.language
      );

  const formatCategoryName = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Header */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{card.content.title}</h1>
            <p className="text-gray-300 text-sm">{card.content.summary}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Globe className="w-4 h-4" />
            {card.language === 'en' ? 'English' : 'Español'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {onShareCard && (
            <button
              onClick={onShareCard}
              className="btn-secondary flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          )}
          {onMintCard && !card.mintedTxHash && (
            <button
              onClick={onMintCard}
              className="btn-primary flex items-center gap-2"
            >
              <Coins className="w-4 h-4" />
              Mint NFT (1 USDC)
            </button>
          )}
          {card.mintedTxHash && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500 bg-opacity-20 text-green-400 rounded-lg border border-green-500 border-opacity-30">
              <Coins className="w-4 h-4" />
              <span className="text-sm">Minted</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-card p-1 mb-6">
        <div className="flex rounded-lg overflow-hidden">
          <button
            onClick={() => setActiveTab('rights')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all duration-200',
              activeTab === 'rights'
                ? 'bg-white bg-opacity-20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10'
            )}
          >
            <Book className="w-4 h-4" />
            Your Rights
          </button>
          <button
            onClick={() => setActiveTab('scripts')}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all duration-200',
              activeTab === 'scripts'
                ? 'bg-white bg-opacity-20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10'
            )}
          >
            <MessageSquare className="w-4 h-4" />
            Scripts
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="glass-card p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-3 py-1 rounded-full text-sm font-medium transition-all duration-200',
                selectedCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
              )}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'rights' && (
          <>
            {filteredRights.map((right) => (
              <div key={right.id} className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-3 text-accent">
                  {right.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {right.description}
                </p>
                <div className="mt-3">
                  <span className="inline-block px-2 py-1 bg-white bg-opacity-10 text-xs rounded-full text-gray-400">
                    {formatCategoryName(right.category)}
                  </span>
                </div>
              </div>
            ))}
            {filteredRights.length === 0 && (
              <div className="glass-card p-6 text-center text-gray-400">
                No rights information available for this category.
              </div>
            )}
          </>
        )}

        {activeTab === 'scripts' && (
          <>
            {filteredScripts.map((script) => (
              <div key={script.id} className="script-card">
                <h3 className="text-lg font-semibold mb-3 text-accent">
                  {script.scenario}
                </h3>
                <div className="bg-black bg-opacity-30 p-4 rounded-lg border-l-4 border-accent">
                  <p className="text-gray-100 leading-relaxed font-mono text-sm whitespace-pre-line">
                    {script.text}
                  </p>
                </div>
                <div className="mt-3">
                  <span className="inline-block px-2 py-1 bg-white bg-opacity-10 text-xs rounded-full text-gray-400">
                    {formatCategoryName(script.category)}
                  </span>
                </div>
              </div>
            ))}
            {filteredScripts.length === 0 && (
              <div className="glass-card p-6 text-center text-gray-400">
                No scripts available for this category.
              </div>
            )}
          </>
        )}
      </div>

      {/* Emergency Numbers */}
      {card.content.emergencyNumbers.length > 0 && (
        <div className="glass-card p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4 text-red-400">Emergency Numbers</h3>
          <div className="space-y-3">
            {card.content.emergencyNumbers.map((emergency, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-red-500 bg-opacity-10 rounded-lg border border-red-500 border-opacity-30">
                <div>
                  <div className="font-medium text-red-400">{emergency.name}</div>
                  <div className="text-xs text-gray-400">{emergency.description}</div>
                </div>
                <a
                  href={`tel:${emergency.number}`}
                  className="text-red-400 font-mono font-bold hover:text-red-300 transition-colors duration-200"
                >
                  {emergency.number}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
