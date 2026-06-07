import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createOrder, resetOrder } from '../../store/slices/orderSlice';
import { logout, updateProfile } from '../../store/slices/authSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems = [] } = useSelector((state) => state.cart);
  const { order, loading, error, success } = useSelector((state) => state.order);
  const { user, token } = useSelector((state) => state.auth);

  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    postalCode: '',
    country: 'Sri Lanka',
  });

  const [saveDetails, setSaveDetails] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const API_BASE_URL =
    import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  const cartTotal = cartItems.reduce((total, item) => {
    const quantity = item.qty || item.quantity || 1;
    return total + Number(item.price || 0) * Number(quantity);
  }, 0);

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }

    if (success && order?._id) {
      navigate(`/payment/${order._id}`);
      dispatch(resetOrder());
      return;
    }

    if (error) {
      alert(error);
      if (error.toLowerCase().includes('not authorized') || error.toLowerCase().includes('sign in')) {
        dispatch(logout());
        dispatch(resetOrder());
        navigate('/login');
      }
    }
  }, [success, order, error, cartItems.length, navigate, dispatch, user, token]);

  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/80';

    if (image.startsWith('http')) {
      return image;
    }

    return `${API_BASE_URL}${image}`;
  };

  const placeOrderHandler = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      navigate('/cart');
      return;
    }

    if (saveDetails) {
      dispatch(updateProfile({ phone: shippingDetails.phone, address: shippingDetails.address }));
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image || item.images?.[0],
        price: Number(item.price),
        qty: item.qty || item.quantity || 1,
        size: item.size || '',
      })),
      shippingAddress: {
        fullName: shippingDetails.fullName,
        phone: shippingDetails.phone,
        address: shippingDetails.address,
        city: shippingDetails.city,
        postalCode: shippingDetails.postalCode,
        country: shippingDetails.country,
      },
      paymentMethod,
      itemsPrice: Number(cartTotal.toFixed(2)),
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: Number(cartTotal.toFixed(2)),
    };

    dispatch(createOrder(orderData));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-black text-[#071A2F] mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-7">
            <form className="space-y-6" onSubmit={placeOrderHandler}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-[#071A2F] mb-4">
                  Shipping Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingDetails.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F5B942] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={shippingDetails.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F5B942] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingDetails.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F5B942] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleChange}
                      rows="3"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F5B942] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingDetails.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F5B942] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingDetails.country}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#F5B942] outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 mt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveDetails}
                        onChange={(e) => setSaveDetails(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-[#F5B942] focus:ring-[#F5B942]"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Save these details to my profile for future orders
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-[#071A2F] mb-4">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-[#F5B942]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === 'PayPal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#F5B942]"
                    />
                    <span className="font-bold text-gray-800">
                      PayPal
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-[#F5B942]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Card"
                      checked={paymentMethod === 'Card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#F5B942]"
                    />
                    <span className="font-bold text-gray-800">
                      Debit / Credit Card
                    </span>
                  </label>
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  PayPal is for PayPal account payments. Debit and credit card payments are securely handled through PayHere.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#071A2F] hover:bg-[#111827] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all"
              >
                {loading ? 'Creating Order...' : 'Continue to Payment'}
              </button>
            </form>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] sticky top-24">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-2 mb-6">
                {cartItems.map((item) => {
                  const quantity = item.qty || item.quantity || 1;
                  const image = item.image || item.images?.[0];

                  return (
                    <div
                      key={`${item._id}-${item.size || 'default'}`}
                      className="flex justify-between items-center text-sm py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={getImageUrl(image)}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl flex-shrink-0 border border-gray-100 shadow-sm"
                        />

                        <div className="flex flex-col flex-1 min-w-0 pr-4">
                          <p className="font-bold text-gray-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-gray-500 text-xs mt-1 font-semibold uppercase tracking-wider">
                            Size: {item.size || 'N/A'} &bull; Qty: {quantity}
                          </p>
                        </div>
                      </div>

                      <span className="font-black text-gray-900 text-base flex-shrink-0">
                        Rs. {Number(item.price * quantity).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">
                    Rs. {cartTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <span>Shipping</span>
                  <span className="font-bold text-green-600 uppercase tracking-widest text-xs mt-0.5">
                    Free
                  </span>
                </div>

                <div className="border-t border-gray-200 mt-4 pt-6 flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
                    Total
                  </span>
                  <span className="text-3xl font-black text-gray-900">
                    Rs. {cartTotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-6 leading-relaxed">
                After clicking continue, you will be redirected to the secure payment page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
