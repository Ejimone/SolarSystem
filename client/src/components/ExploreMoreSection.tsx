import { Link } from "wouter";
import { useSolarSystem } from "@/contexts/SolarSystemContext";
import { motion } from "framer-motion";

export default function ExploreMoreSection() {
  const { exploreContents, isLoading } = useSolarSystem();

  if (isLoading) {
    return (
      <section className="mb-8">
        <h3 className="font-orbitron text-star-white text-2xl mb-6">Continue Exploring</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-space-blue/60"></div>
              <div className="p-4">
                <div className="h-6 bg-space-blue/60 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-space-blue/60 rounded w-full mb-2"></div>
                <div className="h-4 bg-space-blue/60 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h3 className="font-orbitron text-star-white text-2xl mb-6">Continue Exploring</h3>
      
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
                href="/explore" 
                className="text-saturn-gold hover:text-star-white transition-colors text-sm flex items-center"
              >
                Discover more <i className="ri-arrow-right-line ml-1"></i>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
