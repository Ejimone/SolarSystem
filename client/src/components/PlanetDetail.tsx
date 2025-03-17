import { useState } from "react";
import { Link } from "wouter";
import { useSolarSystem } from "@/contexts/SolarSystemContext";
import { motion } from "framer-motion";

type TabType = "overview" | "composition" | "exploration";

export default function PlanetDetail() {
  const { selectedPlanet } = useSolarSystem();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  if (!selectedPlanet) {
    return (
      <section className="mb-12">
        <div className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-6 flex flex-col items-center justify-center h-64">
          <p className="text-moon-gray">Select a planet to view details</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Planet Visualization Side */}
        <div className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-6 flex flex-col items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 relative mb-6 animate-floating">
            <img 
              src={selectedPlanet.image}
              alt={selectedPlanet.name} 
              className="w-full h-full object-contain rounded-full animate-planet-rotate"
            />
            
            {/* Show moon for Earth */}
            {selectedPlanet.name === "Earth" && (
              <div 
                className="absolute w-10 h-10 rounded-full bg-gray-300" 
                style={{
                  top: "50%", 
                  left: "50%", 
                  transformOrigin: "0 0",
                  animation: "orbit 10s linear infinite"
                }}
              ></div>
            )}
            
            {/* Show rings for planets with rings */}
            {selectedPlanet.hasRings && (
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full rotate-12"
                style={{
                  width: "300px",
                  height: "60px",
                  background: selectedPlanet.ringColor || "#FFC76E",
                  opacity: 0.3,
                  zIndex: -1
                }}
              ></div>
            )}
          </div>
          
          <div className="text-center">
            <h2 className="font-orbitron text-star-white text-3xl mb-2">{selectedPlanet.name}</h2>
            <p className="text-moon-gray text-sm mb-4">{selectedPlanet.orderFromSun}{getOrdinalSuffix(selectedPlanet.orderFromSun)} planet from the Sun</p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Diameter</p>
                <p className="text-lg text-star-white font-medium">{selectedPlanet.diameter.toLocaleString()} km</p>
              </div>
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Day Length</p>
                <p className="text-lg text-star-white font-medium">{selectedPlanet.dayLength}</p>
              </div>
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Year Length</p>
                <p className="text-lg text-star-white font-medium">{selectedPlanet.yearLength}</p>
              </div>
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Moons</p>
                <p className="text-lg text-star-white font-medium">{selectedPlanet.moons}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Planet Information Side */}
        <div className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl overflow-hidden">
          <div className="border-b border-cosmic-purple/30">
            <div className="flex">
              <button 
                className={`flex-1 py-3 px-4 font-montserrat ${
                  activeTab === "overview" 
                    ? "text-star-white bg-cosmic-purple/30 border-b-2 border-saturn-gold" 
                    : "text-moon-gray hover:text-star-white transition-colors"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button 
                className={`flex-1 py-3 px-4 font-montserrat ${
                  activeTab === "composition" 
                    ? "text-star-white bg-cosmic-purple/30 border-b-2 border-saturn-gold" 
                    : "text-moon-gray hover:text-star-white transition-colors"
                }`}
                onClick={() => setActiveTab("composition")}
              >
                Composition
              </button>
              <button 
                className={`flex-1 py-3 px-4 font-montserrat ${
                  activeTab === "exploration" 
                    ? "text-star-white bg-cosmic-purple/30 border-b-2 border-saturn-gold" 
                    : "text-moon-gray hover:text-star-white transition-colors"
                }`}
                onClick={() => setActiveTab("exploration")}
              >
                Exploration
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              {activeTab === "overview" && (
                <>
                  <p className="mb-4">{selectedPlanet.overview}</p>
                  
                  <h4 className="font-orbitron text-star-white text-lg mt-6 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedPlanet.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className={`${feature.icon} text-blue-400 mt-1 mr-2`}></i>
                        <span>{feature.description}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              
              {activeTab === "composition" && (
                <p className="mb-4">{selectedPlanet.composition}</p>
              )}
              
              {activeTab === "exploration" && (
                <p className="mb-4">{selectedPlanet.exploration}</p>
              )}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row">
              <Link 
                href="/quiz"
                className="bg-mars-red hover:bg-mars-red/80 text-star-white font-montserrat px-4 py-1.5 rounded-full text-sm transition-colors mr-0 mb-3 sm:mb-0 sm:mr-3 text-center sm:text-left"
              >
                <i className="ri-question-line mr-1"></i> Take {selectedPlanet.name} Quiz
              </Link>
              <Link 
                href={`/planet/${selectedPlanet.id}`}
                className="bg-transparent border border-cosmic-purple hover:bg-cosmic-purple/20 text-moon-gray font-montserrat px-4 py-1.5 rounded-full text-sm transition-colors text-center sm:text-left"
              >
                <i className="ri-arrow-right-line mr-1"></i> Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// Helper function to get ordinal suffix
function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}
