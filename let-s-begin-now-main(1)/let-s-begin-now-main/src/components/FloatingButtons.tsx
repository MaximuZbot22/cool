import { useState, useEffect } from "react";
import { MessageCircle, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="hidden sm:flex fixed bottom-6 right-6 flex-col gap-3 z-50">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={scrollToTop}
            className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-premium hover:shadow-premium-lg transition-shadow"
            aria-label="Scroll back to top"
          >
            <ChevronUp className="w-6 h-6 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/918431607046"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="w-14 h-14 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-premium hover:shadow-premium-lg transition-shadow relative"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <motion.div
          className="absolute inset-0 rounded-full bg-primary opacity-75"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeOut",
          }}
        />
      </motion.a>
    </div>
  );
};
