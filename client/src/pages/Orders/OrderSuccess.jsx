import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center min-h-[70vh]">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-green-100 p-6 rounded-full mb-8 shadow-sm"
      >
        <CheckCircle className="w-20 h-20 text-green-600" />
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-[#111827] mb-4"
      >
        Order Successful!
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-10 max-w-md text-lg leading-relaxed"
      >
        Thank you for your purchase. We've received your order and are currently processing it.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          to="/"
          className="bg-[#111827] text-white px-8 py-3.5 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md hover:shadow-lg"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
