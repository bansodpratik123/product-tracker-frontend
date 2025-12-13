import axios from 'axios';
import { mapBackendProduct, mapToBackendProduct, mapToBackendUpdate } from '../utils/productMapper';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8001',
  timeout: 10000,
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    // Backend returns array directly, map each product
    const mappedProducts = response.data.map(mapBackendProduct);
    return { products: mappedProducts };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const addProduct = async (frontendData) => {
  try {
    // Map frontend data to backend format
    const backendData = mapToBackendProduct(frontendData);
    const response = await api.post('/add-product', backendData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error('Failed to add product');
  }
};

export const updateProduct = async (id, frontendData) => {
  try {
    // Map frontend update data to backend format
    const backendData = mapToBackendUpdate(frontendData);
    const response = await api.patch(`/update-product/${id}`, backendData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/delete-product/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
};