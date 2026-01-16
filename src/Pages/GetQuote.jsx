import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShip, FaPlane, FaTruck, FaWarehouse, FaBox, FaWeight, FaMapMarkerAlt, FaCalendarAlt, FaSpinner } from 'react-icons/fa'

const GetQuote = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    origin: '',
    destination: '',
    weight: '',
    dimensions: '',
    shipmentDate: '',
    cargoType: '',
    name: '',
    email: '',
    phone: '',
    company: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const serviceTypes = [
    { id: 'ocean', name: 'Ocean Freight', icon: FaShip, description: 'Cost-effective for large shipments' },
    { id: 'air', name: 'Air Freight', icon: FaPlane, description: 'Fast delivery worldwide' },
    { id: 'land', name: 'Land Transport', icon: FaTruck, description: 'Domestic and cross-border' },
    { id: 'warehouse', name: 'Warehousing', icon: FaWarehouse, description: 'Storage and distribution' }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20">
            <div className="text-6xl mb-6 text-green-400">✓</div>
            <h1 className="text-4xl font-bold text-white mb-6">Quote Request Submitted!</h1>
            <p className="text-xl text-blue-200 mb-8">
              Thank you for your interest! Our team will review your requirements and get back to you within 24 hours with a detailed quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300"
              >
                Back to Home
              </Link>
              <Link 
                to="/track"
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-slate-900 transform hover:scale-105 transition-all duration-300"
              >
                Track Shipment
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/cargo.jpg" 
              alt="Express Cargo Logo" 
              className="h-10 w-10 object-cover rounded-lg shadow-md"
            />
            <div className="text-xl font-bold text-white">
              <span className="text-cyan-400">Express</span> Cargo Shipping Logistics
            </div>
          </Link>
          <Link 
            to="/" 
            className="text-white hover:text-cyan-400 transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Free Quote</span>
          </h1>
          <p className="text-xl text-blue-200">
            Tell us about your shipping needs and we'll provide a customized quote
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Service Type Selection */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Select Service Type</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {serviceTypes.map((service) => {
                const IconComponent = service.icon
                return (
                  <label 
                    key={service.id}
                    className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                      formData.serviceType === service.id 
                        ? 'border-cyan-400 bg-cyan-400/10' 
                        : 'border-white/20 hover:border-cyan-400/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={service.id}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-4">
                      <IconComponent className="text-3xl text-cyan-400" />
                      <div>
                        <div className="text-white font-semibold">{service.name}</div>
                        <div className="text-blue-200 text-sm">{service.description}</div>
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Shipment Details */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Shipment Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Origin
                </label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  <FaWeight className="inline mr-2" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="e.g., 1000"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  <FaBox className="inline mr-2" />
                  Dimensions (L×W×H cm)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="e.g., 100×50×30"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Preferred Ship Date
                </label>
                <input
                  type="date"
                  name="shipmentDate"
                  value={formData.shipmentDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Cargo Type</label>
                <select
                  name="cargoType"
                  value={formData.cargoType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 [&>option]:bg-slate-800 [&>option]:text-white"
                  required
                >
                  <option value="" className="bg-slate-800 text-white">Select cargo type</option>
                  <option value="general" className="bg-slate-800 text-white">General Cargo</option>
                  <option value="hazardous" className="bg-slate-800 text-white">Hazardous Materials</option>
                  <option value="perishable" className="bg-slate-800 text-white">Perishable Goods</option>
                  <option value="fragile" className="bg-slate-800 text-white">Fragile Items</option>
                  <option value="oversized" className="bg-slate-800 text-white">Oversized Cargo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company name (optional)"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:from-cyan-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-3 h-5 w-5" />
                  Processing Quote...
                </span>
              ) : (
                'Get My Free Quote'
              )}
            </button>
            <p className="text-blue-300 text-sm mt-4">
              We'll respond within 24 hours with your customized quote
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GetQuote