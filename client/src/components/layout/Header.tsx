import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="bg-space-blue/80 backdrop-blur-md border-b border-cosmic-purple/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <i className="ri-planet-line text-saturn-gold text-3xl mr-2"></i>
            <Link href="/" className="font-orbitron text-star-white text-xl md:text-2xl font-bold">
              Cosmic Explorer
            </Link>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden md:flex items-center bg-space-blue/70 border border-cosmic-purple/50 rounded-full px-3 py-1.5 w-64">
            <i className="ri-search-line text-moon-gray mr-2"></i>
            <input 
              type="text" 
              placeholder="Search planets, moons..." 
              className="bg-transparent border-none focus:outline-none text-moon-gray w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`font-montserrat ${location === "/" ? "text-star-white" : "text-moon-gray hover:text-star-white"} transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/planet/3" 
              className={`font-montserrat ${location.startsWith("/planet") ? "text-star-white" : "text-moon-gray hover:text-star-white"} transition-colors`}
            >
              Explore
            </Link>
            <Link 
              href="/explore" 
              className={`font-montserrat ${location === "/explore" ? "text-star-white" : "text-moon-gray hover:text-star-white"} transition-colors`}
            >
              Learn
            </Link>
            <Link 
              href="/quiz" 
              className={`font-montserrat ${location === "/quiz" ? "text-star-white" : "text-moon-gray hover:text-star-white"} transition-colors`}
            >
              Quiz
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl text-moon-gray" 
            aria-label="Menu"
            onClick={toggleMobileMenu}
          >
            <i className="ri-menu-line"></i>
          </button>
        </div>
        
        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center bg-space-blue/70 border border-cosmic-purple/50 rounded-full px-3 py-1.5">
            <i className="ri-search-line text-moon-gray mr-2"></i>
            <input 
              type="text" 
              placeholder="Search planets, moons..." 
              className="bg-transparent border-none focus:outline-none text-moon-gray w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden bg-space-blue/95 backdrop-blur-md fixed inset-0 z-40 pt-20`}>
        <nav className="container mx-auto px-6 py-4 flex flex-col space-y-6">
          <Link 
            href="/" 
            className="font-montserrat text-xl text-star-white border-b border-cosmic-purple/30 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/planet/3" 
            className="font-montserrat text-xl text-moon-gray border-b border-cosmic-purple/30 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore
          </Link>
          <Link 
            href="/explore" 
            className="font-montserrat text-xl text-moon-gray border-b border-cosmic-purple/30 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Learn
          </Link>
          <Link 
            href="/quiz" 
            className="font-montserrat text-xl text-moon-gray border-b border-cosmic-purple/30 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Quiz
          </Link>
        </nav>
      </div>
    </>
  );
}
