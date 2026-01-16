import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import LandingPage from "./LandingPage/LandingPage";
import TrackShipment from "./Pages/TrackShipment";
import GetQuote from "./Pages/GetQuote";
import ContactSales from "./Pages/ContactSales";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import AdminDashboard from "./Pages/AdminDashboard";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/track" element={<TrackShipment />} />
          <Route path="/quote" element={<GetQuote />} />
          <Route path="/contact-sales" element={<ContactSales />} />
          <Route
            path="/about"
            element={
              <div className="min-h-screen bg-gray-50">
                <Navigation />
                <main>
                  <About />
                </main>
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="min-h-screen bg-gray-50">
                <Navigation />
                <main>
                  <Contact />
                </main>
              </div>
            }
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
