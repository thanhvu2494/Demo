
import { Snippet } from '@/types';

export const INITIAL_SNIPPETS: Snippet[] = [
  {
    id: 1,
    author: 'system@codeshare.io',
    title: 'Find Max Number in a List',
    code: `def find_max(numbers):\n    max_num = float("-inf")\n    for num in numbers:\n        if num > max_num:\n            max_num = num\n    return max_num`,
    language: 'python',
    tags: ['array', 'iteration', 'max-value'],
    complexity: { notation: 'O(n)', className: 'linear' },
    createdAt: '2025-01-01T00:00:00.000Z'
  },
  {
    id: 2,
    author: 'dev@example.com',
    title: 'Simple Hello World',
    code: 'console.log("Hello, World!");',
    language: 'javascript',
    tags: ['hello-world', 'basic'],
    complexity: { notation: 'O(1)', className: 'constant' },
    createdAt: '2025-01-02T00:00:00.000Z'
  },
  {
    id: 3,
    author: 'jane@doe.com',
    title: 'React State Hook',
    code: 'const [count, setCount] = useState(0);',
    language: 'javascript',
    tags: ['react', 'hooks', 'state'],
    complexity: { notation: 'O(1)', className: 'constant' },
    createdAt: '2025-01-03T00:00:00.000Z'
  }
];

export const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'cpp', label: 'C++' }
] as const;
