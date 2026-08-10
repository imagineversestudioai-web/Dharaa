import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import { ProductFilm } from "@/components/media/ProductFilm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.descriptor,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <div className="pb-20">
      <section className="border-b border-forest/10 bg-cream">
        <div className="container-site grid gap-10 py-12 md:grid-cols-2 md:py-16 lg:gap-16">
          <Reveal>
            <ProductFilm
              src={product.image}
              alt={product.name}
              priority
              className="mx-auto aspect-[3/4] w-full max-w-md rounded-3xl shadow-pouch"
            />
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-center">
            <p className="eyebrow" style={{ color: product.accent }}>
              Dharaa · Wave 1
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-forest-deep md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-2 font-devanagari text-xl text-ink-muted">
              {product.nameHi}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              {product.descriptor}
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink">
              {product.story}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {product.claims.map((c) => (
                <li
                  key={c}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{
                    background: product.accentSoft,
                    color: product.accent,
                  }}
                >
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/find-us" className="btn-primary">
                Find near you
              </Link>
              <Link href="/recipes" className="btn-ghost">
                See recipes
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Brochure site — no online cart. Ask your local retailer or
              distributor for Dharaa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-14">
        <h2 className="font-display text-2xl font-bold text-forest-deep">
          Other flavours in the range
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-forest/10 bg-cream-soft transition hover:border-forest/30 hover:shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="300px"
                  className="object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="font-display text-lg font-bold text-forest-deep">
                  {p.name}
                </p>
                <p className="text-sm text-ink-muted">{p.weight}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
