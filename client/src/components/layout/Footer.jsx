import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerColumns = [
    {
      title: 'Explore',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Men', path: '/men' },
        { name: 'Women', path: '/woman' },
        { name: 'Girls', path: '/girls' },
        { name: 'Boys', path: '/boys' },
        { name: 'Sale', path: '/sale' }
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Order Tracking', path: '/orders' },
        { name: 'Returns & Exchanges', path: '/returns' },
        { name: 'Size Guide', path: '/size-guide' },
        { name: 'FAQs', path: '/faqs' }
      ]
    },
    {
      title: 'Ways to Shop',
      links: [
        { name: 'New Arrivals', path: '/new-arrivals' },
        { name: 'Best Sellers', path: '/best-sellers' },
        { name: 'Limited Drops', path: '/drops' },
        { name: 'Gift Cards', path: '/gift-cards' },
        { name: 'Student Offers', path: '/student-offers' },
        { name: 'Store Locator', path: '/stores' }
      ]
    }
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      url: 'https://instagram.com',
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      label: 'Facebook',
      url: 'https://facebook.com',
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      label: 'X',
      url: 'https://twitter.com',
      icon: (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-auto bg-[#020617] text-white">
      <button
        onClick={scrollToTop}
        className="absolute right-5 top-5 hidden items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 transition hover:text-[#F5B942] md:flex"
      >
        <ChevronUp className="h-4 w-4" />
        Top
      </button>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-9 border-b border-white/10 pb-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden flex-shrink-0">
                <img src="/Logo.png" alt="SoleCraft Logo" className="w-full h-full object-cover" />
              </div>

              <span className="text-2xl font-extrabold uppercase tracking-tight">
                Sole<span className="text-[#F5B942]">Craft</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm font-medium leading-6 text-slate-400">
              Premium footwear for bold street style, everyday comfort, and confident movement.
            </p>

            <div className="mt-5 space-y-2 text-xs font-medium text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F5B942]" />
                <span>Colombo, Sri Lanka</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#F5B942]" />
                <span>+94 77 987 6543</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#F5B942]" />
                <span>support@solecraft.com</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wide text-white">
                {column.title}
              </h4>

              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-xs font-medium text-slate-400 transition hover:text-[#F5B942]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-extrabold uppercase tracking-wide text-white">
              Join the Drop List
            </h4>

            <p className="mb-4 text-xs font-medium leading-5 text-slate-400">
              Get early access to sneaker drops, restocks, offers, and exclusive releases.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex h-11 overflow-hidden rounded-md border border-white/15 bg-white"
            >
              <input
                type="email"
                placeholder="Email address"
                required
                className="min-w-0 flex-1 px-3 text-sm font-medium text-[#020617] placeholder:text-slate-400 focus:outline-none"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="flex w-11 items-center justify-center bg-[#F5B942] text-[#020617] transition hover:bg-[#D99A20]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-[#F5B942] hover:bg-[#F5B942] hover:text-[#020617]"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 md:flex-row">
          <p className="text-center text-[11px] font-medium text-slate-500 md:text-left">
            Copyright © {currentYear} SoleCraft. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium text-slate-500">
            <Link to="/terms" className="transition hover:text-[#F5B942]">
              Terms of Use
            </Link>
            <Link to="/privacy" className="transition hover:text-[#F5B942]">
              Privacy Policy
            </Link>
            <Link to="/shipping" className="transition hover:text-[#F5B942]">
              Shipping Policy
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {['Visa', 'Mastercard', 'PayPal', 'ApplePay'].map((brand) => (
              <span
                key={brand}
                className="rounded border border-white/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-widest text-slate-400"
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