import React, { useState } from "react";
import {
    Users,
    UserCheck,
    MessageSquare,
    Phone,
    UserPlus,
    CheckCircle,
    Clock,
    Shield,
    Search,
    Filter,
    X,
    Send,
    Mic,
    Video,
    PhoneOff,
} from "lucide-react";

// Mock Data Types
interface Profile {
    id: number;
    name: string;
    role: string;
    sport: string;
    image: string;
    verified: boolean;
    status: "none" | "pending" | "connected";
}

interface Request {
    id: number;
    fromUser: string;
    sport: string;
    message: string;
}

const Community: React.FC = () => {
    const [userType, setUserType] = useState<"user" | "expert">("user");
    const [activeChat, setActiveChat] = useState<Profile | null>(null);
    const [activeCall, setActiveCall] = useState<Profile | null>(null);
    const [messageInput, setMessageInput] = useState("");

    // Mock Profiles for User View
    const [profiles, setProfiles] = useState<Profile[]>([
        {
            id: 1,
            name: "Rahul Sharma",
            role: "Senior Coach",
            sport: "Cricket",
            image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=300&q=80",
            verified: true,
            status: "none",
        },
        {
            id: 2,
            name: "Priya Singh",
            role: "Physiotherapist",
            sport: "Athletics",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
            verified: true,
            status: "connected",
        },
        {
            id: 3,
            name: "Vikram Malhotra",
            role: "Nutritionist",
            sport: "General",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
            verified: true,
            status: "pending",
        },
        {
            id: 4,
            name: "Anjali Devi",
            role: "Former Olympian",
            sport: "Badminton",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
            verified: true,
            status: "none",
        },
        {
            id: 5,
            name: "Arjun Kapoor",
            role: "Strength Coach",
            sport: "Weightlifting",
            image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=300&q=80",
            verified: false, // Not verified example
            status: "none",
        },
    ]);

    // Mock Requests for Expert View
    const [requests, setRequests] = useState<Request[]>([
        {
            id: 101,
            fromUser: "Amit Kumar",
            sport: "Cricket",
            message: "Hi, I need guidance on my bowling technique.",
        },
        {
            id: 102,
            fromUser: "Sneha Gupta",
            sport: "Athletics",
            message: "Looking for a diet plan for marathon training.",
        },
    ]);

    const handleConnect = (id: number) => {
        setProfiles((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: "pending" } : p))
        );
    };

    const handleApprove = (id: number) => {
        setRequests((prev) => prev.filter((r) => r.id !== id));
        // In a real app, this would update the user's status to 'connected' in the backend
        alert("Request Approved! You can now message this user.");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        🤝{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Sports Community
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Connect with verified experts, coaches, and fellow athletes to elevate your game.
                    </p>
                </div>

                {/* Role Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-800/50 p-1 rounded-xl inline-flex border border-slate-700">
                        <button
                            onClick={() => setUserType("user")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${userType === "user"
                                ? "bg-blue-500 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                                }`}
                        >
                            <Users className="h-5 w-5" />
                            I'm an Athlete
                        </button>
                        <button
                            onClick={() => setUserType("expert")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${userType === "expert"
                                ? "bg-green-500 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                                }`}
                        >
                            <UserCheck className="h-5 w-5" />
                            I'm an Expert
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                {userType === "user" ? (
                    <div className="animate-fadeIn">
                        {/* Search & Filter */}
                        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Find coaches, nutritionists..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                                <Filter className="h-4 w-4" /> Filter by Sport
                            </button>
                        </div>

                        {/* Profiles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {profiles.map((profile) => (
                                <div
                                    key={profile.id}
                                    className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={profile.image}
                                                alt={profile.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-slate-600 group-hover:border-blue-500 transition-colors"
                                            />
                                            <div>
                                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                    {profile.name}
                                                    {profile.verified && (
                                                        <CheckCircle className="h-4 w-4 text-blue-400" />
                                                    )}
                                                </h3>
                                                <p className="text-sm text-blue-400 font-medium">
                                                    {profile.role}
                                                </p>
                                                <p className="text-xs text-gray-400">{profile.sport}</p>
                                            </div>
                                        </div>
                                        {profile.verified && (
                                            <div className="bg-blue-500/10 p-1.5 rounded-lg" title="Verified Expert">
                                                <Shield className="h-5 w-5 text-blue-400" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-6">
                                        {profile.status === "connected" ? (
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={() => setActiveChat(profile)}
                                                    className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors text-sm font-medium"
                                                >
                                                    <MessageSquare className="h-4 w-4" /> Message
                                                </button>
                                                <button
                                                    onClick={() => setActiveCall(profile)}
                                                    className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors text-sm font-medium"
                                                >
                                                    <Phone className="h-4 w-4" /> Call
                                                </button>
                                            </div>
                                        ) : profile.status === "pending" ? (
                                            <button
                                                disabled
                                                className="w-full bg-slate-700/50 text-gray-400 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 cursor-not-allowed"
                                            >
                                                <Clock className="h-4 w-4" /> Request Pending
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleConnect(profile.id)}
                                                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                                            >
                                                <UserPlus className="h-4 w-4" /> Connect Request
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="animate-fadeIn max-w-4xl mx-auto">
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Connection Requests</h2>
                                    <p className="text-gray-400 mt-1">
                                        Manage incoming requests from athletes
                                    </p>
                                </div>
                                <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-green-400 font-semibold text-sm">
                                        Profile Active
                                    </span>
                                </div>
                            </div>

                            {requests.length > 0 ? (
                                <div className="space-y-4">
                                    {requests.map((request) => (
                                        <div
                                            key={request.id}
                                            className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 font-bold text-xl">
                                                    {request.fromUser.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-bold text-lg">
                                                        {request.fromUser}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm mb-1">
                                                        Sport: <span className="text-blue-400">{request.sport}</span>
                                                    </p>
                                                    <p className="text-gray-500 text-sm italic">
                                                        "{request.message}"
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 w-full md:w-auto">
                                                <button
                                                    onClick={() => handleApprove(request.id)}
                                                    className="flex-1 md:flex-none bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-green-500/20"
                                                >
                                                    Approve
                                                </button>
                                                <button className="flex-1 md:flex-none bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Users className="h-8 w-8 text-gray-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        No Pending Requests
                                    </h3>
                                    <p className="text-gray-400">
                                        You're all caught up! Check back later for new connection requests.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Modal */}
            {activeChat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
                    <div className="bg-slate-900 w-full h-full sm:h-[600px] sm:w-[400px] sm:rounded-2xl flex flex-col shadow-2xl border border-slate-700 overflow-hidden">
                        {/* Header */}
                        <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src={activeChat.image}
                                        alt={activeChat.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">{activeChat.name}</h3>
                                    <p className="text-xs text-blue-400">Online</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setActiveChat(null)}
                                className="p-2 hover:bg-slate-700 rounded-full text-gray-400 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                            <div className="flex justify-start">
                                <div className="bg-slate-800 text-gray-200 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%] text-sm">
                                    Hi! How can I help you today?
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%] text-sm">
                                    I was looking for some advice on my training routine.
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="bg-slate-800 text-gray-200 rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%] text-sm">
                                    Sure! I'd be happy to help. What specific areas are you focusing on?
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-slate-800 border-t border-slate-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                                />
                                <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full transition-colors">
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Call Modal */}
            {activeCall && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-md">
                    <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md p-8">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
                            <img
                                src={activeCall.image}
                                alt={activeCall.name}
                                className="w-32 h-32 rounded-full object-cover border-4 border-slate-800 relative z-10 shadow-2xl"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">{activeCall.name}</h2>
                        <p className="text-blue-400 animate-pulse mb-12">Calling...</p>

                        <div className="flex items-center gap-6">
                            <button className="p-4 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-colors">
                                <Mic className="h-6 w-6" />
                            </button>
                            <button
                                onClick={() => setActiveCall(null)}
                                className="p-4 bg-red-600 rounded-full text-white hover:bg-red-500 transition-colors transform hover:scale-110 shadow-lg shadow-red-600/30"
                            >
                                <PhoneOff className="h-8 w-8" />
                            </button>
                            <button className="p-4 bg-slate-800 rounded-full text-white hover:bg-slate-700 transition-colors">
                                <Video className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;
