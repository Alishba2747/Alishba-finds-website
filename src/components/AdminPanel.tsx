import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Lock,
  User,
  Mail,
  KeyRound,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  Search,
  Download,
  Eye,
  Trash2,
  LogOut,
  ArrowLeft,
  FileText,
  PhoneCall,
  MapPin,
  RotateCcw,
  DollarSign,
  ShoppingBag,
  Printer,
  ChevronRight,
  X,
  ExternalLink,
} from 'lucide-react';
import { OrderDetails, OrderStatus } from '../types';
import { SafeImage } from './SafeImage';

export const AdminPanel: React.FC = () => {
  const {
    activePage,
    setActivePage,
    orders,
    updateOrderStatus,
    deleteOrder,
    seedSampleOrders,
    adminAccount,
    isAdminLoggedIn,
    isSingleSlotClaimed,
    registerMasterAdmin,
    loginAdmin,
    logoutAdmin,
    formatPrice,
  } = useStore();

  // Registration Form State (Single Slot)
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState<string | null>(null);

  // Login Form State
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [paymentFilter, setPaymentFilter] = useState<'All' | 'cod' | 'bank_transfer' | 'card'>('All');

  // Selected Order for Detail View Modal
  const [selectedOrder, setSelectedOrder] = useState<OrderDetails | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Handle Register (Single Slot Claim)
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please re-enter.');
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters long.');
      return;
    }

    const res = registerMasterAdmin(regName, regEmail, regUsername, regPassword);
    if (!res.success) {
      setRegError(res.error || 'Failed to claim admin slot.');
    }
  };

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const res = loginAdmin(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'Invalid credentials.');
    }
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status match
      if (statusFilter !== 'All' && order.status !== statusFilter) {
        return false;
      }
      // Payment match
      if (paymentFilter !== 'All' && order.paymentMethod !== paymentFilter) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesId = order.orderId.toLowerCase().includes(query);
        const matchesName = order.customer.fullName.toLowerCase().includes(query);
        const matchesEmail = order.customer.email.toLowerCase().includes(query);
        const matchesCity = order.customer.city.toLowerCase().includes(query);
        const matchesPhone = order.customer.phone.toLowerCase().includes(query);
        const matchesItem = order.items.some((it) =>
          it.product.name.toLowerCase().includes(query)
        );
        if (!matchesId && !matchesName && !matchesEmail && !matchesCity && !matchesPhone && !matchesItem) {
          return false;
        }
      }
      return true;
    });
  }, [orders, statusFilter, paymentFilter, searchQuery]);

  // Analytics Metrics
  const metrics = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
    const processingOrders = orders.filter((o) => o.status === 'Processing').length;
    const shippedOrders = orders.filter((o) => o.status === 'Shipped').length;
    const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
    const codOrders = orders.filter((o) => o.paymentMethod === 'cod').length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      codOrders,
      avgOrderValue,
    };
  }, [orders]);

  // CSV Export
  const handleExportCSV = () => {
    if (orders.length === 0) return;

    const headers = [
      'Order ID',
      'Date',
      'Status',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Delivery Address',
      'City',
      'Country',
      'Payment Method',
      'Shipping Method',
      'Subtotal',
      'Shipping',
      'Total',
      'Items Count',
      'Items Summary',
    ];

    const rows = filteredOrders.map((o) => {
      const itemsSummary = o.items
        .map((i) => `${i.product.name} (${i.selectedColor.name} x${i.quantity})`)
        .join('; ');

      return [
        `"${o.orderId}"`,
        `"${o.date}"`,
        `"${o.status}"`,
        `"${o.customer.fullName.replace(/"/g, '""')}"`,
        `"${o.customer.email}"`,
        `"${o.customer.phone}"`,
        `"${o.customer.address.replace(/"/g, '""')}"`,
        `"${o.customer.city}"`,
        `"${o.customer.country}"`,
        `"${o.paymentMethod.toUpperCase()}"`,
        `"${o.shippingMethod}"`,
        o.subtotal,
        o.shipping,
        o.total,
        o.items.reduce((s, it) => s + it.quantity, 0),
        `"${itemsSummary.replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `alishba_finds_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status Styling Badge Helper
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Pending
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
            <Package className="w-3 h-3 text-blue-600" />
            Processing
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200">
            <Truck className="w-3 h-3 text-purple-600" />
            Shipped
          </span>
        );
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-[#D8E6E4] text-[#355C4D] border border-[#748B83]/30 font-semibold">
            <CheckCircle2 className="w-3 h-3 text-[#355C4D]" />
            Delivered
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            Cancelled
          </span>
        );
    }
  };

  // ==========================================
  // VIEW 1: UNREGISTERED (SINGLE SLOT OPEN)
  // ==========================================
  if (!isSingleSlotClaimed) {
    return (
      <div className="min-h-screen bg-[#F6F6F5] text-[#272B29] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D8E6E4] text-[#355C4D] text-[11px] font-semibold uppercase tracking-[0.2em] border border-[#748B83]/40">
              <ShieldCheck className="w-3.5 h-3.5 text-[#355C4D]" />
              Single Administrator Slot Available (1 of 1)
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#272B29]">
              Establish Master Administrator
            </h1>
            <p className="text-[13px] text-[#777D79] max-w-md mx-auto leading-relaxed">
              Welcome. Provide your details below to create the exclusive master administrator account for <strong>Alishba Finds</strong>.
            </p>
          </div>

          {/* Setup Card */}
          <div className="bg-white border border-[#D3D6D3] p-8 shadow-sm space-y-6">
            <div className="p-3.5 bg-[#F0F1F0] border-l-2 border-[#748B83] text-[12px] text-[#777D79] space-y-1">
              <strong className="text-[#272B29] block">Strict Single-Account Policy:</strong>
              <p>
                Once registered, this single admin slot is <strong>permanently locked</strong>. No subsequent signups will ever be allowed on this website. Keep your login credentials safe.
              </p>
            </div>

            {regError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-[12px] flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#777D79] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#777D79] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Alishba Akbar"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#777D79] mb-1.5">
                  Admin Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#777D79] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="admin@alishbafinds.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#777D79] mb-1.5">
                  Admin Username *
                </label>
                <div className="relative">
                  <span className="text-[#777D79] font-mono absolute left-3.5 top-2.5 text-[13px]">@</span>
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder="alishba"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#777D79] mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#777D79] absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#777D79] mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#777D79] absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#272B29] hover:bg-[#748B83] text-white text-[12px] uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#D8E6E4]" />
                <span>Claim Admin Slot & Enter Portal</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#D3D6D3] text-center">
              <button
                onClick={() => setActivePage('home')}
                className="text-[12px] text-[#777D79] hover:text-[#272B29] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Storefront</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: REGISTERED BUT LOGGED OUT
  // ==========================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F6F6F5] text-[#272B29] py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F0F1F0] text-[#272B29] text-[11px] font-semibold uppercase tracking-[0.2em] border border-[#D3D6D3]">
              <Lock className="w-3.5 h-3.5 text-[#748B83]" />
              Master Admin Portal · Alishba Finds
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#272B29]">
              Administrator Sign In
            </h1>
            <p className="text-[13px] text-[#777D79] leading-relaxed">
              Authenticate with your registered admin credentials to review store orders, customer delivery details, and fulfillment statuses.
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-[#D3D6D3] p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider pb-3 border-b border-[#D3D6D3] text-[#777D79]">
              <span>Registration Status:</span>
              <span className="font-semibold text-[#355C4D] bg-[#D8E6E4] px-2 py-0.5">
                Slot Claimed · Closed
              </span>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-[12px] flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#777D79] mb-1.5">
                  Username or Admin Email *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#777D79] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. alishba or admin@alishbafinds.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#777D79] mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#777D79] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your administrator password"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#272B29] hover:bg-[#748B83] text-white text-[12px] uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Lock className="w-4 h-4 text-[#D8E6E4]" />
                <span>Sign In to Orders Dashboard</span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#D3D6D3] text-center">
              <button
                onClick={() => setActivePage('home')}
                className="text-[12px] text-[#777D79] hover:text-[#272B29] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Storefront</span>
              </button>
            </div>
          </div>

          {/* Single Slot Reminder */}
          <p className="mt-6 text-center text-[11px] text-[#777D79]">
            The single master slot is assigned. Other users cannot create admin profiles.
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: FULL ADMIN ORDER MANAGEMENT DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F6F6F5] text-[#272B29] pb-20">
      {/* Top Admin Navigation Header */}
      <header className="bg-[#272B29] text-white sticky top-0 z-20 border-b border-[#373A36] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-editorial text-xl sm:text-2xl tracking-[0.12em] font-medium uppercase text-white">
              Alishba Finds
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase bg-[#748B83]/40 text-[#D8E6E4] px-2 py-0.5 border border-[#748B83]/60">
              Orders Control Center
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[12px]">
            {/* Admin Avatar Badge */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-medium">{adminAccount?.name || 'Master Admin'}</span>
              <span className="text-white/50 text-[10px]">(@{adminAccount?.username})</span>
            </div>

            {/* Quick Actions */}
            <button
              onClick={() => setActivePage('home')}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Return to the customer storefront"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-200 text-[11px] uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sign out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Title Bar & Status Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D3D6D3]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#748B83] uppercase">
                ATELIER DISPATCH & FULFILLMENT
              </span>
              <span className="text-[10px] bg-[#D8E6E4] text-[#355C4D] px-2 py-0.5 font-bold uppercase tracking-wider">
                Single Master Slot Locked
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#272B29]">
              Store Orders & Customer Dispatches
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={seedSampleOrders}
              className="px-3.5 py-2 border border-[#D3D6D3] bg-white hover:border-[#748B83] text-[12px] uppercase tracking-wider font-medium text-[#272B29] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reload sample orders if you want demo records"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#748B83]" />
              <span>Reset Samples</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-[#272B29] hover:bg-[#748B83] text-white text-[12px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Download orders in CSV format"
            >
              <Download className="w-3.5 h-3.5 text-[#D8E6E4]" />
              <span>Export CSV ({filteredOrders.length})</span>
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Revenue */}
          <div className="bg-white border border-[#D3D6D3] p-5 space-y-1">
            <div className="flex items-center justify-between text-[#777D79]">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-[#748B83]" />
            </div>
            <div className="font-editorial text-2xl sm:text-3xl text-[#272B29] font-medium">
              {formatPrice(metrics.totalRevenue)}
            </div>
            <p className="text-[11px] text-[#777D79]">
              Avg: {formatPrice(metrics.avgOrderValue)} per order
            </p>
          </div>

          {/* Card 2: Total Orders */}
          <div className="bg-white border border-[#D3D6D3] p-5 space-y-1">
            <div className="flex items-center justify-between text-[#777D79]">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-[#748B83]" />
            </div>
            <div className="font-editorial text-2xl sm:text-3xl text-[#272B29] font-medium">
              {metrics.totalOrders}
            </div>
            <p className="text-[11px] text-[#777D79]">
              {metrics.codOrders} on Cash on Delivery
            </p>
          </div>

          {/* Card 3: Pending & Processing */}
          <div className="bg-white border border-[#D3D6D3] p-5 space-y-1">
            <div className="flex items-center justify-between text-[#777D79]">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Active Dispatch</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-editorial text-2xl sm:text-3xl text-amber-700 font-medium">
              {metrics.pendingOrders + metrics.processingOrders}
            </div>
            <p className="text-[11px] text-[#777D79]">
              {metrics.pendingOrders} Pending · {metrics.processingOrders} Processing
            </p>
          </div>

          {/* Card 4: Delivered */}
          <div className="bg-white border border-[#D3D6D3] p-5 space-y-1">
            <div className="flex items-center justify-between text-[#777D79]">
              <span className="text-[11px] uppercase tracking-wider font-semibold">Delivered</span>
              <CheckCircle2 className="w-4 h-4 text-[#355C4D]" />
            </div>
            <div className="font-editorial text-2xl sm:text-3xl text-[#355C4D] font-medium">
              {metrics.deliveredOrders}
            </div>
            <p className="text-[11px] text-[#777D79]">
              {metrics.shippedOrders} currently in transit
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border border-[#D3D6D3] p-4 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#777D79] absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID, customer, phone, city, item..."
                className="w-full pl-9 pr-3 py-2 bg-[#F6F6F5] border border-[#D3D6D3] text-[13px] focus:outline-none focus:border-[#748B83]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#777D79] hover:text-[#272B29] text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Payment Method Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#777D79] font-semibold whitespace-nowrap">
                Payment:
              </span>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value as any)}
                className="bg-[#F6F6F5] border border-[#D3D6D3] text-[12px] py-1.5 px-3 focus:outline-none focus:border-[#748B83] cursor-pointer"
              >
                <option value="All">All Payment Types</option>
                <option value="cod">Cash on Delivery (COD)</option>
                <option value="bank_transfer">Direct Bank Transfer</option>
                <option value="card">Credit / Debit Card</option>
              </select>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-[#D3D6D3]/60">
            {(['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const).map(
              (tab) => {
                const count =
                  tab === 'All'
                    ? orders.length
                    : orders.filter((o) => o.status === tab).length;

                return (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-3 py-1.5 text-[12px] uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                      statusFilter === tab
                        ? 'bg-[#272B29] text-white'
                        : 'bg-[#F0F1F0] text-[#777D79] hover:text-[#272B29] hover:bg-[#EAEBEA]'
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        statusFilter === tab
                          ? 'bg-white/20 text-white'
                          : 'bg-[#D3D6D3] text-[#272B29]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Orders Table (Desktop) / Cards (Mobile) */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-[#D3D6D3] py-16 text-center space-y-3">
            <Package className="w-10 h-10 text-[#777D79] mx-auto opacity-50" />
            <h3 className="font-editorial text-2xl text-[#272B29]">No orders match your criteria</h3>
            <p className="text-[13px] text-[#777D79] max-w-sm mx-auto">
              Try adjusting your search terms or filter selection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setPaymentFilter('All');
              }}
              className="px-4 py-2 bg-[#F0F1F0] text-[12px] uppercase tracking-wider font-medium hover:bg-[#D3D6D3] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="bg-white border border-[#D3D6D3] shadow-sm overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left text-[12px] divide-y divide-[#D3D6D3]">
                <thead className="bg-[#F0F1F0] uppercase text-[10px] tracking-wider text-[#777D79]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Order ID & Date</th>
                    <th className="py-3 px-4 font-semibold">Customer Details</th>
                    <th className="py-3 px-4 font-semibold">Ordered Items</th>
                    <th className="py-3 px-4 font-semibold">Payment</th>
                    <th className="py-3 px-4 font-semibold">Amount</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D3D6D3]/60">
                  {filteredOrders.map((order) => {
                    const totalItems = order.items.reduce((s, it) => s + it.quantity, 0);

                    return (
                      <tr key={order.orderId} className="hover:bg-[#F6F6F5]/80 transition-colors">
                        {/* ID & Date */}
                        <td className="py-4 px-4 align-top">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="font-mono font-semibold text-[#272B29] hover:text-[#748B83] text-[13px] block text-left"
                          >
                            #{order.orderId}
                          </button>
                          <span className="text-[11px] text-[#777D79] block mt-0.5">
                            {order.date}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-4 align-top">
                          <strong className="text-[#272B29] font-medium block">
                            {order.customer.fullName}
                          </strong>
                          <span className="text-[11px] text-[#777D79] block">
                            {order.customer.city}, {order.customer.country}
                          </span>
                          <span className="text-[11px] text-[#777D79] font-mono block">
                            {order.customer.phone}
                          </span>
                        </td>

                        {/* Items */}
                        <td className="py-4 px-4 align-top">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2 overflow-hidden">
                              {order.items.slice(0, 3).map((item, idx) => (
                                <SafeImage
                                  key={idx}
                                  src={item.product.image}
                                  fallbackSrc={item.product.fallbackImage}
                                  alt={item.product.name}
                                  className="inline-block w-8 h-8 rounded-none object-cover border border-[#D3D6D3] bg-white"
                                />
                              ))}
                            </div>
                            <div className="text-[11px]">
                              <span className="font-medium text-[#272B29] block">
                                {order.items[0]?.product.name}
                                {order.items.length > 1 && ` +${order.items.length - 1} more`}
                              </span>
                              <span className="text-[#777D79]">
                                {totalItems} total {totalItems === 1 ? 'item' : 'items'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Payment */}
                        <td className="py-4 px-4 align-top">
                          <span className="inline-block font-medium uppercase text-[11px] text-[#272B29]">
                            {order.paymentMethod === 'cod' ? (
                              <span className="bg-[#D8E6E4] text-[#355C4D] px-2 py-0.5 font-bold text-[10px]">
                                Cash on Delivery
                              </span>
                            ) : order.paymentMethod === 'bank_transfer' ? (
                              'Bank Transfer'
                            ) : (
                              'Card Payment'
                            )}
                          </span>
                          <span className="text-[10px] text-[#777D79] block mt-1">
                            {order.shippingMethod}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="py-4 px-4 align-top font-mono font-semibold text-[13px] text-[#272B29]">
                          {formatPrice(order.total)}
                        </td>

                        {/* Status with Inline Quick Change */}
                        <td className="py-4 px-4 align-top">
                          <div className="space-y-1">
                            <div>{getStatusBadge(order.status)}</div>
                            <select
                              value={order.status}
                              onChange={(e) =>
                                updateOrderStatus(order.orderId, e.target.value as OrderStatus)
                              }
                              className="text-[10px] bg-[#F0F1F0] border border-[#D3D6D3] px-1.5 py-0.5 rounded-none text-[#272B29] focus:outline-none focus:border-[#748B83] cursor-pointer mt-1"
                              aria-label={`Update status for ${order.orderId}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 align-top text-right space-x-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 border border-[#D3D6D3] hover:border-[#272B29] text-[#272B29] hover:bg-white transition-colors cursor-pointer"
                            title="View customer & order details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(order.orderId)}
                            className="p-1.5 border border-[#D3D6D3] hover:border-rose-400 text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete this order"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="lg:hidden divide-y divide-[#D3D6D3]">
              {filteredOrders.map((order) => (
                <div key={order.orderId} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="font-mono font-bold text-[#272B29] text-sm text-left"
                      >
                        #{order.orderId}
                      </button>
                      <span className="text-[11px] text-[#777D79] block">{order.date}</span>
                    </div>
                    <div>{getStatusBadge(order.status)}</div>
                  </div>

                  <div className="text-[12px] space-y-0.5">
                    <p className="font-semibold text-[#272B29]">{order.customer.fullName}</p>
                    <p className="text-[#777D79]">{order.customer.city}, {order.customer.country}</p>
                    <p className="text-[#777D79] font-mono">{order.customer.phone}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#D3D6D3]/60 text-[12px]">
                    <div>
                      <span className="text-[11px] text-[#777D79] block">Total Amount</span>
                      <strong className="font-mono text-[#272B29] text-sm">
                        {formatPrice(order.total)}
                      </strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.orderId, e.target.value as OrderStatus)
                        }
                        className="text-[11px] bg-[#F0F1F0] border border-[#D3D6D3] px-2 py-1 text-[#272B29]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1.5 bg-[#272B29] text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ==========================================
          MODAL: ORDER DETAIL INSPECTION DRAWER
          ========================================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-[#D3D6D3] w-full max-w-2xl my-8 p-6 sm:p-8 space-y-6 shadow-xl relative text-[#272B29]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 text-[#777D79] hover:text-[#272B29] transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="border-b border-[#D3D6D3] pb-4 pr-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#748B83]">
                  ORDER DETAILS
                </span>
                {getStatusBadge(selectedOrder.status)}
              </div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#272B29]">
                Order Reference #{selectedOrder.orderId}
              </h2>
              <p className="text-[12px] text-[#777D79]">
                Placed on {selectedOrder.date} · Payment: <strong className="uppercase">{selectedOrder.paymentMethod}</strong>
              </p>
            </div>

            {/* Customer Details Box */}
            <div className="p-4 bg-[#F6F6F5] border border-[#D3D6D3] space-y-2">
              <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#272B29] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#748B83]" />
                <span>Customer & Destination</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
                <div>
                  <span className="text-[#777D79] block text-[10px] uppercase">Recipient Name</span>
                  <strong className="text-[#272B29] text-[13px]">{selectedOrder.customer.fullName}</strong>
                </div>
                <div>
                  <span className="text-[#777D79] block text-[10px] uppercase">Contact Phone</span>
                  <a
                    href={`tel:${selectedOrder.customer.phone}`}
                    className="text-[#272B29] hover:text-[#748B83] font-mono flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3 text-[#748B83]" />
                    <span>{selectedOrder.customer.phone}</span>
                  </a>
                </div>
                <div>
                  <span className="text-[#777D79] block text-[10px] uppercase">Email</span>
                  <a
                    href={`mailto:${selectedOrder.customer.email}`}
                    className="text-[#272B29] hover:text-[#748B83] underline"
                  >
                    {selectedOrder.customer.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#777D79] block text-[10px] uppercase">Delivery Address</span>
                  <span className="text-[#272B29]">
                    {selectedOrder.customer.address}, {selectedOrder.customer.city} {selectedOrder.customer.postalCode}, {selectedOrder.customer.country}
                  </span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="pt-2 border-t border-[#D3D6D3] text-[11px] text-[#777D79]">
                  <strong>Customer Note / Dispatch Instructions:</strong> {selectedOrder.notes}
                </div>
              )}
            </div>

            {/* Ordered Items Breakdown */}
            <div className="space-y-3">
              <h4 className="text-[11px] uppercase tracking-wider font-semibold text-[#272B29] border-b border-[#D3D6D3] pb-2">
                Order Items ({selectedOrder.items.length})
              </h4>
              <div className="divide-y divide-[#D3D6D3]/60 max-h-56 overflow-y-auto">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <SafeImage
                        src={it.product.image}
                        fallbackSrc={it.product.fallbackImage}
                        alt={it.product.name}
                        className="w-12 h-12 object-cover border border-[#D3D6D3] bg-[#EAEBEA]"
                      />
                      <div>
                        <h5 className="font-editorial text-[16px] text-[#272B29]">{it.product.name}</h5>
                        <p className="text-[11px] text-[#777D79]">
                          Tone: {it.selectedColor.name} · Qty: {it.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[13px] font-semibold text-[#272B29]">
                      {formatPrice(it.product.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="pt-3 border-t border-[#D3D6D3] space-y-1.5 text-[12px]">
                <div className="flex justify-between text-[#777D79]">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#777D79]">
                  <span>Shipping ({selectedOrder.shippingMethod})</span>
                  <span className="font-mono">
                    {selectedOrder.shipping === 0 ? 'Free' : formatPrice(selectedOrder.shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-[14px] font-semibold text-[#272B29] pt-2 border-t border-[#D3D6D3]">
                  <span>Total Payable</span>
                  <span className="font-mono">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Status Change Controls */}
            <div className="space-y-2 pt-2 border-t border-[#D3D6D3]">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#777D79] block">
                Update Fulfillment Status:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as OrderStatus[]).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => {
                        updateOrderStatus(selectedOrder.orderId, st);
                        setSelectedOrder({ ...selectedOrder, status: st });
                      }}
                      className={`py-2 text-[11px] uppercase tracking-wider font-medium border transition-colors cursor-pointer ${
                        selectedOrder.status === st
                          ? 'bg-[#272B29] text-white border-[#272B29]'
                          : 'bg-[#F0F1F0] hover:bg-[#EAEBEA] text-[#272B29] border-[#D3D6D3]'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Print & Close */}
            <div className="flex items-center justify-between pt-4 border-t border-[#D3D6D3]">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-[#D3D6D3] hover:border-[#272B29] text-[12px] uppercase tracking-wider font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#748B83]" />
                <span>Print Packing Slip</span>
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-[#272B29] hover:bg-[#748B83] text-white text-[12px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-[#D3D6D3] max-w-sm w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-editorial text-xl text-[#272B29]">Delete Order #{deleteConfirmId}?</h3>
            <p className="text-[13px] text-[#777D79]">
              This will permanently remove this order record from the atelier database.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-[#D3D6D3] text-[12px] uppercase tracking-wider font-medium text-[#777D79] hover:text-[#272B29]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteOrder(deleteConfirmId);
                  setDeleteConfirmId(null);
                  if (selectedOrder?.orderId === deleteConfirmId) {
                    setSelectedOrder(null);
                  }
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-[12px] uppercase tracking-wider font-semibold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
