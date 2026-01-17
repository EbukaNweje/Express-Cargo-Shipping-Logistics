import { useState, useRef, useEffect, useCallback } from "react";
import {
  FaShippingFast,
  FaGlobeAmericas,
  FaClock,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

// Custom animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;

const statsData = [
  {
    key: "shipments",
    number: 50000,
    label: "Shipments Delivered",
    icon: FaShippingFast,
    suffix: "K+",
    displayDivisor: 1000,
  },
  {
    key: "countries",
    number: 120,
    label: "Countries Served",
    icon: FaGlobeAmericas,
    suffix: "+",
  },
  {
    key: "delivery",
    number: 99.9,
    label: "On-Time Delivery",
    icon: FaClock,
    suffix: "%",
    isDecimal: true,
  },
  {
    key: "support",
    number: 24,
    label: "Customer Support",
    icon: FaHeadset,
    suffix: "/7",
    isSpecial: true,
  },
];

const Stats = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counters, setCounters] = useState({
    shipments: 0,
    countries: 0,
    delivery: 0,
    support: 0,
  });
  const statsRef = useRef(null);

  const animateCounters = useCallback(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    statsData.forEach((stat) => {
      let currentValue = 0;
      const increment = stat.number / steps;

      const timer = setInterval(() => {
        currentValue += increment;

        if (currentValue >= stat.number) {
          currentValue = stat.number;
          clearInterval(timer);
        }

        setCounters((prev) => ({
          ...prev,
          [stat.key]: stat.isDecimal
            ? Math.round(currentValue * 10) / 10
            : Math.floor(currentValue),
        }));
      }, stepDuration);
    });
  }, []);

  useEffect(() => {
    const currentStatsRef = statsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 },
    );

    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, [hasAnimated, animateCounters]);

  return (
    <>
      <style>{styles}</style>
      <section ref={statsRef} className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

          {/* Aesthetic White Background Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full blur-lg animate-float delay-500"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-white/25 rounded-full blur-2xl animate-float delay-1000"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/18 rounded-full blur-xl animate-float delay-1500"></div>

          {/* Professional Animated Shapes */}
          <div className="absolute top-1/4 left-1/2 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-ping delay-700"></div>
          <div className="absolute bottom-1/4 left-1/5 w-2.5 h-2.5 bg-white/35 rounded-full animate-ping delay-1400"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Aeroplane Image Section */}
          <div className="mb-16 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/download (1).jpeg"
                    alt="Air Cargo Services"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 group-hover:from-cyan-600/30 group-hover:to-blue-600/30 transition-all duration-300"></div>
                </div>
                {/* Sideways text overlay */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8">
                  <div className="text-white font-bold text-lg tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-90 origin-center">
                    AIR CARGO
                  </div>
                </div>
              </div>
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Global Air Freight Solutions
                </h3>
                <p className="text-blue-200 text-lg leading-relaxed mb-6">
                  Experience lightning-fast air cargo services with our
                  extensive network of international airports and dedicated
                  cargo terminals.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded"></div>
                  <span className="text-cyan-400 font-semibold">
                    24/7 Operations
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              const displayValue = stat.displayDivisor
                ? (counters[stat.key] / stat.displayDivisor).toFixed(0)
                : counters[stat.key];

              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 text-center"
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>

                  {/* Counter */}
                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                      {stat.isSpecial
                        ? `${displayValue}${stat.suffix}`
                        : `${displayValue}${stat.suffix}`}
                    </div>
                  </div>

                  {/* Label */}
                  <p className="text-blue-200 font-semibold">{stat.label}</p>

                  {/* Check Icon */}
                  <div className="mt-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaCheckCircle className="w-5 h-5 mx-auto" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cargo Image Section */}
          <div className="relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white order-2 lg:order-1">
                <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Express Air Freight Services
                </h3>
                <p className="text-blue-200 text-lg leading-relaxed mb-6">
                  Experience rapid and reliable air freight delivery with our
                  extensive network of global airports and dedicated cargo
                  aircraft for time-sensitive shipments.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded"></div>
                  <span className="text-cyan-400 font-semibold">
                    Fast & Global
                  </span>
                </div>
              </div>
              <div className="relative group order-1 lg:order-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/aeroplane.jpg"
                    alt="Air Freight Services"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-cyan-600/20 to-blue-600/20 group-hover:from-cyan-600/30 group-hover:to-blue-600/30 transition-all duration-300"></div>
                </div>
                {/* Sideways text overlay */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8">
                  <div className="text-white font-bold text-lg tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-90 origin-center">
                    AIR FREIGHT
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Image Section */}
          <div className="relative mt-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/download (2).jpeg"
                    alt="Advanced Shipping Solutions"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 group-hover:from-cyan-600/30 group-hover:to-blue-600/30 transition-all duration-300"></div>
                </div>
                {/* Sideways text overlay */}
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8">
                  <div className="text-white font-bold text-lg tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-90 origin-center">
                    ADVANCED SOLUTIONS
                  </div>
                </div>
              </div>
              <div className="text-white">
                <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Advanced Shipping Solutions
                </h3>
                <p className="text-blue-200 text-lg leading-relaxed mb-6">
                  Leveraging cutting-edge technology and innovative logistics
                  strategies to deliver exceptional shipping experiences with
                  real-time tracking and predictive analytics.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded"></div>
                  <span className="text-cyan-400 font-semibold">
                    Smart & Efficient
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Stats;
