import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, reset } from '../../store/slices/productSlice';
import ProductCard from '../../components/products/ProductCard.jsx';
import { Loader2, AlertCircle, ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="overflow-hidden bg-[#F8FAFC] text-[#111827] selection:bg-[#F5B942]/35 selection:text-[#071A2F]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20 bg-[#F8FAFC]">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-[#F5B942]/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] bg-[#071A2F]/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#CBD5E1]/70 text-[#D99A20] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              Exclusive Drop 2024
            </span>

            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase mb-6 text-[#071A2F]">
              Step Into The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#071A2F] via-[#D99A20] to-[#F5B942]">
                Future.
              </span>
            </h1>

            <p className="text-xl text-[#111827]/65 max-w-lg mb-10 leading-relaxed">
              Experience the evolution of footwear. SoleCraft brings you limited-edition designs that combine high-performance tech with street-ready style.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#F5B942] text-[#071A2F] font-black uppercase tracking-widest rounded-2xl hover:bg-[#D99A20] transition-all flex items-center gap-2 group shadow-xl shadow-[#F5B942]/25 active:scale-95">
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 bg-white border border-[#CBD5E1]/70 text-[#071A2F] font-black uppercase tracking-widest rounded-2xl hover:bg-[#071A2F] hover:text-white transition-all shadow-sm active:scale-95">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
            animate={{ scale: 1, opacity: 1, rotate: -5 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative z-10 drop-shadow-[0_35px_35px_rgba(7,26,47,0.20)]">
              <img
                src="/hero-sneaker.png"
                alt="Featured Sneaker"
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-[#F5B942]/25 to-[#071A2F]/10 rounded-full blur-[100px] z-0 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative z-10 bg-white border-y border-[#CBD5E1]/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Zap className="w-8 h-8 text-[#D99A20]" />,
              title: 'Instant Response',
              desc: 'Energy-returning cushioning for maximum comfort.'
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-[#071A2F]" />,
              title: 'Authentic Only',
              desc: 'Every pair is verified by our team of experts.'
            },
            {
              icon: <Truck className="w-8 h-8 text-[#D99A20]" />,
              title: 'Express Shipping',
              desc: 'Get your kicks delivered in record time.'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] bg-[#F8FAFC] border border-[#CBD5E1]/60 hover:border-[#F5B942]/70 transition-all shadow-sm hover:shadow-xl hover:shadow-[#071A2F]/10"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-black uppercase italic mb-3 text-[#071A2F]">
                {feature.title}
              </h3>
              <p className="text-[#111827]/60 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#D99A20] font-bold uppercase tracking-[0.3em] text-xs mb-3 block">
                Marketplace
              </span>

              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-[#071A2F]">
                Latest{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D99A20] to-[#F5B942]">
                  Heat.
                </span>
              </h2>
            </div>

            <p className="text-[#111827]/60 max-w-md font-medium">
              Don't miss out on our most anticipated releases. Limited stock available.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#D99A20] mb-4" size={48} />
              <p className="text-[#111827]/60 font-bold uppercase tracking-widest text-xs">
                Syncing inventory...
              </p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-[2.5rem] bg-red-50 border border-red-200 text-red-600 max-w-2xl mx-auto flex items-center gap-6">
              <AlertCircle size={32} />
              <div>
                <h3 className="font-black uppercase italic text-lg mb-1">Stock Error</h3>
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 rounded-[3rem] bg-white border border-dashed border-[#CBD5E1] shadow-sm">
              <h3 className="text-2xl font-black uppercase italic text-[#071A2F]/60 mb-2">
                Vault is Empty
              </h3>
              <p className="text-[#111827]/45 font-medium tracking-wide uppercase text-xs">
                New arrivals dropping soon
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 [perspective:1000px]"
            >
              {products.slice(0, 8).map((product) => (
                <motion.div key={product._id} variants={itemVariants} className="h-full">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-20 text-center">
            <button className="px-12 py-5 border-2 border-[#071A2F]/15 rounded-2xl text-[#071A2F] font-black uppercase tracking-[0.2em] hover:bg-[#071A2F] hover:text-white transition-all duration-500 active:scale-95">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto p-12 md:p-20 rounded-[3.5rem] bg-[#071A2F] relative overflow-hidden shadow-[0_35px_60px_-15px_rgba(7,26,47,0.22)]">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none mb-8">
              Get Notified <br />On Drops.
            </h2>

            <p className="text-[#CBD5E1] text-lg font-medium mb-10 opacity-90">
              Be the first to know about secret releases, restocks, and exclusive member discounts.
            </p>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="flex-1 px-8 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-[#CBD5E1]/60 focus:outline-none focus:ring-2 focus:ring-[#F5B942]/70 focus:border-[#F5B942] transition-all font-bold tracking-widest"
              />

              <button className="px-10 py-5 bg-[#F5B942] text-[#071A2F] font-black uppercase tracking-widest rounded-2xl hover:bg-[#D99A20] transition-all shadow-xl active:scale-95">
                Subscribe
              </button>
            </form>
          </div>

          {/* Abstract Background Design */}
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-15">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rotate-45">
              <div className="w-full h-full border-[40px] border-[#F5B942] rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;