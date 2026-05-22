import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../../store/slices/productSlice';
import { Edit, Trash2, Plus } from 'lucide-react';

const AdminProducts = () => {
  const dispatch = useDispatch();

  const { products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const BACKEND_URL =
    import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getProductImage = (image) => {
    if (!image) {
      return 'https://via.placeholder.com/80';
    }

    if (image.startsWith('http')) {
      return image;
    }

    return `${BACKEND_URL}${image}`;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-black text-[#071A2F]">
            Products
          </h1>

          <Link
            to="/admin/add-product"
            className="inline-flex items-center justify-center gap-2 bg-[#F5B942] hover:bg-[#D99A20] text-[#071A2F] px-4 py-2 rounded-xl font-bold transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6 font-semibold">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-10 font-bold text-[#071A2F]">
            Loading products...
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#CBD5E1]/50">
                    <th className="p-4 font-black text-[#071A2F] text-sm uppercase tracking-wider">
                      Image
                    </th>
                    <th className="p-4 font-black text-[#071A2F] text-sm uppercase tracking-wider">
                      Name
                    </th>
                    <th className="p-4 font-black text-[#071A2F] text-sm uppercase tracking-wider">
                      Price
                    </th>
                    <th className="p-4 font-black text-[#071A2F] text-sm uppercase tracking-wider">
                      Category
                    </th>
                    <th className="p-4 font-black text-[#071A2F] text-sm uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="p-4 font-black text-[#071A2F] text-sm uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <tr
                        key={product._id}
                        className="border-b border-[#CBD5E1]/50 hover:bg-[#F8FAFC]/50 transition-colors"
                      >
                        <td className="p-4">
                          <img
                            src={getProductImage(product.image)}
                            alt={product.name}
                            className="w-14 h-14 object-cover rounded-lg border border-[#CBD5E1]/30"
                          />
                        </td>

                        <td className="p-4 font-bold text-[#111827] min-w-[180px]">
                          {product.name}
                        </td>

                        <td className="p-4 font-semibold text-[#111827]/70">
                          Rs. {Number(product.price).toLocaleString()}
                        </td>

                        <td className="p-4 font-semibold text-[#111827]/70 capitalize">
                          {product.category || '-'}
                        </td>

                        <td className="p-4 font-semibold text-[#111827]/70">
                          {product.countInStock ?? product.stock ?? 0}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Link
                              to={`/admin/edit-product/${product._id}`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-5 h-5" />
                            </Link>

                            <button
                              type="button"
                              onClick={() => handleDelete(product._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-8 text-center text-[#111827]/60 font-medium"
                      >
                        No products found. Add some to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;