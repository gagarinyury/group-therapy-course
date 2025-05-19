import React from 'react';

interface LessonProgressProps {
  current: number;
  total: number;
  percentage: number;
}

export const LessonProgress: React.FC<LessonProgressProps> = ({ current, total, percentage }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Блок {current} из {total}
          </span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {Math.round(percentage)}%
          </span>
        </div>
        
        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};