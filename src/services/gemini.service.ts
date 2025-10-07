
import { GeminiResponse } from '@/types';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

export class GeminiService {
  static async generateContent(prompt: string): Promise<GeminiResponse> {
    console.log('Calling Gemini API with prompt:', prompt);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock responses for demo
    if (prompt.includes('Explain the following')) {
      return {
        text: 'This code snippet defines a function to find the maximum number in a list. It iterates through the list, keeping track of the highest number found so far, and returns it at the end. The time complexity is linear, O(n), as it checks each number once.'
      };
    }
    
    if (prompt.includes('Suggest relevant tags')) {
      return {
        text: 'algorithm, array, iteration, max-value, python'
      };
    }
    
    return { text: 'Sorry, I could not process the request.' };
  }

  static async explainCode(code: string, language: string): Promise<string> {
    const prompt = `Explain the following ${language} code snippet in a concise way for a developer:\n\n${code}`;
    const response = await this.generateContent(prompt);
    return response.text;
  }

  static async suggestTags(code: string, language: string): Promise<string> {
    const prompt = `Suggest relevant tags (comma-separated) for the following ${language} code snippet:\n\n${code}`;
    const response = await this.generateContent(prompt);
    return response.text;
  }
}
