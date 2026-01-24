import { FaPhone, FaEnvelope, FaComments } from "react-icons/fa";
import { Link } from "react-router-dom";
import expLogo from "../asset/expLogo.png";

const CTA = () => {
  return (
    <section
      id="contact"
      className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-900 to-black"
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Main CTA */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Transform
            </span>
            <br />
            Your Shipping?
          </h2>

          <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Get started with world-class cargo shipping services. Fast quotes,
            reliable delivery, and exceptional 24/7 support.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/quote"
              className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-cyan-500/50 inline-block"
            >
              <span className="flex items-center justify-center">
                Get Free Quote
                <svg
                  className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </Link>

            <Link
              to="/contact-sales"
              className="px-10 py-5 border-2 border-cyan-400 text-cyan-400 font-bold text-lg rounded-xl hover:bg-cyan-400/10 hover:border-cyan-300 transform hover:scale-105 transition-all duration-300 inline-block backdrop-blur-sm"
            >
              Contact Sales
            </Link>
          </div>
        </div>

        {/* Contact info */}
        <div className="grid md:grid-cols-3 gap-8 py-16 border-t border-cyan-500/20">
          <div className="group text-center">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-300 mb-4">
              <FaPhone className="text-2xl text-cyan-400" />
            </div>
            <div className="text-white font-semibold mb-2">Call Us</div>
            <div className="text-cyan-300 text-lg">+44 (7423) 799348</div>
          </div>
          <div className="group text-center">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-300 mb-4">
              <FaEnvelope className="text-2xl text-cyan-400" />
            </div>
            <div className="text-white font-semibold mb-2">Email Us</div>
            <div className="text-cyan-300 text-[17px]">
              expresscargoshippinglogisticss@gmail.com
            </div>
          </div>
          <div className="group text-center">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/40 group-hover:to-blue-500/40 transition-all duration-300 mb-4">
              <FaComments className="text-2xl text-cyan-400" />
            </div>
            <div className="text-white font-semibold mb-2">Live Chat</div>
            <div className="text-cyan-300 text-lg">Available 24/7</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-12 border-t border-cyan-500/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={expLogo}
                  alt="Express Cargo Logo"
                  className="h-10 w-10 object-contain rounded-lg shadow-md"
                />
              </div>
              <p className="text-blue-300 mb-4">
                Your trusted global shipping partner
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-blue-300 text-sm">
                <p>
                  <a
                    href="#services"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Services
                  </a>
                </p>
                <p>
                  <a
                    href="#features"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    About
                  </a>
                </p>
                <p>
                  <a
                    href="#contact"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Contact
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <div className="space-y-2 text-blue-300 text-sm">
                <p>
                  <a href="/" className="hover:text-cyan-400 transition-colors">
                    Home
                  </a>
                </p>
                <p>
                  <a
                    href="/admin"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Admin
                  </a>
                </p>
                <p>
                  <Link
                    to="/track"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Track Shipment
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-cyan-500/20">
            <p className="text-blue-400 text-sm">
              © {new Date().getFullYear()} Express Cargo Shipping Logistics. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default CTA;
