
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing. AI features will be limited.");
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || "" });
  }

  async findMatches(currentUser: UserProfile, candidates: UserProfile[]): Promise<UserProfile[]> {
    if (!process.env.API_KEY) return candidates.slice(0, 3); // Fallback for demo

    try {
      const prompt = `
        As an empathetic dating AI for "Perfect People", a platform for disabled individuals.
        Compare the current user to the candidates list based on shared hobbies, disabilities, and media.
        Return the IDs of the top 3 best matches in order of compatibility.
        
        Current User: ${JSON.stringify(currentUser)}
        Candidates: ${JSON.stringify(candidates)}
      `;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["matchIds"]
          }
        }
      });

      const result = JSON.parse(response.text);
      const matchIds = result.matchIds as string[];
      
      return candidates
        .filter(c => matchIds.includes(c.id))
        .sort((a, b) => matchIds.indexOf(a.id) - matchIds.indexOf(b.id));
    } catch (error) {
      console.error("Gemini Match Error:", error);
      return candidates.slice(0, 3);
    }
  }

  async getMatchReason(userA: UserProfile, userB: UserProfile): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain in one short romantic sentence why ${userA.name} and ${userB.name} are a great match based on their hobbies: ${userA.hobbies.join(', ')} vs ${userB.hobbies.join(', ')}.`,
      });
      return response.text || "You both have so much in common!";
    } catch {
      return "A match made in heaven!";
    }
  }
}

export const geminiService = new GeminiService();
