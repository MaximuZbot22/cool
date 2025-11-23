import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Filter, ZoomIn, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Check } from "lucide-react";
import {
  products,
  getAllProducts,
  getProductImage,
  productToSlug,
  getProductAlt,
  type FirmnessLevel,
  type PriceRange,
} from "@/data/products";
// Collection category icons
import coirIcon from "@/assets/coir-icon.png";
import springIcon from "@/assets/spring-icon.png";
import foamIcon from "@/assets/foam-icon.png";

type FilterType = "none" | "all" | "coir" | "spring" | "foam";

export const ProductCollections = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("none");
  const [compareList, setCompareList] = useState<any[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // Advanced filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [warrantyFilter, setWarrantyFilter] = useState<string>("all");
  const [firmnessFilter, setFirmnessFilter] = useState<FirmnessLevel[]>([]);
  const [priceFilter, setPriceFilter] = useState<PriceRange[]>([]);

  const getFilteredProducts = () => {
    if (filter === "none") return [];
    
    // Get base products - either all or specific category
    let filtered = filter === "all" 
      ? getAllProducts() 
      : products[filter].map((item) => ({ ...item, category: filter }));

    // Apply text search
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.positioning.toLowerCase().includes(query) ||
        product.firmness.toLowerCase().includes(query) ||
        product.features.some(f => f.toLowerCase().includes(query))
      );
    }

    // Apply warranty filter (FIXED: Non-overlapping ranges)
    if (warrantyFilter !== "all") {
      filtered = filtered.filter((product) => {
        if (warrantyFilter === "up-to-5") return product.warranty <= 60;
        if (warrantyFilter === "5-7") return product.warranty > 60 && product.warranty <= 84;
        if (warrantyFilter === "7-plus") return product.warranty > 84;
        return true;
      });
    }

    // Apply firmness filter
    if (firmnessFilter.length > 0) {
      filtered = filtered.filter((product) =>
        firmnessFilter.includes(product.firmness)
      );
    }

    // Apply price filter
    if (priceFilter.length > 0) {
      filtered = filtered.filter((product) =>
        priceFilter.includes(product.priceRange)
      );
    }

    return filtered;
  };

  // Get available count for smart badge display
  const getAvailableCount = (filterType: 'firmness' | 'price' | 'warranty', value: string): number => {
    if (filter === "none") return 0;
    
    let baseProducts = filter === "all" 
      ? getAllProducts() 
      : products[filter].map((item) => ({ ...item, category: filter }));
    
    // Apply search first
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      baseProducts = baseProducts.filter((product) =>
        product.name.toLowerCase().includes(query) ||
        product.positioning.toLowerCase().includes(query) ||
        product.firmness.toLowerCase().includes(query) ||
        product.features.some(f => f.toLowerCase().includes(query))
      );
    }
    
    // Apply other active filters (excluding the one being counted)
    if (filterType !== 'warranty' && warrantyFilter !== "all") {
      baseProducts = baseProducts.filter((product) => {
        if (warrantyFilter === "up-to-5") return product.warranty <= 60;
        if (warrantyFilter === "5-7") return product.warranty > 60 && product.warranty <= 84;
        if (warrantyFilter === "7-plus") return product.warranty > 84;
        return true;
      });
    }
    
    if (filterType !== 'firmness' && firmnessFilter.length > 0) {
      baseProducts = baseProducts.filter((product) =>
        firmnessFilter.includes(product.firmness)
      );
    }
    
    if (filterType !== 'price' && priceFilter.length > 0) {
      baseProducts = baseProducts.filter((product) =>
        priceFilter.includes(product.priceRange)
      );
    }
    
    // Now count based on the specific filter value
    if (filterType === 'firmness') {
      return baseProducts.filter(p => p.firmness === value).length;
    }
    if (filterType === 'price') {
      return baseProducts.filter(p => p.priceRange === value).length;
    }
    if (filterType === 'warranty') {
      if (value === "up-to-5") return baseProducts.filter(p => p.warranty <= 60).length;
      if (value === "5-7") return baseProducts.filter(p => p.warranty > 60 && p.warranty <= 84).length;
      if (value === "7-plus") return baseProducts.filter(p => p.warranty > 84).length;
    }
    
    return 0;
  };

  const hasActiveFilters = () => {
    return searchQuery.trim() !== "" || warrantyFilter !== "all" || firmnessFilter.length > 0 || priceFilter.length > 0;
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setWarrantyFilter("all");
    setFirmnessFilter([]);
    setPriceFilter([]);
  };

  // Reset filters when switching categories
  const handleCategoryChange = (category: FilterType) => {
    setFilter(category);
    clearAllFilters();
  };

  const toggleFirmnessFilter = (firmness: FirmnessLevel) => {
    setFirmnessFilter((prev) =>
      prev.includes(firmness) ? prev.filter((f) => f !== firmness) : [...prev, firmness]
    );
  };

  const togglePriceFilter = (price: PriceRange) => {
    setPriceFilter((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const filteredProducts = getFilteredProducts();
  const showProducts = filter !== "none";

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


  const toggleCompare = (product: any) => {
    setCompareList((prev) => {
      const isInList = prev.find((p) => p.name === product.name);
      if (isInList) {
        return prev.filter((p) => p.name !== product.name);
      }
      if (prev.length >= 3) {
        return prev; // Max 3 products
      }
      return [...prev, product];
    });
  };

  const isInCompareList = (product: any) => {
    return compareList.some((p) => p.name === product.name);
  };

  const openCompareModal = () => {
    setIsCompareModalOpen(true);
  };

  const clearCompareList = () => {
    setCompareList([]);
    setIsCompareModalOpen(false);
  };

  return (
    <section id="collections" className="py-12 md:py-20 pb-24 md:pb-8 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '60px 60px'
      }} />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-sage-100/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-foreground">
            Our Mattress Collections
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Choose a category to explore our handcrafted mattress collections.
          </p>
        </motion.div>

        {/* Category Selection */}
        <AnimatePresence mode="wait">
          {!showProducts ? (
            <motion.div 
              key="categories"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Mobile: 3 cards horizontal */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:hidden mb-8">
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  onClick={() => handleCategoryChange("coir")}
                  className="group bg-muted/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:shadow-premium transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/50"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 mx-auto">
                    <img src={coirIcon} alt="Coir mattress" className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-serif text-foreground text-center">Coir</h3>
                  <p className="text-[10px] sm:text-xs text-primary font-medium text-center mt-1">{products.coir.length} models</p>
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  onClick={() => handleCategoryChange("spring")}
                  className="group bg-muted/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:shadow-premium transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/50"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 mx-auto">
                    <img src={springIcon} alt="Spring mattress" className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-serif text-foreground text-center">Spring</h3>
                  <p className="text-[10px] sm:text-xs text-primary font-medium text-center mt-1">{products.spring.length} models</p>
                </motion.button>
                
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  onClick={() => handleCategoryChange("foam")}
                  className="group bg-muted/30 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:shadow-premium transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/50"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 mx-auto">
                    <img src={foamIcon} alt="Foam mattress" className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-serif text-foreground text-center">Foam</h3>
                  <p className="text-[10px] sm:text-xs text-primary font-medium text-center mt-1">{products.foam.length} models</p>
                </motion.button>
              </div>

              {/* Mobile: Horizontal scroll (backup) - Hidden */}
              <div className="hidden overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex gap-6 w-max">
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  onClick={() => handleCategoryChange("coir")}
                    className="group bg-muted/30 backdrop-blur-sm rounded-2xl p-8 hover:shadow-premium-lg transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/50 w-[260px] flex-shrink-0"
                  >
                    <div className="w-20 h-20 mb-4 mx-auto">
                      <img src={coirIcon} alt="Coir mattress" className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2 text-foreground">Coir Collection</h3>
                    <p className="text-muted-foreground mb-3 leading-relaxed text-sm">Natural coconut coir mattresses with excellent support</p>
                    <div className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                      {products.coir.length} models →
                    </div>
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  onClick={() => handleCategoryChange("spring")}
                    className="group bg-muted/30 backdrop-blur-sm rounded-2xl p-8 hover:shadow-premium-lg transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/50 w-[260px] flex-shrink-0"
                  >
                    <div className="w-20 h-20 mb-4 mx-auto">
                      <img src={springIcon} alt="Spring mattress" className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2 text-foreground">Spring Collection</h3>
                    <p className="text-muted-foreground mb-3 leading-relaxed text-sm">Responsive spring mattresses for dynamic comfort</p>
                    <div className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                      {products.spring.length} models →
                    </div>
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  onClick={() => handleCategoryChange("foam")}
                    className="group bg-muted/30 backdrop-blur-sm rounded-2xl p-8 hover:shadow-premium-lg transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/50 w-[260px] flex-shrink-0"
                  >
                    <div className="w-20 h-20 mb-4 mx-auto">
                      <img src={foamIcon} alt="Foam mattress" className="w-full h-full object-contain" loading="lazy" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2 text-foreground">Foam Collection</h3>
                    <p className="text-muted-foreground mb-3 leading-relaxed text-sm">Premium foam mattresses for plush comfort</p>
                    <div className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                      {products.foam.length} models →
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* View All Button */}
              <div className="text-center mb-8">
                <Button
                  onClick={() => handleCategoryChange("all")}
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/30 hover:bg-primary/5 text-foreground font-medium"
                >
                  View All Collections ({getAllProducts().length} mattresses)
                </Button>
              </div>

              {/* Desktop: Grid */}
              <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setFilter("coir")}
                  className="group bg-muted/30 backdrop-blur-sm rounded-2xl p-12 hover:shadow-premium-lg transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/50"
                >
                  <motion.div 
                    className="w-28 h-28 mb-6 mx-auto"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={coirIcon} alt="Coir mattress" className="w-full h-full object-contain" loading="lazy" />
                  </motion.div>
                  <h3 className="text-3xl font-serif mb-3 text-foreground">Coir Collection</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">Natural coconut coir mattresses with excellent support</p>
                  <div className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                    {products.coir.length} models 
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setFilter("spring")}
                  className="group bg-muted/30 backdrop-blur-sm rounded-2xl p-12 hover:shadow-premium-lg transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/50"
                >
                  <motion.div 
                    className="w-28 h-28 mb-6 mx-auto"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={springIcon} alt="Spring mattress" className="w-full h-full object-contain" loading="lazy" />
                  </motion.div>
                  <h3 className="text-3xl font-serif mb-3 text-foreground">Spring Collection</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">Responsive spring mattresses for dynamic comfort</p>
                  <div className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                    {products.spring.length} models
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.button>

                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setFilter("foam")}
                  className="group bg-muted/30 backdrop-blur-sm rounded-2xl p-12 hover:shadow-premium-lg transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/50"
                >
                  <motion.div 
                    className="w-28 h-28 mb-6 mx-auto"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={foamIcon} alt="Foam mattress" className="w-full h-full object-contain" loading="lazy" />
                  </motion.div>
                  <h3 className="text-3xl font-serif mb-3 text-foreground">Foam Collection</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">Premium foam mattresses for plush comfort</p>
                  <div className="text-sm text-primary font-medium flex items-center justify-center gap-2">
                    {products.foam.length} models
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="products-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back Button & Filter Bar */}
              <div className="mb-8 space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFilter("none");
                      clearAllFilters();
                    }}
                    className="border-border text-foreground hover:bg-muted"
                  >
                    ← Back to Categories
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground capitalize">{filter === "all" ? "All Collections" : `${filter} Collection`}</span>
                  </div>
                </div>

                {/* Text Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder="Search by name, firmness, or feature..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>

                {/* Filter Bar */}
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Filters</span>
                      {hasActiveFilters() && (
                        <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary border-primary/30">
                          {(searchQuery.trim() !== "" ? 1 : 0) + (warrantyFilter !== "all" ? 1 : 0) + firmnessFilter.length + priceFilter.length} active
                        </Badge>
                      )}
                    </div>
                    {hasActiveFilters() && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-xs hover:bg-destructive/10 hover:text-destructive"
                      >
                        Reset All
                      </Button>
                    )}
                  </div>

                  {/* Desktop: Grid Layout */}
                  <div className="hidden md:grid md:grid-cols-3 gap-6">
                    {/* Warranty Filter */}
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">
                        Warranty Duration
                      </label>
                      <Select value={warrantyFilter} onValueChange={setWarrantyFilter}>
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="All warranties" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All warranties</SelectItem>
                          <SelectItem value="up-to-5">
                            Up to 5 years ({getAvailableCount('warranty', 'up-to-5')})
                          </SelectItem>
                          <SelectItem value="5-7">
                            5-7 years ({getAvailableCount('warranty', '5-7')})
                          </SelectItem>
                          <SelectItem value="7-plus">
                            7+ years ({getAvailableCount('warranty', '7-plus')})
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Firmness Filter */}
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">
                        Firmness Level
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(["Soft", "Medium", "Firm"] as FirmnessLevel[]).map((firmness) => {
                          const count = getAvailableCount('firmness', firmness);
                          const isDisabled = count === 0;
                          return (
                            <Badge
                              key={firmness}
                              variant={firmnessFilter.includes(firmness) ? "default" : "outline"}
                              className={cn(
                                "cursor-pointer transition-all hover:scale-105",
                                firmnessFilter.includes(firmness) && "bg-primary text-primary-foreground shadow-md",
                                isDisabled && "opacity-40 cursor-not-allowed hover:scale-100"
                              )}
                              onClick={() => !isDisabled && toggleFirmnessFilter(firmness)}
                            >
                              {firmness} ({count})
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">
                        Price Range
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(["Budget", "Mid-Range", "Premium", "Luxury"] as PriceRange[]).map((price) => {
                          const count = getAvailableCount('price', price);
                          const isDisabled = count === 0;
                          return (
                            <Badge
                              key={price}
                              variant={priceFilter.includes(price) ? "default" : "outline"}
                              className={cn(
                                "cursor-pointer transition-all hover:scale-105",
                                priceFilter.includes(price) && "bg-primary text-primary-foreground shadow-md",
                                isDisabled && "opacity-40 cursor-not-allowed hover:scale-100"
                              )}
                              onClick={() => !isDisabled && togglePriceFilter(price)}
                            >
                              {price} ({count})
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Mobile: Accordion Layout */}
                  <Accordion type="multiple" className="md:hidden">
                    <AccordionItem value="warranty" className="border-border">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">
                        <div className="flex items-center gap-2">
                          <span>Warranty Duration</span>
                          {warrantyFilter !== "all" && (
                            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">1</Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <Select value={warrantyFilter} onValueChange={setWarrantyFilter}>
                          <SelectTrigger className="bg-background mt-2">
                            <SelectValue placeholder="All warranties" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All warranties</SelectItem>
                            <SelectItem value="up-to-5">
                              Up to 5 years ({getAvailableCount('warranty', 'up-to-5')})
                            </SelectItem>
                            <SelectItem value="5-7">
                              5-7 years ({getAvailableCount('warranty', '5-7')})
                            </SelectItem>
                            <SelectItem value="7-plus">
                              7+ years ({getAvailableCount('warranty', '7-plus')})
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="firmness" className="border-border">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">
                        <div className="flex items-center gap-2">
                          <span>Firmness Level</span>
                          {firmnessFilter.length > 0 && (
                            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{firmnessFilter.length}</Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(["Soft", "Medium", "Firm"] as FirmnessLevel[]).map((firmness) => {
                            const count = getAvailableCount('firmness', firmness);
                            const isDisabled = count === 0;
                            return (
                              <Badge
                                key={firmness}
                                variant={firmnessFilter.includes(firmness) ? "default" : "outline"}
                                className={cn(
                                  "cursor-pointer transition-all min-h-[44px] px-4",
                                  firmnessFilter.includes(firmness) && "bg-primary text-primary-foreground shadow-md",
                                  isDisabled && "opacity-40 cursor-not-allowed"
                                )}
                                onClick={() => !isDisabled && toggleFirmnessFilter(firmness)}
                              >
                                {firmness} ({count})
                              </Badge>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="price" className="border-border">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline">
                        <div className="flex items-center gap-2">
                          <span>Price Range</span>
                          {priceFilter.length > 0 && (
                            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">{priceFilter.length}</Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(["Budget", "Mid-Range", "Premium", "Luxury"] as PriceRange[]).map((price) => {
                            const count = getAvailableCount('price', price);
                            const isDisabled = count === 0;
                            return (
                              <Badge
                                key={price}
                                variant={priceFilter.includes(price) ? "default" : "outline"}
                                className={cn(
                                  "cursor-pointer transition-all min-h-[44px] px-4",
                                  priceFilter.includes(price) && "bg-primary text-primary-foreground shadow-md",
                                  isDisabled && "opacity-40 cursor-not-allowed"
                                )}
                                onClick={() => !isDisabled && togglePriceFilter(price)}
                              >
                                {price} ({count})
                              </Badge>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? "mattress" : "mattresses"}
                </div>
              </div>

              {/* Empty State or Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <p className="text-lg text-muted-foreground mb-2">
                    No mattresses match your current filters
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Try selecting fewer filters or broadening your criteria
                  </p>
                  {hasActiveFilters() && (
                    <Button
                      onClick={clearAllFilters}
                      variant="outline"
                      className="border-border hover:bg-accent"
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              ) : (
                <motion.div
                  key={filter}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={`${product.category}-${product.name}`}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: index * 0.08,
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      whileHover={{ y: -8 }}
                      className="group bg-muted/20 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-premium-lg transition-all duration-500 border border-border/50 hover:border-primary/30 hover:bg-muted/40"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-muted/30 relative group/image">
                        <img
                          src={getProductImage(product.name)}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                          onClick={() => setLightboxImage(getProductImage(product.name))}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100 pointer-events-none">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute top-3 right-3 z-10">
                          <Button
                            size="sm"
                            variant={isInCompareList(product) ? "default" : "secondary"}
                            className="gap-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCompare(product);
                            }}
                          >
                            {isInCompareList(product) ? (
                              <>
                                <Check className="w-4 h-4" />
                                Added
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4" />
                                Compare
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="p-8 space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <Badge className={`${getCategoryColor(product.category)} uppercase`} variant="outline">
                              {product.category}
                            </Badge>
                            <h3 className="text-2xl font-serif mt-3 text-foreground">{product.name}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-sage-700 font-medium">
                          {product.warranty} months warranty
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {product.positioning}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {product.features.map((feature: string, i: number) => (
                            <span
                              key={i}
                              className="text-xs px-3 py-1.5 bg-muted/30 text-foreground rounded-full border border-border"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className="w-full mt-4 border-border text-foreground hover:bg-muted"
                          onClick={() => navigate(`/products/${productToSlug(product.name)}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Compare Bar */}
        <AnimatePresence>
          {compareList.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-50 bg-card border-2 border-primary/30 rounded-2xl shadow-2xl px-3 py-3 md:px-6 md:py-4 md:max-w-4xl"
            >
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  <Badge className="bg-primary text-primary-foreground whitespace-nowrap text-xs md:text-sm">
                    {compareList.length} Selected
                  </Badge>
                  <div className="flex gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0 -mx-1 px-1">
                    {compareList.map((product) => (
                      <div
                        key={product.name}
                        className="flex items-center gap-2 bg-muted/50 rounded-lg px-2 py-1 md:px-3 md:py-1.5 whitespace-nowrap flex-shrink-0"
                      >
                        <span className="text-xs md:text-sm font-medium">{product.name}</span>
                        <button
                          onClick={() => toggleCompare(product)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearCompareList}
                    className="flex-1 md:flex-none text-xs md:text-sm"
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={openCompareModal}
                    disabled={compareList.length < 2}
                    className="bg-gradient-to-r from-primary to-secondary text-white flex-1 md:flex-none text-xs md:text-sm"
                  >
                    Compare Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Modal */}
        <Dialog open={isCompareModalOpen} onOpenChange={setIsCompareModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-card">
            <DialogHeader>
              <DialogTitle className="text-3xl font-light flex items-center justify-between">
                <span>Compare Mattresses</span>
                <Button variant="ghost" size="sm" onClick={clearCompareList}>
                  Clear All
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-6 mt-6" style={{ gridTemplateColumns: `repeat(${compareList.length}, 1fr)` }}>
              {compareList.map((product) => (
                <div key={product.name} className="border border-border rounded-xl p-6 space-y-4">
                  {/* Image */}
                  <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-4 cursor-pointer group/compare-image relative"
                    onClick={() => setLightboxImage(getProductImage(product.name))}
                  >
                    <img
                      src={getProductImage(product.name)}
                      alt={product.name}
                      className="w-full h-40 object-contain"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/compare-image:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover/compare-image:opacity-100 rounded-xl">
                      <ZoomIn className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Product Name & Category */}
                  <div>
                    <Badge className={`${getCategoryColor(product.category)} capitalize mb-2`}>
                      {product.category}
                    </Badge>
                    <h3 className="text-xl font-serif text-foreground">{product.name}</h3>
                  </div>

                  {/* Warranty */}
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Warranty</p>
                    <p className="text-lg font-semibold text-primary">{product.warranty} months</p>
                  </div>

                  {/* Firmness */}
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Firmness</p>
                    <p className="text-sm font-medium">{product.firmness}</p>
                  </div>

                  {/* Price Range */}
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Price Range</p>
                    <p className="text-sm font-medium">{product.priceRange}</p>
                  </div>

                  {/* Positioning */}
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-1">Positioning</p>
                    <p className="text-sm font-medium">{product.positioning}</p>
                  </div>

                  {/* Features */}
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase mb-2">Features</p>
                    <ul className="space-y-1.5">
                      {product.features.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        navigate(`/products/${productToSlug(product.name)}`);
                        setIsCompareModalOpen(false);
                      }}
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleCompare(product)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Lightbox */}
        <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
          <DialogContent className="max-w-7xl bg-black/95 border-none p-0">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            {lightboxImage && (
              <div className="flex items-center justify-center p-8">
                <img
                  src={lightboxImage}
                  alt="Zoomed view"
                  className="max-w-full max-h-[85vh] object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
