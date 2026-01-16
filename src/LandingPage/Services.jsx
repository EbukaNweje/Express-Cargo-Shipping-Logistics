import { FaArrowRight } from 'react-icons/fa'

const Services = () => {

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 animate-slide-up">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Solutions</span>
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto animate-fade-in-delay">
            Comprehensive logistics solutions tailored to meet your industry-specific needs
          </p>
        </div>

        {/* Solutions Grid - Masonry-Style Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
          {/* Large Hero Card - Food & Beverage */}
          <div className="md:col-span-2 lg:col-span-3 md:row-span-2">
            <div className="group relative h-96 md:h-full rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0">
                <img 
                  src="/download.jpeg" 
                  alt="Food & Beverage"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <span className="text-cyan-300 text-sm font-medium uppercase tracking-wider">Featured Solution</span>
                <h3 className="text-white text-3xl font-bold mt-2 mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                  Food & Beverage
                </h3>
                <p className="text-gray-300 text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  Specialized cold chain logistics for perishable goods with temperature-controlled transportation and real-time monitoring
                </p>
              </div>
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaArrowRight className="text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Tall Card - Ocean Freight */}
          <div className="md:col-span-2 lg:col-span-2 md:row-span-2">
            <div className="group relative h-96 md:h-full rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0">
                <img 
                  src="/cargo.jpg" 
                  alt="Ocean Freight"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <span className="text-cyan-300 text-sm font-medium uppercase tracking-wider">Solutions</span>
                <h3 className="text-white text-2xl font-bold mt-2 mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  Ocean Freight
                </h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  Cost-effective international shipping solutions with reliable ocean freight services
                </p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaArrowRight className="text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Small Card - Global 4PL */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0">
                <img 
                  src="/download (1).jpeg" 
                  alt="Global 4PL"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
              </div>
              <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                <span className="text-cyan-300 text-xs font-medium uppercase tracking-wider">Solutions</span>
                <h3 className="text-white text-lg font-bold mt-1 mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                  Global 4PL
                </h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  End-to-end supply chain management
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaArrowRight className="text-white text-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Wide Card - Air Cargo */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0">
                <img 
                  src="/aeroplane.jpg" 
                  alt="Air Cargo Services"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <span className="text-cyan-300 text-sm font-medium uppercase tracking-wider">Solutions</span>
                <h3 className="text-white text-xl font-bold mt-2 mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  Air Cargo Services
                </h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  Fast delivery for time-sensitive shipments with premium air cargo solutions
                </p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaArrowRight className="text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Medium Card - Consumer Goods */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0">
                <img 
                  src="/download (2).jpeg" 
                  alt="Consumer Packaged Goods"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
              </div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                <span className="text-cyan-300 text-sm font-medium uppercase tracking-wider">Solutions</span>
                <h3 className="text-white text-xl font-bold mt-2 mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  Consumer Goods
                </h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  Efficient retail distribution solutions for consumer packaged goods
                </p>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaArrowRight className="text-white text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Small Card - Technology Solutions */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl">
              <div className="absolute inset-0">
                <img 
                  src="/solution.jpg" 
                  alt="Technology Solutions"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"></div>
              </div>
              <div className="relative z-10 p-4 h-full flex flex-col justify-end">
                <span className="text-cyan-300 text-xs font-medium uppercase tracking-wider">Solutions</span>
                <h3 className="text-white text-lg font-bold mt-1 mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                  Technology
                </h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  Digital logistics platforms
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FaArrowRight className="text-white text-xs" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discover All Solutions Button */}
        <div className="text-center">
          <button className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <span className="mr-3">DISCOVER ALL SOLUTIONS</span>
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center group-hover:bg-cyan-400 transition-colors duration-300">
              <FaArrowRight className="text-white text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services