import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import {
  ArrowRight,
  Heart,
  LogOut,
  Mail,
  Package,
  Shield,
  ShoppingBag,
  User as UserIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { cartItems = [] } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) return null;

  const firstName = user.name?.split(' ')[0] || 'Customer';
  const isAdmin = user.isAdmin || user.role === 'admin';

  const quickLinks = [
    {
      title: 'Continue Shopping',
      description: 'Browse the latest SoleCraft styles',
      to: '/',
      icon: ShoppingBag,
    },
    {
      title: 'View Cart',
      description: `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} waiting in your cart`,
      to: '/cart',
      icon: Package,
    },
    {
      title: 'Sale Picks',
      description: 'Find limited-time offers and seasonal pairs',
      to: '/sale',
      icon: Heart,
    },
  ];

  return (
    <main className="flex-1 bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#F5B942]">
              My Account
            </p>
            <h1 className="text-3xl font-black tracking-tight text-[#071A2F] sm:text-4xl">
              Welcome back, {firstName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#111827]/60">
              Manage your account details and jump back into shopping.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-white px-5 py-3 text-sm font-black text-red-600 shadow-sm transition-colors hover:border-red-300 hover:bg-red-50 sm:w-auto"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="overflow-hidden rounded-[2rem] border border-[#CBD5E1]/70 bg-white shadow-[0_24px_60px_-35px_rgba(7,26,47,0.35)] lg:col-span-5"
          >
            <div className="bg-[#071A2F] px-6 py-8 text-white sm:px-8">
              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#F5B942] shadow-xl">
                  <UserIcon className="h-9 w-9" />
                </div>

                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#F5B942] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#071A2F]">
                      {isAdmin ? 'Admin Account' : 'Customer Account'}
                    </span>
                    {isAdmin && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/80">
                        <Shield className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                  </div>

                  <h2 className="truncate text-2xl font-black tracking-tight">
                    {user.name}
                  </h2>
                  <p className="mt-1 flex min-w-0 items-center gap-2 text-sm font-semibold text-white/70">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-6 sm:p-8">
              <div>
                <h3 className="mb-4 text-lg font-black text-[#071A2F]">
                  Account Details
                </h3>
                <div className="divide-y divide-[#CBD5E1]/60 rounded-2xl border border-[#CBD5E1]/70 bg-[#F8FAFC]">
                  <div className="grid gap-1 px-5 py-4 sm:grid-cols-[120px_1fr] sm:items-center">
                    <p className="text-xs font-black uppercase tracking-widest text-[#111827]/45">
                      Full Name
                    </p>
                    <p className="min-w-0 break-words text-sm font-bold text-[#111827]">
                      {user.name}
                    </p>
                  </div>
                  <div className="grid gap-1 px-5 py-4 sm:grid-cols-[120px_1fr] sm:items-center">
                    <p className="text-xs font-black uppercase tracking-widest text-[#111827]/45">
                      Email
                    </p>
                    <p className="min-w-0 break-words text-sm font-bold text-[#111827]">
                      {user.email}
                    </p>
                  </div>
                  <div className="grid gap-1 px-5 py-4 sm:grid-cols-[120px_1fr] sm:items-center">
                    <p className="text-xs font-black uppercase tracking-widest text-[#111827]/45">
                      Role
                    </p>
                    <p className="text-sm font-bold text-[#111827]">
                      {isAdmin ? 'Administrator' : 'Customer'}
                    </p>
                  </div>
                </div>
              </div>

              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="group flex items-center justify-between rounded-2xl border border-[#F5B942]/40 bg-[#F5B942]/10 p-4 transition-all hover:border-[#F5B942]"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B942] text-[#071A2F]">
                      <Shield className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-black text-[#071A2F]">Admin Dashboard</p>
                      <p className="text-sm font-medium text-[#111827]/55">
                        Manage products and store activity
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#071A2F] transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="lg:col-span-7"
          >
            <div className="rounded-[2rem] border border-[#CBD5E1]/70 bg-white p-6 shadow-[0_24px_60px_-35px_rgba(7,26,47,0.35)] sm:p-8">
              <div className="mb-6">
                <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#F5B942]">
                  Quick Actions
                </p>
                <h3 className="text-2xl font-black text-[#071A2F]">
                  Pick up where you left off
                </h3>
              </div>

              <div className="grid gap-4">
                {quickLinks.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 + index * 0.05 }}
                    >
                      <Link
                        to={item.to}
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-[#CBD5E1]/70 bg-[#F8FAFC] p-4 transition-all hover:border-[#F5B942]/70 hover:bg-white hover:shadow-lg hover:shadow-[#071A2F]/5"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#071A2F] shadow-sm ring-1 ring-[#CBD5E1]/70 transition-colors group-hover:bg-[#071A2F] group-hover:text-[#F5B942]">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <p className="font-black text-[#071A2F]">
                              {item.title}
                            </p>
                            <p className="mt-1 text-sm font-medium leading-5 text-[#111827]/55">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-[#111827]/40 transition-transform group-hover:translate-x-1 group-hover:text-[#071A2F]" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl border border-[#CBD5E1]/70 bg-[#071A2F] p-5 text-white">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#F5B942]">
                      SoleCraft Member
                    </p>
                    <p className="mt-2 text-sm font-medium leading-6 text-white/70">
                      Your profile is ready for faster checkout and smoother shopping.
                    </p>
                  </div>
                  <Link
                    to="/checkout"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F5B942] px-5 py-3 text-xs font-black uppercase tracking-widest text-[#071A2F] transition-colors hover:bg-[#D99A20]"
                  >
                    Checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
