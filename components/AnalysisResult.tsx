
import React from 'react';

interface AnalysisResultProps {
  result: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  // A very basic markdown to HTML converter
  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italics
      .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>') // List items
      .replace(/(<li.*>.*<\/li>)/gs, '<ul>$1</ul>') // Wrap lists
      .replace(/\n/g, '<br />'); // Newlines
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-500 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Análise da Avaliação</h2>
      <div
        className="prose prose-indigo max-w-none text-gray-700 space-y-4"
        dangerouslySetInnerHTML={{ __html: formatText(result) }}
      />
    </div>
  );
};

export default AnalysisResult;
