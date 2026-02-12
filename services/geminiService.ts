
import { GoogleGenAI, Type } from "@google/genai";
import { ComparisonResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are an objective, neutral, and data-driven researcher. 
Your goal is to provide a balanced, honest, and factual side-by-side comparison between Mount Sinai, NY and another town.

DATA INSTRUCTIONS:
1. Use Google Search to find real, up-to-date facts about both towns.
2. DO NOT skew results toward Mount Sinai. If the target town has better schools, lower taxes, or more famous landmarks, state that clearly.
3. Be specific and honest about:
   - Historical events: Real historical milestones for both locations.
   - Famous people: Verified residents or notable figures associated with each.
   - Famous places: Landmarks, parks, and attractions.
   - Food: Iconic local dishes or highly-rated dining scenes.
4. Categories to include: Real estate value, School quality, Crime & safety, Historical events, Interesting facts, Famous people, Famous places, Food & Dining, and Community life.
5. Provide a 'heroImagePrompt' that is a neutral, split-screen or combined artistic representation of both locations.

RULES:
- Maintain complete neutrality.
- No graphs or charts allowed.
- Language: English.
- Tone: Informative, balanced, and professional.
`;

export const compareTowns = async (targetTown: string): Promise<ComparisonResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Provide an honest, factual side-by-side comparison between Mount Sinai, NY and ${targetTown}. Include history, famous residents, food, and key local facts without any bias.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING },
          summary: { type: Type.STRING },
          targetTown: { type: Type.STRING },
          heroImagePrompt: { type: Type.STRING },
          categories: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                mtSinaiFactual: { type: Type.STRING, description: "Honest facts about Mount Sinai for this category." },
                otherTownFactual: { type: Type.STRING, description: "Honest facts about the target town for this category." },
                icon: { type: Type.STRING }
              },
              required: ["id", "name", "description", "mtSinaiFactual", "otherTownFactual", "icon"]
            }
          },
          verdict: { type: Type.STRING, description: "A balanced summary verdict comparing the two lifestyles." }
        },
        required: ["headline", "summary", "targetTown", "categories", "verdict", "heroImagePrompt"]
      },
    },
  });

  return JSON.parse(response.text);
};

export const generateVictoryImage = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional side-by-side comparison graphic: ${prompt}. Cinematic lighting, 4k, neutral and artistic representation of two distinct locations.` }],
      },
      config: {
        imageConfig: { aspectRatio: "16:9" }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (e) {
    console.error("Image generation failed", e);
  }
  return null;
};
