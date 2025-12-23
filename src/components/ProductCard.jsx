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

  return (
    <>
      {/* MOBILE LAYOUT - Image on top (visible only on mobile) */}
      <div className="md:hidden group relative backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300">

        {/* Product Image */}
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

          <div className="absolute top-3 left-3">
            <StatusBadge status={product.status} />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-4">
          <h3 className="text-lg font-semibold text-white leading-snug break-words">
            {product.title || product.url || 'Untitled Product'}
          </h3>

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

          <div className="pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-3">
              {product.status === 'READY_TO_BUY' ? (
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Target reached!</p>
                    <p className="text-xs text-slate-500">Price dropped below your target. It's a good time to buy.</p>
                  </div>
                </div>
              ) : product.status === 'WAIT_FOR_DROP' ? (
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-400">
                      {formatCurrency(Math.abs(priceDifference))} to go
                    </p>
                    <p className="text-xs text-slate-500">We'll notify you when the price goes below {formatCurrency(targetPrice)}.</p>
                  </div>
                </div>
              ) : product.status === 'ERROR' ? (
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-400">Tracking failed</p>
                    <p className="text-xs text-slate-500">We'll retry automatically. You can also edit or re-add this product.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-400">Starting soon</p>
                    <p className="text-xs text-slate-500">Tracking will begin</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50">
            <div className="flex gap-3 justify-center sm:justify-start">
              <button
                onClick={() => onEdit(product)}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all"
                title="Edit target price"
              >
                <Edit2 className="w-5 h-5 text-slate-300" />
              </button>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all"
                title="View product"
              >
                <ExternalLink className="w-5 h-5 text-slate-300" />
              </a>

              <button
                onClick={() => onDelete(product)}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-all"
                title="Delete product"
              >
                <Trash2 className="w-5 h-5 text-rose-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT - OLD HORIZONTAL LAYOUT (visible only on desktop) */}
      <div className="hidden md:block group relative backdrop-blur-xl bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300">
        <div className="flex gap-6">

          {/* Left: Image */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 bg-slate-900/50 rounded-xl overflow-hidden">
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

              <div className="absolute top-3 left-3">
                <StatusBadge status={product.status} />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-4 break-words">
              {product.title || product.url || 'Untitled Product'}
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Current Price</p>
                <p className="text-2xl font-bold text-white">
                  {currentPrice != null ? formatCurrency(currentPrice) : '—'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Target Price</p>
                <p className="text-2xl font-bold text-teal-400">
                  {formatCurrency(targetPrice)}
                </p>
              </div>
            </div>

            <div className="mb-4 pb-4 border-b border-slate-700/50">
              {product.status === 'READY_TO_BUY' ? (
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-lg font-medium text-emerald-400">Target reached!</p>
                    <p className="text-sm text-slate-500">Price dropped below your target. It's a good time to buy.</p>
                  </div>
                </div>
              ) : product.status === 'WAIT_FOR_DROP' ? (
                <div className="flex items-center gap-3">
                  <TrendingDown className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-lg font-medium text-orange-400">
                      {formatCurrency(Math.abs(priceDifference))} to go
                    </p>
                    <p className="text-sm text-slate-500">We'll notify you when the price goes below {formatCurrency(targetPrice)}.</p>
                  </div>
                </div>
              ) : product.status === 'ERROR' ? (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-lg font-medium text-red-400">Tracking failed</p>
                    <p className="text-sm text-slate-500">We'll retry automatically. You can also edit or re-add this product.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-lg font-medium text-blue-400">Starting soon</p>
                    <p className="text-sm text-slate-500">Tracking will begin</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => onEdit(product)}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all"
                title="Edit target price"
              >
                <Edit2 className="w-5 h-5 text-slate-300" />
                <span className="text-slate-300">Edit</span>
              </button>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 transition-all"
                title="View product"
              >
                <ExternalLink className="w-5 h-5 text-slate-300" />
                <span className="text-slate-300">View</span>
              </a>

              <button
                onClick={() => onDelete(product)}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 transition-all"
                title="Delete product"
              >
                <Trash2 className="w-5 h-5 text-rose-400" />
                <span className="text-rose-400">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;