import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const { password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const getStrength = (pwd) => {
    if (pwd.length === 0) return { label: '', color: '', width: '0%' };
    if (pwd.length < 6) return { label: 'Too short', color: '#EF4444', width: '20%' };
    if (pwd.length < 8) return { label: 'Weak', color: '#F97316', width: '40%' };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd))
      return { label: 'Fair', color: '#EAB308', width: '65%' };
    return { label: 'Strong', color: '#22C55E', width: '100%' };
  };

  const strength = getStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setStatus('error');
      setMessage('Password must be at least 6 characters.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const API_URL = import.meta.env.VITE_API_URL + '/auth';
      const res = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      setMessage(res.data.message);
      setStatus('success');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setMessage(
        err?.response?.data?.message || 'Something went wrong. Please try again.'
      );
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#F8FAFC] flex items-center justify-center p-4">
      {/* Background glows */}
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
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="flex items-center justify-center mb-4"
          >
            <motion.img
              src="/Logo.png"
              alt="SoleCraft Logo"
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-16 h-16 object-contain"
            />
          </motion.div>
          <h1 className="text-3xl font-black italic tracking-tighter text-[#071A2F] uppercase mb-2">
            Sole<span className="text-[#F5B942]">Craft</span>
          </h1>
          <p className="text-[#111827]/60 font-medium text-sm">
            {status === 'success' ? 'Password updated!' : 'Create a new password'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* ── Success state ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
              <p className="text-[#111827]/70 text-sm leading-relaxed mb-2">{message}</p>
              <p className="text-[#111827]/40 text-xs">Redirecting to login in 3 seconds…</p>
              <Link
                to="/login"
                className="inline-block mt-6 text-sm text-[#D99A20] font-semibold hover:text-[#071A2F] transition-colors"
              >
                Go to Login →
              </Link>
            </motion.div>
          ) : (
            /* ── Form state ── */
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Error banner */}
              <AnimatePresence>
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-5 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{message}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* New password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#111827]/70 ml-1" htmlFor="password">
                    New Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 transition-colors group-focus-within:text-[#D99A20]" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={onChange}
                      className="w-full bg-white border border-[#CBD5E1]/80 rounded-xl py-3 pl-11 pr-11 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/50 focus:border-[#F5B942] transition-all shadow-sm"
                      placeholder="Min. 6 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111827]/40 hover:text-[#D99A20] transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {password.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-1">
                      <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: strength.color }}
                          initial={{ width: '0%' }}
                          animate={{ width: strength.width }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <p className="text-xs mt-1" style={{ color: strength.color }}>
                        {strength.label}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#111827]/70 ml-1" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 transition-colors group-focus-within:text-[#D99A20]" />
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={onChange}
                      className={`w-full bg-white border rounded-xl py-3 pl-11 pr-11 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 transition-all shadow-sm ${
                        confirmPassword.length > 0 && confirmPassword !== password
                          ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                          : 'border-[#CBD5E1]/80 focus:ring-[#F5B942]/50 focus:border-[#F5B942]'
                      }`}
                      placeholder="Re-enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#111827]/40 hover:text-[#D99A20] transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && confirmPassword !== password && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-red-500 ml-1"
                    >
                      Passwords don't match
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#F5B942] text-[#071A2F] font-black py-4 rounded-xl hover:bg-[#D99A20] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-lg shadow-[#F5B942]/25 mt-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating…
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Reset Password
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-[#111827]/50 mt-6">
                Remember it?{' '}
                <Link
                  to="/login"
                  className="text-[#D99A20] font-semibold hover:text-[#071A2F] transition-colors"
                >
                  Back to Login
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
