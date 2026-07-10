import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAllSelection } from '../../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const allSelected = cartItems.length > 0 && cartItems.every((item) => item.isSelected !== false);

  const handleSelectAll = () => {
    dispatch(toggleAllSelection(!allSelected));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-transparent py-20 px-4 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-16 rounded-[3.5rem] border border-[#CBD5E1]/70 shadow-sm flex flex-col items-center max-w-2xl w-full text-center"
        >
          <div className="w-24 h-24 bg-transparent rounded-full flex items-center justify-center text-[#111827]/40 mb-8 border-2 border-dashed border-[#CBD5E1]">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight text-[#071A2F] mb-4">
            Your Cart is Empty
          </h2>
          <p className="text-[#111827]/60 font-medium mb-10 text-lg">
            Looks like you haven't added any heat to your cart yet. Discover our latest drops!
          </p>
          <Link 
            to="/"
            className="px-10 py-5 bg-[#071A2F] text-white font-extrabold uppercase tracking-[0.2em] rounded-2xl hover:bg-[#111827] transition-all flex items-center gap-3 active:scale-[0.98]"
          >
            Start Shopping
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-130px)] bg-transparent pt-12 pb-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#071A2F]">
            Your <span className="text-[#D99A20]">Bag</span>
          </h1>
          <p className="text-[#111827]/60 mt-2 font-bold uppercase tracking-widest text-sm">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-2">
            <div className="bg-white rounded-[2.5rem] border border-[#CBD5E1]/70 p-6 md:p-10 shadow-sm">
              <div className="hidden sm:flex justify-between items-center pb-4 border-b border-[#CBD5E1]/60 mb-2">
                <div className="flex items-center gap-3 w-32">
                  <label className="flex items-center cursor-pointer relative">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-md shadow hover:shadow-md border border-[#CBD5E1] checked:bg-[#071A2F] checked:border-[#071A2F]"
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </label>
                  <span className="font-bold uppercase tracking-widest text-xs text-[#111827]/60">All</span>
                </div>
                <span className="font-bold uppercase tracking-widest text-xs text-[#111827]/60 text-right w-32">Total</span>
              </div>
              
              {cartItems.map((item) => (
                <CartItem key={`${item._id}-${item.size}`} item={item} />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
