import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, User, LogOut, Search, Menu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className="solecraft-navbar sticky top-0 z-[100] px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] px-6 py-3 shadow-2xl">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: -10, scale: 1.1 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20"
          >
            <ShoppingBag className="w-6 h-6 text-white" />
          </motion.div>
          <span className="text-2xl font-black italic tracking-tighter text-white uppercase group-hover:tracking-normal transition-all duration-300">
            Sole<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Craft</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Shop</Link>
          <Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link>
          <Link to="/brands" className="hover:text-white transition-colors">Brands</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
            <Search className="w-5 h-5" />
          </button>

          <Link to="/cart" className="relative p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
            <ShoppingCart className="w-5 h-5" />
            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#0f172a] shadow-lg"
                >
                  {cartItems.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <div className="h-6 w-px bg-white/10 mx-2" />

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-3 p-1.5 pl-3 pr-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-all group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-bold text-gray-300 group-hover:text-white hidden sm:block">
                  {user.name.split(' ')[0]}
                </span>
              </Link>
              
              <button 
                onClick={onLogout}
                className="p-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
            >
              Sign In
            </Link>
          )}

          <button className="md:hidden p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
