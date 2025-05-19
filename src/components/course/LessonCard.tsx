import React from 'react';
import { Check, Lock, PlayCircle } from 'lucide-react';

interface LessonCardProps {
  id: number;
  title: string;
  description: string;
  duration: string;
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
  completed,
  started,
  available,
  onClick
}) => {
  const getStatusIcon = () => {
    if (completed) return <Check className="w-5 h-5 text-green-600" />;
    if (!available) return <Lock className="w-5 h-5 text-gray-400" />;
    if (started) return <PlayCircle className="w-5 h-5 text-blue-600" />;
    return null;
  };

  const cardClasses = [
    'relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md',
    'transition-all duration-200 cursor-pointer',
    available ? 'hover:shadow-lg hover:scale-105' : 'opacity-60 cursor-not-allowed'
  ].join(' ');

  return (
    <div
      className={cardClasses}
      onClick={available ? onClick : undefined}
      role="button"
      tabIndex={available ? 0 : -1}
      aria-label={`${title}. ${!available ? 'Заблокирован' : completed ? 'Пройден' : started ? 'Начат' : 'Доступен'}`}
    >
      <div className="absolute top-4 right-4">
        {getStatusIcon()}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {duration}
        </span>
        
        {started && !completed && (
          <span className="text-sm text-blue-600 dark:text-blue-400">
            В процессе
          </span>
        )}
      </div>
    </div>
  );
};