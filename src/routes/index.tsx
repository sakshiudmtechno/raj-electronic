import { createFileRoute } from "@tanstack/react-router";
import { fetchProducts, getImageUrl, ProductItem } from "../lib/api";
import logoImg from "@/assets/raj-traders-rt-logo.png";
import heroPremium1 from "@/assets/hero-premium-1.jpg";
import heroPremium2 from "@/assets/hero-premium-2.jpg";
import heroPremium3 from "@/assets/hero-premium-3.jpg";
import heroPremium4 from "@/assets/hero-premium-4.jpg";
import bannerEnt from "@/assets/banner-entertainment.jpg";
import bannerWash from "@/assets/banner-washing.jpg";
import bannerAc from "@/assets/banner-ac.jpg";
import bannerFridge from "@/assets/banner-fridge.jpg";
import bannerNewArrivals from "@/assets/banner-newarrivals.jpg";
import promoMicrowave from "@/assets/promo-microwave.jpg";
import promoSmartphone from "@/assets/promo-smartphone.jpg";
import promoTv from "@/assets/promo-tv.jpg";
import promoWashing from "@/assets/promo-washing.jpg";
import product3 from "@/assets/product-3.png.asset.json";
import product4 from "@/assets/product-4.png.asset.json";
import product5 from "@/assets/product-5.png.asset.json";
import product6 from "@/assets/product-6.png.asset.json";
import product7 from "@/assets/product-7.png.asset.json";
import product8 from "@/assets/product-8.png.asset.json";
import product9 from "@/assets/product-9.png.asset.json";
import product10 from "@/assets/product-10.png.asset.json";
import product11 from "@/assets/product-11.png.asset.json";
import productN12 from "@/assets/product-new-12.png.asset.json";
import productN13 from "@/assets/product-new-13.png.asset.json";
import productN14 from "@/assets/product-new-14.png.asset.json";
import productN15 from "@/assets/product-new-15.png.asset.json";
import productN16 from "@/assets/product-new-16.png.asset.json";
import productN17 from "@/assets/product-new-17.png.asset.json";
import productN18 from "@/assets/product-new-18.png.asset.json";
import productN19 from "@/assets/product-new-19.png.asset.json";
import productN20 from "@/assets/product-new-20.png.asset.json";
import productN21 from "@/assets/product-new-21.png.asset.json";
import productN22 from "@/assets/product-new-22.png.asset.json";
import productN23 from "@/assets/product-new-23.png.asset.json";
import productN24 from "@/assets/product-new-24.png.asset.json";
import productN25 from "@/assets/product-new-25.png.asset.json";
import productN26 from "@/assets/product-new-26.png.asset.json";
import productN27 from "@/assets/product-new-27.png.asset.json";
import productN28 from "@/assets/product-new-28.png.asset.json";
import productN29 from "@/assets/product-new-29.png.asset.json";
import productN30 from "@/assets/product-new-30.png.asset.json";
import productN31 from "@/assets/product-new-31.png.asset.json";
import {
  MapPin,
  Package,
  Navigation,
  Phone,
  User,
  Heart,
  Search,
  Headphones,
  ShoppingCart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Gift,
  ShieldCheck,
  Percent,
  Wind,
  Laptop,
  Refrigerator,
  Tv,
  Smartphone,
  Microwave,
  Fan,
  Copy,
  Tag,
  HandCoins,
  Truck,
  PackageCheck,
  Handshake,
  FileText,
  Play,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  X,
  Plus,
  Minus,
  Trash2,
  Lightbulb,
  Flashlight,
  Flame,
  Utensils,
  Megaphone,
  Zap,
  Tv2,
  Sparkles,
  Plug,
  Droplet,
  AirVent,
  WashingMachine,
  Printer,
  Home,
  LayoutGrid,
} from "lucide-react";
import { useEffect, useRef, useState, createContext, useContext, useCallback, useMemo } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raj Traders — Electronics, Appliances & More | Kalyanpura" },
      {
        name: "description",
        content:
          "Raj Traders — trusted store for Electronics, Electrical, Home Appliances, Mobiles, Kitchen Essentials and daily utility products. Kalyanpura.",
      },
      { property: "og:title", content: "Raj Traders — Electronics, Appliances & More | Kalyanpura" },
      {
        property: "og:description",
        content: "Raj Traders — trusted store for Electronics, Electrical, Home Appliances, Mobiles, Kitchen Essentials and daily utility products. Kalyanpura.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Product = {
  _id?: string;
  title: string;
  price: string;
  mrp: string;
  off: string;
  img: string;
  category?: string;
  brand?: string;
  inStock?: boolean;
};

// ------ Cart context ------
type CartItem = Product & { qty: number };
type CartCtx = {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (title: string) => void;
  inc: (title: string) => void;
  dec: (title: string) => void;
  clear: () => void;
  count: number;
  open: boolean;
  setOpen: (b: boolean) => void;
};
const CartContext = createContext<CartCtx | null>(null);
const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("Cart not in tree");
  return c;
};

// ------ Wishlist context ------
type WishCtx = {
  items: Product[];
  toggle: (p: Product) => void;
  has: (title: string) => boolean;
  count: number;
  open: boolean;
  setOpen: (b: boolean) => void;
};
const WishlistContext = createContext<WishCtx | null>(null);
const useWishlist = () => {
  const c = useContext(WishlistContext);
  if (!c) throw new Error("Wishlist not in tree");
  return c;
};
function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem("rt_wish") || "[]"); } catch { return []; }
  });
  const [open, setOpen] = useState(false);
  useEffect(() => { try { localStorage.setItem("rt_wish", JSON.stringify(items)); } catch {} }, [items]);
  const toggle = useCallback((p: Product) => {
    setItems((prev) => prev.some((x) => x.title === p.title)
      ? prev.filter((x) => x.title !== p.title)
      : [...prev, p]);
  }, []);
  const has = useCallback((t: string) => items.some((x) => x.title === t), [items]);
  return (
    <WishlistContext.Provider value={{ items, toggle, has, count: items.length, open, setOpen }}>
      {children}
    </WishlistContext.Provider>
  );
}

// ------ View / Search context ------
type View =
  | "home"
  | "hotdeals"
  | "brands"
  | "search"
  | "wishlist"
  | "about_us"
  | "terms"
  | "privacy_policy"
  | "refund_policy"
  | "disclaimer"
  | "blogs"
  | "faq"
  | "our_promise"
  | "careers"
  | "testimonials"
  | "contact"
  | "store_locator"
  | "track_order"
  | "account";
type ModalType =
  | "track_order"
  | "account"
  | "store_locator"
  | "contact"
  | "about_us"
  | "blogs"
  | "our_promise"
  | "faq"
  | "testimonials"
  | "careers"
  | "privacy_policy"
  | "terms"
  | "disclaimer"
  | "refund_policy"
  | null;

type ViewCtx = {
  view: View;
  setView: (v: View) => void;
  query: string;
  setQuery: (q: string) => void;
  activeBrand: string | null;
  setActiveBrand: (b: string | null) => void;
  activeModal: ModalType;
  openModal: (m: ModalType) => void;
  closeModal: () => void;
};
const ViewContext = createContext<ViewCtx | null>(null);
const useView = () => {
  const c = useContext(ViewContext);
  if (!c) throw new Error("View not in tree");
  return c;
};
function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("home");
  const [query, setQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = useCallback((m: ModalType) => setActiveModal(m), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  useEffect(() => { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); }, [view, activeBrand]);
  return (
    <ViewContext.Provider value={{ view, setView, query, setQuery, activeBrand, setActiveBrand, activeModal, openModal, closeModal }}>
      {children}
    </ViewContext.Provider>
  );
}

