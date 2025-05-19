import React, { useState } from 'react';
import { VideoBlockContent } from '../../types/lesson';
import { Play, Pause, Maximize2 } from 'lucide-react';

interface VideoBlockProps {
  content: VideoBlockContent;
}

export const VideoBlock: React.FC<VideoBlockProps> = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="glass rounded-2xl shadow-md overflow-hidden animate-fadeIn">
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 group">
        {/* Video placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="group/btn relative"
          >
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 group-hover/btn:bg-white/30 transition-all"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full shadow-lg transform group-hover/btn:scale-110 transition-all duration-200">
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white fill-current ml-1" />
              )}
            </div>
          </button>
        </div>

        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-blue-400 transition-colors">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <span className="text-white text-sm">{content.duration || '00:00'}</span>
            </div>
            <button className="text-white hover:text-blue-400 transition-colors">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {content.description && (
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content.description}
          </p>
        </div>
      )}
    </div>
  );
};