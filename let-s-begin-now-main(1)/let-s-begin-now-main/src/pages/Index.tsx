import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { MattressCarousel } from "@/components/MattressCarousel";
import { MattressFinderQuiz } from "@/components/MattressFinderQuiz";
import { ProductCollections } from "@/components/ProductCollections";
import { ScrollMergeAnimation } from "@/components/ScrollMergeAnimation";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <MattressCarousel />
      <MattressFinderQuiz />
      <ProductCollections />
      <ScrollMergeAnimation />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
