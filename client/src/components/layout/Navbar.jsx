import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  LogOut,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  ClipboardList,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [expandedLink, setExpandedLink] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartCount = cartItems?.length || 0;

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const categoriesDropdown = [
    {
      title: 'By occasion',
      items: [
        { name: 'Casual', path: '?occasion=casual' },
        { name: 'Formal', path: '?occasion=formal' },
        { name: 'Office Wear', path: '?occasion=office-wear' },
        { name: 'Party Wear', path: '?occasion=party-wear' },
        { name: 'Sports', path: '?occasion=sports' },
      ],
    },
    {
      title: 'By type',
      items: [
        { name: 'Flip Flops', path: '?type=flip-flops' },
        { name: 'Sandals', path: '?type=sandals' },
        { name: 'Shoes', path: '?type=shoes' },
        { name: 'Slippers', path: '?type=slippers' },
        { name: 'Sneakers', path: '?type=sneakers' },
        { name: 'Slides', path: '?type=slides' },
        { name: 'Sports Shoes', path: '?type=sports-shoes' },
      ],
    },
    {
      title: 'By style',
      items: [
        { name: 'Classic', path: '?style=classic' },
        { name: 'Trendy', path: '?style=trendy' },
        { name: 'Minimal', path: '?style=minimal' },
        { name: 'Luxury', path: '?style=luxury' },
        { name: 'Streetwear', path: '?style=streetwear' },
        { name: 'Comfort Fit', path: '?style=comfort-fit' },
      ],
    },
    {
      title: 'By price',
      items: [
        { name: 'Under Rs. 2,000', path: '?price=under-2000' },
        { name: 'Rs. 2,000 - Rs. 5,000', path: '?price=2000-5000' },
        { name: 'Rs. 5,000 - Rs. 10,000', path: '?price=5000-10000' },
        { name: 'Premium', path: '?price=premium' },
      ],
    },
  ];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men', hasDropdown: true },
    { name: 'Women', path: '/women', hasDropdown: true },
    { name: 'Girls', path: '/girls', hasDropdown: true },
    { name: 'Boys', path: '/boys', hasDropdown: true },
    { name: 'Sale', path: '/sale' },
    { name: 'About us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleExpand = (name) => {
    setExpandedLink(expandedLink === name ? null : name);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();
    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setSearchTerm('');
    setIsSearchOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-[100] px-4 md:px-8 py-2 transition-all duration-300 bg-[#F4E9E0] relative">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center gap-3 px-0 py-1 transition-all duration-300">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <motion.img
              src="/Logo.png"
              alt="SoleCraft Logo"
              whileHover={{ rotate: -10, scale: 1.08 }}
              className="w-8 h-8 md:w-9 md:h-9 object-contain drop-shadow-sm"
            />

            <span className="text-lg xl:text-xl font-extrabold tracking-tighter text-[#071A2F] uppercase group-hover:tracking-normal transition-all duration-300">
              Sole<span className="text-[#F5B942]">Craft</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-2 xl:gap-4 text-[10px] xl:text-[11px] 2xl:text-xs font-extrabold uppercase tracking-widest text-[#111827]/60">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group py-3 shrink-0">
                <Link
                  to={link.path}
                  className={`transition-colors py-1 flex items-center gap-1 whitespace-nowrap ${location.pathname === link.path
                      ? 'text-[#071A2F] border-b-2 border-[#F5B942]'
                      : 'hover:text-[#071A2F]'
                    }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-3 h-3 opacity-60 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {link.hasDropdown && (
                  <div className="absolute top-[85%] left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-white/95 backdrop-blur-xl border border-[#CBD5E1]/70 shadow-2xl rounded-2xl p-6 flex gap-8 w-max min-w-[700px]">
                      {categoriesDropdown.map((col) => (
                        <div key={col.title} className="flex-1">
                          <h3 className="text-[#071A2F] font-extrabold text-[10px] xl:text-xs mb-3 border-b border-[#CBD5E1]/40 pb-2">
                            {col.title}
                          </h3>

                          <ul className="space-y-2 flex flex-col">
                            {col.items.map((item) => (
                              <Link
                                key={item.name}
                                to={`${link.path}${item.path}`}
                                className="text-[#111827]/60 hover:text-[#071A2F] transition-all duration-200 text-[11px] xl:text-xs font-extrabold capitalize whitespace-nowrap tracking-wide flex items-center group/item"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B942] opacity-0 w-0 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:w-1.5 group-hover/item:mr-2"></span>
                                <span className="transition-transform duration-300">
                                  {item.name}
                                </span>
                              </Link>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#F8FAFC] border border-[#CBD5E1]/70 rounded-full focus-within:border-[#F5B942]/70 transition-all"
            >
              <Search className="w-4 h-4 text-[#111827]/50" />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products"
                className="w-28 xl:w-40 2xl:w-48 bg-transparent text-sm font-semibold text-[#111827] placeholder:text-[#111827]/35 focus:outline-none"
                aria-label="Search products"
              />
            </form>

            <button
              type="button"
              onClick={() => setIsSearchOpen((open) => !open)}
              className="md:hidden p-2 text-[#111827]/60 hover:text-[#071A2F] hover:bg-[#F8FAFC] rounded-full transition-all"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>

            <Link
              to="/cart"
              className={`relative p-2 rounded-full transition-all ${location.pathname === '/cart'
                  ? 'text-[#071A2F] bg-[#F8FAFC]'
                  : 'text-[#111827]/60 hover:text-[#071A2F] hover:bg-[#F8FAFC]'
                }`}
              aria-label="Cart"
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />

              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 bg-[#F5B942] text-[#071A2F] text-[9px] md:text-[10px] font-extrabold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center border-2 border-white shadow-lg"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <div className="h-5 w-px bg-[#CBD5E1]/70 mx-0 md:mx-1" />

            {user ? (
              <div className="flex items-center gap-2">
                {(user.isAdmin || user.role === 'admin') && (
                  <Link
                    to="/admin/dashboard"
                    className="text-xs font-bold text-[#111827]/70 hover:text-[#071A2F] whitespace-nowrap"
                  >
                    Admin
                  </Link>
                )}

                <Link
                  to="/my-orders"
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#CBD5E1]/70 transition-all group shadow-sm ${location.pathname === '/my-orders'
                      ? 'bg-white text-[#071A2F] border-[#F5B942]'
                      : 'bg-[#F8FAFC] hover:bg-white text-[#111827]/60 hover:text-[#071A2F]'
                    }`}
                  aria-label="My Orders"
                  title="My Orders"
                >
                  <ClipboardList className="w-4 h-4" />
                </Link>

                <Link
                  to="/profile"
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#CBD5E1]/70 transition-all group shadow-sm ${location.pathname === '/profile'
                      ? 'bg-white text-[#071A2F] border-[#F5B942]'
                      : 'bg-[#F8FAFC] hover:bg-white text-[#111827]/60 hover:text-[#071A2F]'
                    }`}
                  aria-label="Profile"
                  title="Profile"
                >
                  <User className="w-4 h-4" />
                </Link>

                <button
                  onClick={onLogout}
                  className="p-2 text-[#111827]/60 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 md:px-5 md:py-2 bg-[#F5B942] text-[#071A2F] text-[10px] md:text-xs font-extrabold uppercase tracking-widest rounded-full hover:bg-[#D99A20] transition-all active:scale-95 shadow-lg shadow-[#F5B942]/20"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 text-[#111827]/60 hover:text-[#071A2F] hover:bg-[#F8FAFC] rounded-full transition-all"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.form
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onSubmit={handleSearchSubmit}
              className="md:hidden max-w-[1400px] mx-auto mt-2 flex items-center gap-2 bg-white/95 border border-[#CBD5E1]/70 rounded-2xl px-4 py-2.5 shadow-xl shadow-[#071A2F]/10"
            >
              <Search className="w-4 h-4 text-[#111827]/50" />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products"
                autoFocus
                className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#111827] placeholder:text-[#111827]/35 focus:outline-none"
                aria-label="Search products"
              />

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-1.5 text-[#111827]/50 hover:text-[#071A2F] rounded-full"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#071A2F]/45 backdrop-blur-md z-[1000]"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[300px] bg-[#F8FAFC]/95 border-l border-[#CBD5E1]/70 p-6 z-[1010] flex flex-col shadow-2xl shadow-[#071A2F]/20"
            >
              <div className="flex justify-between items-center mb-8 border-b border-[#CBD5E1]/70 pb-4">
                <span className="text-xl font-extrabold tracking-tighter text-[#071A2F] uppercase">
                  Sole<span className="text-[#F5B942]">Craft</span>
                </span>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#111827]/60 hover:text-[#071A2F] hover:bg-white rounded-full transition-all"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-1 text-sm font-extrabold uppercase tracking-widest text-[#111827]/60 overflow-y-auto pb-8">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col border-b border-[#CBD5E1]/60">
                    <div className="flex items-center justify-between py-3">
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`transition-colors flex-1 ${location.pathname === link.path
                            ? 'text-[#071A2F] font-bold'
                            : 'hover:text-[#071A2F]'
                          }`}
                      >
                        {link.name}
                      </Link>

                      {link.hasDropdown && (
                        <button
                          onClick={() => toggleExpand(link.name)}
                          className="p-2 -mr-2 hover:bg-[#CBD5E1]/20 rounded-md transition-colors"
                          aria-label={`Expand ${link.name}`}
                        >
                          <motion.div
                            animate={{ rotate: expandedLink === link.name ? 180 : 0 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {link.hasDropdown && expandedLink === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-4 flex flex-col space-y-5 normal-case text-xs tracking-normal">
                            {categoriesDropdown.map((col) => (
                              <div key={col.title}>
                                <h4 className="text-[#071A2F] font-bold mb-2 uppercase tracking-wide text-[10px]">
                                  {col.title}
                                </h4>

                                <div className="flex flex-col space-y-2.5 pl-2">
                                  {col.items.map((item) => (
                                    <Link
                                      key={item.name}
                                      to={`${link.path}${item.path}`}
                                      onClick={() => setIsOpen(false)}
                                      className="text-[#111827]/70 hover:text-[#071A2F] font-medium capitalize flex items-center gap-2"
                                    >
                                      <span className="w-1 h-1 rounded-full bg-[#F5B942]"></span>
                                      {item.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {user && (
                  <div className="flex flex-col border-b border-[#CBD5E1]/60">
                    <div className="flex items-center justify-between py-3">
                      <Link
                        to="/my-orders"
                        onClick={() => setIsOpen(false)}
                        className={`transition-colors flex-1 ${location.pathname === '/my-orders'
                            ? 'text-[#071A2F] font-bold'
                            : 'hover:text-[#071A2F]'
                          }`}
                      >
                        My Orders
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;