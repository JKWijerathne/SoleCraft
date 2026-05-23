import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/orders';

const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

const getMyOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/myorders`, config);
  return response.data;
};

const getOrderById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

const createPayPalOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/payments/paypal/create-order/${orderId}`, {}, config);
  return response.data;
};

const capturePayPalOrder = async (orderId, paypalOrderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/payments/paypal/capture-order/${orderId}`, { paypalOrderId }, config);
  return response.data;
};

const generatePayHereHash = async (hashData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/payhere/hash`, hashData, config);
  return response.data;
};

const payOrder = async (orderId, paymentResult, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${orderId}/pay`, paymentResult, config);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  createPayPalOrder,
  capturePayPalOrder,
  generatePayHereHash,
  payOrder,
};

export default orderService;
