import type { Metadata } from "next";
import Link from "next/link";
import { recipes } from "@/lib/recipes";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Home recipes using Dharaa spice blends.",
};

export default function RecipesPage() {
  return (
    <div className="pb-20">
      <section className="border-b border-forest/10 bg-cream-dark/60 py-16 md:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow">Kitchen craft</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-forest-deep md:text-5xl">
            Recipes rooted in everyday cooking
          </h1>
          <p className="mt-4 text-ink-muted">
            Simple dishes that let Dharaa aroma and colour shine — no fuss, full
            flavour.
          </p>
        </div>
      </section>

      <section className="container-site space-y-10 py-14">
        <Stagger className="space-y-10">
          {recipes.map((r) => (
            <StaggerItem key={r.slug}>
              <article
                id={r.slug}
                className="scroll-mt-28 overflow-hidden rounded-3xl border border-forest/10 bg-cream-soft shadow-soft md:grid md:grid-cols-5"
              >
                <div
                  className="flex min-h-[180px] flex-col justify-between p-6 text-cream md:col-span-2 md:min-h-full"
                  style={{
                    background: `linear-gradient(160deg, ${r.color}, ${r.color}bb)`,
                  }}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/80">
                      {r.time}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-bold">
                      {r.title}
                    </h2>
                    <p className="mt-1 font-devanagari text-cream/90">
                      {r.titleHi}
                    </p>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-cream/85">{r.blurb}</p>
                    <Link
                      href={`/products/${r.mixerSlug}`}
                      className="mt-4 inline-flex text-sm font-semibold text-gold underline-offset-4 hover:underline"
                    >
                      Spice: {r.mixer} →
                    </Link>
                  </div>
                </div>
                <div className="p-6 md:col-span-3 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Steps · Pair with {r.pair}
                  </p>
                  <ol className="mt-4 space-y-3">
                    {r.steps.map((step, i) => (
                      <li key={step} className="flex gap-3 text-ink">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-xs font-bold text-cream">
                          {i + 1}
                        </span>
                        <span className="pt-0.5 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="text-center">
          <Link href="/products" className="btn-primary">
            Explore spices
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
