import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, reset } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard.jsx';
import { Loader2, AlertCircle, ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';

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
    <div className="home-container overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] bg-blue-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
              Exclusive Drop 2024
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase mb-6">
              Step Into The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400">Future.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-lg mb-10 leading-relaxed">
              Experience the evolution of footwear. SoleCraft brings you limited-edition designs that combine high-performance tech with street-ready style.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-2 group shadow-xl shadow-white/5">
                Explore Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
            animate={{ scale: 1, opacity: 1, rotate: -5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 drop-shadow-[0_35px_35px_rgba(139,92,246,0.3)]">
              <img
                src="/hero-sneaker.png"
                alt="Featured Sneaker"
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Background elements for the image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-[100px] z-0 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative z-10 bg-[#0c1222]/50 backdrop-blur-3xl border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: "Instant Response", desc: "Energy-returning cushioning for maximum comfort." },
            { icon: <ShieldCheck className="w-8 h-8 text-green-400" />, title: "Authentic Only", desc: "Every pair is verified by our team of experts." },
            { icon: <Truck className="w-8 h-8 text-blue-400" />, title: "Express Shipping", desc: "Get your kicks delivered in record time." }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-black uppercase italic mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-purple-500 font-bold uppercase tracking-[0.3em] text-xs mb-3 block">Marketplace</span>
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white">Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Heat.</span></h2>
            </div>
            <p className="text-gray-400 max-w-md font-medium">
              Don't miss out on our most anticipated releases. Limited stock available.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-purple-500 mb-4" size={48} />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Syncing inventory...</p>
            </div>
          ) : error ? (
            <div className="p-8 rounded-[2.5rem] bg-red-500/10 border border-red-500/20 text-red-400 max-w-2xl mx-auto flex items-center gap-6">
              <AlertCircle size={32} />
              <div>
                <h3 className="font-black uppercase italic text-lg mb-1">Stock Error</h3>
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 rounded-[3rem] bg-white/5 border border-dashed border-white/10">
              <h3 className="text-2xl font-black uppercase italic text-gray-500 mb-2">Vault is Empty</h3>
              <p className="text-gray-600 font-medium tracking-wide uppercase text-xs">New arrivals dropping soon</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {products.slice(0, 8).map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-20 text-center">
            <button className="px-12 py-5 border-2 border-white/10 rounded-2xl text-white font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto p-12 md:p-20 rounded-[3.5rem] bg-gradient-to-br from-purple-600 to-blue-700 relative overflow-hidden shadow-3xl shadow-purple-500/20">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none mb-8">
              Get Notified <br />On Drops.
            </h2>
            <p className="text-purple-100 text-lg font-medium mb-10 opacity-80">
              Be the first to know about secret releases, restocks, and exclusive member discounts.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="flex-1 px-8 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-bold tracking-widest"
              />
              <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all shadow-xl">
                Subscribe
              </button>
            </form>
          </div>

          {/* Abstract Background Design */}
          <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rotate-45">
              <div className="w-full h-full border-[40px] border-white rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
