import { useState, useEffect } from "react";
import { useSolarSystem } from "@/contexts/SolarSystemContext";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function SolarSystemViewer() {
  const { planets, selectedPlanet, setSelectedPlanet, isLoading } = useSolarSystem();
  const [viewMode, setViewMode] = useState<"2D" | "3D">("3D");

  const toggleViewMode = () => {
    setViewMode(viewMode === "2D" ? "3D" : "2D");
  };

  const handlePlanetSelect = (planet: typeof planets[0]) => {
    setSelectedPlanet(planet);
  };

  // Planet sizes (adjusted to scale)
  const getSizeByPlanetName = (name: string): number => {
    switch (name.toLowerCase()) {
      case "mercury": return 10;
      case "venus": return 18;
      case "earth": return 20;
      case "mars": return 16;
      case "jupiter": return 40;
      case "saturn": return 36;
      case "uranus": return 28;
      case "neptune": return 26;
      default: return 20;
    }
  };

  // Orbit distances (adjusted for visualization)
  const getOrbitByPlanetName = (name: string): number => {
    switch (name.toLowerCase()) {
      case "mercury": return 80;
      case "venus": return 110;
      case "earth": return 140;
      case "mars": return 170;
      case "jupiter": return 220;
      case "saturn": return 270;
      case "uranus": return 310;
      case "neptune": return 350;
      default: return 140;
    }
  };

  // Animation durations (slower for outer planets)
  const getDurationByPlanetName = (name: string): number => {
    switch (name.toLowerCase()) {
      case "mercury": return 30;
      case "venus": return 40;
      case "earth": return 50;
      case "mars": return 60;
      case "jupiter": return 70;
      case "saturn": return 80;
      case "uranus": return 90;
      case "neptune": return 100;
      default: return 50;
    }
  };

  if (isLoading) {
    return (
      <section id="solar-system-viewer" className="relative mb-12 overflow-hidden rounded-xl border border-cosmic-purple/30 backdrop-blur-sm bg-space-blue/40 p-4">
        <div className="h-96 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-cosmic-purple rounded-full border-t-transparent"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="solar-system-viewer" className="relative mb-12 overflow-hidden rounded-xl border border-cosmic-purple/30 backdrop-blur-sm bg-space-blue/40 p-4">
      <div className="absolute top-4 right-4 flex space-x-3 z-10">
        <button 
          className={`p-2 rounded-full transition-colors ${viewMode === "2D" ? "bg-cosmic-purple/50 text-saturn-gold" : "bg-space-blue/70 hover:bg-cosmic-purple/50 text-moon-gray"}`}
          title="2D View"
          onClick={toggleViewMode}
        >
          <i className="ri-layout-grid-line"></i>
        </button>
        <button 
          className={`p-2 rounded-full transition-colors ${viewMode === "3D" ? "bg-cosmic-purple/50 text-saturn-gold" : "bg-space-blue/70 hover:bg-cosmic-purple/50 text-moon-gray"}`}
          title="3D View"
          onClick={toggleViewMode}
        >
          <i className="ri-3d-cube-sphere-line"></i>
        </button>
      </div>
      
      <h3 className="font-orbitron text-star-white text-xl mb-3">Solar System Visualization</h3>
      
      {/* Solar System Interactive Visualization */}
      <motion.div 
        className="solar-system-container h-96 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Sun */}
        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg shadow-yellow-500/50"></div>
        
        {/* Planets */}
        {planets.map((planet) => (
          <div key={planet.id}>
            {/* Orbit */}
            <div 
              className="absolute border border-cosmic-purple/10 rounded-full"
              style={{
                width: `${getOrbitByPlanetName(planet.name) * 2}px`,
                height: `${getOrbitByPlanetName(planet.name) * 2}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
            
            {/* Planet */}
            <div 
              className={`absolute rounded-full transition-all duration-300 cursor-pointer`}
              style={{
                width: `${getSizeByPlanetName(planet.name)}px`,
                height: `${getSizeByPlanetName(planet.name)}px`,
                background: planet.color,
                top: '50%',
                left: '50%',
                transformOrigin: 'center',
                animation: `orbit ${getDurationByPlanetName(planet.name)}s linear infinite`,
                // Custom property for orbit distance
                ['--orbit-distance' as any]: `${getOrbitByPlanetName(planet.name)}px`,
                boxShadow: selectedPlanet?.id === planet.id ? '0 0 10px 2px rgba(247, 203, 69, 0.6)' : 'none',
                zIndex: 5
              }}
              onClick={() => handlePlanetSelect(planet)}
            >
              {/* Saturn's rings */}
              {planet.hasRings && planet.name.toLowerCase() === "saturn" && (
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full rotate-12"
                  style={{
                    width: `${getSizeByPlanetName(planet.name) * 1.8}px`,
                    height: `${getSizeByPlanetName(planet.name) * 0.5}px`,
                    background: planet.ringColor || "#FFC76E",
                    opacity: 0.7,
                    zIndex: -1
                  }}
                ></div>
              )}
            </div>
          </div>
        ))}
      </motion.div>
      
      <div className="flex justify-center mt-4 overflow-x-auto py-2 space-x-3 max-w-full">
        {planets.map((planet) => (
          <button
            key={planet.id}
            className={`min-w-[90px] px-3 py-2 rounded-full text-sm transition-all flex flex-col items-center ${
              selectedPlanet?.id === planet.id
                ? "bg-cosmic-purple/30 border border-cosmic-purple"
                : "bg-space-blue/50 hover:bg-cosmic-purple/30"
            }`}
            onClick={() => handlePlanetSelect(planet)}
          >
            <div
              className="w-6 h-6 rounded-full mb-1 relative"
              style={{ backgroundColor: planet.color }}
            >
              {/* Saturn's rings in the selector */}
              {planet.hasRings && planet.name.toLowerCase() === "saturn" && (
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full rotate-12"
                  style={{
                    width: "32px",
                    height: "8px",
                    background: planet.ringColor || "#FFC76E",
                    opacity: 0.5,
                  }}
                ></div>
              )}
            </div>
            <span>{planet.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
