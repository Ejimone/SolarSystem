import { Link } from "wouter";
import { motion } from "framer-motion";

export default function IntroSection() {
  const startExploring = () => {
    // Scroll to solar system viewer
    document.getElementById("solar-system-viewer")?.scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <section className="mb-10 text-center">
      <motion.h2 
        className="font-orbitron text-star-white text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Our Solar System
      </motion.h2>
      
      <motion.p 
        className="text-moon-gray max-w-2xl mx-auto mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Embark on a cosmic journey through our solar system. Discover the planets, dwarf planets, moons and other celestial bodies that orbit our Sun.
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button 
          className="bg-mars-red hover:bg-mars-red/80 text-star-white font-montserrat px-5 py-2 rounded-full transition-colors flex items-center justify-center"
          onClick={startExploring}
        >
          <i className="ri-rocket-line mr-2"></i> Start Exploring
        </button>
        
        <Link 
          href="/explore" 
          className="bg-transparent border border-cosmic-purple hover:bg-cosmic-purple/20 text-moon-gray font-montserrat px-5 py-2 rounded-full transition-colors flex items-center justify-center"
        >
          <i className="ri-play-circle-line mr-2"></i> Watch Intro
        </Link>
      </motion.div>
    </section>
  );
}
