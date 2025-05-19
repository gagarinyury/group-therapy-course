import React from 'react';
import { TheoryBlockContent } from '../../types/lesson';

interface TheoryBlockProps {
  content: TheoryBlockContent;
}

export const TheoryBlock: React.FC<TheoryBlockProps> = ({ content }) => {
  return (
    <div className="space-y-4">
      {content.cards.map((card) => (
        <div
          key={card.id}
          className={`p-6 rounded-lg ${
            card.isQuote
              ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600'
              : 'bg-white dark:bg-gray-800 shadow-md'
          }`}
        >
          <p className={`${card.isQuote ? 'italic' : ''} text-gray-800 dark:text-gray-200`}>
            {card.text}
          </p>
          
          {card.author && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              — {card.author}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};