import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/products';

const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const addProduct = async (productData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, productData, config);
  return response.data;
};

const updateProduct = async (id, productData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(`${API_URL}/${id}`, productData, config);
  return response.data;
};

const deleteProduct = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
