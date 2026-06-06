import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AlertCircle, Loader2, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchProducts } from '../../store/slices/productSlice';
import ProductGrid from '../../components/products/ProductGrid';

const normalize = (value) => String(value || '').toLowerCase().trim();

const productMatchesQuery = (product, query) => {
  const searchableFields = [
    product.name,
    product.description,
    product.category,
    product.type,
    product.occasion,
    product.style,
    Array.isArray(product.sizes) ? product.sizes.join(' ') : product.sizes,
  ];

  return searchableFields.some((field) => normalize(field).includes(query));
};

const SearchResults = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const query = normalize(searchParams.get('q'));
  const displayQuery = searchParams.get('q')?.trim() || '';
  const isAll = searchParams.get('all') === 'true';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = isAll
    ? products
    : query
      ? products.filter((product) => productMatchesQuery(product, query))
      : [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-8 pb-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#CBD5E1]/70 text-[#D99A20] text-xs font-black uppercase tracking-widest mb-4 shadow-sm"
          >
            <Search className="w-4 h-4" />
            Search
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[#071A2F]"
          >
            Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D99A20] to-[#F5B942]">Results</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#111827]/60 mt-3 font-medium max-w-2xl"
          >
            {isAll 
              ? 'Showing all available products in our collection.'
              : displayQuery
                ? `Showing products related to "${displayQuery}".`
                : 'Enter a product name, category, type, occasion, or style from the search bar.'}
          </motion.p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-[#D99A20] mb-4" size={48} />
            <p className="text-[#111827]/60 font-bold uppercase tracking-widest text-xs">
              Searching products...
            </p>
          </div>
        ) : error ? (
          <div className="p-8 rounded-[2.5rem] bg-red-50 border border-red-200 text-red-600 max-w-2xl mx-auto flex items-center gap-6 my-20 shadow-sm">
            <AlertCircle size={32} />
            <div>
              <h3 className="font-black uppercase italic text-lg mb-1">Search Error</h3>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        ) : !query && !isAll ? (
          <div className="text-center py-32 rounded-[3rem] bg-white border border-dashed border-[#CBD5E1] shadow-sm my-10">
            <h3 className="text-2xl font-black uppercase italic text-[#071A2F]/60 mb-2">
              Start a Search
            </h3>
            <p className="text-[#111827]/45 font-medium tracking-wide uppercase text-xs">
              Use the search field in the navigation bar.
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 rounded-[3rem] bg-white border border-dashed border-[#CBD5E1] shadow-sm my-10">
            <h3 className="text-2xl font-black uppercase italic text-[#071A2F]/60 mb-2">
              No matching products
            </h3>
            <p className="text-[#111827]/45 font-medium tracking-wide uppercase text-xs mb-8">
              Try another product name, category, or style.
            </p>
            <Link
              to="/"
              className="inline-flex px-8 py-3 bg-[#F5B942] text-[#071A2F] text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#D99A20] transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-widest text-[#071A2F]">
                {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'}
              </span>
              {!isAll && displayQuery && (
                <span className="px-3 py-1 bg-white border border-[#CBD5E1]/60 rounded-full text-xs font-bold text-[#111827]/70 shadow-sm">
                  {displayQuery}
                </span>
              )}
            </div>
            <ProductGrid products={filteredProducts} />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
