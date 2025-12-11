import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, Home, Settings, Info, Phone, User, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/services', label: t('nav.services'), icon: Settings },
    { path: '/about', label: t('nav.about'), icon: Info },
    { path: '/contact', label: t('nav.contact'), icon: Phone },
  ];

  if (user) {
    let dashboardPath = '/';
    switch (user.role) {
      case 'athlete':
        dashboardPath = '/athlete-dashboard';
        break;
      case 'coach':
        dashboardPath = '/coach-dashboard';
        break;
      case 'sponsor':
        dashboardPath = '/sponsor-dashboard';
        break;
      case 'academy':
        dashboardPath = '/academy-dashboard';
        break;
      default:
        dashboardPath = '/';
    }

    // Add Dashboard as the second item (after Home)
    navItems.splice(1, 0, { path: dashboardPath, label: t('nav.dashboard'), icon: LayoutDashboard });
  }

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
  ];

  return (
    <>
      <motion.nav
        className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-1 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <motion.div
                  className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="h-8 w-8 text-cyan-400" />
                  <span className="text-xl font-bold">Pratidwandhi</span>
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.path)
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side - CTA Buttons */}
            <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                  <Globe size={18} />
                  <span className="uppercase">{language}</span>
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-slate-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-slate-700">
                  {languages.map((lang: any) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-slate-700 ${language === lang.code ? 'text-cyan-400 font-medium' : 'text-gray-300'
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {user && (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                      <User size={16} className="text-cyan-600" />
                    </div>
                    <span className="font-medium text-white">{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-slate-800"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {/* Mobile Language Selector */}
                <div className="flex space-x-2 px-3 py-2 overflow-x-auto">
                  {languages.map((lang: any) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${language === lang.code
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-700 text-gray-300'
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all ${isActive(item.path)
                        ? 'bg-cyan-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex flex-col space-y-3">
                    {user && (
                      <div className="space-y-2">
                        <Link
                          to="/profile"
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all"
                        >
                          <User size={20} />
                          <span className="font-medium">{user.name}</span>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-3 text-gray-300 hover:text-red-400 transition-colors flex items-center space-x-3"
                        >
                          <LogOut size={20} />
                          <span className="font-medium">{t('nav.logout')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}