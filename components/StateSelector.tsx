'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { US_STATES } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StateSelectorProps {
  onStateSelect: (stateCode: string) => void;
  selectedState?: string;
  className?: string;
}

export function StateSelector({ onStateSelect, selectedState, className }: StateSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredStates = US_STATES.filter(state =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateSelect = (stateCode: string) => {
    onStateSelect(stateCode);
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedStateName = US_STATES.find(state => state.code === selectedState)?.name;

  return (
    <div className={cn('relative w-full max-w-sm mx-auto', className)}>
      <div className="glass-card p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-accent" />
          Select Your State
        </h3>
        
        {selectedState ? (
          <div className="space-y-3">
            <div className="p-3 bg-accent bg-opacity-20 rounded-lg border border-accent border-opacity-30">
              <p className="text-sm text-gray-300">Selected State:</p>
              <p className="font-semibold text-white">{selectedStateName}</p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="btn-secondary w-full"
            >
              Change State
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="btn-primary w-full"
          >
            Choose Your State
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md max-h-96 overflow-hidden">
            <div className="p-4 border-b border-white border-opacity-20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                  autoFocus
                />
              </div>
            </div>
            
            <div className="overflow-y-auto max-h-64">
              {filteredStates.map((state) => (
                <button
                  key={state.code}
                  onClick={() => handleStateSelect(state.code)}
                  className="w-full text-left px-4 py-3 hover:bg-white hover:bg-opacity-10 transition-colors duration-200 border-b border-white border-opacity-10 last:border-b-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{state.name}</span>
                    <span className="text-sm text-gray-400">{state.code}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="p-4 border-t border-white border-opacity-20">
              <button
                onClick={() => setIsOpen(false)}
                className="btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
