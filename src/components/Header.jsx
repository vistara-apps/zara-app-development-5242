import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Menu, X, User, Search, BookOpen } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import AuthContext from '../contexts/AuthContext';
import LoginModal from './LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Flame },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Cross Scripture', href: '/cross-scripture', icon: BookOpen },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg group-hover:shadow-lg transition-shadow">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Soulfire</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-purple-600 bg-purple-50'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ConnectButton />
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                  >
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="btn-primary text-sm"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-purple-600 bg-purple-50'
                          : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="mb-4">
                    <ConnectButton />
                  </div>
                  {user ? (
                    <div className="space-y-2">
                      <Link
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                      >
                        <User className="h-4 w-4" />
                        <span>{user.name}</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full btn-primary text-sm"
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Header;