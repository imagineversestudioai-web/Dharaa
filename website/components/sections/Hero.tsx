"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { easeOutExpo } from "@/lib/motion";
import { products } from "@/lib/products";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-forest-deep text-cream">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-kitchen.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-deep/85 to-forest-deep/55 md:via-forest-deep/80 md:to-forest-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/75 via-transparent to-forest-deep/25" />
      </div>

      <div className="container-site relative grid items-center gap-10 py-14 sm:py-16 md:min-h-[78vh] md:grid-cols-2 md:py-20 lg:min-h-[85vh]">
        <div className="max-w-xl">
          <motion.p
            className="eyebrow !text-gold"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            Indian foods & spices
          </motion.p>
          <motion.h1
            className="mt-4 font-display text-[2.75rem] font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: easeOutExpo }}
          >
            Spices
            <br />
            Rooted in
            <br />
            <span className="text-gold">Nature</span>
          </motion.h1>
          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-cream/90 sm:mt-6 md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: easeOutExpo }}
          >
            {site.tagline} Pure, hygienic, mid-premium blends crafted for
            everyday kitchens — starting in Hardoi.
          </motion.p>
          <motion.div
            className="mt-7 flex flex-wrap gap-3 sm:mt-8"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: easeOutExpo }}
          >
            <Link
              href="/products"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-forest-deep transition hover:bg-cream"
            >
              Meet the range
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm font-semibold tracking-wide text-cream transition hover:border-cream hover:bg-cream/10"
            >
              Our story
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-md pb-6 md:pb-10"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
        >
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
            {products.map((item, i) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className={`group relative aspect-[3/4] overflow-hidden rounded-xl border border-cream/15 shadow-pouch sm:rounded-2xl ${
                  i % 2 === 1 ? "md:translate-y-5" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 42vw, 200px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                  <p className="font-display text-xs font-bold leading-tight text-cream drop-shadow sm:text-sm">
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-5 text-center text-[10px] uppercase tracking-[0.2em] text-cream/55 sm:mt-6 sm:text-xs md:mt-8">
            Wave 1 · Four essentials
          </p>
        </motion.div>
      </div>
    </section>
  );
}
