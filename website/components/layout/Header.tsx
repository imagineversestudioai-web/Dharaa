"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/95 backdrop-blur-md supports-[backdrop-filter]:bg-cream/85">
      <div className="container-site flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link
          href="/"
          className="group flex min-h-11 min-w-0 flex-col justify-center leading-none"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-xl font-bold tracking-[0.12em] text-forest md:text-2xl">
            {site.name}
          </span>
          <span className="hidden truncate text-[10px] tracking-wide text-ink-muted sm:block">
            {site.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/products"
            className="btn-primary !py-2.5 !text-xs uppercase tracking-[0.16em]"
          >
            Explore spices
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-5" aria-hidden>
            <span
              className={`absolute left-0 top-0 h-0.5 w-full origin-center bg-forest transition-transform duration-200 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-0.5 w-full bg-forest transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-0.5 w-full origin-center bg-forest transition-transform duration-200 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id={menuId}
        className={`border-t border-forest/10 bg-cream md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <nav className="container-site flex flex-col gap-1 py-3" aria-label="Mobile">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-12 items-center rounded-lg px-3 text-sm font-semibold uppercase tracking-wider text-ink hover:bg-cream-dark"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/products"
            className="btn-primary mt-2 min-h-12 text-center uppercase tracking-wider"
            onClick={() => setOpen(false)}
          >
            Explore spices
          </Link>
        </nav>
      </div>
    </header>
  );
}
