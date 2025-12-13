import { useState, useEffect } from 'react';
import { X, Edit2, IndianRupee, Loader2 } from 'lucide-react';

const EditTargetModal = ({ isOpen, onClose, onUpdate, product }) => {
  const [targetPrice, setTargetPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product?.target_price) {
      setTargetPrice(product.target_price.toString());
    }
  }, [product]);

  const validatePrice = () => {
    if (!targetPrice.trim()) {
      setError('Target price is required');
      return false;
    }

    if (isNaN(targetPrice) || parseFloat(targetPrice) <= 0) {
      setError('Please enter a valid price');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePrice()) return;

    setLoading(true);
    try {
      await onUpdate(product.id, {
        target_price: parseFloat(targetPrice)
      });

      onClose();
    } catch (error) {
      setError('Failed to update target price. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value) => {
    setTargetPrice(value);
    if (error) {
      setError('');
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg backdrop-blur-2xl bg-slate-900/90 border border-slate-700/50 rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Edit2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white">Edit Target Price</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="mb-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <h3 className="text-sm font-medium text-slate-300 mb-1">Product</h3>
          <p className="text-white line-clamp-2">{product.title || 'Product Title'}</p>
          {product.current_price && (
            <p className="text-sm text-slate-400 mt-1">
              Current Price: ₹{Number(product.current_price).toLocaleString('en-IN')}
            </p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Target Price */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              New Target Price
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={targetPrice}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="1000"
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            {error && (
              <p className="mt-1 text-sm text-rose-400">{error}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Price'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTargetModal;