import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 rounded-full bg-purple-600 text-[10px] font-black uppercase tracking-widest text-white shadow-lg">
          New Drop
        </span>
      </div>

      {/* Action Buttons Overlay */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
        <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-purple-600 transition-all shadow-xl">
          <Heart className="w-4 h-4" />
        </button>
        <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-purple-600 transition-all shadow-xl">
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image || 'https://via.placeholder.com/400x400?text=SoleCraft'}
            alt={product.name}
            className="w-full h-full object-contain transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-700"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-8 pt-0">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">
              {product.brand || 'Premium'}
            </p>
            <Link to={`/product/${product._id}`}>
              <h3 className="text-lg font-black uppercase italic tracking-tighter text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-white italic tracking-tighter">
              ${product.price}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            if (onAddToCart) onAddToCart(product);
          }}
          className="w-full mt-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-300 active:scale-95 group/btn"
        >
          <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce" />
          Add To Cart
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;