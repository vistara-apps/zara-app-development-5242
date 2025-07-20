import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Heart, Users, ArrowRight, Star, Globe } from 'lucide-react';
import SearchBox from '../components/SearchBox';
import VerseCard from '../components/VerseCard';
import AuthContext from '../contexts/AuthContext';
import { findRelevantVerses } from '../services/aiService';

const Home = () => {
  const [verses, setVerses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const foundVerses = await findRelevantVerses(query);
      setVerses(foundVerses);
    } catch (error) {
      console.error('Search error:', error);
      setVerses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "Natural Language Search",
      description: "Simply describe your challenge in your own words and receive personalized spiritual guidance.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BookOpen,
      title: "Cross-Scripture Insights",
      description: "Explore how different faiths approach life's big questions with verses from major scriptures.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Compassionate Guidance",
      description: "Receive thoughtful explanations and practical applications for each verse.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Interfaith Understanding",
      description: "Build bridges between traditions and find common spiritual ground.",
      color: "from-orange-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Soulfire helped me find peace during my darkest hour. The verses were exactly what I needed to hear.",
      tradition: "Christianity"
    },
    {
      name: "Ahmed K.",
      text: "I love how it shows different perspectives on the same issue. It's opened my mind to universal wisdom.",
      tradition: "Islam"
    },
    {
      name: "Priya S.",
      text: "The explanations are so thoughtful and practical. It's like having a spiritual advisor available 24/7.",
      tradition: "Hinduism"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Find Divine Guidance for
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Life's Challenges
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Discover relevant verses from major scriptures and receive compassionate guidance 
              tailored to your personal challenges across different faith traditions.
            </p>
            
            {user && (
              <p className="text-purple-200 mb-8">
                Welcome back, {user.name}! What's on your heart today?
              </p>
            )}
            
            <SearchBox onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Search Results */}
      {hasSearched && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Finding relevant guidance for you...</p>
              </div>
            ) : verses.length > 0 ? (
              <div>
                <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
                  Divine Guidance for Your Journey
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {verses.map((verse, index) => (
                    <VerseCard key={index} {...verse} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-600">No verses found. Please try a different search.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Spiritual Guidance Made Simple
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the wisdom of world religions through modern technology and compassionate AI guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card text-center group hover:scale-105">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-4 group-hover:shadow-xl transition-all`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Voices from Our Community
            </h2>
            <p className="text-xl text-gray-600">
              Hear how Soulfire has touched lives across different faith traditions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </blockquote>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.tradition}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Globe className="h-16 w-16 mx-auto mb-6 text-white/90" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of seekers finding peace, wisdom, and guidance through the timeless teachings of world religions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="btn-primary bg-white text-purple-600 hover:bg-gray-100 flex items-center justify-center space-x-2"
            >
              <span>Start Seeking Guidance</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/cross-scripture"
              className="btn-secondary border-white text-white hover:bg-white/10"
            >
              Explore Cross-Scripture Wisdom
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;