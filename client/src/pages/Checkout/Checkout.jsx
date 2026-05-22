import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, resetOrder } from '../../store/slices/orderSlice';
import { clearCart } from '../../store/slices/cartSlice';

const Checkout = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    deliveryAddress: '',
    paymentMethod: 'Cash on Delivery',
  });

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { order, success, error, loading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }

    if (user && formData.customerName === '') {
        setFormData((prev) => ({
            ...prev,
            customerName: user.name || '',
        }));
    }

    if (success) {
      dispatch(clearCart());
      dispatch(resetOrder());
      navigate('/');
      alert('Order placed successfully!');
    }

    if (error) {
        alert(error);
        dispatch(resetOrder());
    }
  }, [user, navigate, success, order, dispatch, error, formData.customerName]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrderHandler = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const orderData = {
        orderItems: cartItems,
        shippingAddress: {
            address: formData.deliveryAddress,
            city: 'N/A',
            postalCode: 'N/A',
            country: 'N/A',
        },
        paymentMethod: formData.paymentMethod,
        itemsPrice: cartTotal,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: cartTotal,
        phone: formData.phoneNumber,
        customerName: formData.customerName
    };

    dispatch(createOrder(orderData));
  };

  if (cartItems.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <button 
                onClick={() => navigate('/')}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Go Shopping
              </button>
          </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Form */}
        <div className="w-full lg:w-2/3">
          <form className="space-y-6" onSubmit={placeOrderHandler}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">Delivery Address</label>
                  <textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    rows="3"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="cod"
                    name="paymentMethod"
                    type="radio"
                    value="Cash on Delivery"
                    checked={formData.paymentMethod === 'Cash on Delivery'}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                  />
                  <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                    Cash on Delivery (COD)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="card"
                    name="paymentMethod"
                    type="radio"
                    value="Credit Card"
                    checked={formData.paymentMethod === 'Credit Card'}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                  />
                  <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                    Credit / Debit Card
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-6 py-4 rounded-md font-semibold text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}`} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image || item.images?.[0]} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500 text-xs">Size: {item.size} | Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
