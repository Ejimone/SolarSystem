import { useEffect } from "react";
import { Link } from "wouter";
import { useSolarSystem } from "@/contexts/SolarSystemContext";
import { motion } from "framer-motion";
import PlanetCard from "@/components/ui/PlanetCard";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ExplorePage() {
  const { planets, funFacts, exploreContents, isLoading } = useSolarSystem();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-cosmic-purple rounded-full border-t-transparent"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-orbitron text-star-white text-3xl">Explore the Universe</h1>
        <Link 
          href="/"
          className="text-moon-gray hover:text-star-white transition-colors flex items-center"
        >
          <i className="ri-home-line mr-1"></i> Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <motion.div 
        className="relative mb-12 rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-cosmic-purple/70 to-space-blue/40 backdrop-blur-md border border-cosmic-purple/30 p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="font-orbitron text-star-white text-2xl md:text-4xl mb-4">
              Discover the Wonders of Our Solar System
            </h2>
            <p className="text-moon-gray mb-6 text-lg">
              Embark on a journey through space and time. Learn about planets, stars, galaxies,
              and the fascinating phenomena that shape our universe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/planet/3"
                className="bg-mars-red hover:bg-mars-red/80 text-star-white font-montserrat px-5 py-2 rounded-full transition-colors flex items-center justify-center"
              >
                <i className="ri-planet-line mr-2"></i> Explore Planets
              </Link>
              <Link 
                href="/quiz"
                className="bg-transparent border border-cosmic-purple/50 hover:bg-cosmic-purple/20 text-moon-gray font-montserrat px-5 py-2 rounded-full transition-colors flex items-center justify-center"
              >
                <i className="ri-question-line mr-2"></i> Test Your Knowledge
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Tabs */}
      <Tabs defaultValue="planets" className="mb-12">
        <TabsList className="bg-space-blue/60 border border-cosmic-purple/30 mb-6 w-full justify-start">
          <TabsTrigger value="planets" className="data-[state=active]:bg-cosmic-purple/30 data-[state=active]:text-star-white">
            <i className="ri-planet-line mr-2"></i> Planets
          </TabsTrigger>
          <TabsTrigger value="content" className="data-[state=active]:bg-cosmic-purple/30 data-[state=active]:text-star-white">
            <i className="ri-rocket-line mr-2"></i> Explore More
          </TabsTrigger>
          <TabsTrigger value="facts" className="data-[state=active]:bg-cosmic-purple/30 data-[state=active]:text-star-white">
            <i className="ri-lightbulb-line mr-2"></i> Space Facts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="planets" className="mt-0">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {planets.map((planet) => (
              <motion.div 
                key={planet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PlanetCard planet={planet} />
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="content" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exploreContents.map((content, index) => (
              <motion.div 
                key={content.id}
                className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl overflow-hidden group hover:border-saturn-gold transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={content.image}
                    alt={content.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-montserrat text-star-white text-lg mb-2">{content.title}</h4>
                  <p className="text-moon-gray text-sm mb-3">{content.description}</p>
                  <Link 
                    href={content.link}
                    className="text-saturn-gold hover:text-star-white transition-colors text-sm flex items-center"
                  >
                    Discover more <i className="ri-arrow-right-line ml-1"></i>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-xl p-6">
            <h3 className="font-orbitron text-star-white text-xl mb-4">Beyond Our Solar System</h3>
            <p className="text-moon-gray mb-4">
              The universe is vast and filled with wonders beyond our imagination. From distant galaxies to black holes, there's so much more to explore.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-star-line text-saturn-gold mt-1 mr-2"></i>
                <span className="text-moon-gray">Galaxies contain billions of stars and planetary systems</span>
              </li>
              <li className="flex items-start">
                <i className="ri-star-line text-saturn-gold mt-1 mr-2"></i>
                <span className="text-moon-gray">Black holes are regions where gravity is so strong that nothing can escape</span>
              </li>
              <li className="flex items-start">
                <i className="ri-star-line text-saturn-gold mt-1 mr-2"></i>
                <span className="text-moon-gray">Nebulae are beautiful clouds of gas and dust where stars are born</span>
              </li>
            </ul>
          </div>
        </TabsContent>
        
        <TabsContent value="facts" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {funFacts.map((fact, index) => (
              <motion.div 
                key={fact.id}
                className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-5 hover:border-saturn-gold transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start mb-4">
                  <div className={`w-10 h-10 rounded-full bg-${fact.iconBgColor}/20 flex items-center justify-center mr-3 group-hover:bg-${fact.iconBgColor}/40 transition-colors`}>
                    <i className={`${fact.icon} text-${fact.iconBgColor}`}></i>
                  </div>
                  <h4 className="font-montserrat text-star-white text-lg">{fact.title}</h4>
                </div>
                <p className="text-moon-gray">{fact.description}</p>
              </motion.div>
            ))}
          </div>
          
          <Card className="bg-space-blue/40 border border-cosmic-purple/30">
            <CardHeader>
              <CardTitle className="font-orbitron text-star-white text-xl">More Fascinating Space Facts</CardTitle>
              <CardDescription className="text-moon-gray">
                The universe is full of mind-blowing phenomena
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-montserrat text-star-white text-lg mb-2">The Speed of Light</h4>
                  <p className="text-moon-gray">
                    Light travels at approximately 299,792 kilometers per second (186,282 miles per second). 
                    At this speed, light could circle the Earth almost 7.5 times in just one second!
                  </p>
                </div>
                
                <Separator className="bg-cosmic-purple/30" />
                
                <div>
                  <h4 className="font-montserrat text-star-white text-lg mb-2">The Great Red Spot</h4>
                  <p className="text-moon-gray">
                    Jupiter's Great Red Spot is a massive storm that has been raging for at least 400 years. 
                    It's so large that about three Earths could fit inside it!
                  </p>
                </div>
                
                <Separator className="bg-cosmic-purple/30" />
                
                <div>
                  <h4 className="font-montserrat text-star-white text-lg mb-2">The Coldest Place</h4>
                  <p className="text-moon-gray">
                    The Boomerang Nebula is the coldest known place in the universe, with a temperature of just 
                    1 Kelvin (-272.15°C or -457.87°F), colder than the background temperature of space itself!
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link 
                href="/quiz"
                className="bg-mars-red hover:bg-mars-red/80 text-star-white font-montserrat px-5 py-2 rounded-full transition-colors flex items-center justify-center w-full sm:w-auto"
              >
                <i className="ri-question-line mr-2"></i> Test Your Knowledge
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Educational Resources Section */}
      <section className="mb-12">
        <h2 className="font-orbitron text-star-white text-2xl mb-6">Educational Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-6">
            <h3 className="font-montserrat text-star-white text-xl mb-4 flex items-center">
              <i className="ri-book-open-line text-saturn-gold mr-2"></i> Learning Materials
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-article-line text-moon-gray mt-1 mr-2"></i>
                <div>
                  <h4 className="text-star-white">NASA Space Place</h4>
                  <p className="text-sm text-moon-gray">Interactive games and articles about space for students</p>
                </div>
              </li>
              <li className="flex items-start">
                <i className="ri-video-line text-moon-gray mt-1 mr-2"></i>
                <div>
                  <h4 className="text-star-white">Educational Videos</h4>
                  <p className="text-sm text-moon-gray">Curated videos explaining solar system concepts</p>
                </div>
              </li>
              <li className="flex items-start">
                <i className="ri-file-list-3-line text-moon-gray mt-1 mr-2"></i>
                <div>
                  <h4 className="text-star-white">Printable Worksheets</h4>
                  <p className="text-sm text-moon-gray">Activity sheets to reinforce solar system learning</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-6">
            <h3 className="font-montserrat text-star-white text-xl mb-4 flex items-center">
              <i className="ri-rocket-line text-mars-red mr-2"></i> Space Exploration News
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-calendar-line text-moon-gray mt-1 mr-2"></i>
                <div>
                  <h4 className="text-star-white">Latest Discoveries</h4>
                  <p className="text-sm text-moon-gray">Recent findings and breakthroughs in space exploration</p>
                </div>
              </li>
              <li className="flex items-start">
                <i className="ri-rocket-line text-moon-gray mt-1 mr-2"></i>
                <div>
                  <h4 className="text-star-white">Current Missions</h4>
                  <p className="text-sm text-moon-gray">Updates on ongoing space missions and their discoveries</p>
                </div>
              </li>
              <li className="flex items-start">
                <i className="ri-telescope-line text-moon-gray mt-1 mr-2"></i>
                <div>
                  <h4 className="text-star-white">Observing Opportunities</h4>
                  <p className="text-sm text-moon-gray">Upcoming events for amateur astronomers</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-cosmic-purple/30 to-mars-red/20 border border-cosmic-purple/30 rounded-xl p-6 md:p-8 text-center mb-8">
        <h2 className="font-orbitron text-star-white text-2xl mb-3">Ready for a Cosmic Adventure?</h2>
        <p className="text-moon-gray mb-6 max-w-2xl mx-auto">
          Continue your journey through the solar system! Explore planets, take quizzes, and discover fascinating facts about our cosmic neighborhood.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="bg-mars-red hover:bg-mars-red/80 text-star-white font-montserrat px-5 py-2 rounded-full transition-colors flex items-center justify-center"
          >
            <i className="ri-rocket-line mr-2"></i> Launch Interactive Explorer
          </Link>
          <Link 
            href="/quiz"
            className="bg-transparent border border-cosmic-purple/50 hover:bg-cosmic-purple/20 text-moon-gray font-montserrat px-5 py-2 rounded-full transition-colors flex items-center justify-center"
          >
            <i className="ri-question-line mr-2"></i> Challenge Yourself
          </Link>
        </div>
      </div>
    </main>
  );
}
