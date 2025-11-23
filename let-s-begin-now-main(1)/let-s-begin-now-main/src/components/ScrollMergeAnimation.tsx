import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import floatingGirl from "@/assets/floating-girl.png";
import mattress from "@/assets/mattress.png";

export const ScrollMergeAnimation = () => {
  // Desktop animation refs and transforms
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Girl fade-in & settle (0% → 30%)
  const girlOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const girlY = useTransform(scrollYProgress, [0, 0.3], [-150, 0]);

  // Phase 2: Mattress fade-in from bottom (30% → 70%)
  const mattressOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const mattressY = useTransform(scrollYProgress, [0, 0.7], [150, 0]);

  // Mobile animation refs and transforms
  const mobileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileRef,
    offset: ["start start", "end end"],
  });

  // Mobile Girl Animation
  const mobileGirlY = useTransform(mobileScrollProgress, [0, 0.3, 0.6, 1], ["-40%", "-12%", "4%", "6%"]);
  const mobileGirlOpacity = useTransform(mobileScrollProgress, [0, 0.15, 0.4], [0, 1, 1]);
  const mobileGirlScale = useTransform(mobileScrollProgress, [0, 0.4, 1], [0.8, 1, 1.02]);

  // Mobile Mattress Animation
  const mobileMattressY = useTransform(mobileScrollProgress, [0, 0.4, 0.8, 1], ["40%", "18%", "6%", "8%"]);
  const mobileMattressOpacity = useTransform(mobileScrollProgress, [0.1, 0.35, 1], [0, 1, 1]);
  const mobileMattressScale = useTransform(mobileScrollProgress, [0, 0.4, 1], [0.9, 1, 1.02]);

  // Subtle floating/bobbing effect
  const floatY = useTransform(mobileScrollProgress, [0.6, 0.8, 1], [0, -3, 0]);

  // Helper to combine scroll Y and float Y
  const combineY = (scrollY: MotionValue<string>, floatY: MotionValue<number>) => {
    return useTransform([scrollY, floatY], ([sy, fy]) => {
      return `calc(${sy} + ${fy}px)`;
    });
  };

  const processSteps = [
    {
      number: "01",
      title: "Material Selection",
      desc: "Premium natural materials sourced carefully",
    },
    {
      number: "02",
      title: "Layering & Assembly",
      desc: "Expert craftsmanship in every layer",
    },
    {
      number: "03",
      title: "Quality Inspection",
      desc: "Rigorous testing for your comfort",
    },
    {
      number: "04",
      title: "Finishing & Packaging",
      desc: "Ready to transform your sleep",
    },
  ];

  return (
    <>
      {/* Desktop / tablet version – keep exactly as is */}
      <section
        id="craftsmanship"
        ref={containerRef}
        className="hidden md:block relative h-[220vh] bg-gradient-to-br from-muted/15 via-background to-muted/10"
      >
      {/* Sticky container that pins the animation */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-muted/15 via-background to-muted/10">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Mattress - Bottom layer (z-10) */}
          <motion.div style={{ opacity: mattressOpacity, y: mattressY }} className="absolute z-10">
            <img
              src={mattress}
              alt="Skyindia Premium Mattress Collection - Factory Direct Pricing"
              className="w-[85%] max-w-[280px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[700px] mx-auto object-contain"
              loading="lazy"
            />
          </motion.div>

          {/* Girl - Middle layer (z-20) */}
          <motion.div style={{ opacity: girlOpacity, y: girlY }} className="absolute z-20">
            <img
              src={floatingGirl}
              alt="Perfect Sleep Experience with Skyindia Mattresses"
              className="w-[70%] max-w-[220px] sm:max-w-[300px] md:max-w-[450px] lg:max-w-[500px] mx-auto object-contain"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Text overlay - at the top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute top-20 left-0 right-0 text-center z-40 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            The Art of Perfect Sleep
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Where comfort, quality, and craftsmanship come together
          </p>
        </motion.div>
      </div>

        {/* Process steps - appears after animation */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent via-muted/60 to-muted py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center text-xl md:text-2xl font-light mx-auto mb-3 md:mb-4 shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="text-base md:text-xl font-semibold mb-2 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile version – new floating girl + mattress animation */}
      <section
        id="craftsmanship-mobile"
        ref={mobileRef}
        className="block md:hidden relative min-h-[160vh] bg-gradient-to-br from-muted/15 via-background to-muted/10 pb-12"
      >
        <div className="sticky top-20 h-auto py-8">
          {/* Heading */}
          <div className="max-w-sm mx-auto px-4 pt-8 text-center">
            <h2 className="text-3xl font-semibold mb-2 text-foreground">
              The Art of Perfect Sleep
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Where comfort, quality, and craftsmanship come together
            </p>
          </div>

          {/* Animation Container */}
          <div className="relative w-full h-[280px] flex items-center justify-center mb-16">
            {/* Mattress - Layer 1 (behind) */}
            <motion.img
              src={mattress}
              style={{
                y: combineY(mobileMattressY, floatY),
                opacity: mobileMattressOpacity,
                scale: mobileMattressScale,
              }}
              className="absolute z-10 w-[80%] max-w-xs mx-auto object-contain drop-shadow-xl"
              alt="Skyindia Premium Mattress Collection - Factory Direct Pricing"
              loading="lazy"
            />

            {/* Girl - Layer 2 (front) */}
            <motion.img
              src={floatingGirl}
              style={{
                y: combineY(mobileGirlY, floatY),
                opacity: mobileGirlOpacity,
                scale: mobileGirlScale,
              }}
              className="absolute z-20 w-[65%] max-w-xs mx-auto object-contain"
              alt="Perfect Sleep Experience with Skyindia Mattresses"
              loading="lazy"
            />
          </div>

          {/* Process Steps - 2x2 Grid */}
          <div className="max-w-xl mx-auto px-4 pb-12">
            <div className="mt-8 grid grid-cols-2 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center text-lg font-light mx-auto mb-3 shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="text-sm font-semibold mb-1 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
