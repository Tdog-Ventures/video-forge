import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const niches = [
  "Fitness / Health",
  "Real Estate",
  "SaaS / Tech",
  "E-commerce",
  "Coaching / Consulting",
  "Finance / Crypto",
  "Education",
  "Other",
];

const themes = ["Educational", "Inspirational", "Urgency", "Authority", "Entertaining"];

const OrderForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    niche: "",
    story: "",
    themes: [] as string[],
    customPricing: false,
    payment: "stripe" as "stripe" | "paypal",
  });

  const toggleTheme = (t: string) => {
    setForm((prev) => ({
      ...prev,
      themes: prev.themes.includes(t)
        ? prev.themes.filter((x) => x !== t)
        : [...prev.themes, t],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.niche) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Your spot has been reserved! We'll be in touch within 24 hours.");
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow font-body text-sm";

  return (
    <section id="order-form" className="py-24 px-6 bg-secondary/30">
      <div className="container max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-4"
        >
          Reserve Your <span className="text-gradient-neon">Spot</span>
        </motion.h2>
        <p className="text-center text-muted-foreground mb-12">
          Fill in the details below and we'll get started within 48 hours.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-8 md:p-12 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">Name *</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">Email *</label>
            <input
              type="email"
              className={inputClass}
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">
              Phone <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              type="text"
              className={inputClass}
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          {/* Niche */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">Niche *</label>
            <select
              className={inputClass}
              value={form.niche}
              onChange={(e) => setForm({ ...form, niche: e.target.value })}
            >
              <option value="">Select your niche</option>
              {niches.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Brand Story */}
          <div>
            <label className="block text-sm font-semibold font-display mb-2">Brand Story</label>
            <textarea
              rows={4}
              className={inputClass}
              placeholder="Tell us about your brand, audience, and goals..."
              value={form.story}
              onChange={(e) => setForm({ ...form, story: e.target.value })}
            />
          </div>

          {/* Video Themes */}
          <div>
            <label className="block text-sm font-semibold font-display mb-3">Video Theme Preference</label>
            <div className="flex flex-wrap gap-2">
              {themes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTheme(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    form.themes.includes(t)
                      ? "border-neon bg-primary/15 text-primary"
                      : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Custom pricing */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.customPricing}
              onChange={(e) => setForm({ ...form, customPricing: e.target.checked })}
              className="w-4 h-4 rounded border-border accent-primary"
            />
            <span className="text-sm text-foreground/80">Interested in custom volume pricing?</span>
          </label>

          {/* Payment method */}
          <div>
            <label className="block text-sm font-semibold font-display mb-3">Payment Method</label>
            <div className="flex gap-3">
              {(["stripe", "paypal"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setForm({ ...form, payment: m })}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    form.payment === m
                      ? "border-neon bg-primary/10 text-primary"
                      : "border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  {m === "stripe" ? "Stripe" : "PayPal"}
                </button>
              ))}
            </div>
          </div>

          <Button variant="neon" size="xl" type="submit" className="w-full mt-4">
            <Zap className="w-5 h-5" />
            Reserve My Spot ($997)
          </Button>

          <p className="text-center text-muted-foreground text-xs">
            Or pay <span className="text-primary font-semibold">$199/month × 5</span> · 30-day money-back guarantee
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default OrderForm;
