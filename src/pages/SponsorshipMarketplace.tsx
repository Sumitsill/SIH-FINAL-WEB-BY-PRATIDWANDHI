import React, { useState } from "react";
import { Clock } from "lucide-react";

interface Campaign {
    id: number;
    athleteName: string;
    sport: string;
    title: string;
    description: string;
    goalAmount: number;
    raisedAmount: number;
    daysLeft: number;
    image: string;
}

const SponsorshipMarketplace: React.FC = () => {
    const [userRole, setUserRole] = useState<"athlete" | "sponsor">("athlete"); // Toggle for demo
    const [campaigns] = useState<Campaign[]>([
        {
            id: 1,
            athleteName: "Rahul Sharma",
            sport: "Cricket",
            title: "Equipment for Regional Championship",
            description: "I need funds to buy professional cricket gear for the upcoming state-level tournament.",
            goalAmount: 50000,
            raisedAmount: 15000,
            daysLeft: 12,
            image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=300&q=80"
        },
        {
            id: 2,
            athleteName: "Priya Singh",
            sport: "Athletics",
            title: "Training Camp Expenses",
            description: "Support my 2-month high-altitude training camp to prepare for the Nationals.",
            goalAmount: 100000,
            raisedAmount: 45000,
            daysLeft: 20,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
        }
    ]);

    const handleFund = (id: number) => {
        alert(`Thank you for your interest in funding campaign #${id}! Payment gateway would open here.`);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">
                        <span className="text-green-400">Sponsorship</span> Marketplace
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Connect with future champions. Fund their dreams and be part of their success story.
                    </p>

                    {/* Role Toggle for Demo */}
                    <div className="mt-8 inline-flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                        <button
                            onClick={() => setUserRole("athlete")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${userRole === 'athlete' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            View as Athlete
                        </button>
                        <button
                            onClick={() => setUserRole("sponsor")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${userRole === 'sponsor' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            View as Sponsor
                        </button>
                    </div>
                </div>

                {userRole === "athlete" ? (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Create Funding Campaign</h2>
                                <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/20">
                                    Verified Athlete
                                </div>
                            </div>

                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Title</label>
                                    <input type="text" placeholder="e.g. Road to Olympics 2028" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Goal Amount (₹)</label>
                                        <input type="number" placeholder="50000" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Duration (Days)</label>
                                        <input type="number" placeholder="30" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Why do you need funds?</label>
                                    <textarea rows={4} placeholder="Describe your journey, achievements, and how this funding will help..." className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-green-500 outline-none"></textarea>
                                </div>

                                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]">
                                    Launch Campaign
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-green-500/30 transition-all duration-300 group">
                                <div className="relative h-48">
                                    <img src={campaign.image} alt={campaign.athleteName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                                        {campaign.sport}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1">{campaign.title}</h3>
                                            <p className="text-sm text-blue-400 font-medium">{campaign.athleteName}</p>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                                        {campaign.description}
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-white font-bold">₹{campaign.raisedAmount.toLocaleString()}</span>
                                                <span className="text-gray-400">of ₹{campaign.goalAmount.toLocaleString()}</span>
                                            </div>
                                            <div className="w-full bg-slate-700 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                                                    style={{ width: `${(campaign.raisedAmount / campaign.goalAmount) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <Clock className="h-4 w-4" />
                                                {campaign.daysLeft} days left
                                            </div>
                                            <button
                                                onClick={() => handleFund(campaign.id)}
                                                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-green-900/20"
                                            >
                                                Fund Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SponsorshipMarketplace;
