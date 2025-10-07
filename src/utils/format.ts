
/**
 * Format date to readable string (client-side only)
 */
export const formatDate = (date: Date | string): string => {
  if (typeof window === 'undefined') return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
};

/**
 * Format date to simple string (client-side only)
 */
export const formatDateSimple = (date: Date | string): string => {
  if (typeof window === 'undefined') return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString();
};

/**
 * Truncate text to specified length
 */
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
