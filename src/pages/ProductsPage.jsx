import { useState, useEffect } from 'react';
import { RefreshCw, Plus } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import EditTargetModal from '../components/EditTargetModal';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/api';

const ProductsPage = ({ showToast }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products || []);
    } catch (error) {
      showToast('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getProducts();
      setProducts(data.products || []);
      showToast('Products refreshed successfully', 'success');
    } catch (error) {
      showToast('Failed to refresh products', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      await addProduct(productData);
      showToast('Product added successfully', 'success');
      fetchProducts(); // Refresh the list
    } catch (error) {
      showToast('Failed to add product', 'error');
      throw error; // Re-throw to handle in modal
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleUpdateProduct = async (productId, updateData) => {
    try {
      await updateProduct(productId, updateData);
      showToast('Target price updated successfully', 'success');
      fetchProducts(); // Refresh the list
    } catch (error) {
      showToast('Failed to update target price', 'error');
      throw error; // Re-throw to handle in modal
    }
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setConfirmModalOpen(true);
  };

  const confirmDelete = async (productId) => {
    setDeleteLoading(true);
    try {
      await deleteProduct(productId);
      showToast('Product deleted successfully', 'success');
      setConfirmModalOpen(false);
      fetchProducts(); // Refresh the list
    } catch (error) {
      showToast('Failed to delete product', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewUrl = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16">
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="h-12 bg-slate-700/50 rounded-lg mb-2 w-80 animate-pulse"></div>
                <div className="h-4 bg-slate-700/30 rounded w-32 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-20 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="h-10 w-32 bg-slate-700/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-16">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">Your Products</h1>
            {products.length > 0 && (
              <p className="text-slate-400 mb-4 sm:mb-6">
                Tracking {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            )}

            {/* Action buttons - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setAddModalOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-teal-500/50 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-700 bg-slate-800/50 text-white font-semibold hover:bg-slate-700/50 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Products Grid or Empty State */}
          {products.length === 0 ? (
            <EmptyState onAddProduct={() => setAddModalOpen(true)} />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                  onViewUrl={handleViewUrl}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddProduct}
      />

      <EditTargetModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onUpdate={handleUpdateProduct}
        product={selectedProduct}
      />

      <ConfirmModal
        isOpen={confirmModalOpen}
        onClose={() => {
          setConfirmModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={confirmDelete}
        product={selectedProduct}
        loading={deleteLoading}
      />
    </div>
  );
};

export default ProductsPage;