import {
  users,
  type User,
  type InsertUser,
  planets,
  type Planet,
  type InsertPlanet,
  quizQuestions,
  type QuizQuestion,
  type InsertQuizQuestion,
  funFacts,
  type FunFact,
  type InsertFunFact,
  exploreContents,
  type ExploreContent,
  type InsertExploreContent,
  userQuizProgress,
  type UserQuizProgress,
  type InsertUserQuizProgress,
  quizCategories,
  type QuizCategory,
  type InsertQuizCategory,
  badges,
  type Badge,
  type InsertBadge,
  userBadges,
  type UserBadge,
  type InsertUserBadge,
  celestialObjects,
  type CelestialObject,
  type InsertCelestialObject,
  spaceMissions,
  type SpaceMission,
  type InsertSpaceMission,
  worksheets,
  type Worksheet,
  type InsertWorksheet,
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods (from original schema)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(
    id: number,
    userData: Partial<Omit<InsertUser, "password">>
  ): Promise<User | undefined>;

  // User Progress methods
  getUserQuizProgress(userId: number): Promise<UserQuizProgress[]>;
  saveUserQuizProgress(
    progress: InsertUserQuizProgress
  ): Promise<UserQuizProgress>;

  // Badge methods
  getAllBadges(): Promise<Badge[]>;
  getBadge(id: number): Promise<Badge | undefined>;
  getUserBadges(userId: number): Promise<Badge[]>;
  awardBadgeToUser(userBadge: InsertUserBadge): Promise<UserBadge>;

  // Quiz Category methods
  getAllQuizCategories(): Promise<QuizCategory[]>;
  getQuizCategory(id: number): Promise<QuizCategory | undefined>;
  createQuizCategory(category: InsertQuizCategory): Promise<QuizCategory>;
  getQuizQuestionsByCategory(categoryId: number): Promise<QuizQuestion[]>;

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

  // Celestial Object methods
  getAllCelestialObjects(): Promise<CelestialObject[]>;
  getCelestialObjectsByType(type: string): Promise<CelestialObject[]>;
  getCelestialObjectsByParent(parentId: number): Promise<CelestialObject[]>;
  getCelestialObject(id: number): Promise<CelestialObject | undefined>;
  createCelestialObject(
    object: InsertCelestialObject
  ): Promise<CelestialObject>;

  // Space Mission methods
  getAllSpaceMissions(): Promise<SpaceMission[]>;
  getSpaceMission(id: number): Promise<SpaceMission | undefined>;
  getSpaceMissionsByStatus(status: string): Promise<SpaceMission[]>;
  getSpaceMissionsByTarget(targetBody: string): Promise<SpaceMission[]>;
  createSpaceMission(mission: InsertSpaceMission): Promise<SpaceMission>;

  // Worksheet methods
  getAllWorksheets(): Promise<Worksheet[]>;
  getWorksheetsBySubject(subject: string): Promise<Worksheet[]>;
  getWorksheetsByAgeRange(ageRange: string): Promise<Worksheet[]>;
  getWorksheet(id: number): Promise<Worksheet | undefined>;
  createWorksheet(worksheet: InsertWorksheet): Promise<Worksheet>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private planets: Map<number, Planet>;
  private quizQuestions: Map<number, QuizQuestion>;
  private funFacts: Map<number, FunFact>;
  private exploreContents: Map<number, ExploreContent>;
  private userQuizProgress: Map<number, UserQuizProgress>;
  private quizCategories: Map<number, QuizCategory>;
  private badges: Map<number, Badge>;
  private userBadges: Map<number, UserBadge>;
  private celestialObjects: Map<number, CelestialObject>;
  private spaceMissions: Map<number, SpaceMission>;
  private worksheets: Map<number, Worksheet>;

  private userCurrentId: number;
  private planetCurrentId: number;
  private quizQuestionCurrentId: number;
  private funFactCurrentId: number;
  private exploreContentCurrentId: number;
  private userQuizProgressCurrentId: number;
  private quizCategoryCurrentId: number;
  private badgeCurrentId: number;
  private userBadgeCurrentId: number;
  private celestialObjectCurrentId: number;
  private spaceMissionCurrentId: number;
  private worksheetCurrentId: number;

  constructor() {
    this.users = new Map();
    this.planets = new Map();
    this.quizQuestions = new Map();
    this.funFacts = new Map();
    this.exploreContents = new Map();
    this.userQuizProgress = new Map();
    this.quizCategories = new Map();
    this.badges = new Map();
    this.userBadges = new Map();
    this.celestialObjects = new Map();
    this.spaceMissions = new Map();
    this.worksheets = new Map();

    this.userCurrentId = 1;
    this.planetCurrentId = 1;
    this.quizQuestionCurrentId = 1;
    this.funFactCurrentId = 1;
    this.exploreContentCurrentId = 1;
    this.userQuizProgressCurrentId = 1;
    this.quizCategoryCurrentId = 1;
    this.badgeCurrentId = 1;
    this.userBadgeCurrentId = 1;
    this.celestialObjectCurrentId = 1;
    this.spaceMissionCurrentId = 1;
    this.worksheetCurrentId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    const user: User = {
      ...insertUser,
      id,
      createdAt: now,
      lastLogin: now,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(
    id: number,
    userData: Partial<Omit<InsertUser, "password">>
  ): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;

    const updatedUser: User = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // User Progress methods
  async getUserQuizProgress(userId: number): Promise<UserQuizProgress[]> {
    return Array.from(this.userQuizProgress.values()).filter(
      (progress) => progress.userId === userId
    );
  }

  async saveUserQuizProgress(
    progress: InsertUserQuizProgress
  ): Promise<UserQuizProgress> {
    const id = this.userQuizProgressCurrentId++;
    const userProgress: UserQuizProgress = { ...progress, id };
    this.userQuizProgress.set(id, userProgress);
    return userProgress;
  }

  // Badge methods
  async getAllBadges(): Promise<Badge[]> {
    return Array.from(this.badges.values());
  }

  async getBadge(id: number): Promise<Badge | undefined> {
    return this.badges.get(id);
  }

  async getUserBadges(userId: number): Promise<Badge[]> {
    const userBadgeIds = Array.from(this.userBadges.values())
      .filter((ub) => ub.userId === userId)
      .map((ub) => ub.badgeId);

    return Array.from(this.badges.values()).filter((badge) =>
      userBadgeIds.includes(badge.id)
    );
  }

  async awardBadgeToUser(insertUserBadge: InsertUserBadge): Promise<UserBadge> {
    const id = this.userBadgeCurrentId++;
    const userBadge: UserBadge = { ...insertUserBadge, id };
    this.userBadges.set(id, userBadge);
    return userBadge;
  }

  // Quiz Category methods
  async getAllQuizCategories(): Promise<QuizCategory[]> {
    return Array.from(this.quizCategories.values());
  }

  async getQuizCategory(id: number): Promise<QuizCategory | undefined> {
    return this.quizCategories.get(id);
  }

  async createQuizCategory(
    category: InsertQuizCategory
  ): Promise<QuizCategory> {
    const id = this.quizCategoryCurrentId++;
    const quizCategory: QuizCategory = { ...category, id };
    this.quizCategories.set(id, quizCategory);
    return quizCategory;
  }

  async getQuizQuestionsByCategory(
    categoryId: number
  ): Promise<QuizQuestion[]> {
    return Array.from(this.quizQuestions.values()).filter(
      (question) => question.categoryId === categoryId
    );
  }

  // Planet methods
  async getAllPlanets(): Promise<Planet[]> {
    return Array.from(this.planets.values()).sort(
      (a, b) => a.orderFromSun - b.orderFromSun
    );
  }

  async getPlanet(id: number): Promise<Planet | undefined> {
    return this.planets.get(id);
  }

  async getPlanetByName(name: string): Promise<Planet | undefined> {
    return Array.from(this.planets.values()).find(
      (planet) => planet.name.toLowerCase() === name.toLowerCase()
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

  async createQuizQuestion(
    insertQuestion: InsertQuizQuestion
  ): Promise<QuizQuestion> {
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

  async createExploreContent(
    insertContent: InsertExploreContent
  ): Promise<ExploreContent> {
    const id = this.exploreContentCurrentId++;
    const content: ExploreContent = { ...insertContent, id };
    this.exploreContents.set(id, content);
    return content;
  }

  // Celestial Object methods
  async getAllCelestialObjects(): Promise<CelestialObject[]> {
    return Array.from(this.celestialObjects.values());
  }

  async getCelestialObjectsByType(type: string): Promise<CelestialObject[]> {
    return Array.from(this.celestialObjects.values()).filter(
      (obj) => obj.type.toLowerCase() === type.toLowerCase()
    );
  }

  async getCelestialObjectsByParent(
    parentId: number
  ): Promise<CelestialObject[]> {
    return Array.from(this.celestialObjects.values()).filter(
      (obj) => obj.parentBodyId === parentId
    );
  }

  async getCelestialObject(id: number): Promise<CelestialObject | undefined> {
    return this.celestialObjects.get(id);
  }

  async createCelestialObject(
    object: InsertCelestialObject
  ): Promise<CelestialObject> {
    const id = this.celestialObjectCurrentId++;
    const celestialObject: CelestialObject = { ...object, id };
    this.celestialObjects.set(id, celestialObject);
    return celestialObject;
  }

  // Space Mission methods
  async getAllSpaceMissions(): Promise<SpaceMission[]> {
    return Array.from(this.spaceMissions.values());
  }

  async getSpaceMission(id: number): Promise<SpaceMission | undefined> {
    return this.spaceMissions.get(id);
  }

  async getSpaceMissionsByStatus(status: string): Promise<SpaceMission[]> {
    return Array.from(this.spaceMissions.values()).filter(
      (mission) => mission.status.toLowerCase() === status.toLowerCase()
    );
  }

  async getSpaceMissionsByTarget(targetBody: string): Promise<SpaceMission[]> {
    return Array.from(this.spaceMissions.values()).filter((mission) =>
      mission.targetBodies.some(
        (target) => target.toLowerCase() === targetBody.toLowerCase()
      )
    );
  }

  async createSpaceMission(mission: InsertSpaceMission): Promise<SpaceMission> {
    const id = this.spaceMissionCurrentId++;
    const spaceMission: SpaceMission = { ...mission, id };
    this.spaceMissions.set(id, spaceMission);
    return spaceMission;
  }

  // Worksheet methods
  async getAllWorksheets(): Promise<Worksheet[]> {
    return Array.from(this.worksheets.values());
  }

  async getWorksheetsBySubject(subject: string): Promise<Worksheet[]> {
    return Array.from(this.worksheets.values()).filter(
      (worksheet) => worksheet.subject.toLowerCase() === subject.toLowerCase()
    );
  }

  async getWorksheetsByAgeRange(ageRange: string): Promise<Worksheet[]> {
    return Array.from(this.worksheets.values()).filter(
      (worksheet) => worksheet.ageRange === ageRange
    );
  }

  async getWorksheet(id: number): Promise<Worksheet | undefined> {
    return this.worksheets.get(id);
  }

  async createWorksheet(worksheet: InsertWorksheet): Promise<Worksheet> {
    const id = this.worksheetCurrentId++;
    const newWorksheet: Worksheet = {
      ...worksheet,
      id,
      createdAt: new Date(),
    };
    this.worksheets.set(id, newWorksheet);
    return newWorksheet;
  }

  private initializeSampleData() {
    // Planets
    const planets: InsertPlanet[] = [
      {
        name: "Mercury",
        overview:
          "Mercury is the smallest and innermost planet in the Solar System. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets.",
        composition:
          "Mercury appears to have a solid silicate crust and mantle overlying a solid, iron sulfide outer core layer, a deeper liquid core layer, and a solid inner core.",
        exploration:
          "The first spacecraft to visit Mercury was NASA's Mariner 10 in 1974–75. The second was the MESSENGER spacecraft, which mapped the planet after 2011.",
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
          {
            icon: "ri-fire-line",
            title: "Extreme Temperatures",
            description:
              "Mercury experiences extreme temperature variations, from 430°C during the day to -180°C at night.",
          },
          {
            icon: "ri-earth-line",
            title: "Cratered Surface",
            description:
              "Mercury's surface is heavily cratered, similar to the Moon, due to impacts from asteroids and comets.",
          },
          {
            icon: "ri-compass-3-line",
            title: "Magnetic Field",
            description:
              "Despite its small size, Mercury has a magnetic field, though it's much weaker than Earth's.",
          },
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/mercury-messenger-globe-full.jpg",
      },
      {
        name: "Venus",
        overview:
          "Venus is the second planet from the Sun and is often called Earth's sister planet due to their similar size and mass. It's the hottest planet in our solar system.",
        composition:
          "Venus has a thick atmosphere consisting mainly of carbon dioxide, with clouds of sulfuric acid. Its surface is a dry desert with many active volcanoes.",
        exploration:
          "More than 40 spacecraft have explored Venus, including NASA's Magellan, which mapped the planet's surface with radar, and more recently, Japan's Akatsuki.",
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
          {
            icon: "ri-tornado-line",
            title: "Toxic Atmosphere",
            description:
              "Venus has a thick, toxic atmosphere filled with carbon dioxide and sulfuric acid clouds.",
          },
          {
            icon: "ri-fire-line",
            title: "Extreme Heat",
            description:
              "With temperatures reaching 464°C, Venus is the hottest planet in our solar system.",
          },
          {
            icon: "ri-arrow-go-back-line",
            title: "Retrograde Rotation",
            description:
              "Venus rotates in the opposite direction to most planets, a phenomenon called retrograde rotation.",
          },
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/venus-magellan-colorized-hemisphere.jpg",
      },
      {
        name: "Earth",
        overview:
          "Earth is the third planet from the Sun and the only astronomical object known to harbor life. According to radiometric dating estimation, Earth formed over 4.5 billion years ago.",
        composition:
          "Earth's interior is divided into layers including the inner core, outer core, mantle, and crust. The planet is mostly covered by water (71%) and has a nitrogen-oxygen atmosphere.",
        exploration:
          "Earth is continuously explored through various means including satellites, deep-sea expeditions, and polar research stations.",
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
          {
            icon: "ri-water-line",
            title: "Abundant Water",
            description:
              "Earth's surface is 71% water, with much of it being ocean.",
          },
          {
            icon: "ri-earth-line",
            title: "Diverse Landforms",
            description:
              "The remaining 29% is land consisting of continents and islands.",
          },
          {
            icon: "ri-cloud-line",
            title: "Protective Atmosphere",
            description:
              "Earth has a dense atmosphere protecting it from solar radiation.",
          },
          {
            icon: "ri-compass-3-line",
            title: "Magnetic Field",
            description:
              "Earth's magnetic field protects the surface from solar winds.",
          },
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/earth-bluemarble-nasa.jpg",
      },
      {
        name: "Mars",
        overview:
          "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It's often called the 'Red Planet' due to its reddish appearance.",
        composition:
          "Mars has a thin atmosphere made up primarily of carbon dioxide. Its surface features valleys, deserts, and polar ice caps, and is mainly composed of iron oxide (rust).",
        exploration:
          "Mars has been explored by numerous spacecraft, including rovers like Curiosity and Perseverance, which analyze its surface and search for signs of past or present life.",
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
          {
            icon: "ri-mountain-line",
            title: "Olympus Mons",
            description:
              "Mars has the largest volcano in the solar system, Olympus Mons, standing at 22 km high.",
          },
          {
            icon: "ri-polaroid-line",
            title: "Polar Ice Caps",
            description:
              "Mars has polar ice caps made of water and carbon dioxide ice that expand and shrink with the seasons.",
          },
          {
            icon: "ri-water-line",
            title: "Ancient Rivers",
            description:
              "Evidence suggests Mars once had rivers, lakes, and possibly oceans on its surface.",
          },
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/mars-viking-perspective-looking-at-valles-marineris-full.jpg",
      },
      {
        name: "Jupiter",
        overview:
          "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It's a gas giant primarily composed of hydrogen and helium.",
        composition:
          "Jupiter lacks a solid surface and is primarily composed of hydrogen and helium, similar to the Sun. It has a likely core of rock and metal.",
        exploration:
          "Multiple spacecraft have visited Jupiter, including Pioneer 10 and 11, Voyager 1 and 2, Galileo, Juno, and New Horizons.",
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
          {
            icon: "ri-tornado-line",
            title: "Great Red Spot",
            description:
              "Jupiter's Great Red Spot is a giant storm that has been raging for at least 400 years.",
          },
          {
            icon: "ri-compasses-2-line",
            title: "Powerful Magnetic Field",
            description:
              "Jupiter has the strongest magnetic field of any planet in the solar system.",
          },
          {
            icon: "ri-planet-line",
            title: "Many Moons",
            description:
              "Jupiter has at least 79 moons, including the four large Galilean moons: Io, Europa, Ganymede, and Callisto.",
          },
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/jupiter-juno-björn-jónsson-gravity-anomaly.jpg",
      },
      {
        name: "Saturn",
        overview:
          "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It's known for its prominent ring system.",
        composition:
          "Like Jupiter, Saturn is a gas giant composed mainly of hydrogen and helium, with traces of other compounds such as ammonia, methane, and water ice.",
        exploration:
          "Saturn has been visited by four spacecraft: Pioneer 11, Voyager 1 and 2, and Cassini-Huygens, which orbited Saturn from 2004 to 2017.",
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
          {
            icon: "ri-planet-line",
            title: "Magnificent Rings",
            description:
              "Saturn's rings are made up of billions of particles of ice and rock, ranging in size from tiny dust grains to large boulders.",
          },
          {
            icon: "ri-tsunami-line",
            title: "Hexagonal Storm",
            description:
              "Saturn has a hexagonal cloud pattern at its north pole, a unique feature in our solar system.",
          },
          {
            icon: "ri-drop-line",
            title: "Low Density",
            description:
              "Saturn is so light that it would float in water if there were an ocean large enough to hold it.",
          },
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/saturn-cassini-natural-color.jpg",
      },
      {
        name: "Uranus",
        overview:
          "Uranus is the seventh planet from the Sun. It's an ice giant and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope.",
        composition:
          "Uranus is composed of a fluid mixture of water, methane, and ammonia above a small rocky core. It has a blue-green color due to methane in its atmosphere.",
        exploration:
          "Uranus has only been visited by one spacecraft, Voyager 2, which flew by the planet in 1986.",
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
          {
            icon: "ri-restart-line",
            title: "Tilted Axis",
            description:
              "Uranus rotates on its side with an axial tilt of 98 degrees, likely due to a collision with an Earth-sized object.",
          },
          {
            icon: "ri-drop-line",
            title: "Icy Composition",
            description:
              "Uranus is an ice giant, composed mainly of water, methane, and ammonia ices.",
          },
          {
            icon: "ri-cloud-line",
            title: "Featureless Appearance",
            description:
              "Uranus appears as a nearly featureless blue-green sphere, with few visible cloud features.",
          },
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/uranus-voyager2-nasa.jpg",
      },
      {
        name: "Neptune",
        overview:
          "Neptune is the eighth and farthest planet from the Sun. It's an ice giant similar to Uranus and was the first planet located through mathematical calculations rather than observation.",
        composition:
          "Neptune is composed primarily of hydrogen, helium, water, methane, and ammonia surrounding a rocky core. Its blue color is primarily due to methane in its atmosphere.",
        exploration:
          "Neptune has only been visited by one spacecraft, Voyager 2, which flew by in 1989.",
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
          {
            icon: "ri-tornado-line",
            title: "Great Dark Spot",
            description:
              "Neptune has a Great Dark Spot similar to Jupiter's Great Red Spot, though it comes and goes over time.",
          },
          {
            icon: "ri-speed-line",
            title: "Extreme Winds",
            description:
              "Neptune has the strongest winds in the solar system, reaching speeds of up to 2,100 km/h.",
          },
          {
            icon: "ri-moon-clear-line",
            title: "Largest Moon",
            description:
              "Triton, Neptune's largest moon, orbits in the opposite direction of the planet's rotation.",
          },
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/neptune-voyager2-newlyprocessed-large.jpg",
      },
    ];

    planets.forEach((planet) => this.createPlanet(planet));

    // Quiz questions
    const quizQuestions: InsertQuizQuestion[] = [
      {
        question: "Which planet is known as the Red Planet?",
        options: [
          { id: 1, text: "Venus" },
          { id: 2, text: "Mars" },
          { id: 3, text: "Jupiter" },
          { id: 4, text: "Mercury" },
        ],
        correctOptionId: 2,
        explanation:
          "Mars is known as the Red Planet due to the reddish appearance of its surface, which is caused by iron oxide (rust) prevalent on its surface.",
      },
      {
        question: "Which planet has the most moons in our solar system?",
        options: [
          { id: 1, text: "Earth" },
          { id: 2, text: "Mars" },
          { id: 3, text: "Saturn" },
          { id: 4, text: "Jupiter" },
        ],
        correctOptionId: 3,
        explanation:
          "Saturn has the most confirmed moons with 82, slightly more than Jupiter's 79 moons.",
      },
      {
        question: "Which planet rotates on its side?",
        options: [
          { id: 1, text: "Uranus" },
          { id: 2, text: "Neptune" },
          { id: 3, text: "Venus" },
          { id: 4, text: "Saturn" },
        ],
        correctOptionId: 1,
        explanation:
          "Uranus has an axial tilt of about 98 degrees, which means it essentially rotates on its side relative to the plane of its orbit.",
      },
      {
        question: "Which is the largest planet in our solar system?",
        options: [
          { id: 1, text: "Earth" },
          { id: 2, text: "Saturn" },
          { id: 3, text: "Jupiter" },
          { id: 4, text: "Neptune" },
        ],
        correctOptionId: 3,
        explanation:
          "Jupiter is the largest planet in our solar system. It's so big that all the other planets could fit inside it!",
      },
      {
        question: "Which planet has a day longer than its year?",
        options: [
          { id: 1, text: "Mercury" },
          { id: 2, text: "Venus" },
          { id: 3, text: "Earth" },
          { id: 4, text: "Mars" },
        ],
        correctOptionId: 2,
        explanation:
          "Venus takes 243 Earth days to rotate once on its axis (its day) but only 225 Earth days to orbit the Sun (its year).",
      },
    ];

    quizQuestions.forEach((question) => this.createQuizQuestion(question));

    // Fun facts
    const funFacts: InsertFunFact[] = [
      {
        title: "Space is Completely Silent",
        description:
          "Since there's no atmosphere in space, there's no medium for sound waves to travel through. Even the loudest explosion would be completely silent.",
        icon: "ri-rocket-line",
        iconBgColor: "mars-red",
      },
      {
        title: "A Day on Venus is Longer Than a Year",
        description:
          "Venus takes 243 Earth days to rotate once on its axis but only 225 Earth days to orbit the Sun once. So a day on Venus is longer than its year!",
        icon: "ri-sun-line",
        iconBgColor: "saturn-gold",
      },
      {
        title: "Saturn Could Float in Water",
        description:
          "Saturn has such a low density that if you could find a bathtub big enough, it would actually float in water rather than sink.",
        icon: "ri-planet-line",
        iconBgColor: "cosmic-purple",
      },
    ];

    funFacts.forEach((fact) => this.createFunFact(fact));

    // Explore content
    const exploreContents: InsertExploreContent[] = [
      {
        title: "Galaxies & Beyond",
        description:
          "Explore the vast universe beyond our solar system, from neighboring galaxies to distant quasars.",
        image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
        link: "/explore/galaxies",
      },
      {
        title: "Asteroids & Comets",
        description:
          "Learn about the smaller bodies in our solar system and their impact on planetary evolution.",
        image: "https://images.unsplash.com/photo-1614314169000-4f4b08cc29f3",
        link: "/explore/asteroids",
      },
      {
        title: "Space Missions",
        description:
          "Discover the past, present and future missions exploring our solar system and beyond.",
        image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031",
        link: "/explore/missions",
      },
    ];

    exploreContents.forEach((content) => this.createExploreContent(content));

    // Add sample data for new features
    this.initializeSampleCelestialObjects();
    this.initializeSampleSpaceMissions();
    this.initializeSampleWorksheets();
    this.initializeSampleBadges();
    this.initializeSampleQuizCategories();

    // Add a new visible space mission
    const newMission: InsertSpaceMission = {
      name: "Artemis Program",
      agency: "NASA",
      launchDate: new Date("2022-11-16"),
      description:
        "The Artemis program is a human spaceflight program led by NASA with the goal of returning humans to the Moon, specifically the lunar south pole region by 2025. The program includes plans for sustainable lunar exploration and as a stepping stone for future human Mars exploration.",
      status: "Active",
      targetBodies: ["Moon", "Lunar Orbit"],
      imageUrl:
        "https://www.nasa.gov/wp-content/uploads/2023/03/artemis-1-rocket-liftoff.jpg",
    };
    this.createSpaceMission(newMission);

    // Add a second mission to make changes more visible
    const jamesWebbMission: InsertSpaceMission = {
      name: "James Webb Space Telescope",
      agency: "NASA/ESA/CSA",
      launchDate: new Date("2021-12-25"),
      description:
        "The James Webb Space Telescope is an infrared space telescope that launched on December 25, 2021. It is the largest optical telescope in space and its high infrared resolution and sensitivity allow it to view objects too old, distant, or faint for the Hubble Space Telescope.",
      status: "Active",
      targetBodies: ["L2 Lagrange Point"],
      imageUrl:
        "https://www.nasa.gov/wp-content/uploads/2023/03/jwst-primary-mirror.jpg",
    };
    this.createSpaceMission(jamesWebbMission);
  }

  // Add sample data initialization methods
  private initializeSampleCelestialObjects() {
    const celestialObjects: InsertCelestialObject[] = [
      {
        name: "Moon",
        type: "moon",
        parentBodyId: 3, // Earth
        overview:
          "The Moon is Earth's only natural satellite and the fifth largest moon in the Solar System.",
        composition:
          "The Moon's surface is made of rock with a significant amount of iron and titanium. It has a small core and no atmosphere.",
        discovery:
          "The Moon has been known since prehistoric times as it's visible to the naked eye.",
        diameter: 3474,
        orbitPeriod: "27.3 Earth days",
        distanceFromParent: 384400,
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/moon-nearside-lro.jpg",
        features: [
          {
            icon: "ri-water-line",
            title: "Water Ice",
            description:
              "There is evidence of water ice in permanently shadowed craters at the Moon's poles.",
          },
          {
            icon: "ri-footprint-line",
            title: "Human Exploration",
            description:
              "The Moon is the only celestial body besides Earth that humans have visited in person.",
          },
          {
            icon: "ri-planet-line",
            title: "Synchronous Rotation",
            description:
              "The Moon's rotation period is the same as its orbital period, which is why we always see the same side.",
          },
        ],
      },
      {
        name: "Io",
        type: "moon",
        parentBodyId: 5, // Jupiter
        overview:
          "Io is the innermost of the four Galilean moons of Jupiter and the most volcanically active body in the Solar System.",
        composition:
          "Io is primarily composed of silicate rock and has an iron or iron sulfide core.",
        discovery: "Discovered by Galileo Galilei in 1610.",
        diameter: 3643,
        orbitPeriod: "1.77 Earth days",
        distanceFromParent: 421700,
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/08/PIA00583.jpeg",
        features: [
          {
            icon: "ri-fire-line",
            title: "Volcanic Activity",
            description:
              "Io has over 400 active volcanoes, making it the most geologically active object in the solar system.",
          },
          {
            icon: "ri-sun-line",
            title: "Radiation",
            description:
              "Io is caught in Jupiter's intense radiation belts, receiving 3,600 rem of radiation per day.",
          },
          {
            icon: "ri-rainbow-line",
            title: "Colorful Surface",
            description:
              "Io's surface is covered in sulfur dioxide frost, giving it a colorful appearance with yellows, reds, whites, and blacks.",
          },
        ],
      },
      {
        name: "Halley's Comet",
        type: "comet",
        overview:
          "Halley's Comet is the most famous of the periodic comets and can be seen from Earth every 75-76 years.",
        composition:
          "Like all comets, Halley's Comet is made of a mixture of rock, dust, water ice, and frozen gases such as carbon dioxide, methane, and ammonia.",
        discovery:
          "While recorded observations of Halley's Comet date back to at least 240 BCE, it was Edmond Halley who recognized it as a periodic comet in 1705.",
        diameter: 11,
        orbitPeriod: "76 Earth years",
        distanceFromParent: null, // Not applicable
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/06/PIA00559-16.jpeg",
        features: [
          {
            icon: "ri-comet-line",
            title: "Visible from Earth",
            description:
              "Halley's Comet is visible from Earth with the naked eye when it's close to the Sun.",
          },
          {
            icon: "ri-meteor-line",
            title: "Meteor Showers",
            description:
              "The Orionid meteor shower in October and the Eta Aquariid meteor shower in May are created by dust from Halley's Comet.",
          },
          {
            icon: "ri-timer-line",
            title: "Predictable Return",
            description:
              "The comet's regular return enabled astronomers to predict its reappearance, confirming Newton's theory of gravity.",
          },
        ],
      },
      {
        name: "Ceres",
        type: "asteroid",
        overview:
          "Ceres is the largest object in the asteroid belt between Mars and Jupiter and is classified as a dwarf planet.",
        composition:
          "Ceres is made up of rock and ice, with a possible internal ocean of liquid water.",
        discovery: "Discovered by Giuseppe Piazzi on January 1, 1801.",
        diameter: 940,
        orbitPeriod: "4.6 Earth years",
        distanceFromParent: null, // Not applicable
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/pia22660-16.jpg",
        features: [
          {
            icon: "ri-water-line",
            title: "Water Content",
            description:
              "Ceres may have more fresh water than Earth, mostly in the form of ice.",
          },
          {
            icon: "ri-mountain-line",
            title: "Bright Spots",
            description:
              "Ceres has mysterious bright spots in Occator Crater, which are likely salt deposits.",
          },
          {
            icon: "ri-planet-line",
            title: "Dwarf Planet",
            description:
              "Despite being in the asteroid belt, Ceres is large enough to be classified as a dwarf planet.",
          },
        ],
      },
    ];

    celestialObjects.forEach((object) => this.createCelestialObject(object));
  }

  private initializeSampleSpaceMissions() {
    const now = new Date();
    const spaceMissions: InsertSpaceMission[] = [
      {
        name: "Apollo 11",
        agency: "NASA",
        launchDate: new Date("1969-07-16"),
        endDate: new Date("1969-07-24"),
        description:
          "Apollo 11 was the spaceflight that first landed humans on the Moon.",
        objectives: ["Land humans on the Moon", "Return safely to Earth"],
        targetBodies: ["Moon"],
        achievements: [
          "First human Moon landing",
          "Collection of lunar samples",
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/apollo11-landing.jpg",
        missionType: "human landing",
        status: "completed",
      },
      {
        name: "Voyager 1",
        agency: "NASA",
        launchDate: new Date("1977-09-05"),
        endDate: null, // Still active
        description:
          "Voyager 1 is a space probe launched by NASA on a mission to study the outer Solar System and interstellar space beyond the Sun's heliosphere.",
        objectives: [
          "Study the outer Solar System",
          "Enter interstellar space",
        ],
        targetBodies: ["Jupiter", "Saturn"],
        achievements: [
          "First spacecraft to enter interstellar space",
          "Closest approach to Jupiter and Saturn",
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/vger-spacecraft-browse.jpg",
        missionType: "flyby",
        status: "active",
      },
      {
        name: "Perseverance",
        agency: "NASA",
        launchDate: new Date("2020-07-30"),
        endDate: null, // Still active
        description:
          "The Mars 2020 mission with its Perseverance rover is exploring Mars' Jezero Crater to search for signs of ancient microbial life.",
        objectives: [
          "Search for signs of ancient life",
          "Collect rock and soil samples",
          "Test oxygen production from the Martian atmosphere",
        ],
        targetBodies: ["Mars"],
        achievements: [
          "First controlled flight on another planet (Ingenuity helicopter)",
          "First extraction of oxygen from the Martian atmosphere",
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/05/PIA23764-RoverNamePlateonMars-web.jpg",
        missionType: "rover",
        status: "active",
      },
      {
        name: "JWST",
        agency: "NASA/ESA/CSA",
        launchDate: new Date("2021-12-25"),
        endDate: null, // Still active
        description:
          "The James Webb Space Telescope is an infrared space observatory that will complement and extend the discoveries of the Hubble Space Telescope.",
        objectives: [
          "Observe the earliest stars and galaxies",
          "Study planetary systems",
          "Investigate the origins of life",
        ],
        targetBodies: ["Deep space"],
        achievements: [
          "Most powerful space telescope ever built",
          "Revolutionary infrared technology",
        ],
        image:
          "https://science.nasa.gov/wp-content/uploads/2023/06/PIA25240-1.jpeg",
        missionType: "observatory",
        status: "active",
      },
    ];

    spaceMissions.forEach((mission) => this.createSpaceMission(mission));
  }

  private initializeSampleWorksheets() {
    const worksheets: InsertWorksheet[] = [
      {
        title: "Planet Comparison Chart",
        description:
          "A printable worksheet for students to compare and contrast the planets in our solar system.",
        ageRange: "8-10",
        subject: "planets",
        pdfUrl: "/worksheets/planet-comparison-chart.pdf",
        thumbnailUrl: "/images/worksheets/planet-chart-thumb.jpg",
        createdAt: new Date(),
      },
      {
        title: "Solar System Scavenger Hunt",
        description:
          "A fun activity where students search for facts about the solar system.",
        ageRange: "6-8",
        subject: "solar system",
        pdfUrl: "/worksheets/solar-system-scavenger-hunt.pdf",
        thumbnailUrl: "/images/worksheets/scavenger-hunt-thumb.jpg",
        createdAt: new Date(),
      },
      {
        title: "Space Mission Timeline",
        description:
          "Create a timeline of major space missions from the first satellite to current missions.",
        ageRange: "10-12",
        subject: "space exploration",
        pdfUrl: "/worksheets/space-mission-timeline.pdf",
        thumbnailUrl: "/images/worksheets/mission-timeline-thumb.jpg",
        createdAt: new Date(),
      },
      {
        title: "Moon Phases Activity",
        description:
          "Learn about the phases of the Moon with this hands-on activity and tracking sheet.",
        ageRange: "8-10",
        subject: "moon",
        pdfUrl: "/worksheets/moon-phases-activity.pdf",
        thumbnailUrl: "/images/worksheets/moon-phases-thumb.jpg",
        createdAt: new Date(),
      },
    ];

    worksheets.forEach((worksheet) => this.createWorksheet(worksheet));
  }

  private initializeSampleBadges() {
    const badges: InsertBadge[] = [
      {
        name: "Solar Explorer",
        description:
          "Completed the beginner solar system quiz with a perfect score!",
        imageUrl: "/images/badges/solar-explorer.png",
        criteria: "Score 100% on the beginner solar system quiz",
      },
      {
        name: "Cosmic Genius",
        description: "Answered 50 quiz questions correctly.",
        imageUrl: "/images/badges/cosmic-genius.png",
        criteria: "Answer 50 quiz questions correctly across all quizzes",
      },
      {
        name: "Planet Master",
        description: "Visited all planet detail pages.",
        imageUrl: "/images/badges/planet-master.png",
        criteria: "View the detail page for each of the 8 planets",
      },
      {
        name: "Mission Specialist",
        description:
          "Completed all space mission quizzes with at least 80% accuracy.",
        imageUrl: "/images/badges/mission-specialist.png",
        criteria: "Score at least 80% on all space mission quizzes",
      },
    ];

    badges.forEach((badge) => this.createBadge(badge));
  }

  private async createBadge(badge: InsertBadge): Promise<Badge> {
    const id = this.badgeCurrentId++;
    const newBadge: Badge = { ...badge, id };
    this.badges.set(id, newBadge);
    return newBadge;
  }

  private initializeSampleQuizCategories() {
    const categories: InsertQuizCategory[] = [
      {
        name: "Solar System Basics",
        description:
          "Test your knowledge about the fundamentals of our solar system.",
        difficulty: "beginner",
        imageUrl: "/images/quiz/solar-system-basics.jpg",
      },
      {
        name: "Planet Facts",
        description: "How well do you know the planets in our solar system?",
        difficulty: "intermediate",
        imageUrl: "/images/quiz/planet-facts.jpg",
      },
      {
        name: "Space Exploration",
        description:
          "Test your knowledge about human and robotic exploration of space.",
        difficulty: "advanced",
        imageUrl: "/images/quiz/space-exploration.jpg",
      },
      {
        name: "Asteroids and Comets",
        description: "Learn about the smaller objects in our solar system.",
        difficulty: "intermediate",
        imageUrl: "/images/quiz/asteroids-comets.jpg",
      },
    ];

    categories.forEach((category) => this.createQuizCategory(category));
  }
}

// Create an instance of MemStorage and export it
export const storage = new MemStorage();
