import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skyNimbus from "@/assets/skynimbus.png";
import skyOrtho from "@/assets/skyortho.png";
import skyStar from "@/assets/skystar.png";
import skyEco from "@/assets/skyeco.png";
import skyLite from "@/assets/skylite.png";
import skyPrime from "@/assets/skyprime.png";
import skySoft from "@/assets/skysoft.png";

// Coir mattress collection images
const mattressImages = [{
  id: 1,
  name: "SKY NIMBUS",
  image: skyNimbus
}, {
  id: 2,
  name: "SKY ECO",
  image: skyEco
}, {
  id: 3,
  name: "SKY LITE",
  image: skyLite
}, {
  id: 4,
  name: "SKY STAR",
  image: skyStar
}, {
  id: 5,
  name: "SKY ORTHO",
  image: skyOrtho
}, {
  id: 6,
  name: "SKY PRIME",
  image: skyPrime
}, {
  id: 7,
  name: "SKY SOFT",
  image: skySoft
}];
export const MattressCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 5000; // 5 seconds per slide

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, duration / 100);
    return () => clearInterval(progressInterval);
  }, []);
  useEffect(() => {
    if (progress >= 100) {
      setCurrentIndex(prev => (prev + 1) % mattressImages.length);
      setProgress(0);
    }
  }, [progress]);
  return <section className="py-12 md:py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Featured Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted mattresses designed for perfect sleep
          </p>
        </motion.div>

        <div className="relative">
          <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] relative rounded-2xl overflow-hidden shadow-premium">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex} initial={{
              opacity: 0,
              x: 100
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -100
            }} transition={{
              duration: 0.5
            }} className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-beige to-muted">
                <img 
                  src={mattressImages[currentIndex].image} 
                  alt={`Skyindia ${mattressImages[currentIndex].name} Coir Mattress - Orthopedic Support and Durability`}
                  className="max-h-full max-w-full object-contain" 
                  loading="lazy" 
                />
                <div className="absolute bottom-8 left-8 bg-beige/90 backdrop-blur px-6 py-3 rounded-full">
                  <p className="font-semibold text-lg">
                    {mattressImages[currentIndex].name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress indicators */}
          <div className="flex gap-2 mt-6 justify-center">
            {mattressImages.map((_, index) => <button key={index} onClick={() => {
            setCurrentIndex(index);
            setProgress(0);
          }} className="relative h-1 bg-border rounded-full overflow-hidden" style={{
            width: `${100 / mattressImages.length}%`
          }}>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary" initial={{
              scaleX: 0
            }} animate={{
              scaleX: currentIndex === index ? progress / 100 : 0
            }} style={{
              transformOrigin: "left"
            }} />
              </button>)}
          </div>

          {/* Thumbnail navigation */}
          <div className="gap-3 sm:gap-4 mt-6 sm:mt-8 overflow-x-auto pb-4 flex-row flex items-start justify-center py-[5px]">
            {mattressImages.map((item, index) => <button key={item.id} onClick={() => {
            setCurrentIndex(index);
            setProgress(0);
          }} className={`flex-shrink-0 w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden border-2 transition-all ${currentIndex === index ? "border-primary shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <img 
                  src={item.image} 
                  alt={`Skyindia ${item.name} Coir Mattress - Premium Quality`}
                  className="w-full h-full object-contain p-2" 
                  loading="lazy" 
                />
              </button>)}
          </div>
        </div>
      </div>
    </section>;
};