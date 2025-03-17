import IntroSection from "@/components/IntroSection";
import SolarSystemViewer from "@/components/SolarSystemViewer";
import PlanetDetail from "@/components/PlanetDetail";
import FunFactsSection from "@/components/FunFactsSection";
import QuizSection from "@/components/QuizSection";
import ExploreMoreSection from "@/components/ExploreMoreSection";
import { useSolarSystem } from "@/contexts/SolarSystemContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { isLoading, error } = useSolarSystem();

  if (error) {
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="bg-mars-red/20 border border-mars-red rounded-lg p-4 mb-8">
          <h2 className="text-mars-red font-bold text-lg mb-2">Error Loading Data</h2>
          <p className="text-moon-gray">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <IntroSection />
      
      {isLoading ? (
        <>
          <Skeleton className="h-96 w-full rounded-xl mb-12" />
          <Skeleton className="h-64 w-full rounded-xl mb-12" />
          <Skeleton className="h-48 w-full rounded-xl mb-12" />
        </>
      ) : (
        <>
          <SolarSystemViewer />
          <PlanetDetail />
          <FunFactsSection />
          <QuizSection />
          <ExploreMoreSection />
        </>
      )}
    </main>
  );
}
