import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const API_URL = import.meta.env.VITE_API_URL + '/auth';
      const res = await axios.post(`${API_URL}/forgot-password`, { email });
      setMessage(res.data.message);
      setStatus('success');
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
        {/* Back link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-[#111827]/50 hover:text-[#D99A20] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="flex items-center justify-center mb-5"
          >
            <motion.img
              src="/Logo.png"
              alt="SoleCraft Logo"
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="w-16 h-16 object-contain"
            />
          </motion.div>
          <h1 className="text-3xl font-black italic tracking-tighter text-[#071A2F] text-center uppercase mb-2">
            Sole<span className="text-[#F5B942]">Craft</span>
          </h1>
          <p className="text-[#111827]/60 text-center font-medium text-sm">
            {status === 'success'
              ? 'Check your inbox'
              : 'Reset your password'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* Success state */
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
              <p className="text-[#111827]/70 text-sm leading-relaxed mb-6">
                {message}
              </p>
              <p className="text-[#111827]/45 text-xs leading-relaxed">
                Didn't receive it? Check your spam folder or{' '}
                <button
                  onClick={() => { setStatus('idle'); setMessage(''); setEmail(''); }}
                  className="text-[#D99A20] font-semibold hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </motion.div>
          ) : (
            /* Form state */
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-[#111827]/60 text-sm leading-relaxed mb-6">
                Enter the email address associated with your account and we'll
                send you a link to reset your password.
              </p>

              {/* Error alert */}
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
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#111827]/70 ml-1" htmlFor="fp-email">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#111827]/40 transition-colors group-focus-within:text-[#D99A20]" />
                    <input
                      id="fp-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#CBD5E1]/80 rounded-xl py-3 pl-11 pr-4 text-[#071A2F] placeholder:text-[#111827]/35 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/50 focus:border-[#F5B942] transition-all shadow-sm"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#F5B942] text-[#071A2F] font-black py-4 rounded-xl hover:bg-[#D99A20] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-widest shadow-lg shadow-[#F5B942]/25"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Reset Link
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
