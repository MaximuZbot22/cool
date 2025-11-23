import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Phone, MapPin, Check, ArrowLeft } from "lucide-react";
import { 
  findProductBySlug, 
  getProductImage, 
  getRelatedProducts, 
  productToSlug,
  getProductAlt,
  type Category 
} from "@/data/products";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = slug ? findProductBySlug(slug) : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-serif mb-4 text-foreground">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            We couldn't find the mattress you're looking for.
          </p>
          <Button onClick={() => navigate("/#collections")} variant="default">
            Back to Collections
          </Button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "coir":
        return "bg-primary/10 text-primary border-primary/20";
      case "spring":
        return "bg-secondary/10 text-secondary-foreground border-secondary/20";
      case "foam":
        return "bg-accent/10 text-accent-foreground border-accent/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const relatedProducts = getRelatedProducts(product);

  const handleBackClick = () => {
    const hasHistory = window.history.length > 1;
    const cameFromSite = document.referrer.includes(window.location.hostname);
    
    if (hasHistory && cameFromSite) {
      navigate(-1);
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/10 to-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
        {/* Back Button */}
        <Button 
          variant="outline" 
          className="mb-6 sm:mb-8 border-border hover:bg-muted"
          onClick={handleBackClick}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Collections
        </Button>

        {/* Product Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-premium"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-12">
            {/* Left Column: Image */}
            <div className="space-y-4">
              <Badge className={getCategoryColor(product.category)}>
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Collection
              </Badge>
              
              <div className="w-full aspect-square sm:aspect-[4/3] bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl p-4 sm:p-8 flex items-center justify-center">
                <img
                  src={getProductImage(product.name)}
                  alt={getProductAlt(product)}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-4 text-foreground">
                  {product.name}
                </h1>
                <p className="text-lg sm:text-xl text-primary mb-4">{product.positioning}</p>
              </div>

              {/* Warranty & Firmness Box */}
              <div className="bg-muted/30 rounded-xl p-6 border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Warranty</span>
                  <span className="font-semibold text-foreground">{product.warranty} months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Firmness</span>
                  <Badge variant="outline">{product.firmness}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price Range</span>
                  <Badge variant="outline">{product.priceRange}</Badge>
                </div>
              </div>

              {/* Description (if available) */}
              {product.description && (
                <div className="prose prose-sm">
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability Notice */}
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <p className="text-sm text-foreground">
                  <strong>Visit our showroom</strong> in Kodungallur to experience this mattress in person. 
                  Custom sizes available on request.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-accent text-white shadow-premium"
                  onClick={() => window.open("tel:+918431607046")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/5"
                  onClick={() => window.open("https://www.google.com/maps?vet=10CAAQoqAOahcKEwjo9o6o94GRAxUAAAAAHQAAAAAQBg..i&client=firefox-b-d&pvq=Cg0vZy8xMXE5NG5yMDJoIhcKEXNreWluZGlhIG1hdHRyZXNzEAIYAw&lqi=ChFza3lpbmRpYSBtYXR0cmVzc0jPgK7KpLaAgAhaGxAAEAEYABgBIhFza3lpbmRpYSBtYXR0cmVzc5IBDm1hdHRyZXNzX3N0b3JlqgFUCg0vZy8xMXE5NG5yMDJoCgkvbS8wM2RnOGoQATIfEAEiGw27FMUpt1U5UV9Wlq-UP5C7Y0ezHY1WNhurLTIVEAIiEXNreWluZGlhIG1hdHRyZXNz&fvr=1&cs=1&um=1&ie=UTF-8&fb=1&gl=in&sa=X&ftid=0x3b081b6598c18cf3:0x7d65171e696be043", "_blank")}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Visit Store
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-serif text-foreground">
                More from {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Collection
              </h2>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {relatedProducts.length} products
              </Badge>
            </div>

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {relatedProducts.map((relatedProduct, i) => (
                  <CarouselItem 
                    key={i} 
                    className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <button
                      onClick={() => navigate(`/products/${productToSlug(relatedProduct.name)}`)}
                      className="w-full border border-border rounded-xl p-4 hover:border-primary hover:shadow-premium transition-all text-left bg-card hover:bg-muted/30 h-full"
                    >
                      <div className="bg-muted/20 rounded-lg p-3 mb-3">
                        <img
                          src={getProductImage(relatedProduct.name)}
                          alt={getProductAlt(relatedProduct)}
                          className="w-full h-32 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <p className="font-semibold text-sm text-foreground mb-1">
                        {relatedProduct.name}
                      </p>
                      <p className="text-xs text-primary line-clamp-2 mb-2">
                        {relatedProduct.positioning}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {relatedProduct.firmness}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {relatedProduct.warranty}mo
                        </Badge>
                      </div>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 -translate-x-12 hidden lg:flex" />
              <CarouselNext className="right-0 translate-x-12 hidden lg:flex" />
            </Carousel>
          </motion.div>
        )}
      </div>
    </div>
  );
}
