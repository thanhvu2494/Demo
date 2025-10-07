import { Snippet } from '@/types';

/**
 * Encode snippet data to base64 URL-safe string
 */
export function encodeSnippet(snippet: Snippet): string {
  try {
    const data = {
      title: snippet.title,
      code: snippet.code,
      language: snippet.language,
      tags: snippet.tags,
      author: snippet.author,
      createdAt: snippet.createdAt,
      complexity: snippet.complexity
    };
    
    const jsonString = JSON.stringify(data);
    const base64 = btoa(encodeURIComponent(jsonString));
    return base64;
  } catch (error) {
    console.error('Error encoding snippet:', error);
    return '';
  }
}

/**
 * Decode base64 URL-safe string to snippet data
 */
export function decodeSnippet(encoded: string): Partial<Snippet> | null {
  try {
    const jsonString = decodeURIComponent(atob(encoded));
    const data = JSON.parse(jsonString);
    return data;
  } catch (error) {
    console.error('Error decoding snippet:', error);
    return null;
  }
}

/**
 * Create shareable URL with encoded snippet
 */
export function createShareableUrl(snippet: Snippet, baseUrl: string): string {
  const encoded = encodeSnippet(snippet);
  return `${baseUrl}/snippets/shared?data=${encoded}`;
}
