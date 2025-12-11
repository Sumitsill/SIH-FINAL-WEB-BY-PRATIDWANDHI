import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Users, Building2, HeartHandshake, ArrowRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const ServiceSelection: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const roles = [
        {
            id: "athlete",
            title: "selection.roles.athlete.title",
            description: "selection.roles.athlete.desc",
            icon: <User className="h-8 w-8 text-blue-400" />,
            gradient: "from-blue-500/20 to-cyan-500/20",
            border: "hover:border-blue-500",
        },
        {
            id: "coach",
            title: "selection.roles.coach.title",
            description: "selection.roles.coach.desc",
            icon: <Users className="h-8 w-8 text-green-400" />,
            gradient: "from-green-500/20 to-emerald-500/20",
            border: "hover:border-green-500",
        },
        {
            id: "academy",
            title: "selection.roles.academy.title",
            description: "selection.roles.academy.desc",
            icon: <Building2 className="h-8 w-8 text-purple-400" />,
            gradient: "from-purple-500/20 to-indigo-500/20",
            border: "hover:border-purple-500",
        },
        {
            id: "sponsor",
            title: "selection.roles.sponsor.title",
            description: "selection.roles.sponsor.desc",
            icon: <HeartHandshake className="h-8 w-8 text-yellow-400" />,
            gradient: "from-yellow-500/20 to-orange-500/20",
            border: "hover:border-yellow-500",
        },
    ];

    const handleSelect = (roleId: string) => {
        navigate("/login", { state: { role: roleId } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-5xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('selection.welcome')}{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Pratidwandhi
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300">
                        {t('selection.select_role')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => handleSelect(role.id)}
                            className={`group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-left transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${role.border}`}
                        >
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            ></div>
                            <div className="relative z-10 flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="bg-slate-900/50 p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {role.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        {t(role.title)}
                                    </h3>
                                    <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                                        {t(role.description)}
                                    </p>
                                </div>
                                <div className="bg-slate-700/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                    <ArrowRight className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-500 text-sm">
                        {t('selection.help')}{" "}
                        <a href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                            {t('selection.contact_support')}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServiceSelection;
