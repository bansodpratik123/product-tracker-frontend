import { Package, Plus } from 'lucide-react';

const EmptyState = ({ onAddProduct }) => {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-slate-800/40 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Package className="w-12 h-12 text-slate-600" />
      </div>

      <h3 className="text-2xl font-semibold text-white mb-4">
        No products tracked yet
      </h3>

      <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto leading-relaxed">
        Start tracking your favorite products and get notified when prices drop to your target range.
      </p>

      <button
        onClick={onAddProduct}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-200"
      >
        <Plus className="w-5 h-5" />
        Add Your First Product
      </button>
    </div>
  );
};

export default EmptyState;