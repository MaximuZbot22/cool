import { Phone, MessageCircle, MapPin } from "lucide-react";
import logo from "@/assets/skyindia-logo.png";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img src={logo} alt="Skyindia Mattress" className="h-12 mb-4 brightness-0 invert" />
            <p className="text-white/80 text-sm">
              Where dreams meet craftsmanship
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("collections")}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Collections
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                About Us
              </button>
              <button
                onClick={() => scrollToSection("mattress-finder")}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Mattress Finder
              </button>
              <button
                onClick={() => scrollToSection("craftsmanship")}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Craftsmanship
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block text-white/80 hover:text-white transition-colors text-sm"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+918431607046"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
                aria-label="Call us at +91-8431607046"
              >
                <Phone className="w-4 h-4" />
                +91-8431607046
              </a>
              <a
                href="https://wa.me/918431607046"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4" />
                Kodungallur, Kerala
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/70 text-sm">
          <p>© 2024 Skyindia Mattress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
