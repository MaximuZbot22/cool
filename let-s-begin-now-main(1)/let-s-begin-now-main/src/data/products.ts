// Coir collection images
import skyNimbus from "@/assets/skynimbus.png";
import skyOrtho from "@/assets/skyortho.png";
import skyStar from "@/assets/skystar.png";
import skyEco from "@/assets/skyeco.png";
import skyLite from "@/assets/skylite.png";
import skyPrime from "@/assets/skyprime.png";
import skySoft from "@/assets/skysoft.png";

// Spring collection images
import skySapphire from "@/assets/skysapphire.png";
import skyEmerald from "@/assets/sky-emerald.png";
import skyRuby from "@/assets/skyruby.png";
import skyOpal from "@/assets/skyopal.png";
import skyLuxury from "@/assets/sky-luxury.png";
import skyParadise from "@/assets/sky-paradise.png";
import skyEcstasy from "@/assets/sky-ecstasy.png";
import skyHotelSeries from "@/assets/sky-hotel-series.png";

// Foam collection images
import skyPetal from "@/assets/sky-petal.png";
import skyRose from "@/assets/sky-rose.png";
import skyDaisy from "@/assets/sky-daisy.png";
import skyEcoBond from "@/assets/sky-eco-bond.png";
import skyIris from "@/assets/sky-iris.png";
import skyLatexBliss from "@/assets/sky-latex-bliss.png";

import mattress from "@/assets/mattress.png"; // Fallback

export type FirmnessLevel = "Soft" | "Medium" | "Firm";
export type PriceRange = "Budget" | "Mid-Range" | "Premium" | "Luxury";
export type Category = "coir" | "spring" | "foam";

export interface Product {
  name: string;
  features: string[];
  warranty: number;
  positioning: string;
  firmness: FirmnessLevel;
  priceRange: PriceRange;
  description?: string;
}

// Map product names to their images
const productImages: Record<string, string> = {
  // Coir collection
  "SKY NIMBUS": skyNimbus,
  "SKY ORTHO": skyOrtho,
  "SKY STAR": skyStar,
  "SKY ECO": skyEco,
  "SKY LITE": skyLite,
  "SKY PRIME": skyPrime,
  "SKY SOFT": skySoft,
  
  // Spring collection
  "SKY SAPPHIRE": skySapphire,
  "SKY EMERALD": skyEmerald,
  "SKY RUBY": skyRuby,
  "SKY OPAL": skyOpal,
  "SKY LUXURY": skyLuxury,
  "SKY PARADISE": skyParadise,
  "SKY ECSTASY": skyEcstasy,
  "SKY HOTEL SERIES": skyHotelSeries,
  
  // Foam collection
  "SKY PETAL": skyPetal,
  "SKY ROSE": skyRose,
  "SKY DAISY": skyDaisy,
  "SKY ECO BOND": skyEcoBond,
  "SKY IRIS": skyIris,
  "SKY LATEX BLISS": skyLatexBliss,
};

