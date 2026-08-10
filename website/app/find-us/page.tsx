import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Find us",
  description:
    "Find Dharaa spices in Hardoi and across Uttar Pradesh — retailers and distributors welcome.",
};

const channels = [
  {
    title: "General trade",
    body: "Kirana and neighbourhood stores — the heart of everyday spice purchase.",
  },
  {
    title: "Distributors & wholesale",
    body: "Partners who value consistent quality and repeat purchase categories.",
  },
  {
    title: "Modern retail",
    body: "Shelves where packaging and purity cues help shoppers choose with confidence.",
  },
  {
    title: "Digital channels",
    body: "E-commerce and quick commerce planned as the brand footprint grows.",
  },
];

export default function FindUsPage() {
  return (
    <div className="pb-20">
      <section className="bg-forest py-16 text-cream md:py-20">
        <div className="container-site max-w-3xl">
          <p className="eyebrow !text-gold">Presence</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Find Dharaa near you
          </h1>
          <p className="mt-5 text-cream/85 leading-relaxed">
            We are launching in <strong className="text-gold">Hardoi</strong>,
            then expanding across Uttar Pradesh. This is a brand brochure site —
            no online cart — so the best place to get Dharaa is through local
            trade partners.
          </p>
        </div>
      </section>

      <section className="container-site py-14">
        <Reveal>
          <h2 className="section-title text-3xl md:text-4xl">Where we sell</h2>
        </Reveal>
        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
          {channels.map((c) => (
            <StaggerItem key={c.title}>
              <div className="h-full rounded-2xl border border-forest/10 bg-cream-soft p-6 shadow-soft">
                <h3 className="font-display text-xl font-bold text-forest">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {c.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-site">
        <Reveal className="rounded-3xl border border-forest/15 bg-cream-dark/50 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="eyebrow">Map</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-forest-deep md:text-3xl">
                Hardoi, Uttar Pradesh
              </h2>
              <p className="mt-3 text-ink-muted leading-relaxed">
                Store locator map can be embedded here when retail points are
                live. For now, ask your local retailer for Dharaa Laal Mirchi,
                Dhaniya, Garam Masala, and All in One.
              </p>
            </div>
            <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-dashed border-forest/30 bg-cream text-center">
              <div className="p-6">
                <p className="text-4xl" aria-hidden>
                  📍
                </p>
                <p className="mt-3 font-display text-lg font-bold text-forest">
                  Store map placeholder
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  Coming with retail expansion
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-site py-14 text-center">
        <Reveal>
          <h2 className="font-display text-2xl font-bold text-forest-deep">
            Trade & distribution enquiries
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink-muted">
            Interested in stocking Dharaa? Reach out through your local
            wholesale network or brand contact channel as published on pack.
          </p>
          <Link href="/products" className="btn-primary mt-6">
            Browse products
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
