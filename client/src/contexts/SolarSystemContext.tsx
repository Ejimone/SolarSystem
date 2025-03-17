import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Planet, QuizQuestion, FunFact, ExploreContent } from "../types";

interface SolarSystemContextType {
  planets: Planet[];
  quizQuestions: QuizQuestion[];
  funFacts: FunFact[];
  exploreContents: ExploreContent[];
  selectedPlanet: Planet | null;
  setSelectedPlanet: (planet: Planet | null) => void;
  isLoading: boolean;
  error: Error | null;
}

const SolarSystemContext = createContext<SolarSystemContextType | undefined>(undefined);

export function SolarSystemProvider({ children }: { children: ReactNode }) {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  
  // Fetch planets data
  const {
    data: planets = [],
    isLoading: isPlanetsLoading,
    error: planetsError,
  } = useQuery<Planet[]>({
    queryKey: ["/api/planets"],
  });

  // Fetch quiz questions
  const {
    data: quizQuestions = [],
    isLoading: isQuestionsLoading,
    error: questionsError,
  } = useQuery<QuizQuestion[]>({
    queryKey: ["/api/quiz-questions"],
  });

  // Fetch fun facts
  const {
    data: funFacts = [],
    isLoading: isFactsLoading,
    error: factsError,
  } = useQuery<FunFact[]>({
    queryKey: ["/api/fun-facts"],
  });

  // Fetch explore contents
  const {
    data: exploreContents = [],
    isLoading: isContentsLoading,
    error: contentsError,
  } = useQuery<ExploreContent[]>({
    queryKey: ["/api/explore-contents"],
  });

  // Set first planet as selected when planets are loaded
  useEffect(() => {
    if (planets.length > 0 && !selectedPlanet) {
      setSelectedPlanet(planets[2]); // Earth (index 2) as default
    }
  }, [planets, selectedPlanet]);

  const isLoading = isPlanetsLoading || isQuestionsLoading || isFactsLoading || isContentsLoading;
  const error = planetsError || questionsError || factsError || contentsError;

  return (
    <SolarSystemContext.Provider
      value={{
        planets,
        quizQuestions,
        funFacts,
        exploreContents,
        selectedPlanet,
        setSelectedPlanet,
        isLoading,
        error: error as Error | null,
      }}
    >
      {children}
    </SolarSystemContext.Provider>
  );
}

export function useSolarSystem() {
  const context = useContext(SolarSystemContext);
  if (context === undefined) {
    throw new Error("useSolarSystem must be used within a SolarSystemProvider");
  }
  return context;
}
