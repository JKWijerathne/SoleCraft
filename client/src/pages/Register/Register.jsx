import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../../store/slices/authSlice';
import {
  Mail,
  Lock,
  User,
  UserPlus,
  Loader2,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import loginBg from '../../assets/images/loginPage.png';

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
    <div 
      className="min-h-[calc(100vh+120px)] relative overflow-hidden flex items-center justify-center lg:justify-end p-4 lg:pr-[12%] xl:pr-[15%] bg-cover bg-center -mt-[120px] pt-[120px]"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-6 sm:p-8 relative overflow-hidden z-10 -mt-16 lg:-mt-24"
      >
        <div className="text-center mb-8 relative z-10">
          <motion.div
            initial={{ scale: 0.85, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="mx-auto flex items-center justify-center mb-4"
          >
            <motion.img
              src="/Logo.png"
              alt="SoleCraft Logo"
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-20 h-20 object-contain"
            />
          </motion.div>

          <h1 className="text-4xl font-black italic tracking-tighter text-[#071A2F] mb-2 uppercase">
            Sole<span className="text-[#F5B942]">Craft</span>
          </h1>

          <p className="text-[#111827]/60 font-medium">
            Create your account to start your collection
          </p>
        </div>

        <AnimatePresence mode="wait">
          {(error || validationError) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error || validationError}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
        >
          <div className="space-y-2 md:col-span-2">
            <label
              className="text-xs font-bold text-[#111827]/60 uppercase tracking-wider ml-1"
              htmlFor="name"
            >
              Full Name
            </label>

            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 transition-colors group-focus-within:text-[#D99A20]" />

              <input
                id="name"
                type="text"
                value={name}
                onChange={onChange}
                className="w-full bg-white border border-[#CBD5E1]/80 rounded-2xl py-3.5 pl-12 pr-4 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/50 focus:border-[#F5B942] focus:bg-white transition-all shadow-sm"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label
              className="text-xs font-bold text-[#111827]/60 uppercase tracking-wider ml-1"
              htmlFor="email"
            >
              Email Address
            </label>

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 transition-colors group-focus-within:text-[#D99A20]" />

              <input
                id="email"
                type="email"
                value={email}
                onChange={onChange}
                className="w-full bg-white border border-[#CBD5E1]/80 rounded-2xl py-3.5 pl-12 pr-4 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/50 focus:border-[#F5B942] focus:bg-white transition-all shadow-sm"
                placeholder="john@solecraft.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-xs font-bold text-[#111827]/60 uppercase tracking-wider ml-1"
              htmlFor="password"
            >
              Password
            </label>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 transition-colors group-focus-within:text-[#D99A20]" />

              <input
                id="password"
                type="password"
                value={password}
                onChange={onChange}
                className="w-full bg-white border border-[#CBD5E1]/80 rounded-2xl py-3.5 pl-12 pr-4 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/50 focus:border-[#F5B942] focus:bg-white transition-all shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-xs font-bold text-[#111827]/60 uppercase tracking-wider ml-1"
              htmlFor="confirmPassword"
            >
              Confirm
            </label>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 transition-colors group-focus-within:text-[#D99A20]" />

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={onChange}
                className="w-full bg-white border border-[#CBD5E1]/80 rounded-2xl py-3.5 pl-12 pr-4 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/50 focus:border-[#F5B942] focus:bg-white transition-all shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full mt-4 bg-[#F5B942] text-[#071A2F] font-black py-4 rounded-2xl hover:bg-[#D99A20] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-lg shadow-[#F5B942]/25"
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

        <div className="mt-8 text-center text-[#111827]/60 text-sm font-medium">
          Already a member?{' '}
          <Link
            to="/login"
            className="text-[#D99A20] hover:text-[#071A2F] transition-colors underline underline-offset-4 decoration-[#F5B942]/60 font-semibold"
          >
            Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;