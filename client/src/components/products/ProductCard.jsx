const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {product.isOnSale && (
          <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Sale
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500 capitalize mb-1">
          {product.category}
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mb-4">
          {product.oldPrice && (
            <span className="text-gray-400 line-through">
              Rs. {product.oldPrice.toLocaleString()}
            </span>
          )}

          <span className="text-lg font-bold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </span>
        </div>

        <button
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;