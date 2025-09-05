'use client';

import { useState, useEffect } from 'react';
import { Mic, Video, Square, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecordButtonProps {
  onStartRecording: (type: 'audio' | 'video') => void;
  onStopRecording: () => void;
  isRecording: boolean;
  recordingType: 'audio' | 'video' | null;
  duration: number;
  className?: string;
}

export function RecordButton({
  onStartRecording,
  onStopRecording,
  isRecording,
  recordingType,
  duration,
  className
}: RecordButtonProps) {
  const [showOptions, setShowOptions] = useState(false);

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecordClick = () => {
    if (isRecording) {
      onStopRecording();
      setShowOptions(false);
    } else {
      setShowOptions(true);
    }
  };

  const handleTypeSelect = (type: 'audio' | 'video') => {
    onStartRecording(type);
    setShowOptions(false);
  };

  return (
    <div className={cn('relative flex flex-col items-center', className)}>
      {/* Recording Duration Display */}
      {isRecording && (
        <div className="mb-4 glass-card px-4 py-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono">{formatDuration(duration)}</span>
            <span className="text-xs text-gray-300">
              {recordingType === 'audio' ? 'Audio' : 'Video'}
            </span>
          </div>
        </div>
      )}

      {/* Main Record Button */}
      <button
        onClick={handleRecordClick}
        className={cn(
          'record-button',
          isRecording ? 'recording' : 'idle',
          'transform active:scale-95'
        )}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? (
          <Square className="w-6 h-6" fill="currentColor" />
        ) : (
          <Play className="w-6 h-6 ml-1" fill="currentColor" />
        )}
      </button>

      {/* Recording Type Options */}
      {showOptions && !isRecording && (
        <div className="absolute top-full mt-4 glass-card p-4 min-w-48 animate-slide-up">
          <h4 className="text-sm font-semibold mb-3 text-center">Choose Recording Type</h4>
          <div className="space-y-2">
            <button
              onClick={() => handleTypeSelect('audio')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
            >
              <Mic className="w-5 h-5 text-accent" />
              <div className="text-left">
                <div className="font-medium">Audio Only</div>
                <div className="text-xs text-gray-300">Discreet recording</div>
              </div>
            </button>
            <button
              onClick={() => handleTypeSelect('video')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
            >
              <Video className="w-5 h-5 text-accent" />
              <div className="text-left">
                <div className="font-medium">Video</div>
                <div className="text-xs text-gray-300">Full documentation</div>
              </div>
            </button>
          </div>
          <button
            onClick={() => setShowOptions(false)}
            className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Instructions */}
      {!isRecording && !showOptions && (
        <p className="mt-3 text-xs text-gray-300 text-center max-w-32">
          Tap to start discreet recording
        </p>
      )}
    </div>
  );
}
