import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import expLogo from "../asset/expLogo.png";

const Hero = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Carousel images
  const carouselImages = [
    {
      src: "/download.jpeg",
      alt: "Cargo shipping containers at port",
      title: "Global Shipping Solutions",
    },
    {
      src: "/download (1).jpeg",
      alt: "International freight forwarding",
      title: "Reliable Freight Services",
    },
    {
      src: "/download (2).jpeg",
      alt: "Modern cargo logistics",
      title: "Advanced Logistics Network",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const nextImage = () => {
    setCurrentImageIndex(
      currentImageIndex === carouselImages.length - 1
        ? 0
        : currentImageIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0
        ? carouselImages.length - 1
        : currentImageIndex - 1,
    );
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;

    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://express-cargo-backend.onrender.com/api/tracking/${trackingNumber.toUpperCase()}`,
      );
      setTrackingResult(response.data.data);
      toast.success("Shipment found!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      setTrackingResult("not_found");
      toast.error("Tracking number not found", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-400";
      case "In Transit":
        return "text-blue-400";
      case "Out for Delivery":
        return "text-yellow-400";
      case "Pending":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Premium Gradient Background with Mesh */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-950/30 to-slate-900"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* Full-width Image Carousel Background */}
      <div className="absolute inset-0 w-full h-full opacity-40">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover object-center carousel-image"
              style={{
                imageRendering: "crisp-edges",
                filter: "contrast(1.1) brightness(0.8) saturate(1.2)",
              }}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        {/* Carousel Navigation - Hidden on Mobile */}
        <button
          onClick={prevImage}
          className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous image"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextImage}
          className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next image"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Animated background elements (now subtle overlays) */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-3">
            <img
              src={expLogo}
              alt="Express Cargo Logo"
              className="h-12 w-12 object-contain rounded-lg shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 leading-tight">
                Express Cargo
              </span>
              <span className="text-xs text-gray-600 leading-tight">
                Shipping Logistics
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium"
            >
              Home
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium"
            >
              Services
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium"
            >
              Contact
            </a>
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-300">
              <Link
                to="/track"
                className="text-cyan-600 hover:text-cyan-700 font-medium px-4 py-2 border border-cyan-600 rounded-lg hover:bg-cyan-50 transition-all duration-300"
              >
                Track
              </Link>
              <Link
                to="/quote"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/50"
              >
                Get Quote
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-cyan-600 focus:outline-none transition-colors duration-300"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-6 py-4 space-y-3">
              <a
                href="#home"
                className="block text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="block text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#features"
                className="block text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="block text-gray-700 hover:text-cyan-600 transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="pt-3 border-t border-gray-200 space-y-3">
                <Link
                  to="/track"
                  className="block text-center text-cyan-600 hover:text-cyan-700 font-medium px-4 py-2 border border-cyan-600 rounded-md hover:bg-cyan-50 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Track Shipment
                </Link>
                <Link
                  to="/quote"
                  className="block text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium px-4 py-2 rounded-md hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto pt-24 md:pt-20">
        <h1 className="text-4xl md:text-8xl font-bold text-white mb-6 animate-slide-up">
          Express{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Cargo
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Shipping Logistics
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto animate-slide-up-delay leading-relaxed">
          Fast, reliable, and secure cargo shipping solutions across the globe.
          Your trusted partner for international freight forwarding.
        </p>

        {/* Tracking Form - Always Visible */}
        <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Enter tracking number (try: ECSL123456789)"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 backdrop-blur-sm"
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
              <button
                onClick={handleTrack}
                disabled={isLoading || !trackingNumber.trim()}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Tracking...
                  </span>
                ) : (
                  "Track"
                )}
              </button>
            </div>

            {/* Tracking Results */}
            {trackingResult && (
              <div className="mt-6">
                {trackingResult === "not_found" ? (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2 text-cyan-400">
                      <FaBox className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Tracking Number Not Found
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Please check your tracking number and try again.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Status Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {trackingNumber.toUpperCase()}
                        </h3>
                        <p
                          className={`text-lg font-semibold ${getStatusColor(
                            trackingResult.status,
                          )}`}
                        >
                          {trackingResult.status}
                        </p>
                        <p className="text-blue-100 text-sm">
                          {trackingResult.location}
                        </p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <p className="text-blue-100 text-sm">Est. Delivery</p>
                        <p className="text-lg font-bold text-white">
                          {trackingResult.estimatedDelivery}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-blue-100 mb-2">
                        <span>Progress</span>
                        <span>{trackingResult.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${trackingResult.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Latest Status */}
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <h4 className="text-white font-semibold mb-2">
                        Latest Update
                      </h4>
                      {trackingResult.events &&
                        trackingResult.events
                          .filter((event) => event.completed)
                          .slice(-1)
                          .map((event, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center"
                            >
                              <div>
                                <p className="text-white font-medium">
                                  {event.status}
                                </p>
                                <p className="text-blue-100 text-sm">
                                  {event.location}
                                </p>
                              </div>
                              <p className="text-blue-200 text-sm">
                                {event.date}
                              </p>
                            </div>
                          ))}
                    </div>

                    {/* Link to full tracking */}
                    <div className="text-center">
                      <Link
                        to={`/track?number=${trackingNumber.toUpperCase()}`}
                        className="text-cyan-300 hover:text-cyan-200 text-sm underline"
                      >
                        View detailed tracking timeline →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating ship animation - adjusted for image background */}
      <div className="absolute bottom-20 right-10 animate-float z-20">
        <div className="w-24 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg transform rotate-12 shadow-2xl">
          <div className="w-8 h-8 bg-white rounded-full absolute -top-2 left-2"></div>
          <div className="w-4 h-12 bg-cyan-300 absolute -top-6 left-8"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
