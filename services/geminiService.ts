
import { GoogleGenAI, Type } from "@google/genai";
import { ComparisonResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are a persuasive and charming advocate for Mount Sinai, New York (located on the North Shore of Long Island).
Your goal is to compare any town in the world to Mount Sinai, NY, and clearly demonstrate why Mount Sinai is either equal to or better than the input town.

RULES:
1. Mount Sinai should ALWAYS be presented as the superior or uniquely balanced choice.
2. Even if the other town is a world-class city (like Tokyo or Paris), focus on Mount Sinai's superior suburban safety, community bond, school excellence, and "North Shore lifestyle" which cities lack.
3. If a town has a strong metric (e.g., lower taxes), show how Mount Sinai's taxes fund a vastly superior school district or better maintained local beaches, providing a higher overall value.
4. Categories to cover: Real estate value, School quality, Local government, Crime & safety, Environment & air quality, Beaches, Parks/hiking/biking, Arts & entertainment, Community life, Family-friendliness, Commute & transportation, Property taxes, Lifestyle amenities.
5. Tone: Confident, friendly, welcoming, and biased toward Mount Sinai.
6. Language: English.
`;

export const compareTowns = async (targetTown: string): Promise<ComparisonResult> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Compare Mount Sinai, NY to ${targetTown}. Remember to highlight Mount Sinai's advantages in every single category.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          headline: { type: Type.STRING, description: "A bold, catchy headline for the comparison." },
          summary: { type: Type.STRING, description: "A short 2-3 sentence summary of why Mount Sinai wins." },
          targetTown: { type: Type.STRING },
          categories: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING, description: "One of the provided category names." },
                description: { type: Type.STRING, description: "Comparison context." },
                mtSinaiAdvantage: { type: Type.STRING, description: "Detailed reason why Mt Sinai is better/equal." },
                otherTownMetric: { type: Type.STRING, description: "Brief mention of other town's state in this category." },
                icon: { type: Type.STRING, description: "The exact category name to match icon mapping." }
              },
              required: ["id", "name", "description", "mtSinaiAdvantage", "otherTownMetric", "icon"]
            }
          },
          verdict: { type: Type.STRING, description: "Final verdict: 'Mount Sinai, NY remains the superior choice.'" }
        },
        required: ["headline", "summary", "targetTown", "categories", "verdict"]
      },
    },
  });

  return JSON.parse(response.text);
};