const WHATSAPP_NUMBER = "919752144747";
const INSTAGRAM_URL = "https://www.instagram.com/raj_electronics_kalyanpura?igsh=NzdhbnlhMGp4d2pp&utm_source=qr";
const LOVABLE_ASSET_ORIGIN = "";
const parsePrice = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0;
const cloneSafeAssetUrl = (url: string) =>
  url.startsWith("/__l5e/") ? `${LOVABLE_ASSET_ORIGIN}${url}` : url;

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("rt_cart") || "[]");
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("rt_cart", JSON.stringify(items));
    } catch {}
  }, [items]);
  const add = useCallback((p: Product) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.title === p.title);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...prev, { ...p, qty: 1 }];
    });
    setOpen(true);
  }, []);
  const remove = useCallback(
    (t: string) => setItems((p) => p.filter((x) => x.title !== t)),
    [],
  );
  const inc = useCallback(
    (t: string) =>
      setItems((p) => p.map((x) => (x.title === t ? { ...x, qty: x.qty + 1 } : x))),
    [],
  );
  const dec = useCallback(
    (t: string) =>
      setItems((p) =>
        p
          .map((x) => (x.title === t ? { ...x, qty: x.qty - 1 } : x))
          .filter((x) => x.qty > 0),
      ),
    [],
  );
  const clear = useCallback(() => setItems([]), []);
  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  return (
    <CartContext.Provider
      value={{ items, add, remove, inc, dec, clear, count, open, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

function CartDrawer() {
  const { items, open, setOpen, inc, dec, remove, clear } = useCart();
  const total = items.reduce((a, b) => a + parsePrice(b.price) * b.qty, 0);
  const buyOnWhatsApp = () => {
    if (!items.length) return;
    const lines = items.map(
      (i, idx) =>
        `${idx + 1}. ${i.title} — ${i.price} x ${i.qty} = ₹${(parsePrice(i.price) * i.qty).toLocaleString("en-IN")}`,
    );
    const msg =
      `Hello Raj Traders, I would like to buy the following items:%0A%0A` +
      encodeURIComponent(lines.join("\n")) +
      `%0A%0A*Total: ₹${total.toLocaleString("en-IN")}*%0A%0APlease confirm availability.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white text-[var(--text-on-white)] z-[70] shadow-2xl transform transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 bg-[var(--kohinoor-blue)] text-white">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> My Cart ({items.length})
          </h3>
          <button aria-label="Close" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <ShoppingCart className="h-14 w-14 mx-auto mb-3 opacity-40" />
              <p>Your cart is empty</p>
            </div>
          )}
          {items.map((it) => (
            <div key={it.title} className="flex gap-3 border-b pb-3">
              <img
                src={cloneSafeAssetUrl(it.img)}
                alt={it.title}
                className="h-20 w-20 object-contain bg-gray-50 rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold line-clamp-2">{it.title}</p>
                <p className="text-[var(--joy-price)] font-bold text-sm mt-1">
                  {it.price}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    aria-label="Decrease"
                    onClick={() => dec(it.title)}
                    className="h-6 w-6 border rounded flex items-center justify-center"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">
                    {it.qty}
                  </span>
                  <button
                    aria-label="Increase"
                    onClick={() => inc(it.title)}
                    className="h-6 w-6 border rounded flex items-center justify-center"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    aria-label="Remove"
                    onClick={() => remove(it.title)}
                    className="ml-auto text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total</span>
              <span className="font-bold text-lg text-[var(--joy-price)]">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
            <button
              onClick={buyOnWhatsApp}
              className="w-full bg-[oklch(0.65_0.18_150)] text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" /> Buy Now on WhatsApp
            </button>
            <button
              onClick={clear}
              className="w-full text-xs text-gray-500 hover:text-red-500"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

// Real products from Raj Traders inventory
const ledBulbs: Product[] = [
  {
    title: "Eveready 9W LED Bulb B22 6500K Cool Day Light (4 Bulbs Value Pack)",
    price: "₹299",
    mrp: "₹499",
    off: "40% off",
    img: product3.url,
  },
  {
    title: "Surya Turbo Inverter Lamp 10W B22 — Upto 4 Hrs Backup, 25000 Hrs Life",
    price: "₹549",
    mrp: "₹899",
    off: "39% off",
    img: productN29.url,
  },
];

const torches: Product[] = [
  {
    title: "MZ M982 Pro LED Torch 200W High Power Rechargeable Telescopic Zoom",
    price: "₹1,299",
    mrp: "₹1,799",
    off: "28% off",
    img: product4.url,
  },
  {
    title: "MZ M035-C LED Torch 120 Lumen Rechargeable Long Range Focus Beam",
    price: "₹499",
    mrp: "₹799",
    off: "37% off",
    img: product5.url,
  },
  {
    title: "PowerCell LED Torch 9712B 0.75W Bright White Light",
    price: "₹149",
    mrp: "₹249",
    off: "40% off",
    img: product8.url,
  },
  {
    title: "Unibeam Dhurandar LED Torch — Rahe Kare Roshan",
    price: "₹179",
    mrp: "₹299",
    off: "40% off",
    img: product9.url,
  },
  {
    title: "Eveready DL40 0.5W Torch — Give Me Red (Free 3 AA Batteries)",
    price: "₹199",
    mrp: "₹299",
    off: "33% off",
    img: product10.url,
  },
  {
    title: "LAMAT LM-7704 Metal Torch 120W Zooming Head 1200mAh Type-C",
    price: "₹599",
    mrp: "₹999",
    off: "40% off",
    img: productN15.url,
  },
  {
    title: "Ujjwal Kisan 5 Star Rechargeable Torch 68mm Watt Reflector",
    price: "₹899",
    mrp: "₹1,299",
    off: "31% off",
    img: productN16.url,
  },
  {
    title: "Mono Onlite Dodo Upgraded Classic Rechargeable Torch (12W + 10W)",
    price: "₹249",
    mrp: "₹399",
    off: "38% off",
    img: productN18.url,
  },
];

const kitchenAppliances: Product[] = [
  {
    title: "Vioia Portable Geyser — Instant Water Heater for Hard & Soft Water",
    price: "₹1,999",
    mrp: "₹2,999",
    off: "33% off",
    img: product6.url,
  },
  {
    title: "Spare King G-Coil Hot Plate 1 Year Warranty — Fast Heating Stainless Steel",
    price: "₹1,850",
    mrp: "₹2,499",
    off: "26% off",
    img: product7.url,
  },
  {
    title: "BLU Berry Infrared Cooker — Crystal Glass, 4-Digit Display, Time Control",
    price: "₹2,499",
    mrp: "₹3,499",
    off: "29% off",
    img: productN12.url,
  },
  {
    title: "Fortuner Electric Immersion Water Heater — Shockproof (1 Year Warranty)",
    price: "₹499",
    mrp: "₹799",
    off: "38% off",
    img: productN17.url,
  },
  {
    title: "BLU BL-102 Fan Heater — Winter Solution (1 Year Warranty)",
    price: "₹1,299",
    mrp: "₹1,999",
    off: "35% off",
    img: productN21.url,
  },
  {
    title: "Standard Etna Pro Immersion Heater 1500W — 2 Year Warranty",
    price: "₹599",
    mrp: "₹899",
    off: "33% off",
    img: productN30.url,
  },
  {
    title: "Surya Sizzle Storage Water Heater / Geyser — Power Saver",
    price: "₹6,499",
    mrp: "₹8,999",
    off: "28% off",
    img: productN31.url,
  },
];

const streetLights: Product[] = [
  {
    title: "Reliable Evoke LED Street Light 36W IP65 Streetlight",
    price: "₹1,499",
    mrp: "₹2,199",
    off: "32% off",
    img: product11.url,
  },
  {
    title: "Reliable Evoke LED Street Light 50W IP65 Streetlight",
    price: "₹1,899",
    mrp: "₹2,699",
    off: "30% off",
    img: product11.url,
  },
  {
    title: "Reliable 100W LED Streetlight IP65 — 50,000+ Hours Life Span",
    price: "₹2,899",
    mrp: "₹3,999",
    off: "28% off",
    img: product11.url,
  },
  {
    title: "Sturmax 50W LED Flood Light IP66 — Outdoor Weatherproof",
    price: "₹1,199",
    mrp: "₹1,799",
    off: "33% off",
    img: productN19.url,
  },
];

// Fans
const fans: Product[] = [
  {
    title: "Fortuner Rockey 2.0 Pro Ceiling Fan 1200mm (48\") Smoke Brown — 405 RPM, 2 Year Warranty",
    price: "₹1,999",
    mrp: "₹2,899",
    off: "31% off",
    img: productN13.url,
  },
  {
    title: "BLU Mini Hanging Motor Fan — High Speed, CRC Stamping, Aerodynamic Blades",
    price: "₹1,299",
    mrp: "₹1,799",
    off: "28% off",
    img: productN22.url,
  },
];

// Speakers / Announce
const speakers: Product[] = [
  {
    title: "Rock Light S182-D Megaphone Bhopu 300W — 16 Voice, Bluetooth, USB, Double Battery",
    price: "₹2,199",
    mrp: "₹2,999",
    off: "27% off",
    img: productN14.url,
  },
];

// Cooler motor / spares
const coolerParts: Product[] = [
  {
    title: "Nerco 1\" Popular Cooler Motor with Ring — 105W, Powder Coated (1 Season Warranty)",
    price: "₹1,449",
    mrp: "₹1,999",
    off: "28% off",
    img: productN20.url,
  },
];

// DTH / Set Top Box
const dthDevices: Product[] = [
  {
    title: "BlueSky Digital Set Top Box — Direct to Home HD DVB Receiver with Remote",
    price: "₹1,199",
    mrp: "₹1,799",
    off: "33% off",
    img: productN23.url,
  },
];

// Decorative / Fairy Lights
const decorLights: Product[] = [
  {
    title: "LED Fairy String Lights — Warm White, Long Wire Rice Lights for Decoration",
    price: "₹199",
    mrp: "₹399",
    off: "50% off",
    img: productN24.url,
  },
];

// Electrical Accessories
const electricalAccessories: Product[] = [
  {
    title: "Eveready Everprotect Neo X2 Spike Guard — Fire Retardant, 2m Wire, 4 Sockets",
    price: "₹649",
    mrp: "₹899",
    off: "27% off",
    img: productN25.url,
  },
];

// Automotive Engine Oils
const engineOils: Product[] = [
  {
    title: "Havnol Force 15W40 API CI-4 Diesel Engine Oil — Heavy Duty (1 L)",
    price: "₹399",
    mrp: "₹549",
    off: "27% off",
    img: productN26.url,
  },
  {
    title: "Castrol Activ 20W40 4T Motorcycle Engine Oil — Actibond Technology (1 L)",
    price: "₹499",
    mrp: "₹650",
    off: "23% off",
    img: productN27.url,
  },
  {
    title: "Servo Pride TC 15W-40 Premium Diesel Engine Oil — API CH-4 (3 L)",
    price: "₹1,299",
    mrp: "₹1,650",
    off: "21% off",
    img: productN28.url,
  },
];

const categories = [
  { label: "LED Bulbs", icon: Lightbulb },
  { label: "Torches", icon: Flashlight },
  { label: "Kitchen & Heating", icon: Utensils },
  { label: "Street & Flood Lights", icon: Zap },
  { label: "Fans", icon: Fan },
  { label: "Speakers", icon: Megaphone },
  { label: "Cooler Parts", icon: Wind },
  { label: "DTH & Set Top Box", icon: Tv2 },
  { label: "Decorative Lights", icon: Sparkles },
  { label: "Electrical Accessories", icon: Plug },
  { label: "Automotive Oils", icon: Droplet },
  { label: "Air Conditioner", icon: AirVent },
  { label: "Washing Machine", icon: WashingMachine },
  { label: "Smart Phones", icon: Smartphone },
  { label: "Refrigerator", icon: Refrigerator },
  { label: "Laptops & Printer", icon: Printer },
];

const brands = [
  "FORTUNER",
  "BLU",
  "EVEREADY",
  "MZ",
  "RELIABLE",
  "STURMAX",
  "ROCK LIGHT",
  "NERCO",
  "LAMAT",
  "ONLITE",
  "UJJWAL KISAN",
  "POWERCELL",
  "SURYA",
  "STANDARD",
  "BLUESKY",
  "CASTROL",
  "SERVO",
  "HAVNOL",
];

function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const wished = has(p.title);
  const isOutOfStock = p.inStock === false;

  const buyNow = () => {
    if (isOutOfStock) return;
    const msg = encodeURIComponent(
      `Hello Raj Traders, I want to buy:\n${p.title}\nPrice: ${p.price}\nPlease confirm availability.`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="snap-start min-w-0 shrink-0 basis-[70%] xs:basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 px-2">
      <div className="rt-card bg-[var(--card-white)] text-[var(--text-on-white)] rounded-xl overflow-hidden flex flex-col h-full border border-black/5 shadow-[var(--premium-shadow)] relative">
        <div className="relative p-3 sm:p-4 bg-white overflow-hidden">
          {isOutOfStock && (
            <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Out of Stock
            </span>
          )}
          <button
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => toggle(p)}
            className={`absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 backdrop-blur border border-black/5 shadow-sm flex items-center justify-center rt-btn ${wished ? "text-[var(--kohinoor-red)]" : "text-[var(--text-on-white)]/60 hover:text-[var(--kohinoor-red)]"}`}
          >
            <Heart className="h-4 w-4" fill={wished ? "currentColor" : "none"} />
          </button>
          <div className="aspect-square w-full flex items-center justify-center">
            <img
              src={p.img}
              alt={p.title}
              loading="lazy"
              className={`rt-img max-h-full max-w-full object-contain ${isOutOfStock ? "opacity-60 grayscale-[30%]" : ""}`}
            />
          </div>
        </div>
        <div className="px-3 sm:px-4 pb-3 flex-1 flex flex-col">
          <p className="text-xs sm:text-sm font-semibold leading-snug min-h-[2.5rem] line-clamp-2 break-words">
            {p.title}
          </p>
          <p className="text-[var(--joy-price)] font-semibold mt-2 text-xs sm:text-sm">Joy Price</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[var(--joy-price)] font-bold text-base sm:text-xl truncate">{p.price}</span>
            {p.off && (
              <span className="ml-auto shrink-0 bg-[var(--kohinoor-red)] text-white text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                • {p.off}
              </span>
            )}
          </div>
          {p.mrp && (
            <p className="text-xs text-[var(--text-on-white)]/60 mt-0.5">
              MRP <span className="line-through">{p.mrp}</span>
            </p>
          )}
        </div>
        <div className="border-t border-black/10 flex text-[11px] sm:text-xs mt-auto">
          {isOutOfStock ? (
            <div className="w-full py-2.5 bg-slate-100 text-slate-500 font-bold text-center text-xs uppercase tracking-wider">
              Out of Stock
            </div>
          ) : (
            <>
              <button
                onClick={buyNow}
                className="rt-btn flex-1 min-w-0 flex items-center justify-center gap-1 py-2.5 hover:bg-[oklch(0.95_0.05_150)] font-semibold text-[oklch(0.5_0.18_150)] whitespace-nowrap"
              >
                <MessageCircle className="h-3.5 w-3.5" /> Buy Now
              </button>
              <div className="w-px bg-black/10" />
              <button
                onClick={() => add(p)}
                className="rt-btn flex-1 min-w-0 flex items-center justify-center gap-1 py-2.5 hover:bg-[oklch(0.95_0.04_245)] font-semibold text-[var(--kohinoor-blue)] whitespace-nowrap"
              >
                <ShoppingCart className="h-3.5 w-3.5" /> Add Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductSlider({
  title,
  products,
  viewAll = true,
}: {
  title?: string;
  products: Product[];
  viewAll?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useAutoScroll(ref, undefined, 3500);

  const scroll = (dir: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  return (
    <section className="max-w-[1280px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
      {title && (
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-[var(--kohinoor-yellow)] font-bold text-base sm:text-lg min-w-0 truncate">{title}</h2>
          {viewAll && (
            <button className="text-[var(--kohinoor-yellow)] text-xs sm:text-sm font-semibold flex items-center gap-1 shrink-0 whitespace-nowrap">
              VIEW ALL <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
      <div className="relative">
        <button
          aria-label="Previous"
          onClick={() => scroll(-1)}
          className="hidden sm:flex absolute -left-1 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded bg-white text-[var(--text-on-white)] shadow items-center justify-center hover:bg-white/90"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => scroll(1)}
          className="hidden sm:flex absolute -right-1 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded bg-white text-[var(--text-on-white)] shadow items-center justify-center hover:bg-white/90"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div
          ref={ref}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-2 px-2 sm:px-6 pb-2 items-stretch"
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((p, i) => (
            <ProductCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategorySlider() {
  const ref = useRef<HTMLDivElement>(null);
  useAutoScroll(ref, 400, 3500);
  return (
    <div className="max-w-[1280px] mx-auto px-2 sm:px-4 py-4 sm:py-6 relative">
      <div
        ref={ref}
        className="flex gap-4 sm:gap-8 overflow-x-auto px-2 sm:px-4 md:justify-between"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 shrink-0 w-[84px] sm:w-[110px] group"
          >
            <div className="h-11 w-11 sm:h-14 sm:w-14 flex items-center justify-center text-[var(--kohinoor-yellow)]">
              <Icon strokeWidth={1.5} className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <span className="text-[var(--kohinoor-yellow)] text-[11px] sm:text-sm font-semibold text-center leading-tight break-words">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BrandSlider() {
  const ref = useRef<HTMLDivElement>(null);
  useAutoScroll(ref, 400, 3500);
  const scroll = (d: -1 | 1) => {
    ref.current?.scrollBy({ left: d * 400, behavior: "smooth" });
  };
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <h2 className="text-center text-white text-lg font-semibold mb-2">Top Brands</h2>
      <div className="mx-auto h-1 w-16 bg-[var(--kohinoor-blue)] mb-6" />
      <div className="relative">
        <button
          aria-label="Previous"
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded bg-white text-[var(--text-on-white)] shadow flex items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded bg-white text-[var(--text-on-white)] shadow flex items-center justify-center"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto px-12 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {brands.map((b) => (
            <div
              key={b}
              className="min-w-[150px] h-24 bg-white rounded-md flex items-center justify-center text-[var(--text-on-white)] font-bold tracking-wide"
            >
              {b}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button className="border-2 border-[var(--kohinoor-yellow)] text-[var(--kohinoor-yellow)] font-bold text-sm px-8 py-2 rounded-full">
            VIEW ALL
          </button>
        </div>
      </div>
    </div>
  );
}

const ASSET_IMAGE_MAP: Record<string, string> = {
  "product-3": product3.url,
  "product-4": product4.url,
  "product-5": product5.url,
  "product-6": product6.url,
  "product-7": product7.url,
  "product-8": product8.url,
  "product-9": product9.url,
  "product-10": product10.url,
  "product-11": product11.url,
  "product-new-12": productN12.url,
  "product-new-13": productN13.url,
  "product-new-14": productN14.url,
  "product-new-15": productN15.url,
  "product-new-16": productN16.url,
  "product-new-17": productN17.url,
  "product-new-18": productN18.url,
  "product-new-19": productN19.url,
  "product-new-20": productN20.url,
  "product-new-21": productN21.url,
  "product-new-22": productN22.url,
  "product-new-23": productN23.url,
  "product-new-24": productN24.url,
  "product-new-25": productN25.url,
  "product-new-26": productN26.url,
  "product-new-27": productN27.url,
  "product-new-28": productN28.url,
  "product-new-29": productN29.url,
  "product-new-30": productN30.url,
  "product-new-31": productN31.url,
};

function resolveProductImage(url: string): string {
  if (!url) return "";
  if (url.startsWith("/uploads")) {
    return getImageUrl(url);
  }
  for (const [key, assetUrl] of Object.entries(ASSET_IMAGE_MAP)) {
    if (url.includes(key)) {
      return assetUrl;
    }
  }
  return cloneSafeAssetUrl(url);
}

function normalizeProduct(item: any): Product {
  const priceStr = item.price
    ? String(item.price).trim().startsWith("₹")
      ? String(item.price).trim()
      : `₹${Number(item.price) ? Number(item.price).toLocaleString("en-IN") : item.price}`
    : "₹0";

  const mrpStr = item.mrp
    ? String(item.mrp).trim().startsWith("₹")
      ? String(item.mrp).trim()
      : `₹${Number(item.mrp) ? Number(item.mrp).toLocaleString("en-IN") : item.mrp}`
    : "";

  const offStr = item.off
    ? String(item.off).trim().endsWith("% off") || String(item.off).trim().endsWith("off")
      ? String(item.off).trim()
      : `${String(item.off).trim()}% off`
    : "";

  const imgUrl = resolveProductImage(item.img || "");

  return {
    _id: item._id,
    title: item.title || "Product",
    price: priceStr,
    mrp: mrpStr,
    off: offStr,
    img: imgUrl,
    category: item.category || "General",
    brand: item.brand || "",
    inStock: item.inStock !== false,
  };
}

type ProductsCtx = {
  products: Product[];
  loading: boolean;
  refetch: () => void;
};
const ProductsContext = createContext<ProductsCtx | null>(null);
const useProducts = () => {
  const c = useContext(ProductsContext);
  if (!c) throw new Error("ProductsContext not in tree");
  return c;
};

function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const staticCombined: Product[] = useMemo(() => [
    ...ledBulbs.map((p) => ({ ...p, category: "ledBulbs" })),
    ...torches.map((p) => ({ ...p, category: "torches" })),
    ...kitchenAppliances.map((p) => ({ ...p, category: "kitchenAppliances" })),
    ...streetLights.map((p) => ({ ...p, category: "streetLights" })),
    ...fans.map((p) => ({ ...p, category: "fans" })),
    ...speakers.map((p) => ({ ...p, category: "speakers" })),
    ...coolerParts.map((p) => ({ ...p, category: "coolerParts" })),
    ...dthDevices.map((p) => ({ ...p, category: "dthDevices" })),
    ...decorLights.map((p) => ({ ...p, category: "decorLights" })),
    ...electricalAccessories.map((p) => ({ ...p, category: "electricalAccessories" })),
    ...engineOils.map((p) => ({ ...p, category: "engineOils" })),
  ], []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const apiItems = await fetchProducts();
      const fallbackItems = staticCombined.map((p) => normalizeProduct(p));

      if (apiItems && apiItems.length > 0) {
        const normalizedApi = apiItems.map((item) => normalizeProduct(item));
        const apiTitles = new Set(normalizedApi.map((p) => p.title.trim().toLowerCase()));
        const uniqueFallbacks = fallbackItems.filter(
          (p) => !apiTitles.has(p.title.trim().toLowerCase())
        );
        setProducts([...normalizedApi, ...uniqueFallbacks]);
      } else {
        setProducts(fallbackItems);
      }
    } catch (err) {
      console.error("Error loading storefront products:", err);
      setProducts(staticCombined.map((p) => normalizeProduct(p)));
    } finally {
      setLoading(false);
    }
  }, [staticCombined]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <ProductsContext.Provider value={{ products, loading, refetch: loadProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

function Index() {
  return (
    <ProductsProvider>
      <CartProvider>
        <WishlistProvider>
          <ViewProvider>
            <IndexInner />
          </ViewProvider>
        </WishlistProvider>
      </CartProvider>
    </ProductsProvider>
  );
}

function hotDeals(products: Product[]): Product[] {
  return [...products]
    .map((x) => ({
      ...x,
      offNum: parseInt((x.off || "").replace(/[^\d]/g, ""), 10) || 0,
    }))
    .sort((a, b) => b.offNum - a.offNum)
    .slice(0, 24);
}

function ProductGrid({ items }: { items: Product[] }) {
  if (!items.length) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center text-foreground/60">
        No products found.
      </div>
    );
  }
  return (
    <div className="max-w-[1280px] mx-auto px-3 sm:px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {items.map((p, i) => (
        <div key={p._id || p.title + i} className="rt-fade-up" style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}>
          <GridProductCard p={p} />
        </div>
      ))}
    </div>
  );
}

function GridProductCard({ p }: { p: Product }) {
  return (
    <div className="[&>div]:!basis-full [&>div]:!px-0 [&>div]:!min-w-full">
      <ProductCard p={p} />
    </div>
  );
}

function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="max-w-[1280px] mx-auto px-4 pt-8 pb-2 rt-fade-up">
      <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">{title}</h1>
      {subtitle && <p className="mt-2 text-sm sm:text-base text-foreground/60">{subtitle}</p>}
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[var(--kohinoor-blue)] to-[var(--kohinoor-yellow)]" />
    </section>
  );
}

function HotDealsView() {
  const { products } = useProducts();
  const deals = useMemo(() => hotDeals(products), [products]);

  return (
    <>
      <PageHeader title="🔥 Hot Deals" subtitle="Biggest savings across the store — limited period only." />
      <ProductGrid items={deals} />
    </>
  );
}

function BrandsView() {
  const { products } = useProducts();
  const { activeBrand, setActiveBrand } = useView();

  const brandList = useMemo(() => {
    const set = new Set<string>(brands);
    products.forEach((p) => {
      if (p.brand && p.brand.trim()) set.add(p.brand.trim().toUpperCase());
    });
    return Array.from(set);
  }, [products]);

  const items = useMemo(() => {
    if (!activeBrand) return [];
    return products.filter(
      (p) =>
        (p.brand && p.brand.toUpperCase() === activeBrand) ||
        p.title.toUpperCase().includes(activeBrand)
    );
  }, [products, activeBrand]);

  return (
    <>
      <PageHeader title="Brand Store" subtitle="Shop by your favourite brand." />
      <div className="max-w-[1280px] mx-auto px-4 pb-2 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveBrand(null)}
          className={`rt-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border ${!activeBrand ? "bg-[var(--kohinoor-blue)] text-white border-transparent" : "bg-white text-foreground border-black/10"}`}
        >All Brands</button>
        {brandList.map((b) => (
          <button key={b}
            onClick={() => setActiveBrand(b)}
            className={`rt-btn px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border ${activeBrand === b ? "bg-[var(--kohinoor-blue)] text-white border-transparent shadow-md" : "bg-white text-foreground border-black/10 hover:border-[var(--kohinoor-blue)]"}`}
          >{b}</button>
        ))}
      </div>
      {activeBrand ? (
        <ProductGrid items={items} />
      ) : (
        <div className="max-w-[1280px] mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {brandList.map((b, i) => (
            <button key={b}
              onClick={() => setActiveBrand(b)}
              className="rt-card rt-fade-up bg-white rounded-xl border border-black/5 shadow-[var(--premium-shadow)] px-4 py-8 font-bold tracking-wide text-foreground"
              style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}
            >{b}</button>
          ))}
        </div>
      )}
    </>
  );
}

function SearchView() {
  const { products } = useProducts();
  const { query } = useView();
  const q = query.trim().toLowerCase();

  const items = useMemo(() => {
    if (!q) return [];
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q))
    );
  }, [products, q]);

  return (
    <>
      <PageHeader title={q ? `Results for "${query}"` : "Search"} subtitle={q ? `${items.length} product${items.length === 1 ? "" : "s"} found` : "Type in the search bar to find products, brands or categories."} />
      {q && <ProductGrid items={items} />}
    </>
  );
}

function WishlistView() {
  const { items } = useWishlist();
  return (
    <>
      <PageHeader title="My Wishlist" subtitle={`${items.length} item${items.length === 1 ? "" : "s"} saved`} />
      <ProductGrid items={items} />
    </>
  );
}

function AboutUsView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="About Raj Traders" subtitle="Serving Kalyanpura & Jhabua district with authentic electronics, home appliances & daily utility products." />
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-black text-white p-8 rounded-3xl border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-[var(--kohinoor-yellow)] text-black p-3 rounded-2xl font-black text-xl">RT</div>
          <div>
            <h2 className="text-xl font-bold">Raj Traders Kalyanpura</h2>
            <p className="text-xs text-[var(--kohinoor-yellow)]">Electronics, Electricals & Appliances Store</p>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Raj Traders is Kalyanpura’s premier multi-brand showroom specializing in modern consumer electronics, kitchen appliances, smart TVs, mobiles, refrigerators, air conditioners, ceiling fans, torches, and electrical hardware.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h3 className="font-bold text-white mb-1">⭐ 100% Genuine Products</h3>
            <p className="text-slate-400">All products supplied with official manufacturer warranty and original tax invoice.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h3 className="font-bold text-white mb-1">🏷️ Guaranteed Local Best Rates</h3>
            <p className="text-slate-400">Competitive local pricing with attractive seasonal discounts and festival schemes.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h3 className="font-bold text-white mb-1">🚚 Express Doorstep Delivery</h3>
            <p className="text-slate-400">Fast local delivery and setup assistance across Kalyanpura and nearby regions.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function TermsView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Terms & Conditions" subtitle="Store guidelines, purchase terms, and customer policies at Raj Traders Kalyanpura." />
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">1. Product Pricing & Taxes</h3>
          <p>All prices listed on the storefront are in Indian Rupees (₹) and include applicable GST taxes unless specified otherwise. Prices are subject to market adjustments without prior notice.</p>
        </section>
        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">2. Warranty & Manufacturer Support</h3>
          <p>All electronic goods, appliances, and devices carry original manufacturer warranty as provided by respective brands (e.g. Samsung, LG, Orient, Bajaj, etc.). Raj Traders assists customers with service booking and invoice verification.</p>
        </section>
        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">3. Orders & Stock Availability</h3>
          <p>Orders placed online or via WhatsApp are subject to physical stock verification at our Kalyanpura warehouse. In case an item is out of stock, our team will notify you immediately with alternative choices or full refund.</p>
        </section>
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function PrivacyPolicyView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Privacy Policy" subtitle="How Raj Traders protects and manages your personal information." />
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">1. Data Collection & Confidentiality</h3>
          <p>We collect only essential details such as Name, Phone Number, Delivery Address, and Order preferences necessary to fulfill customer purchases and local delivery.</p>
        </section>
        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">2. Zero Third-Party Sharing</h3>
          <p>Raj Traders Kalyanpura strictly pledges that your personal information will never be sold, rented, or shared with external third-party marketing companies.</p>
        </section>
        <section className="space-y-2">
          <h3 className="font-bold text-base text-slate-900">3. Secure Transactions</h3>
          <p>All in-store and online payments adhere to standard encryption protocols and Indian financial regulations.</p>
        </section>
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function RefundPolicyView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Cancellation, Returns & Refunds" subtitle="Our customer-first 7-day replacement and return guarantee." />
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-2xl mb-2 block">🔄</span>
            <h4 className="font-bold text-slate-900 mb-1">7-Day Defect Replacement</h4>
            <p className="text-xs text-slate-600">If your appliance exhibits any manufacturing fault within 7 days of purchase, we replace it with a brand-new unit.</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-2xl mb-2 block">📄</span>
            <h4 className="font-bold text-slate-900 mb-1">Original Packaging & Tax Invoice</h4>
            <p className="text-xs text-slate-600">Please retain the original box, bill, accessories, and warranty card for seamless processing.</p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <span className="text-2xl mb-2 block">💸</span>
            <h4 className="font-bold text-slate-900 mb-1">Prompt Refunds</h4>
            <p className="text-xs text-slate-600">Approved refunds are credited directly via original payment mode within 2–3 business days.</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function DisclaimerView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Legal Disclaimer" subtitle="Product specifications, prices, and catalog information." />
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-sm text-slate-700 leading-relaxed space-y-4">
        <p>Product images, descriptions, and dimensions shown on this digital store are for customer reference. While we strive to maintain complete accuracy, actual product packaging or minor color shades may vary slightly based on manufacturer design updates.</p>
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function BlogsView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Blogs & Buying Guides" subtitle="Tips, advice, and product recommendations for Kalyanpura homes." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Summer Air Conditioner Buying Guide 2026", date: "May 2026", desc: "Learn how to select 1.5 Ton vs 1 Ton inverter ACs for Kalyanpura climate to save up to 40% on electricity bills." },
          { title: "Top 5 Features to Check in Smart TVs Before Buying", date: "April 2026", desc: "4K resolution, Dolby Audio, Android TV OS, and HDMI ports explained for home entertainment." },
          { title: "How to Protect Home Appliances from Voltage Fluctuations", date: "March 2026", desc: "Essential guide on choosing automatic voltage stabilizers for refrigerators, air coolers, and heavy machinery." },
        ].map((b, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <span className="text-xs font-bold text-[var(--kohinoor-blue)] uppercase tracking-wider">{b.date}</span>
            <h3 className="font-bold text-base text-slate-900">{b.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function FaqView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Frequently Asked Questions" subtitle="Quick answers regarding delivery, warranty, and payment options." />
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
        {[
          { q: "Do you deliver products locally in Kalyanpura?", a: "Yes! We provide express doorstep delivery for all products including TVs, refrigerators, and coolers within Kalyanpura and surrounding areas." },
          { q: "Are all products covered under company warranty?", a: "Yes, 100% of our electronic items come with official manufacturer warranty cards and original tax invoices." },
          { q: "What payment methods do you accept?", a: "We accept Cash, UPI (GPay, PhonePe, Paytm), Debit/Credit cards, and easy EMI options for high-value appliances." },
          { q: "Can I get installation service for AC or TV?", a: "Yes, our store team coordinates authorized technician installation for Air Conditioners, Smart TVs, and DTH connections." },
          { q: "What if I receive a defective item?", a: "We offer an easy 7-day replacement policy for manufacturing defects. Bring it to our store or contact support." },
        ].map((item, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <h4 className="font-bold text-sm text-[var(--kohinoor-blue)]">Q: {item.q}</h4>
            <p className="text-xs text-slate-700 leading-relaxed">A: {item.a}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function OurPromiseView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Our Store Promise" subtitle="The core principles guiding Raj Traders Kalyanpura." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { title: "100% Genuine Products", desc: "Direct from authorized distributors with factory sealed packaging.", icon: ShieldCheck, color: "text-emerald-500" },
          { title: "Transparent Pricing", desc: "Honest local prices with festival discount offers.", icon: Tag, color: "text-amber-500" },
          { title: "Express Local Delivery", desc: "Fast doorstep delivery across Kalyanpura and nearby regions.", icon: Truck, color: "text-blue-500" },
          { title: "Warranty Support", desc: "Complete store assistance for official manufacturer warranty.", icon: Headphones, color: "text-purple-500" },
        ].map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
              <IconComponent className={`h-8 w-8 ${item.color} shrink-0 mt-1`} />
              <div>
                <h4 className="font-bold text-base text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function CareersView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Careers at Raj Traders" subtitle="Join our electronics retail & service team in Kalyanpura." />
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          {[
            { role: "Electronics Sales Executive", type: "Full Time", loc: "Kalyanpura Store" },
            { role: "Inventory & Billing Assistant", type: "Full Time", loc: "Kalyanpura Store" },
            { role: "Appliance Delivery & Setup Partner", type: "Full Time / Part Time", loc: "Local Region" },
          ].map((job, idx) => (
            <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{job.role}</h4>
                <span className="text-xs text-slate-500">{job.type} • {job.loc}</span>
              </div>
              <a
                href={`https://wa.me/919752144747?text=${encodeURIComponent(`Hello Raj Traders, I want to apply for the position of ${job.role}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
              >
                Apply via WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function TestimonialsView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Customer Reviews" subtitle="Feedback from families and shopkeepers in Kalyanpura." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "Ramesh Patel", loc: "Kalyanpura", comment: "Best electronic store in Kalyanpura! Purchased a Smart TV at a price lower than online platforms. Very humble owner." },
          { name: "Sunita Sharma", loc: "Jhabua Road", comment: "Bought a washing machine and refrigerator. Same day delivery and installation was done smoothly." },
          { name: "Vikram Rathore", loc: "Kalyanpura", comment: "Original mobile accessories and best LED bulbs in town. Always reliable service." },
        ].map((t, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                <span className="text-xs text-slate-500">{t.loc}</span>
              </div>
              <span className="text-amber-500 text-xs">⭐⭐⭐⭐⭐</span>
            </div>
            <p className="text-xs text-slate-600 italic">"{t.comment}"</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function ContactView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Contact & Support" subtitle="Get in touch with Raj Traders Kalyanpura." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="font-bold text-lg">Reach Us Directly</h3>
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[var(--kohinoor-yellow)]" />
              <div>
                <p className="text-slate-400">Store Phone</p>
                <p className="font-bold text-sm text-white">+91 97521 44747</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="text-slate-400">WhatsApp Support</p>
                <p className="font-bold text-sm text-emerald-400">Chat Instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[var(--kohinoor-yellow)]" />
              <div>
                <p className="text-slate-400">Store Address</p>
                <p className="font-bold text-sm text-white">Main Market Road, Near Bus Stand, Kalyanpura, Jhabua, MP</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Message submitted successfully."); setView("home"); }} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">Send an Inquiry</h3>
          <input type="text" required placeholder="Your Name" className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[var(--kohinoor-blue)]" />
          <input type="tel" required placeholder="Mobile Number" className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[var(--kohinoor-blue)]" />
          <textarea rows={4} required placeholder="Message / Product Requirement" className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[var(--kohinoor-blue)]" />
          <button type="submit" className="w-full bg-[var(--kohinoor-blue)] text-white font-bold py-3 rounded-xl text-xs hover:opacity-90 transition">
            Submit Message
          </button>
        </form>
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function StoreLocatorView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Store Locator" subtitle="Visit Raj Traders in Kalyanpura." />
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-start gap-4">
          <MapPin className="h-8 w-8 text-[var(--kohinoor-blue)] shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-slate-900">Raj Traders Showroom</h3>
            <p className="text-sm text-slate-600">Main Market Road, Near Bus Stand, Kalyanpura, District Jhabua, MP - 457773</p>
            <p className="text-xs font-bold text-emerald-600">Store Hours: 9:00 AM – 9:00 PM (Open 7 Days a Week)</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function TrackOrderView() {
  const { setView } = useView();
  const [orderInput, setOrderInput] = useState("");
  const [tracked, setTracked] = useState(false);

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="Track Your Order" subtitle="Live delivery status update for your purchase." />
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 max-w-2xl mx-auto">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Enter Order ID or Mobile Number</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. RT-98214 or 9752144747"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--kohinoor-blue)]"
            />
            <button onClick={() => setTracked(true)} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 transition">
              Track Order
            </button>
          </div>
        </div>

        {tracked && (
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-emerald-200">
              <div>
                <span className="text-xs text-emerald-700 font-bold">STATUS</span>
                <h4 className="text-base font-bold text-slate-900">Order #{orderInput ? orderInput.toUpperCase() : "RT-98214"}</h4>
              </div>
              <span className="bg-emerald-600 text-white font-bold text-xs px-3 py-1 rounded-full">
                In Transit 🚚
              </span>
            </div>
            <div className="space-y-3 text-xs">
              <p className="font-bold text-slate-800">✓ Order Placed & Confirmed at Store</p>
              <p className="font-bold text-slate-800">✓ Warranty Certificate Sealed</p>
              <p className="font-bold text-emerald-700">🚚 Out for Doorstep Delivery in Kalyanpura Area</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function AccountView() {
  const { setView } = useView();
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10 space-y-8 rt-fade-up">
      <PageHeader title="My Account" subtitle="Customer profile, wishlist & order management." />
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="h-14 w-14 rounded-2xl bg-[var(--kohinoor-blue)] text-white font-black text-xl flex items-center justify-center">
            RT
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">Customer Account</h3>
            <p className="text-xs text-slate-500">Raj Traders Kalyanpura Member</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onClick={() => setView("wishlist")} className="p-5 bg-slate-50 border border-slate-200 hover:border-[var(--kohinoor-blue)] rounded-2xl text-left transition group">
            <Heart className="h-6 w-6 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900">My Saved Wishlist</h4>
            <p className="text-xs text-slate-500 mt-1">View saved items</p>
          </button>
          <button onClick={() => setView("track_order")} className="p-5 bg-slate-50 border border-slate-200 hover:border-[var(--kohinoor-blue)] rounded-2xl text-left transition group">
            <Package className="h-6 w-6 text-[var(--kohinoor-blue)] mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900">Track Orders</h4>
            <p className="text-xs text-slate-500 mt-1">Delivery updates</p>
          </button>
        </div>

        <div className="p-5 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
          <div>
            <p className="font-bold text-xs">Executive / Admin Suite</p>
            <p className="text-[11px] text-slate-400">Manage products, inventory & sales</p>
          </div>
          <a href="/admin" className="bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-xl">
            Login
          </a>
        </div>
      </div>
      <div className="flex justify-center">
        <button onClick={() => setView("home")} className="bg-[var(--kohinoor-blue)] text-white font-bold px-6 py-3 rounded-full text-sm hover:opacity-90 transition">
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}

function IndexInner() {
  const { view, setView, query, setQuery } = useView();
  const { products } = useProducts();

  const matchesCategory = (p: Product, keys: string[], exactCatName: string) => {
    const cat = (p.category || "").trim().toLowerCase();
    const targetCat = exactCatName.toLowerCase();

    if (cat === targetCat) return true;
    if (keys.some((k) => cat === k || cat.includes(k))) return true;

    if (!cat || cat === "general") {
      const title = p.title.toLowerCase();
      return keys.some((k) => {
        const regex = new RegExp(`\\b${k}\\b`, "i");
        return regex.test(title);
      });
    }

    return false;
  };

  const ledBulbItems = products.filter((p) => matchesCategory(p, ["ledbulbs", "led bulb", "bulb"], "ledBulbs"));
  const torchItems = products.filter((p) => matchesCategory(p, ["torches", "torch", "flashlight"], "torches"));
  const kitchenItems = products.filter((p) => matchesCategory(p, ["kitchenappliances", "kitchen", "geyser", "heater", "hot plate"], "kitchenAppliances"));
  const streetLightItems = products.filter((p) => matchesCategory(p, ["streetlights", "street light", "flood light"], "streetLights"));
  const fanItems = products.filter((p) => matchesCategory(p, ["fans", "ceiling fan"], "fans"));
  const speakerItems = products.filter((p) => matchesCategory(p, ["speakers", "megaphone"], "speakers"));
  const coolerItems = products.filter((p) => matchesCategory(p, ["coolerparts", "cooler motor"], "coolerParts"));
  const dthItems = products.filter((p) => matchesCategory(p, ["dthdevices", "set top box"], "dthDevices"));
  const decorItems = products.filter((p) => matchesCategory(p, ["decorlights", "fairy light"], "decorLights"));
  const electricalItems = products.filter((p) => matchesCategory(p, ["electricalaccessories", "spike guard"], "electricalAccessories"));
  const engineOilItems = products.filter((p) => matchesCategory(p, ["engineoils", "engine oil"], "engineOils"));

  const newAdminItems = useMemo(() => {
    return products.filter((p) => p._id);
  }, [products]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top utility bar */}
      <div className="hidden md:block bg-[var(--kohinoor-blue)] text-white text-xs">
        <div className="max-w-[1280px] mx-auto px-4 py-2 flex flex-wrap items-center justify-end gap-x-5 gap-y-2">
          <button onClick={() => setView("store_locator")} className="flex items-center gap-1.5 hover:text-[var(--kohinoor-yellow)] transition-colors">
            <MapPin className="h-3.5 w-3.5 text-[var(--kohinoor-yellow)]" /> Store Locator
          </button>
          <span className="opacity-40">|</span>
          <button onClick={() => setView("track_order")} className="flex items-center gap-1.5 hover:text-[var(--kohinoor-yellow)] transition-colors">
            <Package className="h-3.5 w-3.5 text-[var(--kohinoor-yellow)]" /> Track Your Order
          </button>
          <span className="opacity-40">|</span>
          <button onClick={() => setView("contact")} className="flex items-center gap-1.5 hover:text-[var(--kohinoor-yellow)] transition-colors">
            <Phone className="h-3.5 w-3.5 text-[var(--kohinoor-yellow)]" /> Contact Us
          </button>
          <span className="opacity-40">|</span>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[var(--kohinoor-yellow)] transition-colors">
            <Instagram className="h-3.5 w-3.5 text-[var(--kohinoor-yellow)]" /> Follow us
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="bg-black sticky top-0 z-40 md:static shadow-lg">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-wrap items-center gap-3 sm:gap-6">
          <button onClick={() => setView("home")} className="flex items-center shrink-0 rt-btn">
            <img
              src={logoImg}
              alt="Raj Traders"
              className="h-10 sm:h-14 md:h-16 w-auto object-contain"
            />
          </button>
          <div className="flex items-center gap-4 sm:gap-6 text-white text-sm ml-auto md:order-3">
            <button onClick={() => setView("contact")} className="hidden md:flex items-center gap-1.5 rt-btn">
              <Headphones className="h-4 w-4 text-[var(--kohinoor-yellow)]" />
              Customer Care
            </button>
            <WishlistButton />
            <CartButton />
          </div>
          <div className="order-last md:order-2 basis-full md:basis-0 md:flex-1 md:max-w-2xl min-w-0">
            <form
              onSubmit={(e) => { e.preventDefault(); setView("search"); }}
              className="bg-white rounded-full flex items-center px-4 py-2 shadow-inner ring-1 ring-black/5 focus-within:ring-[var(--kohinoor-blue)] transition"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); if (view !== "search") setView("search"); }}
                placeholder="Search products, brands..."
                className="flex-1 min-w-0 bg-transparent outline-none text-sm text-[var(--text-on-white)] placeholder:text-[var(--text-on-white)]/50"
              />
              <button
                type="submit"
                aria-label="Search"
                className="bg-[var(--kohinoor-blue)] h-8 w-9 shrink-0 rounded-full flex items-center justify-center text-white rt-btn hover:bg-[var(--kohinoor-yellow)] hover:text-black"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-[1280px] mx-auto px-3 sm:px-4 py-3 flex items-center gap-4 sm:gap-8 text-xs sm:text-sm overflow-x-auto whitespace-nowrap">
            <button onClick={() => setView("home")} className="text-[var(--kohinoor-yellow)] font-semibold flex items-center gap-1 shrink-0 rt-btn">
              All Categories <ChevronDown className="h-4 w-4" />
            </button>
            <button onClick={() => setView("hotdeals")} className={`shrink-0 font-semibold rt-btn ${view === "hotdeals" ? "text-[var(--kohinoor-yellow)]" : "text-white hover:text-[var(--kohinoor-yellow)]"}`}>Hot Deals</button>
            <button onClick={() => setView("brands")} className={`shrink-0 font-semibold rt-btn ${view === "brands" ? "text-[var(--kohinoor-yellow)]" : "text-white hover:text-[var(--kohinoor-yellow)]"}`}>Brands Store</button>
            <button onClick={() => setView("wishlist")} className={`shrink-0 font-semibold rt-btn ${view === "wishlist" ? "text-[var(--kohinoor-yellow)]" : "text-white hover:text-[var(--kohinoor-yellow)]"}`}>Wishlist</button>
          </div>
        </div>
      </header>

      {view === "hotdeals" && <HotDealsView />}
      {view === "brands" && <BrandsView />}
      {view === "search" && <SearchView />}
      {view === "wishlist" && <WishlistView />}
      {view === "about_us" && <AboutUsView />}
      {view === "terms" && <TermsView />}
      {view === "privacy_policy" && <PrivacyPolicyView />}
      {view === "refund_policy" && <RefundPolicyView />}
      {view === "disclaimer" && <DisclaimerView />}
      {view === "blogs" && <BlogsView />}
      {view === "faq" && <FaqView />}
      {view === "our_promise" && <OurPromiseView />}
      {view === "careers" && <CareersView />}
      {view === "testimonials" && <TestimonialsView />}
      {view === "contact" && <ContactView />}
      {view === "store_locator" && <StoreLocatorView />}
      {view === "track_order" && <TrackOrderView />}
      {view === "account" && <AccountView />}

      {view === "home" && (<>
      {/* Hero */}
      <HeroSlider />
        <div className="bg-[oklch(0.25_0.1_290)] text-white">
          <div className="max-w-[1280px] mx-auto px-3 sm:px-4 py-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-center">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Limited Period Offer
            </span>
            <span className="opacity-40 hidden sm:inline">|</span>
            <span>Pre-Reserve Now & Get More</span>
          </div>
        </div>

      <CategorySlider />

      {/* Category promo banners */}
      <section className="max-w-[1280px] mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[bannerEnt, bannerWash, bannerAc, bannerFridge].map((src, i) => (
          <a key={i} href="#" className="block rounded-lg overflow-hidden">
            <img src={src} alt="" loading="lazy" className="w-full h-auto block" />
          </a>
        ))}
      </section>

      {newAdminItems.length > 0 && (
        <ProductSlider title="✨ Storefront Inventory & Admin Additions" products={newAdminItems} />
      )}

      {ledBulbItems.length > 0 && <ProductSlider title="LED Bulbs" products={ledBulbItems} />}

      {torchItems.length > 0 && <ProductSlider title="Torches & Flashlights" products={torchItems} />}

      {kitchenItems.length > 0 && <ProductSlider title="Kitchen & Heating Appliances" products={kitchenItems} />}

      {/* 4 promo tiles */}
      <section className="max-w-[1280px] mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[promoMicrowave, promoSmartphone, promoTv, promoWashing].map((src, i) => (
          <a key={i} href="#" className="block rounded-lg overflow-hidden">
            <img src={src} alt="" loading="lazy" className="w-full h-auto block" />
          </a>
        ))}
      </section>

      {streetLightItems.length > 0 && <ProductSlider title="LED Street & Flood Lights" products={streetLightItems} />}

      {fanItems.length > 0 && <ProductSlider title="Ceiling Fans" products={fanItems} />}

      {speakerItems.length > 0 && <ProductSlider title="Speakers & Announce Systems" products={speakerItems} />}

      {coolerItems.length > 0 && <ProductSlider title="Cooler Motors & Spares" products={coolerItems} />}

      {dthItems.length > 0 && <ProductSlider title="DTH & Set Top Box" products={dthItems} />}

      {decorItems.length > 0 && <ProductSlider title="Decorative & Fairy Lights" products={decorItems} />}

      {electricalItems.length > 0 && <ProductSlider title="Electrical Accessories" products={electricalItems} />}

      {engineOilItems.length > 0 && <ProductSlider title="Automotive Engine Oils" products={engineOilItems} />}

      {/* Video + brand tabs */}
      <section className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-3">
          <div className="relative aspect-[16/9] bg-black rounded-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&auto=format"
              alt="Video"
              loading="lazy"
              className="w-full h-full object-cover opacity-80"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center">
                <Play className="h-6 w-6 text-[var(--kohinoor-blue)] fill-current" />
              </div>
            </button>
            <div className="absolute bottom-8 left-0 right-0 bg-[var(--kohinoor-blue)] text-white text-center py-2 font-semibold">
              Hello and Namaste Everyone!
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {["KTV", "JBL", "Samsung", "LG"].map((b, i) => (
              <button
                key={b}
                className={`text-left px-4 py-4 font-semibold ${
                  i === 0
                    ? "bg-[var(--kohinoor-blue)] text-white"
                    : "bg-[var(--panel)] text-white/80"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose Kohinoor */}
      <section className="max-w-[1280px] mx-auto px-4 py-8 text-center">
        <h2 className="text-white font-bold text-2xl">Why choose Kohinoor</h2>
        <p className="text-[var(--kohinoor-yellow)] text-sm mt-2">
          Kohinoor's Promise of Joyful Experience & Assured Quality, Creating Milestones Since 1967
        </p>
        <p className="text-[var(--kohinoor-yellow)] text-sm">
          Your trusted destination for Consumer Electronics
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { icon: Tag, label: "Best Offers & Prices" },
            { icon: HandCoins, label: "Multiple Payment Modes" },
            { icon: Truck, label: "Scheduled Delivery & Easy Installations" },
            { icon: PackageCheck, label: "No Cost EMI & Exchange Offers" },
            { icon: Handshake, label: "Exceptional Service" },
            { icon: FileText, label: "Multiple Extended Warranty Plans" },
          ].map(({ icon: I, label }, i, arr) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-2 px-3 ${
                i < arr.length - 1 ? "md:border-r md:border-white/10" : ""
              }`}
            >
              <I className="h-10 w-10 text-[var(--kohinoor-yellow)]" strokeWidth={1.5} />
              <p className="text-[var(--kohinoor-yellow)] text-xs font-semibold">
                {label}
              </p>
            </div>
          ))}
        </div>
        <button className="mt-8 bg-[var(--kohinoor-yellow)] text-black text-sm font-semibold px-5 py-2 rounded-full inline-flex items-center gap-2">
          <Headphones className="h-4 w-4" /> Connect to expert
        </button>
      </section>

      {/* New Arrivals wide banner */}
      <section className="max-w-[1280px] mx-auto px-4 py-4">
        <a href="#" className="block rounded-md overflow-hidden">
          <img src={bannerNewArrivals} alt="New Arrivals" loading="lazy" className="w-full h-auto" />
        </a>
      </section>

      <BrandSlider />
      </>)}

      {/* Subscribe */}
      <section className="bg-[var(--kohinoor-blue)]">
        <div className="max-w-[1280px] mx-auto px-3 sm:px-4 py-6 flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3 text-white flex-1 min-w-0">
            <Mail className="h-8 w-8 shrink-0" />
            <div className="min-w-0">
              <p className="font-bold">Subscribe for new offers</p>
              <p className="text-xs opacity-90">
                We'll never share your email address with a any third party
              </p>
            </div>
          </div>
          <div className="flex w-full md:w-auto min-w-0">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 min-w-0 px-4 py-2.5 bg-white text-[var(--text-on-white)] rounded-l-md outline-none md:min-w-[280px]"
            />
            <button className="bg-[var(--kohinoor-yellow)] text-black font-bold px-4 sm:px-6 py-2.5 rounded-r-md shrink-0 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          <div>
            <img
              src={logoImg}
              alt="Raj Traders"
              className="h-20 w-auto object-contain mb-6"
            />
            <div className="flex items-center gap-3">
              <Headphones className="h-8 w-8 text-[var(--kohinoor-yellow)]" />
              <div className="text-xs">
                <p className="text-[var(--kohinoor-yellow)] font-semibold">
                  Got questions? Call us!
                </p>
                <p className="font-bold text-white text-base">+91 97521 44747</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-10 w-10 rounded-full bg-gradient-to-br from-[oklch(0.65_0.2_30)] via-[oklch(0.6_0.25_340)] to-[oklch(0.5_0.2_290)] flex items-center justify-center shadow-md rt-btn hover:scale-110"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-[var(--kohinoor-yellow)] font-bold mb-4">Find it Fast</p>
            <ul className="space-y-2 text-[var(--kohinoor-yellow)]/90 text-xs">
              <li><button onClick={() => { setQuery("Accessories"); setView("search"); }} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Accessories</button></li>
              <li><button onClick={() => { setQuery("Air Conditioner"); setView("search"); }} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Air Conditioner</button></li>
              <li><button onClick={() => { setQuery("Printer"); setView("search"); }} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Laptops & Printer</button></li>
              <li><button onClick={() => { setQuery("Home Appliances"); setView("search"); }} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Home Appliances</button></li>
              <li><button onClick={() => { setQuery("Entertainment"); setView("search"); }} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Home Entertainment</button></li>
            </ul>
          </div>
          <div>
            <p className="text-[var(--kohinoor-yellow)] font-bold mb-4 opacity-0 md:block hidden">.</p>
            <ul className="space-y-2 text-[var(--kohinoor-yellow)]/90 text-xs">
              <li><button onClick={() => { setQuery("Phone"); setView("search"); }} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Smart Phone</button></li>
              <li><button onClick={() => { setQuery("Microwave"); setView("search"); }} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Microwaves</button></li>
              <li><button onClick={() => { setQuery("Cooler"); setView("search"); }} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Air Coolers</button></li>
            </ul>
          </div>
          <div>
            <p className="text-[var(--kohinoor-yellow)] font-bold mb-4">My Account</p>
            <ul className="space-y-2 text-[var(--kohinoor-yellow)]/90 text-xs">
              <li><button onClick={() => setView("account")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">My Account</button></li>
              <li><button onClick={() => setView("track_order")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Track Your Order</button></li>
              <li><button onClick={() => setView("wishlist")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Wish List</button></li>
            </ul>
            <p className="text-[var(--kohinoor-yellow)] font-bold mb-4 mt-6">About</p>
            <ul className="space-y-2 text-[var(--kohinoor-yellow)]/90 text-xs">
              <li><button onClick={() => setView("about_us")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">About Us</button></li>
              <li><button onClick={() => setView("blogs")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Blogs</button></li>
              <li><button onClick={() => setView("our_promise")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Our Promise</button></li>
              <li><button onClick={() => setView("faq")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">FAQ</button></li>
              <li><button onClick={() => setView("testimonials")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Testimonials</button></li>
              <li><button onClick={() => setView("careers")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Careers</button></li>
            </ul>
          </div>
          <div>
            <p className="text-[var(--kohinoor-yellow)] font-bold mb-4">Policies</p>
            <ul className="space-y-2 text-[var(--kohinoor-yellow)]/90 text-xs">
              <li><button onClick={() => setView("privacy_policy")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Privacy Policy</button></li>
              <li><button onClick={() => setView("terms")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Terms & Conditions</button></li>
              <li><button onClick={() => setView("disclaimer")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Disclaimer</button></li>
              <li><button onClick={() => setView("refund_policy")} className="hover:text-white transition-colors text-left hover:translate-x-1 duration-200 transform inline-block">Cancellation, Returns & Refunds</button></li>
            </ul>
          </div>
        </div>
        <div className="bg-[var(--kohinoor-blue)] text-white text-xs">
          <div className="max-w-[1280px] mx-auto px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p>
              © <span className="font-bold">Raj Traders</span> — All rights Reserved
            </p>
            <div className="flex flex-wrap justify-center gap-2 items-center text-[10px] font-bold">
              <span className="bg-white text-[var(--kohinoor-blue)] px-2 py-1 rounded">VISA</span>
              <span className="bg-white text-red-600 px-2 py-1 rounded">MC</span>
              <span className="bg-white text-blue-800 px-2 py-1 rounded">AMEX</span>
              <span className="bg-white text-black px-2 py-1 rounded">DC</span>
            </div>
          </div>
        </div>
      </footer>
      <FloatingWhatsApp />
      <CartDrawer />
      <FooterModalsContainer />
      <MobileBottomNav />
      <div className="h-16 md:hidden" aria-hidden />
    </div>
  );
}

function FooterModalsContainer() {
  const { activeModal, closeModal, setView, openModal } = useView();
  const [orderInput, setOrderInput] = useState("");
  const [tracked, setTracked] = useState(false);

  if (!activeModal) return null;

  const titles: Record<NonNullable<ModalType>, string> = {
    track_order: "Track Your Order",
    account: "My Account",
    store_locator: "Store Locator & Hours",
    contact: "Contact & Support",
    about_us: "About Raj Traders",
    blogs: "Articles & Buying Guides",
    our_promise: "Our Store Promise",
    faq: "Frequently Asked Questions",
    testimonials: "Customer Reviews",
    careers: "Careers at Raj Traders",
    privacy_policy: "Privacy Policy",
    terms: "Terms & Conditions",
    disclaimer: "Legal Disclaimer",
    refund_policy: "Cancellation, Returns & Refunds",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 rt-fade-up">
      <div className="bg-[#0B0F19] text-slate-100 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <h3 className="font-black text-lg text-white tracking-tight">
            {titles[activeModal]}
          </h3>
          <button
            onClick={closeModal}
            className="h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-sm space-y-4">
          {activeModal === "track_order" && (
            <div className="space-y-5">
              <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800">
                <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                  Enter Order ID or Mobile Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. RT-98214 or 9752144747"
                    value={orderInput}
                    onChange={(e) => setOrderInput(e.target.value)}
                    className="flex-1 bg-black/60 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--kohinoor-yellow)]"
                  />
                  <button
                    onClick={() => setTracked(true)}
                    className="bg-[var(--kohinoor-yellow)] text-black font-bold px-5 py-2.5 rounded-xl text-xs hover:opacity-90 transition-opacity"
                  >
                    Track
                  </button>
                </div>
              </div>

              {tracked && (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-emerald-500/20">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Order Status</span>
                      <h4 className="text-sm font-bold text-white">Order #{orderInput ? orderInput.toUpperCase() : "RT-98214"}</h4>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/40">
                      In Transit 🚚
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                      <div>
                        <p className="font-bold text-xs text-white">Order Placed & Verified</p>
                        <p className="text-[11px] text-slate-400">Received at Kalyanpura store</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                      <div>
                        <p className="font-bold text-xs text-white">Quality Checked & Warranty Sealed</p>
                        <p className="text-[11px] text-slate-400">Inspected by store technician</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-[var(--kohinoor-yellow)] text-black flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">🚚</div>
                      <div>
                        <p className="font-bold text-xs text-[var(--kohinoor-yellow)]">Out for Local Delivery</p>
                        <p className="text-[11px] text-slate-300">On route in Kalyanpura area</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                <a href="tel:+919752144747" className="flex-1 bg-slate-900 border border-slate-700 text-slate-200 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-slate-800">
                  <Phone className="h-4 w-4 text-[var(--kohinoor-yellow)]" /> Call Store
                </a>
                <a href="https://wa.me/919752144747" target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-emerald-500">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          )}

          {activeModal === "account" && (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[var(--kohinoor-blue)] to-[var(--kohinoor-yellow)] text-white font-black text-lg flex items-center justify-center shadow-md shrink-0">
                  RT
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Customer Account</h3>
                  <p className="text-xs text-slate-400">Raj Traders Kalyanpura</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button onClick={() => { closeModal(); setView("wishlist"); }} className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition-all group">
                  <Heart className="h-5 w-5 text-red-500 mb-1.5 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-xs text-white">My Wishlist</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Saved items & favorites</p>
                </button>
                <button onClick={() => openModal("track_order")} className="p-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl text-left transition-all group">
                  <Package className="h-5 w-5 text-[var(--kohinoor-yellow)] mb-1.5 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-xs text-white">Track Orders</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Delivery updates</p>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-slate-300">Staff / Executive Login</p>
                  <p className="text-[10px] text-slate-500">Access sales & inventory suite</p>
                </div>
                <a href="/admin" className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl border border-white/20">
                  Admin Suite
                </a>
              </div>
            </div>
          )}

          {activeModal === "store_locator" && (
            <div className="space-y-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-[var(--kohinoor-yellow)] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-base text-white">Raj Traders (Electronics & Electricals)</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Main Market Road, Near Bus Stand, Kalyanpura,<br />
                      District Jhabua, Madhya Pradesh - 457773
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block">Store Timings</span>
                    <span className="text-emerald-400 font-bold">9:00 AM – 9:00 PM</span>
                    <span className="text-slate-500 block text-[10px]">(Open All 7 Days)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Contact Number</span>
                    <span className="text-white font-bold">+91 97521 44747</span>
                    <span className="text-slate-400 block text-[10px]">Call or WhatsApp</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href="https://maps.google.com/?q=Kalyanpura+Jhabua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[var(--kohinoor-blue)] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:opacity-90"
                >
                  <Navigation className="h-4 w-4" /> Open Directions Map
                </a>
                <a
                  href="tel:+919752144747"
                  className="bg-slate-800 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 hover:bg-slate-700"
                >
                  <Phone className="h-4 w-4 text-[var(--kohinoor-yellow)]" /> Call Store
                </a>
              </div>
            </div>
          )}

          {activeModal === "contact" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a href="tel:+919752144747" className="p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-[var(--kohinoor-yellow)] flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Call Us Directly</p>
                    <p className="font-bold text-xs text-white">+91 97521 44747</p>
                  </div>
                </a>
                <a href="https://wa.me/919752144747" target="_blank" rel="noopener noreferrer" className="p-3.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">WhatsApp Chat</p>
                    <p className="font-bold text-xs text-emerald-400">Instant Reply</p>
                  </div>
                </a>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent to Raj Traders Kalyanpura. We will contact you shortly."); closeModal(); }} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Send Quick Inquiry</h4>
                <input type="text" required placeholder="Your Name" className="w-full bg-black/60 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--kohinoor-yellow)]" />
                <input type="tel" required placeholder="Mobile Number" className="w-full bg-black/60 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--kohinoor-yellow)]" />
                <textarea rows={3} required placeholder="Which product or service do you need help with?" className="w-full bg-black/60 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--kohinoor-yellow)]" />
                <button type="submit" className="w-full bg-[var(--kohinoor-yellow)] text-black font-bold py-2.5 rounded-xl text-xs hover:opacity-90">
                  Send Message
                </button>
              </form>
            </div>
          )}

          {activeModal === "about_us" && (
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="bg-gradient-to-r from-blue-950 to-slate-900 p-4 rounded-2xl border border-blue-800/40">
                <h3 className="text-base font-bold text-white mb-1.5">Raj Traders — Kalyanpura</h3>
                <p>
                  Raj Traders is the trusted multi-brand store in Kalyanpura (Jhabua district) for home electronics, kitchen appliances, smart TVs, mobiles, refrigerators, air conditioners, fans, torches, and electrical utility items.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white text-xs mb-1">⭐ 100% Genuine</h4>
                  <p className="text-[11px] text-slate-400">Backed by official brand warranty cards.</p>
                </div>
                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <h4 className="font-bold text-white text-xs mb-1">🏷️ Best Local Price</h4>
                  <p className="text-[11px] text-slate-400">Transparent rates & seasonal discounts.</p>
                </div>
              </div>

              <p>
                We take pride in serving hundreds of families across Kalyanpura and surrounding areas with genuine products, express doorstep delivery, and dedicated customer support.
              </p>
            </div>
          )}

          {activeModal === "blogs" && (
            <div className="space-y-3">
              {[
                { title: "Summer Air Conditioner Buying Guide 2026", date: "May 2026", desc: "Learn how to select 1.5 Ton vs 1 Ton inverter ACs for Kalyanpura climate to save up to 40% on electricity bills." },
                { title: "Top 5 Features to Check in Smart TVs Before Buying", date: "April 2026", desc: "4K resolution, Dolby Audio, Android TV OS, and HDMI ports explained for home entertainment." },
                { title: "How to Protect Home Appliances from Voltage Fluctuations", date: "March 2026", desc: "Essential guide on choosing automatic voltage stabilizers for refrigerators, air coolers, and heavy machinery." },
              ].map((b, i) => (
                <div key={i} className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold text-[var(--kohinoor-yellow)] uppercase tracking-wider">{b.date}</span>
                  <h4 className="font-bold text-xs text-white mt-0.5">{b.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeModal === "our_promise" && (
            <div className="space-y-3">
              {[
                { title: "100% Genuine Products", desc: "Direct from authorized distributors with factory sealed packaging.", icon: ShieldCheck, color: "text-emerald-400" },
                { title: "Transparent Pricing", desc: "Honest local prices with festival discount offers.", icon: Tag, color: "text-amber-400" },
                { title: "Express Local Delivery", desc: "Fast doorstep delivery across Kalyanpura and nearby regions.", icon: Truck, color: "text-blue-400" },
                { title: "Warranty Support", desc: "Complete store assistance for official manufacturer warranty.", icon: Headphones, color: "text-purple-400" },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 flex items-start gap-3">
                    <IconComponent className={`h-5 w-5 ${item.color} shrink-0 mt-0.5`} />
                    <div>
                      <h4 className="font-bold text-xs text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeModal === "faq" && (
            <div className="space-y-3">
              {[
                { q: "Do you deliver products locally in Kalyanpura?", a: "Yes! We provide express doorstep delivery for all products including TVs, refrigerators, and coolers within Kalyanpura and surrounding areas." },
                { q: "Are all products covered under company warranty?", a: "Yes, 100% of our electronic items come with official manufacturer warranty cards and original tax invoices." },
                { q: "What payment methods do you accept?", a: "We accept Cash, UPI (GPay, PhonePe, Paytm), Debit/Credit cards, and easy EMI options for high-value appliances." },
                { q: "Can I get installation service for AC or TV?", a: "Yes, our store team coordinates authorized technician installation for Air Conditioners, Smart TVs, and DTH connections." },
                { q: "What if I receive a defective item?", a: "We offer an easy 7-day replacement policy for manufacturing defects. Bring it to our store or contact support." },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-xs text-[var(--kohinoor-yellow)]">Q: {item.q}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">A: {item.a}</p>
                </div>
              ))}
            </div>
          )}

          {activeModal === "testimonials" && (
            <div className="space-y-3">
              {[
                { name: "Ramesh Patel", loc: "Kalyanpura", comment: "Best electronic store in Kalyanpura! Purchased a Smart TV at a price lower than online platforms. Very humble owner." },
                { name: "Sunita Sharma", loc: "Jhabua Road", comment: "Bought a washing machine and refrigerator. Same day delivery and installation was done smoothly." },
                { name: "Vikram Rathore", loc: "Kalyanpura", comment: "Original mobile accessories and best LED bulbs in town. Always reliable service." },
              ].map((t, idx) => (
                <div key={idx} className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-xs text-white">{t.name}</h4>
                      <span className="text-[10px] text-slate-400">{t.loc}</span>
                    </div>
                    <div className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
                  </div>
                  <p className="text-[11px] text-slate-300 italic">"{t.comment}"</p>
                </div>
              ))}
            </div>
          )}

          {activeModal === "careers" && (
            <div className="space-y-3">
              <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800">
                <h4 className="font-bold text-xs text-white mb-0.5">Work With Raj Traders Kalyanpura</h4>
                <p className="text-[11px] text-slate-400">Join our growing electronics retail team!</p>
              </div>

              <div className="space-y-2">
                {[
                  { role: "Electronics Sales Executive", type: "Full Time", loc: "Kalyanpura Store" },
                  { role: "Inventory & Billing Assistant", type: "Full Time", loc: "Kalyanpura Store" },
                  { role: "Appliance Delivery & Setup Partner", type: "Full Time", loc: "Local Region" },
                ].map((job, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-xs text-white">{job.role}</h5>
                      <span className="text-[10px] text-slate-400">{job.type} • {job.loc}</span>
                    </div>
                    <a
                      href={`https://wa.me/919752144747?text=${encodeURIComponent(`Hello Raj Traders, I want to apply for the role of ${job.role}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg"
                    >
                      Apply
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeModal === "privacy_policy" && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-sm text-white">Privacy Policy</h4>
              <p>At Raj Traders Kalyanpura, we respect your privacy and protect your personal information.</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>We collect only essential information (Name, Phone, Address) needed for order fulfillment and delivery.</li>
                <li>Your information is strictly confidential and is never shared with third parties.</li>
                <li>In-store and digital transactions follow standard security measures.</li>
              </ul>
            </div>
          )}

          {activeModal === "terms" && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-sm text-white">Terms & Conditions</h4>
              <p>Welcome to Raj Traders. By shopping with us, you agree to the following terms:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>All product prices are inclusive of applicable taxes.</li>
                <li>Product warranties are provided directly by respective manufacturers as per official terms.</li>
                <li>Raj Traders reserves the right to confirm stock availability prior to dispatch.</li>
              </ul>
            </div>
          )}

          {activeModal === "disclaimer" && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-sm text-white">Disclaimer</h4>
              <p>
                Product specifications, images, and prices shown are for customer guidance. While we ensure accuracy, actual product packaging or colors may slightly vary based on manufacturer revisions.
              </p>
            </div>
          )}

          {activeModal === "refund_policy" && (
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <h4 className="font-bold text-sm text-white">Cancellation, Returns & Refunds Policy</h4>
              <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
                <li><strong className="text-white">7-Day Replacement:</strong> Manufacturing defects can be replaced within 7 days of purchase.</li>
                <li><strong className="text-white">Requirements:</strong> Returned items must include original tax invoice, box, and warranty card.</li>
                <li><strong className="text-white">Refunds:</strong> Processed via original payment mode within 2–3 working days.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex justify-end">
          <button
            onClick={closeModal}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 relative rt-btn">
      <ShoppingCart className="h-4 w-4 text-[var(--kohinoor-yellow)]" />
      My Cart
      {count > 0 && (
        <span className="absolute -top-2 -right-3 bg-[var(--kohinoor-red)] text-white text-[10px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

function WishlistButton() {
  const { count } = useWishlist();
  const { setView } = useView();
  return (
    <button onClick={() => setView("wishlist")} className="flex items-center gap-1.5 relative rt-btn" aria-label="Wishlist">
      <Heart className="h-4 w-4 text-[var(--kohinoor-yellow)]" />
      <span className="hidden sm:inline">Wishlist</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-3 bg-[var(--kohinoor-red)] text-white text-[10px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919752144747"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 h-14 w-14 rounded-full bg-[oklch(0.65_0.18_150)] text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-[pulse_2s_ease-in-out_infinite]"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

function MobileBottomNav() {
  const { count, setOpen } = useCart();
  const { count: wishCount } = useWishlist();
  const { setView } = useView();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5 text-white text-[10px]">
        <li>
          <button onClick={() => setView("home")} className="w-full flex flex-col items-center justify-center gap-0.5 py-2 rt-btn">
            <Home className="h-5 w-5 text-[var(--kohinoor-yellow)]" /><span>Home</span>
          </button>
        </li>
        <li>
          <button onClick={() => setView("brands")} className="w-full flex flex-col items-center justify-center gap-0.5 py-2 rt-btn">
            <LayoutGrid className="h-5 w-5 text-[var(--kohinoor-yellow)]" /><span>Brands</span>
          </button>
        </li>
        <li>
          <button onClick={() => setView("search")} className="w-full flex flex-col items-center justify-center gap-0.5 py-2 rt-btn">
            <Search className="h-5 w-5 text-[var(--kohinoor-yellow)]" /><span>Search</span>
          </button>
        </li>
        <li>
          <button onClick={() => setView("wishlist")} className="w-full flex flex-col items-center justify-center gap-0.5 py-2 relative rt-btn">
            <Heart className="h-5 w-5 text-[var(--kohinoor-yellow)]" /><span>Wishlist</span>
            {wishCount > 0 && (
              <span className="absolute top-1 right-3 bg-[var(--kohinoor-red)] text-white text-[9px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center">{wishCount}</span>
            )}
          </button>
        </li>
        <li>
          <button
            onClick={() => setOpen(true)}
            className="w-full flex flex-col items-center justify-center gap-0.5 py-2 relative rt-btn"
          >
            <ShoppingCart className="h-5 w-5 text-[var(--kohinoor-yellow)]" />
            <span>Cart</span>
            {count > 0 && (
              <span className="absolute top-1 right-3 bg-[var(--kohinoor-red)] text-white text-[9px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}

function useAutoScroll(
  ref: React.RefObject<HTMLDivElement | null>,
  step?: number,
  interval = 3500,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let paused = false;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    const id = window.setInterval(() => {
      if (paused || !el) return;
      const dist = step ?? el.clientWidth * 0.9;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: dist, behavior: "smooth" });
    }, interval);
    return () => {
      window.clearInterval(id);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, step, interval]);
}

const heroSlides = [
  {
    eyebrow: "SAMSUNG",
    title: "New Shape. New Joy.",
    subtitle: "Something Bigger Coming Soon..",
    cta: "Pre-Reserve Starts Now",
    image: heroPremium1,
    tint: "linear-gradient(90deg, oklch(0.2 0.05 250 / 0.75), oklch(0.2 0.05 250 / 0.15))",
  },
  {
    eyebrow: "HOME APPLIANCES",
    title: "Upgrade Your Home",
    subtitle: "Fridges, ACs, Washing Machines & more",
    cta: "Shop Appliances",
    image: heroPremium2,
    tint: "linear-gradient(90deg, oklch(0.25 0.08 40 / 0.75), oklch(0.2 0.05 40 / 0.1))",
  },
  {
    eyebrow: "LED & LIGHTING",
    title: "Brighten Every Space",
    subtitle: "Premium bulbs, torches & street lights",
    cta: "Shop Lighting",
    image: heroPremium3,
    tint: "linear-gradient(90deg, oklch(0.22 0.08 260 / 0.75), oklch(0.2 0.05 260 / 0.1))",
  },
  {
    eyebrow: "FANS & COOLING",
    title: "Stay Cool. Stay Comfortable.",
    subtitle: "Ceiling fans, coolers & spare parts",
    cta: "Shop Cooling",
    image: heroPremium4,
    tint: "linear-gradient(90deg, oklch(0.22 0.08 200 / 0.75), oklch(0.2 0.05 200 / 0.1))",
  },
];

function HeroSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);
  const go = (d: -1 | 1) =>
    setIdx((i) => (i + d + heroSlides.length) % heroSlides.length);
  return (
    <section className="relative">
      <div className="max-w-[1280px] mx-auto px-4 relative">
        <div className="relative rounded-2xl overflow-hidden h-[280px] md:h-[460px] shadow-[var(--premium-shadow-lg)]">
          {heroSlides.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{
                opacity: i === idx ? 1 : 0,
                pointerEvents: i === idx ? "auto" : "none",
              }}
            >
              <img src={s.image} alt={s.title} className={`absolute inset-0 h-full w-full object-cover ${i === idx ? "rt-fade-in" : ""}`} style={{ transform: i === idx ? "scale(1.04)" : "scale(1)", transition: "transform 6s ease-out" }} />
              <div className="absolute inset-0" style={{ background: s.tint }} />
              <div className="relative h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 max-w-2xl">
                <p className="text-[var(--kohinoor-yellow)] font-semibold text-xs sm:text-sm tracking-[0.2em] rt-fade-up">
                  {s.eyebrow}
                </p>
                <h1 className="text-white font-black text-3xl sm:text-5xl md:text-6xl mt-3 sm:mt-4 drop-shadow-xl leading-tight rt-fade-up" style={{ animationDelay: "80ms" }}>
                  {s.title}
                </h1>
                <p className="text-white/90 text-sm sm:text-lg md:text-xl mt-2 sm:mt-3 rt-fade-up" style={{ animationDelay: "160ms" }}>
                  {s.subtitle}
                </p>
                <div className="mt-5 sm:mt-6 rt-fade-up" style={{ animationDelay: "240ms" }}>
                  <button className="bg-[var(--kohinoor-yellow)] text-black font-bold px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm shadow-lg rt-btn hover:bg-white">
                    {s.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="absolute left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-[var(--text-on-white)] flex items-center justify-center shadow-md rt-btn hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="absolute right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-[var(--text-on-white)] flex items-center justify-center shadow-md rt-btn hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
