import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Check,
  X,
  DollarSign,
  Users,
  UserCheck,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
// Mock Data
const MOCK_FUNDRAISERS = [
  {
    id: 1,
    athlete: "Vikram Malhotra",
    amount: 5000,
    reason: "New Racket",
    raised: 2000,
    status: "active",
    contributors: 12,
  },
  {
    id: 2,
    athlete: "Sneha Gupta",
    amount: 10000,
    reason: "Training Camp",
    raised: 8500,
    status: "active",
    contributors: 45,
  },
  {
    id: 3,
    athlete: "Rahul Verma",
    amount: 150000,
    reason: "International Tour",
    raised: 10000,
    status: "flagged",
    contributors: 5,
  },
];

const MOCK_NEW_COACHES = [
  {
    id: 1,
    name: "Amit Patel",
    sport: "Football",
    experience: "5 years",
    status: "pending",
  },
  {
    id: 2,
    name: "Sarah Jones",
    sport: "Swimming",
    experience: "8 years",
    status: "pending",
  },
  {
    id: 3,
    name: "Mike Ross",
    sport: "Tennis",
    experience: "3 years",
    status: "verified",
  },
];

export default function AcademyDashboard() {
  const { user } = useAuth();
  const [fundraisers, setFundraisers] = useState(MOCK_FUNDRAISERS);
  const [coaches, setCoaches] = useState(MOCK_NEW_COACHES);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "academy") {
    return <Navigate to="/" replace />;
  }
  const handleFundraiserAction = (id: number, action: "stop" | "review") => {
    setFundraisers(
      fundraisers.map((fund) =>
        fund.id === id
          ? { ...fund, status: action === "stop" ? "stopped" : "under_review" }
          : fund
      )
    );
    console.log(`Fundraiser ${id} ${action}ed`);
  };

  const handleCoachVerification = (
    id: number,
    action: "approve" | "reject"
  ) => {
    setCoaches(
      coaches.map((coach) =>
        coach.id === id
          ? { ...coach, status: action === "approve" ? "verified" : "rejected" }
          : coach
      )
    );
    console.log(`Coach ${id} ${action}d`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Academy Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Welcome, {user?.name || "Official"}
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-sm text-gray-400">Active Fundraisers</p>
              <p className="text-2xl font-bold text-yellow-400">
                {fundraisers.filter((f) => f.status === "active").length}
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <p className="text-sm text-gray-400">Pending Verifications</p>
              <p className="text-2xl font-bold text-cyan-400">
                {coaches.filter((c) => c.status === "pending").length}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Fundraising Oversight */}
          <section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <DollarSign className="text-yellow-400" />
              Fundraising Oversight
            </h2>
            <div className="space-y-4">
              {fundraisers.map((fund) => (
                <div
                  key={fund.id}
                  className="bg-slate-800 p-4 rounded-xl border border-slate-700"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {fund.athlete}
                        {fund.status === "flagged" && (
                          <AlertTriangle size={14} className="text-red-500" />
                        )}
                        {fund.status === "stopped" && (
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded">
                            Stopped
                          </span>
                        )}
                        {fund.status === "under_review" && (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
                            Under Review
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-400">{fund.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">₹{fund.amount}</p>
                      <p className="text-xs text-gray-500">
                        {fund.contributors} contributors
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full ${
                        fund.status === "active"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                      style={{ width: `${(fund.raised / fund.amount) * 100}%` }}
                    />
                  </div>

                  {fund.status === "active" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleFundraiserAction(fund.id, "stop")}
                        className="flex-1 bg-red-600/20 text-red-400 py-2 rounded-lg hover:bg-red-600/30 transition-colors text-sm font-medium"
                      >
                        Force Stop
                      </button>
                      <button
                        onClick={() =>
                          handleFundraiserAction(fund.id, "review")
                        }
                        className="flex-1 bg-yellow-600/20 text-yellow-400 py-2 rounded-lg hover:bg-yellow-600/30 transition-colors text-sm font-medium"
                      >
                        Put Under Review
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Coach Verification */}
          <section className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-cyan-400" />
              Coach Verification
            </h2>
            <div className="space-y-4">
              {coaches.map((coach) => (
                <div
                  key={coach.id}
                  className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                      <Users className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {coach.name}
                        {coach.status === "verified" && (
                          <ShieldCheck size={14} className="text-cyan-400" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {coach.sport} • {coach.experience}
                      </p>
                    </div>
                  </div>

                  {coach.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleCoachVerification(coach.id, "approve")
                        }
                        className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() =>
                          handleCoachVerification(coach.id, "reject")
                        }
                        className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                        title="Reject"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        coach.status === "verified"
                          ? "bg-cyan-500/20 text-cyan-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {coach.status.charAt(0).toUpperCase() +
                        coach.status.slice(1)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
