'use client';

import { useState, useEffect } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Shield, Smartphone, Globe, Coins } from 'lucide-react';
import { StateSelector } from '@/components/StateSelector';
import { GuideView } from '@/components/GuideView';
import { RecordButton } from '@/components/RecordButton';
import { EmergencyAlert } from '@/components/EmergencyAlert';
import { RightsCard, RecordingState } from '@/lib/types';
import { US_STATES } from '@/lib/utils';

// Mock data for demonstration
const mockRightsCard: RightsCard = {
  cardId: 'ca-001',
  state: 'CA',
  contentHash: 'QmExample123',
  language: 'en',
  content: {
    title: 'California Rights Guide',
    summary: 'Essential rights and scripts for police encounters in California',
    rights: [
      {
        id: 'ca-right-1',
        title: 'Right to Remain Silent',
        description: 'You have the constitutional right to remain silent during any police encounter. You are not required to answer questions beyond providing identification when lawfully requested.',
        category: 'general'
      },
      {
        id: 'ca-right-2',
        title: 'Right to Refuse Searches',
        description: 'You can refuse consent to search your person, belongings, or vehicle unless the officer has a warrant or probable cause.',
        category: 'search'
      },
      {
        id: 'ca-right-3',
        title: 'Traffic Stop Rights',
        description: 'During a traffic stop, you must provide license, registration, and insurance. You can keep your hands visible and ask if you are free to leave.',
        category: 'traffic'
      }
    ],
    scripts: [
      {
        id: 'ca-script-1',
        scenario: 'Traffic Stop',
        language: 'en',
        text: '"Officer, I am exercising my right to remain silent. I do not consent to any searches. Am I free to leave?"',
        category: 'traffic'
      },
      {
        id: 'ca-script-2',
        scenario: 'Search Request',
        language: 'en',
        text: '"I do not consent to this search. I am exercising my Fourth Amendment rights."',
        category: 'search'
      },
      {
        id: 'ca-script-3',
        scenario: 'Questioning',
        language: 'en',
        text: '"I am invoking my Fifth Amendment right to remain silent. I would like to speak to a lawyer."',
        category: 'questioning'
      }
    ],
    emergencyNumbers: [
      {
        name: 'Emergency Services',
        number: '911',
        description: 'Police, Fire, Medical Emergency'
      },
      {
        name: 'ACLU of California',
        number: '(213) 977-9500',
        description: 'Civil rights legal assistance'
      }
    ]
  }
};

const mockEmergencyContacts = [
  { id: '1', name: 'John Doe', phone: '+1 (555) 123-4567' },
  { id: '2', name: 'Jane Smith', phone: '+1 (555) 987-6543' }
];

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState<RightsCard | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es'>('en');
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    recordingType: null,
    duration: 0
  });

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Timer for recording duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recordingState.isRecording) {
      interval = setInterval(() => {
        setRecordingState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [recordingState.isRecording]);

  const handleStateSelect = (stateCode: string) => {
    setSelectedState(stateCode);
    // In a real app, this would fetch the actual rights card for the state
    if (stateCode === 'CA') {
      setCurrentCard(mockRightsCard);
    } else {
      // Create a mock card for other states
      const stateName = US_STATES.find(s => s.code === stateCode)?.name || stateCode;
      setCurrentCard({
        ...mockRightsCard,
        cardId: `${stateCode.toLowerCase()}-001`,
        state: stateCode,
        content: {
          ...mockRightsCard.content,
          title: `${stateName} Rights Guide`,
          summary: `Essential rights and scripts for police encounters in ${stateName}`
        }
      });
    }
  };

  const handleStartRecording = (type: 'audio' | 'video') => {
    setRecordingState({
      isRecording: true,
      recordingType: type,
      duration: 0
    });
    // In a real app, this would start actual recording
    console.log(`Starting ${type} recording`);
  };

  const handleStopRecording = () => {
    setRecordingState({
      isRecording: false,
      recordingType: null,
      duration: 0
    });
    // In a real app, this would stop recording and save the file
    console.log('Stopping recording');
  };

  const handleSendAlert = (contactIds: string[], location?: { lat: number; lng: number }) => {
    console.log('Sending emergency alert to:', contactIds, 'Location:', location);
    // In a real app, this would send actual alerts
  };

  const handleMintCard = () => {
    console.log('Minting rights card NFT');
    // In a real app, this would initiate the minting process
  };

  const handleShareCard = () => {
    console.log('Sharing rights card');
    // In a real app, this would generate and share a link
  };

  return (
    <div className="min-h-screen p-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold">KnowYourRights Cards</h1>
          </div>
          <p className="text-gray-300 text-lg mb-6">
            Your pocket guide to legal rights during police encounters
          </p>
          
          {/* Wallet Connection */}
          <div className="flex justify-center mb-6">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center">
            <div className="glass-card p-1 flex rounded-lg">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedLanguage === 'en'
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setSelectedLanguage('es')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedLanguage === 'es'
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Español
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        {!selectedState ? (
          /* State Selection */
          <div className="space-y-8">
            <StateSelector onStateSelect={handleStateSelect} />
            
            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 text-center">
                <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">State-Specific Rights</h3>
                <p className="text-gray-300 text-sm">
                  Get accurate, up-to-date information about your legal rights in your specific state.
                </p>
              </div>
              <div className="glass-card p-6 text-center">
                <Smartphone className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quick Recording</h3>
                <p className="text-gray-300 text-sm">
                  Discreetly record encounters with one-tap audio or video recording.
                </p>
              </div>
              <div className="glass-card p-6 text-center">
                <Coins className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Mint as NFT</h3>
                <p className="text-gray-300 text-sm">
                  Own your rights card as an NFT on Base for permanent access.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Main App Interface */
          <div className="space-y-8">
            {/* Quick Actions Bar */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedState(null)}
                  className="text-accent hover:text-white transition-colors duration-200"
                >
                  ← Change State
                </button>
                <div className="text-sm text-gray-400">
                  {US_STATES.find(s => s.code === selectedState)?.name}
                </div>
              </div>
            </div>

            {/* Emergency Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 text-center">
                <h3 className="text-lg font-semibold mb-4">Quick Record</h3>
                <RecordButton
                  onStartRecording={handleStartRecording}
                  onStopRecording={handleStopRecording}
                  isRecording={recordingState.isRecording}
                  recordingType={recordingState.recordingType}
                  duration={recordingState.duration}
                />
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4 text-center">Emergency Alert</h3>
                <EmergencyAlert
                  emergencyContacts={mockEmergencyContacts}
                  onSendAlert={handleSendAlert}
                />
              </div>
            </div>

            {/* Rights Guide */}
            {currentCard && (
              <GuideView
                card={currentCard}
                onMintCard={handleMintCard}
                onShareCard={handleShareCard}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
