
import { useEffect } from 'react';

declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

export const usePrism = (dependencies: any[] = []) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Prism) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        window.Prism?.highlightAll();
      }, 0);
    }
  }, dependencies);
};
