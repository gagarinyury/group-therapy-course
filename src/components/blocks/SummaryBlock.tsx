import React from 'react';
import { SummaryBlockContent } from '../../types/lesson';
import { ListChecks } from 'lucide-react';

interface SummaryBlockProps {
  content: SummaryBlockContent;
}

export const SummaryBlock: React.FC<SummaryBlockProps> = ({ content }) => {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <ListChecks className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Ключевые выводы
        </h3>
      </div>
      
      <ol className="list-decimal list-inside space-y-3">
        {content.items.map((item) => (
          <li key={item.id} className="text-gray-800 dark:text-gray-200">
            <span className="ml-2">{item.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};