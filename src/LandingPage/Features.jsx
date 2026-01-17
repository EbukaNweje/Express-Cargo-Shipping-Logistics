import { useState, useRef, useEffect, useCallback } from 'react'
import { FaMapMarkerAlt, FaLock, FaGlobe, FaCog, FaBolt, FaUsers, FaShip, FaAward, FaClock, FaHandshake } from 'react-icons/fa'

const aboutStats = [
  { key: 'years', number: 25, label: "Years Experience", icon: FaClock, suffix: '+' },
  { key: 'countries', number: 120, label: "Countries Served", icon: FaGlobe, suffix: '+' },
  { key: 'vessels', number: 500, label: "Fleet Vessels", icon: FaShip, suffix: '+' },
  { key: 'clients', number: 50000, label: "Happy Clients", icon: FaHandshake, suffix: 'K+', displayDivisor: 1000 }
]

const Features = () => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [counters, setCounters] = useState({ years: 0, countries: 0, vessels: 0, clients: 0 })
  const statsRef = useRef(null)

  const features = [
    {
      title: "Real-Time Tracking",
      description: "Monitor your shipments 24/7 with our advanced GPS tracking system and get instant updates.",
      icon: FaMapMarkerAlt,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Secure Handling",
      description: "Your cargo is protected with state-of-the-art security measures and insurance coverage.",
      icon: FaLock,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Global Network",
      description: "Access to worldwide shipping routes and partnerships with trusted logistics providers.",
      icon: FaGlobe,
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "Custom Solutions",
      description: "Tailored shipping solutions designed to meet your specific business requirements.",
      icon: FaCog,
      color: "from-blue-600 to-cyan-400"
    },
    {
      title: "Fast Processing",
      description: "Streamlined customs clearance and documentation for faster delivery times.",
      icon: FaBolt,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Expert Support",
      description: "Dedicated customer service team with years of international shipping experience.",
      icon: FaUsers,
      color: "from-blue-500 to-cyan-600"
    }
  ]

  const animateCounters = useCallback(() => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    aboutStats.forEach((stat) => {
      let currentValue = 0
      const increment = stat.number / steps
      
      const timer = setInterval(() => {
        currentValue += increment
        
        if (currentValue >= stat.number) {
          currentValue = stat.number
          clearInterval(timer)
        }
        
        setCounters(prev => ({
          ...prev,
          [stat.key]: Math.floor(currentValue)
        }))
      }, stepDuration)
    })
  }, [])

  useEffect(() => {
    const currentStatsRef = statsRef.current
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCounters()
          }
        })
      },
      { threshold: 0.5 }
    )

    if (currentStatsRef) {
      observer.observe(currentStatsRef)
    }

    return () => {
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef)
      }
    }
  }, [hasAnimated, animateCounters])

  return (
    <section id="features" className="relative py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Features Section */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Express Cargo?</span>
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Industry-leading features designed to simplify your logistics operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Background glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${feature.color}`}></div>

                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-blue-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="relative py-20 border-t border-cyan-500/20">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Track Record</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutStats.map((stat, index) => {
              const IconComponent = stat.icon
              const displayValue = stat.displayDivisor 
                ? Math.floor(counters[stat.key] / stat.displayDivisor)
                : counters[stat.key]

              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-cyan-400" />
                    </div>
                  </div>

                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
                    {displayValue}{stat.suffix}
                  </div>

                  <p className="text-blue-200 font-semibold">
                    {stat.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
