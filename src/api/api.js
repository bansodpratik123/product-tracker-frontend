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

    // Debug: Log raw backend response
    console.log('Raw backend response from getProducts:', response.data);

    // Backend returns array directly, map each product
    const mappedProducts = response.data.map(mapBackendProduct);

    // Debug: Log mapped products
    console.log('Mapped products:', mappedProducts);

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

/**
 * Get product summary with price insights and prediction
 * Backend Contract: GET /product/{product_id}?user_id=<USER_ID>
 *
 * Response includes:
 * - product_id, product_name, current_price, target_price, status
 * - history_status: "AVAILABLE" | "NOT_AVAILABLE"
 * - price_summary: { lowest_price, average_price, highest_price }
 * - prediction: { message, confidence }
 */
export const getProductSummary = async (productId) => {
  try {
    const userId = await getUserId();
    const response = await api.get(`/product/${productId}?user_id=${userId}`);

    // Return raw response as it matches the backend contract
    return {
      product_id: response.data.product_id || response.data.id,
      product_name: response.data.product_name || response.data.title,
      current_price: response.data.current_price,
      target_price: response.data.target_price,
      status: response.data.status,
      history_status: response.data.history_status || "NOT_AVAILABLE", // Default fallback
      price_summary: response.data.price_summary || {
        lowest_price: null,
        average_price: null,
        highest_price: null
      },
      prediction: response.data.prediction || {
        message: "Insufficient data for prediction",
        confidence: "LOW"
      }
    };
  } catch (error) {
    console.error('Error fetching product summary:', error);
    handleAuthError(error);
    throw new Error('Failed to fetch product summary');
  }
};

/**
 * Get price history for chart display
 * Backend Contract: GET /price-history/{product_id}?limit=1000
 *
 * Response: Array of { timestamp: number, price: string }
 * - timestamp: UNIX epoch (seconds)
 * - price: String representation of price
 */
export const getPriceHistory = async (productId, limit = 1000) => {
  try {
    const response = await api.get(`/price-history/${productId}?limit=${limit}`);

    // Validate and return price history data
    const history = Array.isArray(response.data) ? response.data : [];

    return history.map(item => ({
      timestamp: parseInt(item.timestamp),
      price: String(item.price)
    }));
  } catch (error) {
    console.error('Error fetching price history:', error);

    // Don't throw auth errors for price history - it's supplementary data
    if (error.response?.status === 401 || error.response?.status === 403) {
      handleAuthError(error);
    }

    // Return empty array for graceful degradation
    return [];
  }
};