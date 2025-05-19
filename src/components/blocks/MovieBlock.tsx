import React from 'react';
import { MovieBlockContent } from '../../types/lesson';
import { Film } from 'lucide-react';

interface MovieBlockProps {
  content: MovieBlockContent;
}

export const MovieBlock: React.FC<MovieBlockProps> = ({ content }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={content.posterUrl}
            alt={`Постер фильма ${content.title}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 md:w-2/3">
          <div className="flex items-start gap-3 mb-4">
            <Film className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {content.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {content.year}
              </p>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {content.description}
          </p>
          
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Связь с темой урока:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              {content.connection}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};