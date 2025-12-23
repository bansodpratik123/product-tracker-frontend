import { Edit2, Trash2, ExternalLink, TrendingDown, Check, Package, Clock } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatCurrency, formatRelativeTime } from '../utils/format';

const ProductCard = ({ product, onEdit, onDelete, onViewUrl }) => {
  const currentPrice = product.current_price;
  const targetPrice = product.target_price || 0;

  // Calculate price difference
  const priceDifference = (currentPrice != null && targetPrice) ? currentPrice - targetPrice : null;

  // Trust backend status completely
  const isTargetReached = product.status === 'READY_TO_BUY';

  const getPriceStatusSection = () => (
    <div className="flex items-center gap-3">
      {isTargetReached ? (
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
            <Check className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-400">Target reached!</p>
            <p className="text-xs text-slate-500">Ready to buy</p>
          </div>
        </div>
      ) : product.status === 'PENDING_FIRST_CHECK' ? (
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-blue-400">Starting soon</p>
            <p className="text-xs text-slate-500">Tracking will begin</p>
          </div>
        </div>
      ) : priceDifference !== null && priceDifference > 0 ? (
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
            <TrendingDown className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-400">
              {formatCurrency(Math.abs(priceDifference))} to go
            </p>
            <p className="text-xs text-slate-500">Waiting for price drop</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 rounded-lg bg-slate-600/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Wait For Price Drop</p>
            <p className="text-xs text-slate-500">Monitoring price</p>
          </div>
        </div>
      )}
    </div>
  );

  const getActionButtons = () => (
    <div className="flex gap-3 justify-center sm:justify-start">
      {/* Edit Button */}
      <button
        onClick={() => onEdit(product)}
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all"
        title="Edit target price"
      >
        <Edit2 className="w-5 h-5 text-slate-300" />
      </button>

      {/* View Link Button */}
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all"
        title="View product"
      >
        <ExternalLink className="w-5 h-5 text-slate-300" />
      </a>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(product)}
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-all"
        title="Delete product"
      >
        <Trash2 className="w-5 h-5 text-rose-400" />
      </button>
    </div>
  );

  return (
    <div className="group relative backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300">

      {/* MOBILE LAYOUT (< sm breakpoint) */}
      <div className="sm:hidden">
        {/* Product Image Section - Mobile */}
        <div className="relative aspect-video bg-slate-900/50 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title || 'Product'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}

          {/* Fallback placeholder */}
          <div className={`w-full h-full flex items-center justify-center ${product.image ? 'hidden' : 'flex'}`}>
            <Package className="w-16 h-16 text-slate-700" />
          </div>

          {/* Status Badge - OVERLAY on image top-left */}
          <div className="absolute top-3 left-3">
            <StatusBadge status={product.status} />
          </div>
        </div>

        {/* Card Content Section - Mobile */}
        <div className="p-4 space-y-4">
          {/* Product Title */}
          <h3 className="text-lg font-semibold text-white leading-snug break-words">
            {product.title || product.url || 'Untitled Product'}
          </h3>

          {/* Price Row - Current and Target side by side */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-slate-500 mb-1">Current Price</p>
              <p className="text-xl font-bold text-white">
                {currentPrice != null ? formatCurrency(currentPrice) : '—'}
              </p>
            </div>
            <div className="flex-1 text-right">
              <p className="text-xs text-slate-500 mb-1">Target Price</p>
              <p className="text-xl font-bold text-teal-400">
                {formatCurrency(targetPrice)}
              </p>
            </div>
          </div>

          {/* Price Difference Indicator */}
          <div className="pt-3 border-t border-slate-700/50">
            {getPriceStatusSection()}
          </div>

          {/* Action Buttons Row */}
          <div className="pt-4 border-t border-slate-700/50">
            {getActionButtons()}
          </div>
        </div>
      </div>

      {/* TABLET & DESKTOP LAYOUT (>= sm breakpoint) */}
      <div className="hidden sm:flex">
        {/* Product Image Section - Horizontal */}
        <div className="relative w-64 bg-slate-900/50 overflow-hidden flex-shrink-0">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title || 'Product'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}

          {/* Fallback placeholder */}
          <div className={`w-full h-full flex items-center justify-center ${product.image ? 'hidden' : 'flex'}`}>
            <Package className="w-16 h-16 text-slate-700" />
          </div>

          {/* Status Badge - OVERLAY on image top-left */}
          <div className="absolute top-3 left-3">
            <StatusBadge status={product.status} />
          </div>
        </div>

        {/* Card Content Section - Horizontal */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          {/* Top Section - Title and Prices */}
          <div className="space-y-4">
            {/* Product Title */}
            <h3 className="text-xl font-semibold text-white leading-snug break-words">
              {product.title || product.url || 'Untitled Product'}
            </h3>

            {/* Price Row - Current and Target */}
            <div className="flex items-start gap-8">
              <div>
                <p className="text-xs text-slate-500 mb-1">Current Price</p>
                <p className="text-2xl font-bold text-white">
                  {currentPrice != null ? formatCurrency(currentPrice) : '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Target Price</p>
                <p className="text-2xl font-bold text-teal-400">
                  {formatCurrency(targetPrice)}
                </p>
              </div>
            </div>

            {/* Price Difference Indicator */}
            {getPriceStatusSection()}
          </div>

          {/* Bottom Section - Action Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-700/50">
            {getActionButtons()}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;