import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartSummary = ({ cartItems }) => {
  const navigate = useNavigate();
  const selectedItems = cartItems.filter(item => item.isSelected !== false);
  const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const itemCount = selectedItems.reduce((a, c) => a + c.qty, 0);
  const shippingPrice = 0;
  const total = subtotal + shippingPrice;

  return (
    <div className="bg-white rounded-[2.5rem] border border-[#CBD5E1]/70 p-8 shadow-[0_20px_40px_-15px_rgba(7,26,47,0.05)] sticky top-32">
      <h2 className="text-xl font-extrabold uppercase tracking-tighter text-[#071A2F] mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-sm font-medium text-[#111827]/70">
          <span>Subtotal ({itemCount} items)</span>
          <span className="font-bold text-[#071A2F]">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm font-medium text-[#111827]/70">
          <span>Estimated Shipping</span>
          <span className="font-bold text-[#071A2F]">
            {shippingPrice === 0 ? 'Free' : `Rs. ${shippingPrice.toLocaleString()}`}
          </span>
        </div>
      </div>

      <div className="border-t border-[#CBD5E1]/60 pt-6 mb-8">
        <div className="flex justify-between items-end">
          <span className="font-bold uppercase tracking-widest text-xs text-[#111827]/60">Total</span>
          <span className="text-3xl font-extrabold text-[#071A2F]">
            Rs. {total.toLocaleString()}
          </span>
        </div>
        {shippingPrice === 0 && (
          <p className="text-[#D99A20] text-xs font-bold uppercase tracking-widest mt-2 text-right">
            Free shipping applied!
          </p>
        )}
      </div>

      <button 
        onClick={() => navigate('/checkout')}
        disabled={selectedItems.length === 0}
        className="w-full py-5 bg-[#F5B942] text-[#071A2F] font-extrabold uppercase tracking-[0.2em] rounded-2xl hover:bg-[#D99A20] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#F5B942]/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#F5B942] disabled:active:scale-100"
      >
        Checkout
        <ArrowRight className="w-5 h-5" />
      </button>

      <div className="mt-6 flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-2xl">
        <ShieldCheck className="w-5 h-5 text-[#071A2F] flex-shrink-0" />
        <p className="text-xs font-medium text-[#111827]/60 leading-relaxed">
          Secure checkout. We use industry-standard encryption to protect your personal and payment information.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
