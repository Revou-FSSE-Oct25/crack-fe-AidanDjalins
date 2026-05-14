export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
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
    description: "A clean, bold espresso shot pulled over hot water. Simple, strong, and satisfying.",
    price: 28000,
    imageUrl: "/",
    category: "Espresso",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and thick foam. A classic done right.",
    price: 32000,
    imageUrl: "/",
    category: "Espresso",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Flat White",
    description: "Double ristretto with velvety microfoam. Stronger than a latte, smoother than a cap.",
    price: 34000,
    imageUrl: "/",
    category: "Espresso",
    isAvailable: true,
  },
  {
    id: 4,
    name: "Latte",
    description: "Espresso with steamed milk and a light layer of foam. Smooth and easy going.",
    price: 32000,
    imageUrl: "/",
    category: "Espresso",
    isAvailable: true,
  },

  // Brewed
  {
    id: 5,
    name: "Pour Over",
    description: "Single origin beans brewed slowly by hand. Every cup tells a different story.",
    price: 35000,
    imageUrl: "/",
    category: "Brewed",
    isAvailable: true,
  },
  {
    id: 6,
    name: "Cold Brew",
    description: "Steeped for 18 hours in cold water. Smooth, low acidity, and deeply satisfying.",
    price: 38000,
    imageUrl: "/",
    category: "Brewed",
    isAvailable: true,
  },
  {
    id: 7,
    name: "Siphon Brew",
    description: "A theatrical brew method that produces a clean, full-bodied cup.",
    price: 45000,
    imageUrl: "/",
    category: "Brewed",
    isAvailable: true,
  },

  // Iced
  {
    id: 8,
    name: "Iced Latte",
    description: "Espresso over ice with cold milk. The everyday go-to for a hot day.",
    price: 34000,
    imageUrl: "/",
    category: "Iced",
    isAvailable: true,
  },
  {
    id: 9,
    name: "Iced Americano",
    description: "Espresso and cold water over ice. Crisp, bold, and refreshing.",
    price: 30000,
    imageUrl: "/",
    category: "Iced",
    isAvailable: true,
  },
  {
    id: 10,
    name: "Iced Matcha Latte",
    description: "Ceremonial grade matcha whisked with cold oat milk over ice.",
    price: 36000,
    imageUrl: "/",
    category: "Iced",
    isAvailable: true,
  },

  // Food
  {
    id: 11,
    name: "Butter Croissant",
    description: "Flaky, golden, and buttery. Baked fresh every morning.",
    price: 22000,
    imageUrl: "/",
    category: "Food",
    isAvailable: true,
  },
  {
    id: 12,
    name: "Avocado Toast",
    description: "Smashed avocado on sourdough with chili flakes and a squeeze of lemon.",
    price: 45000,
    imageUrl: "/",
    category: "Food",
    isAvailable: true,
  },
  {
    id: 13,
    name: "Banana Bread",
    description: "Moist, dense, and not too sweet. A perfect pair with your morning brew.",
    price: 28000,
    imageUrl: "/",
    category: "Food",
    isAvailable: true,
  },

  // Beans
  {
    id: 14,
    name: "Gayo Arabica 250g",
    description: "Single origin from Aceh Tengah. Floral notes with a bright, clean finish.",
    price: 95000,
    imageUrl: "/",
    category: "Beans",
    isAvailable: true,
  },
  {
    id: 15,
    name: "Flores Bajawa 250g",
    description: "Grown at high altitude in NTT. Rich body, dark chocolate and nutty undertones.",
    price: 105000,
    imageUrl: "/",
    category: "Beans",
    isAvailable: true,
  },
  {
    id: 16,
    name: "House Blend 500g",
    description: "Our signature blend. Balanced, smooth, and designed for everyday brewing.",
    price: 150000,
    imageUrl: "/",
    category: "Beans",
    isAvailable: true,
  },

  // Merchandise
  {
    id: 17,
    name: "Chinoss Tote Bag",
    description: "Canvas tote with the Chinoss logo. Sturdy, minimal, and very carry-able.",
    price: 85000,
    imageUrl: "/",
    category: "Merchandise",
    isAvailable: true,
  },
  {
    id: 18,
    name: "Ceramic Mug 300ml",
    description: "Matte finish ceramic mug. Heavy, warm to hold, and dishwasher safe.",
    price: 120000,
    imageUrl: "/",
    category: "Merchandise",
    isAvailable: true,
  },
];