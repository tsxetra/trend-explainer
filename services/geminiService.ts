
import { GoogleGenAI, Type } from "@google/genai";
import { Explanation } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const explanationSchema = {
  type: Type.OBJECT,
  properties: {
    what: {
      type: Type.STRING,
      description: "A simple, one-to-two sentence definition of the trend.",
    },
    why: {
      type: Type.STRING,
      description: "A one-to-two sentence explanation for why this trend is currently popular or relevant.",
    },
    whoCares: {
      type: Type.STRING,
      description: "A one-to-two sentence summary of who should care about this trend and its potential impact.",
    },
  },
  required: ["what", "why", "whoCares"],
};

export const explainTrend = async (trend: string): Promise<Explanation> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Explain the trend "${trend}". Provide the explanation in three parts: 1. A "what" section that defines the trend. 2. A "why" section that explains why it's popular or happening now. 3. A "whoCares" section explaining its significance and who should pay attention to it. Keep each section to 2-3 sentences.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: explanationSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as Explanation;
  } catch (error) {
    console.error("Error fetching trend explanation:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get explanation from AI. Reason: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching the trend explanation.");
  }
};
