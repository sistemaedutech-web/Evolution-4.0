
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 border-b-2 border-indigo-500 pb-2">{title}</h2>
      <div>{children}</div>
    </section>
  );
};

export default Section;
