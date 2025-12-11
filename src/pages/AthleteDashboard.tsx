import React from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  TrendingUp,
  Award,
  DollarSign,
  Users,
  ShoppingBag,
  Calendar,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AthleteDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "athlete") {
    return <Navigate to="/" replace />;
  }
  // Mock Data
  const performanceStats = [
    {
      label: "Sprint Speed",
      value: "9.2 m/s",
      change: "+0.3",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Endurance",
      value: "85/100",
      change: "+5",
      icon: Activity,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Strength",
      value: "Top 10%",
      change: "Stable",
      icon: Target,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Regional Qualifiers",
      date: "Oct 15, 2025",
      type: "Competition",
    },
    {
      id: 2,
      title: "Training Camp with Coach Rahul",
      date: "Oct 20, 2025",
      type: "Training",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-slate-900 py-12 px-6 sm:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="text-blue-400">Champion</span> 🏃‍♂️
          </h1>
          <p className="text-gray-300 max-w-xl">
            Track your progress, connect with mentors, and secure funding for
            your next big win.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {performanceStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium bg-slate-700 px-2 py-1 rounded-lg text-green-400">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">
                {stat.label}
              </h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                to="/community"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <div className="p-3 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <span className="text-sm font-medium text-gray-300">
                  Community
                </span>
              </Link>
              <Link
                to="/marketplace"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <div className="p-3 bg-yellow-500/10 rounded-full group-hover:bg-yellow-500/20 transition-colors">
                  <ShoppingBag className="h-6 w-6 text-yellow-400" />
                </div>
                <span className="text-sm font-medium text-gray-300">
                  Marketplace
                </span>
              </Link>
              <Link
                to="/sponsorship"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <div className="p-3 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <span className="text-sm font-medium text-gray-300">
                  Get Funded
                </span>
              </Link>
              <Link
                to="/gamified"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group"
              >
                <div className="p-3 bg-purple-500/10 rounded-full group-hover:bg-purple-500/20 transition-colors">
                  <Award className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-sm font-medium text-gray-300">
                  Challenges
                </span>
              </Link>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Performance Analytics
                </h2>
                <button className="text-sm text-blue-400 hover:text-blue-300">
                  View Full Report
                </button>
              </div>
              <div className="h-64 bg-slate-900/50 rounded-xl flex items-center justify-center border border-slate-700 border-dashed">
                <p className="text-gray-500">Performance Chart Visualization</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-400" />
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                  >
                    <div className="bg-slate-700 rounded-lg px-3 py-2 text-center min-w-[60px]">
                      <span className="block text-xs text-gray-400 uppercase">
                        {event.date.split(" ")[0]}
                      </span>
                      <span className="block text-xl font-bold text-white">
                        {event.date.split(" ")[1].replace(",", "")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        {event.title}
                      </h4>
                      <span className="text-xs text-gray-400 bg-slate-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">
                View Calendar
              </button>
            </div>

            {/* Sponsorship Status */}
            <div className="bg-gradient-to-br from-green-900/50 to-slate-800 border border-green-500/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <DollarSign className="h-24 w-24 text-green-400" />
              </div>
              <h2 className="text-lg font-bold mb-2 text-white">
                Sponsorship Status
              </h2>
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-1">Current Campaign</p>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xl font-bold text-green-400">
                    ₹15,000
                  </span>
                  <span className="text-xs text-gray-400">of ₹50,000 goal</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
              <Link
                to="/sponsorship"
                className="block w-full text-center bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-medium transition-colors shadow-lg shadow-green-900/20"
              >
                Manage Campaign
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;
