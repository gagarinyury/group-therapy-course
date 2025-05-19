import React from 'react';
import { IllustrationBlockContent } from '../../types/lesson';

interface IllustrationBlockProps {
  content: IllustrationBlockContent;
}

export const IllustrationBlock: React.FC<IllustrationBlockProps> = ({ content }) => {
  const getImageClasses = () => {
    const baseClasses = 'w-full h-auto';
    switch (content.style) {
      case 'borderless':
        return baseClasses;
      case 'rounded':
        return `${baseClasses} rounded-2xl`;
      default:
        return `${baseClasses} rounded-lg`;
    }
  };

  return (
    <div className="my-8">
      <img
        src={content.imageUrl}
        alt={content.caption || 'Иллюстрация'}
        className={getImageClasses()}
      />
      
      {content.caption && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          {content.caption}
        </p>
      )}
    </div>
  );
};