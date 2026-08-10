import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** Product still image for carousel and PDP. */
export function ProductFilm({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 90vw, 320px",
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-cream-dark ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-deep/15 via-transparent to-transparent" />
    </div>
  );
}
