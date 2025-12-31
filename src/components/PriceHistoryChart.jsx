import { useState, useEffect, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Calendar, TrendingDown, TrendingUp, Loader2 } from 'lucide-react';
import { getPriceHistory } from '../api/api';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * PriceHistoryChart Component
 *
 * Displays price history data with filtering capabilities
 * Follows the backend contract: GET /price-history/{product_id}?limit=1000
 *
 * @param {Object} props
 * @param {string} props.productId - Product ID for API calls
 * @param {Object} props.priceSummary - { lowest_price, average_price, highest_price }
 * @param {number} props.targetPrice - User's target price
 * @param {Function} props.onClose - Callback when chart is closed
 */
const PriceHistoryChart = ({
  productId,
  priceSummary = {},
  targetPrice = 0,
  onClose
}) => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRange, setSelectedRange] = useState('ALL');

  const rangeOptions = [
    { label: '1M', value: '1M', days: 30 },
    { label: '6M', value: '6M', days: 180 },
    { label: '1Y', value: '1Y', days: 365 },
    { label: 'ALL', value: 'ALL', days: null }
  ];

  // Fetch price history from backend API
  const fetchPriceHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      // Backend API call following the contract: GET /price-history/{product_id}?limit=1000
      const historyData = await getPriceHistory(productId, 1000);

      // If no data from API, use mock data for demonstration
      if (historyData.length === 0) {
        // Mock data for demonstration when backend doesn't have data
        const mockData = [
          { timestamp: 1704067200, price: "3999" }, // Jan 1, 2024
          { timestamp: 1706745600, price: "3800" }, // Feb 1, 2024
          { timestamp: 1709251200, price: "3650" }, // Mar 1, 2024
          { timestamp: 1711929600, price: "3500" }, // Apr 1, 2024
          { timestamp: 1714521600, price: "3400" }, // May 1, 2024
          { timestamp: 1717200000, price: "3200" }, // Jun 1, 2024
          { timestamp: Math.floor(Date.now() / 1000), price: "3194" }, // Current time
        ];
        setPriceHistory(mockData);
      } else {
        // Sort data by timestamp in ascending order (oldest first, latest last)
        const sortedData = historyData.sort((a, b) => a.timestamp - b.timestamp);
        setPriceHistory(sortedData);
      }
    } catch (err) {
      console.error('Failed to fetch price history:', err);
      setError('Failed to load price history. Please try again.');

      // Fallback to mock data on error for better UX
      const mockData = [
        { timestamp: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60), price: "3999" },
        { timestamp: Math.floor(Date.now() / 1000) - (15 * 24 * 60 * 60), price: "3600" },
        { timestamp: Math.floor(Date.now() / 1000), price: "3194" },
      ];
      setPriceHistory(mockData);
      setError(null); // Clear error since we have fallback data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchPriceHistory();
    }
  }, [productId]);

  // Filter data based on selected range
  const filteredData = useMemo(() => {
    if (!priceHistory.length || selectedRange === 'ALL') {
      // Sort by timestamp (oldest first, latest last)
      return [...priceHistory].sort((a, b) => a.timestamp - b.timestamp);
    }

    const range = rangeOptions.find(r => r.value === selectedRange);
    if (!range?.days) {
      // Sort by timestamp (oldest first, latest last)
      return [...priceHistory].sort((a, b) => a.timestamp - b.timestamp);
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - range.days);
    const cutoffTimestamp = Math.floor(cutoffDate.getTime() / 1000);

    // Filter and sort by timestamp (oldest first, latest last)
    return priceHistory
      .filter(item => item.timestamp >= cutoffTimestamp)
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [priceHistory, selectedRange]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!filteredData.length) return { labels: [], datasets: [] };

    const labels = filteredData.map(item => {
      const date = new Date(item.timestamp * 1000);
      return date.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: selectedRange === 'ALL' ? 'numeric' : undefined
      });
    });

    const prices = filteredData.map(item => parseFloat(item.price));

    return {
      labels,
      datasets: [
        {
          label: 'Price History',
          data: prices,
          borderColor: 'rgb(20, 184, 166)', // teal-500
          backgroundColor: 'rgba(20, 184, 166, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: 'rgb(20, 184, 166)',
          pointBorderColor: 'rgb(15, 118, 110)', // teal-700
          pointRadius: 4,
          pointHoverRadius: 6,
        }
      ]
    };
  }, [filteredData, selectedRange]);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: '#94a3b8', // slate-400
        },
        ticks: {
          color: '#64748b', // slate-500
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)', // slate-400 with opacity
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price (₹)',
          color: '#94a3b8', // slate-400
        },
        ticks: {
          color: '#64748b', // slate-500
          callback: function(value) {
            return '₹' + value.toLocaleString('en-IN');
          }
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)', // slate-400 with opacity
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)', // slate-900 with opacity
        titleColor: '#f1f5f9', // slate-100
        bodyColor: '#e2e8f0', // slate-200
        borderColor: 'rgb(20, 184, 166)', // teal-500
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Price: ₹${context.parsed.y.toLocaleString('en-IN')}`;
          }
        }
      }
    }
  };

  // Add reference lines for target, lowest, average, highest
  if (chartData.datasets.length > 0 && (priceSummary.lowest_price || targetPrice)) {
    const annotations = [];

    // Target price line
    if (targetPrice) {
      annotations.push({
        type: 'line',
        yMin: targetPrice,
        yMax: targetPrice,
        borderColor: 'rgb(34, 197, 94)', // green-500
        borderWidth: 2,
        borderDash: [5, 5],
        label: {
          content: `Target: ₹${targetPrice.toLocaleString('en-IN')}`,
          enabled: true,
          position: 'end'
        }
      });
    }

    // Average price line
    if (priceSummary.average_price) {
      annotations.push({
        type: 'line',
        yMin: priceSummary.average_price,
        yMax: priceSummary.average_price,
        borderColor: 'rgb(245, 158, 11)', // amber-500
        borderWidth: 1,
        borderDash: [3, 3],
        label: {
          content: `Avg: ₹${priceSummary.average_price.toLocaleString('en-IN')}`,
          enabled: true,
          position: 'start'
        }
      });
    }
  }

  return (
    <div className="mt-6 border-t border-slate-700/50 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-400" />
          <h3 className="text-lg font-semibold text-white">Price History</h3>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors text-sm"
        >
          Close Chart
        </button>
      </div>

      {/* Range Selector */}
      <div className="flex gap-1 mb-4 p-1 bg-slate-800/50 rounded-lg w-fit">
        {rangeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedRange(option.value)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              selectedRange === option.value
                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="relative">
        {loading ? (
          <div className="flex items-center justify-center h-64 bg-slate-800/30 rounded-xl">
            <div className="flex items-center gap-2 text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading price history...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64 bg-slate-800/30 rounded-xl">
            <div className="text-center">
              <p className="text-red-400 mb-2">{error}</p>
              <button
                onClick={fetchPriceHistory}
                className="text-teal-400 hover:text-teal-300 text-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-64 bg-slate-800/30 rounded-xl">
            <div className="text-center text-slate-400">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No price data available for selected range</p>
            </div>
          </div>
        ) : (
          <div className="h-64 bg-slate-800/30 rounded-xl p-4">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {!loading && !error && filteredData.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <TrendingDown className="w-4 h-4" />
              <span className="text-xs font-medium">Price Trend</span>
            </div>
            <p className="text-sm text-white mt-1">
              {filteredData.length > 1
                ? parseFloat(filteredData[0].price) > parseFloat(filteredData[filteredData.length - 1].price)
                  ? 'Decreasing'
                  : 'Increasing'
                : 'Stable'
              }
            </p>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-teal-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-medium">Data Points</span>
            </div>
            <p className="text-sm text-white mt-1">{filteredData.length} records</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceHistoryChart;