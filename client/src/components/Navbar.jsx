import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, LogOut, Search, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men' },
    { name: 'Woman', path: '/woman' },
    { name: 'Girls', path: '/girls' },
    { name: 'Boys', path: '/boys' },
    { name: 'Sale', path: '/sale' },
    { name: 'About us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav className="solecraft-navbar sticky top-0 z-[100] px-4 md:px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] px-4 lg:px-6 py-3 shadow-2xl">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.div>
            <span className="text-xl md:text-2xl font-black italic tracking-tighter text-white uppercase group-hover:tracking-normal transition-all duration-300">
              Sole<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Craft</span>
            </span>
          </Link>

          {/* Desktop Links (Hidden on small and medium screens) */}
          <div className="hidden lg:flex items-center lg:space-x-3 xl:space-x-5 text-[11px] xl:text-xs font-black uppercase tracking-widest text-gray-400">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="hover:text-white transition-colors py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <button className="p-2 md:p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            <Link to="/cart" className="relative p-2 md:p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              <AnimatePresence>
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[9px] md:text-[10px] font-black rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center border-2 border-[#0f172a] shadow-lg"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <div className="h-6 w-px bg-white/10 mx-1 md:mx-2" />

            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <Link to="/profile" className="flex items-center gap-2 md:gap-3 p-1 pl-2 pr-3 md:pl-3 md:pr-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-all group">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs md:text-sm font-bold text-gray-300 group-hover:text-white hidden sm:block">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
                
                <button 
                  onClick={onLogout}
                  className="p-2 md:p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all group"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 md:px-6 md:py-2.5 bg-white text-black text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 md:p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md z-[1000]"
            />
            {/* Navigation Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[300px] bg-[#151f32]/95 border-l border-white/10 p-6 z-[1010] flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <span className="text-xl font-black italic tracking-tighter text-white uppercase">
                  Sole<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Craft</span>
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-4 text-sm font-black uppercase tracking-widest text-gray-400">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-white transition-colors py-2 border-b border-white/5"
                  >
                    {link.name}
                  </Link>
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
