import { Edit2, Trash2, ExternalLink, TrendingDown, Check } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatRelativeTime } from '../utils/format';

const ProductCard = ({ product, onEdit, onDelete, onViewUrl }) => {
  const currentPrice = product.current_price || 0;
  const targetPrice = product.target_price || 0;
  const priceDifference = currentPrice - targetPrice;
  const isTargetReached = product.status === 'READY_TO_BUY' || product.status === 'DROPPED' || (currentPrice <= targetPrice && currentPrice > 0);

  const getPriceDifferenceIcon = () => {
    if (isTargetReached) {
      return <Check className="w-4 h-4 text-emerald-400" />;
    }
    return <TrendingDown className="w-4 h-4 text-rose-400" />;
  };

  const getPriceDifferenceColor = () => {
    if (isTargetReached) {
      return 'text-emerald-400';
    }
    return 'text-rose-400';
  };

  return (
    <div className="group backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50">
      {/* Product Image Placeholder */}
      <div className="relative mb-4">
        <div className="w-full h-32 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center">
          <div className="w-16 h-16 bg-slate-600/50 rounded-lg flex items-center justify-center">
            <ExternalLink className="w-6 h-6 text-slate-400" />
          </div>
        </div>

        {/* Status Badge - Top Right Corner */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={product.status} />
        </div>
      </div>

      {/* Product Title */}
      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-teal-400 transition-colors duration-200">
        {product.title || product.url || 'Product Title'}
      </h3>

      {/* Price Information */}
      <div className="space-y-3 mb-4">
        {/* Current Price vs Target Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Current Price</p>
            <p className="text-xl font-bold text-white">
              {formatCurrency(currentPrice)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Target Price</p>
            <p className="text-lg font-semibold text-slate-300">
              {formatCurrency(targetPrice)}
            </p>
          </div>
        </div>

        {/* Price Difference Indicator */}
        {currentPrice > 0 && (
          <div className={`flex items-center gap-2 text-sm ${getPriceDifferenceColor()}`}>
            {getPriceDifferenceIcon()}
            <span>
              {product.status === 'READY_TO_BUY'
                ? `🎯 Ready to buy! Save ${formatCurrency(Math.abs(priceDifference))}`
                : product.status === 'DROPPED'
                ? `📉 Price dropped! Save ${formatCurrency(Math.abs(priceDifference))}`
                : product.status === 'WAIT_FOR_DROP'
                ? `⏰ Wait for drop: ${formatCurrency(Math.abs(priceDifference))} above target`
                : isTargetReached
                ? `Target reached! Save ${formatCurrency(Math.abs(priceDifference))}`
                : `${formatCurrency(Math.abs(priceDifference))} above target`
              }
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200"
        >
          <Edit2 className="w-4 h-4" />
          Edit Target
        </button>
        <button
          onClick={() => onDelete(product)}
          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewUrl(product.url)}
          className="p-2 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-all duration-200"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Timestamp */}
      <div className="pt-3 border-t border-slate-700/50">
        <p className="text-xs text-slate-500">
          Added {formatRelativeTime(product.created_at || product.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;