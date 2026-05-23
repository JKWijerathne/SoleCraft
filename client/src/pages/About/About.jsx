import { motion } from 'framer-motion';
import { ShoppingBag, Users, Zap, Shield } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '10k+' },
    { label: 'Products', value: '500+' },
    { label: 'Brands', value: '50+' },
    { label: 'Support', value: '24/7' },
  ];

  const features = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Curated Collection',
      description: 'We carefully select every product to ensure the highest quality and latest trends.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Customer First',
      description: 'Our dedicated team is here to provide you with the best shopping experience possible.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast Shipping',
      description: 'We partner with the best couriers to ensure your items arrive safely and quickly.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Checkout',
      description: 'Your security is our priority. We use industry-standard encryption for all transactions.',
    },
  ];

  return (
    <div className="flex-1 bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="bg-[#111827] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About SoleCraft
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            We're on a mission to bring you the best footwear from around the world. Quality, style, and comfort delivered to your doorstep.
          </motion.p>
        </div>
      </div>

      {/* Story & Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-[#111827] mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2023, SoleCraft began with a simple idea: everyone deserves access to premium, stylish, and comfortable footwear without the hassle. What started as a small passion project has grown into a destination for shoe lovers everywhere.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that the right pair of shoes can change your day. That's why we meticulously curate our collection, working directly with brands and designers to ensure that every pair we sell meets our high standards of quality and design.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div className="text-3xl font-bold text-[#111827] mb-2">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We're more than just a store. We're a community dedicated to providing the best products and service.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F8FAFC] p-6 rounded-xl text-center hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
