import { TrendingDown, Clock, AlertCircle, Check } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'WAIT_FOR_DROP':
        return {
          icon: Clock,
          text: 'Wait for Drop',
          className: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        };
      case 'READY_TO_BUY':
        return {
          icon: Check,
          text: 'Ready to Buy',
          className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        };
      case 'DROPPED':
        return {
          icon: TrendingDown,
          text: 'Price Dropped',
          className: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
        };
      case 'ERROR':
        return {
          icon: AlertCircle,
          text: 'Error',
          className: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
        };
      default:
        return {
          icon: Clock,
          text: 'Wait for Drop',
          className: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        };
    }
  };

  const { icon: Icon, text, className } = getStatusConfig();

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium border rounded-full ${className}`}>
      <Icon className="w-3 h-3" />
      {text}
    </span>
  );
};

export default StatusBadge;