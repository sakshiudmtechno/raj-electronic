const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || API_BASE_URL.replace(/\/api\/?$/, "");

export type ProductItem = {
  _id?: string;
  title: string;
  price: string;
  mrp: string;
  off: string;
  img: string;
  category: string;
  brand?: string;
  description?: string;
  inStock?: boolean;
  isFeatured?: boolean;
};

// Get stored admin auth token
export const getAdminToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("raj_admin_token");
};

// Save admin token
export const setAdminToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("raj_admin_token", token);
  }
};

// Remove admin token
export const removeAdminToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("raj_admin_token");
  }
};

// Helper for formatted image URLs (prepending backend server host if relative path)
export const getImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("/uploads")) {
    return `${BACKEND_BASE_URL}${url}`;
  }
  return url;
};

// Safe fetch wrapper that handles network errors & non-JSON responses cleanly
async function safeFetchJson<T = any>(
  url: string,
  options?: RequestInit
): Promise<{ ok: boolean; status: number; data: T }> {
  let res: Response;
  try {
    res = await fetch(url, options);
  } catch (error: any) {
    throw new Error(
      "Cannot connect to backend server. Please ensure the backend server is running on port 5000."
    );
  }

  const text = await res.text();
  let data: any = {};
  if (text.trim()) {
    try {
      data = JSON.parse(text);
    } catch {
      if (!res.ok) {
        throw new Error(
          `Server returned error status ${res.status}: ${res.statusText || "Unknown error"}`
        );
      }
      throw new Error(
        "Received non-JSON response from server. Please verify backend API service."
      );
    }
  }

  return { ok: res.ok, status: res.status, data };
}

// 1. Fetch all products (supports category or search filter)
export const fetchProducts = async (category?: string, search?: string): Promise<ProductItem[]> => {
  try {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (search) params.append("search", search);

    const { ok, data } = await safeFetchJson<ProductItem[]>(`${API_BASE_URL}/products?${params.toString()}`);
    if (!ok) throw new Error("Failed to fetch products");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("API Fetch Products Error:", error);
    return [];
  }
};

// 2. Admin Login
export const adminLogin = async (username: string, password: string) => {
  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!ok) throw new Error(data.message || "Invalid username or password");
  setAdminToken(data.token);
  return data;
};

// 3. Upload Image to Express Backend
export const uploadProductImage = async (file: File): Promise<string> => {
  const token = getAdminToken();
  const formData = new FormData();
  formData.append("image", file);

  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/products/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!ok) throw new Error(data.message || "Image upload failed");
  return data.imageUrl;
};

// 4. Create Product (Admin Only)
export const createProduct = async (productData: Partial<ProductItem>): Promise<ProductItem> => {
  const token = getAdminToken();
  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!ok) throw new Error(data.message || "Failed to create product");
  return data;
};

// 5. Update Product (Admin Only)
export const updateProduct = async (id: string, productData: Partial<ProductItem>): Promise<ProductItem> => {
  const token = getAdminToken();
  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  if (!ok) throw new Error(data.message || "Failed to update product");
  return data;
};

// 6. Delete Product (Admin Only)
export const deleteProduct = async (id: string): Promise<void> => {
  const token = getAdminToken();
  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!ok) {
    throw new Error(data.message || "Failed to delete product");
  }
};

// 7. ORDER APIS
export type OrderItem = {
  _id?: string;
  orderId?: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  city?: string;
  pincode?: string;
  items: Array<{
    title: string;
    price: string;
    qty: number;
    img?: string;
  }>;
  totalAmount: number;
  paymentMethod?: string;
  paymentStatus?: string;
  transactionId?: string;
  orderStatus?: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt?: string;
};

// Create new customer order (Public Checkout)
export const createOrder = async (orderData: Partial<OrderItem>): Promise<OrderItem> => {
  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });

  if (!ok) throw new Error(data.message || "Failed to place order");
  return data.order;
};

// Fetch all orders (Admin Panel)
export const fetchOrders = async (): Promise<OrderItem[]> => {
  try {
    const { ok, data } = await safeFetchJson<OrderItem[]>(`${API_BASE_URL}/orders`);
    if (!ok) throw new Error("Failed to fetch orders");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return [];
  }
};

// Update order status (Admin Panel)
export const updateOrderStatus = async (id: string, orderStatus: string): Promise<OrderItem> => {
  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/orders/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderStatus }),
  });

  if (!ok) throw new Error(data.message || "Failed to update order status");
  return data;
};

// Delete order record (Admin Panel)
export const deleteOrder = async (id: string): Promise<void> => {
  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/orders/${id}`, {
    method: "DELETE",
  });
  if (!ok) {
    throw new Error(data.message || "Failed to delete order");
  }
};

// Track Order by ID or Mobile Number
export const trackOrder = async (query: string): Promise<OrderItem[]> => {
  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/orders/track/${encodeURIComponent(query)}`);
  if (!ok) throw new Error(data.message || "No orders found for this search.");
  return data;
};

// Submit product rating & review
export const submitReview = async (
  productId: string,
  reviewData: { customerName: string; rating: number; comment: string }
): Promise<ProductItem> => {
  const { ok, data } = await safeFetchJson(`${API_BASE_URL}/products/${productId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });

  if (!ok) throw new Error(data.message || "Failed to submit review");
  return data.product;
};


