export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export const categories = [
  "All",
  "Espresso",
  "Brewed",
  "Iced",
  "Food",
  "Beans",
  "Merchandise",
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Americano",
    price: 28000,
    description: "A clean, bold espresso shot pulled over hot water. Simple, strong, and satisfying.",
    category: "Espresso",
    image: "/",
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 32000,
    description: "Equal parts espresso, steamed milk, and thick foam. A classic done right.",
    category: "Espresso",
    image: "/",
  },
  {
    id: 3,
    name: "Flat White",
    price: 34000,
    description: "Double ristretto with velvety microfoam. Stronger than a latte, smoother than a cap.",
    category: "Espresso",
    image: "/",
  },
  {
    id: 4,
    name: "Latte",
    price: 32000,
    description: "Espresso with steamed milk and a light layer of foam. Smooth and easy going.",
    category: "Espresso",
    image: "/",
  },

  // Brewed
  {
    id: 5,
    name: "Pour Over",
    price: 35000,
    description: "Single origin beans brewed slowly by hand. Every cup tells a different story.",
    category: "Brewed",
    image: "/",
  },
  {
    id: 6,
    name: "Cold Brew",
    price: 38000,
    description: "Steeped for 18 hours in cold water. Smooth, low acidity, and deeply satisfying.",
    category: "Brewed",
    image: "/",
  },
  {
    id: 7,
    name: "Siphon Brew",
    price: 45000,
    description: "A theatrical brew method that produces a clean, full-bodied cup.",
    category: "Brewed",
    image: "/",
  },

  // Iced
  {
    id: 8,
    name: "Iced Latte",
    price: 34000,
    description: "Espresso over ice with cold milk. The everyday go-to for a hot day.",
    category: "Iced",
    image: "/",
  },
  {
    id: 9,
    name: "Iced Americano",
    price: 30000,
    description: "Espresso and cold water over ice. Crisp, bold, and refreshing.",
    category: "Iced",
    image: "/",
  },
  {
    id: 10,
    name: "Iced Matcha Latte",
    price: 36000,
    description: "Ceremonial grade matcha whisked with cold oat milk over ice.",
    category: "Iced",
    image: "/",
  },

  // Food
  {
    id: 11,
    name: "Butter Croissant",
    price: 22000,
    description: "Flaky, golden, and buttery. Baked fresh every morning.",
    category: "Food",
    image: "/",
  },
  {
    id: 12,
    name: "Avocado Toast",
    price: 45000,
    description: "Smashed avocado on sourdough with chili flakes and a squeeze of lemon.",
    category: "Food",
    image: "/",
  },
  {
    id: 13,
    name: "Banana Bread",
    price: 28000,
    description: "Moist, dense, and not too sweet. A perfect pair with your morning brew.",
    category: "Food",
    image: "/",
  },

  // Beans
  {
    id: 14,
    name: "Gayo Arabica 250g",
    price: 95000,
    description: "Single origin from Aceh Tengah. Floral notes with a bright, clean finish.",
    category: "Beans",
    image: "/",
  },
  {
    id: 15,
    name: "Flores Bajawa 250g",
    price: 105000,
    description: "Grown at high altitude in NTT. Rich body, dark chocolate and nutty undertones.",
    category: "Beans",
    image: "/",
  },
  {
    id: 16,
    name: "House Blend 500g",
    price: 150000,
    description: "Our signature blend. Balanced, smooth, and designed for everyday brewing.",
    category: "Beans",
    image: "/",
  },

  // Merchandise
  {
    id: 17,
    name: "Chinoss Tote Bag",
    price: 85000,
    description: "Canvas tote with the Chinoss logo. Sturdy, minimal, and very carry-able.",
    category: "Merchandise",
    image: "/",
  },
  {
    id: 18,
    name: "Ceramic Mug 300ml",
    price: 120000,
    description: "Matte finish ceramic mug. Heavy, warm to hold, and dishwasher safe.",
    category: "Merchandise",
    image: "/",
  },
];