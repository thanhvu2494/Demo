
/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate code snippet
 */
export const isValidCode = (code: string): boolean => {
  return code.trim().length > 0;
};

/**
 * Sanitize tag name
 */
export const sanitizeTag = (tag: string): string => {
  return tag.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
};
