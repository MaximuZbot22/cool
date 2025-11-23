import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Bed, Heart, CircleDot, DollarSign, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
type Answer = string;
interface QuizState {
  sleepPosition: Answer;
  priority: Answer;
  firmness: Answer;
  budget: Answer;
}
interface Recommendation {
  emoji: string;
  title: string;
  category: string;
  description: string;
  models: string[];
}
const questions = [{
  id: "sleepPosition",
  label: "FIND YOUR PERFECT MATCH",
  question: "What is your preferred sleep position?",
  icon: Bed,
  options: ["Side Sleeper", "Back Sleeper", "Stomach Sleeper", "Combination Sleeper"]
}, {
  id: "priority",
  label: "SLEEP PRIORITY",
  question: "What matters most in your new mattress?",
  icon: Heart,
  options: ["Back / neck pain relief (orthopedic support)", "Everyday comfort for the whole family", "Soft, plush 'cloud-like' feel", "Hotel-style bouncy feel"]
}, {
  id: "firmness",
  label: "COMFORT FEEL",
  question: "What firmness level do you prefer?",
  icon: CircleDot,
  options: ["Soft & Plush", "Medium", "Firm", "Extra Firm"]
}, {
  id: "budget",
  label: "BUDGET RANGE",
  question: "What is your budget range?",
  icon: DollarSign,
  options: ["Budget-Friendly", "Mid-Range", "Premium", "Luxury"]
}];
const getRecommendation = (answers: QuizState): Recommendation => {
  const {
    sleepPosition,
    priority,
    firmness,
    budget
  } = answers;

  // Determine base type
  let baseType = "EVERYDAY";
  let category = "Coir Mattresses";
  let models: string[] = [];

  // Rule A1 - Orthopedic / pain focus
  if (priority === "Back / neck pain relief (orthopedic support)" || (sleepPosition === "Back Sleeper" || sleepPosition === "Stomach Sleeper") && (firmness === "Firm" || firmness === "Extra Firm")) {
    baseType = "ORTHO";
    category = "Coir Mattresses";
    if (budget === "Budget-Friendly" || budget === "Mid-Range") {
      models = ["SKY ORTHO", "SKY PRIME"];
    } else if (firmness === "Firm" || firmness === "Extra Firm") {
      models = ["SKY ORTHO", "SKY NIMBUS"];
    } else {
      models = ["SKY STAR", "SKY NIMBUS"];
    }
  }
  // Rule A2 - Soft & plush focus
  else if (priority === "Soft, plush 'cloud-like' feel" || (sleepPosition === "Side Sleeper" || sleepPosition === "Combination Sleeper") && firmness === "Soft & Plush") {
    baseType = "PLUSH";
    category = "Foam Mattresses";
    if (budget === "Budget-Friendly") {
      models = ["SKY PETAL", "SKY ECO BOND"];
    } else if (budget === "Mid-Range") {
      models = ["SKY DAISY", "SKY ROSE"];
    } else if (budget === "Premium") {
      models = ["SKY IRIS", "SKY SOFT"];
    } else {
      models = ["SKY LATEX BLISS", "SKY NIMBUS"];
    }
  }
  // Rule A3 - Hotel feel / bouncy
  else if (priority === "Hotel-style bouncy feel" || firmness === "Medium" && sleepPosition === "Combination Sleeper") {
    baseType = "SPRING";
    category = "Spring Mattresses";
    if (budget === "Budget-Friendly") {
      models = ["SKY SAPPHIRE", "SKY EMERALD"];
    } else if (budget === "Mid-Range") {
      models = ["SKY RUBY", "SKY OPAL"];
    } else if (budget === "Premium") {
      models = ["SKY LUXURY", "SKY PARADISE"];
    } else {
      models = ["SKY ECSTASY", "SKY HOTEL SERIES"];
    }
  }
  // Rule A4 - Family / everyday use
  else if (priority === "Everyday comfort for the whole family") {
    baseType = "EVERYDAY";
    if (budget === "Budget-Friendly") {
      category = "Coir Mattresses";
      models = ["SKY LITE", "SKY ECO"];
    } else if (budget === "Mid-Range") {
      category = "Coir Mattresses";
      models = ["SKY PRIME", "SKY SAPPHIRE"];
    } else if (budget === "Premium") {
      category = "Spring Mattresses";
      models = ["SKY STAR", "SKY LUXURY"];
    } else {
      category = "Spring Mattresses";
      models = ["SKY NIMBUS", "SKY ECSTASY"];
    }
  }

  // Generate description based on baseType
  const descriptions = {
    ORTHO: "Based on your needs, we recommend our orthopedic support mattresses that provide firm support and spine alignment for pain relief.",
    PLUSH: "Based on your preferences, we recommend our plush foam mattresses that offer soft, cloud-like comfort with excellent pressure relief.",
    SPRING: "Based on your preferences, we recommend our spring mattresses that provide responsive, bouncy support with hotel-quality comfort.",
    EVERYDAY: "Based on your needs, we recommend our balanced mattresses that offer reliable comfort for everyday family use."
  };
  const emojis = {
    ORTHO: "🌿",
    PLUSH: "☁️",
    SPRING: "⚡",
    EVERYDAY: "🏠"
  };
  const titles = {
    ORTHO: "Orthopedic Support",
    PLUSH: "Plush Cloud Comfort",
    SPRING: "Responsive & Bouncy",
    EVERYDAY: "Everyday Comfort"
  };
  return {
    emoji: emojis[baseType as keyof typeof emojis],
    title: titles[baseType as keyof typeof titles],
    category,
    description: descriptions[baseType as keyof typeof descriptions],
    models
  };
};
export const MattressFinderQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizState>>({});
  const [showResult, setShowResult] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const currentQuestion = questions[currentStep];
  const progress = (currentStep + 1) / questions.length * 100;
  const handleAnswer = (answer: string) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answer
    };
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      // All questions answered, show result
      const result = getRecommendation(newAnswers as QuizState);
      setRecommendation(result);
      setTimeout(() => {
        setShowResult(true);
      }, 300);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleRetake = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setRecommendation(null);
  };
  const handleViewCollection = () => {
    // Scroll to collections section
    const element = document.getElementById("collections");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  const IconComponent = currentQuestion?.icon || HelpCircle;
  return <section id="mattress-finder" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wide">
              FIND YOUR PERFECT MATCH
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-foreground">
            Not Sure Which Mattress to Choose?
          </h2>
          <p className="text-lg text-muted-foreground">
            Take our quick quiz and we'll recommend the perfect mattress for your needs
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? <motion.div key={currentStep} initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="bg-card rounded-2xl p-6 sm:p-8 md:p-12 shadow-premium border border-border">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">{currentQuestion.question}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {currentQuestion.options.map((option, index) => <motion.button key={index} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={() => handleAnswer(option)} className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left ${answers[currentQuestion.id as keyof QuizState] === option ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"}`}>
                    <span className="font-medium text-foreground">{option}</span>
                  </motion.button>)}
              </div>

              {currentStep > 0 && <Button variant="outline" onClick={handleBack} className="border-primary text-primary hover:bg-primary hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>}
            </motion.div> : <motion.div key="result" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="bg-card rounded-2xl p-6 sm:p-8 md:p-12 shadow-premium border border-border text-center">
              <div className="text-6xl mb-6">{recommendation?.emoji}</div>
              
              <h3 className="text-3xl md:text-4xl font-light mb-2">We Recommend</h3>
              <h4 className="text-2xl font-semibold text-primary mb-4">{recommendation?.title}</h4>
              
              <div className="max-w-2xl mx-auto mb-8">
                <Badge className="mb-4 text-base px-4 py-1">
                  {recommendation?.category}
                </Badge>
                <p className="text-lg text-muted-foreground">
                  {recommendation?.description}
                </p>
              </div>

              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-3">Suggested Models:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {recommendation?.models.map((model, i) => <Badge key={i} variant="secondary" className="text-sm px-4 py-2">
                      {model}
                    </Badge>)}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleViewCollection} className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
                  View Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={handleRetake} className="border-primary text-primary hover:bg-primary hover:text-white">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </section>;
};