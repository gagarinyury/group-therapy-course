import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total, percentage }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Общий прогресс
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {completed} из {total} уроков
        </span>
      </div>
      
      <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="mt-2 text-right">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};