import Hero from './Hero'
import Services from './Services'
import Stats from './Stats'
import Features from './Features'
import CTA from './CTA'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* White Stats Section */}
      <div className="bg-white py-20">
        <Stats />
      </div>
      
      {/* Blue Services Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <Services />
      </div>
      
      {/* White Features Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Features />
        </div>
      </div>
      
      {/* Blue CTA Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <CTA />
      </div>
    </div>
  )
}

export default LandingPage