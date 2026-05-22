import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (newQty) => {
    if (newQty > 0 && newQty <= item.countInStock) {
      dispatch(updateQuantity({ _id: item._id, size: item.size, qty: newQty }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart({ _id: item._id, size: item.size }));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 py-6 border-b border-[#CBD5E1]/60">
      <Link to={`/product/${item._id}`} className="w-full sm:w-32 h-32 bg-[#F8FAFC] rounded-2xl overflow-hidden flex-shrink-0 group">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between h-full w-full">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[#D99A20] font-bold uppercase tracking-[0.2em] text-[10px] mb-1 block">
              {item.category}
            </span>
            <Link to={`/product/${item._id}`} className="hover:text-[#F5B942] transition-colors">
              <h3 className="text-lg font-black text-[#071A2F] leading-tight">
                {item.name}
              </h3>
            </Link>
          </div>
          <span className="text-lg font-black text-[#071A2F]">
            Rs. {item.price.toLocaleString()}
          </span>
        </div>

        <div className="text-sm font-bold text-[#111827]/60 mb-4">
          Size: <span className="text-[#071A2F] uppercase tracking-widest">{item.size}</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center bg-[#F8FAFC] border border-[#CBD5E1]/60 rounded-xl p-1">
            <button 
              onClick={() => handleUpdateQuantity(item.qty - 1)}
              className="p-2 hover:bg-white rounded-lg text-[#071A2F] transition-colors"
              disabled={item.qty <= 1}
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center font-black text-sm text-[#071A2F]">
              {item.qty}
            </span>
            <button 
              onClick={() => handleUpdateQuantity(item.qty + 1)}
              className="p-2 hover:bg-white rounded-lg text-[#071A2F] transition-colors"
              disabled={item.qty >= item.countInStock}
            >
              <Plus size={14} />
            </button>
          </div>

          <button 
            onClick={handleRemove}
            className="text-[#111827]/40 hover:text-red-500 transition-colors p-2"
            title="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
