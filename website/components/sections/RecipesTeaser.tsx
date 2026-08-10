import Link from "next/link";
import { recipes } from "@/lib/recipes";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function RecipesTeaser() {
  return (
    <section className="border-t border-forest/10 bg-cream-dark/40 py-20 md:py-28">
      <div className="container-site">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">From our kitchen</p>
            <h2 className="section-title mt-3">Try these at home</h2>
            <p className="mt-3 max-w-lg text-ink-muted">
              Craft everyday dishes with Dharaa blends — the bar experience of
              flavour, right at your tawa.
            </p>
          </div>
          <Link href="/recipes" className="btn-primary shrink-0">
            All recipes
            <span aria-hidden>→</span>
          </Link>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {recipes.map((r) => (
            <StaggerItem key={r.slug}>
              <Link
                href={`/recipes#${r.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest/10 bg-cream shadow-soft transition hover:-translate-y-1 hover:shadow-pouch"
              >
                <div
                  className="flex h-36 items-end p-4"
                  style={{
                    background: `linear-gradient(145deg, ${r.color}, ${r.color}aa)`,
                  }}
                >
                  <span className="rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-ink">
                    {r.time}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-bold text-forest-deep group-hover:text-forest">
                    {r.title}
                  </h3>
                  <p className="mt-1 font-devanagari text-sm text-ink-muted">
                    {r.titleHi}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {r.blurb}
                  </p>
                  <p className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-gold-deep">
                    With {r.mixer}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
