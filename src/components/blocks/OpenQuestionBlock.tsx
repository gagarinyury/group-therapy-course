import React, { useState, useEffect } from 'react';
import { OpenQuestionBlockContent } from '../../types/lesson';
import { useProgress } from '../../hooks/useProgress';
import { Save } from 'lucide-react';

interface OpenQuestionBlockProps {
  content: OpenQuestionBlockContent;
  blockId: string;
}

export const OpenQuestionBlock: React.FC<OpenQuestionBlockProps> = ({ content, blockId }) => {
  const { userAnswers, saveAnswer } = useProgress();
  const [answer, setAnswer] = useState(userAnswers[blockId] || '');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (answer !== userAnswers[blockId]) {
        saveAnswer(blockId, answer);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      }
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [answer, blockId, saveAnswer, userAnswers]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Вопрос для размышления
      </h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {content.question}
      </p>
      
      <div className="relative">
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={content.placeholder || 'Напишите свой ответ здесь...'}
          className="w-full min-h-[120px] p-4 border rounded-lg resize-vertical
            border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-500 dark:placeholder:text-gray-400
            focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        {isSaved && (
          <div className="absolute top-2 right-2 flex items-center gap-2 text-green-600 text-sm">
            <Save className="w-4 h-4" />
            Сохранено
          </div>
        )}
      </div>
      
      {content.minLength && answer.length < content.minLength && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Минимальная длина ответа: {answer.length} / {content.minLength} символов
        </p>
      )}
    </div>
  );
};