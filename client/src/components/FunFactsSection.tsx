import { useSolarSystem } from "@/contexts/SolarSystemContext";
import { motion } from "framer-motion";

export default function FunFactsSection() {
  const { funFacts, isLoading } = useSolarSystem();

  if (isLoading) {
    return (
      <section className="mb-12">
        <h3 className="font-orbitron text-star-white text-2xl mb-6">Amazing Space Facts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-5 h-40 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h3 className="font-orbitron text-star-white text-2xl mb-6">Amazing Space Facts</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </section>
  );
}
