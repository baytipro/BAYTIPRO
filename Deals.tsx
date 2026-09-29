import { useState } from "react";
import { ArrowLeft, Flame, Heart, ShoppingCart, Star } from "lucide-react";
import { formatDH, type Product } from "../data";
import { useStore } from "../store";

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-900/10">
      {/* Image area */}
      <div className="relative bg-white p-4">
        {product.discount > 0 && (
          <span className="absolute right-3 top-3 z-10 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-black text-white shadow-md shadow-red-600/30">
            -{product.discount}%
          </span>
        )}
        <button
          onClick={() => setLiked(!liked)}
          aria-label="أضف إلى المفضلة"
          className={
            "absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border transition " +
            (liked
              ? "border-red-200 bg-red-50 text-red-500"
              : "border-navy-100 bg-white text-navy-300 hover:text-red-500")
          }
        >
          <Heart className={"h-4.5 w-4.5 " + (liked ? "fill-red-500" : "")} />
        </button>
        <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 px-4 pb-4">
        <span className="text-[11px] font-bold text-navy-400">{product.category}</span>
        <h3 className="text-sm font-black leading-snug text-navy-900">{product.name}</h3>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-brand-amber">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={
                  "h-3.5 w-3.5 " +
                  (i <= Math.round(product.rating) ? "fill-brand-amber" : "fill-navy-100 text-navy-100")
                }
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-navy-400">({product.reviews})</span>
        </div>

        <div className="mt-1 flex items-baseline gap-3">
          <span className="text-lg font-black text-red-600" dir="ltr">
            {formatDH(product.price)} DH
          </span>
          {product.discount > 0 && (
            <span className="text-sm font-bold text-navy-300 line-through" dir="ltr">
              {formatDH(product.oldPrice)} DH
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={
            "mt-auto flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-black transition " +
            (added
              ? "bg-emerald-600 text-white"
              : "bg-navy-800 text-white hover:bg-brand-orange")
          }
        >
          <ShoppingCart className="h-4 w-4" />
          {added ? "تمت الإضافة ✓" : "أضف إلى السلة"}
        </button>
      </div>
    </article>
  );
}

export default function Deals() {
  const { products } = useStore();
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-black text-navy-900">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange to-red-500 text-white shadow-lg shadow-orange-500/30">
            <Flame className="h-5 w-5" />
          </span>
          عروض اليوم
          <span className="hidden rounded-lg bg-red-50 px-3 py-1 text-xs font-black text-red-600 sm:inline-block">
            ينتهي العرض خلال 23:45:12
          </span>
        </h2>
        <a
          href="#"
          className="flex items-center gap-1 text-sm font-bold text-brand-orange transition hover:text-brand-orange-dark"
        >
          عرض الكل
          <ArrowLeft className="h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
