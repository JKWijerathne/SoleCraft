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

const productService = {
  getProducts,
  getProductById,
};

export default productService;
