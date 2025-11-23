import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Phone, MessageSquare, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import skyindiaLogo from "@/assets/skyindia-logo.png";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img 
            src={skyindiaLogo} 
            alt="Skyindia Mattress" 
            className="h-16 mx-auto mb-6"
          />
        </motion.div>

        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let us help you find the perfect mattress instead.
          </p>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent text-white shadow-premium"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
          
          <Button
            onClick={() => scrollToSection("collections")}
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Browse Collections
          </Button>
        </motion.div>

        {/* Quick Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-border/50"
        >
          <p className="text-sm text-muted-foreground">Need immediate help?</p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = "tel:8431607046"}
              className="gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("https://wa.me/918431607046", "_blank")}
              className="gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
