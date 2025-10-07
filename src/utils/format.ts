
/**
 * Format date to readable string with locale support (client-side only)
 */
export const formatDate = (date: Date | string, locale: string = 'en-US'): string => {
  if (typeof window === 'undefined') return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
};

/**
 * Format date to simple string with locale support (client-side only)
 */
export const formatDateSimple = (date: Date | string, locale: string = 'en-US'): string => {
  if (typeof window === 'undefined') return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale);
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date | string, locale: string = 'en-US'): string => {
  if (typeof window === 'undefined') return '';
  
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second');
  if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  if (diffInSeconds < 2592000) return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  if (diffInSeconds < 31536000) return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
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

/**
 * Format number with locale
 */
export const formatNumber = (num: number, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * Pluralize text based on count
 */
export const pluralize = (count: number, singular: string, plural: string): string => {
  return count === 1 ? singular : plural;
};
