
export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Snippet {
  id: number;
  title?: string;
  code: string;
  language: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt?: string;
  complexity: {
    notation: string;
    className: string;
  };
  explanation?: string;
}

export interface ComplexityInfo {
  notation: string;
  className: string;
  description?: string;
}

export type ViewType = 'home' | 'tag' | 'profile' | 'detail';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

export interface Route {
  view: ViewType;
  params: Record<string, string>;
}

export interface GeminiResponse {
  text: string;
}
