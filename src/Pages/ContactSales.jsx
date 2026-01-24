import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPhone,
  FaEnvelope,
  FaComments,
  FaMapMarkerAlt,
  FaClock,
  FaSpinner,
  FaUser,
  FaBuilding,
} from "react-icons/fa";
import expLogo from "../asset/expLogo.png";

const ContactSales = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    preferredContact: "email",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://express-cargo-backend.onrender.com/api/contact/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        preferredContact: "email",
      });
    } catch (error) {
      setIsSubmitting(false);
      setIsSubmitted(false);
      alert("Error sending message. Please try again.");
      console.error("Error:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <div className="text-6xl mb-6 text-green-400">✓</div>
            <h1 className="text-4xl font-bold text-white mb-6">
              Message Sent Successfully!
            </h1>
            <p className="text-xl text-blue-200 mb-8">
              Thank you for contacting our sales team! We'll get back to you
              within 2 hours during business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
              >
                Back to Home
              </Link>
              <Link
                to="/quote"
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-slate-900 transform hover:scale-105 transition-all duration-300"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="p-6 bg-white backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src={expLogo}
              alt="Express Cargo Logo"
              className="h-10 w-10 object-contain rounded-lg shadow-md"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 leading-tight">
                Express Cargo
              </span>
              <span className="text-xs text-gray-600 leading-tight">
                Shipping Logistics
              </span>
            </div>
          </Link>
          <Link
            to="/"
            className="text-gray-700 hover:text-cyan-400 transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 md:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 lg:mb-6 px-2">
            Contact Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Sales Team
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200 px-2">
            Ready to discuss your shipping needs? Our experts are here to help
            you find the perfect solution.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 xl:gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm md:text-base">
                    <FaUser className="inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm md:text-base">
                    <FaBuilding className="inline mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Company name"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm md:text-base">
                    <FaEnvelope className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2 text-sm md:text-base">
                    <FaPhone className="inline mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm md:text-base">
                  Preferred Contact Method
                </label>
                <div className="flex flex-col xs:flex-row gap-3 xs:gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === "email"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-2 shrink-0 ${
                        formData.preferredContact === "email"
                          ? "border-cyan-400 bg-cyan-400"
                          : "border-white/40"
                      }`}
                    ></div>
                    <span className="text-white text-sm md:text-base">
                      Email
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === "phone"}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 mr-2 shrink-0 ${
                        formData.preferredContact === "phone"
                          ? "border-cyan-400 bg-cyan-400"
                          : "border-white/40"
                      }`}
                    ></div>
                    <span className="text-white text-sm md:text-base">
                      Phone
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2 text-sm md:text-base">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your shipping needs, volume, destinations, or any specific requirements..."
                  rows="4"
                  className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none text-sm md:text-base"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base md:text-lg rounded-xl hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-3 h-4 w-4 md:h-5 md:w-5" />
                    Sending Message...
                  </span>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            {/* Direct Contact */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                Get in Touch Directly
              </h3>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="text-lg md:text-xl lg:text-2xl text-cyan-400 mt-1 shrink-0">
                    <FaPhone />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold mb-1 text-sm md:text-base">
                      Sales Hotline
                    </h4>
                    <p className="text-cyan-400 text-sm md:text-base lg:text-lg font-semibold break-all">
                      +44 (7423) 799348
                    </p>
                    <p className="text-blue-200 text-xs md:text-sm">
                      Available 24/7 for urgent inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="text-lg md:text-xl lg:text-2xl text-cyan-400 mt-1 shrink-0">
                    <FaEnvelope />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold mb-1 text-sm md:text-base">
                      Sales Email
                    </h4>
                    <p className="text-cyan-400 text-xs sm:text-sm md:text-base lg:text-lg font-semibold break-all">
                      expresscargoshippinglogisticss@gmail.com
                    </p>
                    <p className="text-blue-200 text-xs md:text-sm">
                      Response within 2 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 md:space-x-4">
                  <div className="text-lg md:text-xl lg:text-2xl text-cyan-400 mt-1 shrink-0">
                    <FaComments />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-semibold mb-1 text-sm md:text-base">
                      Live Chat
                    </h4>
                    <p className="text-cyan-400 text-sm md:text-base lg:text-lg font-semibold">
                      Available on website
                    </p>
                    <p className="text-blue-200 text-xs md:text-sm">
                      Instant support during business hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                <FaClock className="inline mr-3 text-cyan-400" />
                Business Hours
              </h3>

              <div className="space-y-2 md:space-y-3">
                <div className="flex flex-col xs:flex-row xs:justify-between gap-1 xs:gap-2">
                  <span className="text-blue-200 text-xs sm:text-sm md:text-base">
                    Monday - Friday
                  </span>
                  <span className="text-white font-semibold text-xs sm:text-sm md:text-base">
                    8:00 AM - 8:00 PM EST
                  </span>
                </div>
                <div className="flex flex-col xs:flex-row xs:justify-between gap-1 xs:gap-2">
                  <span className="text-blue-200 text-xs sm:text-sm md:text-base">
                    Saturday
                  </span>
                  <span className="text-white font-semibold text-xs sm:text-sm md:text-base">
                    9:00 AM - 5:00 PM EST
                  </span>
                </div>
                <div className="flex flex-col xs:flex-row xs:justify-between gap-1 xs:gap-2">
                  <span className="text-blue-200 text-xs sm:text-sm md:text-base">
                    Sunday
                  </span>
                  <span className="text-white font-semibold text-xs sm:text-sm md:text-base">
                    Emergency Only
                  </span>
                </div>
              </div>

              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-cyan-400/10 rounded-lg border border-cyan-400/20">
                <p className="text-cyan-300 text-xs md:text-sm">
                  <strong>24/7 Emergency Support:</strong> For urgent shipments
                  and time-sensitive cargo, our emergency hotline is always
                  available.
                </p>
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                <FaMapMarkerAlt className="inline mr-3 text-cyan-400" />
                Headquarters
              </h3>

              <div className="text-blue-200 leading-relaxed text-sm md:text-base">
                <p className="font-semibold text-white mb-2 text-sm md:text-base">
                  Express Cargo Shipping Logistics
                </p>
                <p>1234 Harbor Drive, Suite 500</p>
                <p>Miami, FL 33101</p>
                <p>United States</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSales;
