// import React from 'react';
// import { motion } from 'framer-motion';
// import { Trophy, TrendingUp, Flame, Award, Target, Zap } from 'lucide-react';

// const GamifiedSection = () => {
//   const features = [
//     {
//       icon: Trophy,
//       title: "🏆 Earn Badges",
//       description: "Unlock achievements for completing challenges, improving performance, and reaching milestones.",
//       gradient: "from-yellow-400 to-orange-500",
//       bgGradient: "from-yellow-50 to-orange-50",
//     },
//     {
//       icon: TrendingUp,
//       title: "📊 Climb Leaderboards",
//       description: "Compete with athletes nationwide and see where you rank in different sports categories.",
//       gradient: "from-blue-400 to-purple-500",
//       bgGradient: "from-blue-50 to-purple-50",
//     },
//     {
//       icon: Flame,
//       title: "🔥 Track Progress",
//       description: "Monitor your improvement over time with detailed analytics and personalized insights.",
//       gradient: "from-red-400 to-pink-500",
//       bgGradient: "from-red-50 to-pink-50",
//     },
//   ];

//   return (
//     <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <motion.div
//           className="text-center mb-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             🔥 Gamify Your Growth –{' '}
//             <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Because Training Should Feel Like Winning
//             </span>
//           </motion.h2>
//           <motion.p
//             className="text-xl text-gray-600 max-w-3xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             Hard work = Rewards. Turn your training into an adventure with badges, streaks, and leaderboards.
//           </motion.p>
//         </motion.div>

//         {/* Features Grid */}
//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <motion.div
//                 key={index}
//                 className={`relative p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br ${feature.bgGradient} border border-white/20`}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.2 }}
//                 viewport={{ once: true }}
//                 whileHover={{ y: -8, scale: 1.02 }}
//               >
//                 {/* Animated Background */}
//                 <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                   <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-10 rounded-2xl`}></div>
//                 </div>

//                 {/* Icon */}
//                 <motion.div
//                   className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} mb-6 relative z-10`}
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.8 }}
//                 >
//                   <Icon className="h-8 w-8 text-white" />
//                 </motion.div>

//                 {/* Content */}
//                 <div className="relative z-10">
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
//                     {feature.description}
//                   </p>
//                 </div>

//                 {/* Hover Effect Icons */}
//                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
//                   <div className="flex space-x-1">
//                     <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
//                     <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} animation-delay-100`}></div>
//                     <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} animation-delay-200`}></div>
//                   </div>
//                 </div>

//                 {/* Action Button */}
//                 <motion.button
//                   className={`mt-6 px-6 py-3 bg-gradient-to-r ${feature.gradient} text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 relative z-10 opacity-0 group-hover:opacity-100`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   initial={{ y: 20 }}
//                   whileInView={{ y: 0 }}
//                   transition={{ duration: 0.3, delay: 0.5 }}
//                 >
//                   Get Started
//                 </motion.button>
//               </motion.div>
//             );
//           })}
//         </div>

//         {/* Bottom CTA */}
//         <motion.div
//           className="text-center mt-16"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           viewport={{ once: true }}
//         >
//           <motion.button
//             className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
//             whileHover={{ scale: 1.05, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <span className="flex items-center space-x-2">
//               <Zap className="h-5 w-5" />
//               <span>Start Your Journey</span>
//             </span>
//           </motion.button>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default GamifiedSection;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Flame, Award, Target, Zap, Star, Crown, Lock, Activity, Calendar } from 'lucide-react';

