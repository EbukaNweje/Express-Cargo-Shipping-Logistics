import { FaArrowRight, FaBox, FaShip, FaPlane, FaTruck, FaShieldAlt, FaChartLine } from 'react-icons/fa'

const Services = () => {
  const services = [
    {
      title: "Ocean Freight",
      description: "Cost-effective international shipping with reliable ocean freight services for heavy cargo",
      icon: FaShip,
      features: ["LCL & FCL", "Full tracking", "30+ routes"],
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Air Cargo",
      description: "Express air cargo solutions for time-sensitive shipments with guaranteed delivery",
      icon: FaPlane,
      features: ["24-48hrs delivery", "Door-to-door", "Live tracking"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Land Transportation",
      description: "Comprehensive ground logistics with modern fleet and real-time monitoring",
      icon: FaTruck,
      features: ["Full coverage", "Temperature control", "Real-time GPS"],
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "Customs Clearance",
      description: "Expert customs handling with streamlined documentation for faster clearance",
      icon: FaShieldAlt,
      features: ["Expert agents", "Fast processing", "Risk management"],
      color: "from-blue-600 to-cyan-400"
    },
    {
      title: "Warehousing",
      description: "Secure storage solutions with inventory management and distribution services",
      icon: FaBox,
      features: ["Climate control", "24/7 security", "Inventory mgmt"],
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Supply Chain",
      description: "End-to-end supply chain optimization with integrated logistics management",
      icon: FaChartLine,
      features: ["Optimization", "Analytics", "Cost reduction"],
      color: "from-blue-500 to-cyan-600"
    }
  ]

  return (
    <section id="services" className="py-32 relative bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive logistics solutions tailored to meet your industry-specific needs and business requirements
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{backgroundImage: `linear-gradient(135deg, rgb(34, 211, 238), rgb(59, 130, 246))`}}></div>

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-blue-200 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-blue-300 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                  <span className="text-sm font-semibold">Learn more</span>
                  <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>

                {/* Gradient Border Animation */}
                <div className="absolute inset-0 rounded-2xl p-[2px] -z-10">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <p className="text-blue-200 mb-8">Need a custom solution?</p>
          <a href="#contact" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50">
            Contact Our Sales Team
            <FaArrowRight className="w-5 h-5 ml-3" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
