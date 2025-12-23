import { Package, Plus } from 'lucide-react';

const EmptyState = ({ onAddProduct }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-6">
        <Package className="w-10 h-10 sm:w-12 sm:h-12 text-slate-600" />
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
        No products yet
      </h3>

      <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
        Start tracking your first product and get notified when prices drop
      </p>

      <button
        onClick={onAddProduct}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-teal-500/50 transition-all"
      >
        <Plus className="w-5 h-5" />
        Add Your First Product
      </button>
    </div>
  );
};

export default EmptyState;