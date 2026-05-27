import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById, createPayPalOrder, capturePayPalOrder, generatePayHereHash, payOrder } from '../../store/slices/orderSlice';
import { logout } from '../../store/slices/authSlice';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { CreditCard, LockKeyhole, ReceiptText, WalletCards } from 'lucide-react';

const Payment = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [clientId, setClientId] = useState('');

  const { order, loading, error, success } = useSelector((state) => state.order);
  const { user, token } = useSelector((state) => state.auth);

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
  }, []);

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    if (!order || order._id !== orderId) {
      dispatch(getOrderById(orderId));
    }
    
    // If order is already paid or we captured it successfully
    if (order && order.isPaid) {
      navigate('/order-success');
    }
  }, [dispatch, orderId, order, navigate, success, user, token]);

  useEffect(() => {
    if (!error) return;

    const authError = error.toLowerCase().includes('not authorized') || error.toLowerCase().includes('sign in');
    if (authError) {
      dispatch(logout());
      navigate('/login');
    }
  }, [error, dispatch, navigate]);

  // --- PayPal Logic ---
  const createPayPalOrderHandler = async () => {
    const res = await dispatch(createPayPalOrder(orderId)).unwrap();
    return res.id;
  };

  const onPayPalApprove = async (data) => {
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
        first_name: order.shippingAddress?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || 'John',
        last_name: order.shippingAddress?.fullName?.split(' ').slice(1).join(' ') || 'Doe',
        email: user?.email || 'john@example.com',
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
            email_address: user?.email,
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
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#F5B942]">
            Secure Checkout
          </p>
          <h1 className="text-3xl font-black tracking-tight text-[#071A2F] sm:text-4xl">
            Complete Your Payment
          </h1>
        </div>

        <div className="mb-6 rounded-[2rem] border border-[#CBD5E1]/70 bg-white p-6 shadow-[0_24px_60px_-35px_rgba(7,26,47,0.35)] sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5B942]/15 text-[#071A2F]">
              <ReceiptText className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-black text-[#071A2F]">Order Summary</h2>
          </div>

          <div className="space-y-4">
            <div className="grid gap-1 border-b border-[#CBD5E1]/70 pb-4 sm:grid-cols-[120px_1fr] sm:items-center">
              <span className="text-sm font-black uppercase tracking-widest text-[#111827]/45">
                Order ID
              </span>
              <span className="min-w-0 break-all text-sm font-bold text-[#111827]/70 sm:text-base">
                {order._id}
              </span>
            </div>

            <div className="flex items-end justify-between gap-4">
              <span className="text-sm font-black uppercase tracking-widest text-[#111827]/45">
                Total
              </span>
              <span className="text-2xl font-black text-[#071A2F] sm:text-3xl">
                Rs. {order.totalPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#CBD5E1]/70 bg-white p-6 shadow-[0_24px_60px_-35px_rgba(7,26,47,0.35)] sm:p-8">
          {order.paymentMethod === 'PayPal' ? (
            <PayPalScriptProvider options={{ "client-id": clientId, "disable-funding": "card,credit" }}>
              <div className="mx-auto w-full max-w-md">
                <p className="mb-4 text-center text-sm font-medium leading-6 text-[#111827]/55">
                  Continue with a PayPal account. Card payments are available through the Debit / Credit Card option at checkout.
                </p>
                <PayPalButtons
                  fundingSource="paypal"
                  createOrder={createPayPalOrderHandler}
                  onApprove={onPayPalApprove}
                  style={{ layout: "vertical" }}
                />
              </div>
            </PayPalScriptProvider>
          ) : order.paymentMethod === 'Card' ? (
            <div className="mx-auto w-full max-w-xl">
              <div className="mb-6 rounded-2xl border border-[#CBD5E1]/70 bg-[#F8FAFC] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#071A2F] text-[#F5B942] shadow-lg shadow-[#071A2F]/10">
                    <WalletCards className="h-7 w-7" />
                  </span>
                  <div>
                    <h2 className="text-xl font-black text-[#071A2F]">
                      Debit / Credit Card
                    </h2>
                    <p className="mt-1 text-sm font-medium leading-6 text-[#111827]/55">
                      You will be redirected to PayHere to complete your payment securely.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayHerePayment}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#071A2F] px-5 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-[#071A2F]/15 transition-all hover:bg-[#111827] active:scale-[0.99] sm:text-base"
              >
                <CreditCard className="h-5 w-5 shrink-0 text-[#F5B942]" />
                <span className="text-center leading-5">Pay by Card</span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-[#111827]/45">
                <LockKeyhole className="h-4 w-4" />
                Secure payment handled by PayHere
              </div>
            </div>
          ) : (
            <p className="text-center font-bold text-[#111827]/60">
              Unsupported payment method
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Payment;
