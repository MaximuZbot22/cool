import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for your enquiry!",
      description: "We'll get back to you soon.",
    });
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-foreground">
            Visit Our Showroom or Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience our mattresses in person or reach out to us
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <a
                  href="tel:+918431607046"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl hover:bg-muted transition-colors group border border-border shadow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call us</p>
                    <p className="text-lg font-semibold group-hover:text-primary transition-colors">
                      +91-8431607046
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/918431607046"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl hover:bg-muted transition-colors group border border-border shadow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white shadow-sm">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p className="text-lg font-semibold group-hover:text-primary transition-colors">
                      Chat with us
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.google.com/maps?vet=10CAAQoqAOahcKEwjo9o6o94GRAxUAAAAAHQAAAAAQBg..i&client=firefox-b-d&pvq=Cg0vZy8xMXE5NG5yMDJoIhcKEXNreWluZGlhIG1hdHRyZXNzEAIYAw&lqi=ChFza3lpbmRpYSBtYXR0cmVzc0jPgK7KpLaAgAhaGxAAEAEYABgBIhFza3lpbmRpYSBtYXR0cmVzc5IBDm1hdHRyZXNzX3N0b3JlqgFUCg0vZy8xMXE5NG5yMDJoCgkvbS8wM2RnOGoQATIfEAEiGw27FMUpt1U5UV9Wlq-UP5C7Y0ezHY1WNhurLTIVEAIiEXNreWluZGlhIG1hdHRyZXNz&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3b081b6598c18cf3:0x7d65171e696be043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl hover:bg-muted transition-colors group border border-border shadow-sm"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Visit us</p>
                    <p className="text-lg font-semibold group-hover:text-primary transition-colors">
                      Kodungallur, Kerala
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-primary/10 rounded-2xl p-6 border border-primary/20">
              <h4 className="font-semibold text-lg mb-2">Why Visit Our Showroom?</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Try mattresses before deciding</li>
                <li>• Get expert recommendations</li>
                <li>• Custom sizes available</li>
                <li>• Special showroom offers</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="border-border focus:border-primary"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone *
                </label>
                <Input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Your phone number"
                  className="border-border focus:border-primary"
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email (optional)
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Your email"
                  className="border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message / Enquiry
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your requirements..."
                  rows={5}
                  className="border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-premium"
              >
                Send Enquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
