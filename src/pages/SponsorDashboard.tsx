import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  MessageCircle,
  Phone,
  Package,
  Lock,
  Unlock,
  Search,
  User,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

// Mock Data
const MOCK_OPPORTUNITIES = [
  {
    id: 1,
    name: "Vikram Malhotra",
    sport: "Badminton",
    amount: 5000,
    reason: "New Racket",
    raised: 2000,
    image:
      "https://images.unsplash.com/photo-1626224583764-84786c713cd3?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 2,
    name: "Sneha Gupta",
    sport: "Tennis",
    amount: 10000,
    reason: "Training Camp",
    raised: 8500,
    image:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: 3,
    name: "Arjun Reddy",
    sport: "Boxing",
    amount: 15000,
    reason: "Equipment",
    raised: 3000,
    image:
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=200",
  },
];

export default function SponsorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [supplierId, setSupplierId] = useState("");
  const [isSupplierUnlocked, setIsSupplierUnlocked] = useState(false);
  const [showSupplierInput, setShowSupplierInput] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role !== "sponsor") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.role !== "sponsor") {
    return null;
  }

  const handleContribute = (id: number) => {
    navigate("/payment");
  };

  const handleConnect = (id: number, type: "call" | "chat") => {
    alert(
      `Request for ${type} sent to admin for approval. You will be notified once verified.`
    );
  };

  const handleSupplierUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock validation - accept any non-empty string for now, or a specific code
    if (supplierId.trim().length > 0) {
      setIsSupplierUnlocked(true);
      setShowSupplierInput(false);
    } else {
      alert("Please enter a valid Unique ID");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Sponsor Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Welcome, {user?.name || "Sponsor"}. Make a difference today.
            </p>
          </div>

          {!isSupplierUnlocked ? (
            <button
              onClick={() => setShowSupplierInput(!showSupplierInput)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors border border-slate-700"
            >
              <Lock size={16} className="text-yellow-400" />
              <span>Supplier Portal Access</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-green-900/20 px-4 py-2 rounded-lg border border-green-900/50">
              <Unlock size={16} className="text-green-400" />
              <span className="text-green-400 font-medium">
                Supplier Access Unlocked
              </span>
            </div>
          )}
        </div>

        {/* Supplier Portal Unlock Modal/Input */}
        <AnimatePresence>
          {showSupplierInput && !isSupplierUnlocked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-md ml-auto"
            >
              <form onSubmit={handleSupplierUnlock} className="flex gap-2">
                <input
                  type="text"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  placeholder="Enter Unique Supplier ID"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Unlock
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supplier Portal Content */}
        {isSupplierUnlocked && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Package className="text-cyan-400" />
              Supplier Portal
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  Manage Inventory
                </h3>
                <p className="text-gray-400 text-sm">
                  Update stock levels and add new equipment.
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  View Orders
                </h3>
                <p className="text-gray-400 text-sm">
                  Track and fulfill equipment orders.
                </p>
              </div>
              <Link
                to="/marketplace"
                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors cursor-pointer group block"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  Visit Marketplace
                </h3>
                <p className="text-gray-400 text-sm">
                  Browse current listings and demands.
                </p>
              </Link>
            </div>
          </motion.section>
        )}

        {/* Funding Opportunities */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <DollarSign className="text-yellow-400" />
            Funding Opportunities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_OPPORTUNITIES.map((opp) => (
              <motion.div
                key={opp.id}
                whileHover={{ y: -5 }}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={opp.image}
                    alt={opp.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold">{opp.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium">
                      {opp.sport}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-gray-300 mb-4 flex-1">"{opp.reason}"</p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          Raised: ₹{opp.raised}
                        </span>
                        <span className="text-gray-400">
                          Goal: ₹{opp.amount}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-yellow-500 h-full rounded-full"
                          style={{
                            width: `${(opp.raised / opp.amount) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleContribute(opp.id)}
                      className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold py-3 rounded-xl transition-colors"
                    >
                      Contribute Now
                    </button>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700">
                      <button
                        onClick={() => handleConnect(opp.id, "call")}
                        className="flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Phone size={16} /> Request Call
                      </button>
                      <button
                        onClick={() => handleConnect(opp.id, "chat")}
                        className="flex items-center justify-center gap-2 py-2 text-sm text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <MessageCircle size={16} /> Request Chat
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
