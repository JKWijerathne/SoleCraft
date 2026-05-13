import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../store/slices/authSlice';
import { Mail, Lock, User, UserPlus, Loader2, AlertCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationError, setValidationError] = useState('');

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error, success } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (success || user) {
      navigate('/');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, success, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }

    dispatch(register({ name, email, password }));
  };

  return (
    <div className="register-container flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="register-glass w-full max-w-lg p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <ShoppingBag className="w-32 h-32 rotate-12" />
        </div>

        <div className="text-center mb-10 relative z-10">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Join the movement
          </motion.div>
          
          <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
            Sole<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Craft</span>
          </h1>
          <p className="text-gray-400 font-medium">Create your account to start your collection</p>
        </div>

        <AnimatePresence mode="wait">
          {(error || validationError) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error || validationError}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1" htmlFor="name">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within:text-purple-500" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={onChange}
                className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1" htmlFor="email">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within:text-purple-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={onChange}
                className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="john@solecraft.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1" htmlFor="password">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within:text-purple-500" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={onChange}
                className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1" htmlFor="confirmPassword">
              Confirm
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within:text-purple-500" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={onChange}
                className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full mt-4 bg-white text-black font-black py-4 rounded-2xl hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center text-gray-500 text-sm font-medium">
          Already a member?{' '}
          <Link to="/login" className="text-white hover:text-purple-400 transition-colors underline underline-offset-4 decoration-purple-500/50">
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
