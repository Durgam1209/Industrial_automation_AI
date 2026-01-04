
import { GoogleGenAI } from "@google/genai";

export const getArchitectureExplanation = async (topic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain the following concept in the context of "Neuro-Symbolic Swarm Architecture for Industrial Automation": ${topic}. Keep it technical but concise for a dashboard user.`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 500,
    }
  });
  return response.text;
};
