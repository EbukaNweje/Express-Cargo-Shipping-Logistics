import { useState, useRef, useEffect, useCallback } from 'react'
import { FaMapMarkerAlt, FaLock, FaGlobe, FaCog, FaBolt, FaUsers, FaShip, FaAward, FaClock, FaHandshake } from 'react-icons/fa'

// Move stats outside component to avoid dependency issues
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
      icon: FaMapMarkerAlt
    },
    {
      title: "Secure Handling",
      description: "Your cargo is protected with state-of-the-art security measures and insurance coverage.",
      icon: FaLock
    },
    {
      title: "Global Network",
      description: "Access to worldwide shipping routes and partnerships with trusted logistics providers.",
      icon: FaGlobe
    },
    {
      title: "Custom Solutions",
      description: "Tailored shipping solutions designed to meet your specific business requirements.",
      icon: FaCog
    },
    {
      title: "Fast Processing",
      description: "Streamlined customs clearance and documentation for faster delivery times.",
      icon: FaBolt
    },
    {
      title: "Expert Support",
      description: "Dedicated customer service team with years of international shipping experience.",
      icon: FaUsers
    }
  ]

  const animateCounters = useCallback(() => {
    const duration = 2000 // 2 seconds
    const steps = 60 // 60 steps for smooth animation
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
    return value
  }

  return (
    <section id="features" className="py-0 relative overflow-hidden">
      <div className="relative z-10">
        {/* About Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 animate-slide-up">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Express Cargo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
            Leading the industry with innovative shipping solutions and unmatched global reach
          </p>
        </div>

        {/* Mission Section with Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="text-4xl text-cyan-600 mr-4">
                  <FaAward />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                At Express Cargo Shipping Logistics, we are committed to revolutionizing global trade by providing 
                seamless, reliable, and innovative shipping solutions that connect businesses worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our dedication to excellence, cutting-edge technology, and customer-first approach has made us 
                a trusted partner for thousands of businesses across the globe.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded"></div>
                <span className="text-cyan-600 font-semibold">Trusted Worldwide</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/solution.jpg" 
                alt="Logistics Solutions" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-2xl font-bold mb-2">Innovative Solutions</h4>
                <p className="text-blue-100">Cutting-edge logistics technology and processes</p>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-30 animate-bounce"></div>
          </div>
        </div>

        {/* Story Section with Airplane Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/aeroplane.jpg" 
                alt="Air Cargo Transportation" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-2xl font-bold mb-2">Air Freight Excellence</h4>
                <p className="text-blue-100">Fast, secure air cargo solutions worldwide</p>
              </div>
            </div>
            {/* Floating airplane icon */}
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-float">
              <svg className="w-10 h-10 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
            </div>
          </div>
          <div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 shadow-xl">
              <div className="flex items-center mb-6">
                <div className="text-4xl text-blue-600 mr-4">
                  <FaShip />
                </div>
                <h3 className="text-3xl font-bold text-gray-800">Our Story</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Founded in 1999, Express Cargo began as a small freight forwarding company with a vision to 
                simplify international shipping for businesses of all sizes.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Today, we operate one of the world's largest shipping networks, handling millions of containers 
                annually and maintaining partnerships with major ports and logistics providers globally.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-2xl font-bold text-cyan-600">1999</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-md">
                  <div className="text-2xl font-bold text-blue-600">25+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics with Visual Enhancement */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Impact</span>
            </h3>
            <p className="text-gray-600 text-lg">Numbers that speak for our excellence</p>
          </div>
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 rounded-3xl -z-10"></div>
            {aboutStats.map((stat, index) => {
              const IconComponent = stat.icon
              const currentValue = counters[stat.key]
              const displayValue = formatNumber(stat, currentValue)
              
              return (
                <div 
                  key={index}
                  className="text-center bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg relative overflow-hidden"
                >
                  {/* Background pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
                  <div className="relative z-10">
                    <div className="text-4xl text-cyan-600 mb-4 flex justify-center">
                      <IconComponent />
                    </div>
                    <div className="text-3xl font-bold text-gray-800 mb-2">{displayValue}{stat.suffix}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Why Choose Us with Enhanced Layout */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Us</span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our premium cargo shipping services and industry-leading expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-200 animate-fade-in-up hover:scale-105 shadow-md relative overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-300 shrink-0 text-cyan-600 bg-cyan-50 p-3 rounded-lg">
                        <IconComponent />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center">
          <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-12 text-white shadow-2xl overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/5 rounded-full translate-x-30 translate-y-30"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10">
              <h4 className="text-4xl font-bold mb-6">
                Ready to Ship with <span className="text-cyan-100">Express Cargo</span>?
              </h4>
              <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of satisfied customers who trust us with their most important shipments. 
                Get started today and experience world-class logistics services.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-10 py-4 bg-white text-cyan-600 font-bold rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg">
                  Get Quote Now
                </button>
                <button className="px-10 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-cyan-600 transform hover:scale-105 transition-all duration-300 text-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features