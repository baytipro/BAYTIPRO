export interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  oldPrice: number;
  price: number;
  discount: number;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "طقم قدور كوزينة 10 قطع",
    category: "الكوزينة",
    image: "/images/products/cookware.jpg",
    oldPrice: 1499,
    price: 899,
    discount: 40,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "خلاط كوزينة عالي الجودة",
    category: "لافابو",
    image: "/images/products/faucet.jpg",
    oldPrice: 650,
    price: 420,
    discount: 35,
    rating: 4.6,
    reviews: 87,
  },
  {
    id: 3,
    name: "سخان الماء 50 لتر",
    category: "الشوفو",
    image: "/images/products/water-heater.jpg",
    oldPrice: 2999,
    price: 2249,
    discount: 25,
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 4,
    name: "إضاءة LED سقف عصرية",
    category: "الضو",
    image: "/images/products/led-panel.jpg",
    oldPrice: 89,
    price: 62,
    discount: 30,
    rating: 4.5,
    reviews: 56,
  },
  {
    id: 5,
    name: "موقد غاز 4 عيون زجاج",
    category: "الغاز",
    image: "/images/products/gas-hob.jpg",
    oldPrice: 1499,
    price: 1199,
    discount: 20,
    rating: 4.7,
    reviews: 145,
  },
  {
    id: 6,
    name: "لافابو سيراميك مع خلاط",
    category: "الحمامات",
    image: "/images/products/sink.jpg",
    oldPrice: 1150,
    price: 799,
    discount: 30,
    rating: 4.6,
    reviews: 92,
  },
];

export interface Category {
  id: number;
  name: string;
  image: string;
}

export const categories: Category[] = [
  { id: 1, name: "الكوزينة", image: "/images/products/gas-hob.jpg" },
  { id: 2, name: "لافابو", image: "/images/products/sink.jpg" },
  { id: 3, name: "الشوفو", image: "/images/products/water-heater.jpg" },
  { id: 4, name: "الضو", image: "/images/products/led-panel.jpg" },
  { id: 5, name: "الغاز", image: "/images/banners/gas.jpg" },
  { id: 6, name: "الحمامات", image: "/images/banners/shower.jpg" },
  { id: 7, name: "أدوات المطبخ", image: "/images/products/cookware.jpg" },
];

export const navLinks = [
  "الرئيسية",
  "الكوزينة",
  "لافابو",
  "الشوفو",
  "الضو",
  "الغاز",
  "الحمامات",
  "أدوات ومستلزمات أخرى",
];

export function formatDH(n: number) {
  return n.toLocaleString("en-US");
}
