import { Home, Phone, Mail, MapPin, Send, Lock } from "lucide-react";
import { navLinks } from "../data";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
    <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.5 1.6-1.5h1.2V5c-.3 0-1-.1-2-.1-2 0-3.3 1.2-3.3 3.4V11H8.5v3H11v7h2.5z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
    <path d="M23 12s0-3.4-.4-5c-.2-.9-.9-1.6-1.8-1.8C19.2 4.8 12 4.8 12 4.8s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 8.6 1 12 1 12s0 3.4.4 5c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c-.9-.2 1.6-.9 1.8-1.8.4-1.6.4-5 .4-5zM9.8 15.3V8.7L15.9 12l-6.1 3.3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy-950 text-white">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 lg:flex-row">
          <div>
            <h3 className="text-xl font-black">اشترك في النشرة البريدية</h3>
            <p className="mt-1 text-sm font-semibold text-white/60">
              توصل بآخر العروض والتخفيضات الحصرية قبل الجميع
            </p>
          </div>
          <div className="flex w-full max-w-md overflow-hidden rounded-xl bg-white">
            <input
              type="email"
              placeholder="بريدك الإلكتروني..."
              className="w-full px-4 py-3 text-sm text-navy-900 outline-none placeholder:text-navy-300"
            />
            <button className="flex items-center gap-2 bg-brand-orange px-6 text-sm font-black text-white transition hover:bg-brand-orange-dark">
              <Send className="h-4 w-4" />
              اشترك
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-dark">
              <Home className="h-6 w-6 text-white" strokeWidth={2.4} />
            </div>
            <div className="text-2xl font-black">
              <span className="text-white">Bayti</span>
              <span className="text-brand-orange">Pro</span>
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold leading-relaxed text-white/60">
            متجرك المغربي الأول لتجهيزات المنزل: الكوزينة، الحمامات، الإضاءة، الغاز
            وكل ما تحتاجه لتجهيز دارك بجودة عالية وأثمنة تنافسية.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[FacebookIcon, InstagramIcon, YoutubeIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-orange"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-base font-black text-brand-amber">التصنيفات</h4>
          <ul className="space-y-2.5 text-sm font-semibold text-white/60">
            {navLinks.slice(1).map((l) => (
              <li key={l}>
                <a href="#" className="transition hover:text-brand-orange">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base font-black text-brand-amber">روابط مهمة</h4>
          <ul className="space-y-2.5 text-sm font-semibold text-white/60">
            {[
              "من نحن",
              "طرق الدفع",
              "التوصيل والإرجاع",
              "الأسئلة الشائعة",
              "شروط الاستخدام",
              "سياسة الخصوصية",
              "اتصل بنا",
            ].map((l) => (
              <li key={l}>
                <a href="#" className="transition hover:text-brand-orange">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base font-black text-brand-amber">تواصل معنا</h4>
          <ul className="space-y-4 text-sm font-semibold text-white/60">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-orange" />
              <span dir="ltr">+212 5 22 00 00 00</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-orange" />
              contact@baytipro.ma
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-orange" />
              شارع محمد الخامس، الدار البيضاء، المغرب
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {["CMI", "Visa", "Mastercard", "الدفع عند الاستلام"].map((p) => (
              <span
                key={p}
                className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-black text-white/80"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-white/10 py-5 text-center text-xs font-semibold text-white/50">
        © 2026 BaytiPro — جميع الحقوق محفوظة | صنع بحب في المغرب 🇲🇦
        <a
          href="#/admin"
          title="إدارة"
          aria-label="لوحة الإدارة"
          className="text-white/15 transition hover:text-brand-orange"
        >
          <Lock className="h-3 w-3" />
        </a>
      </div>
    </footer>
  );
}
