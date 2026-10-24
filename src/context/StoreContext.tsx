import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  ProductColor,
  CartItem,
  Currency,
  ActivePage,
  ProductCategory,
  OrderDetails,
  OrderStatus,
  AdminAccount,
} from '../types';
import { PRODUCTS, CURRENCIES } from '../data/products';
import { INITIAL_SEED_ORDERS } from '../data/seedOrders';

interface StoreContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, colorName: string) => void;
  updateQuantity: (productId: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;

  // Orders Management
  orders: OrderDetails[];
  createOrder: (order: OrderDetails) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  seedSampleOrders: () => void;
  lastOrder: OrderDetails | null;

  // Admin Single-Slot Authentication
  adminAccount: AdminAccount | null;
  isAdminLoggedIn: boolean;
  isSingleSlotClaimed: boolean;
  registerMasterAdmin: (
    name: string,
    email: string,
    username: string,
    password: string
  ) => { success: boolean; error?: string };
  loginAdmin: (
    identifier: string,
    password: string
  ) => { success: boolean; error?: string };
  logoutAdmin: () => void;

  // Feedback Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('alishba_cart') || localStorage.getItem('verquelle_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('alishba_wishlist') || localStorage.getItem('verquelle_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Currency
  const [currency, setCurrency] = useState<Currency>('USD');

  // Orders: Initialize from localStorage or fallback to realistic initial seed orders
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('alishba_orders') || localStorage.getItem('verquelle_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize older orders if status missing
          return parsed.map((item: any) => ({
            ...item,
            status: item.status || 'Pending',
          }));
        }
      }
      return INITIAL_SEED_ORDERS;
    } catch {
      return INITIAL_SEED_ORDERS;
    }
  });
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Admin Single-Slot Account
  const [adminAccount, setAdminAccount] = useState<AdminAccount | null>(() => {
    try {
      const saved = localStorage.getItem('alishba_admin_account');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      const hasAccount = !!localStorage.getItem('alishba_admin_account');
      const session = sessionStorage.getItem('alishba_admin_session');
      return hasAccount && session === 'active';
    } catch {
      return false;
    }
  });

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('alishba_cart', JSON.stringify(cart));
      localStorage.setItem('verquelle_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('alishba_wishlist', JSON.stringify(wishlist));
      localStorage.setItem('verquelle_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Persist orders
  useEffect(() => {
    try {
      localStorage.setItem('alishba_orders', JSON.stringify(orders));
      localStorage.setItem('verquelle_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const selectedProduct = selectedProductId
    ? PRODUCTS.find((p) => p.id === selectedProductId) || null
    : null;

  const openProductDetail = (product: Product) => {
    setSelectedProductId(product.id);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductDetail = () => {
    setSelectedProductId(null);
  };

  const addToCart = (product: Product, color: ProductColor, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, selectedColor: color, quantity }];
      }
    });

    showToast(`Added "${product.name}" (${color.name}) to shopping bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, colorName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor.name === colorName)
      )
    );
  };

  const updateQuantity = (productId: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedColor.name === colorName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const toggleWishlist = (productId: string) => {
    const isSaved = wishlist.includes(productId);
    const product = PRODUCTS.find((p) => p.id === productId);
    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast(`Removed from wishlist`);
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast(`Saved ${product ? `"${product.name}"` : 'item'} to wishlist`);
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const formatPrice = (usdAmount: number): string => {
    const config = CURRENCIES[currency];
    return config.format(usdAmount);
  };

  // Orders Actions
  const createOrder = (order: OrderDetails) => {
    setOrders((prev) => [order, ...prev]);
    setLastOrder(order);
    clearCart();
    setActivePage('checkout');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.orderId === orderId ? { ...o, status } : o));
      try {
        localStorage.setItem('alishba_orders', JSON.stringify(next));
        localStorage.setItem('verquelle_orders', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(`Order #${orderId} marked as ${status}`);
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => {
      const next = prev.filter((o) => o.orderId !== orderId);
      try {
        localStorage.setItem('alishba_orders', JSON.stringify(next));
        localStorage.setItem('verquelle_orders', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast(`Order #${orderId} removed`);
  };

  const seedSampleOrders = () => {
    setOrders(INITIAL_SEED_ORDERS);
    try {
      localStorage.setItem('alishba_orders', JSON.stringify(INITIAL_SEED_ORDERS));
      localStorage.setItem('verquelle_orders', JSON.stringify(INITIAL_SEED_ORDERS));
    } catch {}
    showToast('Atelier sample orders refreshed');
  };

  // Admin Single-Slot Management
  const isSingleSlotClaimed = adminAccount !== null;

  const registerMasterAdmin = (
    name: string,
    email: string,
    username: string,
    password: string
  ): { success: boolean; error?: string } => {
    // Strictly verify if slot is already occupied
    const existing = localStorage.getItem('alishba_admin_account');
    if (existing || adminAccount) {
      return {
        success: false,
        error: 'The single master administrator slot has already been claimed. Public registration is permanently closed.',
      };
    }

    if (!name.trim() || !email.trim() || !username.trim() || !password) {
      return { success: false, error: 'All fields are required to register your admin account.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim().toLowerCase();

    const newAccount: AdminAccount = {
      name: name.trim(),
      email: cleanEmail,
      username: cleanUsername,
      passwordHash: btoa(password),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      lastLoginAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      role: 'Super Admin',
    };

    try {
      localStorage.setItem('alishba_admin_account', JSON.stringify(newAccount));
      sessionStorage.setItem('alishba_admin_session', 'active');
      setAdminAccount(newAccount);
      setIsAdminLoggedIn(true);
      showToast(`Master Admin account established. Welcome, ${newAccount.name}.`);
      return { success: true };
    } catch {
      return { success: false, error: 'Unable to save credentials to local storage.' };
    }
  };

  const loginAdmin = (
    identifier: string,
    password: string
  ): { success: boolean; error?: string } => {
    try {
      const saved = localStorage.getItem('alishba_admin_account');
      if (!saved) {
        return {
          success: false,
          error: 'No admin account found. Please register using the available single slot.',
        };
      }

      const account: AdminAccount = JSON.parse(saved);
      const cleanId = identifier.trim().toLowerCase();

      const matchId =
        account.email.toLowerCase() === cleanId ||
        account.username.toLowerCase() === cleanId;

      if (!matchId || account.passwordHash !== btoa(password)) {
        return { success: false, error: 'Invalid admin credentials. Please verify your email/username and password.' };
      }

      const updated: AdminAccount = {
        ...account,
        lastLoginAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      localStorage.setItem('alishba_admin_account', JSON.stringify(updated));
      sessionStorage.setItem('alishba_admin_session', 'active');
      setAdminAccount(updated);
      setIsAdminLoggedIn(true);
      showToast(`Welcome back, ${account.name}`);
      return { success: true };
    } catch {
      return { success: false, error: 'Authentication processing error.' };
    }
  };

  const logoutAdmin = () => {
    try {
      sessionStorage.removeItem('alishba_admin_session');
    } catch {}
    setIsAdminLoggedIn(false);
    showToast('Admin session logged out safely.');
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage: (p) => {
          setActivePage(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        currency,
        setCurrency,
        formatPrice,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        seedSampleOrders,
        lastOrder,
        adminAccount,
        isAdminLoggedIn,
        isSingleSlotClaimed,
        registerMasterAdmin,
        loginAdmin,
        logoutAdmin,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
