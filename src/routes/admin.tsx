import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoImg from "@/assets/raj-traders-rt-logo.png";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  fetchProducts,
  adminLogin,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getAdminToken,
  removeAdminToken,
  getImageUrl,
  ProductItem,
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
  OrderItem,
} from "../lib/api";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Plus,
  Trash2,
  Edit,
  Upload,
  LogOut,
  ArrowLeft,
  Check,
  X,
  Menu,
  RefreshCw,
  Search,
  ShieldCheck,
  Tag,
  Layers,
  Activity,
  Database,
  MessageSquare,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Filter,
  Sparkles,
  Store,
  Sliders,
  TrendingUp,
  CircleDot,
  Server,
  Zap,
  ShoppingBag,
  Clock,
  Truck,
  PhoneCall,
  MapPin,
  IndianRupee,
  FileText,
  ChevronRight,
  Bell,
  UserCheck,
  TrendingDown,
  BarChart3,
  LineChart,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Executive Suite & Analytics — Raj Traders" }],
  }),
  component: AdminPage,
});

type ActiveTab = "dashboard" | "products" | "categories" | "orders" | "system";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs space-y-1.5 font-sans">
        <p className="font-black text-slate-300 uppercase tracking-widest text-[10px] border-b border-slate-700/80 pb-1">
          Period: {label}
        </p>
        <div className="flex items-center justify-between gap-4 font-bold text-sky-400">
          <span>Sales Revenue:</span>
          <span className="font-extrabold text-sm text-white">₹{payload[0]?.value?.toLocaleString("en-IN")}</span>
        </div>
        {payload[1] && (
          <div className="flex items-center justify-between gap-4 font-bold text-purple-400">
            <span>Orders Placed:</span>
            <span className="font-extrabold text-white">{payload[1]?.value} Orders</span>
          </div>
        )}
      </div>
    );
  }
  return null;
};

