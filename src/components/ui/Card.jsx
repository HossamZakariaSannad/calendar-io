/**
 * Card Component - Container with consistent styling
 */

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`
        bg-white rounded-2xl border-2 border-gray-200 p-4 sm:p-6 lg:p-8 shadow-md
        transition-all duration-300
        ${hover ? 'hover:shadow-xl hover:border-teal-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 mb-4 ${className}`}>
      {children}
    </h2>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-sm text-gray-500 mb-4 ${className}`}>
      {children}
    </p>
  );
}
