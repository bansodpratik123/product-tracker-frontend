import React from 'react';

export default function StatusBadge({ status }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'PENDING_FIRST_CHECK':
        return {
          text: 'Tracking will start soon',
          icon: '⏳',
          className: 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
        };
      case 'WAIT_FOR_DROP':
        return {
          text: 'Waiting for price drop',
          icon: '👀',
          className: 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
        };
      case 'READY_TO_BUY':
        return {
          text: 'Price dropped 🎉',
          icon: '🎉',
          className: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        };
      case 'UNAVAILABLE':
        return {
          text: 'Price not available',
          icon: '⚠️',
          className: 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
        };
      case 'ERROR':
        return {
          text: 'Tracking failed',
          icon: '❌',
          className: 'bg-red-500/20 text-red-300 border border-red-500/30'
        };
      default:
        return {
          text: 'Tracking will start soon',
          icon: '⏳',
          className: 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xl ${config.className}`}>
      <span className="text-sm">{config.icon}</span>
      {config.text}
    </span>
  );
}