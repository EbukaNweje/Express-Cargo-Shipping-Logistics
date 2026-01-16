import { FaPhone, FaEnvelope, FaComments } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-slide-up">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ship</span>?
        </h2>
        
        <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto animate-fade-in-delay leading-relaxed">
          Get started with our world-class cargo shipping services today. 
          Fast quotes, reliable delivery, exceptional service.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up">
          <Link 
            to="/quote"
            className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 inline-block"
          >
            <span className="flex items-center justify-center">
              Get Free Quote
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          
          <Link 
            to="/contact-sales"
            className="px-10 py-5 border-2 border-cyan-400 text-cyan-400 font-bold text-lg rounded-xl hover:bg-cyan-400 hover:text-slate-900 transform hover:scale-105 transition-all duration-300 inline-block"
          >
            Contact Sales
          </Link>
        </div>

        {/* Contact info */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 animate-fade-in-up">
          <div className="text-center">
            <div className="text-3xl mb-3 text-cyan-400">
              <FaPhone className="mx-auto" />
            </div>
            <div className="text-white font-semibold">Call Us</div>
            <div className="text-cyan-400">+1 (555) 123-4567</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3 text-cyan-400">
              <FaEnvelope className="mx-auto" />
            </div>
            <div className="text-white font-semibold">Email Us</div>
            <div className="text-cyan-400">info@expresscargoship.com</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3 text-cyan-400">
              <FaComments className="mx-auto" />
            </div>
            <div className="text-white font-semibold">Live Chat</div>
            <div className="text-cyan-400">Available 24/7</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img 
              src="/cargo.jpg" 
              alt="Express Cargo Logo" 
              className="h-8 w-8 object-cover rounded-lg shadow-md"
            />
            <div className="text-xl font-bold text-white">
              <span className="text-cyan-400">Express</span> Cargo Shipping Logistics
            </div>
          </div>
          <p className="text-blue-300 mb-6">Your trusted global shipping partner</p>
          <div className="text-blue-400 text-sm">
            © {new Date().getFullYear()} Express Cargo Shipping Logistics. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  )
}

export default CTA