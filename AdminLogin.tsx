import { useState } from "react";
import { Home, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import { useStore, ADMIN_USER, ADMIN_PASS } from "../store";

export default function AdminLogin() {
  const { login } = useStore();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(user, pass)) {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-navy-950 p-4"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at top right, rgba(249,115,22,0.15), transparent 50%), radial-gradient(ellipse at bottom left, rgba(43,90,167,0.25), transparent 50%)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-orange to-brand-orange-dark shadow-xl shadow-orange-600/30">
            <Home className="h-9 w-9 text-white" strokeWidth={2.4} />
          </div>
          <div className="text-3xl font-black">
            <span className="text-white">Bayti</span>
            <span className="text-brand-orange">Pro</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black text-brand-amber">
            <ShieldCheck className="h-4 w-4" />
            لوحة تحكم المدير
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-2xl shadow-black/40"
        >
          <h1 className="text-xl font-black text-navy-900">تسجيل الدخول</h1>
          <p className="mt-1 text-sm font-semibold text-navy-400">
            هذه الصفحة خاصة بإدارة المتجر فقط
          </p>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          <label className="mt-6 block">
            <span className="mb-1.5 block text-sm font-black text-navy-800">
              اسم المستخدم
            </span>
            <div className="flex items-center gap-2 rounded-xl border-2 border-navy-100 bg-navy-50/50 px-4 py-3 transition focus-within:border-brand-orange focus-within:bg-white">
              <User className="h-4.5 w-4.5 text-navy-300" />
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="admin"
                className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-navy-300"
                autoFocus
              />
            </div>
          </label>

          <label className="mt-4 block">
            <span className="mb-1.5 block text-sm font-black text-navy-800">
              كلمة المرور
            </span>
            <div className="flex items-center gap-2 rounded-xl border-2 border-navy-100 bg-navy-50/50 px-4 py-3 transition focus-within:border-brand-orange focus-within:bg-white">
              <Lock className="h-4.5 w-4.5 text-navy-300" />
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm font-bold outline-none placeholder:text-navy-300"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="text-navy-300 transition hover:text-navy-800"
              >
                {showPass ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 py-3.5 text-sm font-black text-white transition hover:bg-brand-orange"
          >
            دخول إلى لوحة التحكم
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>

          <div className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-center text-xs font-bold text-amber-700">
            بيانات تجريبية: <span dir="ltr">{ADMIN_USER}</span> /{" "}
            <span dir="ltr">{ADMIN_PASS}</span>
          </div>
        </form>

        <a
          href="#/"
          className="mt-6 block text-center text-sm font-bold text-white/50 transition hover:text-brand-orange"
        >
          → العودة إلى المتجر
        </a>
      </div>
    </div>
  );
}
