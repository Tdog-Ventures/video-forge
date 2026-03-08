import { motion } from "framer-motion";
import { Check, Zap, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "5 Custom Premium Videos (4K)",
  "All platforms optimized",
  "Landing page included",
  "5-email automated sequence",
  "Brand assets & thumbnails",
  "30-day async support",
];

const OfferCard = () => {
  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 px-6">
      <div className="container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-neon bg-card p-10 md:p-14 glow-neon"
        >
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-primary text-primary-foreground text-sm font-bold font-display rounded-full tracking-wide">
            MOST POPULAR
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 mt-4">
            5 Custom Premium Videos
          </h2>
          <p className="text-muted-foreground text-center text-lg mb-8">
            4K quality, all platforms
          </p>

          <ul className="space-y-4 mb-10">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-foreground/90">{f}</span>
              </li>
            ))}
          </ul>

          <div className="text-center mb-8">
            <div className="text-5xl md:text-6xl font-bold font-display text-gradient-neon mb-2">
              $997
            </div>
            <p className="text-muted-foreground text-sm">
              one-time · or <span className="text-primary font-semibold">$199/month × 5</span>
            </p>
          </div>

          <Button variant="neon" size="xl" className="w-full" asChild>
            <a href="https://buy.stripe.com/PLACEHOLDER_FULL" target="_blank" rel="noopener noreferrer">
              <Zap className="w-5 h-5" />
              Claim Your Spot
            </a>
          </Button>

          <Button variant="neon-outline" size="xl" className="w-full mt-3" asChild>
            <a href="https://buy.stripe.com/PLACEHOLDER_SPLIT" target="_blank" rel="noopener noreferrer">
              <CreditCard className="w-5 h-5" />
              Payment Plan — $199/mo × 5
            </a>
          </Button>

          <p className="text-center text-muted-foreground text-xs mt-4">
            30-day money-back guarantee · Secure checkout
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferCard;
