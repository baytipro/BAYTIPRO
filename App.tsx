import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { TopBar, MainHeader, NavBar } from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Deals from "./components/Deals";
import { PromoBanners, TrustBar } from "./components/Promos";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import { StoreProvider, useStore } from "./store";

function Toast() {
  const { toast } = useStore();
  return (
    <div
      dir="rtl"
      className={
        "fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-2xl bg-navy-900 px-5 py-3.5 text-sm font-black text-white shadow-2xl shadow-navy-900/40 transition-all duration-300 " +
        (toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0")
      }
    >
      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
      {toast}
    </div>
  );
}

function Storefront() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f7fb] text-navy-900">
      <TopBar />
      <MainHeader />
      <NavBar />

      <main>
        <Hero />
        <Categories />
        <Deals />
        <PromoBanners />
        <TrustBar />
      </main>

      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
}

function AdminArea() {
  const { isAdmin } = useStore();
  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
}

function Router() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // صفحة الأدمين مخفية تماماً — الوصول إليها فقط عبر الرابط السري #/admin
  if (hash.startsWith("#/admin")) {
    return <AdminArea />;
  }

  return <Storefront />;
}

export default function App() {
  return (
    <StoreProvider>
      <Router />
    </StoreProvider>
  );
}
