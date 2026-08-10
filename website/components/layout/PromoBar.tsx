import { site } from "@/lib/site";

export function PromoBar() {
  return (
    <div className="bg-gold text-center text-forest-deep">
      <p className="px-4 py-2 text-xs font-semibold tracking-wide md:text-sm">
        {site.promo}
      </p>
    </div>
  );
}
