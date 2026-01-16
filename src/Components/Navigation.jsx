import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex space-x-6">
        <Link 
          to="/" 
          className="text-white hover:text-blue-300 transition-colors"
        >
          Home
        </Link>
        <Link 
          to="/about" 
          className="text-white hover:text-blue-300 transition-colors"
        >
          About
        </Link>
        <Link 
          to="/contact" 
          className="text-white hover:text-blue-300 transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  )
}

export default Navigation