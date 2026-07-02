import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, reset } from '../../store/slices/productSlice';
import ProductCard from '../../components/products/ProductCard.jsx';
import {
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import LandingPg1 from '../../assets/images/LandingPg1.png';
import LandingPg2 from '../../assets/images/LandingPg2.png';
import LandingPg3 from '../../assets/images/LandingPg3.png';
import LandingPg4 from '../../assets/images/LandingPg4.png';

import menCategory from '../../assets/images/menCategory.jpg';
import womenCategory from '../../assets/images/womenCategory.jpg';
import boysCategory from '../../assets/images/boysCategory.jpg';
import girlsCategory from '../../assets/images/girlsCategory.jpg';
import salesCategory from '../../assets/images/salesCategory.jpg';
import salesSection from '../../assets/images/salesSection.png';

const sliderImages = [LandingPg1, LandingPg2, LandingPg3, LandingPg4];

const bodyFont = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const headingFont = {
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  letterSpacing: '-0.035em',
};

const Home = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.products);
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
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      style={bodyFont}
      className="bg-[#F4E9E0] text-[#111827] selection:bg-[#F5B942]/35 selection:text-[#071A2F] antialiased text-[15px]"
    >
      {/* Hero Section */}
      <section className="relative pt-4 pb-10 px-4 md:px-8 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-[1400px] mx-auto h-[500px] md:h-[600px] rounded-[2rem] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={sliderImages[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <motion.span
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[11px] font-bold uppercase tracking-[0.22em] mb-6 w-max"
            >
              New Arrivals
            </motion.span>

            <h1
              style={headingFont}
              className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.04] mb-6 text-white max-w-2xl"
            >
              <span className="block">Step Into The</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5B942] to-[#D99A20]">
                Future.
              </span>
            </h1>

            <motion.p
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/90 text-lg md:text-xl mb-10 max-w-lg font-semibold leading-8"
            >
              Explore our wide range of high-quality footwear at affordable prices. Step into style today.
            </motion.p>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/search?all=true">
                <button className="px-8 py-3.5 bg-[#F5B942] text-[#071A2F] text-sm font-bold tracking-wide rounded-lg hover:bg-[#D99A20] transition-colors flex items-center gap-2">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <Link to="/about">
                <button className="px-8 py-3.5 bg-white text-[#071A2F] text-sm font-bold tracking-wide rounded-lg hover:bg-[#F3EFE6] transition-colors">
                  Explore Deals
                </button>
              </Link>
            </motion.div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx
                    ? 'w-8 bg-[#F5B942]'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Bar */}
      <section className="py-10 bg-transparent border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="w-6 h-6 text-[#D99A20]" />,
                title: 'Free Shipping',
                desc: 'On orders over Rs. 5000',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-[#D99A20]" />,
                title: 'Secure Payment',
                desc: '100% secure payment',
              },
              {
                icon: <RefreshCw className="w-6 h-6 text-[#D99A20]" />,
                title: 'Easy Returns',
                desc: '30 days return policy',
              },
              {
                icon: <Clock className="w-6 h-6 text-[#D99A20]" />,
                title: '24/7 Support',
                desc: 'Dedicated support',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl hover:shadow-sm transition-shadow border border-white/40"
              >
                <div className="p-3 bg-white rounded-full shadow-sm">{feature.icon}</div>
                <div>
                  <h4
                    style={headingFont}
                    className="font-extrabold text-[#071A2F] text-[15px] mb-0.5 tracking-tight"
                  >
                    {feature.title}
                  </h4>
                  <p className="text-xs text-[#071A2F]/60 font-semibold">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Categories */}
      <section className="py-20 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-4">
            <h2
              style={headingFont}
              className="text-3xl md:text-4xl font-extrabold text-[#071A2F] leading-tight"
            >
              Shop by Categories
            </h2>

            <Link
              to="/search"
              className="text-sm font-bold text-[#071A2F]/60 hover:text-[#D99A20] flex items-center gap-1 transition-colors"
            >
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {[
              { name: 'Men', path: '/men', img: menCategory, label: "Men's Footwear" },
              { name: 'Women', path: '/women', img: womenCategory, label: "Women's Footwear" },
              { name: 'Boys', path: '/boys', img: boysCategory, label: "Boys' Footwear" },
              { name: 'Girls', path: '/girls', img: girlsCategory, label: "Girls' Footwear" },
              { name: 'Sale', path: '/sale', img: salesCategory, label: 'Sale & Offers' },
            ].map((cat, i) => (
              <Link key={i} to={cat.path} className="group flex flex-col items-center gap-4">
                <div className="relative w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span
                      style={headingFont}
                      className="block text-white font-extrabold text-lg leading-tight tracking-tight"
                    >
                      {cat.name}
                    </span>
                    <span className="block text-white/75 text-[11px] uppercase tracking-wider font-semibold mt-0.5">
                      {cat.label}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-20 px-6 bg-[#F3EFE6]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-4">
            <h2
              style={headingFont}
              className="text-3xl md:text-4xl font-extrabold text-[#071A2F] leading-tight"
            >
              Best Selling Products
            </h2>

            <Link
              to="/search?all=true"
              className="text-sm font-bold text-[#071A2F]/60 hover:text-[#D99A20] flex items-center gap-1 transition-colors"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-[#D99A20] mb-4" size={48} />
              <p className="text-[#071A2F]/60 font-bold text-sm">Loading products...</p>
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-red-50 text-red-600 max-w-2xl mx-auto flex items-center gap-4 border border-red-100">
              <AlertCircle size={24} />
              <p className="font-semibold">{error}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-[#F4E9E0] rounded-2xl border border-[#E8E2D9] shadow-sm">
              <p className="text-[#071A2F]/60 font-semibold">No products found.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
              {products.slice(0, 10).map((product) => (
                <motion.div key={product._id} variants={itemVariants} className="h-full">
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-20 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div
            className="rounded-[2.5rem] overflow-hidden relative shadow-sm border border-white/50"
            style={{ minHeight: '320px' }}
          >
            <img
              src={salesSection}
              alt="Special Offer"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center p-10 md:p-16 min-h-[320px]">
              <div className="max-w-lg">
                <span className="text-[11px] font-bold text-[#F5B942] uppercase tracking-[0.22em] mb-3 block">
                  Special Offer
                </span>

                <h2
                  style={headingFont}
                  className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"
                >
                  Up to 50% Off
                </h2>

                <p className="text-white/80 mb-8 font-semibold">
                  Limited time offer on selected items. Hurry up and grab the best deals while they last!
                </p>

                <Link to="/sale">
                  <button className="px-8 py-3.5 bg-[#F5B942] text-[#071A2F] text-sm font-bold tracking-wide rounded-lg hover:bg-[#D99A20] transition-all inline-flex items-center gap-2 shadow-md">
                    Shop the Sale <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-transparent border-t border-[#E8E2D9]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            style={headingFont}
            className="text-3xl md:text-4xl font-extrabold text-[#071A2F] mb-4 leading-tight"
          >
            Join Our Newsletter
          </h2>

          <p className="text-[#071A2F]/60 mb-10 font-semibold text-lg">
            Get updates on new arrivals, exclusive offers and more!
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-white border border-[#E8E2D9] rounded-lg focus:outline-none focus:border-[#D99A20] transition-colors font-semibold text-[#071A2F]"
            />

            <button className="px-10 py-4 bg-[#F5B942] text-[#071A2F] text-sm font-bold tracking-wide uppercase rounded-lg hover:bg-[#D99A20] transition-colors whitespace-nowrap shadow-sm">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;