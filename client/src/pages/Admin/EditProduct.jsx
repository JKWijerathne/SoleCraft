import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { updateProduct } from '../../store/slices/productSlice';
import { ArrowLeft, Save } from 'lucide-react';
import productService from '../../services/productService';

const EditProduct = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    type: '',
    occasion: '',
    style: '',
    sizes: '',
    countInStock: '',
    isSale: false,
    discountPrice: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.products);

  const BACKEND_URL =
    import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await productService.getProductById(id);

        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price ?? '',
          category: product.category || '',
          type: product.type || '',
          occasion: product.occasion || '',
          style: product.style || '',
          sizes: Array.isArray(product.sizes)
            ? product.sizes.join(', ')
            : product.sizes || '',
          countInStock: product.countInStock ?? product.stock ?? '',
          isSale: product.isSale || product.sale || false,
          discountPrice: product.discountPrice ?? '',
        });

        setCurrentImage(product.image || '');
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setFetchError('Failed to load product details.');
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getImageUrl = (image) => {
    if (!image) return '';

    if (image.startsWith('http')) {
      return image;
    }

    return `${BACKEND_URL}${image}`;
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', Number(formData.price));
    formDataToSend.append('category', formData.category);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('occasion', formData.occasion);
    formDataToSend.append('style', formData.style);
    formDataToSend.append('sizes', formData.sizes);
    formDataToSend.append('countInStock', Number(formData.countInStock));
    formDataToSend.append('isSale', formData.isSale);
    formDataToSend.append('discountPrice', formData.discountPrice);

    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    try {
      await dispatch(
        updateProduct({
          id,
          productData: formDataToSend,
        })
      ).unwrap();

      navigate('/admin/products');
    } catch (err) {
      console.error(err);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center font-bold text-xl text-[#071A2F]">
        Loading product...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#CBD5E1]/50 text-center">
          <p className="text-red-600 font-bold mb-4">{fetchError}</p>
          <Link
            to="/admin/products"
            className="inline-block bg-[#071A2F] text-white px-5 py-3 rounded-xl font-bold"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin/products"
            className="p-2 hover:bg-[#CBD5E1]/30 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#071A2F]" />
          </Link>

          <h1 className="text-3xl font-extrabold text-[#071A2F]">
            Edit Product
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6 font-semibold">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/50 p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Price (Rs)
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={onChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Stock Count
                </label>

                <input
                  type="number"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={onChange}
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={onChange}
                  placeholder="Example: Footwear"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select type</option>
                  <option value="shoes">Shoes</option>
                  <option value="sandals">Sandals</option>
                  <option value="slippers">Slippers</option>
                  <option value="sneakers">Sneakers</option>
                  <option value="flip-flops">Flip Flops</option>
                  <option value="slides">Slides</option>
                  <option value="sports-shoes">Sports Shoes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Occasion
                </label>

                <select
                  name="occasion"
                  value={formData.occasion}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select occasion</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="sports">Sports</option>
                  <option value="party-wear">Party Wear</option>
                  <option value="office-wear">Office Wear</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Style
                </label>

                <select
                  name="style"
                  value={formData.style}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select style</option>
                  <option value="classic">Classic</option>
                  <option value="trendy">Trendy</option>
                  <option value="minimal">Minimal</option>
                  <option value="luxury">Luxury</option>
                  <option value="streetwear">Streetwear</option>
                  <option value="comfort-fit">Comfort Fit</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Sizes
                </label>

                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={onChange}
                  placeholder="Example: 36, 37, 38, 39"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 font-bold text-[#111827]">
                  <input
                    type="checkbox"
                    name="isSale"
                    checked={formData.isSale}
                    onChange={onChange}
                    className="w-5 h-5 accent-[#F5B942]"
                  />
                  Mark as sale product
                </label>
              </div>

              {formData.isSale && (
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2">
                    Discount Price (Rs)
                  </label>

                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={onChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  />
                </div>
              )}

              {currentImage && (
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-[#111827] mb-2">
                    Current Image
                  </label>

                  <img
                    src={getImageUrl(currentImage)}
                    alt="Current product"
                    className="w-32 h-32 object-cover rounded-xl border border-[#CBD5E1]"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[#111827] mb-2">
                  Update Product Image Optional
                </label>

                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F5B942] file:text-[#071A2F] hover:file:bg-[#D99A20]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#CBD5E1]/30">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-[#071A2F] hover:bg-[#111827] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;