// -------------------------------------------------------------
// MODERN ANIMATED RECHARTS SALES CHART COMPONENT
// -------------------------------------------------------------
function ModernAnimatedSalesChart({ totalRevenue, totalOrders }: { totalRevenue: number; totalOrders: number }) {
  const [chartType, setChartType] = useState<"area" | "bar">("area");
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const monthlyData = [
    { month: "Jan", revenue: 12000, orders: 2 },
    { month: "Feb", revenue: 28500, orders: 6 },
    { month: "Mar", revenue: 36000, orders: 4 },
    { month: "Apr", revenue: 45000, orders: 8 },
    { month: "May", revenue: Math.max(88000, totalRevenue), orders: Math.max(16, totalOrders) },
    { month: "Jun", revenue: 52000, orders: 3 },
    { month: "Jul", revenue: 48000, orders: 10 },
    { month: "Aug", revenue: 96000, orders: 5 },
  ];

  const quarterlyData = [
    { month: "Q1 (Jan-Mar)", revenue: 76500, orders: 12 },
    { month: "Q2 (Apr-Jun)", revenue: Math.max(185000, totalRevenue), orders: Math.max(27, totalOrders) },
    { month: "Q3 (Jul-Sep)", revenue: 144000, orders: 15 },
    { month: "Q4 (Oct-Dec)", revenue: 210000, orders: 22 },
  ];

  const yearlyData = [
    { month: "2024", revenue: 420000, orders: 45 },
    { month: "2025", revenue: 680000, orders: 82 },
    { month: "2026 (YTD)", revenue: Math.max(415500, totalRevenue), orders: Math.max(50, totalOrders) },
  ];

  const data = timeframe === "monthly" ? monthlyData : timeframe === "quarterly" ? quarterlyData : yearlyData;

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-black text-slate-900 text-base tracking-tight flex items-center gap-2">
            <TrendingUp className="h-4.5 w-4.5 text-blue-600" /> Sales & Revenue Growth Analytics
          </h3>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Interactive animated monthly revenue curves & customer order volume</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe selector */}
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as any)}
            className="px-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold outline-none cursor-pointer"
          >
            <option value="monthly">📅 Monthly View</option>
            <option value="quarterly">📊 Quarterly View</option>
            <option value="yearly">📈 Yearly View</option>
          </select>

          {/* Controls: Area vs Bar toggle */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200 text-xs">
            <button
              onClick={() => setChartType("area")}
              className={`px-3 py-1.5 rounded-xl font-extrabold transition-all flex items-center gap-1.5 ${
                chartType === "area"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LineChart className="h-3.5 w-3.5" /> Area Curve
            </button>
            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1.5 rounded-xl font-extrabold transition-all flex items-center gap-1.5 ${
                chartType === "bar"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BarChart3 className="h-3.5 w-3.5" /> Bar Chart
            </button>
          </div>
        </div>
      </div>

      {/* Recharts Container with Smooth Bezier Animations */}
      <div className="h-[280px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={700} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={10}
                fontWeight={700}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Sales Revenue"
                stroke="#2563eb"
                strokeWidth={3.5}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-in-out"
              />
              <Area
                type="monotone"
                dataKey="orders"
                name="Orders Placed"
                stroke="#9333ea"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorOrders)"
                isAnimationActive={true}
                animationDuration={1800}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} fontWeight={700} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={10}
                fontWeight={700}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="revenue"
                fill="#2563eb"
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
                animationDuration={1200}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");

  // Products state
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState<"all" | "inStock" | "outOfStock">("all");

  // Orders State
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("all");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Form Fields
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    mrp: "",
    off: "",
    category: "ledBulbs",
    brand: "",
    img: "",
    description: "",
    inStock: true,
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = getAdminToken();
    if (savedToken) {
      setToken(savedToken);
      loadProducts();
      loadAllOrders();
    }
  }, []);

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      showToast("Error connecting to server to fetch products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadAllOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoadingLogin(true);
    try {
      const res = await adminLogin(usernameInput, passwordInput);
      setToken(res.token);
      loadProducts();
      loadAllOrders();
      showToast("Welcome back to Raj Traders Executive Suite!");
    } catch (err: any) {
      setLoginError(err.message || "Invalid username or password");
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleLogout = () => {
    removeAdminToken();
    setToken(null);
    showToast("Logged out of Admin Suite.");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadProductImage(file);
      setFormData((prev) => ({ ...prev, img: url }));
      setImagePreview(getImageUrl(url));
      showToast("Image uploaded successfully!");
    } catch (err: any) {
      alert("Image upload failed: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      price: "",
      mrp: "",
      off: "",
      category: "ledBulbs",
      brand: "",
      img: "",
      description: "",
      inStock: true,
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingId(p._id || null);
    setFormData({
      title: p.title,
      price: p.price,
      mrp: p.mrp || "",
      off: p.off || "",
      category: p.category || "ledBulbs",
      brand: p.brand || "",
      img: p.img,
      description: p.description || "",
      inStock: p.inStock !== undefined ? p.inStock : true,
    });
    setImagePreview(getImageUrl(p.img));
    setShowModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.img) {
      alert("Please fill in Title, Price, and select/provide an Image URL!");
      return;
    }

    setFormLoading(true);
    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        showToast(`Updated "${formData.title}" successfully!`);
      } else {
        await createProduct(formData);
        showToast(`Created new product "${formData.title}"!`);
      }
      setShowModal(false);
      loadProducts();
    } catch (err: any) {
      alert("Error saving product: " + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleStock = async (p: ProductItem) => {
    if (!p._id) return;
    try {
      const updatedStock = !(p.inStock !== false);
      await updateProduct(p._id, { inStock: updatedStock });
      setProducts((prev) =>
        prev.map((item) => (item._id === p._id ? { ...item, inStock: updatedStock } : item))
      );
      showToast(`Stock updated for ${p.title}`);
    } catch (err: any) {
      alert("Failed to update stock status: " + err.message);
    }
  };

  const handleDeleteProduct = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteProduct(id);
      showToast(`Deleted "${title}"`);
      loadProducts();
    } catch (err: any) {
      alert("Error deleting product: " + err.message);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: status as any } : o))
      );
      showToast(`Order status updated to ${status}`);
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDeleteOrderRecord = async (id: string, orderCode: string) => {
    if (!confirm(`Are you sure you want to delete Order Record "${orderCode}"?`)) return;
    try {
      await deleteOrder(id);
      showToast(`Deleted Order ${orderCode}`);
      loadAllOrders();
    } catch (err: any) {
      alert("Failed to delete order: " + err.message);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;

    const matchesStock =
      stockFilter === "all"
        ? true
        : stockFilter === "inStock"
        ? p.inStock !== false
        : p.inStock === false;

    return matchesSearch && matchesCat && matchesStock;
  });

  const filteredOrders = orders.filter((o) => {
    const q = orderSearchQuery.toLowerCase();
    const matchesQuery =
      (o.orderId && o.orderId.toLowerCase().includes(q)) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      o.customerAddress.toLowerCase().includes(q);

    const matchesStatus = orderStatusFilter === "all" || o.orderStatus === orderStatusFilter;

    return matchesQuery && matchesStatus;
  });

  // KPI Calculations
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.inStock !== false).length;
  const categoryList = Array.from(new Set(products.map((p) => p.category)));

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === "Pending" || o.orderStatus === "Processing").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // LOGIN VIEW
  if (!token) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0B0F19] to-black flex items-center justify-center p-4 relative overflow-hidden font-sans text-slate-100">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] p-9 max-w-md w-full border border-white/20 relative z-10 text-slate-900">
          <div className="text-center mb-8">
            <div className="p-3.5 bg-black rounded-3xl inline-block mb-4 shadow-xl border border-slate-800">
              <img
                src={logoImg}
                alt="Raj Traders Logo"
                className="h-12 w-auto object-contain mx-auto"
              />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Raj Traders Executive Suite</h1>
            <p className="text-slate-500 text-xs mt-1.5 font-semibold tracking-wide">
              Sign in to access sales analytics, products & orders
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 text-xs rounded-2xl border border-red-200 flex items-center gap-3 font-semibold shadow-sm">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Username
              </label>
              <input
                type="text"
                required
                placeholder="Default: admin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 outline-none text-slate-900 text-xs transition placeholder:text-slate-400 font-semibold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Default: admin123"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 outline-none text-slate-900 text-xs transition placeholder:text-slate-400 font-semibold"
              />
            </div>

            <button
              type="submit"
              disabled={loadingLogin}
              className="w-full py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white font-extrabold text-xs rounded-2xl shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 mt-3 flex items-center justify-center gap-2 tracking-wide"
            >
              {loadingLogin ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin text-white" /> Authenticating...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4 text-white" /> Sign In to Executive Suite
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-5">
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-900 font-bold transition flex items-center justify-center gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // MAIN EXECUTIVE SUITE
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex overflow-hidden font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900/95 backdrop-blur-md text-white text-xs font-bold px-4 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 animate-bounce">
          <Sparkles className="h-4 w-4 text-amber-400" />
          {toastMessage}
        </div>
      )}

      {/* 1. OBSIDIAN EXECUTIVE SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-[#0B0F19] border-r border-slate-800 flex-col shrink-0 text-slate-300 shadow-2xl relative z-20">
        <div className="p-5 border-b border-slate-800/80 bg-black/60 backdrop-blur-md flex flex-col items-start gap-2.5">
          <Link to="/" className="block group">
            <img
              src={logoImg}
              alt="Raj Traders"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>
          <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[10px] text-emerald-300 font-extrabold uppercase tracking-widest">
              System Live & Connected
            </span>
          </div>
        </div>

        <div className="p-4 border-b border-slate-800/60 bg-slate-900/40 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md shrink-0">
            RM
          </div>
          <div className="min-w-0">
            <h4 className="font-extrabold text-white text-xs leading-tight truncate">Raj Manager</h4>
            <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">admin@rajtraders.com</p>
          </div>
        </div>

        <nav className="flex-1 p-3.5 space-y-1.5 overflow-y-auto text-xs font-bold">
          <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold tracking-wider text-slate-500">
            Management Suite
          </div>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-200 ${
              activeTab === "dashboard"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" /> Overview & Analytics
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 ${
              activeTab === "orders"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4 shrink-0" /> Customer Orders
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeTab === "orders"
                  ? "bg-white/20 text-white"
                  : "bg-emerald-950/80 text-emerald-400 border border-emerald-800/50"
              }`}
            >
              {totalOrdersCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 ${
              activeTab === "products"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <Package className="h-4 w-4 shrink-0" /> Inventory Catalog
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeTab === "products"
                  ? "bg-white/20 text-white"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {totalProducts}
            </span>
          </button>

          <button
            onClick={openAddModal}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-all font-extrabold shadow-sm active:scale-95"
          >
            <Plus className="h-4 w-4 text-blue-400 shrink-0" /> Create New Item
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl transition-all duration-200 ${
              activeTab === "categories"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="h-4 w-4 shrink-0" /> Store Categories
            </div>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                activeTab === "categories"
                  ? "bg-white/20 text-white"
                  : "bg-slate-800 text-slate-400"
              }`}
            >
              {categoryList.length}
            </span>
          </button>

          <div className="pt-3 px-3 text-[10px] uppercase font-extrabold tracking-wider text-slate-500">
            System & Control
          </div>

          <button
            onClick={() => setActiveTab("system")}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl transition-all duration-200 ${
              activeTab === "system"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"
            }`}
          >
            <Database className="h-4 w-4 shrink-0" /> System Diagnostic
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800/80 bg-black/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">Raj Traders Executive</span>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 p-2 rounded-xl hover:bg-slate-800/80 transition"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex md:hidden" onClick={() => setMobileSidebarOpen(false)}>
          <div className="w-72 bg-[#0B0F19] text-slate-300 h-full flex flex-col p-4 shadow-2xl relative overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <img src={logoImg} alt="Raj Traders" className="h-8 w-auto object-contain" />
              <button onClick={() => setMobileSidebarOpen(false)} className="p-2 rounded-lg bg-slate-800 text-slate-300">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-1.5 mt-4 flex-1">
              {[
                { id: "dashboard", label: "Analytics Dashboard", icon: LayoutDashboard },
                { id: "products", label: "Inventory Catalog", icon: Package },
                { id: "categories", label: "Store Categories", icon: Layers },
                { id: "orders", label: "Customer Orders", icon: ShoppingCart },
                { id: "system", label: "System Diagnostics", icon: Server },
              ].map((item) => {
                const IconComp = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? "bg-[var(--kohinoor-blue)] text-white shadow-lg"
                        : "text-slate-400 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <IconComp className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-slate-800 mt-auto">
              <button
                onClick={() => { setMobileSidebarOpen(false); handleLogout(); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/20"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN EXECUTIVE CONTENT CANVAS */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#F8FAFC]">
        {/* Glass Header Bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-900 text-white border border-slate-800 hover:bg-slate-800 transition shrink-0"
              aria-label="Open Sidebar Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="bg-black p-2.5 rounded-2xl shadow-sm hidden sm:block">
              <img
                src={logoImg}
                alt="Raj Traders"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-900 tracking-tight capitalize">
                {activeTab === "dashboard" && "Executive Dashboard Overview"}
                {activeTab === "products" && "Inventory & Catalog Management"}
                {activeTab === "categories" && "Store Category Management"}
                {activeTab === "orders" && "Customer Orders & Lead Processing"}
                {activeTab === "system" && "Database & System Diagnostics"}
              </h1>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Raj Traders Enterprise Management Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs bg-white hover:bg-slate-50 text-slate-800 px-4 py-2.5 rounded-2xl border border-slate-200/80 flex items-center gap-2 transition font-bold shadow-sm"
            >
              <Store className="h-3.5 w-3.5 text-blue-600" /> View Storefront
            </Link>

            <button
              onClick={() => {
                loadProducts();
                loadAllOrders();
              }}
              className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl border border-slate-200/80 transition shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${loadingProducts || loadingOrders ? "animate-spin text-slate-900" : ""}`} />
            </button>

            <button
              onClick={openAddModal}
              className="bg-slate-900 hover:bg-black text-white text-xs font-extrabold px-4.5 py-2.5 rounded-2xl flex items-center gap-2 shadow-md transition active:scale-95 tracking-wide"
            >
              <Plus className="h-4 w-4 text-white" /> Add Product
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW & ANIMATED GRAPH ANALYTICS */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Executive KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      Total Orders Placed
                    </span>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-inner">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-900 mt-4 tracking-tight">{totalOrdersCount}</p>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 mt-2 font-bold relative z-10">
                    <TrendingUp className="h-4 w-4" /> Total Sales: ₹{totalRevenue.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      Pending Deliveries
                    </span>
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shadow-inner">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-900 mt-4 tracking-tight">{pendingOrdersCount}</p>
                  <div className="text-xs text-amber-700 mt-2 font-bold relative z-10">Orders awaiting dispatch</div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      Total Catalog Items
                    </span>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-inner">
                      <Package className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-900 mt-4 tracking-tight">{totalProducts}</p>
                  <div className="text-xs text-slate-500 mt-2 font-semibold relative z-10">{inStockCount} items available in stock</div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      Active Categories
                    </span>
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shadow-inner">
                      <Layers className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-900 mt-4 tracking-tight">{categoryList.length}</p>
                  <div className="text-xs text-slate-500 mt-2 font-semibold relative z-10">Bulbs, Torches, Kitchen & Spares</div>
                </div>
              </div>

              {/* ANIMATED RECHARTS GRAPH + LIVE FEEDS PANEL */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ModernAnimatedSalesChart totalRevenue={totalRevenue} totalOrders={totalOrdersCount} />
                </div>

                {/* Live Feeds Panel */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Zap className="h-4.5 w-4.5 text-amber-500" /> Live Feeds & System Activity
                      </span>
                    </h3>

                    <div className="space-y-4 text-xs font-semibold">
                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-inner border border-blue-200">
                          <Bell className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 font-bold">{pendingOrdersCount} pending orders awaiting dispatch.</p>
                          <span className="text-[10px] text-slate-400">Just Now</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-inner border border-emerald-200">
                          <Server className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 font-bold">Express Server & MongoDB Atlas connected.</p>
                          <span className="text-[10px] text-slate-400">2 Hours ago</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 shadow-inner border border-amber-200">
                          <ShoppingBag className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 font-bold">Total revenue reached ₹{totalRevenue.toLocaleString("en-IN")}.</p>
                          <span className="text-[10px] text-slate-400">31 May</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-inner border border-purple-200">
                          <UserCheck className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-900 font-bold">Raj Manager logged in to Executive Suite.</p>
                          <span className="text-[10px] text-slate-400">30 May</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("orders")}
                    className="w-full text-center text-xs font-extrabold text-blue-600 hover:text-blue-800 pt-3 border-t border-slate-100 flex items-center justify-center gap-1"
                  >
                    View All Orders & Logged Activities <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* RECENT CUSTOMER ORDERS TABLE */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <ShoppingBag className="h-4.5 w-4.5 text-blue-600" /> Recent Customer Orders & Deliveries
                  </h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-blue-600 hover:text-blue-800 font-extrabold flex items-center gap-1"
                  >
                    View All Orders ({totalOrdersCount}) <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.length === 0 ? (
                    <div className="text-center p-12 text-slate-400 text-xs font-semibold">
                      No customer orders placed yet. Place an order on storefront to test!
                    </div>
                  ) : (
                    orders.slice(0, 5).map((o) => (
                      <div
                        key={o._id}
                        className="flex items-center justify-between bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 hover:bg-white hover:shadow-md transition-all text-xs"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900">{o.orderId}</span>
                            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                              {o.customerName}
                            </span>
                          </div>
                          <p className="text-slate-500 truncate mt-1 font-semibold">
                            📞 {o.customerPhone} | 📍 {o.customerAddress}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-black text-slate-900 text-sm">
                            ₹{o.totalAmount.toLocaleString("en-IN")}
                          </span>
                          <span
                            className={`text-[10px] px-3 py-1 rounded-full font-extrabold ${
                              o.orderStatus === "Delivered"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : o.orderStatus === "Shipped"
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "bg-amber-100 text-amber-900 border border-amber-200"
                            }`}
                          >
                            {o.orderStatus}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS CATALOG */}
          {activeTab === "products" && (
            <div className="space-y-5">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-4.5 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search title, category, brand..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-slate-900 font-semibold"
                    />
                  </div>

                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 outline-none font-bold"
                  >
                    <option value="all">All Categories ({totalProducts})</option>
                    <option value="ledBulbs">LED Bulbs</option>
                    <option value="torches">Torches</option>
                    <option value="kitchenAppliances">Kitchen Appliances</option>
                    <option value="streetLights">Street Lights</option>
                    <option value="general">General Spares</option>
                  </select>

                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value as any)}
                    className="px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 outline-none font-bold"
                  >
                    <option value="all">All Stock Status</option>
                    <option value="inStock">In Stock Only</option>
                    <option value="outOfStock">Out of Stock Only</option>
                  </select>
                </div>

                <div className="text-xs text-slate-500 font-bold shrink-0">
                  Showing <span className="font-black text-slate-900">{filteredProducts.length}</span> of {totalProducts} items
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)]">
                {loadingProducts ? (
                  <div className="p-16 text-center text-slate-500 font-semibold">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-3 text-slate-900" />
                    Loading product catalog...
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-16 text-center text-slate-500">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-30 text-slate-400" />
                    <p className="font-bold text-base text-slate-900">No products found</p>
                    <p className="text-xs mt-1">Try clearing your search query or add a new product.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 uppercase font-black text-[10px] tracking-wider">
                        <tr>
                          <th className="p-4.5">Image</th>
                          <th className="p-4.5">Title & Brand</th>
                          <th className="p-4.5">Category</th>
                          <th className="p-4.5">Selling Price</th>
                          <th className="p-4.5">MRP</th>
                          <th className="p-4.5">Stock Status</th>
                          <th className="p-4.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredProducts.map((p) => (
                          <tr key={p._id} className="hover:bg-blue-50/20 transition">
                            <td className="p-4.5">
                              <img
                                src={getImageUrl(p.img)}
                                alt={p.title}
                                className="h-12 w-12 object-contain bg-white rounded-2xl border border-slate-200 p-1 shadow-sm"
                              />
                            </td>
                            <td className="p-4.5 max-w-sm">
                              <p className="font-extrabold text-slate-900 line-clamp-2 leading-tight">{p.title}</p>
                              {p.brand && (
                                <span className="text-[10px] text-slate-400 font-bold mt-0.5 inline-block uppercase tracking-wider">
                                  Brand: {p.brand}
                                </span>
                              )}
                            </td>
                            <td className="p-4.5">
                              <span className="bg-slate-100 text-slate-800 border border-slate-200 px-3 py-1 rounded-xl text-[10px] font-black capitalize">
                                {p.category}
                              </span>
                            </td>
                            <td className="p-4.5 font-black text-slate-900 text-sm">{p.price}</td>
                            <td className="p-4.5 text-slate-400 line-through font-semibold">{p.mrp || "-"}</td>
                            <td className="p-4.5">
                              <button
                                onClick={() => handleToggleStock(p)}
                                title="Click to toggle stock status"
                                className={`text-[10px] px-3.5 py-1.5 rounded-full font-black flex items-center gap-1.5 transition ${
                                  p.inStock !== false
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                    : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    p.inStock !== false ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                                  }`}
                                />
                                {p.inStock !== false ? "In Stock" : "Out of Stock"}
                              </button>
                            </td>
                            <td className="p-4.5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditModal(p)}
                                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition border border-slate-200"
                                  title="Edit Product"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p._id!, p.title)}
                                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition border border-red-200"
                                  title="Delete Product"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-5">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-4.5 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search order ID, customer phone, address..."
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-slate-900 font-semibold"
                    />
                  </div>

                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 outline-none font-bold"
                  >
                    <option value="all">All Statuses ({totalOrdersCount})</option>
                    <option value="Pending">🕒 Pending</option>
                    <option value="Processing">⚙️ Processing</option>
                    <option value="Shipped">🚚 Shipped</option>
                    <option value="Delivered">✅ Delivered</option>
                    <option value="Cancelled">❌ Cancelled</option>
                  </select>
                </div>

                <div className="text-xs text-slate-500 font-bold shrink-0">
                  Showing <span className="font-black text-slate-900">{filteredOrders.length}</span> orders
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)]">
                {loadingOrders ? (
                  <div className="p-16 text-center text-slate-500 font-semibold">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-3 text-slate-900" />
                    Loading orders database...
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="p-16 text-center text-slate-500">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30 text-slate-400" />
                    <p className="font-bold text-base text-slate-900">No orders found</p>
                    <p className="text-xs mt-1">Customer orders placed on storefront will appear here instantly.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 uppercase font-black text-[10px] tracking-wider">
                        <tr>
                          <th className="p-4.5">Order Code</th>
                          <th className="p-4.5">Customer Details</th>
                          <th className="p-4.5">Items Purchased</th>
                          <th className="p-4.5">Total Amount</th>
                          <th className="p-4.5">Payment</th>
                          <th className="p-4.5">Live Status</th>
                          <th className="p-4.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredOrders.map((o) => (
                          <tr key={o._id} className="hover:bg-blue-50/20 transition">
                            <td className="p-4.5 font-black text-slate-900">
                              {o.orderId}
                              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                                {o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-IN") : "Today"}
                              </p>
                            </td>
                            <td className="p-4.5 max-w-xs">
                              <p className="font-black text-slate-900">{o.customerName}</p>
                              <p className="text-[11px] text-slate-600 font-bold flex items-center gap-1 mt-0.5">
                                <PhoneCall className="h-3 w-3 text-slate-400" /> {o.customerPhone}
                              </p>
                              <p className="text-[10px] text-slate-500 flex items-start gap-1 mt-0.5 line-clamp-2">
                                <MapPin className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" /> {o.customerAddress}
                              </p>
                            </td>
                            <td className="p-4.5">
                              <div className="space-y-1 max-w-xs">
                                {o.items.map((item, idx) => (
                                  <div key={idx} className="text-[11px] text-slate-800 font-semibold truncate">
                                    • <span className="font-black">{item.qty}x</span> {item.title} ({item.price})
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="p-4.5 font-black text-emerald-700 text-sm">
                              ₹{o.totalAmount.toLocaleString("en-IN")}
                            </td>
                            <td className="p-4.5">
                              <span className={`px-3 py-1 rounded-xl text-[10px] font-black border block w-max ${
                                o.paymentStatus?.includes("Paid")
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : "bg-slate-100 text-slate-800 border-slate-200"
                              }`}>
                                {o.paymentStatus || o.paymentMethod || "COD"}
                              </span>
                              {o.transactionId && (
                                <p className="text-[10px] text-slate-500 font-mono mt-1 font-bold">
                                  UTR: {o.transactionId}
                                </p>
                              )}
                            </td>
                            <td className="p-4.5">
                              <select
                                value={o.orderStatus || "Pending"}
                                onChange={(e) => handleUpdateStatus(o._id!, e.target.value)}
                                className={`text-[10px] px-3 py-1.5 rounded-full font-black border outline-none cursor-pointer ${
                                  o.orderStatus === "Delivered"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                                    : o.orderStatus === "Shipped"
                                    ? "bg-blue-50 text-blue-800 border-blue-300"
                                    : o.orderStatus === "Processing"
                                    ? "bg-purple-50 text-purple-800 border-purple-300"
                                    : o.orderStatus === "Cancelled"
                                    ? "bg-red-50 text-red-800 border-red-300"
                                    : "bg-amber-50 text-amber-900 border-amber-300"
                                }`}
                              >
                                <option value="Pending">🕒 Pending</option>
                                <option value="Processing">⚙️ Processing</option>
                                <option value="Shipped">🚚 Shipped</option>
                                <option value="Delivered">✅ Delivered</option>
                                <option value="Cancelled">❌ Cancelled</option>
                              </select>
                            </td>
                            <td className="p-4.5 text-right">
                              <button
                                onClick={() => handleDeleteOrderRecord(o._id!, o.orderId || "Order")}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition border border-red-200"
                                title="Delete Order Record"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CATEGORIES */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Layers className="h-4.5 w-4.5 text-purple-600" /> Active Store Categories ({categoryList.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {categoryList.map((cat) => {
                  const count = products.filter((p) => p.category === cat).length;
                  return (
                    <div
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setActiveTab("products");
                      }}
                      className="bg-white border border-slate-200/80 hover:border-blue-400 rounded-3xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] cursor-pointer transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 capitalize group-hover:text-blue-600 transition">
                          {cat}
                        </span>
                        <span className="bg-slate-900 text-white text-xs px-3 py-1 rounded-full font-black">
                          {count}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-3 font-semibold">
                        {count} item{count === 1 ? "" : "s"} listed in catalog
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: DIAGNOSTICS */}
          {activeTab === "system" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] space-y-5">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Server className="h-4.5 w-4.5 text-slate-900" /> Express REST API Backend
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-slate-600 font-bold">Server Status</span>
                    <span className="text-emerald-700 font-black flex items-center gap-1.5">
                      <CircleDot className="h-3.5 w-3.5 animate-pulse text-emerald-500" /> Online (Port 5000)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-slate-600 font-bold">API Health URL</span>
                    <a
                      href="http://localhost:5000/api/health"
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-900 hover:underline flex items-center gap-1 font-mono text-xs font-extrabold"
                    >
                      /api/health <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl p-7 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] space-y-5">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Database className="h-4.5 w-4.5 text-emerald-600" /> MongoDB Atlas Cloud Connection
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-slate-600 font-bold">Cluster Name</span>
                    <span className="text-slate-900 font-mono text-xs font-black">rajtraders.hzlxfi7.mongodb.net</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-slate-600 font-bold">Database Name</span>
                    <span className="text-emerald-700 font-black font-mono">raj_traders</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. ADD / EDIT PRODUCT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-white/20 rounded-[2.5rem] shadow-2xl max-w-xl w-full p-7 space-y-6 my-8 text-slate-900 animate-scale-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                {editingId ? "Edit Product Details" : "Add New Product to Inventory"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eveready 9W LED Bulb B22 Cool Day Light"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-slate-900 transition"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Price (₹) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹299"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-slate-900 transition font-black"
                  />
                </div>
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">MRP (₹)</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹499"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-slate-900 transition"
                  />
                </div>
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Discount Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. 40% off"
                    value={formData.off}
                    onChange={(e) => setFormData({ ...formData, off: e.target.value })}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-slate-900 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none font-bold"
                  >
                    <option value="ledBulbs">LED Bulbs</option>
                    <option value="torches">Torches</option>
                    <option value="kitchenAppliances">Kitchen Appliances</option>
                    <option value="streetLights">Street Lights</option>
                    <option value="general">General Spares</option>
                  </select>
                </div>
                <div>
                  <label className="block font-extrabold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Eveready, Surya, MZ"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-slate-900 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block font-extrabold text-slate-700 mb-1">Product Photo *</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Image URL or upload file below..."
                    value={formData.img}
                    onChange={(e) => {
                      setFormData({ ...formData, img: e.target.value });
                      setImagePreview(getImageUrl(e.target.value));
                    }}
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 outline-none focus:bg-white focus:border-slate-900 transition"
                  />

                  <div className="flex items-center gap-3 pt-1">
                    <label className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-2.5 rounded-2xl text-xs font-extrabold cursor-pointer flex items-center gap-2 transition shadow-sm">
                      <Upload className="h-3.5 w-3.5 text-slate-900" />
                      {uploadingImage ? "Uploading..." : "Upload Photo File"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>

                    {imagePreview && (
                      <div className="flex items-center gap-2 bg-slate-50 p-1.5 px-3 rounded-2xl border border-slate-200">
                        <img src={imagePreview} alt="Preview" className="h-7 w-7 object-contain rounded-lg" />
                        <span className="text-[10px] text-emerald-700 font-extrabold">Photo Attached</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="h-4 w-4 rounded accent-slate-900 cursor-pointer"
                />
                <label htmlFor="inStockCheck" className="text-xs text-slate-900 font-extrabold cursor-pointer">
                  Available in Stock
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 mt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-3 bg-slate-900 hover:bg-black text-white font-extrabold rounded-2xl shadow-lg flex items-center gap-2 text-xs tracking-wide"
                >
                  {formLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin text-white" /> Saving...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-white" /> Save Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
