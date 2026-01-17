import { useState } from 'react';
import { Edit2, Trash2, ExternalLink, TrendingDown, Check, Package, Clock, BarChart3, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriceHistoryChart from './PriceHistoryChart';
import { formatCurrency } from '../utils/format';

/**
 * Enhanced ProductCard with expandable price history chart
 *
 * Backend Contract:
 * 1. Product Summary: GET /product/{product_id}?user_id=<USER_ID>
 * 2. Price History: GET /price-history/{product_id}?limit=1000 (loaded only when chart expanded)
 *
 * Features:
 * - Shows price summary and prediction without expansion
 * - Expandable chart with historical data
 * - Responsive design (mobile vertical, desktop horizontal)
 * - State management per card (no global store)
 */
const EnhancedProductCard = ({ product, onEdit, onDelete, onViewUrl }) => {
  // Component state
  const [isChartExpanded, setIsChartExpanded] = useState(false);

  // Extract basic product data (fallback to existing product data)
  const productId = product.id || product.product_id;
  const productName = product.title || product.product_name || product.product_url || formatUrlDisplay(product.url);
  const currentPrice = product.current_price;
  const targetPrice = product.target_price || 0;
  const productStatus = product.status;

  // Use data directly from props instead of separate API call
  const productSummary = {
    product_id: productId,
    product_name: productName,
    current_price: currentPrice,
    target_price: targetPrice,
    status: productStatus,
    history_status: product.history_status || 'NOT_AVAILABLE',
    price_summary: product.price_summary || {
      lowest_price: null,
      average_price: null,
      highest_price: null
    },
    prediction: product.prediction || {
      message: null,
      confidence: 'LOW'
    }
  };

  // Add debug logging
  console.log('Product data in EnhancedProductCard:', product);
  console.log('Price summary:', product.price_summary);
  console.log('Prediction:', product.prediction);

  // Format URL for display when no title is available
  function formatUrlDisplay(url) {
    if (!url) return 'Product';

    try {
      const urlObj = new URL(url);
      let domain = urlObj.hostname.replace(/^www\./, ''); // Remove www.

      // If domain is too long, truncate it
      if (domain.length > 25) {
        domain = domain.substring(0, 22) + '...';
      }

      return domain;
    } catch (error) {
      // If URL is invalid, just show the raw URL truncated
      if (url.length > 30) {
        return url.substring(0, 27) + '...';
      }
      return url;
    }
  }

  // Calculate price difference
  const priceDifference = (currentPrice != null && targetPrice) ? currentPrice - targetPrice : null;
  const isTargetReached = productStatus === 'READY_TO_BUY';

  // Toggle chart expansion
  const toggleChart = () => {
    setIsChartExpanded(!isChartExpanded);
  };

  // Render price summary section
  const renderPriceSummary = () => {
    const summary = productSummary?.price_summary;
    const historyStatus = productSummary?.history_status;

    // Case 1: history_status = AVAILABLE - Show chart button enabled + Min/Avg/Max visible
    if (historyStatus === 'AVAILABLE' && summary && (summary.lowest_price || summary.average_price || summary.highest_price)) {
      return (
        <div className="flex flex-col justify-center items-start h-full">
          <h4 className="text-sm uppercase tracking-wide text-slate-300 mb-4 font-bold border-b border-slate-600/50 pb-2 w-full">
            Price Insights
          </h4>

          <div className="space-y-4 w-full">
            {summary.lowest_price && (
              <div className="flex justify-between w-full items-center p-2 rounded-lg bg-emerald-500/5">
                <span className="text-slate-400 text-sm">Lowest</span>
                <span className="font-semibold text-emerald-400">{formatCurrency(summary.lowest_price)}</span>
              </div>
            )}

            {summary.average_price && (
              <div className="flex justify-between w-full items-center p-2 rounded-lg bg-amber-500/5">
                <span className="text-slate-400 text-sm">Average</span>
                <span className="font-semibold text-amber-400">{formatCurrency(summary.average_price)}</span>
              </div>
            )}

            {summary.highest_price && (
              <div className="flex justify-between w-full items-center p-2 rounded-lg bg-rose-500/5">
                <span className="text-slate-400 text-sm">Highest</span>
                <span className="font-semibold text-rose-400">{formatCurrency(summary.highest_price)}</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Case 2: history_status = IN_PROGRESS - Show loader
    if (historyStatus === 'IN_PROGRESS') {
      return (
        <div className="text-center text-slate-500 text-sm">
          <div className="w-8 h-8 rounded-lg bg-slate-700/30 flex items-center justify-center mx-auto mb-1">
            <div className="w-4 h-4 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin"></div>
          </div>
          <p>⏳ Preparing price history…</p>
        </div>
      );
    }

    // Case 3: history_status = FAILED - Show soft warning
    if (historyStatus === 'FAILED') {
      return (
        <div className="text-center text-slate-500 text-sm">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mx-auto mb-1">
            <span className="text-amber-400">⚠️</span>
          </div>
          <p className="text-xs text-amber-400 mb-1">Price history unavailable</p>
          <p className="text-xs text-slate-500">Tracking continues for future drops</p>
        </div>
      );
    }

    // Default/loading state
    return (
      <div className="text-center text-slate-500 text-sm">
        <div className="w-8 h-8 rounded-lg bg-slate-700/30 flex items-center justify-center mx-auto mb-1">
          <BarChart3 className="w-4 h-4" />
        </div>
        <p>Insights Loading...</p>
      </div>
    );
  };

  // Render prediction section
  const renderPrediction = () => {
    const prediction = productSummary?.prediction;
    if (!prediction || !prediction.message) return null;

    const confidence = prediction.confidence || 'LOW';

    // Enhanced confidence-based styling
    const confidenceStyles = {
      'HIGH': {
        badge: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
        border: 'border-emerald-400',
        icon: 'text-emerald-400'
      },
      'MEDIUM': {
        badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
        border: 'border-amber-400',
        icon: 'text-amber-400'
      },
      'LOW': {
        badge: 'bg-red-500/15 text-red-400 border border-red-500/30',
        border: 'border-red-400',
        icon: 'text-red-400'
      }
    };

    const style = confidenceStyles[confidence] || confidenceStyles['LOW'];

    return (
      <div className={`mt-4 p-4 rounded-xl bg-white/5 border-l-4 ${style.border}`}>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Sparkles className={`w-5 h-5 ${style.icon}`} />
          </div>
          <span className="text-sm font-semibold text-white">
            AI Insight
          </span>
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${style.badge}`}>
            {confidence} confidence
          </span>
          <p className="text-sm text-slate-300 flex-1">
            {prediction.message}
          </p>
        </div>
      </div>
    );
  };

  // Render action buttons with improved grouping
  const renderActionButtons = (isMobile = false) => (
    <div className={`flex ${isMobile ? 'justify-center' : 'justify-between'} items-center`}>
      {/* Primary Actions Group */}
      <div className="flex gap-2">
        {/* Edit Button */}
        <button
          onClick={() => onEdit(product)}
          className={`flex items-center justify-center ${isMobile ? 'w-10 h-10' : 'gap-2 px-3 py-2'} rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200`}
          title="Edit target price"
        >
          <Edit2 className="w-4 h-4 text-slate-300" />
          {!isMobile && <span className="text-slate-300 text-sm font-medium">Edit</span>}
        </button>

        {/* View Product Button */}
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center ${isMobile ? 'w-10 h-10' : 'gap-2 px-3 py-2'} rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-all duration-200`}
          title="View product"
        >
          <ExternalLink className="w-4 h-4 text-slate-300" />
          {!isMobile && <span className="text-slate-300 text-sm font-medium">View</span>}
        </a>

        {/* Price Chart Button - Glass Effect */}
        <button
          onClick={toggleChart}
          disabled={productSummary?.history_status !== 'AVAILABLE'}
          className={`flex items-center justify-center ${isMobile ? 'w-10 h-10' : 'gap-2 px-3 py-2'} rounded-lg transition-all duration-200 ${
            productSummary?.history_status === 'AVAILABLE'
              ? 'bg-teal-500/20 backdrop-blur-sm border border-teal-500/30 hover:bg-teal-500/30 hover:shadow-lg hover:shadow-teal-500/25 text-teal-300'
              : 'bg-slate-700/30 text-slate-500 cursor-not-allowed'
          }`}
          title={productSummary?.history_status === 'AVAILABLE' ? 'Toggle price chart' : 'Price history unavailable'}
        >
          <BarChart3 className="w-4 h-4" />
          {!isMobile && <span className="text-sm font-medium">Chart</span>}
          {!isMobile && productSummary?.history_status === 'AVAILABLE' && (
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isChartExpanded ? 'rotate-180' : ''}`} />
          )}
        </button>
      </div>

      {/* Destructive Action - Separated */}
      {!isMobile && (
        <button
          onClick={() => onDelete(product)}
          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-200"
          title="Delete product"
        >
          <Trash2 className="w-4 h-4" />
          <span className="text-sm font-medium">Delete</span>
        </button>
      )}

      {/* Mobile Delete Button */}
      {isMobile && (
        <button
          onClick={() => onDelete(product)}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all duration-200 ml-4"
          title="Delete product"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="group relative backdrop-blur-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-1 transition-all duration-200 ease-out">
      {/* MOBILE LAYOUT - Vertical */}
      <div className="md:hidden">
        {/* Product Image - Grid Centered */}
        <div className="relative h-80 bg-slate-900 rounded-t-2xl grid place-items-center overflow-hidden p-4">
          {product.image ? (
            <img
              src={product.image}
              alt={productName}
              title={productName}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}

          <div className={`w-full h-full flex items-center justify-center ${product.image ? 'hidden' : 'flex'}`}>
            <Package className="w-16 h-16 text-slate-700" />
          </div>

          <div className="absolute top-3 left-3 z-10">
            <StatusBadge status={productStatus} />
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4 space-y-4">
          {/* Product Name - Full display without truncation */}
          <h3 className="text-xl font-bold text-white leading-tight break-words" title={productName}>
            {productName}
          </h3>

          {/* Subtle Divider */}
          <div className="w-full h-px bg-slate-600/30 mt-4 mb-4"></div>

          {/* Price Section - Enhanced Hierarchy */}
          <div className="space-y-4">
            <div>
              <p className="text-base text-slate-400 mb-1">Current Price</p>
              <p className="text-3xl font-bold text-white">
                {currentPrice != null ? formatCurrency(currentPrice) : '—'}
              </p>
            </div>
            <div>
              <p className="text-base text-slate-400 mb-1">Target Price</p>
              <p className="text-3xl font-bold text-teal-400">
                {formatCurrency(targetPrice)}
              </p>
            </div>
          </div>

          {/* Status Section */}
          <div className="pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-3 mb-3">
              {productStatus === 'READY_TO_BUY' ? (
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Target reached!</p>
                    <p className="text-xs text-slate-500">Price dropped below your target. It's a good time to buy.</p>
                  </div>
                </div>
              ) : productStatus === 'WAIT_FOR_DROP' ? (
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-400">
                      {priceDifference > 0 ? `${formatCurrency(Math.abs(priceDifference))} to go` : 'Monitoring price'}
                    </p>
                    <p className="text-xs text-slate-500">We'll notify you when the price goes below {formatCurrency(targetPrice)}.</p>
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

            {/* Prediction (Mobile) */}
            {renderPrediction()}
          </div>

          {/* Mobile Price Insights */}
          <div className="pt-4 border-t border-slate-700/50">
            <h4 className="text-sm uppercase tracking-wide text-slate-300 mb-4 font-bold border-b border-slate-600/50 pb-2">
              Price Insights
            </h4>
            <div className="space-y-3">
              {productSummary?.price_summary?.lowest_price && (
                <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-500/5">
                  <span className="text-slate-400 text-sm">Lowest</span>
                  <span className="font-semibold text-emerald-400">{formatCurrency(productSummary.price_summary.lowest_price)}</span>
                </div>
              )}
              {productSummary?.price_summary?.average_price && (
                <div className="flex justify-between items-center p-2 rounded-lg bg-amber-500/5">
                  <span className="text-slate-400 text-sm">Average</span>
                  <span className="font-semibold text-amber-400">{formatCurrency(productSummary.price_summary.average_price)}</span>
                </div>
              )}
              {productSummary?.price_summary?.highest_price && (
                <div className="flex justify-between items-center p-2 rounded-lg bg-rose-500/5">
                  <span className="text-slate-400 text-sm">Highest</span>
                  <span className="font-semibold text-rose-400">{formatCurrency(productSummary.price_summary.highest_price)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Freshness Indicator */}
          <div className="pt-3 border-t border-slate-700/50">
            <p className="text-xs text-slate-400 mb-3">
              Last checked: This afternoon
            </p>
            {/* Action Buttons */}
            {renderActionButtons(true)}
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Hybrid approach: flex for columns, absolute title spanning */}
      <div className="hidden md:flex relative">
        {/* Left: Product Image - Auto Height Centered */}
        <div className="relative w-80 bg-slate-900 rounded-xl grid place-items-center overflow-hidden flex-shrink-0 p-4">
          {product.image ? (
            <img
              src={product.image}
              alt={productName}
              title={productName}
              className="w-full h-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}

          <div className={`w-full h-full flex items-center justify-center ${product.image ? 'hidden' : 'flex'}`}>
            <Package className="w-16 h-16 text-slate-700" />
          </div>

          <div className="absolute top-3 left-3 z-10">
            <StatusBadge status={productStatus} />
          </div>
        </div>

        {/* Right Content Area with unified background and extended divider */}
        <div className="flex-1 flex flex-col">
          {/* Title spanning across both columns */}
          <div className="px-5 pt-5 pb-4">
            <h3 className="text-2xl font-bold text-white leading-tight break-words" title={productName}>
              {productName}
            </h3>
            <div className="w-full h-px bg-slate-600/30 mt-5 mb-2"></div>
          </div>

          {/* Content area with full height for extended vertical divider */}
          <div className="flex flex-1">
            {/* Center: Main Content */}
            <div className="flex-1 min-w-0 px-5 pb-5 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Price Row - Refined Typography */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Current Price</p>
                    <p className="text-3xl font-bold text-white">
                      {currentPrice != null ? formatCurrency(currentPrice) : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Target Price</p>
                    <p className="text-3xl font-bold text-teal-400">
                      {formatCurrency(targetPrice)}
                    </p>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-3">
                  {productStatus === 'READY_TO_BUY' ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-lg font-medium text-emerald-400">Target reached!</p>
                        <p className="text-sm text-slate-500">Price dropped below your target. It's a good time to buy.</p>
                      </div>
                    </>
                  ) : productStatus === 'WAIT_FOR_DROP' ? (
                    <>
                      <TrendingDown className="w-5 h-5 text-orange-400" />
                      <div>
                        <p className="text-lg font-medium text-orange-400">
                          {priceDifference > 0 ? `${formatCurrency(Math.abs(priceDifference))} to go` : 'Monitoring price'}
                        </p>
                        <p className="text-sm text-slate-500">We'll notify you when the price goes below {formatCurrency(targetPrice)}.</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Clock className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-lg font-medium text-blue-400">Starting soon</p>
                        <p className="text-sm text-slate-500">Tracking will begin</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Prediction (Desktop) */}
                {renderPrediction()}
              </div>

              {/* Bottom section */}
              <div className="space-y-4">
                {/* Freshness Indicator - positioned between AI insight and divider */}
                <div className="pt-2">
                  <p className="text-xs text-slate-400 text-center">
                    Last checked: This afternoon
                  </p>
                </div>

                {/* Section Divider */}
                <div className="h-px bg-white/10" />

                {/* Action Buttons */}
                <div>
                  {renderActionButtons(false)}
                </div>
              </div>
            </div>

            {/* Right: Price Summary with extended border */}
            <div className="w-52 px-5 pb-5 border-l border-slate-600/40 flex-shrink-0 h-full">
              {renderPriceSummary()}
            </div>
          </div>
        </div>
      </div>

      {/* EXPANDABLE CHART SECTION */}
      {productSummary?.history_status === 'AVAILABLE' && (
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-in-out border-t border-slate-700/50
            ${isChartExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className={`
            bg-slate-800/20 p-4 transform transition-all duration-500
            ${isChartExpanded ? 'translate-y-0' : '-translate-y-2'}
          `}>
            <PriceHistoryChart
              productId={productId}
              priceSummary={productSummary?.price_summary}
              targetPrice={targetPrice}
              onClose={() => setIsChartExpanded(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedProductCard;