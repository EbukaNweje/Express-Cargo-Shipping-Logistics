import { useState, useRef, useEffect, useCallback } from 'react'
import { FaShippingFast, FaGlobeAmericas, FaClock, FaHeadset } from 'react-icons/fa'

// Move stats outside component to avoid dependency issues
const statsData = [
  { key: 'shipments', number: 50000, label: "Shipments Delivered", icon: FaShippingFast, suffix: 'K+', displayDivisor: 1000 },
  { key: 'countries', number: 120, label: "Countries Served", icon: FaGlobeAmericas, suffix: '+' },
  { key: 'delivery', number: 99.9, label: "On-Time Delivery", icon: FaClock, suffix: '%', isDecimal: true },
  { key: 'support', number: 24, label: "Customer Support", icon: FaHeadset, suffix: '/7', isSpecial: true }
]

const Stats = () => {
  const [hasAnimated, setHasAnimated] = useState(false)
  const [counters, setCounters] = useState({ shipments: 0, countries: 0, delivery: 0, support: 0 })
  const statsRef = useRef(null)

  const animateCounters = useCallback(() => {
    const duration = 2000 // 2 seconds
    const steps = 60 // 60 steps for smooth animation
    const stepDuration = duration / steps

    statsData.forEach((stat) => {
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
          [stat.key]: stat.isDecimal ? Math.round(currentValue * 10) / 10 : Math.floor(currentValue)
        }))
      }, stepDuration)
    })
  }, [])

  // Intersection Observer for scroll-triggered animation
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

  const formatNumber = (stat, value) => {
    if (stat.displayDivisor) {
      return Math.floor(value / stat.displayDivisor)
    }
    if (stat.isDecimal) {
      return value.toFixed(1)
    }
    return value
  }

  return (
    <section className="py-0 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full -translate-x-36 -translate-y-36 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full translate-x-48 translate-y-48 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Thousands</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our commitment to excellence is reflected in the numbers that matter most
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon
            const currentValue = counters[stat.key]
            const displayValue = formatNumber(stat, currentValue)
            
            return (
              <div 
                key={index}
                className="text-center group animate-fade-in-up relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Card with enhanced design */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Icon with background */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-2xl text-cyan-600" />
                    </div>
                    
                    {/* Number */}
                    <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                      {displayValue}{stat.suffix}
                    </div>
                    
                    {/* Label */}
                    <div className="text-gray-600 font-medium text-lg">
                      {stat.label}
                    </div>
                  </div>
                  
                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional visual element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-cyan-50 to-blue-50 px-8 py-4 rounded-full border border-cyan-100">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">Live tracking across all shipments</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats