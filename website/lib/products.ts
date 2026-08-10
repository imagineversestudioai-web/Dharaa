export type Product = {
  slug: string;
  name: string;
  nameHi: string;
  weight: string;
  accent: string;
  accentSoft: string;
  descriptor: string;
  story: string;
  claims: string[];
  emoji: string;
  gradient: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "laal-mirchi-powder",
    name: "Laal Mirchi Powder",
    nameHi: "लाल मिर्च पाउडर",
    weight: "200g",
    accent: "#8B1E1E",
    accentSoft: "#F8EAEA",
    descriptor:
      "Made from the finest quality red chillies for vibrant colour and bold taste.",
    story:
      "Sun-kissed red chillies, carefully selected and finely ground for pure heat and rich colour — the backbone of everyday Indian cooking.",
    claims: ["Pure flavour", "Rich colour", "Hygienically processed"],
    emoji: "🌶️",
    gradient: "from-[#8B1E1E] to-[#5C1212]",
    image: "/images/product-laal-mirchi.jpg",
  },
  {
    slug: "dhaniya-masala",
    name: "Dhaniya Masala",
    nameHi: "धनिया मसाला",
    weight: "100g",
    accent: "#2F5D3A",
    accentSoft: "#E8F0EB",
    descriptor:
      "Made from premium coriander seeds, finely ground for rich aroma and taste.",
    story:
      "Premium coriander seeds, cleaned and finely ground to release a fresh, citrusy aroma that lifts dals, sabzis, and marinades.",
    claims: ["Freshly ground feel", "Pure & aromatic", "Rich in aroma"],
    emoji: "🌿",
    gradient: "from-[#2F5D3A] to-[#1B4D3E]",
    image: "/images/product-dhaniya.jpg",
  },
  {
    slug: "garam-masala",
    name: "Garam Masala",
    nameHi: "गरम मसाला",
    weight: "100g",
    accent: "#5C3A1E",
    accentSoft: "#F3EDE6",
    descriptor:
      "A traditional blend of handpicked spices for rich aroma, warmth and authentic taste.",
    story:
      "A classic North Indian blend — cardamom, cinnamon, cloves and more — expertly balanced for warmth without bitterness.",
    claims: ["Perfect blend", "Rich aroma", "Authentic taste"],
    emoji: "✨",
    gradient: "from-[#5C3A1E] to-[#3D2614]",
    image: "/images/product-garam-masala.jpg",
  },
  {
    slug: "all-in-one-masala",
    name: "All in One Masala",
    nameHi: "ऑल इन वन मसाला",
    weight: "100g",
    accent: "#B8860B",
    accentSoft: "#FBF6E6",
    descriptor:
      "A perfect blend of spices that makes every dish tasty, easy and special.",
    story:
      "One tin for busy kitchens — a balanced everyday blend that brings depth to sabzi, rice, and snacks without fuss.",
    claims: ["One masala, many dishes", "Easy & tasty", "Packed with care"],
    emoji: "🍲",
    gradient: "from-[#B8860B] to-[#8A6508]",
    image: "/images/product-all-in-one.jpg",
  },
];



export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
