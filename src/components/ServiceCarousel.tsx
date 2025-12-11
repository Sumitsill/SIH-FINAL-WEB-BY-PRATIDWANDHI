import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, ArrowRight } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "../utils/cn";

interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  buttonText: string;
  gradient: string;
  hoverGradient: string;
  onClick?: () => void;
}

interface ServiceCarouselProps {
  services: Service[];
  onServiceClick: (serviceId: string) => void;
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({
  services,
  onServiceClick,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}) => {
  const css = `
    .ServiceCarousel {
      padding-bottom: 80px !important;
    }
    .ServiceCarousel .swiper-pagination-bullet {
      background: rgba(6, 182, 212, 0.5);
      width: 12px;
      height: 12px;
    }
    .ServiceCarousel .swiper-pagination-bullet-active {
      background: #06b6d4;
      transform: scale(1.2);
    }
    .ServiceCarousel .swiper-button-next,
    .ServiceCarousel .swiper-button-prev {
      color: #06b6d4;
      background: rgba(30, 41, 59, 0.8);
      backdrop-filter: blur(10px);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin-top: -25px;
      border: 1px solid rgba(6, 182, 212, 0.3);
      transition: all 0.3s ease;
    }
    .ServiceCarousel .swiper-button-next:hover,
    .ServiceCarousel .swiper-button-prev:hover {
      background: rgba(6, 182, 212, 0.2);
      border-color: #06b6d4;
      transform: scale(1.1);
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.3,
      }}
      className={cn("w-full relative", className)}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
              delay: 4000,
              disableOnInteraction: false,
            }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2.5,
          },
        }}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2,
        }}
        pagination={
          showPagination
            ? {
              clickable: true,
            }
            : false
        }
        navigation={
          showNavigation
            ? {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }
            : false
        }
        className="ServiceCarousel"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {services.map((service, index) => (
          <SwiperSlide key={service.id} className="!h-auto pb-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.02] h-full cursor-pointer"
              onClick={() => {
                if (service.onClick) {
                  service.onClick();
                } else {
                  onServiceClick(service.id);
                }
              }}
            >
              {/* Icon and Title */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`text-transparent bg-gradient-to-r ${service.gradient} bg-clip-text p-2 rounded-xl bg-slate-700/50 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                  <p className="text-cyan-400 font-medium">{service.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>

              {/* Capabilities */}
              <div className="space-y-3 mb-8">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wide">Key Capabilities:</h4>
                <ul className="space-y-2">
                  {service.capabilities.map((capability, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-gray-400 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                className={`group/btn w-full flex items-center justify-center space-x-3 bg-gradient-to-r ${service.gradient} ${service.hoverGradient} text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] swiper-no-swiping relative z-50 cursor-pointer`}
              >
                <span>{service.buttonText}</span>
                <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </SwiperSlide>
        ))}

        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

export default ServiceCarousel;