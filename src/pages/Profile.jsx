import React, { useContext, useState } from 'react';
import { User, Settings, Crown, History, Heart, BookOpen } from 'lucide-react';
import AuthContext from '../contexts/AuthContext';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Please Sign In</h2>
          <p className="text-gray-500">You need to be signed in to view your profile</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'history', name: 'Search History', icon: History },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const searchHistory = [
    { query: "How to find peace in difficult times", date: "2024-01-15", verses: 3 },
    { query: "Guidance for making hard decisions", date: "2024-01-14", verses: 4 },
    { query: "Dealing with loss and grief", date: "2024-01-12", verses: 2 },
    { query: "Finding purpose in life", date: "2024-01-10", verses: 3 },
  ];

  const favoriteVerses = [
    { text: "Be still and know that I am God", reference: "Psalm 46:10", scripture: "Bible" },
    { text: "And whoever forgives and makes reconciliation, his reward is with Allah", reference: "Quran 42:40", scripture: "Quran" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <Heart className="h-4 w-4 mr-1" />
                  {user.faithTradition || 'Faith tradition not specified'}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.subscriptionStatus === 'premium' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.subscriptionStatus === 'premium' ? (
                    <>
                      <Crown className="h-4 w-4 mr-1" />
                      Premium
                    </>
                  ) : (
                    'Free Plan'
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid gap-8 md:grid-cols-2">
            {/* Statistics */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Journey</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Searches Made</span>
                  <span className="font-semibold text-purple-600">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Verses Discovered</span>
                  <span className="font-semibold text-purple-600">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Scriptures Explored</span>
                  <span className="font-semibold text-purple-600">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Days Active</span>
                  <span className="font-semibold text-purple-600">23</span>
                </div>
              </div>
            </div>

            {/* Favorite Verses */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Favorite Verses</h3>
              <div className="space-y-4">
                {favoriteVerses.map((verse, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-800 font-serif italic mb-1">"{verse.text}"</p>
                    <p className="text-sm text-gray-600">{verse.reference} - {verse.scripture}</p>
                  </div>
                ))}
                <button className="w-full py-2 text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All Favorites
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Searches</h3>
            <div className="space-y-4">
              {searchHistory.map((search, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{search.query}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">{search.date}</span>
                      <span className="text-sm text-purple-600 flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {search.verses} verses found
                      </span>
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    View Results
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            {/* Account Settings */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={user.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Faith Tradition</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value={user.faithTradition}>{user.faithTradition}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Subscription</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Current Plan: {user.subscriptionStatus === 'premium' ? 'Premium' : 'Free'}</p>
                  <p className="text-sm text-gray-600">
                    {user.subscriptionStatus === 'premium' 
                      ? 'Access to all features including cross-scripture comparison'
                      : 'Upgrade for cross-scripture comparison and unlimited searches'
                    }
                  </p>
                </div>
                {user.subscriptionStatus !== 'premium' && (
                  <button className="btn-primary">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade
                  </button>
                )}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card border border-red-200">
              <h3 className="text-xl font-semibold text-red-600 mb-6">Danger Zone</h3>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;