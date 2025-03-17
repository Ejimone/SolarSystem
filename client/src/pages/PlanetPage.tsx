import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { useSolarSystem } from "@/contexts/SolarSystemContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Planet from "@/components/three/Planet";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function PlanetPage() {
  const { id } = useParams<{ id: string }>();
  const planetId = parseInt(id);
  const { planets, setSelectedPlanet, isLoading } = useSolarSystem();
  
  const planet = planets.find(p => p.id === planetId);
  
  useEffect(() => {
    if (planet) {
      setSelectedPlanet(planet);
    }
  }, [planet, setSelectedPlanet]);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-9 w-24" />
        </div>
        <Skeleton className="h-[500px] w-full rounded-xl mb-8" />
      </main>
    );
  }
  
  if (!planet) {
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="bg-mars-red/20 border border-mars-red rounded-lg p-4 mb-8">
          <h2 className="text-mars-red font-bold text-lg mb-2">Planet Not Found</h2>
          <p className="text-moon-gray">The planet you're looking for doesn't exist in our solar system.</p>
          <Link href="/">
            <a className="inline-block mt-4 bg-cosmic-purple hover:bg-cosmic-purple/80 text-star-white font-montserrat px-4 py-2 rounded-full transition-colors">
              Return to Solar System
            </a>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <a className="text-moon-gray hover:text-star-white transition-colors flex items-center">
            <i className="ri-arrow-left-line mr-1"></i> Back to Solar System
          </a>
        </Link>
        
        <div className="flex space-x-2">
          <Link href={planetId > 1 ? `/planet/${planetId - 1}` : `/planet/${planets.length}`}>
            <Button variant="outline" size="sm" className="text-moon-gray">
              <i className="ri-arrow-left-s-line mr-1"></i> Previous
            </Button>
          </Link>
          <Link href={planetId < planets.length ? `/planet/${planetId + 1}` : "/planet/1"}>
            <Button variant="outline" size="sm" className="text-moon-gray">
              Next <i className="ri-arrow-right-s-line ml-1"></i>
            </Button>
          </Link>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lg:col-span-1">
          <div className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-6 mb-6">
            <h1 className="font-orbitron text-star-white text-3xl mb-2">{planet.name}</h1>
            <p className="text-moon-gray text-sm mb-6">{planet.orderFromSun}{getOrdinalSuffix(planet.orderFromSun)} planet from the Sun</p>
            
            <div className="flex justify-center mb-6">
              <Planet planet={planet} size={200} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Diameter</p>
                <p className="text-lg text-star-white font-medium">{planet.diameter.toLocaleString()} km</p>
              </div>
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Temperature</p>
                <p className="text-lg text-star-white font-medium">{planet.temperature}°C</p>
              </div>
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Day Length</p>
                <p className="text-lg text-star-white font-medium">{planet.dayLength}</p>
              </div>
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Year Length</p>
                <p className="text-lg text-star-white font-medium">{planet.yearLength}</p>
              </div>
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Moons</p>
                <p className="text-lg text-star-white font-medium">{planet.moons}</p>
              </div>
              <div className="bg-space-blue/60 rounded-lg p-3">
                <p className="text-xs text-moon-gray">Distance From Sun</p>
                <p className="text-lg text-star-white font-medium">{(planet.distanceFromSun / 1000000).toFixed(1)} mil km</p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Link href="/quiz">
                <a className="bg-mars-red hover:bg-mars-red/80 text-star-white font-montserrat px-5 py-2 rounded-full text-sm transition-colors flex items-center">
                  <i className="ri-question-line mr-1"></i> Take Quiz
                </a>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl overflow-hidden">
            <Tabs defaultValue="overview">
              <TabsList className="w-full border-b border-cosmic-purple/30 bg-space-blue/60">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="composition" className="flex-1">Composition</TabsTrigger>
                <TabsTrigger value="exploration" className="flex-1">Exploration</TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="overview" className="mt-0">
                  <div className="prose prose-invert max-w-none">
                    <p className="mb-4">{planet.overview}</p>
                    
                    <h3 className="font-orbitron text-star-white text-xl mt-6 mb-3">Key Features</h3>
                    <ul className="space-y-4">
                      {planet.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-cosmic-purple/20 flex items-center justify-center mr-3 shrink-0">
                            <i className={`${feature.icon} text-cosmic-purple`}></i>
                          </div>
                          <div>
                            <h4 className="font-montserrat text-star-white text-lg mb-1">{feature.title}</h4>
                            <p className="text-moon-gray">{feature.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="composition" className="mt-0">
                  <div className="prose prose-invert max-w-none">
                    <p>{planet.composition}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="exploration" className="mt-0">
                  <div className="prose prose-invert max-w-none">
                    <p>{planet.exploration}</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </motion.div>
      
      <h3 className="font-orbitron text-star-white text-2xl mb-6">Other Planets</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {planets
          .filter(p => p.id !== planetId)
          .slice(0, 4)
          .map(p => (
            <Link key={p.id} href={`/planet/${p.id}`}>
              <a className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-4 hover:border-saturn-gold transition-colors group">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full mr-3" style={{ backgroundColor: p.color }}></div>
                  <h4 className="font-montserrat text-star-white group-hover:text-saturn-gold transition-colors">{p.name}</h4>
                </div>
                <p className="text-moon-gray text-sm line-clamp-2">{p.overview.substring(0, 80)}...</p>
              </a>
            </Link>
          ))}
      </div>
    </main>
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
