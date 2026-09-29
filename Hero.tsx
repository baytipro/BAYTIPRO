import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6">
      <div className="relative overflow-hidden rounded-3xl bg-navy-900 shadow-2xl shadow-navy-900/20">
        <div className="grid lg:grid-cols-2">
          {/* Text side */}
          <div className="relative z-10 flex flex-col items-start justify-center gap-5 px-8 py-12 lg:px-14 lg:py-16">
            {/* decorative orange slashes */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rotate-12 rounded-[3rem] bg-brand-orange/15" />
            <div className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 -rotate-12 rounded-full bg-brand-orange/10 blur-sm" />

            <span className="relative inline-block -rotate-2 rounded-xl bg-gradient-to-l from-brand-orange to-brand-orange-dark px-6 py-2.5 text-2xl font-black text-white shadow-lg shadow-orange-600/40 lg:text-3xl">
              عروض استثنائية
            </span>

            <h1 className="text-3xl font-black leading-snug text-white lg:text-5xl">
              على تجهيزات{" "}
              <span className="text-brand-amber">الكوزينة</span>
            </h1>

            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-bold text-navy-100 lg:text-base">
              <span>جودة عالية</span>
              <span className="text-brand-orange">•</span>
              <span>ماركات معروفة</span>
              <span className="text-brand-orange">•</span>
              <span>أسعار تنافسية</span>
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-6">
              <button className="group flex items-center gap-3 rounded-2xl bg-brand-orange px-8 py-4 text-lg font-black text-white shadow-xl shadow-orange-600/40 transition hover:bg-brand-orange-dark">
                <ShoppingCart className="h-5 w-5 transition group-hover:-translate-y-0.5" />
                تسوق الآن
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* -50% badge */}
              <div className="flex h-28 w-28 -rotate-6 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-amber to-brand-orange text-navy-900 shadow-xl shadow-orange-500/40 ring-4 ring-white/20">
                <span className="text-[11px] font-black leading-none">خصومات تصل إلى</span>
                <span className="mt-1 text-3xl font-black leading-none" dir="ltr">
                  -50%
                </span>
              </div>
            </div>
          </div>

          {/* Image side */}
          <div className="relative min-h-[260px] lg:min-h-[420px]">
            <img
              src="/images/hero-kitchen.jpg"
              alt="تجهيزات الكوزينة العصرية"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-navy-900/20 to-navy-900 lg:bg-gradient-to-l lg:from-transparent lg:to-navy-900" />
            {/* orange diagonal accent */}
            <div className="pointer-events-none absolute -right-10 top-0 hidden h-full w-24 -skew-x-12 bg-gradient-to-b from-brand-orange to-brand-orange-dark opacity-90 lg:block" />
          </div>
        </div>

        {/* Carousel controls */}
        <button
          aria-label="السابق"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-brand-orange md:flex"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <button
          aria-label="التالي"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-brand-orange md:flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          <span className="h-2.5 w-7 rounded-full bg-brand-orange" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
        </div>
      </div>
    </section>
  );
}
