export type Recipe = {
  slug: string;
  title: string;
  titleHi: string;
  mixer: string;
  mixerSlug: string;
  pair: string;
  time: string;
  blurb: string;
  steps: string[];
  color: string;
};

export const recipes: Recipe[] = [
  {
    slug: "lal-mirch-aloo",
    title: "Lal Mirch Aloo",
    titleHi: "लाल मिर्च आलू",
    mixer: "Laal Mirchi Powder",
    mixerSlug: "laal-mirchi-powder",
    pair: "Cumin & oil",
    time: "25 min",
    blurb: "Crisp potatoes kissed with Dharaa red chilli heat.",
    steps: [
      "Parboil and cube potatoes; pat dry.",
      "Temper cumin in hot oil; add potatoes.",
      "Dust with Dharaa Laal Mirchi Powder, salt, and a pinch of turmeric.",
      "Roast until edges crisp; finish with coriander.",
    ],
    color: "#8B1E1E",
  },
  {
    slug: "dhaniya-chilla",
    title: "Dhaniya Chilla",
    titleHi: "धनिया चिल्ला",
    mixer: "Dhaniya Masala",
    mixerSlug: "dhaniya-masala",
    pair: "Besan batter",
    time: "20 min",
    blurb: "Savoury gram-flour pancakes lifted with coriander aroma.",
    steps: [
      "Whisk besan with water to a pouring batter.",
      "Fold in Dharaa Dhaniya Masala, green chilli, and salt.",
      "Pour on a hot tawa; cook both sides until golden.",
      "Serve with mint chutney.",
    ],
    color: "#2F5D3A",
  },
  {
    slug: "garam-masala-dal",
    title: "Garam Masala Dal Tadka",
    titleHi: "गरम मसाला दाल तड़का",
    mixer: "Garam Masala",
    mixerSlug: "garam-masala",
    pair: "Toor dal",
    time: "35 min",
    blurb: "Comfort dal finished with a fragrant Dharaa tadka.",
    steps: [
      "Pressure-cook toor dal with turmeric until soft.",
      "Temper ghee with garlic, chilli, and cumin.",
      "Add dal; simmer. Finish with Dharaa Garam Masala.",
      "Rest 2 minutes before serving with rice.",
    ],
    color: "#5C3A1E",
  },
  {
    slug: "all-in-one-paneer",
    title: "All-in-One Paneer Bhurji",
    titleHi: "पनीर भुर्जी",
    mixer: "All in One Masala",
    mixerSlug: "all-in-one-masala",
    pair: "Paneer",
    time: "20 min",
    blurb: "Weeknight paneer scramble with one clever blend.",
    steps: [
      "Sauté onion, tomato, and green chilli.",
      "Crumble paneer into the pan.",
      "Season with Dharaa All in One Masala and salt.",
      "Cook until just set; serve with roti.",
    ],
    color: "#B8860B",
  },
];
