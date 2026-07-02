import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Clock3, Loader2, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const API_URL = `${import.meta.env.VITE_API_URL}/contact`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send your message. Please try again.');
      }

      setStatus({
        type: 'success',
        message: data.message || 'Your message was sent successfully. We will get back to you shortly.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Failed to send your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'jkwijerathne7@gmail.com',
      href: 'mailto:jkwijerathne7@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+94 12 3456 789',
      href: 'tel:+94123456789',
    },
    {
      icon: MapPin,
      label: 'Showroom',
      value: '123 Sneaker Street, Colombo, Sri Lanka',
    },
  ];

  const inputClassName = 'w-full rounded-2xl border border-[#CBD5E1]/80 bg-white px-5 py-4 text-[#071A2F] shadow-sm outline-none transition-all placeholder:text-[#111827]/35 focus:border-[#F5B942] focus:ring-2 focus:ring-[#F5B942]/50';
  const labelClassName = 'mb-2 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#071A2F]';

  return (
    <div className="flex-1 overflow-hidden bg-transparent text-[#111827] selection:bg-[#F5B942]/35 selection:text-[#071A2F]">
      <section className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mx-auto max-w-7xl rounded-[3rem] border border-[#CBD5E1]/70 bg-white p-7 shadow-[0_35px_80px_rgba(7,26,47,0.10)] sm:p-10 lg:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#F5B942]/20 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.24em] text-[#D99A20]">
                <MessageCircle className="h-4 w-4" />
                Contact SoleCraft
              </span>
              <h1 className="text-5xl font-extrabold uppercase leading-none tracking-tighter text-[#071A2F] sm:text-6xl lg:text-7xl">
                Let&apos;s Talk
                <span className="block text-[#D99A20]">
                  Footwear.
                </span>
              </h1>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-base font-medium leading-8 text-[#111827]/65 sm:text-lg">
                Questions about sizing, delivery, returns, or a specific drop? Send a note and our team
                will help you get to the right pair faster.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-[#CBD5E1]/70 bg-transparent px-4 py-3">
                  <Clock3 className="h-5 w-5 text-[#D99A20]" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#071A2F]">
                    Replies within 24h
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[#CBD5E1]/70 bg-transparent px-4 py-3">
                  <ShieldCheck className="h-5 w-5 text-[#D99A20]" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#071A2F]">
                    Secure support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-32 overflow-hidden rounded-[2.5rem] border border-[#CBD5E1]/70 bg-[#071A2F] p-7 text-white shadow-[0_30px_60px_-24px_rgba(7,26,47,0.45)] sm:p-8">
              <h2 className="text-2xl font-extrabold tracking-tight leading-tight">
                Get In Touch
              </h2>
              <p className="mt-3 text-sm font-medium leading-7 text-[#CBD5E1]">
                Reach us directly for order support, product questions, or store enquiries.
              </p>

              <div className="mt-8 space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  const content = (
                    <>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5B942] text-[#071A2F]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F5B942]">
                          {method.label}
                        </p>
                        <p className="font-semibold leading-6 text-white">
                          {method.value}
                        </p>
                      </div>
                    </>
                  );

                  return method.href ? (
                    <a
                      key={method.label}
                      href={method.href}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-[#F5B942]/70 hover:bg-white/10"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={method.label}
                      className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-[#F5B942]/30 bg-[#F5B942]/10 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#F5B942]">
                  Store Hours
                </p>
                <p className="mt-2 text-sm font-semibold leading-7 text-white">
                  Monday to Saturday<br />
                  9:00 AM - 7:00 PM
                </p>
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8"
          >
            <div className="rounded-[2.5rem] border border-[#CBD5E1]/70 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#CBD5E1]/70 pb-6 md:flex-row md:items-end">
                <div>
                  <span className="mb-2 block text-xs font-extrabold uppercase tracking-[0.3em] text-[#D99A20]">
                    Support Form
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight leading-tight text-[#071A2F] sm:text-4xl">
                    Send Us A Message
                  </h2>
                </div>
                <p className="max-w-sm text-sm font-medium leading-6 text-[#111827]/60">
                  Include your order number if your message is about an existing purchase.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {status.message && (
                  <div
                    className={`flex items-start gap-3 rounded-2xl border px-5 py-4 ${
                      status.type === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-red-200 bg-red-50 text-red-700'
                    }`}
                    role="status"
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                    )}
                    <p className="text-sm font-bold leading-6">{status.message}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClassName}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className={inputClassName}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClassName}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className={inputClassName}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClassName}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className={inputClassName}
                    placeholder="Sizing, delivery, returns..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClassName}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    rows={6}
                    className={`${inputClassName} resize-none`}
                    placeholder="Tell us how we can help."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#F5B942] px-8 py-5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#071A2F] shadow-xl shadow-[#F5B942]/25 transition-all hover:bg-[#D99A20] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
