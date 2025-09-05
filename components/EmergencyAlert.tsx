'use client';

import { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

interface EmergencyAlertProps {
  emergencyContacts: EmergencyContact[];
  onSendAlert: (contactIds: string[], location?: { lat: number; lng: number }) => void;
  className?: string;
}

export function EmergencyAlert({ emergencyContacts, onSendAlert, className }: EmergencyAlertProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleEmergencyClick = () => {
    setShowConfirmation(true);
    setSelectedContacts(emergencyContacts.map(contact => contact.id));
    getCurrentLocation();
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      setIsGettingLocation(false);
    }
  };

  const handleSendAlert = () => {
    onSendAlert(selectedContacts, location || undefined);
    setShowConfirmation(false);
    setSelectedContacts([]);
    setLocation(null);
  };

  const toggleContact = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  return (
    <div className={cn('w-full max-w-sm mx-auto', className)}>
      <button
        onClick={handleEmergencyClick}
        className="emergency-button w-full flex items-center justify-center gap-3"
        disabled={emergencyContacts.length === 0}
      >
        <AlertTriangle className="w-6 h-6" />
        Emergency Alert
      </button>

      {emergencyContacts.length === 0 && (
        <p className="mt-2 text-xs text-gray-400 text-center">
          Add emergency contacts in settings to use this feature
        </p>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold">Send Emergency Alert</h3>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-300 mb-4">
                  This will send your location and a pre-defined alert message to your selected contacts.
                </p>

                {/* Location Status */}
                <div className="flex items-center gap-2 mb-4 p-3 bg-white bg-opacity-10 rounded-lg">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm">
                    {isGettingLocation ? (
                      'Getting your location...'
                    ) : location ? (
                      'Location obtained'
                    ) : (
                      'Location unavailable'
                    )}
                  </span>
                </div>

                {/* Contact Selection */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Send to:</p>
                  {emergencyContacts.map((contact) => (
                    <label
                      key={contact.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white bg-opacity-10 cursor-pointer hover:bg-opacity-20 transition-colors duration-200"
                    >
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleContact(contact.id)}
                        className="w-4 h-4 text-accent bg-transparent border-2 border-white border-opacity-30 rounded focus:ring-accent focus:ring-2"
                      />
                      <Phone className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-gray-400">{contact.phone}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAlert}
                  disabled={selectedContacts.length === 0}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Send Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
