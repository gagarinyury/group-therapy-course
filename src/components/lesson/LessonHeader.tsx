import React from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';

interface LessonHeaderProps {
  title: string;
  onBack: () => void;
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({ title, onBack }) => {
  return (
    <header className="glass sticky top-0 z-10 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Вернуться к списку уроков"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:block text-gray-700 dark:text-gray-300 font-medium">Назад</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};