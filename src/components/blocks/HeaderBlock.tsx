import React from 'react';
import { HeaderBlockContent } from '../../types/lesson';
import { BookOpen } from 'lucide-react';

interface HeaderBlockProps {
  content: HeaderBlockContent;
}

export const HeaderBlock: React.FC<HeaderBlockProps> = ({ content }) => {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-6">
        <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {content.title}
      </h1>
      
      {content.subtitle && (
        <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          {content.subtitle}
        </h2>
      )}
      
      {content.introduction && (
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          {content.introduction}
        </p>
      )}
    </div>
  );
};