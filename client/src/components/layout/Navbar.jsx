import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, LogOut, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedLink, setExpandedLink] = useState(null);

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

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
      ]
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
        { name: 'Sports Shoes', path: '?type=sports-shoes' }
      ]
    },
    {
      title: 'By style',
      items: [
        { name: 'Classic', path: '?style=classic' },
        { name: 'Trendy', path: '?style=trendy' },
        { name: 'Minimal', path: '?style=minimal' },
        { name: 'Luxury', path: '?style=luxury' },
        { name: 'Streetwear', path: '?style=streetwear' },
        { name: 'Comfort Fit', path: '?style=comfort-fit' }
      ]
    },

    {
      title: 'By price',
      items: [
        { name: 'Under Rs. 2,000', path: '?price=under-2000' },
        { name: 'Rs. 2,000 - Rs. 5,000', path: '?price=2000-5000' },
        { name: 'Rs. 5,000 - Rs. 10,000', path: '?price=5000-10000' },
        { name: 'Premium', path: '?price=premium' }
      ]
    },
  ];


  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men', hasDropdown: true },
    { name: 'Woman', path: '/woman', hasDropdown: true },
    { name: 'Girls', path: '/girls', hasDropdown: true },
    { name: 'Boys', path: '/boys', hasDropdown: true },
    { name: 'Sale', path: '/sale' },
    { name: 'About us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const toggleExpand = (name) => {
    setExpandedLink(expandedLink === name ? null : name);
  };

  return (
    <>
      <nav className="sticky top-0 z-[100] px-4 md:px-6 py-3 md:py-4 transition-all duration-300 bg-transparent relative">
        {/* Light blur layer from Navbar.css */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC]/90 to-transparent backdrop-blur-[8px] opacity-0 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/90 backdrop-blur-xl border border-[#CBD5E1]/70 hover:border-[#F5B942]/45 rounded-[1.5rem] md:rounded-[2rem] px-4 lg:px-6 py-2 md:py-3 shadow-[0_18px_45px_-24px_rgba(7,26,47,0.35)] transition-all duration-300">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <motion.img
              src="/Logo.png"
              alt="SoleCraft Logo"
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-9 h-9 md:w-10 md:h-10 object-contain drop-shadow-md"
            />

            <span className="text-xl md:text-2xl font-black italic tracking-tighter text-[#071A2F] uppercase group-hover:tracking-normal transition-all duration-300">
              Sole<span className="text-[#F5B942]">Craft</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center lg:space-x-3 xl:space-x-5 text-[11px] xl:text-xs font-black uppercase tracking-widest text-[#111827]/60">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group py-4">
                <Link
                  to={link.path}
                  className="hover:text-[#071A2F] transition-colors py-1 flex items-center gap-1"
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
                          <h3 className="text-[#071A2F] font-black text-[10px] xl:text-xs mb-3 border-b border-[#CBD5E1]/40 pb-2">{col.title}</h3>
                          <ul className="space-y-2 flex flex-col">
                            {col.items.map((item) => (
                              <Link
                                key={item.name}
                                to={`${link.path}${item.path}`}
                                className="text-[#111827]/60 hover:text-[#071A2F] transition-all duration-200 text-[11px] xl:text-xs font-black capitalize whitespace-nowrap tracking-wide flex items-center group/item"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B942] opacity-0 w-0 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:w-1.5 group-hover/item:mr-2"></span>
                                <span className="transition-transform duration-300">{item.name}</span>
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
          <div className="flex items-center space-x-2 md:space-x-3">
            <button className="p-2 md:p-2.5 text-[#111827]/60 hover:text-[#071A2F] hover:bg-[#F8FAFC] rounded-full transition-all">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <Link
              to="/cart"
              className="relative p-2 md:p-2.5 text-[#111827]/60 hover:text-[#071A2F] hover:bg-[#F8FAFC] rounded-full transition-all"
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />

              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 bg-[#F5B942] text-[#071A2F] text-[9px] md:text-[10px] font-black rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center border-2 border-white shadow-lg"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <div className="h-6 w-px bg-[#CBD5E1]/70 mx-1 md:mx-2" />

            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 md:gap-3 p-1 pl-2 pr-3 md:pl-3 md:pr-4 bg-[#F8FAFC] hover:bg-white rounded-full border border-[#CBD5E1]/70 transition-all group shadow-sm"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#071A2F] flex items-center justify-center text-xs font-bold text-[#F5B942] border border-[#071A2F]/10">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-xs md:text-sm font-bold text-[#111827]/70 group-hover:text-[#071A2F] hidden sm:block">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>

                <button
                  onClick={onLogout}
                  className="p-2 md:p-2.5 text-[#111827]/60 hover:text-red-500 hover:bg-red-50 rounded-full transition-all group"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 md:px-6 md:py-2.5 bg-[#F5B942] text-[#071A2F] text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full hover:bg-[#D99A20] transition-all active:scale-95 shadow-xl shadow-[#F5B942]/25"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 md:p-2.5 text-[#111827]/60 hover:text-[#071A2F] hover:bg-[#F8FAFC] rounded-full transition-all"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
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
                <span className="text-xl font-black italic tracking-tighter text-[#071A2F] uppercase">
                  Sole<span className="text-[#F5B942]">Craft</span>
                </span>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#111827]/60 hover:text-[#071A2F] hover:bg-white rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-1 text-sm font-black uppercase tracking-widest text-[#111827]/60 overflow-y-auto pb-8">
                {navLinks.map((link) => (
                  <div key={link.name} className="flex flex-col border-b border-[#CBD5E1]/60">
                    <div className="flex items-center justify-between py-3">
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="hover:text-[#071A2F] transition-colors flex-1"
                      >
                        {link.name}
                      </Link>
                      {link.hasDropdown && (
                        <button
                          onClick={() => toggleExpand(link.name)}
                          className="p-2 -mr-2 hover:bg-[#CBD5E1]/20 rounded-md transition-colors"
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
                                <h4 className="text-[#071A2F] font-bold mb-2 uppercase tracking-wide text-[10px]">{col.title}</h4>
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;