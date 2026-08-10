import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { PurityTheater } from "@/components/sections/PurityTheater";
import { ProductCarousel } from "@/components/sections/ProductCarousel";
import { RecipesTeaser } from "@/components/sections/RecipesTeaser";
import { FindUsCta } from "@/components/sections/FindUsCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <PurityTheater />
      <ProductCarousel />
      <RecipesTeaser />
      <FindUsCta />
    </>
  );
}
