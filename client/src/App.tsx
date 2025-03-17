import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PlanetPage from "@/pages/PlanetPage";
import QuizPage from "@/pages/QuizPage";
import ExplorePage from "@/pages/ExplorePage";
import { SolarSystemProvider } from "./contexts/SolarSystemContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/planet/:id" component={PlanetPage} />
      <Route path="/quiz" component={QuizPage} />
      <Route path="/explore" component={ExplorePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolarSystemProvider>
        <div className="min-h-screen flex flex-col bg-space-blue text-moon-gray stars">
          <Header />
          <div className="flex-grow">
            <Router />
          </div>
          <Footer />
        </div>
        <Toaster />
      </SolarSystemProvider>
    </QueryClientProvider>
  );
}

export default App;
