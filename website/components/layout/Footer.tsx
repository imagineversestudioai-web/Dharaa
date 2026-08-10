import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3 md:py-16">
        <div>
          <p className="font-display text-2xl font-bold tracking-[0.14em]">{site.name}</p>
          <p className="mt-2 max-w-xs font-display text-lg italic text-gold">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Premium yet affordable Indian spices — pure, hygienic, and crafted for
            family kitchens across Uttar Pradesh.
          </p>
        </div>

        <div>
          <p className="eyebrow !text-gold">Explore</p>
          <ul className="mt-4 space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-10 items-center text-sm text-cream/90 transition hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow !text-gold">Visit</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Rooted in Hardoi. Expanding across Uttar Pradesh and neighboring
            states through general trade, modern retail, and local partners.
          </p>
          <Link
            href="/find-us"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold transition hover:text-cream"
          >
            Find Dharaa near you
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="container-site flex flex-col items-start justify-between gap-2 py-5 text-xs text-cream/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Dharaa. All rights reserved.</p>
          <p>Mid-premium spices · Nature · Authenticity · Trust</p>
        </div>
      </div>
    </footer>
  );
}
