import axios from 'axios';
import { mapBackendProduct, mapToBackendProduct, mapToBackendUpdate } from '../utils/productMapper';
import { getUserId, handleAuthError } from '../utils/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8001',
  timeout: 10000,
});

export const getProducts = async () => {
  try {
    const userId = await getUserId();
    const response = await api.get(`/products?user_id=${userId}`);
    // Backend returns array directly, map each product
    const mappedProducts = response.data.map(mapBackendProduct);
    return { products: mappedProducts };
  } catch (error) {
    console.error('Error fetching products:', error);
    handleAuthError(error);
    throw new Error('Failed to fetch products');
  }
};

export const addProduct = async (frontendData) => {
  try {
    const userId = await getUserId();
    // Map frontend data to backend format and add user_id
    const backendData = {
      ...mapToBackendProduct(frontendData),
      user_id: userId
    };
    const response = await api.post('/add-product', backendData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    handleAuthError(error);
    throw new Error('Failed to add product');
  }
};

export const updateProduct = async (id, frontendData) => {
  try {
    const userId = await getUserId();
    // Map frontend update data to backend format
    const backendData = mapToBackendUpdate(frontendData);
    const response = await api.patch(`/product/${id}?user_id=${userId}`, backendData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    handleAuthError(error);
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  try {
    const userId = await getUserId();
    const response = await api.delete(`/product/${id}?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    handleAuthError(error);
    throw new Error('Failed to delete product');
  }
};

export const getProductDetails = async (id) => {
  try {
    const userId = await getUserId();
    const response = await api.get(`/product/${id}?user_id=${userId}`);
    return mapBackendProduct(response.data);
  } catch (error) {
    console.error('Error fetching product details:', error);
    handleAuthError(error);
    throw new Error('Failed to fetch product details');
  }
};