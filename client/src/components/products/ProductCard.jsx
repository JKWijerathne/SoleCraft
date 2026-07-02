import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      dispatch(addToCart({ ...product, qty: 1, size: 'UK 8' })); // Default fallback
    }
  };

  const hasDiscount = product.isSale && product.discountPrice > 0;
  const displayPrice = hasDiscount ? product.price - product.discountPrice : product.price;

  return (
    <div className="group flex flex-col h-full bg-transparent">
      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="block relative w-full h-52 md:h-60 rounded-[1.5rem] bg-white border border-[#CBD5E1]/40 overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {product.isSale && (
          <span className="absolute top-3 left-3 bg-[#F5B942] text-[#071A2F] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
            Sale
          </span>
        )}
      </Link>

      {/* Content Container */}
      <div className="flex flex-col flex-grow px-1">
        {/* Title and Price */}
        <div className="flex justify-between items-start gap-3 mb-1.5">
          <Link to={`/product/${product._id}`} className="hover:text-[#D99A20] transition-colors flex-1">
            <h3 className="text-[16px] font-extrabold text-[#071A2F] line-clamp-1 leading-snug tracking-tight">
              {product.name}
            </h3>
          </Link>
          <div className="text-right shrink-0 flex flex-col items-end">
            <span className="text-[15px] font-semibold text-[#071A2F]">
              Rs. {displayPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[11px] font-medium text-[#071A2F]/60 line-through">
                Rs. {product.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Ratings (Mocked based on reference) */}
        <div className="flex items-center gap-[2px] mb-4 text-[#F5B942]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <button
            className="w-auto inline-flex items-center justify-center px-6 py-2.5 bg-[#071A2F] text-white text-[11px] uppercase tracking-wider font-bold rounded-full hover:bg-[#F5B942] hover:text-[#071A2F] active:scale-[0.97] transition-all shadow-sm hover:shadow"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;