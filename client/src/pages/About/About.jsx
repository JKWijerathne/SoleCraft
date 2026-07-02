import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingPg2 from '../../assets/images/LandingPg2.png';

const bodyFont = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

const headingFont = {
  letterSpacing: '-0.045em',
};

const About = () => {
  useEffect(() => {
    // Fonts are now handled globally in index.css
  }, []);

  const stats = [
    { label: 'Happy Customers', value: '10k+' },
    { label: 'Curated Styles', value: '500+' },
    { label: 'Partner Brands', value: '50+' },
    { label: 'Support Window', value: '24/7' },
  ];

  const features = [
    {
      icon: ShoppingBag,
      title: 'Curated Styles',
      description:
        'Every pair is selected for strong materials, clean design, and everyday comfort.',
    },
    {
      icon: BadgeCheck,
      title: 'Trusted Quality',
      description:
        'We focus on reliable footwear choices that match both style and long-term use.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description:
        'Orders are packed carefully and delivered through trusted delivery partners.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      description:
        'Your account details and payments are handled through protected checkout flows.',
    },
  ];

  return (
    <div
      style={bodyFont}
      className="flex-1 overflow-hidden bg-[#F4E9E0] text-[#111827] selection:bg-[#F5B942]/35 selection:text-[#071A2F] antialiased"
    >
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 pt-4 pb-12 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="relative mx-auto max-w-[1400px] min-h-[500px] md:min-h-[580px] overflow-hidden rounded-[2rem] bg-[#071A2F]"
        >
          <img
            src={LandingPg2}
            alt="SoleCraft footwear collection"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

          <div className="relative z-10 flex min-h-[500px] md:min-h-[580px] flex-col justify-center px-8 md:px-16 lg:px-24">
            <motion.span
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#F5B942]" />
              About SoleCraft
            </motion.span>

            <h1
              style={headingFont}
              className="max-w-2xl text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl xl:text-7xl"
            >
              Built For
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5B942] to-[#D99A20]">
                Every Step.
              </span>
            </h1>

            <motion.p
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/85 md:text-xl"
            >
              SoleCraft brings stylish, comfortable, and reliable footwear into one clean shopping experience.
              From everyday pairs to standout styles, we help you step forward with confidence.
            </motion.p>

            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link to="/search?all=true">
                <button className="inline-flex items-center gap-2 rounded-lg bg-[#F5B942] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#071A2F] transition-colors hover:bg-[#D99A20]">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>

              <Link to="/contact">
                <button className="rounded-lg bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-[#071A2F] transition-colors hover:bg-[#F3EFE6]">
                  Contact Us
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Story + Stats Section */}
      <section className="px-4 md:px-8 py-16 bg-transparent">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D99A20]">
              Our Story
            </span>

            <h2
              style={headingFont}
              className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[#071A2F] md:text-5xl"
            >
              Footwear with style, comfort, and trust.
            </h2>

            <p className="mt-6 text-base font-medium leading-8 text-[#071A2F]/65">
              We started SoleCraft for shoppers who care about more than just appearance.
              Our goal is to make footwear shopping simple, stylish, and dependable.
            </p>

            <p className="mt-4 text-base font-medium leading-8 text-[#071A2F]/65">
              Instead of making customers scroll through endless options, we focus on carefully selected
              footwear that suits daily wear, special occasions, and modern fashion needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.5rem] border border-[#E8E2D9] bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F5B942]/60 hover:bg-white hover:shadow-xl hover:shadow-[#071A2F]/10 md:p-8"
              >
                <div
                  style={headingFont}
                  className="text-4xl font-bold tracking-tight text-[#071A2F] md:text-5xl"
                >
                  {stat.value}
                </div>

                <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#071A2F]/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why SoleCraft Section */}
      <section className="px-4 md:px-8 py-20 bg-[#F3EFE6]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D99A20]">
                Why SoleCraft
              </span>

              <h2
                style={headingFont}
                className="text-4xl font-bold leading-tight tracking-tight text-[#071A2F] md:text-5xl"
              >
                Made to move better.
              </h2>
            </div>

            <p className="max-w-md text-sm font-medium leading-7 text-[#071A2F]/60">
              Our shopping experience is designed to feel clean, secure, and easy from product discovery
              to checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[1.5rem] border border-white/60 bg-white/70 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-[#071A2F]/10"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5B942]/20 text-[#D99A20]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3
                    style={headingFont}
                    className="mb-3 text-xl font-bold tracking-tight text-[#071A2F]"
                  >
                    {feature.title}
                  </h3>

                  <p className="text-sm font-medium leading-7 text-[#071A2F]/60">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 md:px-8 py-20 bg-transparent">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] bg-[#071A2F] p-8 shadow-[0_30px_60px_-35px_rgba(7,26,47,0.55)] md:p-10"
          >
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F5B942]">
              Our Mission
            </span>

            <h2
              style={headingFont}
              className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl"
            >
              A better way to find your next pair.
            </h2>

            <p className="mt-6 text-base font-medium leading-8 text-white/70">
              We want every customer to feel confident when choosing footwear online. That means clear
              product presentation, reliable service, secure checkout, and a collection that feels useful,
              not overwhelming.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="rounded-[1.5rem] border border-[#E8E2D9] bg-white/70 p-7 shadow-sm">
              <h3
                style={headingFont}
                className="mb-3 text-2xl font-bold tracking-tight text-[#071A2F]"
              >
                Clean Shopping
              </h3>
              <p className="text-sm font-medium leading-7 text-[#071A2F]/60">
                Simple navigation, clear categories, and product-focused pages help customers shop faster.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#E8E2D9] bg-white/70 p-7 shadow-sm">
              <h3
                style={headingFont}
                className="mb-3 text-2xl font-bold tracking-tight text-[#071A2F]"
              >
                Everyday Value
              </h3>
              <p className="text-sm font-medium leading-7 text-[#071A2F]/60">
                We balance style, comfort, and affordability so customers can find pairs for every routine.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 pb-20 bg-transparent">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[2rem] border border-white/50 bg-[#071A2F] p-8 shadow-[0_30px_60px_-35px_rgba(7,26,47,0.6)] md:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#F5B942]">
              <Users className="h-4 w-4" />
              Join The Rotation
            </div>

            <h2
              style={headingFont}
              className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl"
            >
              Need help finding the right pair?
            </h2>

            <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-white/70 md:text-base">
              Tell us what you are looking for and we will help you discover styles that fit your needs.
            </p>
          </div>

          <Link to="/contact">
            <button className="inline-flex items-center gap-3 rounded-lg bg-[#F5B942] px-8 py-3.5 text-sm font-semibold tracking-wide text-[#071A2F] shadow-md transition-all hover:bg-[#D99A20] active:scale-[0.98]">
              Talk To Us
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;