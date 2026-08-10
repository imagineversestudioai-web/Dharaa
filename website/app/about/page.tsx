import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

const values = [
  {
    title: "Purity",
    body: "No compromise on raw material quality — honest ingredients you can taste.",
  },
  {
    title: "Hygiene",
    body: "Hygienically processed and packed with care for family kitchens.",
  },
  {
    title: "Authenticity",
    body: "Traditional blends and bilingual packaging rooted in regional taste memory.",
  },
  {
    title: "Accessibility",
    body: "Premium feel at a fair price — pride without pretension.",
  },
];

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="bg-forest-deep py-16 text-cream md:py-24">
        <div className="container-site max-w-3xl">
          <p className="eyebrow !text-gold">Our story</p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream/85">
            Dharaa is a premium yet affordable Indian foods and spices brand
            rooted in nature, authenticity, and trust. We bring carefully
            sourced, expertly blended spices to everyday kitchens — starting in
            Hardoi and growing across Uttar Pradesh.
          </p>
        </div>
      </section>

      <section className="container-site py-14 md:py-20">
        <Reveal>
          <h2 className="section-title max-w-xl">Positioned for real kitchens</h2>
          <p className="mt-5 max-w-2xl text-ink-muted leading-relaxed">
            Mid-premium pricing: higher perceived quality than local brands,
            while remaining below many national premium names. Modern-classic
            packaging in cream, forest green, and gold — purity you can see on
            the shelf.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="h-full rounded-2xl border border-forest/10 bg-cream-soft p-6 shadow-soft">
                <h3 className="font-display text-xl font-bold text-forest">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {v.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="border-y border-forest/10 bg-cream-dark/40 py-14">
        <div className="container-site grid gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="eyebrow">Market path</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-forest-deep md:text-4xl">
              Hardoi → Uttar Pradesh → beyond
            </h2>
            <p className="mt-4 text-ink-muted leading-relaxed">
              We launch where trust is personal — local trade, retailers, and
              families — then expand through distributors, wholesale, modern
              retail, e-commerce partners, and quick commerce over time.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="space-y-4">
              {[
                "Build brand presence in Hardoi",
                "Expand across Uttar Pradesh",
                "Enter neighboring states with the same quality promise",
              ].map((step, i) => (
                <li
                  key={step}
                  className="flex gap-4 rounded-xl border border-forest/10 bg-cream p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-bold text-cream">
                    {i + 1}
                  </span>
                  <span className="pt-1 font-medium text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-14 text-center">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-forest-deep md:text-3xl">
            Ready to taste the difference?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary">
              Explore products
            </Link>
            <Link href="/find-us" className="btn-ghost">
              Find us
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
