import { TrendingDown, Clock, AlertCircle, Check } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'PENDING_FIRST_CHECK':
        return {
          icon: Clock,
          text: 'Starting',
          className: 'bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-xl'
        };
      case 'WAIT_FOR_DROP':
        return {
          icon: Clock,
          text: 'Tracking',
          className: 'bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-xl'
        };
      case 'READY_TO_BUY':
        return {
          icon: Check,
          text: 'Ready',
          className: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-xl'
        };
      case 'ERROR':
        return {
          icon: AlertCircle,
          text: 'Error',
          className: 'bg-rose-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-xl'
        };
      default:
        return {
          icon: Clock,
          text: 'Starting',
          className: 'bg-blue-500/20 text-blue-300 border border-blue-500/30 backdrop-blur-xl'
        };
    }
  };

  const { icon: Icon, text, className } = getStatusConfig();

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${className}`}>
      <Icon className="w-3 h-3" />
      {text}
    </span>
  );
};

export default StatusBadge;