
import { GoogleGenAI, Type } from "@google/genai";
import { GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHistoricalScenario = async (
  type: 'war' | 'treaty' | 'alliance' | 'justice',
  king: string,
  mahanajapada: string,
  target?: string
) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `Act as a world-class historian of Ancient India. 
  Provide a detailed historical scenario for King ${king} of ${mahanajapada} regarding a ${type} ${target ? `with ${target}` : ''}.
  
  CRITICAL HISTORICAL RULES:
  1. If King is CHANDRAGUPTA MAURYA and Target is DHANA NANDA: Describe the two-stage conquest strategy.
  2. For WAR: Describe specific Vyuhas and techniques.
  
  Use Google Search to ensure names of contemporary rivals and specific dates are perfectly accurate.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.web)
      ?.map(chunk => ({
        title: chunk.web!.title,
        uri: chunk.web!.uri
      })) || [];

    return {
      text: response.text || "History is veiled in mystery.",
      sources
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "The historical records are unavailable.", sources: [] };
  }
};

export const getModernLocationInfo = async (mahanajapada: string, region: string) => {
  let location = { latitude: 25.6, longitude: 85.1 }; // Default Patna
  
  try {
    const pos = await new Promise<GeolocationPosition>((res, rej) => 
      navigator.geolocation.getCurrentPosition(res, rej, { timeout: 5000 })
    );
    location = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
  } catch (e) {
    console.warn("Geolocation failed, using region default.");
  }

  const prompt = `Tell me about the modern-day location of the ancient Mahajanapada of ${mahanajapada} (Region: ${region}). What historical sites or monuments can be visited there today? Use Google Maps to find real, existing places.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: { latLng: location }
        }
      }
    });

    const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter(chunk => chunk.maps)
      ?.map(chunk => ({
        title: chunk.maps!.title,
        uri: chunk.maps!.uri
      })) || [];

    return {
      text: response.text || "No modern records found.",
      sources
    };
  } catch (error) {
    return { text: "Location services unavailable.", sources: [] };
  }
};

export const generateRoyalPortrait = async (king: string, dynasty: string) => {
  const prompt = `A majestic, high-quality historical portrait of King ${king} of the ${dynasty} dynasty in Ancient India. He wears elaborate silk robes, gold jewelry, and a royal crown. Background is a grand stone palace with oil lamps. Traditional Indian art style but realistic.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ text: prompt }],
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image Gen Error:", error);
  }
  return null;
};

export const editRoyalPortrait = async (base64Image: string, editPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
          { text: `Modify this portrait based on this command: ${editPrompt}. Maintain the king's features but apply the requested change.` }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Image Edit Error:", error);
  }
  return base64Image;
};

export const getQuizQuestion = async (king: string, janapada: string, questionNumber: number, targetJanapada?: string) => {
  const prompt = `Generate a challenging historical quiz question (#${questionNumber}) for King ${king} of ${janapada}. 
  ${targetJanapada ? `Context: Interaction with ${targetJanapada}.` : ''} 
  Use Google Search to ensure the facts are 100% accurate as per the latest archaeological findings. Return JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return {
      question: "Which river was vital to Magadha?",
      options: ["Indus", "Ganges", "Narmada", "Tapi"],
      correctAnswer: 1,
      explanation: "The Ganges provided Magadha with trade and defense."
    };
  }
};

export const getJusticeCase = async (king: string, janapada: string) => {
  const prompt = `Generate a complex justice case for King ${king} of ${janapada} based on Arthashastra. Return JSON.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Pro for complex task
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            situation: { type: Type.STRING },
            advisors: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, role: { type: Type.STRING }, opinion: { type: Type.STRING } }, required: ["name", "role", "opinion"] } },
            judgments: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { text: { type: Type.STRING }, outcome: { type: Type.STRING } }, required: ["text", "outcome"] } }
          },
          required: ["title", "situation", "advisors", "judgments"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) { return null; }
};
