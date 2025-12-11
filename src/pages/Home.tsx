import React, { Suspense, useEffect, useState } from "react"; // Force HMR update
import Spline from '@splinetool/react-spline';
import { BookOpen, LogIn } from 'lucide-react';
import VoiceAssistant from "../components/VoiceAssistant";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";


const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    navigate("/");
  };



  return (
    <div className="relative w-full min-h-screen bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/JHHQHu2phx-B40Vk/scene.splinecode" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {t('home.title')}
              </span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
          </div>

          {/* Subheadline */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
            {t('home.subtitle')}{" "}
            <span className="text-cyan-400 font-semibold">{t('home.ai')}</span>,{" "}
            <span className="text-blue-400 font-semibold">{t('home.sports')}</span>, {t('home.common.and')} {" "}
            <span className="text-green-400 font-semibold">{t('home.assessment')}</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="group flex items-center space-x-3 bg-red-700/50 hover:bg-red-600/50 text-white border-2 border-red-400/50 hover:border-red-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-2xl backdrop-blur-sm"
              >
                <LogIn className="h-6 w-6 rotate-180 group-hover:-rotate-12 transition-transform duration-300" />
                <span>🚪 {t('home.logout')}</span>
              </button>
            ) : (
              <>
                <Link
                  to="/service-selection"
                  className="group flex items-center space-x-3 bg-slate-700/50 hover:bg-slate-600/50 text-white border-2 border-blue-400/50 hover:border-blue-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-2xl backdrop-blur-sm"
                >
                  <LogIn className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>🔑 {t('home.login')}</span>
                </Link>

                <Link
                  to="/signup-selection"
                  className="group flex items-center space-x-3 bg-slate-700/50 hover:bg-slate-600/50 text-white border-2 border-cyan-400/50 hover:border-cyan-400 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-2xl backdrop-blur-sm"
                >
                  <BookOpen className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>📝 {t('home.signup')}</span>
                </Link>
              </>
            )}



          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-cyan-400/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300">
              <div className="text-cyan-400 text-3xl mb-3">🔍</div>
              <h3 className="text-white font-semibold text-lg mb-2">🧠 {t('home.features.ai_title')}</h3>
              <p className="text-gray-300 text-sm">{t('home.features.ai_desc')}</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm border border-blue-400/20 rounded-xl p-6 hover:border-blue-400/40 transition-all duration-300">
              <div className="text-blue-400 text-3xl mb-3">⚡</div>
              <h3 className="text-white font-semibold text-lg mb-2">⚡ {t('home.features.scale_title')}</h3>
              <p className="text-gray-300 text-sm">{t('home.features.scale_desc')}</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm border border-green-400/20 rounded-xl p-6 hover:border-green-400/40 transition-all duration-300">
              <div className="text-green-400 text-3xl mb-3">🛡️</div>
              <h3 className="text-white font-semibold text-lg mb-2">🔒 {t('home.features.fair_title')}</h3>
              <p className="text-gray-300 text-sm">{t('home.features.fair_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      <VoiceAssistant />
    </div>
  );
};

export default Home;