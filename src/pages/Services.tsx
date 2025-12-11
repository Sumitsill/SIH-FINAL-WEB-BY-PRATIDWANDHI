import React from "react";
import { Award, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TiltedCard from "../components/TiltedCard";
import { useLanguage } from "../contexts/LanguageContext";

const Services: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = [
    {
      id: "marketplace-fundraiser",
      icon: <Award className="h-12 w-12 text-yellow-400" />,
      title: t('services.marketplace.title'),
      subtitle: t('services.marketplace.subtitle'),
      description: t('services.marketplace.desc'),
      capabilities: [
        "Sell merchandise and memorabilia directly to fans",
        "Launch fundraising campaigns for training, travel, and events",
        "Connect with sponsors and supporters worldwide",
      ],
      buttonText: t('services.marketplace.btn'),
      onClick: () => navigate("/marketplace"),
      gradient: "from-yellow-400 to-orange-500",
      hoverGradient: "hover:from-yellow-500 hover:to-orange-600",
    },
    {
      id: "sai-athlete-interconnectivity",
      icon: <Sparkles className="h-12 w-12 text-blue-400" />,
      title: t('services.network.title'),
      subtitle: t('services.network.subtitle'),
      description: t('services.network.desc'),
      capabilities: [
        "Connect with fellow SAI athletes and coaches",
        "Access shared training resources and schedules",
        "Participate in exclusive SAI events and workshops",
      ],
      buttonText: t('services.network.btn'),
      gradient: "from-blue-400 to-cyan-500",
      hoverGradient: "hover:from-blue-500 hover:to-cyan-600",
    },

    {
      id: "talentDetection",
      icon: <Sparkles className="h-12 w-12 text-white drop-shadow-lg" />,
      title: t('services.ai.title'),
      subtitle: t('services.ai.subtitle'),
      description: t('services.ai.desc'),
      capabilities: [
        "AI-based analysis of reels, posts, captions & engagement",
        "Automated talent tagging: Acting, Dance, Fitness, Comedy, Speaking, Sports & more",
        "ML-driven insights on audience interaction & content trends",
      ],
      buttonText: t('services.ai.btn'),
      gradient: "from-purple-600 to-indigo-600",
      hoverGradient: "hover:from-purple-700 hover:to-indigo-700",
    },
  ];



  const handleServiceClick = (serviceId: string) => {
    if (serviceId === "realtime-detection") {
      window.open("http://localhost:8000/realtime-detection/stream/", "_blank");
    } else if (serviceId === "marketplace-fundraiser") {
      navigate("/marketplace");
    } else if (serviceId === "sai-athlete-interconnectivity") {
      navigate("/community");
    } else {
      alert(
        `Opening ${serviceId} service. This will be implemented with actual functionality.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 font-sans selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Section */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              {t('services.title')}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {services.map((service) => (
            <div key={service.id} className="flex justify-center group">
              <TiltedCard
                imageSrc={
                  service.id === "marketplace-fundraiser"
                    ? "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
                    : service.id === "sai-athlete-interconnectivity"
                      ? "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                      : "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000&auto=format&fit=crop"
                }
                altText={service.title}
                captionText={service.title}
                containerHeight="420px"
                containerWidth="320px"
                imageHeight="420px"
                imageWidth="320px"
                rotateAmplitude={10}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="w-full h-full p-6 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-[15px]">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="text-white font-bold text-2xl mb-2 leading-tight drop-shadow-md">{service.title}</h3>
                      <p className="text-gray-300 text-sm mb-6 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {service.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service.id);
                        }}
                        className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                      >
                        {service.buttonText}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </button>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-6">{t('services.footer_title')}</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              {t('services.footer_desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contact"
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {t('services.demo_btn')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
