import React from 'react';
import { VideoBlockContent } from '../../types/lesson';
import { Play } from 'lucide-react';

interface VideoBlockProps {
  content: VideoBlockContent;
}

export const VideoBlock: React.FC<VideoBlockProps> = ({ content }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
        {/* В реальном приложении здесь будет iframe с видео */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-600 p-6 rounded-full">
            <Play className="w-8 h-8 text-white fill-current" />
          </div>
        </div>
      </div>
      
      {content.description && (
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300">{content.description}</p>
          {content.duration && (
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
              Длительность: {content.duration}
            </span>
          )}
        </div>
      )}
    </div>
  );
};