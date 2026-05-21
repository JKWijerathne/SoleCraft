import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../../store/slices/authSlice';
import { Mail, Lock, LogIn, Loader2, AlertCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F8FAFC] flex items-center justify-center p-4">
      {/* Background glow effects from Login.css */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(245,185,66,0.18)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(7,26,47,0.10)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[10%] w-[300px] h-[300px] bg-gradient-to-r from-[#F5B942] to-[#D99A20] blur-[120px] opacity-[0.22] pointer-events-none"
      />

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[15%] right-[10%] w-[300px] h-[300px] bg-gradient-to-r from-[#071A2F] to-[#111827] blur-[120px] opacity-[0.12] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-3xl border border-[#CBD5E1]/70 shadow-2xl shadow-[#071A2F]/10 bg-white/85 backdrop-blur-[12px] relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#071A2F] mb-6 shadow-lg shadow-[#071A2F]/20"
          >
            <ShoppingBag className="w-8 h-8 text-[#F5B942]" />
          </motion.div>

          <h1 className="text-4xl font-black italic tracking-tighter text-[#071A2F] mb-2 uppercase">
            Sole<span className="text-[#F5B942]">Craft</span>
          </h1>

          <p className="text-[#111827]/60 mt-2 font-medium">
            Welcome back, collector.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#111827]/70 ml-1" htmlFor="email">
              Email Address
            </label>

            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 transition-colors group-focus-within:text-[#D99A20]" />

              <input
                id="email"
                type="email"
                value={email}
                onChange={onChange}
                className="w-full bg-white border border-[#CBD5E1]/80 rounded-xl py-3 pl-11 pr-4 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/50 focus:border-[#F5B942] focus:bg-white transition-all shadow-sm"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-[#111827]/70" htmlFor="password">
                Password
              </label>

              <a href="#" className="text-xs text-[#D99A20] hover:text-[#071A2F] transition-colors font-semibold">
                Forgot password?
              </a>
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 transition-colors group-focus-within:text-[#D99A20]" />

              <input
                id="password"
                type="password"
                value={password}
                onChange={onChange}
                className="w-full bg-white border border-[#CBD5E1]/80 rounded-xl py-3 pl-11 pr-4 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/50 focus:border-[#F5B942] focus:bg-white transition-all shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F5B942] text-[#071A2F] font-black py-4 rounded-xl hover:bg-[#D99A20] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-lg shadow-[#F5B942]/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-[#111827]/60 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#D99A20] font-semibold hover:text-[#071A2F] transition-colors">
            Create account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;