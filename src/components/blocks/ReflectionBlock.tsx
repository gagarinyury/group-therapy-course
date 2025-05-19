import React, { useState, useEffect } from 'react';
import { ReflectionBlockContent } from '../../types/lesson';
import { useProgress } from '../../hooks/useProgress';
import { Save, PenTool } from 'lucide-react';

interface ReflectionBlockProps {
  content: ReflectionBlockContent;
  blockId: string;
}

export const ReflectionBlock: React.FC<ReflectionBlockProps> = ({ content, blockId }) => {
  const { userAnswers, saveAnswer } = useProgress();
  const [reflection, setReflection] = useState(userAnswers[blockId] || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (reflection !== userAnswers[blockId]) {
        saveAnswer(blockId, reflection);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [reflection, blockId, saveAnswer, userAnswers]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg shadow-md p-6">
      <div className="flex items-start gap-3 mb-4">
        <PenTool className="w-6 h-6 text-purple-600 dark:text-purple-400 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Время для рефлексии
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Выделите время для глубокого размышления
          </p>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {content.prompt}
      </p>
      
      <div className="relative">
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={content.placeholder || 'Начните писать свои мысли здесь...'}
          className="w-full min-h-[200px] p-4 border rounded-lg resize-vertical
            border-purple-300 dark:border-purple-600
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-500 dark:placeholder:text-gray-400
            focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        
        {isSaved && (
          <div className="absolute top-2 right-2 flex items-center gap-2 text-green-600 text-sm">
            <Save className="w-4 h-4" />
            Сохранено
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {reflection.length} символов
        </p>
        
        {content.minLength && reflection.length < content.minLength && (
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Минимум: {content.minLength} символов
          </p>
        )}
      </div>
    </div>
  );
};