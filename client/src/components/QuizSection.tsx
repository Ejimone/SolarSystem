import { useState } from "react";
import { Link } from "wouter";
import { useSolarSystem } from "@/contexts/SolarSystemContext";
import { motion } from "framer-motion";

export default function QuizSection() {
  const { quizQuestions, isLoading } = useSolarSystem();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  if (isLoading || !quizQuestions.length) {
    return (
      <section className="mb-12 bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-orbitron text-star-white text-2xl">Test Your Knowledge</h3>
          <span className="bg-cosmic-purple/30 text-star-white px-3 py-1 rounded-full text-sm">Loading...</span>
        </div>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-cosmic-purple rounded-full border-t-transparent"></div>
        </div>
      </section>
    );
  }

  const question = quizQuestions[currentQuestion];
  
  const handleSelectAnswer = (optionId: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer after selection
    
    setSelectedAnswer(optionId);
    if (optionId === question.correctOptionId) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz finished
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <motion.section 
      className="mb-12 bg-space-blue/40 border border-cosmic-purple/30 rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-orbitron text-star-white text-2xl">Test Your Knowledge</h3>
        <span className="bg-cosmic-purple/30 text-star-white px-3 py-1 rounded-full text-sm">
          {quizQuestions.length} Questions
        </span>
      </div>
      
      <div className="mb-6">
        <p className="text-moon-gray mb-2">Question {currentQuestion + 1} of {quizQuestions.length}</p>
        <h4 className="font-montserrat text-star-white text-xl mb-4">{question.question}</h4>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <button 
              key={option.id}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                selectedAnswer === null
                  ? "bg-space-blue/60 hover:bg-cosmic-purple/30 border border-cosmic-purple/20"
                  : selectedAnswer === option.id
                    ? option.id === question.correctOptionId
                      ? "bg-green-500/20 border border-green-500" // Correct answer
                      : "bg-mars-red/20 border border-mars-red" // Wrong answer
                    : option.id === question.correctOptionId
                      ? "bg-green-500/20 border border-green-500" // Show correct answer
                      : "bg-space-blue/60 border border-cosmic-purple/20 opacity-60" // Other answers
              }`}
              onClick={() => handleSelectAnswer(option.id)}
              disabled={selectedAnswer !== null}
            >
              {option.text}
            </button>
          ))}
        </div>
        
        {showExplanation && (
          <motion.div 
            className="mt-4 p-4 bg-cosmic-purple/20 border border-cosmic-purple/40 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-moon-gray">{question.explanation}</p>
          </motion.div>
        )}
      </div>
      
      <div className="flex justify-between">
        <button 
          className="bg-space-blue/60 text-moon-gray font-montserrat px-5 py-2 rounded-full transition-colors disabled:opacity-50"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        
        {currentQuestion < quizQuestions.length - 1 ? (
          <button 
            className="bg-mars-red hover:bg-mars-red/80 text-star-white font-montserrat px-5 py-2 rounded-full transition-colors"
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            Next Question
          </button>
        ) : (
          <Link href="/quiz">
            <a className="bg-cosmic-purple hover:bg-cosmic-purple/80 text-star-white font-montserrat px-5 py-2 rounded-full transition-colors">
              See Full Quiz
            </a>
          </Link>
        )}
      </div>
    </motion.section>
  );
}
