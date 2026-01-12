/**
 * Alert Component - Status messages with variants
 */

const variants = {
  info: 'bg-teal-50 border-teal-500 text-teal-700',
  success: 'bg-green-50 border-green-500 text-green-700',
  error: 'bg-red-50 border-red-500 text-red-700',
  warning: 'bg-amber-50 border-amber-500 text-amber-700',
};

const icons = {
  info: '💡',
  success: '✓',
  error: '✕',
  warning: '⚠',
};

export default function Alert({ children, variant = 'info', className = '' }) {
  return (
    <div
      className={`
        px-4 py-3 rounded-lg border-l-4 text-sm
        ${variants[variant]} ${className}
      `}
      role="alert"
    >
      <span className="mr-2">{icons[variant]}</span>
      {children}
    </div>
  );
}
