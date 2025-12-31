// Map backend product format to frontend format
export function mapBackendProduct(backendProduct) {
  return {
    id: backendProduct.product_id,
    url: backendProduct.url,
    title: backendProduct.product_name || '',
    product_url: backendProduct.product_url || backendProduct.url,
    current_price: backendProduct.current_price ? Number(backendProduct.current_price) : undefined,
    target_price: Number(backendProduct.target_price),
    status: mapStatus(backendProduct.status),
    user_id: backendProduct.user_id,
    // Add new fields for price summary and insights
    history_status: backendProduct.history_status || 'NOT_AVAILABLE',
    price_summary: backendProduct.price_summary ? {
      current_price: backendProduct.price_summary.current_price ? Number(backendProduct.price_summary.current_price) : null,
      lowest_price: backendProduct.price_summary.lowest_price ? Number(backendProduct.price_summary.lowest_price) : null,
      average_price: backendProduct.price_summary.average_price ? Number(backendProduct.price_summary.average_price) : null,
      highest_price: backendProduct.price_summary.highest_price ? Number(backendProduct.price_summary.highest_price) : null,
    } : null,
    prediction: backendProduct.prediction || null,
  };
}

// Keep backend status names - they're more descriptive!
function mapStatus(backendStatus) {
  // Just return the backend status as-is since it's more actionable
  return backendStatus || 'WAIT_FOR_DROP';
}

// Map frontend product data for backend requests
export function mapToBackendProduct(frontendData) {
  return {
    url: frontendData.url,
    target_price: Number(frontendData.target_price),
    user_id: 'pratik', // Static user ID for now
  };
}

// Map update request data
export function mapToBackendUpdate(frontendData) {
  return {
    target_price: Number(frontendData.target_price),
  };
}