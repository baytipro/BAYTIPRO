import { useMemo, useRef, useState } from "react";
import {
  Home,
  LayoutDashboard,
  Package,
  PlusCircle,
  LogOut,
  Store,
  Pencil,
  Trash2,
  Search,
  TrendingDown,
  Tags,
  Wallet,
  RotateCcw,
  X,
  Save,
  ImageIcon,
  Upload,
  Loader2,
} from "lucide-react";
import { useStore, PLACEHOLDER_IMAGE } from "../store";
import { formatDH, type Product } from "../data";

const CATEGORIES = [
  "الكوزينة",
  "لافابو",
  "الشوفو",
  "الضو",
  "الغاز",
  "الحمامات",
  "أدوات ومستلزمات أخرى",
];

const PRESET_IMAGES = [
  "/images/products/cookware.jpg",
  "/images/products/faucet.jpg",
  "/images/products/water-heater.jpg",
  "/images/products/led-panel.jpg",
  "/images/products/gas-hob.jpg",
  "/images/products/sink.jpg",
  "/images/banners/shower.jpg",
  "/images/banners/lamp.jpg",
  "/images/banners/gas.jpg",
];

type View = "dashboard" | "products" | "add";

/* ضغط الصورة وتحويلها لـ base64 حتى تُحفظ في المتصفح */
function compressImage(file: File, maxSize = 700, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxSize || height > maxSize) {
          const ratio = Math.min(maxSize / width, maxSize / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas error"));
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("image load error"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("file read error"));
    reader.readAsDataURL(file);
  });
}

/* ---------------- Product form ---------------- */

interface FormProps {
  initial?: Product;
  onDone: () => void;
}

