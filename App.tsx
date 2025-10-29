
import React, { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AssessmentData, initialAssessmentData } from './types';
import { analyzeAssessment } from './services/geminiService';

import Section from './components/Section';
import InputField from './components/InputField';
import AnalysisResult from './components/AnalysisResult';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [data, setData] = useState<AssessmentData>(initialAssessmentData);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = useCallback((section: keyof AssessmentData, field: string, value: string) => {
    setData(prevData => ({
      ...prevData,
      [section]: {
        ...(prevData[section] as any),
        [field]: value,
      },
    }));
  }, []);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis('');
    setError('');
    try {
      const result = await analyzeAssessment(data);
      setAnalysis(result);
    } catch (err) {
      setError('An error occurred while analyzing the data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyCompositionChartData = [
    { name: 'Peso Atual (Kg)', value: parseFloat(data.bodyComposition.currentWeight) || 0 },
    { name: 'Peso Desejável (Kg)', value: parseFloat(data.bodyComposition.desiredWeight) || 0 },
    { name: 'Massa Magra (Kg)', value: parseFloat(data.bodyComposition.leanMass) || 0 },
    { name: 'Peso de Gordura (Kg)', value: parseFloat(data.bodyComposition.fatWeight) || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Ficha de Avaliação Física Funcional</h1>
          <p className="text-sm text-gray-600 mt-1">Digitalize e analise os dados da avaliação física com IA.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
        {/* Identification */}
        <Section title="Dados de Identificação">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField label="Nome" value={data.identification.name} onChange={e => handleInputChange('identification', 'name', e.target.value)} />
            <InputField label="Sexo" value={data.identification.sex} onChange={e => handleInputChange('identification', 'sex', e.target.value)} />
            <InputField label="Treinado" value={data.identification.trained} onChange={e => handleInputChange('identification', 'trained', e.target.value)} />
            <InputField label="Telefone" value={data.identification.phone} onChange={e => handleInputChange('identification', 'phone', e.target.value)} />
            <InputField label="Celular" value={data.identification.mobile} onChange={e => handleInputChange('identification', 'mobile', e.target.value)} />
            <InputField label="Email" type="email" value={data.identification.email} onChange={e => handleInputChange('identification', 'email', e.target.value)} />
            <InputField label="Profissão" value={data.identification.profession} onChange={e => handleInputChange('identification', 'profession', e.target.value)} />
            <InputField label="Endereço" value={data.identification.address} onChange={e => handleInputChange('identification', 'address', e.target.value)} />
            <InputField label="Data de Nascimento" type="date" value={data.identification.birthDate} onChange={e => handleInputChange('identification', 'birthDate', e.target.value)} />
            <InputField label="Idade" value={data.identification.age} onChange={e => handleInputChange('identification', 'age', e.target.value)} />
            <InputField label="Data da Avaliação" type="date" value={data.identification.assessmentDate} onChange={e => handleInputChange('identification', 'assessmentDate', e.target.value)} />
            <InputField label="Próxima Avaliação" type="date" value={data.identification.nextAssessmentDate} onChange={e => handleInputChange('identification', 'nextAssessmentDate', e.target.value)} />
            <InputField label="Avaliador" value={data.identification.assessor} onChange={e => handleInputChange('identification', 'assessor', e.target.value)} />
            <InputField label="Horário" type="time" value={data.identification.time} onChange={e => handleInputChange('identification', 'time', e.target.value)} />
            <InputField label="Objetivo" value={data.identification.objective} onChange={e => handleInputChange('identification', 'objective', e.target.value)} containerClassName="md:col-span-2 lg:col-span-3" />
          </div>
        </Section>
        
        {/* Anthropometrics */}
        <Section title="Dados Antropométricos">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <InputField label="Altura (cm)" value={data.anthropometrics.height} onChange={e => handleInputChange('anthropometrics', 'height', e.target.value)} />
                <InputField label="Peso (kg)" value={data.anthropometrics.weight} onChange={e => handleInputChange('anthropometrics', 'weight', e.target.value)} />
                <InputField label="Ind. Massa Corpórea" value={data.anthropometrics.bmi} onChange={e => handleInputChange('anthropometrics', 'bmi', e.target.value)} />
                <InputField label="Ind. de Conicidade" value={data.anthropometrics.conicityIndex} onChange={e => handleInputChange('anthropometrics', 'conicityIndex', e.target.value)} />
                <InputField label="IRCQ" value={data.anthropometrics.whr} onChange={e => handleInputChange('anthropometrics', 'whr', e.target.value)} />
                <InputField label="Risco Estimado IRCQ" value={data.anthropometrics.whrRisk} onChange={e => handleInputChange('anthropometrics', 'whrRisk', e.target.value)} />
                <InputField label="Pressão Arterial" value={data.anthropometrics.bloodPressure} onChange={e => handleInputChange('anthropometrics', 'bloodPressure', e.target.value)} />
                <InputField label="em Repouso" value={data.anthropometrics.restingBloodPressure} onChange={e => handleInputChange('anthropometrics', 'restingBloodPressure', e.target.value)} />
            </div>
        </Section>

        {/* Perimeters */}
        <Section title="Perímetros (cm)">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                <InputField label="Ombros" value={data.perimeters.shoulders} onChange={e => handleInputChange('perimeters', 'shoulders', e.target.value)} />
                <InputField label="Tórax" value={data.perimeters.chest} onChange={e => handleInputChange('perimeters', 'chest', e.target.value)} />
                <InputField label="Cintura" value={data.perimeters.waist} onChange={e => handleInputChange('perimeters', 'waist', e.target.value)} />
                <InputField label="Abdômen" value={data.perimeters.abdomen} onChange={e => handleInputChange('perimeters', 'abdomen', e.target.value)} />
                <InputField label="Quadril" value={data.perimeters.hip} onChange={e => handleInputChange('perimeters', 'hip', e.target.value)} />
                <div className="col-span-1"></div>
                <div className="col-span-1"></div>
                <div className="col-span-1"></div>
                <InputField label="Ante-braço Direito" value={data.perimeters.forearmR} onChange={e => handleInputChange('perimeters', 'forearmR', e.target.value)} />
                <InputField label="Ante-braço Esquerdo" value={data.perimeters.forearmL} onChange={e => handleInputChange('perimeters', 'forearmL', e.target.value)} />
                <InputField label="Braço normal Direito" value={data.perimeters.armR} onChange={e => handleInputChange('perimeters', 'armR', e.target.value)} />
                <InputField label="Braço normal Esquerdo" value={data.perimeters.armL} onChange={e => handleInputChange('perimeters', 'armL', e.target.value)} />
                <InputField label="Coxa proximal Direita" value={data.perimeters.thighR} onChange={e => handleInputChange('perimeters', 'thighR', e.target.value)} />
                <InputField label="Coxa proximal Esquerda" value={data.perimeters.thighL} onChange={e => handleInputChange('perimeters', 'thighL', e.target.value)} />
                <InputField label="Panturrilha Direita" value={data.perimeters.calfR} onChange={e => handleInputChange('perimeters', 'calfR', e.target.value)} />
                <InputField label="Panturrilha Esquerda" value={data.perimeters.calfL} onChange={e => handleInputChange('perimeters', 'calfL', e.target.value)} />
            </div>
        </Section>

        {/* Skinfolds */}
        <Section title="Dobras Cutâneas (mm)">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                <InputField label="Tricipital" value={data.skinfolds.triceps} onChange={e => handleInputChange('skinfolds', 'triceps', e.target.value)} />
                <InputField label="Subescapular" value={data.skinfolds.subscapular} onChange={e => handleInputChange('skinfolds', 'subscapular', e.target.value)} />
                <InputField label="Suprailíaca" value={data.skinfolds.suprailiac} onChange={e => handleInputChange('skinfolds', 'suprailiac', e.target.value)} />
                <InputField label="Abdominal" value={data.skinfolds.abdominal} onChange={e => handleInputChange('skinfolds', 'abdominal', e.target.value)} />
                <InputField label="Supraespinhal" value={data.skinfolds.supraspinale} onChange={e => handleInputChange('skinfolds', 'supraspinale', e.target.value)} />
                <InputField label="Coxa" value={data.skinfolds.thigh} onChange={e => handleInputChange('skinfolds', 'thigh', e.target.value)} />
                <InputField label="Panturrilha" value={data.skinfolds.calf} onChange={e => handleInputChange('skinfolds', 'calf', e.target.value)} />
                <InputField label="Peitoral" value={data.skinfolds.chest} onChange={e => handleInputChange('skinfolds', 'chest', e.target.value)} />
                <InputField label="Axilar Medial" value={data.skinfolds.midaxillary} onChange={e => handleInputChange('skinfolds', 'midaxillary', e.target.value)} />
                <InputField label="Bicepital" value={data.skinfolds.biceps} onChange={e => handleInputChange('skinfolds', 'biceps', e.target.value)} />
            </div>
        </Section>
        
        {/* Cardiorespiratory Data */}
        <Section title="Dados Cardiorrespiratórios">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Frequência Cardíaca</h3>
                    <div className="space-y-4">
                        <InputField label="Frequência Cardíaca Repouso (bpm)" value={data.cardio.restingHR} onChange={e => handleInputChange('cardio', 'restingHR', e.target.value)} />
                        <InputField label="Frequência Cardíaca Máxima (bpm)" value={data.cardio.maxHR} onChange={e => handleInputChange('cardio', 'maxHR', e.target.value)} />
                        <InputField label="Limite Inferior da FC (bpm)" value={data.cardio.lowerLimitHR} onChange={e => handleInputChange('cardio', 'lowerLimitHR', e.target.value)} />
                        <InputField label="Limite Superior da FC (bpm)" value={data.cardio.upperLimitHR} onChange={e => handleInputChange('cardio', 'upperLimitHR', e.target.value)} />
                        <InputField label="FC de Recuperação (bpm)" value={data.cardio.recoveryHR} onChange={e => handleInputChange('cardio', 'recoveryHR', e.target.value)} />
                    </div>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Volume de Oxigênio</h3>
                     <div className="space-y-4">
                        <InputField label="VO₂máx Predito (ml(Kg.min)-¹)" value={data.cardio.vo2max} onChange={e => handleInputChange('cardio', 'vo2max', e.target.value)} />
                    </div>
                </div>
            </div>
        </Section>

        {/* Neuromuscular Assessment */}
        <Section title="Avaliação Neuromuscular">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField label="Abdominal (repetições)" value={data.neuromuscular.abdominalReps} onChange={e => handleInputChange('neuromuscular', 'abdominalReps', e.target.value)} />
                <InputField label="Abdominal (classificação)" value={data.neuromuscular.abdominalClass} onChange={e => handleInputChange('neuromuscular', 'abdominalClass', e.target.value)} />
                <div/>
                <InputField label="Flexão de Braço (repetições)" value={data.neuromuscular.pushupReps} onChange={e => handleInputChange('neuromuscular', 'pushupReps', e.target.value)} />
                <InputField label="Flexão de Braço (classificação)" value={data.neuromuscular.pushupClass} onChange={e => handleInputChange('neuromuscular', 'pushupClass', e.target.value)} />
            </div>
        </Section>
        
        {/* Body Composition Assessment */}
        <Section title="Avaliação da Composição Corporal">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <InputField label="Protocolo" value={data.bodyCompAssessment.protocol} onChange={e => handleInputChange('bodyCompAssessment', 'protocol', e.target.value)} />
                <InputField label="% Gordura" value={data.bodyCompAssessment.fatPercentage} onChange={e => handleInputChange('bodyCompAssessment', 'fatPercentage', e.target.value)} />
                <InputField label="Seu percentual de Gordura está" value={data.bodyCompAssessment.fatPercentageClass} onChange={e => handleInputChange('bodyCompAssessment', 'fatPercentageClass', e.target.value)} />
            </div>
        </Section>
        
        {/* Body Composition Fragmentation */}
        <Section title="Fragmentação da Composição Corporal">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <InputField label="Peso de gordura (Kg)" value={data.bodyComposition.fatWeight} onChange={e => handleInputChange('bodyComposition', 'fatWeight', e.target.value)} />
                    <InputField label="Massa magra (Kg)" value={data.bodyComposition.leanMass} onChange={e => handleInputChange('bodyComposition', 'leanMass', e.target.value)} />
                    <InputField label="Peso Atual (Kg)" value={data.bodyComposition.currentWeight} onChange={e => handleInputChange('bodyComposition', 'currentWeight', e.target.value)} />
                    <InputField label="Peso Desejável (Kg)" value={data.bodyComposition.desiredWeight} onChange={e => handleInputChange('bodyComposition', 'desiredWeight', e.target.value)} />
                </div>
                <div className="w-full h-80">
                    <ResponsiveContainer>
                        <BarChart data={bodyCompositionChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#4f46e5" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Section>
        
        {/* Postural Assessment */}
        <Section title="Avaliação Postural">
             <InputField label="Indicação de" value={data.postural.indication} onChange={e => handleInputChange('postural', 'indication', e.target.value)} />
        </Section>


        {isLoading && <LoadingSpinner />}
        {error && <p className="text-red-500 bg-red-100 border border-red-400 p-4 rounded-md">{error}</p>}
        {analysis && <AnalysisResult result={analysis} />}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="container mx-auto flex justify-center">
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-indigo-600 text-white font-bold rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isLoading ? 'Analisando...' : 'Analisar com Gemini'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
