import React from 'react';
import { TrendingUp, Target } from 'lucide-react';

interface ProgressBarProps {
  completed: number;
  total: number;
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total, percentage }) => {
  const remainingLessons = total - completed;
  
  return (
    <div className="glass rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ваш прогресс
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {completed} из {total} уроков пройдено
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700 ease-out relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Milestone dots */}
        <div className="absolute top-0 left-0 right-0 h-3 flex items-center">
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className={`absolute w-1 h-1 rounded-full ${
                percentage >= milestone 
                  ? 'bg-white' 
                  : 'bg-gray-400 dark:bg-gray-600'
              }`}
              style={{ left: `${milestone}%` }}
            />
          ))}
        </div>
      </div>
      
      {remainingLessons > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Осталось пройти: {remainingLessons} {remainingLessons === 1 ? 'урок' : remainingLessons < 5 ? 'урока' : 'уроков'}
        </p>
      )}
    </div>
  );
};