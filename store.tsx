import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { products as defaultProducts, type Product } from "./data";

const PRODUCTS_KEY = "baytipro_products";
const CART_KEY = "baytipro_cart";
const AUTH_KEY = "baytipro_admin_session";

export const ADMIN_USER = "admin";
export const ADMIN_PASS = "bayti2026";

/* صورة افتراضية عند عدم توفر صورة للمنتج */
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#eef3fb"/><g fill="none" stroke="#b3c8ea" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"><path d="M120 300 L200 140 L280 300 Z"/><circle cx="150" cy="130" r="25"/></g><text x="200" y="360" text-anchor="middle" font-family="sans-serif" font-size="28" fill="#7fa2d9">BaytiPro</text></svg>`
  );

export interface CartItem {
  productId: number;
  qty: number;
}

export interface CartLine extends CartItem {
  product: Product;
}

interface StoreContextType {
  /* products */
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: number) => void;
  resetProducts: () => void;
  /* cart */
  cartLines: CartLine[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  setQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  /* toast */
  toast: string;
  showToast: (msg: string) => void;
  /* auth */
  isAdmin: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed !== null && parsed !== undefined) return parsed as T;
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn("Storage quota exceeded for", key);
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    load<Product[]>(PRODUCTS_KEY, defaultProducts)
  );
  const [cart, setCart] = useState<CartItem[]>(() => load<CartItem[]>(CART_KEY, []));
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(
    () => sessionStorage.getItem(AUTH_KEY) === "1"
  );

  useEffect(() => save(PRODUCTS_KEY, products), [products]);
  useEffect(() => save(CART_KEY, cart), [cart]);

  /* ---- products ---- */
  const addProduct = (p: Omit<Product, "id">) => {
    setProducts((prev) => [
      { ...p, id: prev.length ? Math.max(...prev.map((x) => x.id)) + 1 : 1 },
      ...prev,
    ]);
  };

  const updateProduct = (p: Product) => {
    setProducts((prev) => prev.map((x) => (x.id === p.id ? p : x)));
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
    setCart((prev) => prev.filter((x) => x.productId !== id));
  };

  const resetProducts = () => setProducts(defaultProducts);

  /* ---- cart ---- */
  const cartLines = useMemo<CartLine[]>(
    () =>
      cart
        .map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return product ? { ...item, product } : null;
        })
        .filter((x): x is CartLine => x !== null),
    [cart, products]
  );

  const cartCount = useMemo(
    () => cartLines.reduce((s, l) => s + l.qty, 0),
    [cartLines]
  );

  const cartTotal = useMemo(
    () => cartLines.reduce((s, l) => s + l.qty * l.product.price, 0),
    [cartLines]
  );

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout((showToast as unknown as { t?: number }).t);
    (showToast as unknown as { t?: number }).t = window.setTimeout(
      () => setToast(""),
      2500
    );
  }, []);

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((x) => x.productId === productId);
      if (existing) {
        return prev.map((x) =>
          x.productId === productId ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { productId, qty: 1 }];
    });
    const p = products.find((x) => x.id === productId);
    showToast(p ? `✓ تمت إضافة "${p.name}" إلى السلة` : "✓ تمت الإضافة إلى السلة");
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((x) => x.productId !== productId));
  };

  const setQty = (productId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((x) => (x.productId === productId ? { ...x, qty } : x))
    );
  };

  const clearCart = () => setCart([]);

  /* ---- auth ---- */
  const login = (user: string, pass: string) => {
    if (user.trim() === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAdmin(false);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        cartLines,
        cartCount,
        cartTotal,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        setQty,
        clearCart,
        toast,
        showToast,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
