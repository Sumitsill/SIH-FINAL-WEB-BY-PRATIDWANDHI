import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl"
                >
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <span className="text-4xl font-bold text-white">
                                {user.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 capitalize">
                                {user.role}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-400">{t('profile.email')}</span>
                                </div>
                                <p className="text-lg text-white">{user.email}</p>
                            </div>

                            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
                                <div className="flex items-center space-x-3 mb-2">
                                    <Shield className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-400">{t('profile.account_type')}</span>
                                </div>
                                <p className="text-lg text-white capitalize">{user.role}</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-700">
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 px-6 py-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors border border-red-500/20"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>{t('profile.sign_out')}</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
