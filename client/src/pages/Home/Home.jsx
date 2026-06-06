import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, reset } from '../../store/slices/productSlice';
import ProductCard from '../../components/products/ProductCard.jsx';
import {
  Loader2,
  AlertCircle,
  ArrowRight,
  Zap,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import LandingPg1 from '../../assets/images/LandingPg1.png';
import LandingPg2 from '../../assets/images/LandingPg2.png';
import LandingPg3 from '../../assets/images/LandingPg3.png';
import LandingPg4 from '../../assets/images/LandingPg4.png';

const sliderImages = [LandingPg1, LandingPg2, LandingPg3, LandingPg4];

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4500);

    return () => {
      dispatch(reset());
      clearInterval(timer);
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
      <section className="relative min-h-[calc(100vh-130px)] flex items-start px-3 md:px-5 pt-4 pb-6 bg-[#F8FAFC]">
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-[1550px] mx-auto h-[560px] overflow-hidden rounded-[3rem] border border-[#CBD5E1]/70 shadow-[0_35px_80px_rgba(7,26,47,0.18)]"
        >
          {/* Full Container Image Slider */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={sliderImages[currentSlide]}
              alt={`SoleCraft slide ${currentSlide + 1}`}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A2F]/90 via-[#071A2F]/55 to-[#071A2F]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {/* Text on Left Side */}
          <div className="relative z-10 h-full flex items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full max-w-xl pl-10 pr-6 md:pl-16 md:pr-10 lg:pl-20 lg:pr-12"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-white/95 border border-white/60 text-[#D99A20] text-[13px] font-bold uppercase tracking-widest mb-4 shadow-sm">
                Exclusive Drop 2026
              </span>

              <h1 className="inline-block text-4xl md:text-6xl xl:text-7xl font-black italic tracking-tighter leading-none uppercase mb-4 text-white">
                <span className="block">Step Into</span>
                <span className="block">The</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5B942] to-[#D99A20]">
                  Future.
                </span>
              </h1>

              <p className="text-base md:text-lg text-white/80 max-w-md mb-6 leading-relaxed">
                Experience the evolution of footwear. SoleCraft brings you
                limited-edition designs that combine high-performance tech with
                street-ready style.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/search?all=true">
                  <button className="px-7 py-3.5 bg-[#F5B942] text-[#071A2F] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#D99A20] transition-all flex items-center gap-2 group shadow-xl shadow-[#F5B942]/25 active:scale-95">
                    Explore Collection
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>

                <Link to="/about">
                  <button className="px-7 py-3.5 bg-white/95 border border-white/60 text-[#071A2F] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#071A2F] hover:text-white transition-all shadow-sm active:scale-95">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-3">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx
                  ? 'w-10 bg-[#F5B942]'
                  : 'w-3 bg-white/55 hover:bg-white/80'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
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
              Don't miss out on our most anticipated releases. Limited stock
              available.
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
                <h3 className="font-black uppercase italic text-lg mb-1">
                  Stock Error
                </h3>
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
                <motion.div
                  key={product._id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-20 text-center">
            <Link to="/search?all=true">
              <button className="px-12 py-5 border-2 border-[#071A2F]/15 rounded-2xl text-[#071A2F] font-black uppercase tracking-[0.2em] hover:bg-[#071A2F] hover:text-white transition-all duration-500 active:scale-95">
                View All Products
              </button>
            </Link>
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
              Be the first to know about secret releases, restocks, and
              exclusive member discounts.
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