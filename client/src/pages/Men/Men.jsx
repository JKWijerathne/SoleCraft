import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../../store/slices/productSlice';
import ProductGrid from '../../components/products/ProductGrid';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Men = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, loading, error } = useSelector((state) => state.products);
  
  const type = searchParams.get('type');
  const occasion = searchParams.get('occasion');
  const style = searchParams.get('style');
  const priceParam = searchParams.get('price');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter(product => {
    // Basic category check (assume 'men' or 'Men')
    if (product.category?.toLowerCase() !== 'men') return false;

    // Type filter
    if (type && product.type?.toLowerCase() !== type.replace('-', ' ')) return false;
    
    // Occasion filter
    if (occasion && product.occasion?.toLowerCase() !== occasion.replace('-', ' ')) return false;

    // Style filter
    if (style && product.style?.toLowerCase() !== style.replace('-', ' ')) return false;

    // Price filter
    if (priceParam) {
      const price = product.price;
      if (priceParam === 'under-2000' && price >= 2000) return false;
      if (priceParam === '2000-5000' && (price < 2000 || price > 5000)) return false;
      if (priceParam === '5000-10000' && (price < 5000 || price > 10000)) return false;
      if (priceParam === 'premium' && price <= 10000) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-8 pb-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[#071A2F]"
          >
            Men's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D99A20] to-[#F5B942]">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#111827]/60 mt-3 font-medium max-w-2xl"
          >
            Discover our premium range of footwear designed exclusively for men. From classic formal shoes to cutting-edge street wear.
          </motion.p>
        </div>

        {/* Filters Summary (Optional, shows active filters) */}
        {(type || occasion || style || priceParam) && (
          <div className="mb-8 flex flex-wrap gap-3">
            <span className="text-sm font-bold uppercase tracking-widest text-[#071A2F] flex items-center mr-2">Active Filters:</span>
            {type && <span className="px-3 py-1 bg-white border border-[#CBD5E1]/60 rounded-full text-xs font-bold text-[#111827]/70 capitalize shadow-sm">{type.replace('-', ' ')}</span>}
            {occasion && <span className="px-3 py-1 bg-white border border-[#CBD5E1]/60 rounded-full text-xs font-bold text-[#111827]/70 capitalize shadow-sm">{occasion.replace('-', ' ')}</span>}
            {style && <span className="px-3 py-1 bg-white border border-[#CBD5E1]/60 rounded-full text-xs font-bold text-[#111827]/70 capitalize shadow-sm">{style.replace('-', ' ')}</span>}
            {priceParam && <span className="px-3 py-1 bg-white border border-[#CBD5E1]/60 rounded-full text-xs font-bold text-[#111827]/70 capitalize shadow-sm">{priceParam.replace('-', ' ')}</span>}
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-[#D99A20] mb-4" size={48} />
            <p className="text-[#111827]/60 font-bold uppercase tracking-widest text-xs">Loading collection...</p>
          </div>
        ) : error ? (
          <div className="p-8 rounded-[2.5rem] bg-red-50 border border-red-200 text-red-600 max-w-2xl mx-auto flex items-center gap-6 my-20 shadow-sm">
            <AlertCircle size={32} />
            <div>
              <h3 className="font-black uppercase italic text-lg mb-1">Error Loading Products</h3>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 rounded-[3rem] bg-white border border-dashed border-[#CBD5E1] shadow-sm my-10">
            <h3 className="text-2xl font-black uppercase italic text-[#071A2F]/60 mb-2">No items found</h3>
            <p className="text-[#111827]/45 font-medium tracking-wide uppercase text-xs">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
};

export default Men;