export const products: Record<Category, Product[]> = {
  coir: [
    {
      name: "SKY LITE",
      warranty: 24,
      positioning: "Budget friendly",
      features: ["Coir support core", "Value option", "Guest rooms"],
      firmness: "Firm",
      priceRange: "Budget",
    },
    {
      name: "SKY ECO",
      warranty: 30,
      positioning: "Value for money",
      features: ["Balanced support", "Durable coir", "Everyday use"],
      firmness: "Firm",
      priceRange: "Budget",
    },
    {
      name: "SKY PRIME",
      warranty: 36,
      positioning: "Great value",
      features: ["Enhanced comfort", "Supportive feel", "Regular use"],
      firmness: "Medium",
      priceRange: "Mid-Range",
    },
    {
      name: "SKY ORTHO",
      warranty: 60,
      positioning: "Orthopedic support",
      features: ["Firm support", "Spine alignment", "Back care"],
      firmness: "Firm",
      priceRange: "Premium",
      description: "Our flagship orthopedic mattress uses breathable open-cell technology specifically designed for Kerala's humid climate, keeping you cool throughout the night. As a factory-direct product, we eliminate middlemen to offer premium quality at honest prices. Built with high-density coir and heat-tempered support, durability is guaranteed with our 5-year warranty."
    },
    {
      name: "SKY STAR",
      warranty: 72,
      positioning: "Luxury at affordable price",
      features: ["Premium fabric", "Balanced comfort", "Long warranty"],
      firmness: "Medium",
      priceRange: "Premium",
    },
    {
      name: "SKY SOFT",
      warranty: 72,
      positioning: "Luxurious with latex",
      features: ["Latex comfort", "Soft top feel", "Good airflow"],
      firmness: "Soft",
      priceRange: "Premium",
    },
    {
      name: "SKY NIMBUS",
      warranty: 72,
      positioning: "Top of the line luxury",
      features: ["Multi layer", "Plush support", "Flagship model"],
      firmness: "Medium",
      priceRange: "Luxury",
    },
  ],
  spring: [
    {
      name: "SKY SAPPHIRE",
      features: ["Pocketed springs", "Motion isolation", "Responsive support"],
      warranty: 84,
      positioning: "Premium pocketed spring with motion isolation",
      firmness: "Medium",
      priceRange: "Premium",
      description: "Experience hotel-grade comfort at home with our pocket spring mattress featuring individually wrapped coils for superior motion isolation. Our breathable open-cell foam layers ensure cooling comfort suited for Kerala's climate. As a factory-direct manufacturer, we cut out middlemen to deliver premium quality at significantly lower prices, backed by our 7-year durability guarantee."
    },
    {
      name: "SKY EMERALD",
      features: ["Bonnell springs", "Classic feel", "Durable construction"],
      warranty: 60,
      positioning: "Classic Bonnell spring comfort",
      firmness: "Medium",
      priceRange: "Mid-Range",
    },
    {
      name: "SKY RUBY",
      features: ["Hybrid design", "Balanced comfort", "Premium springs"],
      warranty: 72,
      positioning: "Hybrid spring with balanced support",
      firmness: "Medium",
      priceRange: "Premium",
    },
    {
      name: "SKY OPAL",
      features: ["Soft top layer", "Spring support", "Cooling fabric"],
      warranty: 60,
      positioning: "Soft comfort with spring support",
      firmness: "Soft",
      priceRange: "Mid-Range",
    },
    {
      name: "SKY LUXURY",
      features: ["Luxury springs", "Plush comfort", "Hotel quality"],
      warranty: 84,
      positioning: "Luxury pillow-top spring indulgence",
      firmness: "Soft",
      priceRange: "Luxury",
    },
    {
      name: "SKY PARADISE",
      features: ["Premium coils", "Enhanced support", "Breathable"],
      warranty: 84,
      positioning: "Premium high-coil spring support",
      firmness: "Medium",
      priceRange: "Luxury",
    },
    {
      name: "SKY ECSTASY",
      features: ["Ultra comfort", "Advanced springs", "Pressure relief"],
      warranty: 120,
      positioning: "Ultimate comfort with gel technology",
      firmness: "Soft",
      priceRange: "Luxury",
    },
    {
      name: "SKY HOTEL SERIES",
      features: ["Commercial grade", "Long lasting", "Hotel standard"],
      warranty: 120,
      positioning: "Commercial-grade hotel standard",
      firmness: "Medium",
      priceRange: "Premium",
    },
  ],
  foam: [
    {
      name: "SKY PETAL",
      features: ["Memory foam", "Body contouring", "Soft comfort"],
      warranty: 60,
      positioning: "Memory foam body-contouring comfort",
      firmness: "Soft",
      priceRange: "Mid-Range",
    },
    {
      name: "SKY ROSE",
      features: ["High density foam", "Firm support", "Durable"],
      warranty: 72,
      positioning: "High-density firm foam support",
      firmness: "Firm",
      priceRange: "Premium",
    },
    {
      name: "SKY DAISY",
      features: ["Multi layer foam", "Balanced feel", "Affordable"],
      warranty: 36,
      positioning: "Balanced responsive foam value",
      firmness: "Medium",
      priceRange: "Budget",
    },
    {
      name: "SKY ECO BOND",
      features: ["Eco friendly", "Bonded foam", "Value option"],
      warranty: 30,
      positioning: "Budget bonded foam solution",
      firmness: "Medium",
      priceRange: "Budget",
    },
    {
      name: "SKY IRIS",
      features: ["Premium foam", "Responsive", "Great support"],
      warranty: 84,
      positioning: "Responsive premium foam support",
      firmness: "Medium",
      priceRange: "Premium",
    },
    {
      name: "SKY LATEX BLISS",
      features: ["Natural latex", "Cooling comfort", "Hypoallergenic"],
      warranty: 120,
      positioning: "Natural latex cooling luxury",
      firmness: "Soft",
      priceRange: "Luxury",
      description: "Our premium natural latex mattress combines cloud-like softness with exceptional durability. The breathable open-cell technology ensures optimal airflow, perfect for Kerala's humid climate. As a factory-direct manufacturer, we eliminate middlemen to offer genuine luxury at honest prices. Built with high-density latex and superior craftsmanship, this mattress comes with our longest warranty of 10 years."
    },
  ],
};

// Get the correct image for a product, fallback to placeholder
export const getProductImage = (productName: string): string => {
  return productImages[productName] || mattress;
};

// Get all products across all categories
export const getAllProducts = (): (Product & { category: Category })[] => {
  const all: (Product & { category: Category })[] = [];
  for (const [category, items] of Object.entries(products)) {
    all.push(...items.map((item) => ({ ...item, category: category as Category })));
  }
  return all;
};

// Get related products from the same category
export const getRelatedProducts = (product: Product & { category: Category }) => {
  const categoryProducts = products[product.category];
  return categoryProducts
    .filter((p) => p.name !== product.name)
    .slice(0, 8)
    .map((p) => ({ ...p, category: product.category }));
};

// Convert product name to URL slug
export const productToSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

// Find a product by its slug
export const findProductBySlug = (slug: string): (Product & { category: Category }) | null => {
  for (const [category, list] of Object.entries(products)) {
    const match = list.find(p => productToSlug(p.name) === slug);
    if (match) return { ...match, category: category as Category };
  }
  return null;
};

// Generate SEO-friendly alt text for product images
export const getProductAlt = (product: Product & { category: Category }): string => {
  const categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  const keyFeature = product.features[0] || "Premium quality";
  return `Skyindia ${product.name} ${categoryName} Mattress - ${keyFeature}`;
};
