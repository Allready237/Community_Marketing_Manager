import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface NotificationToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
  autoHide?: boolean;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  type,
  onDismiss,
  autoHide = true
}) => {
  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(onDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [onDismiss, autoHide]);

  const bgColor = type === 'success' ? 'bg-green-900/90' : 'bg-red-900/90';
  const borderColor = type === 'success' ? 'border-green-600' : 'border-red-600';
  const textColor = type === 'success' ? 'text-green-100' : 'text-red-100';
  const iconColor = type === 'success' ? 'text-green-400' : 'text-red-400';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${bgColor} ${borderColor} border rounded-lg shadow-lg p-4 transform transition-all duration-300 ease-in-out`}>
      <div className="flex items-start">
        <Icon className={`h-5 w-5 ${iconColor} mt-0.5 flex-shrink-0`} />
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className={`ml-4 inline-flex text-gray-300 hover:text-white focus:outline-none`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;