function ProductForm({ initial, onDone }: FormProps) {
  const { addProduct, updateProduct } = useStore();
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? CATEGORIES[0]);
  const [image, setImage] = useState(initial?.image ?? "");
  const [oldPrice, setOldPrice] = useState(initial?.oldPrice?.toString() ?? "");
  const [price, setPrice] = useState(initial?.price?.toString() ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const discount = useMemo(() => {
    const op = parseFloat(oldPrice);
    const p = parseFloat(price);
    if (!op || !p || p >= op) return 0;
    return Math.round(((op - p) / op) * 100);
  }, [oldPrice, price]);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("المرجو اختيار ملف صورة (JPG, PNG...)");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const dataUrl = await compressImage(file);
      setImage(dataUrl);
      setSuccess("✓ تم رفع الصورة بنجاح");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("وقع خطأ أثناء رفع الصورة، حاول مرة أخرى");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(price);
    let op = parseFloat(oldPrice);
    if (!name.trim()) return setError("المرجو إدخال اسم المنتج");
    if (!p || p <= 0) return setError("المرجو إدخال ثمن البيع بشكل صحيح");
    // الثمن القديم اختياري: إذا كان فارغاً أو أقل من ثمن البيع فلا يوجد تخفيض
    if (!op || op <= p) op = p;
    const finalDiscount = op > p ? Math.round(((op - p) / op) * 100) : 0;

    const data = {
      name: name.trim(),
      category,
      // الصورة اختيارية — تُستعمل صورة افتراضية إذا لم تُحدد
      image: image.trim() || PLACEHOLDER_IMAGE,
      oldPrice: op,
      price: p,
      discount: finalDiscount,
      rating: initial?.rating ?? 4.5,
      reviews: initial?.reviews ?? 0,
    };

    try {
      if (initial) {
        updateProduct({ ...data, id: initial.id });
      } else {
        addProduct(data);
      }
      onDone();
    } catch {
      setError("تعذر الحفظ: مساحة التخزين ممتلئة. جرب صورة أصغر أو احذف بعض المنتجات.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
      {/* Fields */}
      <div className="space-y-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm lg:col-span-2">
        <h3 className="text-base font-black text-navy-900">معلومات المنتج</h3>

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-600">
            {success}
          </div>
        )}

        <label className="block">
          <span className="mb-1.5 block text-sm font-black text-navy-800">
            اسم المنتج (بالعربية)
          </span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: طقم قدور كوزينة 10 قطع"
            className="w-full rounded-xl border-2 border-navy-100 bg-navy-50/50 px-4 py-3 text-sm font-bold outline-none transition placeholder:text-navy-300 focus:border-brand-orange focus:bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-black text-navy-800">التصنيف</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border-2 border-navy-100 bg-navy-50/50 px-4 py-3 text-sm font-bold outline-none transition focus:border-brand-orange focus:bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-black text-navy-800">
              الثمن القديم (اختياري)
            </span>
            <input
              type="number"
              min="0"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              placeholder="1499"
              className="w-full rounded-xl border-2 border-navy-100 bg-navy-50/50 px-4 py-3 text-sm font-bold outline-none transition placeholder:text-navy-300 focus:border-brand-orange focus:bg-white"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-black text-navy-800">
              الثمن الجديد (DH)
            </span>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="899"
              className="w-full rounded-xl border-2 border-navy-100 bg-navy-50/50 px-4 py-3 text-sm font-bold outline-none transition placeholder:text-navy-300 focus:border-brand-orange focus:bg-white"
            />
          </label>
          <div>
            <span className="mb-1.5 block text-sm font-black text-navy-800">
              نسبة التخفيض
            </span>
            <div className="flex items-center justify-center rounded-xl bg-red-50 px-4 py-3 text-lg font-black text-red-600">
              -{discount}%
            </div>
          </div>
        </div>
        <p className="-mt-2 text-xs font-bold text-navy-400">
          💡 الثمن القديم اختياري — اتركه فارغاً إذا لم يكن هناك تخفيض
        </p>

        {/* رفع صورة من الجهاز */}
        <div>
          <span className="mb-2 block text-sm font-black text-navy-800">
            صورة المنتج <span className="font-bold text-navy-400">(اختيارية)</span>
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-xl border-2 border-dashed border-brand-orange bg-orange-50 px-6 py-4 text-sm font-black text-brand-orange-dark transition hover:bg-orange-100 disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  جاري رفع الصورة...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  رفع صورة من جهازك
                </>
              )}
            </button>
            {image && (
              <div className="relative">
                <img
                  src={image}
                  alt=""
                  className="h-16 w-16 rounded-xl border-2 border-emerald-400 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                  title="إزالة الصورة"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-black text-navy-800">
            أو ألصق رابط صورة من الإنترنت
          </span>
          <input
            type="text"
            dir="ltr"
            value={image.startsWith("data:") ? "" : image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border-2 border-navy-100 bg-navy-50/50 px-4 py-3 text-left text-sm font-bold outline-none transition placeholder:text-navy-300 focus:border-brand-orange focus:bg-white"
          />
        </label>

        <div>
          <span className="mb-2 block text-sm font-black text-navy-800">
            أو اختر من الصور الجاهزة
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_IMAGES.map((img) => (
              <button
                type="button"
                key={img}
                onClick={() => setImage(img)}
                className={
                  "h-16 w-16 overflow-hidden rounded-xl border-2 transition " +
                  (image === img
                    ? "border-brand-orange ring-2 ring-orange-200"
                    : "border-navy-100 hover:border-navy-300")
                }
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/30 transition hover:bg-brand-orange-dark"
          >
            <Save className="h-4 w-4" />
            {initial ? "حفظ التعديلات" : "إضافة المنتج"}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="flex items-center gap-2 rounded-xl bg-navy-100 px-6 py-3 text-sm font-black text-navy-800 transition hover:bg-navy-200"
          >
            <X className="h-4 w-4" />
            إلغاء
          </button>
        </div>
      </div>

      {/* Live preview */}
      <div>
        <div className="sticky top-6 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-base font-black text-navy-900">
            <ImageIcon className="h-4.5 w-4.5 text-brand-orange" />
            معاينة مباشرة
          </h3>
          <div className="overflow-hidden rounded-2xl border border-navy-100">
            <div className="relative bg-white p-4">
              <span className="absolute right-3 top-3 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-black text-white">
                -{discount}%
              </span>
              <div className="flex h-40 items-center justify-center">
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-contain"
                    onError={(e) => ((e.target as HTMLImageElement).style.opacity = "0.2")}
                  />
                ) : (
                  <ImageIcon className="h-12 w-12 text-navy-100" />
                )}
              </div>
            </div>
            <div className="space-y-1.5 px-4 pb-4">
              <span className="text-[11px] font-bold text-navy-400">{category}</span>
              <h4 className="text-sm font-black text-navy-900">
                {name || "اسم المنتج..."}
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-red-600" dir="ltr">
                  {price ? formatDH(parseFloat(price)) : "0"} DH
                </span>
                <span className="text-sm font-bold text-navy-300 line-through" dir="ltr">
                  {oldPrice ? formatDH(parseFloat(oldPrice)) : "0"} DH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

/* ---------------- Dashboard ---------------- */

export default function AdminDashboard() {
  const { products, deleteProduct, resetProducts, logout } = useStore();
  const [view, setView] = useState<View>("dashboard");
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) => p.name.includes(search) || p.category.includes(search)
  );

  const stats = useMemo(() => {
    const count = products.length;
    const avgDiscount = count
      ? Math.round(products.reduce((s, p) => s + p.discount, 0) / count)
      : 0;
    const totalValue = products.reduce((s, p) => s + p.price, 0);
    const cats = new Set(products.map((p) => p.category)).size;
    return { count, avgDiscount, totalValue, cats };
  }, [products]);

  const navItems = [
    { key: "dashboard" as View, label: "لوحة التحكم", icon: LayoutDashboard },
    { key: "products" as View, label: "المنتجات", icon: Package },
    { key: "add" as View, label: "إضافة منتج", icon: PlusCircle },
  ];

  const handleDelete = (p: Product) => {
    if (window.confirm(`هل أنت متأكد من حذف "${p.name}"؟`)) {
      deleteProduct(p.id);
    }
  };

  const startEdit = (p: Product) => {
    setEditing(p);
    setView("add");
  };

  return (
    <div dir="rtl" className="flex min-h-screen bg-[#f5f7fb]">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-navy-950 text-white lg:flex">
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange to-brand-orange-dark">
            <Home className="h-6 w-6 text-white" strokeWidth={2.4} />
          </div>
          <div>
            <div className="text-lg font-black leading-tight">
              <span className="text-white">Bayti</span>
              <span className="text-brand-orange">Pro</span>
            </div>
            <div className="text-[10px] font-bold text-white/50">لوحة تحكم المدير</div>
          </div>
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setEditing(null);
                setView(item.key);
              }}
              className={
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-black transition " +
                (view === item.key
                  ? "bg-brand-orange text-white shadow-lg shadow-orange-600/30"
                  : "text-white/60 hover:bg-white/10 hover:text-white")
              }
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
              {item.key === "products" && (
                <span className="mr-auto rounded-full bg-white/15 px-2 py-0.5 text-[11px]">
                  {products.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="space-y-1 border-t border-white/10 p-3">
          <a
            href="#/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-black text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <Store className="h-4.5 w-4.5" />
            عرض المتجر
          </a>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-black text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut className="h-4.5 w-4.5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-navy-100 bg-white/95 px-6 py-4 backdrop-blur">
          <div>
            <h1 className="text-xl font-black text-navy-900">
              {view === "dashboard" && "لوحة التحكم"}
              {view === "products" && "إدارة المنتجات"}
              {view === "add" && (editing ? "تعديل منتج" : "إضافة منتج جديد")}
            </h1>
            <p className="text-xs font-bold text-navy-400">
              مرحباً بك في لوحة تحكم BaytiPro 👋
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile nav */}
            <div className="flex gap-1 lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setEditing(null);
                    setView(item.key);
                  }}
                  className={
                    "flex h-10 w-10 items-center justify-center rounded-xl transition " +
                    (view === item.key
                      ? "bg-brand-orange text-white"
                      : "bg-navy-50 text-navy-800")
                  }
                >
                  <item.icon className="h-4.5 w-4.5" />
                </button>
              ))}
              <button
                onClick={logout}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 lg:hidden"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
            <div className="hidden items-center gap-3 lg:flex">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-black text-white">
                A
              </span>
              <div className="leading-tight">
                <div className="text-sm font-black text-navy-900">المدير</div>
                <div className="text-[11px] font-bold text-emerald-600">● متصل</div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* ---- Dashboard view ---- */}
          {view === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                {[
                  {
                    icon: Package,
                    label: "عدد المنتجات",
                    value: stats.count.toString(),
                    color: "bg-navy-800",
                  },
                  {
                    icon: TrendingDown,
                    label: "متوسط التخفيض",
                    value: `-${stats.avgDiscount}%`,
                    color: "bg-red-500",
                  },
                  {
                    icon: Wallet,
                    label: "قيمة المنتجات",
                    value: `${formatDH(stats.totalValue)} DH`,
                    color: "bg-brand-orange",
                  },
                  {
                    icon: Tags,
                    label: "التصنيفات النشطة",
                    value: stats.cats.toString(),
                    color: "bg-emerald-500",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm"
                  >
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${s.color}`}
                    >
                      <s.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <div className="text-xs font-bold text-navy-400">{s.label}</div>
                      <div className="text-lg font-black text-navy-900" dir="ltr">
                        {s.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-black text-navy-900">آخر المنتجات المضافة</h2>
                  <button
                    onClick={() => setView("products")}
                    className="text-sm font-bold text-brand-orange hover:text-brand-orange-dark"
                  >
                    عرض الكل ←
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
                  {products.slice(0, 6).map((p) => (
                    <div
                      key={p.id}
                      className="rounded-xl border border-navy-100 p-3 text-center"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="mx-auto h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="mt-2 line-clamp-1 text-xs font-black text-navy-900">
                        {p.name}
                      </div>
                      <div className="text-xs font-black text-red-600" dir="ltr">
                        {formatDH(p.price)} DH
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setView("add")}
                  className="flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/30 transition hover:bg-brand-orange-dark"
                >
                  <PlusCircle className="h-4.5 w-4.5" />
                  إضافة منتج جديد
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("سيتم إرجاع المنتجات الافتراضية. متابعة؟"))
                      resetProducts();
                  }}
                  className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black text-navy-800 shadow-sm ring-1 ring-navy-100 transition hover:bg-navy-50"
                >
                  <RotateCcw className="h-4.5 w-4.5" />
                  استعادة المنتجات الافتراضية
                </button>
              </div>
            </div>
          )}

          {/* ---- Products view ---- */}
          {view === "products" && (
            <div className="rounded-2xl border border-navy-100 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-100 p-5">
                <div className="flex items-center gap-2 rounded-xl border-2 border-navy-100 bg-navy-50/50 px-4 py-2.5 transition focus-within:border-brand-orange focus-within:bg-white">
                  <Search className="h-4 w-4 text-navy-300" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="ابحث عن منتج..."
                    className="w-48 bg-transparent text-sm font-bold outline-none placeholder:text-navy-300"
                  />
                </div>
                <button
                  onClick={() => setView("add")}
                  className="flex items-center gap-2 rounded-xl bg-brand-orange px-5 py-2.5 text-sm font-black text-white transition hover:bg-brand-orange-dark"
                >
                  <PlusCircle className="h-4 w-4" />
                  إضافة منتج
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-right text-sm">
                  <thead>
                    <tr className="border-b border-navy-100 bg-navy-50/50 text-xs font-black text-navy-400">
                      <th className="px-5 py-3">المنتج</th>
                      <th className="px-5 py-3">التصنيف</th>
                      <th className="px-5 py-3">الثمن القديم</th>
                      <th className="px-5 py-3">الثمن الجديد</th>
                      <th className="px-5 py-3">التخفيض</th>
                      <th className="px-5 py-3">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr
                        key={p.id}
                        className="border-b border-navy-50 transition hover:bg-navy-50/40"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-12 w-12 rounded-xl border border-navy-100 object-cover"
                            />
                            <span className="font-black text-navy-900">{p.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className="rounded-lg bg-navy-50 px-3 py-1 text-xs font-black text-navy-700">
                            {p.category}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-bold text-navy-300 line-through" dir="ltr">
                          {formatDH(p.oldPrice)} DH
                        </td>
                        <td className="px-5 py-3 font-black text-navy-900" dir="ltr">
                          {formatDH(p.price)} DH
                        </td>
                        <td className="px-5 py-3">
                          <span className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-black text-red-600">
                            -{p.discount}%
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(p)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy-700 transition hover:bg-navy-800 hover:text-white"
                              title="تعديل"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(p)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                              title="حذف"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center">
                          <Package className="mx-auto h-10 w-10 text-navy-200" />
                          <p className="mt-2 font-bold text-navy-400">لا توجد منتجات</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ---- Add/Edit view ---- */}
          {view === "add" && (
            <ProductForm
              key={editing?.id ?? "new"}
              initial={editing ?? undefined}
              onDone={() => {
                setEditing(null);
                setView("products");
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
