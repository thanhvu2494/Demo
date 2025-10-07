
import { ComplexityInfo } from '@/types';

export class ComplexityService {
  static estimate(code: string): ComplexityInfo {
    const lowerCode = code.toLowerCase();
    
    // Check for triple nested loops - O(n³)
    const tripleNestedLoop = /\b(for|while)\b[^{}]*{[^{}]*\b(for|while)\b[^{}]*{[^{}]*\b(for|while)\b/i.test(code);
    if (tripleNestedLoop) {
      return { notation: 'O(n³)', className: 'cubic' };
    }

    // Check for nested loops - O(n²)
    const nestedLoop = /\b(for|while)\b[^{}]*{[^{}]*\b(for|while)\b/i.test(code);
    if (nestedLoop) {
      return { notation: 'O(n²)', className: 'quadratic' };
    }

    // Check for divide and conquer algorithms (QuickSort, MergeSort, Binary Search)
    const hasDivideConquer = 
      /quicksort|mergesort|merge.*sort|binary.*search/i.test(code) ||
      (lowerCode.includes('pivot') && lowerCode.includes('partition')) ||
      (lowerCode.includes('mid') && lowerCode.includes('left') && lowerCode.includes('right'));
    
    // Check for recursive calls
    const funcNameMatch = code.match(/\bfunction\s+([a-zA-Z0-9_]+)\s*\(/) || 
                         code.match(/\bconst\s+([a-zA-Z0-9_]+)\s*=/) ||
                         code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
    
    let hasRecursion = false;
    if (funcNameMatch) {
      const functionName = funcNameMatch[1];
      const regex = new RegExp(`\\b${functionName}\\s*\\(`, 'g');
      const matches = code.match(regex) || [];
      hasRecursion = matches.length > 1;
    }

    // Recursive with divide and conquer - O(n log n)
    if (hasRecursion && hasDivideConquer) {
      return { notation: 'O(n log n)', className: 'linearithmic' };
    }

    // Fibonacci-like double recursion - O(2ⁿ)
    if (hasRecursion && funcNameMatch) {
      const functionName = funcNameMatch[1];
      const regex = new RegExp(`\\b${functionName}\\s*\\([^)]*\\)`, 'g');
      const matches = code.match(regex) || [];
      // If function calls itself multiple times (like fibonacci)
      if (matches.length >= 3) {
        return { notation: 'O(2ⁿ)', className: 'exponential' };
      }
    }

    // Check for built-in sorting - O(n log n)
    if (/\.sort\(|sorted\(|Arrays\.sort|Collections\.sort/i.test(code)) {
      return { notation: 'O(n log n)', className: 'linearithmic' };
    }

    // Check for single recursion - O(n)
    if (hasRecursion) {
      return { notation: 'O(n)', className: 'linear' };
    }

    // Check for loops - O(n)
    if (/\b(for|while)\b/i.test(code) || 
        /\.forEach\(|\.map\(|\.filter\(|\.reduce\(|\.find\(/i.test(code)) {
      return { notation: 'O(n)', className: 'linear' };
    }

    // Check for logarithmic - O(log n)
    if (/binary.*search|log.*search/i.test(code) || 
        (lowerCode.includes('mid') && lowerCode.includes('low') && lowerCode.includes('high'))) {
      return { notation: 'O(log n)', className: 'logarithmic' };
    }

    // Default - O(1)
    return { notation: 'O(1)', className: 'constant' };
  }
}
