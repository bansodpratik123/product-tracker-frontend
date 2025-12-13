import { useState } from 'react';
import { X, Trash2, AlertTriangle, Loader2 } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, product, loading }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md backdrop-blur-2xl bg-slate-900/90 border border-slate-700/50 rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Confirm Delete</h2>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-slate-300 mb-4">
            Are you sure you want to delete this product?
          </p>
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
            <p className="text-white font-medium line-clamp-2">
              {product.title || product.url || 'Unknown Product'}
            </p>
            {product.current_price && (
              <p className="text-sm text-slate-400 mt-1">
                Current Price: ₹{Number(product.current_price).toLocaleString('en-IN')}
              </p>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-4">
            This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800/50 transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(product.id)}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;