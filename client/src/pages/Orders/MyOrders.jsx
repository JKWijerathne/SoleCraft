import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../store/slices/orderSlice';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.order);
  const [expandedOrders, setExpandedOrders] = useState([]);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const getStatusBadge = (order) => {
    if (order.isDelivered) {
      return (
        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider rounded-full">
          Delivered
        </span>
      );
    }
    if (order.isPaid) {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-full">
          Processing
        </span>
      );
    }
    if (order.paymentMethod === 'COD') {
      return (
        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-full">
          Pending Delivery (COD)
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold uppercase tracking-wider rounded-full">
        Not Paid
      </span>
    );
  };

  const API_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  const getImageUrl = (image) => {
    if (!image) return 'https://via.placeholder.com/80';
    if (image.startsWith('http')) return image;
    return `${API_BASE_URL}${image}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl font-bold text-[#071A2F]">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#071A2F] mb-8 flex items-center gap-3">
          <Package className="w-8 h-8 text-[#F5B942]" />
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-lg text-gray-600">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrders.includes(order._id);
              return (
                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    onClick={() => toggleOrder(order._id)}
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#071A2F]">Order #{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                        {getStatusBadge(order)}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-4">
                        <span>{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>•</span>
                        <span>{order.orderItems.length} item(s)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 uppercase tracking-widest font-bold text-[10px]">Total</p>
                        <p className="text-xl font-extrabold text-[#071A2F]">Rs. {order.totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                      </div>
                      
                      <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100 bg-gray-50"
                      >
                        <div className="p-6">
                          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Order Items</h4>
                          <div className="space-y-4">
                            {order.orderItems.map((item) => (
                              <div key={item._id || item.product} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
                                <img
                                  src={getImageUrl(item.image)}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg border border-gray-100"
                                />
                                <div className="flex-1">
                                  <p className="font-bold text-[#071A2F]">{item.name}</p>
                                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">
                                    Size: {item.size || 'N/A'} • Qty: {item.qty}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-[#071A2F]">
                                    Rs. {(item.price * item.qty).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Shipping Address</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p className="font-semibold text-gray-800">{order.shippingAddress.fullName}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                                <p className="mt-2 text-gray-500">Phone: {order.shippingAddress.phone}</p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-2">Payment Details</h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>Method: <span className="font-semibold">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</span></p>
                                {order.isPaid ? (
                                  <p className="text-green-600 font-semibold">Paid on {new Date(order.paidAt).toLocaleDateString()}</p>
                                ) : order.paymentMethod === 'COD' ? (
                                  <p className="text-amber-600 font-semibold">To be paid on delivery</p>
                                ) : (
                                  <p className="text-red-500 font-semibold">Not Paid</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
