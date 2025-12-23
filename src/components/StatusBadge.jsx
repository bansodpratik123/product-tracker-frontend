import { Clock, TrendingDown, AlertCircle } from 'lucide-react';

export default function StatusBadge({ status }) {
  // Map backend status to display text
  const getStatusConfig = () => {
    if (status === 'DROPPED' || status === 'READY_TO_BUY') {
      return {
        text: 'Price Dropped',
        icon: TrendingDown,
        className: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
      };
    } else if (status === 'TRACKING' || status === 'WAIT_FOR_DROP') {
      return {
        text: 'Tracking',
        icon: Clock,
        className: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
      };
    } else {
      return {
        text: 'Error',
        icon: AlertCircle,
        className: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
      };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xl ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.text}
    </span>
  );
}