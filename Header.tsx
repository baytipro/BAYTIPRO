import {
  Phone,
  Truck,
  Headphones,
  MapPin,
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  Home,
  CookingPot,
  ShowerHead,
  Flame,
  Lightbulb,
  Droplets,
  Bath,
  Wrench,
  Menu,
} from "lucide-react";
import { useStore } from "../store";
import { formatDH } from "../data";

function Logo() {
  return (
    <a href="#" className="flex items-center gap-3 shrink-0">
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-dark shadow-lg shadow-orange-500/30">
          <Home className="h-7 w-7 text-white" strokeWidth={2.4} />
        </div>
        <span className="absolute -bottom-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-navy-800 text-[8px] font-black text-white ring-2 ring-white">
          P
        </span>
      </div>
      <div className="leading-tight">
        <div className="text-2xl font-black tracking-tight">
          <span className="text-navy-800">Bayti</span>
          <span className="text-brand-orange">Pro</span>
        </div>
        <div className="text-[11px] font-semibold text-navy-400">
          كل ما تحتاجه لتجهيز دارك
        </div>
      </div>
    </a>
  );
}

export function TopBar() {
  return (
    <div className="bg-navy-900 text-white text-[12px]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 font-semibold text-brand-amber">
            <Phone className="h-3.5 w-3.5" />
            <span dir="ltr">+212 5 22 00 00 00</span>
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <Truck className="h-4 w-4 text-brand-orange" />
            توصيل سريع لجميع المدن المغربية
          </span>
        </div>
        <div className="flex items-center gap-5 text-white/80">
          <a href="#" className="hidden items-center gap-1.5 transition hover:text-brand-amber md:flex">
            <MapPin className="h-3.5 w-3.5" />
            تتبع طلبك
          </a>
          <a href="#" className="flex items-center gap-1.5 transition hover:text-brand-amber">
            <Headphones className="h-3.5 w-3.5" />
            مساعدة
          </a>
        </div>
      </div>
    </div>
  );
}

export function MainHeader() {
  const { cartCount, cartTotal, setCartOpen } = useStore();
  return (
    <div className="border-b border-navy-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-4">
        <Logo />

        {/* Search */}
        <div className="hidden flex-1 md:block">
          <div className="flex overflow-hidden rounded-xl border-2 border-navy-800 bg-white focus-within:border-brand-orange transition">
            <input
              type="text"
              placeholder="ابحث عن منتج، صنف أو ماركة..."
              className="w-full bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-navy-300"
            />
            <button className="flex items-center gap-2 bg-navy-800 px-6 text-sm font-bold text-white transition hover:bg-navy-700">
              <Search className="h-4 w-4" />
              بحث
            </button>
          </div>
        </div>

        {/* Account + Cart */}
        <div className="mr-auto flex items-center gap-3 md:mr-0">
          <button className="hidden items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-navy-800 transition hover:bg-navy-50 lg:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700">
              <User className="h-5 w-5" />
            </span>
            <span className="flex items-center gap-1">
              حسابي
              <ChevronDown className="h-3.5 w-3.5 text-navy-400" />
            </span>
          </button>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-navy-800 transition hover:bg-navy-50"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-brand-orange">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] font-black text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </span>
            <span className="hidden flex-col items-start leading-tight lg:flex">
              <span className="text-[11px] font-semibold text-navy-400">السلة</span>
              <span dir="ltr">{formatDH(cartTotal)} DH</span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="flex overflow-hidden rounded-xl border-2 border-navy-800 bg-white">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            className="w-full bg-transparent px-4 py-2 text-sm outline-none placeholder:text-navy-300"
          />
          <button className="bg-navy-800 px-4 text-white">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

const navItems = [
  { label: "الرئيسية", icon: Home, active: true },
  { label: "الكوزينة", icon: CookingPot },
  { label: "لافابو", icon: Droplets },
  { label: "الشوفو", icon: ShowerHead },
  { label: "الضو", icon: Lightbulb },
  { label: "الغاز", icon: Flame },
  { label: "الحمامات", icon: Bath },
  { label: "أدوات ومستلزمات أخرى", icon: Wrench },
];

export function NavBar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="scroll-thin flex items-center gap-1 overflow-x-auto py-2">
          <li className="ml-2 lg:hidden">
            <Menu className="h-5 w-5 text-navy-800" />
          </li>
          {navItems.map((item) => (
            <li key={item.label} className="shrink-0">
              <a
                href="#"
                className={
                  item.active
                    ? "flex items-center gap-2 rounded-xl bg-brand-orange px-4 py-2 text-sm font-bold text-white shadow-md shadow-orange-500/30"
                    : "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-navy-800 transition hover:bg-navy-50 hover:text-brand-orange"
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
