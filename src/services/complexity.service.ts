
import { Complexity } from '@/types';

export class ComplexityService {
  static estimate(code: string): Complexity {
    // Check for nested loops - O(n²)
    if (/\b(for|while)\b.*\s*{[^{}]*\b(for|while)\b/.test(code.replace(/\s/g, ''))) {
      return { notation: 'O(n²)', className: 'On2' };
    }

    // Check for recursive calls - O(2ⁿ)
    const funcNameMatch = code.match(/\bfunction\s+([a-zA-Z0-9_]+)\s*\(/) || 
                         code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
    
    if (funcNameMatch) {
      const functionName = funcNameMatch[1];
      const regex = new RegExp(`\\b${functionName}\\s*\\(`, 'g');
      if ((code.match(regex) || []).length > 1) {
        return { notation: 'O(2ⁿ)', className: 'O2n' };
      }
    }

    // Check for sorting - O(n log n)
    if (/\.sort\(|sorted\(/.test(code)) {
      return { notation: 'O(n log n)', className: 'Onlogn' };
    }

    // Check for loops - O(n)
    if (/\b(for|while)\b/.test(code) || 
        /\.forEach\(|\.map\(|\.filter\(|\.reduce\(/.test(code)) {
      return { notation: 'O(n)', className: 'On' };
    }

    // Default - O(1)
    return { notation: 'O(1)', className: 'O1' };
  }
}
