import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ShieldCheck, ShoppingBag, Sparkles, Truck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import LandingPg2 from '../../assets/images/LandingPg2.png';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '10k+' },
    { label: 'Curated Styles', value: '500+' },
    { label: 'Partner Brands', value: '50+' },
    { label: 'Support Window', value: '24/7' },
  ];

  const features = [
    {
      icon: ShoppingBag,
      title: 'Curated Heat',
      description: 'Every pair is selected for strong materials, sharp silhouettes, and everyday wearability.',
    },
    {
      icon: BadgeCheck,
      title: 'Authentic Only',
      description: 'We verify our catalogue so your order arrives exactly as promised.',
    },
    {
      icon: Truck,
      title: 'Fast Dispatch',
      description: 'Orders are packed carefully and handed to trusted delivery partners without the long wait.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      description: 'Payments and account details are handled through protected checkout flows.',
    },
  ];

  return (
    <div className="flex-1 overflow-hidden bg-[#F8FAFC] text-[#111827] selection:bg-[#F5B942]/35 selection:text-[#071A2F]">
      <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto grid min-h-[520px] max-w-[1550px] overflow-hidden rounded-[3rem] border border-[#CBD5E1]/70 bg-[#071A2F] shadow-[0_35px_80px_rgba(7,26,47,0.18)] lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative z-10 flex flex-col justify-center px-7 py-14 sm:px-10 lg:px-16">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#F5B942]">
              <Sparkles className="h-4 w-4" />
              Since 2023
            </span>

            <h1 className="max-w-3xl text-5xl font-black italic uppercase leading-none tracking-tighter text-white sm:text-6xl lg:text-7xl">
              Built For
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5B942] to-[#D99A20]">
                Every Step.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-8 text-[#CBD5E1] sm:text-lg">
              SoleCraft brings premium footwear into one clean destination: verified pairs, useful drops,
              and a shopping experience that feels quick from browse to checkout.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-3 rounded-2xl bg-[#F5B942] px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#071A2F] shadow-xl shadow-[#F5B942]/25 transition-all hover:bg-[#D99A20] active:scale-[0.98]"
              >
                Shop Drops
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-2xl border border-white/20 bg-white/10 px-7 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:border-[#F5B942] hover:bg-white hover:text-[#071A2F] active:scale-[0.98]"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className=" overflow-hidden lg:min-h-full">
            <img
              src={LandingPg2}
              alt="SoleCraft footwear collection"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A2F] via-[#071A2F]/25 to-transparent lg:bg-gradient-to-r lg:from-[#071A2F] lg:via-[#071A2F]/25 lg:to-transparent" />
          </div>
        </motion.div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <span className="mb-3 block text-xs font-black uppercase tracking-[0.3em] text-[#D99A20]">
              Our Story
            </span>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#071A2F] sm:text-5xl">
              Footwear With A Point Of View.
            </h2>
            <p className="mt-5 text-base font-medium leading-8 text-[#111827]/65">
              We started SoleCraft for shoppers who care about fit, design, and trust. Instead of an endless
              shelf, we keep the catalogue focused: strong daily pairs, standout releases, and reliable service.
            </p>
            <p className="mt-4 text-base font-medium leading-8 text-[#111827]/65">
              From first browse to final delivery, the goal is simple. Make finding your next pair feel sharp,
              secure, and worth coming back to.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[2rem] border border-[#CBD5E1]/70 bg-white p-6 shadow-sm transition-all hover:border-[#F5B942]/70 hover:shadow-xl hover:shadow-[#071A2F]/10 sm:p-8"
              >
                <div className="text-3xl font-black italic tracking-tighter text-[#071A2F] sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-[#111827]/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#CBD5E1]/60 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="mb-3 block text-xs font-black uppercase tracking-[0.3em] text-[#D99A20]">
                Why SoleCraft
              </span>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#071A2F] sm:text-5xl">
                Made To Move Better.
              </h2>
            </div>
            <p className="max-w-md text-sm font-bold leading-7 text-[#111827]/60">
              Product curation, service, and checkout details all follow the same rule: keep it clean,
              dependable, and focused on the pair.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[2rem] border border-[#CBD5E1]/70 bg-[#F8FAFC] p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-[#F5B942]/70 hover:shadow-xl hover:shadow-[#071A2F]/10"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5B942]/20 text-[#071A2F]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-black italic uppercase tracking-tight text-[#071A2F]">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium leading-7 text-[#111827]/60">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-[3rem] border border-[#CBD5E1]/70 bg-[#071A2F] p-8 shadow-[0_35px_60px_-24px_rgba(7,26,47,0.35)] sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[#F5B942]">
              <Users className="h-4 w-4" />
              Join The Rotation
            </div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white sm:text-4xl">
              Need Help Finding The Right Pair?
            </h2>
            <p className="mt-3 max-w-2xl font-medium leading-7 text-[#CBD5E1]">
              Tell us what you are looking for and we will point you toward styles that fit your routine.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex w-fit items-center gap-3 rounded-2xl bg-[#F5B942] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#071A2F] shadow-xl shadow-[#F5B942]/20 transition-all hover:bg-[#D99A20] active:scale-[0.98]"
          >
            Talk To Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
