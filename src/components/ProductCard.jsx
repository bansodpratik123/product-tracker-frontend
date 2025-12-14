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
    <div className="group backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50 mb-4">
      <div className="flex gap-6">
        {/* Product Image - Left Side */}
        <div className="flex-shrink-0 relative">
          <div className="w-48 h-36 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl flex items-center justify-center">
            <div className="w-20 h-20 bg-slate-600/50 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-8 h-8 text-slate-400" />
            </div>
          </div>

          {/* Status Badge - Top Right Corner of Image */}
          <div className="absolute -top-2 -right-2">
            <StatusBadge status={product.status} />
          </div>
        </div>

        {/* Product Information - Right Side */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-4">
            {/* Product Title */}
            <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors duration-200 line-clamp-2 pr-4">
              {product.title || product.url || 'Product Title'}
            </h3>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(product)}
                className="p-2 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-all duration-200"
                title="Edit Target"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(product)}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-200"
                title="Delete Product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewUrl(product.url)}
                className="p-2 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-all duration-200"
                title="View Product"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Price Information Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Current Price */}
            <div>
              <p className="text-sm text-slate-400 mb-1">Current Price</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(currentPrice)}
              </p>
            </div>

            {/* Target Price */}
            <div>
              <p className="text-sm text-slate-400 mb-1">Target Price</p>
              <p className="text-lg font-semibold text-slate-300">
                {formatCurrency(targetPrice)}
              </p>
            </div>

            {/* Price Difference */}
            <div>
              <p className="text-sm text-slate-400 mb-1">Difference</p>
              {currentPrice > 0 && (
                <div className={`flex items-center gap-2 text-sm ${getPriceDifferenceColor()}`}>
                  {getPriceDifferenceIcon()}
                  <span className="font-medium">
                    {formatCurrency(Math.abs(priceDifference))}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Status Message */}
          {currentPrice > 0 && (
            <div className="mb-4">
              <div className={`flex items-center gap-2 text-sm ${getPriceDifferenceColor()}`}>
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
            </div>
          )}

          {/* Timestamp and URL */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-700/50 gap-2">
            <p className="text-xs text-slate-500">
              Added {formatRelativeTime(product.created_at || product.timestamp)}
            </p>
            <p className="text-xs text-slate-500 truncate max-w-xs" title={product.url}>
              {product.url}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;