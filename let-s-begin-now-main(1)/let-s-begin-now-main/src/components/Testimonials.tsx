import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Riyas Riz",
    location: "Kodungallur, Kerala",
    product: "Custom sized mattress",
    text: "I bought this custom sized mattress from SkyIndia Mattress 6 months ago, I'm really satisfied by the quality of the mattress and I'm also impressed by the after sales service they provide.",
    rating: 5,
  },
  {
    name: "Amal Krishna",
    location: "Kodungallur, Kerala",
    product: "Pocketed spring mattress",
    text: "I bought this mattress from SkyIndia Mattress factory outlet. I asked for a custom size mattress and they provided me with the best quality mattress at a reasonable price. I'm satisfied with their service and customer care.",
    rating: 5,
  },
  {
    name: "Jithin Thankachan",
    location: "Kodungallur, Kerala",
    product: "Queen size mattress and memory foam pillows",
    text: "I bought this queen size mattress from this shop. I liked the quality of the mattress, also bought 2 memory foam pillows. I loved the pillows very much, it solved my neck pain problem. I highly recommend this place for mattresses and pillows.",
    rating: 5,
  },
  {
    name: "Joseph Tony",
    location: "Bangalore",
    product: "Queen size pocketed spring mattress",
    text: "I had purchased a queen size pocketed spring mattress from here. I got it for a good price compared to other mattress stores, they also provided me with good quality pillows and a waterproof protector along with the mattress as a complimentary. I liked their products and their service.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section id="reviews" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-foreground">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people who chose Skyindia Mattress
          </p>
        </motion.div>

        {/* Mobile: Horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-4 w-max">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-premium w-[280px] flex-shrink-0 relative border border-border"
              >
                <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/10" />
                
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                
                <p className="text-foreground mb-4 text-sm leading-relaxed line-clamp-4">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t border-border pt-3">
                  <p className="font-semibold text-base">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.location}
                  </p>
                  <p className="text-xs text-primary mt-1">
                    {testimonial.product}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl p-8 shadow-premium hover:shadow-premium-lg transition-shadow relative border border-border"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-foreground mb-6 text-lg leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="font-semibold text-lg">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.location}
                </p>
                <p className="text-sm text-primary mt-1">
                  {testimonial.product}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
