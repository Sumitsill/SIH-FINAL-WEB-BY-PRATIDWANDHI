import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  DollarSign,
  Phone,
  MessageSquare,
  Check,
  X,
  User,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

// Mock Data
const MOCK_REQUESTS = [
  {
    id: 1,
    name: "Rahul Kumar",
    type: "Athlete",
    sport: "Cricket",
    status: "pending",
  },
  {
    id: 2,
    name: "Priya Singh",
    type: "Athlete",
    sport: "Athletics",
    status: "pending",
  },
  {
    id: 3,
    name: "Amit Patel",
    type: "Coach",
    sport: "Football",
    status: "pending",
  },
];

const MOCK_ATHLETES = [
  {
    id: 1,
    name: "Vikram Malhotra",
    sport: "Badminton",
    performance: 85,
    lastSession: "2023-11-25",
  },
  {
    id: 2,
    name: "Sneha Gupta",
    sport: "Tennis",
    performance: 92,
    lastSession: "2023-11-26",
  },
  {
    id: 3,
    name: "Arjun Reddy",
    sport: "Boxing",
    performance: 78,
    lastSession: "2023-11-24",
  },
];

const MOCK_FUNDS = [
  {
    id: 1,
    athlete: "Vikram Malhotra",
    amount: 5000,
    reason: "New Racket",
    raised: 2000,
  },
  {
    id: 2,
    athlete: "Sneha Gupta",
    amount: 10000,
    reason: "Training Camp",
    raised: 8500,
  },
];

export default function CoachDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const isVerified = true; // Mock verification status
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "coach") {
    return <Navigate to="/" replace />;
  }
  const handleRequestAction = (id: number, action: "approve" | "reject") => {
    setRequests(requests.filter((req) => req.id !== id));
    // In a real app, this would make an API call
    console.log(`Request ${id} ${action}ed`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Coach Dashboard
              {isVerified && <ShieldCheck className="text-cyan-400 h-8 w-8" />}
            </h1>
            <p className="text-gray-400 mt-2">
              Welcome back, {user?.name || "Coach"}
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-sm text-gray-400">Total Athletes</p>
              <p className="text-2xl font-bold text-cyan-400">
                {MOCK_ATHLETES.length}
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-sm text-gray-400">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-400">
                {requests.length}
              </p>
            </div>
          </div>
        </div>

        {/* Connection Requests */}
        <section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="text-cyan-400" />
            Connection Requests
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((req) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                    <User className="text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{req.name}</h3>
                    <p className="text-sm text-gray-400">
                      {req.type} • {req.sport}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleRequestAction(req.id, "approve")}
                    className="flex-1 bg-green-600/20 text-green-400 py-2 rounded-lg hover:bg-green-600/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check size={16} /> Approve
                  </button>
                  <button
                    onClick={() => handleRequestAction(req.id, "reject")}
                    className="flex-1 bg-red-600/20 text-red-400 py-2 rounded-lg hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={16} /> Reject
                  </button>
                </div>
                <div className="flex gap-2 border-t border-slate-700 pt-3">
                  <button className="flex-1 text-sm text-gray-400 hover:text-white flex items-center justify-center gap-1">
                    <Phone size={14} /> Call
                  </button>
                  <button className="flex-1 text-sm text-gray-400 hover:text-white flex items-center justify-center gap-1">
                    <MessageSquare size={14} /> Message
                  </button>
                </div>
              </motion.div>
            ))}
            {requests.length === 0 && (
              <p className="text-gray-400 col-span-full text-center py-8">
                No pending requests
              </p>
            )}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Athlete Performance */}
          <section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-emerald-400" />
              Athlete Performance
            </h2>
            <div className="space-y-4">
              {MOCK_ATHLETES.map((athlete) => (
                <div
                  key={athlete.id}
                  className="bg-slate-800 p-4 rounded-xl border border-slate-700"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{athlete.name}</h3>
                      <p className="text-sm text-gray-400">{athlete.sport}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        athlete.performance >= 90
                          ? "bg-green-500/20 text-green-400"
                          : athlete.performance >= 80
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {athlete.performance}% Perf.
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${athlete.performance}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-right">
                    Last Session: {athlete.lastSession}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Fundraising */}
          <section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <DollarSign className="text-yellow-400" />
              Active Fundraisers
            </h2>
            <div className="space-y-4">
              {MOCK_FUNDS.map((fund) => (
                <div
                  key={fund.id}
                  className="bg-slate-800 p-4 rounded-xl border border-slate-700"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{fund.athlete}</h3>
                      <p className="text-sm text-gray-400">{fund.reason}</p>
                    </div>
                    <button className="bg-yellow-500 text-slate-900 px-3 py-1 rounded-lg text-sm font-bold hover:bg-yellow-400 transition-colors">
                      Contribute
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">
                        Raised: ₹{fund.raised}
                      </span>
                      <span className="text-gray-400">
                        Goal: ₹{fund.amount}
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-yellow-500 h-full rounded-full"
                        style={{
                          width: `${(fund.raised / fund.amount) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
