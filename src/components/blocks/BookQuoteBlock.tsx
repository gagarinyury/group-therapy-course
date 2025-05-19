import React from 'react';
import { BookQuoteBlockContent } from '../../types/lesson';
import { BookOpen } from 'lucide-react';

interface BookQuoteBlockProps {
  content: BookQuoteBlockContent;
}

export const BookQuoteBlock: React.FC<BookQuoteBlockProps> = ({ content }) => {
  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="bg-amber-50 dark:bg-amber-900/20 p-8 rounded-lg shadow-lg relative">
        <div className="absolute top-4 right-4">
          <BookOpen className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        
        <blockquote className="text-lg italic text-gray-800 dark:text-gray-200 mb-4">
          "{content.quote}"
        </blockquote>
        
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="font-semibold">{content.author}</p>
          <p>{content.book}</p>
          {content.page && <p>Стр. {content.page}</p>}
        </div>
      </div>
    </div>
  );
};