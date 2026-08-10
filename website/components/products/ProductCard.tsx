import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-forest/10 bg-cream-soft shadow-soft transition hover:-translate-y-1 hover:shadow-pouch"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/70 to-transparent p-4 pt-12">
          <p className="font-display text-lg font-bold text-cream drop-shadow">
            {product.name}
          </p>
          <p className="font-devanagari text-sm text-cream/85">{product.nameHi}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
          Net wt {product.weight}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">
          {product.descriptor}
        </p>
        <span className="mt-4 text-sm font-semibold text-forest group-hover:text-gold-deep">
          Explore →
        </span>
      </div>
    </Link>
  );
}
