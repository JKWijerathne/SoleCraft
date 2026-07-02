import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addProduct } from '../../store/slices/productSlice';
import { ArrowLeft, Save } from 'lucide-react';

const AddProduct = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.products);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
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
      await dispatch(addProduct(formDataToSend)).unwrap();
      navigate('/admin/products');
    } catch (err) {
      // Error handled in Redux
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/products" className="p-2 hover:bg-[#CBD5E1]/30 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-[#071A2F]" />
          </Link>
          <h1 className="text-3xl font-extrabold text-[#071A2F]">Add Product</h1>
        </div>

        {error && <div className="bg-red-100 text-red-600 p-4 rounded-xl mb-6 font-semibold">{error}</div>}

        <div className="bg-white rounded-2xl shadow-sm border border-[#CBD5E1]/50 p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[#111827] mb-2">Product Name</label>
                <input
                  type="text" name="name" value={formData.name} onChange={onChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[#111827] mb-2">Description</label>
                <textarea
                  name="description" value={formData.description} onChange={onChange} rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">Price (Rs)</label>
                <input
                  type="number" name="price" value={formData.price} onChange={onChange} min="0" step="0.01"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">Stock Count</label>
                <input
                  type="number" name="countInStock" value={formData.countInStock} onChange={onChange} min="0"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">Category</label>
                <input
                  type="text" name="category" value={formData.category} onChange={onChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">Product Type</label>
                <select
                  name="type" value={formData.type} onChange={onChange}
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
                <label className="block text-sm font-bold text-[#111827] mb-2">Occasion</label>
                <select
                  name="occasion" value={formData.occasion} onChange={onChange}
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
                <label className="block text-sm font-bold text-[#111827] mb-2">Style</label>
                <select
                  name="style" value={formData.style} onChange={onChange}
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
                <label className="block text-sm font-bold text-[#111827] mb-2">Sizes (comma separated)</label>
                <input
                  type="text" name="sizes" value={formData.sizes} onChange={onChange}
                  placeholder="e.g. 38, 39, 40, 41"
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
                  <label className="block text-sm font-bold text-[#111827] mb-2">Discount Price (Rs)</label>
                  <input
                    type="number" name="discountPrice" value={formData.discountPrice} onChange={onChange} min="0" step="0.01"
                    className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-[#111827] mb-2">Product Image</label>
                <input
                  type="file" name="image" onChange={handleFileChange} accept="image/*"
                  className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#F5B942] focus:border-transparent outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#F5B942] file:text-[#071A2F] hover:file:bg-[#D99A20]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#CBD5E1]/30">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-[#071A2F] hover:bg-[#111827] text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
