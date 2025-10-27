import React from 'react';

interface ExplanationCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const ExplanationCard: React.FC<ExplanationCardProps> = ({ title, content, icon }) => {
  return (
    <div className="border border-stone-200 rounded-lg p-6 transition-all duration-300 hover:border-stone-400 hover:bg-white">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-3 bg-stone-100 rounded-md">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold font-serif text-stone-900">{title}</h3>
          <p className="mt-2 text-stone-600 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ExplanationCard;