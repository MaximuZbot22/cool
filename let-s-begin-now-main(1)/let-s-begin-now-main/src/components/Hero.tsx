import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  const scrollToCollections = () => {
    const element = document.getElementById("collections");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 1px, transparent 1px, transparent 20px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/10 via-transparent to-muted/10" />

      {/* Fabric/linen texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "4px 4px",
        }}
      />

      {/* Floating decorative elements - Crescent Moon */}
      <motion.div
        className="absolute top-20 right-4 sm:right-10 opacity-10 w-10 h-10 sm:w-20 sm:h-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 15 A25 25 0 0 0 30 65 A20 20 0 0 1 30 15"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </motion.div>

      {/* Floating decorative elements - Stars */}
      <motion.div
        className="absolute top-32 sm:top-40 right-1/4 opacity-8 w-12 h-12 sm:w-16 sm:h-16 hidden sm:block"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 20 L27 26 L33 26 L28 30 L30 36 L25 32 L20 36 L22 30 L17 26 L23 26 Z"
            fill="currentColor"
            className="text-muted-foreground"
          />
          <path
            d="M45 30 L46.5 34 L50.5 34 L47 37 L48.5 41 L45 38 L41.5 41 L43 37 L39.5 34 L43.5 34 Z"
            fill="currentColor"
            className="text-muted-foreground"
          />
          <path
            d="M35 45 L36.5 49 L40.5 49 L37 52 L38.5 56 L35 53 L31.5 56 L33 52 L29.5 49 L33.5 49 Z"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </motion.div>

      {/* Floating decorative elements - Cloud */}
      <motion.div
        className="absolute top-24 sm:top-32 left-4 sm:left-10 opacity-8 w-16 h-10 sm:w-24 sm:h-14 hidden sm:block"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 40 Q20 30 30 30 Q30 20 40 20 Q50 20 50 30 Q60 30 70 30 Q80 30 80 40 Q80 50 70 50 L30 50 Q20 50 20 40"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8"
        >
          <div className="inline-block">
            <span className="px-5 py-2 bg-muted/40 border border-border rounded-full text-xs font-medium tracking-wide text-foreground uppercase">
              ⭐ Handcrafted in Kerala, Kodungallur
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight">
            <span className="block text-foreground">Premium Mattresses</span>
            <span className="block text-foreground">in Kodungallur</span>
            <span className="block text-gradient-primary mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Latex, Foam & Coir Collections
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Experience the perfect harmony of nature and innovation. Each mattress is a
            masterpiece, handcrafted for your ultimate comfort.{" "}
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-primary hover:underline"
            >
              Learn about our process
            </a>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              onClick={scrollToCollections}
              className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90 shadow-premium"
            >
              Explore Collections
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("https://wa.me/918431607046", "_blank")}
              aria-label="Chat with us on WhatsApp"
              className="w-full sm:w-auto border-border text-foreground hover:bg-muted"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Book a Visit
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-sm text-muted-foreground">SCROLL</span>
        <ChevronDown className="w-5 h-5 text-primary" />
      </motion.div>
    </section>
  );
};

// Missing import component
const MessageCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
