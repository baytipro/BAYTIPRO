import { ArrowLeft, LayoutGrid } from "lucide-react";
import { categories } from "../data";

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-black text-navy-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800 text-white">
            <LayoutGrid className="h-5 w-5" />
          </span>
          تسوق حسب التصنيف
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-bold text-brand-orange transition hover:text-brand-orange-dark"
        >
          عرض الكل
          <ArrowLeft className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href="#"
            className="group flex flex-col items-center gap-3 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-brand-orange/40 hover:shadow-lg hover:shadow-orange-500/10"
          >
            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-navy-50">
              <img
                src={cat.image}
                alt={cat.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex items-center gap-1.5 text-sm font-bold text-navy-800 transition group-hover:text-brand-orange">
              {cat.name}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-white">
                <ArrowLeft className="h-3 w-3" />
              </span>
            </div>
          </a>
        ))}

        {/* All categories tile */}
        <a
          href="#"
          className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-navy-300 bg-navy-50/50 p-4 transition hover:-translate-y-1 hover:border-brand-orange hover:bg-orange-50"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-navy-800 shadow-sm transition group-hover:text-brand-orange">
            <LayoutGrid className="h-7 w-7" />
          </span>
          <span className="text-sm font-bold text-navy-800 transition group-hover:text-brand-orange">
            كل التصنيفات
          </span>
        </a>
      </div>
    </section>
  );
}
