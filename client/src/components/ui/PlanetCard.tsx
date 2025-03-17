import { Link } from "wouter";
import type { Planet } from "@/types";

interface PlanetCardProps {
  planet: Planet;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
  return (
    <div className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl overflow-hidden group hover:border-saturn-gold transition-colors">
      <div className="h-48 relative overflow-hidden flex items-center justify-center bg-space-blue/60">
        <div className="w-32 h-32 rounded-full animate-floating" style={{ backgroundColor: planet.color }}>
          {planet.hasRings && (
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full rotate-12"
              style={{
                width: "120px",
                height: "30px",
                background: planet.ringColor || "#FFC76E",
                opacity: 0.5,
                zIndex: 1
              }}
            ></div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-orbitron text-star-white text-xl mb-2">{planet.name}</h3>
        <p className="text-moon-gray text-sm mb-3 line-clamp-2">{planet.overview.substring(0, 100)}...</p>
        <div className="flex justify-between text-xs text-moon-gray mb-3">
          <span>Moons: {planet.moons}</span>
          <span>{planet.orderFromSun}{getOrdinalSuffix(planet.orderFromSun)} from Sun</span>
        </div>
        <Link 
          href={`/planet/${planet.id}`}
          className="text-saturn-gold hover:text-star-white transition-colors text-sm flex items-center"
        >
          Explore planet <i className="ri-arrow-right-line ml-1"></i>
        </Link>
      </div>
    </div>
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
