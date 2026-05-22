import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const ProductCard = ({ product, onAddToCart }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      dispatch(addToCart({ ...product, qty: 1, size: 'UK 8' })); // Default fallback
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#CBD5E1]/70 shadow-sm hover:shadow-xl hover:shadow-[#071A2F]/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <Link to={`/product/${product._id}`} className="block relative w-full h-64 bg-[#F8FAFC] overflow-hidden flex-shrink-0 group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {product.isOnSale && (
          <span className="absolute top-4 left-4 bg-[#F5B942] text-[#071A2F] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
            Sale
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm text-[#111827]/55 capitalize mb-1 font-medium">
          {product.category}
        </p>

        <Link to={`/product/${product._id}`} className="hover:text-[#F5B942] transition-colors">
          <h3 className="text-lg font-semibold text-[#071A2F] mb-3 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto">
          <div className="flex items-center gap-3 mb-4">
            {product.oldPrice && (
              <span className="text-[#111827]/35 line-through">
                Rs. {product.oldPrice.toLocaleString()}
              </span>
            )}

            <span className="text-lg font-bold text-[#071A2F]">
              Rs. {product.price.toLocaleString()}
            </span>
          </div>

          <button
            className="w-full bg-[#071A2F] text-white py-3 rounded-xl font-semibold hover:bg-[#111827] active:scale-[0.98] transition-all"
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