import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useSolarSystem } from "@/contexts/SolarSystemContext";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function QuizPage() {
  const { quizQuestions, planets, isLoading } = useSolarSystem();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questionsShuffled, setQuestionsShuffled] = useState<typeof quizQuestions>([]);
  const { toast } = useToast();

  // Shuffle questions when component loads
  useEffect(() => {
    if (quizQuestions.length > 0 && questionsShuffled.length === 0) {
      setQuestionsShuffled([...quizQuestions].sort(() => Math.random() - 0.5));
    }
  }, [quizQuestions, questionsShuffled.length]);

  const currentQuestion = questionsShuffled[currentQuestionIndex];
  const progress = quizQuestions.length > 0 
    ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 
    : 0;

  const handleSelectAnswer = (optionId: number) => {
    if (selectedAnswerId !== null) return; // Prevent changing answer after selection
    
    setSelectedAnswerId(optionId);
    
    if (currentQuestion && optionId === currentQuestion.correctOptionId) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "You got it right!",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "That's not the right answer.",
        variant: "destructive",
      });
    }
    
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsShuffled.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerId(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerId(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
    setQuestionsShuffled([...quizQuestions].sort(() => Math.random() - 0.5));
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-orbitron text-star-white text-3xl">Cosmic Quiz Challenge</h1>
          <Link href="/">
            <a className="text-moon-gray hover:text-star-white transition-colors flex items-center">
              <i className="ri-home-line mr-1"></i> Back to Home
            </a>
          </Link>
        </div>
        
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-cosmic-purple rounded-full border-t-transparent"></div>
        </div>
      </main>
    );
  }

  if (quizCompleted) {
    const percentageScore = Math.round((score / questionsShuffled.length) * 100);
    
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-orbitron text-star-white text-3xl">Quiz Results</h1>
          <Link href="/">
            <a className="text-moon-gray hover:text-star-white transition-colors flex items-center">
              <i className="ri-home-line mr-1"></i> Back to Home
            </a>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-space-blue/40 border border-cosmic-purple/30 mb-8">
            <CardHeader className="text-center">
              <CardTitle className="font-orbitron text-2xl text-star-white">
                {percentageScore >= 70 
                  ? "Congratulations, Space Explorer!" 
                  : "Nice Try, Cosmic Traveler!"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6 relative">
                <Progress value={percentageScore} className="h-4" />
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-7 text-star-white font-bold">
                  {percentageScore}%
                </span>
              </div>
              
              <p className="text-xl mb-2 text-star-white">
                You scored {score} out of {questionsShuffled.length}
              </p>
              
              <p className="text-moon-gray mb-6">
                {percentageScore >= 90 
                  ? "Amazing! You're a true astronomer!" 
                  : percentageScore >= 70 
                    ? "Great job! You know quite a bit about our solar system." 
                    : percentageScore >= 50 
                      ? "Good effort! Keep exploring the cosmos." 
                      : "There's a universe of knowledge waiting for you!"}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-mars-red hover:bg-mars-red/80 text-star-white"
                  onClick={restartQuiz}
                >
                  <i className="ri-restart-line mr-2"></i> Try Again
                </Button>
                <Link href="/">
                  <Button variant="outline" className="text-moon-gray">
                    <i className="ri-home-line mr-2"></i> Return Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {planets.slice(0, 3).map(planet => (
              <Link key={planet.id} href={`/planet/${planet.id}`}>
                <a className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-4 hover:border-saturn-gold transition-colors group">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full mr-3" style={{ backgroundColor: planet.color }}></div>
                    <h4 className="font-montserrat text-star-white group-hover:text-saturn-gold transition-colors">{planet.name}</h4>
                  </div>
                  <p className="text-moon-gray text-sm mb-3">Learn more about this fascinating planet</p>
                  <p className="text-saturn-gold text-sm flex items-center">
                    Explore <i className="ri-arrow-right-line ml-1"></i>
                  </p>
                </a>
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-orbitron text-star-white text-3xl">Cosmic Quiz Challenge</h1>
          <Link href="/">
            <a className="text-moon-gray hover:text-star-white transition-colors flex items-center">
              <i className="ri-home-line mr-1"></i> Back to Home
            </a>
          </Link>
        </div>
        
        <Card className="bg-space-blue/40 border border-cosmic-purple/30">
          <CardContent className="pt-6">
            <p className="text-center text-moon-gray">No quiz questions available.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-orbitron text-star-white text-3xl">Cosmic Quiz Challenge</h1>
        <Link href="/">
          <a className="text-moon-gray hover:text-star-white transition-colors flex items-center">
            <i className="ri-home-line mr-1"></i> Back to Home
          </a>
        </Link>
      </div>
      
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-moon-gray text-sm mt-2">
          <span>Question {currentQuestionIndex + 1} of {questionsShuffled.length}</span>
          <span>Score: {score}</span>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-space-blue/40 border border-cosmic-purple/30 mb-8">
            <CardHeader>
              <CardTitle className="font-montserrat text-xl text-star-white">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button 
                    key={option.id}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedAnswerId === null
                        ? "bg-space-blue/60 hover:bg-cosmic-purple/30 border border-cosmic-purple/20"
                        : selectedAnswerId === option.id
                          ? option.id === currentQuestion.correctOptionId
                            ? "bg-green-500/20 border border-green-500" // Correct answer
                            : "bg-mars-red/20 border border-mars-red" // Wrong answer
                          : option.id === currentQuestion.correctOptionId
                            ? "bg-green-500/20 border border-green-500" // Show correct answer
                            : "bg-space-blue/60 border border-cosmic-purple/20 opacity-60" // Other answers
                    }`}
                    onClick={() => handleSelectAnswer(option.id)}
                    disabled={selectedAnswerId !== null}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
              
              {showExplanation && (
                <motion.div 
                  className="mt-6 p-4 bg-cosmic-purple/20 border border-cosmic-purple/40 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-star-white font-medium mb-2">Explanation:</h4>
                  <p className="text-moon-gray">{currentQuestion.explanation}</p>
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="justify-between">
              <Button 
                variant="outline" 
                className="text-moon-gray"
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
              >
                <i className="ri-arrow-left-line mr-1"></i> Previous
              </Button>
              
              <Button 
                className="bg-mars-red hover:bg-mars-red/80 text-star-white"
                onClick={handleNextQuestion}
                disabled={selectedAnswerId === null}
              >
                {currentQuestionIndex < questionsShuffled.length - 1 ? (
                  <>Next <i className="ri-arrow-right-line ml-1"></i></>
                ) : (
                  <>Finish Quiz <i className="ri-check-line ml-1"></i></>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      <div className="bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-6">
        <h3 className="font-orbitron text-star-white text-xl mb-4">Quiz Tips</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <i className="ri-star-line text-saturn-gold mt-1 mr-2"></i>
            <span className="text-moon-gray">Read each question carefully before selecting your answer.</span>
          </li>
          <li className="flex items-start">
            <i className="ri-star-line text-saturn-gold mt-1 mr-2"></i>
            <span className="text-moon-gray">Take your time - there's no rush to complete the quiz.</span>
          </li>
          <li className="flex items-start">
            <i className="ri-star-line text-saturn-gold mt-1 mr-2"></i>
            <span className="text-moon-gray">Learn from the explanations to deepen your space knowledge.</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
