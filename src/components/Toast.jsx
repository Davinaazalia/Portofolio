import { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const Toast = ({ toast, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (toast.variant) {
      case 'destructive':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 flex items-start gap-3 p-4 rounded-lg shadow-lg border transition-all duration-300 max-w-md',
        'bg-card border-border backdrop-blur-md',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full',
        toast.variant === 'destructive' && 'border-red-500/20 bg-red-50/90 dark:bg-red-950/90'
      )}
    >
      {getIcon()}
      <div className="flex-1 space-y-1">
        <h4 className="font-semibold text-sm">{toast.title}</h4>
        {toast.description && (
          <p className="text-sm text-muted-foreground">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="p-1 rounded-full hover:bg-background/50 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Make toast function available globally
  useEffect(() => {
    window.toast = addToast;
  }, []);

  return (
    <>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  );
};

// Simple hook for using toast
export const useToast = () => {
  return {
    toast: (options) => {
      if (window.toast) {
        window.toast(options);
      }
    }
  };
};
