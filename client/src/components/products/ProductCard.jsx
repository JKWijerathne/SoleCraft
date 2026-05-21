const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#CBD5E1]/70 shadow-sm hover:shadow-xl hover:shadow-[#071A2F]/10 hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full h-64 bg-[#F8FAFC] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        {product.isOnSale && (
          <span className="absolute top-4 left-4 bg-[#F5B942] text-[#071A2F] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
            Sale
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-sm text-[#111827]/55 capitalize mb-1 font-medium">
          {product.category}
        </p>

        <h3 className="text-lg font-semibold text-[#071A2F] mb-3">
          {product.name}
        </h3>

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
          className="w-full bg-[#071A2F] text-white py-3 rounded-xl font-semibold hover:bg-[#111827] transition"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;