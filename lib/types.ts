export interface User {
  userId: string;
  walletAddress: string;
  preferredLanguage: 'en' | 'es';
  registeredState: string;
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface RightsCard {
  cardId: string;
  state: string;
  contentHash: string;
  language: 'en' | 'es';
  mintedTxHash?: string;
  tokenURI?: string;
  content: RightsContent;
}

export interface RightsContent {
  title: string;
  summary: string;
  rights: Right[];
  scripts: Script[];
  emergencyNumbers: EmergencyNumber[];
}

export interface Right {
  id: string;
  title: string;
  description: string;
  category: 'traffic' | 'search' | 'arrest' | 'questioning' | 'general';
}

export interface Script {
  id: string;
  scenario: string;
  language: 'en' | 'es';
  text: string;
  category: 'traffic' | 'search' | 'arrest' | 'questioning' | 'general';
}

export interface EmergencyNumber {
  name: string;
  number: string;
  description: string;
}

export interface EncounterRecord {
  recordId: string;
  userId: string;
  timestamp: Date;
  filePath: string;
  shareableLink: string;
  recordingType: 'audio' | 'video';
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface RecordingState {
  isRecording: boolean;
  recordingType: 'audio' | 'video' | null;
  duration: number;
  filePath?: string;
}

export interface AppState {
  selectedState: string | null;
  selectedLanguage: 'en' | 'es';
  user: User | null;
  currentCard: RightsCard | null;
  recordingState: RecordingState;
  isOffline: boolean;
}
