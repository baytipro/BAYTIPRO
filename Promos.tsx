import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  Headphones,
  BadgeCheck,
} from "lucide-react";

const banners = [
  {
    title: "تجهيزات الحمامات",
    subtitle: "راحة وأناقة في دارك",
    image: "/images/banners/shower.jpg",
    theme: "navy" as const,
  },
  {
    title: "إضاءة عصرية",
    subtitle: "لجمال بيتك",
    image: "/images/banners/lamp.jpg",
    theme: "orange" as const,
  },
  {
    title: "غاز آمن وموثوق",
    subtitle: "لجميع استعمالاتك",
    image: "/images/banners/gas.jpg",
    theme: "navy" as const,
  },
];

export function PromoBanners() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14">
      <div className="grid gap-5 md:grid-cols-3">
        {banners.map((b) => (
          <a
            key={b.title}
            href="#"
            className="group relative flex h-56 items-end overflow-hidden rounded-3xl shadow-lg shadow-navy-900/10 transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <img
              src={b.image}
              alt={b.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div
              className={
                "absolute inset-0 " +
                (b.theme === "navy"
                  ? "bg-gradient-to-t from-navy-950/90 via-navy-900/40 to-transparent"
                  : "bg-gradient-to-t from-orange-700/90 via-orange-600/30 to-transparent")
              }
            />
            <div className="relative z-10 flex w-full items-end justify-between gap-3 p-6">
              <div>
                <h3 className="text-xl font-black text-white">{b.title}</h3>
                <p className="mt-1 text-sm font-semibold text-white/80">{b.subtitle}</p>
              </div>
              <span
                className={
                  "flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-black shadow-lg transition " +
                  (b.theme === "navy"
                    ? "bg-brand-orange text-white group-hover:bg-brand-orange-dark"
                    : "bg-white text-navy-900 group-hover:bg-navy-900 group-hover:text-white")
                }
              >
                تسوق الآن
                <ArrowLeft className="h-4 w-4" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const trustItems = [
  {
    icon: Truck,
    title: "توصيل سريع",
    text: "لجميع المدن المغربية",
  },
  {
    icon: ShieldCheck,
    title: "دفع آمن",
    text: "بجميع الوسائل والدفع عند الاستلام",
  },
  {
    icon: Headphones,
    title: "خدمة الزبناء",
    text: "من 8 صباحاً إلى 10 مساءً",
  },
  {
    icon: BadgeCheck,
    title: "ضمان الجودة",
    text: "على جميع المنتجات",
  },
];

export function TrustBar() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14">
      <div className="grid grid-cols-2 gap-4 rounded-3xl border border-navy-100 bg-white p-6 shadow-sm lg:grid-cols-4 lg:p-8">
        {trustItems.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy-50 text-navy-800 transition">
              <item.icon className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <div>
              <h4 className="text-sm font-black text-navy-900 lg:text-base">{item.title}</h4>
              <p className="mt-0.5 text-xs font-semibold text-navy-400">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
