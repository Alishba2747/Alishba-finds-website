export type ProductCategory =
  | 'all'
  | 'handbags'
  | 'shoulder-bags'
  | 'crossbody-bags'
  | 'tote-bags'
  | 'backpacks'
  | 'wallets';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  categoryLabel: string;
  image: string;
  fallbackImage?: string;
  gallery: string[];
  badge?: 'Bestseller' | 'New Arrival' | 'Atelier Edition' | 'Limited Run';
  description: string;
  longDescription: string;
  materials: string;
  dimensions: string;
  hardware: string;
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: ProductColor;
  quantity: number;
}

export type Currency = 'USD' | 'EUR' | 'PKR' | 'GBP';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to USD 1.00
  format: (amount: number) => string;
}

export type ActivePage =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'about'
  | 'contact'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'privacy'
  | 'shipping'
  | 'terms'
  | 'admin';

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface AdminAccount {
  name: string;
  email: string;
  username: string;
  passwordHash: string;
  createdAt: string;
  lastLoginAt?: string;
  role: 'Super Admin';
}

export interface OrderDetails {
  orderId: string;
  date: string;
  timestamp?: number;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: Currency;
  shippingMethod: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'cod' | 'card' | 'bank_transfer';
  status: OrderStatus;
  notes?: string;
}
