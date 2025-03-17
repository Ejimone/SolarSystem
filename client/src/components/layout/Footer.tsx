import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-space-blue/80 backdrop-blur-md border-t border-cosmic-purple/30 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="ri-planet-line text-saturn-gold text-3xl mr-2"></i>
              <h1 className="font-orbitron text-star-white text-xl font-bold">Cosmic Explorer</h1>
            </div>
            <p className="text-moon-gray text-sm mb-4">
              Embark on an educational journey through our Solar System. Discover the wonders of space in an engaging, interactive experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-moon-gray hover:text-star-white transition-colors">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-moon-gray hover:text-star-white transition-colors">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-moon-gray hover:text-star-white transition-colors">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-moon-gray hover:text-star-white transition-colors">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-montserrat text-star-white text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-moon-gray hover:text-star-white transition-colors">
                  Solar System
                </Link>
              </li>
              <li>
                <Link href="/planet/3" className="text-moon-gray hover:text-star-white transition-colors">
                  Planets
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-moon-gray hover:text-star-white transition-colors">
                  Moons
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-moon-gray hover:text-star-white transition-colors">
                  Asteroids & Comets
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-moon-gray hover:text-star-white transition-colors">
                  Sun & Stars
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat text-star-white text-lg mb-4">Learn</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-moon-gray hover:text-star-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-moon-gray hover:text-star-white transition-colors">
                  Quizzes
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-moon-gray hover:text-star-white transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-moon-gray hover:text-star-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-moon-gray hover:text-star-white transition-colors">
                  Educational Tools
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-montserrat text-star-white text-lg mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-moon-gray hover:text-star-white transition-colors">Our Mission</a></li>
              <li><a href="#" className="text-moon-gray hover:text-star-white transition-colors">Team</a></li>
              <li><a href="#" className="text-moon-gray hover:text-star-white transition-colors">Partners</a></li>
              <li><a href="#" className="text-moon-gray hover:text-star-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-moon-gray hover:text-star-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-cosmic-purple/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-moon-gray text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Cosmic Explorer. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-moon-gray hover:text-star-white transition-colors text-sm">Terms</a>
            <a href="#" className="text-moon-gray hover:text-star-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-moon-gray hover:text-star-white transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
