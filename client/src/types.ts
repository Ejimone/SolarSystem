// Planet related types
export interface Planet {
  id: number;
  name: string;
  overview: string;
  composition: string;
  exploration: string;
  diameter: number;
  dayLength: string;
  yearLength: string;
  moons: number;
  distanceFromSun: number;
  temperature: number;
  color: string;
  ringColor?: string;
  hasRings: boolean;
  orderFromSun: number;
  features: PlanetFeature[];
  image: string;
}

export interface PlanetFeature {
  id: number;
  planetId: number;
  icon: string;
  title: string;
  description: string;
}

// Quiz related types
export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  correctOptionId: number;
  explanation: string;
}

export interface QuizOption {
  id: number;
  questionId: number;
  text: string;
}

// Fun fact related types
export interface FunFact {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconBgColor: string;
}

// Explore content related types
export interface ExploreContent {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}
