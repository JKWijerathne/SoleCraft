import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, createPayPalOrder, capturePayPalOrder, generatePayHereHash, payOrder } from '../../store/slices/orderSlice';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

const Payment = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clientId, setClientId] = useState('');
  const [payhereScriptLoaded, setPayhereScriptLoaded] = useState(false);

  const { order, loading, error, success } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/config/paypal`);
        setClientId(data.clientId);
      } catch (err) {
        console.error('Failed to fetch PayPal Client ID', err);
      }
    };
    fetchClientId();

    // Check if PayHere is loaded
    if (window.payhere) {
      setPayhereScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderById(orderId));
    }
    
    // If order is already paid or we captured it successfully
    if (order && order.isPaid) {
      navigate('/order-success');
    }
  }, [dispatch, orderId, order, navigate, success]);

  // --- PayPal Logic ---
  const createPayPalOrderHandler = async () => {
    const res = await dispatch(createPayPalOrder(orderId)).unwrap();
    return res.id;
  };

  const onPayPalApprove = async (data, actions) => {
    try {
      await dispatch(capturePayPalOrder({ orderId, paypalOrderId: data.orderID })).unwrap();
      navigate('/order-success');
    } catch (err) {
      console.error('Failed to capture order:', err);
      alert('Payment failed. Please try again.');
    }
  };

  // --- PayHere Logic ---
  const handlePayHerePayment = async () => {
    if (!window.payhere) {
      alert('PayHere SDK not loaded. Please refresh the page.');
      return;
    }

    try {
      // 1. Get Hash from backend
      const hashData = {
        orderId: order._id,
        amount: order.totalPrice,
        currency: 'LKR',
      };
      const { hash, merchantId, env } = await dispatch(generatePayHereHash(hashData)).unwrap();

      // 2. Define PayHere configuration
      const payment = {
        sandbox: env === 'sandbox',
        merchant_id: merchantId,
        return_url: `${window.location.origin}/order-success`,
        cancel_url: `${window.location.origin}/payment/${order._id}`,
        notify_url: `${import.meta.env.VITE_API_URL}/payhere/notify`, // Optional webhook, handling via frontend success callback for now
        order_id: order._id,
        items: order.orderItems.map(item => item.name).join(', '),
        amount: parseFloat(order.totalPrice).toFixed(2),
        currency: 'LKR',
        hash: hash, 
        first_name: order.shippingAddress?.fullName?.split(' ')[0] || userInfo?.name?.split(' ')[0] || 'John',
        last_name: order.shippingAddress?.fullName?.split(' ').slice(1).join(' ') || 'Doe',
        email: userInfo?.email || 'john@example.com',
        phone: order.shippingAddress?.phone || '0771234567',
        address: order.shippingAddress?.address || '123 Main St',
        city: order.shippingAddress?.city || 'Colombo',
        country: order.shippingAddress?.country || 'Sri Lanka',
      };

      // 3. Define Callbacks
      window.payhere.onCompleted = async function onCompleted(orderId) {
        // Note: PayHere sends orderId back
        try {
          // Update order status to paid in backend
          const paymentResult = {
            id: orderId, // Or PayHere generated payment ID if available, usually not passed in onCompleted directly
            status: 'COMPLETED',
            update_time: new Date().toISOString(),
            email_address: userInfo?.email,
          };
          await dispatch(payOrder({ orderId: order._id, paymentResult })).unwrap();
          navigate('/order-success');
        } catch (error) {
           console.error("Failed to update order status:", error);
           alert("Payment completed but failed to update order. Please contact support.");
        }
      };

      window.payhere.onDismissed = function onDismissed() {
        console.log('Payment dismissed');
      };

      window.payhere.onError = function onError(error) {
        console.error('PayHere Error:', error);
        alert('An error occurred with the payment gateway.');
      };

      // 4. Start Payment
      window.payhere.startPayment(payment);

    } catch (error) {
      console.error('Failed to initiate PayHere payment:', error);
      alert('Could not initiate payment. Please try again.');
    }
  };

  if (loading || (!clientId && order?.paymentMethod === 'PayPal') || !order) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl">Loading payment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Payment</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between items-center text-lg mb-2">
          <span>Order ID:</span>
          <span className="font-medium text-gray-600">{order._id}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-bold border-t border-gray-200 pt-4">
          <span>Total Amount:</span>
          <span>Rs. {order.totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
        {order.paymentMethod === 'PayPal' ? (
          <PayPalScriptProvider options={{ "client-id": clientId, "disable-funding": "card,credit" }}>
            <div className="w-full max-w-md">
              <PayPalButtons
                fundingSource="paypal"
                createOrder={createPayPalOrderHandler}
                onApprove={onPayPalApprove}
                style={{ layout: "vertical" }}
              />
            </div>
          </PayPalScriptProvider>
        ) : order.paymentMethod === 'Card' ? (
           <div className="w-full max-w-md flex justify-center">
              <button
                onClick={handlePayHerePayment}
                className="w-full bg-[#071A2F] hover:bg-[#111827] text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all"
              >
                Pay with Card
              </button>
           </div>
        ) : (
          <p>Unsupported Payment Method</p>
        )}
      </div>
    </div>
  );
};

export default Payment;

