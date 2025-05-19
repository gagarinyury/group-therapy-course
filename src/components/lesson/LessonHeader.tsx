import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LessonHeaderProps {
  title: string;
  onBack: () => void;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({ title, onBack }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="Вернуться к списку уроков"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
        
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h1>
      </div>
    </header>
  );
};