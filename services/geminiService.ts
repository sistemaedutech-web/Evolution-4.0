
import { GoogleGenAI } from "@google/genai";
import { AssessmentData } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder check. In a real app, the key would be set in the environment.
  console.warn("API_KEY is not set. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

function formatDataForPrompt(data: AssessmentData): string {
    return `
    Por favor, analise os seguintes dados de uma avaliação física funcional e forneça um resumo profissional, mas de fácil compreensão, em português. 
    Destaque os pontos positivos, as áreas que necessitam de atenção e forneça recomendações gerais com base no objetivo do indivíduo.
    Formate a resposta usando markdown.

    **DADOS DE IDENTIFICAÇÃO:**
    - **Nome:** ${data.identification.name}
    - **Idade:** ${data.identification.age}
    - **Sexo:** ${data.identification.sex}
    - **Objetivo:** ${data.identification.objective}

    **DADOS ANTROPOMÉTRICOS:**
    - **Altura:** ${data.anthropometrics.height} cm
    - **Peso:** ${data.anthropometrics.weight} kg
    - **IMC (Índice de Massa Corpórea):** ${data.anthropometrics.bmi}
    - **IRCQ (Índice Relação Cintura-Quadril):** ${data.anthropometrics.whr}
    - **Risco Estimado IRCQ:** ${data.anthropometrics.whrRisk}
    - **Pressão Arterial em Repouso:** ${data.anthropometrics.bloodPressure}/${data.anthropometrics.restingBloodPressure} mmHg

    **PERÍMETROS (cm):**
    - **Ombros:** ${data.perimeters.shoulders}
    - **Tórax:** ${data.perimeters.chest}
    - **Cintura:** ${data.perimeters.waist}
    - **Abdômen:** ${data.perimeters.abdomen}
    - **Quadril:** ${data.perimeters.hip}

    **COMPOSIÇÃO CORPORAL:**
    - **Protocolo:** ${data.bodyCompAssessment.protocol}
    - **Percentual de Gordura:** ${data.bodyCompAssessment.fatPercentage}% (${data.bodyCompAssessment.fatPercentageClass})
    - **Peso de Gordura:** ${data.bodyComposition.fatWeight} kg
    - **Massa Magra:** ${data.bodyComposition.leanMass} kg

    **DADOS CARDIORRESPIRATÓRIOS:**
    - **Frequência Cardíaca em Repouso:** ${data.cardio.restingHR} bpm
    - **VO₂máx Predito:** ${data.cardio.vo2max} ml(Kg.min)-¹

    **AVALIAÇÃO NEUROMUSCULAR:**
    - **Abdominal:** ${data.neuromuscular.abdominalReps} repetições (${data.neuromuscular.abdominalClass})
    - **Flexão de Braço:** ${data.neuromuscular.pushupReps} repetições (${data.neuromuscular.pushupClass})

    **INDICAÇÃO DE TREINO:**
    - ${data.postural.indication}
    `;
}


export const analyzeAssessment = async (data: AssessmentData): Promise<string> => {
  const prompt = formatDataForPrompt(data);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
