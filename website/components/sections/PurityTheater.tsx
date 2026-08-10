"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

export function PurityTheater() {
  const ringRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (!ringRef.current || !sectionRef.current) return;
        gsap.to(ringRef.current, {
          rotate: 18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#3D1F2C] py-16 text-cream sm:py-20 md:py-28"
      aria-labelledby="purity-heading"
    >
      <div className="container-site relative grid items-center gap-10 sm:gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow !text-gold">Purity promise</p>
          <h2
            id="purity-heading"
            className="mt-4 font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            REAL
            <br />
            Ingredients
            <br />
            <span className="text-gold">Only</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/80 sm:mt-6 md:text-lg">
            No compromise on raw material quality. Spices carefully sourced,
            cleaned naturally, hygienically processed, and packed with care —
            for the taste families recognise.
          </p>
          <ul className="mt-6 grid max-w-sm grid-cols-1 gap-2 text-sm sm:mt-8 sm:grid-cols-2 sm:gap-3">
            {[
              "Pure & natural",
              "Hygienically processed",
              "Expertly blended",
              "Rich aroma",
            ].map((t) => (
              <li
                key={t}
                className="rounded-full border border-cream/20 bg-cream/5 px-4 py-2.5 text-center text-cream/90"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative mx-auto w-full max-w-[min(100%,22rem)] sm:max-w-md">
          <div
            ref={ringRef}
            className="relative aspect-square overflow-hidden rounded-full border-2 border-gold/40 shadow-[0_0_60px_rgba(201,162,39,0.12)]"
          >
            <Image
              src="/images/purity-spices.jpg"
              alt="Circular arrangement of whole Indian spices"
              fill
              sizes="(max-width: 640px) 88vw, 400px"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-[26%] flex items-center justify-center rounded-full border border-gold/50 bg-cream/95 text-center shadow-soft sm:inset-[28%]">
              <div>
                <p className="font-display text-lg font-bold tracking-[0.12em] text-forest sm:text-xl md:text-2xl">
                  DHARAA
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  Nature first
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
