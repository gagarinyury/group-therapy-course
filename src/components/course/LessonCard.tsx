import React from 'react';
import { Check, Lock, PlayCircle, Clock, Hash } from 'lucide-react';

interface LessonCardProps {
  id: number;
  title: string;
  description: string;
  duration: string;
  topics?: string[];
  completed: boolean;
  started: boolean;
  available: boolean;
  onClick: () => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  id,
  title,
  description,
  duration,
  topics = [],
  completed,
  started,
  available,
  onClick
}) => {
  const getStatusColor = () => {
    if (completed) return 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20';
    if (!available) return 'border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800/50';
    if (started) return 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20';
    return 'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800';
  };

  const getStatusIcon = () => {
    if (completed) return <Check className="w-6 h-6 text-green-600" />;
    if (!available) return <Lock className="w-6 h-6 text-gray-400" />;
    if (started) return <PlayCircle className="w-6 h-6 text-blue-600" />;
    return null;
  };

  const cardClasses = [
    'relative group overflow-hidden rounded-2xl border-2 shadow-sm transition-all duration-300',
    getStatusColor(),
    available ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : 'opacity-75 cursor-not-allowed'
  ].join(' ');

  return (
    <div
      className={cardClasses}
      onClick={available ? onClick : undefined}
      role="button"
      tabIndex={available ? 0 : -1}
      aria-label={`${title}. ${!available ? 'Заблокирован' : completed ? 'Пройден' : started ? 'Начат' : 'Доступен'}`}
    >
      {/* Progress indicator for started lessons */}
      {started && !completed && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <div className="h-full w-1/2 bg-blue-600 animate-pulse"></div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
              completed ? 'bg-green-600 text-white' : 
              started ? 'bg-blue-600 text-white' :
              available ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' :
              'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
            }`}>
              {id}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          
          <div className="flex-shrink-0">
            {getStatusIcon()}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Topics */}
        {topics.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {topics.slice(0, 3).map((topic, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
              >
                <Hash className="w-3 h-3" />
                {topic}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          
          {available && (
            <div className={`text-sm font-medium ${
              completed ? 'text-green-600' :
              started ? 'text-blue-600' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              {completed ? 'Пройден' : started ? 'В процессе' : 'Начать'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};