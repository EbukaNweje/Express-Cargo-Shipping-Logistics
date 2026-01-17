import Hero from "./Hero";
import Services from "./Services";
import Stats from "./Stats";
import Features from "./Features";
import CTA from "./CTA";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Stats />
      <Services />
      <Features />
      <CTA />
    </div>
  );
};

export default LandingPage;
