import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Dharaa Wave 1 spices — Laal Mirchi, Dhaniya, Garam Masala, and All in One Masala.",
};

export default function ProductsPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-forest/10 bg-forest-deep py-16 text-cream md:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow !text-gold">Wave 1 portfolio</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Pure spices for every kitchen
          </h1>
          <p className="mt-4 text-cream/80">
            Mid-premium quality — higher than local loose spices, accessible
            versus national luxury. Hygienically processed and packed with care.
          </p>
        </div>
      </section>

      <section className="container-site py-14 md:py-16">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <StaggerItem key={p.slug}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-16 rounded-3xl border border-dashed border-forest/25 bg-cream-dark/50 p-8 text-center md:p-12">
          <p className="eyebrow">Coming soon</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-forest-deep md:text-3xl">
            Wave 2 & beyond
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-muted">
            Turmeric, coriander, cumin, Kitchen King, Paneer, Chhole, Biryani
            and other regional blends — same Dharaa standard, more ways to cook.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
