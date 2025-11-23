import { useState, useEffect } from "react";
import { Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/skyindia-logo.png";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 border-b border-border shadow-sm backdrop-blur-md" : "bg-background/80 border-b border-transparent backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Skyindia Mattress" className="h-10 md:h-12" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("collections")}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Collections
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => scrollToSection("collections")}
                  className="text-left py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-medium"
                >
                  Collections
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-medium"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors font-medium"
                >
                  Contact
                </button>
                <Button
                  onClick={() => {
                    setIsMenuOpen(false);
                    window.open("tel:+918431607046");
                  }}
                  className="w-full bg-gradient-to-r from-primary to-accent text-white mt-4"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Call Button */}
        <Button
          onClick={() => window.open("tel:+918431607046")}
          className="hidden md:flex bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-opacity"
          aria-label="Call Skyindia Mattress at 8431607046"
        >
          <Phone className="w-4 h-4 mr-2" />
          8431607046
        </Button>
      </div>
    </header>
  );
};
