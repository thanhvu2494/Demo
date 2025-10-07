
export interface User {
  email: string;
}

export interface Snippet {
  id: number;
  author: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  complexity: Complexity;
}

export interface Complexity {
  notation: string;
  className: string;
}

export interface Route {
  view: 'home' | 'snippet' | 'tag' | 'profile';
  params: Record<string, string>;
}

export interface GeminiResponse {
  text: string;
}