const GamifiedSection = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [selectedExercise, setSelectedExercise] = useState('Push-Up');

  const exercises = [
    "Push-Up",
    "Sit-Up",
    "Jumping Jack",
    "Sit & Reach",
    "Standing Broad Jump",
    "Vertical Jump",
    "Medicine Ball Throw",
    "Skipping",
    "Squat",
    "800m/1.6km Sprint"
  ];

  // Mock Data for Leaderboard (would fetch based on selectedExercise)
  const leaderboardData = [
    { rank: 1, name: "Alex Johnson", points: 2850, avatar: "https://i.pravatar.cc/150?u=1", badge: "Legend" },
    { rank: 2, name: "Sarah Connor", points: 2720, avatar: "https://i.pravatar.cc/150?u=2", badge: "Elite" },
    { rank: 3, name: "Mike Ross", points: 2680, avatar: "https://i.pravatar.cc/150?u=3", badge: "Pro" },
    { rank: 4, name: "Emily Blunt", points: 2450, avatar: "https://i.pravatar.cc/150?u=4", badge: "Intermediate" },
    { rank: 5, name: "John Wick", points: 2300, avatar: "https://i.pravatar.cc/150?u=5", badge: "Intermediate" },
    { rank: 6, name: "Tony Stark", points: 2150, avatar: "https://i.pravatar.cc/150?u=6", badge: "Beginner" },
    { rank: 7, name: "Bruce Wayne", points: 2100, avatar: "https://i.pravatar.cc/150?u=7", badge: "Beginner" },
  ];

  // Mock Data for Badges
  const badgesData = [
    { id: 1, name: "Early Riser", icon: Zap, description: "Completed 5 morning workouts", unlocked: true, color: "from-yellow-400 to-orange-500" },
    { id: 2, name: "Speed Demon", icon: Flame, description: "Finished a run in record time", unlocked: true, color: "from-red-500 to-pink-600" },
    { id: 3, name: "Marathoner", icon: Trophy, description: "Ran 42km total", unlocked: false, color: "from-purple-500 to-indigo-600" },
    { id: 4, name: "Sharpshooter", icon: Target, description: "100% accuracy in drills", unlocked: false, color: "from-blue-400 to-cyan-500" },
    { id: 5, name: "Team Player", icon: Crown, description: "Participated in 3 team events", unlocked: true, color: "from-green-400 to-emerald-600" },
    { id: 6, name: "Iron Will", icon: Award, description: "7-day workout streak", unlocked: false, color: "from-gray-300 to-gray-500" },
  ];

  // Mock Data for Progress
  const progressStats = [
    { label: "Total Workouts", value: "42", icon: Activity, change: "+12%", positive: true },
    { label: "Calories Burned", value: "12,500", icon: Flame, change: "+8%", positive: true },
    { label: "Hours Trained", value: "35h", icon: Calendar, change: "-2%", positive: false },
    { label: "Current Streak", value: "5 Days", icon: Zap, change: "Best: 12", positive: true },
  ];

  const renderLeaderboard = () => (
    <div className="space-y-8">
      {/* Exercise Selector */}
      <div className="flex justify-center mb-8">
        <div className="relative inline-block text-left">
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="appearance-none bg-slate-800 text-white font-bold py-3 px-8 pr-12 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg cursor-pointer text-lg"
          >
            {exercises.map((ex) => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-slate-400">Top Performers for <span className="text-blue-400 font-bold">{selectedExercise}</span></p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex flex-col md:flex-row justify-center items-end gap-4 mb-12">
        {/* 2nd Place */}
        <motion.div
          className="order-2 md:order-1 flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <img src={leaderboardData[1].avatar} alt={leaderboardData[1].name} className="w-20 h-20 rounded-full border-4 border-slate-300 shadow-xl" />
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-slate-300 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">2nd</div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-white font-bold">{leaderboardData[1].name}</h3>
            <p className="text-blue-400 font-semibold">{leaderboardData[1].points} pts</p>
          </div>
          <div className="w-24 h-32 bg-slate-800/50 rounded-t-lg mt-2 border-t-4 border-slate-300"></div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          className="order-1 md:order-2 flex flex-col items-center z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <Crown className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-bounce" />
            </div>
            <img src={leaderboardData[0].avatar} alt={leaderboardData[0].name} className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20" />
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">1st</div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-white font-bold text-lg">{leaderboardData[0].name}</h3>
            <p className="text-yellow-400 font-bold">{leaderboardData[0].points} pts</p>
          </div>
          <div className="w-28 h-40 bg-slate-800/60 rounded-t-lg mt-2 border-t-4 border-yellow-400 bg-gradient-to-b from-yellow-400/10 to-transparent"></div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          className="order-3 flex flex-col items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <img src={leaderboardData[2].avatar} alt={leaderboardData[2].name} className="w-20 h-20 rounded-full border-4 border-amber-600 shadow-xl" />
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-amber-600 text-amber-100 text-xs font-bold px-2 py-1 rounded-full">3rd</div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-white font-bold">{leaderboardData[2].name}</h3>
            <p className="text-amber-500 font-semibold">{leaderboardData[2].points} pts</p>
          </div>
          <div className="w-24 h-24 bg-slate-800/50 rounded-t-lg mt-2 border-t-4 border-amber-600"></div>
        </motion.div>
      </div>

      {/* List View */}
      <div className="bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-700/50 overflow-hidden">
        {leaderboardData.slice(3).map((user, index) => (
          <motion.div
            key={user.rank}
            className="flex items-center justify-between p-4 border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 font-bold w-6 text-center">{user.rank}</span>
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-slate-600" />
              <div>
                <h4 className="text-white font-medium">{user.name}</h4>
                <span className="text-xs text-slate-400">{user.badge}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-blue-400" />
              <span className="text-blue-100 font-bold">{user.points}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {badgesData.map((badge, index) => (
        <motion.div
          key={badge.id}
          className={`relative p-6 rounded-2xl border ${badge.unlocked ? 'bg-slate-800/40 border-slate-600' : 'bg-slate-900/40 border-slate-800'} backdrop-blur-sm overflow-hidden group`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={badge.unlocked ? { y: -5, borderColor: 'rgba(59, 130, 246, 0.5)' } : {}}
        >
          {badge.unlocked && (
            <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
          )}

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${badge.unlocked ? `bg-gradient-to-br ${badge.color} shadow-lg shadow-${badge.color.split('-')[1]}/30` : 'bg-slate-800 grayscale'}`}>
              <badge.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className={`font-bold mb-2 ${badge.unlocked ? 'text-white' : 'text-slate-500'}`}>{badge.name}</h3>
            <p className="text-sm text-slate-400 mb-3">{badge.description}</p>
            {badge.unlocked ? (
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white font-medium border border-white/20">Unlocked</span>
            ) : (
              <div className="flex items-center text-slate-600 text-xs font-medium">
                <Lock className="w-3 h-3 mr-1" /> Locked
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {progressStats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-blue-400" />
              <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.positive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Mock Chart Area */}
      <motion.div
        className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Activity Overview</h3>
          <select className="bg-slate-900 text-white text-sm px-3 py-1 rounded-lg border border-slate-700 outline-none">
            <option>Last 7 Days</option>
            <option>Last Month</option>
          </select>
        </div>

        {/* Simple Bar Chart Visualization */}
        <div className="h-48 flex items-end justify-between gap-2 px-2">
          {[40, 65, 30, 85, 50, 75, 90].map((height, i) => (
            <div key={i} className="flex flex-col items-center gap-2 group w-full">
              <div className="w-full relative h-48 flex items-end">
                <motion.div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded border border-slate-700">
                    {height}m
                  </div>
                </motion.div>
              </div>
              <span className="text-xs text-slate-500">Day {i + 1}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Achievements */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Recent Milestones</h3>
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h4 className="text-white font-medium">Personal Best: 5k Run</h4>
            <p className="text-sm text-slate-400">You beat your previous record by 45s!</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-black via-slate-900 to-blue-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Gamify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Growth</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Compete, earn rewards, and track your journey to greatness.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 p-1 rounded-xl backdrop-blur-md border border-slate-700 inline-flex">
            {['leaderboard', 'badges', 'progress'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 capitalize ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            {activeTab === 'leaderboard' && renderLeaderboard()}
            {activeTab === 'badges' && renderBadges()}
            {activeTab === 'progress' && renderProgress()}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default GamifiedSection;