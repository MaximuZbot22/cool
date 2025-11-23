import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Users, MapPin, Truck } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const About = () => {
  return (
    <section id="about" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            About Skyindia Mattress
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Since our establishment in Kodungallur, Kerala, we've been crafting premium mattresses 
            that combine traditional craftsmanship with modern comfort technology. As a factory-direct 
            manufacturer, we offer genuine quality at honest prices.
          </p>
        </motion.div>

        {/* Stacked scroll animation cards - unified for desktop and mobile */}
        <FeatureStack features={featuresData} />

        {/* Factory Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto bg-muted/30 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-light mb-6 text-center">
            Our Manufacturing Promise
          </h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our mattresses use <strong>breathable open-cell technology</strong> specifically designed 
              for Kerala's humid climate, ensuring you stay cool and comfortable throughout the night.
            </p>
            <p>
              As a <strong>factory-direct manufacturer</strong>, we cut out middlemen and retail markups, 
              offering you premium quality at significantly lower prices than branded showrooms.
            </p>
            <p>
              Every mattress is built to last with <strong>high-density foam and heat-tempered springs</strong>, 
              backed by our comprehensive warranty ranging from 2 to 7 years depending on the collection.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureStack = ({ features }: { features: typeof featuresData }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto min-h-[400px] md:min-h-[500px]">
      {features.map((feature, index) => {
        const offset = index * 12;
        const zIndex = features.length - index;

        // Subtle lift animation as you scroll
        const y = useTransform(
          scrollYProgress,
          [0, 1],
          [offset + 20, offset]
        );
        
        const opacity = useTransform(
          scrollYProgress,
          [0, 0.15 + index * 0.08, 0.25 + index * 0.08],
          [0, 1, 1]
        );

        return (
          <motion.div
            key={feature.title}
            style={{ y, opacity, zIndex }}
            className={cn(
              "absolute inset-x-0 mx-auto bg-card border border-border shadow-premium rounded-2xl p-5 md:p-6",
              "w-full max-w-sm md:max-w-lg"
            )}
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="text-left flex-1">
                <h3 className="text-base md:text-lg font-semibold mb-1 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const featuresData = [
  {
    icon: Award,
    title: "Factory Direct",
    description: "No middlemen means better prices and quality control"
  },
  {
    icon: Users,
    title: "Custom Sizes",
    description: "We craft mattresses in any size to fit your exact needs"
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Serving Kerala and beyond with dedicated after-sales support"
  },
  {
    icon: Truck,
    title: "2-7 Year Warranty",
    description: "Long-term warranties on all our mattress collections"
  }
];
