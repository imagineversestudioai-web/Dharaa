"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { products } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import { easeOutExpo } from "@/lib/motion";
import { ProductFilm } from "@/components/media/ProductFilm";

export function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const regionRef = useRef<HTMLDivElement>(null);
  const n = products.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(next, 5500);
    return () => window.clearInterval(id);
  }, [next, reduce, paused]);

  const active = products[index];

  return (
    <section className="bg-cream py-16 sm:py-20 md:py-28" aria-labelledby="range-heading">
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Meet the range</p>
          <h2 id="range-heading" className="section-title mt-3">
            The Dharaa kitchen essentials
          </h2>
          <p className="mt-4 text-ink-muted">
            Wave 1 launch portfolio — mid-premium quality for everyday cooking.
          </p>
        </Reveal>

        <div
          ref={regionRef}
          className="relative mt-10 sm:mt-12 md:mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!regionRef.current?.contains(e.relatedTarget as Node)) {
              setPaused(false);
            }
          }}
        >
          <div
            className="flex items-center justify-center gap-2 sm:gap-3 md:gap-6"
            role="region"
            aria-roledescription="carousel"
            aria-label="Product range"
          >
            <button
              type="button"
              onClick={prev}
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-forest/20 bg-cream-soft text-forest transition hover:bg-forest hover:text-cream sm:flex"
              aria-label="Previous product"
            >
              ←
            </button>

            <div className="relative w-full max-w-4xl overflow-hidden">
              <p className="sr-only" aria-live="polite">
                {active.name}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="grid items-center gap-6 rounded-2xl border border-forest/10 bg-cream-soft p-4 shadow-soft sm:gap-8 sm:rounded-3xl sm:p-6 md:grid-cols-2 md:p-8"
                >
                  <ProductFilm
                    src={active.image}
                    alt={active.name}
                    className="mx-auto aspect-[3/4] w-full max-w-[280px] rounded-2xl shadow-pouch sm:max-w-[320px]"
                  />

                  <div className="px-1 pb-2 sm:px-2 sm:pb-4 md:px-0 md:pb-0">
                    <p className="eyebrow" style={{ color: active.accent }}>
                      Wave 1 · {index + 1} of {n}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold text-forest-deep sm:text-3xl md:text-4xl">
                      {active.name}
                    </h3>
                    <p className="mt-1 font-devanagari text-ink-muted">
                      {active.nameHi}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-base">
                      {active.descriptor}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2 sm:mt-5">
                      {active.claims.map((c) => (
                        <li
                          key={c}
                          className="rounded-full px-3 py-1 text-xs font-semibold"
                          style={{
                            background: active.accentSoft,
                            color: active.accent,
                          }}
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/products/${active.slug}`}
                      className="btn-primary mt-6 min-h-11 sm:mt-8"
                    >
                      Explore this spice
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={next}
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-forest/20 bg-cream-soft text-forest transition hover:bg-forest hover:text-cream sm:flex"
              aria-label="Next product"
            >
              →
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
            <button
              type="button"
              onClick={prev}
              className="btn-ghost !min-h-11 !px-5 !py-2"
              aria-label="Previous product"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={next}
              className="btn-ghost !min-h-11 !px-5 !py-2"
              aria-label="Next product"
            >
              Next →
            </button>
          </div>

          <div
            className="mt-5 flex justify-center gap-2 sm:mt-6"
            role="tablist"
            aria-label="Choose product"
          >
            {products.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${p.name}`}
                onClick={() => setIndex(i)}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                  i === index ? "text-forest" : "text-forest/40"
                }`}
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === index ? "h-2.5 w-8 bg-forest" : "h-2.5 w-2.5 bg-forest/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <Link href="/products" className="btn-ghost min-h-11">
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
