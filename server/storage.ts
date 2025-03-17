import { 
  users, type User, type InsertUser,
  planets, type Planet, type InsertPlanet,
  quizQuestions, type QuizQuestion, type InsertQuizQuestion,
  funFacts, type FunFact, type InsertFunFact,
  exploreContents, type ExploreContent, type InsertExploreContent
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods (from original schema)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Planet methods
  getAllPlanets(): Promise<Planet[]>;
  getPlanet(id: number): Promise<Planet | undefined>;
  getPlanetByName(name: string): Promise<Planet | undefined>;
  createPlanet(planet: InsertPlanet): Promise<Planet>;
  
  // Quiz methods
  getAllQuizQuestions(): Promise<QuizQuestion[]>;
  getQuizQuestion(id: number): Promise<QuizQuestion | undefined>;
  createQuizQuestion(question: InsertQuizQuestion): Promise<QuizQuestion>;
  
  // Fun fact methods
  getAllFunFacts(): Promise<FunFact[]>;
  getFunFact(id: number): Promise<FunFact | undefined>;
  createFunFact(fact: InsertFunFact): Promise<FunFact>;
  
  // Explore content methods
  getAllExploreContents(): Promise<ExploreContent[]>;
  getExploreContent(id: number): Promise<ExploreContent | undefined>;
  createExploreContent(content: InsertExploreContent): Promise<ExploreContent>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private planets: Map<number, Planet>;
  private quizQuestions: Map<number, QuizQuestion>;
  private funFacts: Map<number, FunFact>;
  private exploreContents: Map<number, ExploreContent>;
  
  private userCurrentId: number;
  private planetCurrentId: number;
  private quizQuestionCurrentId: number;
  private funFactCurrentId: number;
  private exploreContentCurrentId: number;

  constructor() {
    this.users = new Map();
    this.planets = new Map();
    this.quizQuestions = new Map();
    this.funFacts = new Map();
    this.exploreContents = new Map();
    
    this.userCurrentId = 1;
    this.planetCurrentId = 1;
    this.quizQuestionCurrentId = 1;
    this.funFactCurrentId = 1;
    this.exploreContentCurrentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Planet methods
  async getAllPlanets(): Promise<Planet[]> {
    return Array.from(this.planets.values()).sort((a, b) => a.orderFromSun - b.orderFromSun);
  }
  
  async getPlanet(id: number): Promise<Planet | undefined> {
    return this.planets.get(id);
  }
  
  async getPlanetByName(name: string): Promise<Planet | undefined> {
    return Array.from(this.planets.values()).find(
      (planet) => planet.name.toLowerCase() === name.toLowerCase(),
    );
  }
  
  async createPlanet(insertPlanet: InsertPlanet): Promise<Planet> {
    const id = this.planetCurrentId++;
    const planet: Planet = { ...insertPlanet, id };
    this.planets.set(id, planet);
    return planet;
  }
  
  // Quiz methods
  async getAllQuizQuestions(): Promise<QuizQuestion[]> {
    return Array.from(this.quizQuestions.values());
  }
  
  async getQuizQuestion(id: number): Promise<QuizQuestion | undefined> {
    return this.quizQuestions.get(id);
  }
  
  async createQuizQuestion(insertQuestion: InsertQuizQuestion): Promise<QuizQuestion> {
    const id = this.quizQuestionCurrentId++;
    const question: QuizQuestion = { ...insertQuestion, id };
    this.quizQuestions.set(id, question);
    return question;
  }
  
  // Fun fact methods
  async getAllFunFacts(): Promise<FunFact[]> {
    return Array.from(this.funFacts.values());
  }
  
  async getFunFact(id: number): Promise<FunFact | undefined> {
    return this.funFacts.get(id);
  }
  
  async createFunFact(insertFact: InsertFunFact): Promise<FunFact> {
    const id = this.funFactCurrentId++;
    const fact: FunFact = { ...insertFact, id };
    this.funFacts.set(id, fact);
    return fact;
  }
  
  // Explore content methods
  async getAllExploreContents(): Promise<ExploreContent[]> {
    return Array.from(this.exploreContents.values());
  }
  
  async getExploreContent(id: number): Promise<ExploreContent | undefined> {
    return this.exploreContents.get(id);
  }
  
  async createExploreContent(insertContent: InsertExploreContent): Promise<ExploreContent> {
    const id = this.exploreContentCurrentId++;
    const content: ExploreContent = { ...insertContent, id };
    this.exploreContents.set(id, content);
    return content;
  }
  
  private initializeSampleData() {
    // Planets
    const planets: InsertPlanet[] = [
      {
        name: "Mercury",
        overview: "Mercury is the smallest and innermost planet in the Solar System. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets.",
        composition: "Mercury appears to have a solid silicate crust and mantle overlying a solid, iron sulfide outer core layer, a deeper liquid core layer, and a solid inner core.",
        exploration: "The first spacecraft to visit Mercury was NASA's Mariner 10 in 1974–75. The second was the MESSENGER spacecraft, which mapped the planet after 2011.",
        diameter: 4879,
        dayLength: "58.6 Earth days",
        yearLength: "88 Earth days",
        moons: 0,
        distanceFromSun: 57909000,
        temperature: 167,
        color: "#A9A9A9",
        hasRings: false,
        orderFromSun: 1,
        features: [
          { icon: "ri-fire-line", title: "Extreme Temperatures", description: "Mercury experiences extreme temperature variations, from 430°C during the day to -180°C at night." },
          { icon: "ri-earth-line", title: "Cratered Surface", description: "Mercury's surface is heavily cratered, similar to the Moon, due to impacts from asteroids and comets." },
          { icon: "ri-compass-3-line", title: "Magnetic Field", description: "Despite its small size, Mercury has a magnetic field, though it's much weaker than Earth's." }
        ],
        image: "https://science.nasa.gov/wp-content/uploads/2023/05/mercury-messenger-globe-full.jpg"
      },
      {
        name: "Venus",
        overview: "Venus is the second planet from the Sun and is often called Earth's sister planet due to their similar size and mass. It's the hottest planet in our solar system.",
        composition: "Venus has a thick atmosphere consisting mainly of carbon dioxide, with clouds of sulfuric acid. Its surface is a dry desert with many active volcanoes.",
        exploration: "More than 40 spacecraft have explored Venus, including NASA's Magellan, which mapped the planet's surface with radar, and more recently, Japan's Akatsuki.",
        diameter: 12104,
        dayLength: "243 Earth days",
        yearLength: "225 Earth days",
        moons: 0,
        distanceFromSun: 108200000,
        temperature: 464,
        color: "#E8A23D",
        hasRings: false,
        orderFromSun: 2,
        features: [
          { icon: "ri-tornado-line", title: "Toxic Atmosphere", description: "Venus has a thick, toxic atmosphere filled with carbon dioxide and sulfuric acid clouds." },
          { icon: "ri-fire-line", title: "Extreme Heat", description: "With temperatures reaching 464°C, Venus is the hottest planet in our solar system." },
          { icon: "ri-arrow-go-back-line", title: "Retrograde Rotation", description: "Venus rotates in the opposite direction to most planets, a phenomenon called retrograde rotation." }
        ],
        image: "https://science.nasa.gov/wp-content/uploads/2023/05/venus-magellan-colorized-hemisphere.jpg"
      },
      {
        name: "Earth",
        overview: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. According to radiometric dating estimation, Earth formed over 4.5 billion years ago.",
        composition: "Earth's interior is divided into layers including the inner core, outer core, mantle, and crust. The planet is mostly covered by water (71%) and has a nitrogen-oxygen atmosphere.",
        exploration: "Earth is continuously explored through various means including satellites, deep-sea expeditions, and polar research stations.",
        diameter: 12742,
        dayLength: "24 hours",
        yearLength: "365.25 days",
        moons: 1,
        distanceFromSun: 149600000,
        temperature: 15,
        color: "#1F7CDA",
        hasRings: false,
        orderFromSun: 3,
        features: [
          { icon: "ri-water-line", title: "Abundant Water", description: "Earth's surface is 71% water, with much of it being ocean." },
          { icon: "ri-earth-line", title: "Diverse Landforms", description: "The remaining 29% is land consisting of continents and islands." },
          { icon: "ri-cloud-line", title: "Protective Atmosphere", description: "Earth has a dense atmosphere protecting it from solar radiation." },
          { icon: "ri-compass-3-line", title: "Magnetic Field", description: "Earth's magnetic field protects the surface from solar winds." }
        ],
        image: "https://science.nasa.gov/wp-content/uploads/2023/05/earth-bluemarble-nasa.jpg"
      },
      {
        name: "Mars",
        overview: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It's often called the 'Red Planet' due to its reddish appearance.",
        composition: "Mars has a thin atmosphere made up primarily of carbon dioxide. Its surface features valleys, deserts, and polar ice caps, and is mainly composed of iron oxide (rust).",
        exploration: "Mars has been explored by numerous spacecraft, including rovers like Curiosity and Perseverance, which analyze its surface and search for signs of past or present life.",
        diameter: 6779,
        dayLength: "24.6 hours",
        yearLength: "687 Earth days",
        moons: 2,
        distanceFromSun: 227900000,
        temperature: -65,
        color: "#CF3C4F",
        hasRings: false,
        orderFromSun: 4,
        features: [
          { icon: "ri-mountain-line", title: "Olympus Mons", description: "Mars has the largest volcano in the solar system, Olympus Mons, standing at 22 km high." },
          { icon: "ri-polaroid-line", title: "Polar Ice Caps", description: "Mars has polar ice caps made of water and carbon dioxide ice that expand and shrink with the seasons." },
          { icon: "ri-water-line", title: "Ancient Rivers", description: "Evidence suggests Mars once had rivers, lakes, and possibly oceans on its surface." }
        ],
        image: "https://science.nasa.gov/wp-content/uploads/2023/05/mars-viking-perspective-looking-at-valles-marineris-full.jpg"
      },
      {
        name: "Jupiter",
        overview: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It's a gas giant primarily composed of hydrogen and helium.",
        composition: "Jupiter lacks a solid surface and is primarily composed of hydrogen and helium, similar to the Sun. It has a likely core of rock and metal.",
        exploration: "Multiple spacecraft have visited Jupiter, including Pioneer 10 and 11, Voyager 1 and 2, Galileo, Juno, and New Horizons.",
        diameter: 139820,
        dayLength: "9.9 hours",
        yearLength: "11.9 Earth years",
        moons: 79,
        distanceFromSun: 778500000,
        temperature: -110,
        color: "#C88B3A",
        hasRings: true,
        ringColor: "#8A5319",
        orderFromSun: 5,
        features: [
          { icon: "ri-tornado-line", title: "Great Red Spot", description: "Jupiter's Great Red Spot is a giant storm that has been raging for at least 400 years." },
          { icon: "ri-compasses-2-line", title: "Powerful Magnetic Field", description: "Jupiter has the strongest magnetic field of any planet in the solar system." },
          { icon: "ri-planet-line", title: "Many Moons", description: "Jupiter has at least 79 moons, including the four large Galilean moons: Io, Europa, Ganymede, and Callisto." }
        ],
        image: "https://science.nasa.gov/wp-content/uploads/2023/05/jupiter-juno-björn-jónsson-gravity-anomaly.jpg"
      },
      {
        name: "Saturn",
        overview: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It's known for its prominent ring system.",
        composition: "Like Jupiter, Saturn is a gas giant composed mainly of hydrogen and helium, with traces of other compounds such as ammonia, methane, and water ice.",
        exploration: "Saturn has been visited by four spacecraft: Pioneer 11, Voyager 1 and 2, and Cassini-Huygens, which orbited Saturn from 2004 to 2017.",
        diameter: 116460,
        dayLength: "10.7 hours",
        yearLength: "29.5 Earth years",
        moons: 82,
        distanceFromSun: 1434000000,
        temperature: -140,
        color: "#E5B97F",
        hasRings: true,
        ringColor: "#FFC76E",
        orderFromSun: 6,
        features: [
          { icon: "ri-planet-line", title: "Magnificent Rings", description: "Saturn's rings are made up of billions of particles of ice and rock, ranging in size from tiny dust grains to large boulders." },
          { icon: "ri-tsunami-line", title: "Hexagonal Storm", description: "Saturn has a hexagonal cloud pattern at its north pole, a unique feature in our solar system." },
          { icon: "ri-drop-line", title: "Low Density", description: "Saturn is so light that it would float in water if there were an ocean large enough to hold it." }
        ],
        image: "https://science.nasa.gov/wp-content/uploads/2023/05/saturn-cassini-natural-color.jpg"
      },
      {
        name: "Uranus",
        overview: "Uranus is the seventh planet from the Sun. It's an ice giant and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope.",
        composition: "Uranus is composed of a fluid mixture of water, methane, and ammonia above a small rocky core. It has a blue-green color due to methane in its atmosphere.",
        exploration: "Uranus has only been visited by one spacecraft, Voyager 2, which flew by the planet in 1986.",
        diameter: 50724,
        dayLength: "17.2 hours",
        yearLength: "84 Earth years",
        moons: 27,
        distanceFromSun: 2871000000,
        temperature: -195,
        color: "#6FD9DE",
        hasRings: true,
        ringColor: "#4CBEC3",
        orderFromSun: 7,
        features: [
          { icon: "ri-restart-line", title: "Tilted Axis", description: "Uranus rotates on its side with an axial tilt of 98 degrees, likely due to a collision with an Earth-sized object." },
          { icon: "ri-drop-line", title: "Icy Composition", description: "Uranus is an ice giant, composed mainly of water, methane, and ammonia ices." },
          { icon: "ri-cloud-line", title: "Featureless Appearance", description: "Uranus appears as a nearly featureless blue-green sphere, with few visible cloud features." }
        ],
        image: "https://science.nasa.gov/wp-content/uploads/2023/05/uranus-voyager2-nasa.jpg"
      },
      {
        name: "Neptune",
        overview: "Neptune is the eighth and farthest planet from the Sun. It's an ice giant similar to Uranus and was the first planet located through mathematical calculations rather than observation.",
        composition: "Neptune is composed primarily of hydrogen, helium, water, methane, and ammonia surrounding a rocky core. Its blue color is primarily due to methane in its atmosphere.",
        exploration: "Neptune has only been visited by one spacecraft, Voyager 2, which flew by in 1989.",
        diameter: 49244,
        dayLength: "16.1 hours",
        yearLength: "165 Earth years",
        moons: 14,
        distanceFromSun: 4495000000,
        temperature: -200,
        color: "#2B67AB",
        hasRings: true,
        ringColor: "#1F4D7F",
        orderFromSun: 8,
        features: [
          { icon: "ri-tornado-line", title: "Great Dark Spot", description: "Neptune has a Great Dark Spot similar to Jupiter's Great Red Spot, though it comes and goes over time." },
          { icon: "ri-speed-line", title: "Extreme Winds", description: "Neptune has the strongest winds in the solar system, reaching speeds of up to 2,100 km/h." },
          { icon: "ri-moon-clear-line", title: "Largest Moon", description: "Triton, Neptune's largest moon, orbits in the opposite direction of the planet's rotation." }
        ],
        image: "https://science.nasa.gov/wp-content/uploads/2023/05/neptune-voyager2-newlyprocessed-large.jpg"
      }
    ];
    
    planets.forEach(planet => this.createPlanet(planet));
    
    // Quiz questions
    const quizQuestions: InsertQuizQuestion[] = [
      {
        question: "Which planet is known as the Red Planet?",
        options: [
          { id: 1, text: "Venus" },
          { id: 2, text: "Mars" },
          { id: 3, text: "Jupiter" },
          { id: 4, text: "Mercury" }
        ],
        correctOptionId: 2,
        explanation: "Mars is known as the Red Planet due to the reddish appearance of its surface, which is caused by iron oxide (rust) prevalent on its surface."
      },
      {
        question: "Which planet has the most moons in our solar system?",
        options: [
          { id: 1, text: "Earth" },
          { id: 2, text: "Mars" },
          { id: 3, text: "Saturn" },
          { id: 4, text: "Jupiter" }
        ],
        correctOptionId: 3,
        explanation: "Saturn has the most confirmed moons with 82, slightly more than Jupiter's 79 moons."
      },
      {
        question: "Which planet rotates on its side?",
        options: [
          { id: 1, text: "Uranus" },
          { id: 2, text: "Neptune" },
          { id: 3, text: "Venus" },
          { id: 4, text: "Saturn" }
        ],
        correctOptionId: 1,
        explanation: "Uranus has an axial tilt of about 98 degrees, which means it essentially rotates on its side relative to the plane of its orbit."
      },
      {
        question: "Which is the largest planet in our solar system?",
        options: [
          { id: 1, text: "Earth" },
          { id: 2, text: "Saturn" },
          { id: 3, text: "Jupiter" },
          { id: 4, text: "Neptune" }
        ],
        correctOptionId: 3,
        explanation: "Jupiter is the largest planet in our solar system. It's so big that all the other planets could fit inside it!"
      },
      {
        question: "Which planet has a day longer than its year?",
        options: [
          { id: 1, text: "Mercury" },
          { id: 2, text: "Venus" },
          { id: 3, text: "Earth" },
          { id: 4, text: "Mars" }
        ],
        correctOptionId: 2,
        explanation: "Venus takes 243 Earth days to rotate once on its axis (its day) but only 225 Earth days to orbit the Sun (its year)."
      }
    ];
    
    quizQuestions.forEach(question => this.createQuizQuestion(question));
    
    // Fun facts
    const funFacts: InsertFunFact[] = [
      {
        title: "Space is Completely Silent",
        description: "Since there's no atmosphere in space, there's no medium for sound waves to travel through. Even the loudest explosion would be completely silent.",
        icon: "ri-rocket-line",
        iconBgColor: "mars-red"
      },
      {
        title: "A Day on Venus is Longer Than a Year",
        description: "Venus takes 243 Earth days to rotate once on its axis but only 225 Earth days to orbit the Sun once. So a day on Venus is longer than its year!",
        icon: "ri-sun-line",
        iconBgColor: "saturn-gold"
      },
      {
        title: "Saturn Could Float in Water",
        description: "Saturn has such a low density that if you could find a bathtub big enough, it would actually float in water rather than sink.",
        icon: "ri-planet-line",
        iconBgColor: "cosmic-purple"
      }
    ];
    
    funFacts.forEach(fact => this.createFunFact(fact));
    
    // Explore content
    const exploreContents: InsertExploreContent[] = [
      {
        title: "Galaxies & Beyond",
        description: "Explore the vast universe beyond our solar system, from neighboring galaxies to distant quasars.",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
        link: "/explore/galaxies"
      },
      {
        title: "Asteroids & Comets",
        description: "Learn about the smaller bodies in our solar system and their impact on planetary evolution.",
        image: "https://images.unsplash.com/photo-1614314169000-4f4b08cc29f3",
        link: "/explore/asteroids"
      },
      {
        title: "Space Missions",
        description: "Discover the past, present and future missions exploring our solar system and beyond.",
        image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031",
        link: "/explore/missions"
      }
    ];
    
    exploreContents.forEach(content => this.createExploreContent(content));
  }
}

export const storage = new MemStorage();
