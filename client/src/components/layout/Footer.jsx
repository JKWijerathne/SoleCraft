import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, Phone, MapPin, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'Men', path: '/men' },
    { name: 'Woman', path: '/woman' },
    { name: 'Girls', path: '/girls' },
    { name: 'Boys', path: '/boys' },
    { name: 'Sale', path: '/sale' },
    { name: 'About us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const customerCare = [
    { name: 'Order Status', path: '/orders' },
    { name: 'Shipping & Delivery', path: '/shipping' },
    { name: 'Returns & Swaps', path: '/returns' },
    { name: 'Size Guide', path: '/size-guide' },
    { name: 'FAQs', path: '/faqs' }
  ];

  return (
    <footer className="solecraft-footer relative overflow-hidden border-t border-white/10 bg-[#0b0f19] pt-20 pb-10 text-gray-400 mt-auto">
      {/* Decorative Blur Spheres */}
      <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-[250px] h-[250px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Grid: Brand, Links, Info, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black italic tracking-tighter text-white uppercase">
                Sole<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Craft</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 font-medium max-w-sm">
              Experience the evolution of footwear. We bring you premium, limited-edition sneakers combining cutting-edge comfort tech with elite street-ready design.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-3 pt-2">
              {[
                { 
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  ), 
                  url: 'https://instagram.com', 
                  label: 'Instagram' 
                },
                { 
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  ), 
                  url: 'https://facebook.com', 
                  label: 'Facebook' 
                },
                { 
                  icon: (
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ), 
                  url: 'https://twitter.com', 
                  label: 'Twitter' 
                }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-purple-500/50 transition-all shadow-md"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase italic tracking-wider text-sm border-l-2 border-purple-500 pl-3">
              Explore
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {mainLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="hover:text-white transition-colors flex items-center gap-2 group font-medium"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase italic tracking-wider text-sm border-l-2 border-blue-500 pl-3">
              Contact Info
            </h4>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-gray-400">
                  123 Sneaker Plaza, Hype Street, Colombo, Sri Lanka
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                <div className="flex flex-col text-gray-400">
                  <span>+94 11 234 5678</span>
                  <span className="text-xs text-gray-500 font-bold">+94 77 987 6543</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-gray-400">support@solecraft.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter / Necessary Part */}
          <div className="space-y-6">
            <h4 className="text-white font-black uppercase italic tracking-wider text-sm border-l-2 border-purple-500 pl-3">
              Join the Drop List
            </h4>
            <p className="text-xs leading-relaxed text-gray-400 font-medium">
              Subscribe to get secret release notifications, restocking alerts, and private member drop details.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative flex">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-xs font-bold text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all tracking-widest"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-black hover:bg-purple-500 hover:text-white rounded-xl transition-all shadow-md"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Middle Section: Trust Badges / Necessary Parts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-white/5 my-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold uppercase text-xs tracking-wider mb-1">Express Delivery</h5>
              <p className="text-xs text-gray-500 font-semibold">Free courier shipping on all orders over $150</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold uppercase text-xs tracking-wider mb-1">100% Authentic Guaranteed</h5>
              <p className="text-xs text-gray-500 font-semibold">Every single pair verified by expert team</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white font-bold uppercase text-xs tracking-wider mb-1">30-Day Free Returns</h5>
              <p className="text-xs text-gray-500 font-semibold">Hassle-free size swaps & full refunds</p>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Payment Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-bold tracking-wider text-gray-600 uppercase text-center md:text-left">
            <span>© {currentYear} SOLECRAFT // ALL RIGHTS RESERVED</span>
            <span className="hidden md:inline text-white/10">|</span>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          
          {/* Payment Icons Simulation */}
          <div className="flex items-center gap-2 opacity-60">
            {['Visa', 'Mastercard', 'Paypal', 'ApplePay'].map((brand, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black tracking-widest text-white uppercase select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
