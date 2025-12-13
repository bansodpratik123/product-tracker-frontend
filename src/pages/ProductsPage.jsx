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
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white">Your Products</h1>
              <div className="h-12 w-32 bg-slate-700/50 rounded-lg animate-pulse"></div>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white">Your Products</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-all duration-200 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => setAddModalOpen(true)}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
          </div>

          {/* Products Grid or Empty State */}
          {products.length === 0 ? (
            <EmptyState onAddProduct={() => setAddModalOpen(true)} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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