"use client";
import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Trophy, Users, ShieldCheck, Eye, EyeOff, Building2, HeartHandshake, User, Mail, Lock, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useLanguage } from "../contexts/LanguageContext";

type RoleType = 'athlete' | 'coach' | 'academy' | 'sponsor';

interface RoleConfig {
  title: string;
  icon: React.ElementType;
  description: string;
  gradient: string;
  accentColor: string;
}

const roleConfigs: Record<RoleType, RoleConfig> = {
  athlete: {
    title: "auth.roles.athlete.login_title",
    icon: User,
    description: "auth.roles.athlete.login_desc",
    gradient: "from-blue-900 via-cyan-800 to-indigo-900",
    accentColor: "text-cyan-400"
  },
  coach: {
    title: "auth.roles.coach.login_title",
    icon: Users,
    description: "auth.roles.coach.login_desc",
    gradient: "from-green-900 via-emerald-800 to-teal-900",
    accentColor: "text-emerald-400"
  },
  academy: {
    title: "auth.roles.academy.login_title",
    icon: Building2,
    description: "auth.roles.academy.login_desc",
    gradient: "from-purple-900 via-indigo-800 to-violet-900",
    accentColor: "text-purple-400"
  },
  sponsor: {
    title: "auth.roles.sponsor.login_title",
    icon: HeartHandshake,
    description: "auth.roles.sponsor.login_desc",
    gradient: "from-yellow-900 via-orange-800 to-red-900",
    accentColor: "text-yellow-400"
  }
};

export default function Login() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Default to athlete if no role is specified
  const currentRole = (location.state?.role as RoleType) || 'athlete';
  const config = roleConfigs[currentRole];
  const Icon = config.icon;

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (currentRole === 'athlete') {
        navigate("/athlete-dashboard");
      } else if (currentRole === 'coach') {
        navigate("/coach-dashboard");
      } else if (currentRole === 'academy') {
        navigate("/academy-dashboard");
      } else if (currentRole === 'sponsor') {
        navigate("/sponsor-dashboard");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google Login logic
    console.log("Google login clicked");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${config.gradient} relative overflow-hidden transition-colors duration-500`}>
      {/* Card */}
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 relative z-10">
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <div className={`p-4 rounded-full bg-white/5 mb-4 ${config.accentColor}`}>
            <Icon className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t(config.title)}
          </h1>
          <p className="text-gray-400 text-sm">
            {t(config.description)}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              {t('auth.common.email_label')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.common.email_placeholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              {t('auth.common.password_label')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.common.password_placeholder')}
                className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{t('auth.common.signing_in')}</span>
              </div>
            ) : (
              t('auth.common.sign_in')
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-gray-400">{t('auth.common.or_continue')}</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-xl bg-white text-gray-900 font-semibold flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span>{t('auth.common.google_signin')}</span>
          </button>
        </form>

        {/* Fair Play Notice */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start space-x-3">
          <ShieldCheck className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-yellow-200/80 text-xs leading-relaxed">
            <span className="font-semibold text-yellow-400">{t('auth.common.fair_play')}</span> {t('auth.common.monitor_msg')}
          </p>
        </div>
      </div>
    </div>
  );
}