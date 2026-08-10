import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-forest-deep">
        Page not found
      </h1>
      <p className="mt-3 text-ink-muted">
        This path isn&apos;t in the Dharaa kitchen.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
