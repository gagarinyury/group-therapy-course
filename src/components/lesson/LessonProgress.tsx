import React from 'react';
import { BarChart3 } from 'lucide-react';

interface LessonProgressProps {
  current: number;
  total: number;
  percentage: number;
}

export const LessonProgress: React.FC<LessonProgressProps> = ({ current, total, percentage }) => {
  return (
    <div className="glass border-b dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Блок {current} из {total}
            </span>
          </div>
          
          <div className="text-right">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
        
        <div className="relative">
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          
          {/* Progress marker */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-purple-500 rounded-full shadow-md transition-all duration-500"
            style={{ left: `calc(${percentage}% - 8px)` }}
          />
        </div>
      </div>
    </div>
  );
};