import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import productService from '../../services/productService';
import { Loader2, AlertCircle, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSize, setSelectedSize] = useState(MOCK_SIZES[2]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Error fetching product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (product) {
      dispatch(addToCart({ ...product, qty, size: selectedSize }));
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
        <Loader2 className="animate-spin text-[#D99A20] mb-4" size={48} />
        <p className="text-[#111827]/60 font-bold uppercase tracking-widest text-xs">Loading Details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
        <div className="p-8 rounded-[2.5rem] bg-red-50 border border-red-200 text-red-600 max-w-2xl w-full flex items-center gap-6 shadow-sm">
          <AlertCircle size={32} />
          <div>
            <h3 className="font-extrabold uppercase text-lg mb-1">Product Not Found</h3>
            <p className="text-sm font-medium">{error || 'This product could not be found.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#111827]/60 hover:text-[#071A2F] font-bold uppercase tracking-widest text-xs mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative bg-white rounded-[3rem] border border-[#CBD5E1]/70 shadow-sm overflow-hidden aspect-square flex items-center justify-center p-8"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain hover:scale-110 transition-transform duration-700"
            />
            {product.countInStock === 0 && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                <span className="px-6 py-3 bg-[#071A2F] text-white font-extrabold uppercase tracking-widest text-xl rounded-2xl rotate-[-10deg] shadow-2xl">
                  Out of Stock
                </span>
              </div>
            )}
            {product.isOnSale && product.countInStock > 0 && (
              <div className="absolute top-8 left-8">
                <span className="px-5 py-2 bg-[#F5B942] text-[#071A2F] font-extrabold uppercase tracking-widest text-sm rounded-full shadow-lg">
                  Sale
                </span>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col justify-center"
          >
            <span className="text-[#D99A20] font-bold uppercase tracking-[0.2em] text-xs mb-3 block">
              {product.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#071A2F] mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-extrabold text-[#071A2F]">
                Rs. {product.price.toLocaleString()}
              </span>
              {/* Optional old price if exists */}
              {product.oldPrice && (
                <span className="text-xl font-bold text-[#111827]/35 line-through">
                  Rs. {product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-[#111827]/70 leading-relaxed font-medium mb-10 text-lg">
              {product.description}
            </p>

            {/* Sizes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold uppercase tracking-widest text-[#071A2F] text-sm">Select Size</h3>
                <button className="text-xs font-bold text-[#111827]/50 underline hover:text-[#071A2F]">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {MOCK_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                      selectedSize === size 
                        ? 'border-[#071A2F] bg-[#071A2F] text-[#F5B942] shadow-lg shadow-[#071A2F]/20' 
                        : 'border-[#CBD5E1]/60 bg-white text-[#111827]/70 hover:border-[#071A2F]/30 hover:text-[#071A2F]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-10">
              <h3 className="font-extrabold uppercase tracking-widest text-[#071A2F] text-sm mb-4">Quantity</h3>
              <div className="flex items-center w-max bg-white border-2 border-[#CBD5E1]/60 rounded-2xl p-1">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-3 hover:bg-transparent rounded-xl text-[#071A2F] transition-colors"
                  disabled={product.countInStock === 0}
                >
                  <Minus size={18} />
                </button>
                <span className="w-16 text-center font-extrabold text-lg text-[#071A2F]">
                  {qty}
                </span>
                <button 
                  onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                  className="p-3 hover:bg-transparent rounded-xl text-[#071A2F] transition-colors"
                  disabled={product.countInStock === 0 || qty >= product.countInStock}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className={`w-full py-5 rounded-2xl font-extrabold uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 ${
                product.countInStock > 0 
                  ? 'bg-[#F5B942] text-[#071A2F] hover:bg-[#D99A20] shadow-xl shadow-[#F5B942]/25 active:scale-[0.98]' 
                  : 'bg-[#CBD5E1]/30 text-[#111827]/40 cursor-not-allowed'
              }`}
            >
              <ShoppingBag size={20} />
              {product.countInStock > 0 ? 'Add to Cart' : 'Sold Out'}
            </button>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
