
import { GeminiResponse } from '@/types';

const GEMINI_API_KEY = "AIzaSyA10QHsYpV8t4ZyXpX8t4ZyXpX3ZhzZPYgaz3azY_g";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`;

export class GeminiService {
  static async generateContent(prompt: string): Promise<GeminiResponse> {
    console.log('Calling Gemini API with prompt:', prompt);
    
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
      
      return { text };
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return { text: 'Sorry, I could not process the request. Please try again.' };
    }
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
