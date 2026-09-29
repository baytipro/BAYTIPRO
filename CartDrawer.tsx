import { X, Trash2, Plus, Minus, ShoppingCart, MessageCircle, PackageOpen } from "lucide-react";
import { useStore } from "../store";
import { formatDH } from "../data";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartLines, cartTotal, setQty, removeFromCart, clearCart } =
    useStore();

  const whatsappOrder = () => {
    const lines = cartLines
      .map((l) => `• ${l.product.name} × ${l.qty} = ${formatDH(l.product.price * l.qty)} DH`)
      .join("\n");
    const msg = `السلام عليكم، أريد طلب المنتجات التالية من BaytiPro:\n\n${lines}\n\nالمجموع: ${formatDH(cartTotal)} DH`;
    window.open(`https://wa.me/212522000000?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setCartOpen(false)}
        className={
          "fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 " +
          (cartOpen ? "opacity-100" : "pointer-events-none opacity-0")
        }
      />

      {/* Drawer */}
      <aside
        dir="rtl"
        className={
          "fixed left-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 " +
          (cartOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-navy-100 bg-navy-900 px-5 py-4 text-white">
          <h2 className="flex items-center gap-2 text-lg font-black">
            <ShoppingCart className="h-5 w-5 text-brand-orange" />
            سلة المشتريات
            <span className="rounded-full bg-brand-orange px-2.5 py-0.5 text-xs font-black">
              {cartLines.length}
            </span>
          </h2>
          <button
            onClick={() => setCartOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-brand-orange"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartLines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-navy-50">
                <PackageOpen className="h-10 w-10 text-navy-200" />
              </span>
              <div>
                <p className="text-base font-black text-navy-900">السلة فارغة</p>
                <p className="mt-1 text-sm font-semibold text-navy-400">
                  أضف منتجات من عروض اليوم لتظهر هنا
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-xl bg-brand-orange px-6 py-3 text-sm font-black text-white transition hover:bg-brand-orange-dark"
              >
                تصفح المنتجات
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {cartLines.map((l) => (
                <li
                  key={l.productId}
                  className="flex gap-3 rounded-2xl border border-navy-100 bg-white p-3 shadow-sm"
                >
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    className="h-20 w-20 shrink-0 rounded-xl border border-navy-50 object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-black leading-snug text-navy-900">
                        {l.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(l.productId)}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                        aria-label="حذف"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1 rounded-xl border border-navy-100 p-1">
                        <button
                          onClick={() => setQty(l.productId, l.qty + 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-50 text-navy-800 transition hover:bg-brand-orange hover:text-white"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-black text-navy-900">
                          {l.qty}
                        </span>
                        <button
                          onClick={() => setQty(l.productId, l.qty - 1)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-50 text-navy-800 transition hover:bg-brand-orange hover:text-white"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-black text-red-600" dir="ltr">
                        {formatDH(l.product.price * l.qty)} DH
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartLines.length > 0 && (
          <div className="space-y-3 border-t border-navy-100 bg-navy-50/50 p-5">
            <div className="flex items-center justify-between text-sm font-bold text-navy-400">
              <span>التوصيل</span>
              <span className="text-emerald-600">يُحدد حسب المدينة</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-black text-navy-900">المجموع</span>
              <span className="text-2xl font-black text-red-600" dir="ltr">
                {formatDH(cartTotal)} DH
              </span>
            </div>
            <button
              onClick={whatsappOrder}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-700"
            >
              <MessageCircle className="h-5 w-5" />
              إتمام الطلب عبر واتساب
            </button>
            <button
              onClick={clearCart}
              className="w-full rounded-xl py-2 text-xs font-bold text-navy-400 transition hover:text-red-500"
            >
              إفراغ السلة
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
