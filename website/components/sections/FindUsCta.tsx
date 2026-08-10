import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function FindUsCta() {
  return (
    <section className="bg-forest py-20 text-cream md:py-24">
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow !text-gold">Distribution</p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            We&apos;re rooted in Hardoi
          </h2>
          <p className="mt-5 text-base leading-relaxed text-cream/80 md:text-lg">
            Launching locally, then expanding across Uttar Pradesh through
            general trade, distributors, wholesale, modern retail, and partners.
            Looking for Dharaa on the shelf — or to stock it?
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/find-us"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-forest-deep transition hover:bg-cream"
            >
              Find us
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-cream/10"
            >
              About the brand
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
