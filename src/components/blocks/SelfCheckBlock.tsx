import React, { useState } from 'react';
import { SelfCheckBlockContent } from '../../types/lesson';
import { useProgress } from '../../hooks/useProgress';
import { Check } from 'lucide-react';

interface SelfCheckBlockProps {
  content: SelfCheckBlockContent;
  blockId: string;
}

export const SelfCheckBlock: React.FC<SelfCheckBlockProps> = ({ content, blockId }) => {
  const { userAnswers, saveAnswer } = useProgress();
  const [response, setResponse] = useState(userAnswers[blockId] || '');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    if (response.trim()) {
      saveAnswer(blockId, response);
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setResponse('');
    setIsCompleted(false);
    saveAnswer(blockId, '');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {content.title}
      </h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {content.description}
      </p>
      
      {!isCompleted ? (
        <>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder={content.placeholder || 'Напишите здесь...'}
            className="w-full min-h-[100px] p-4 mb-4 border rounded-lg resize-vertical
              border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              text-gray-900 dark:text-gray-100
              placeholder:text-gray-500 dark:placeholder:text-gray-400
              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <button
            onClick={handleComplete}
            disabled={!response.trim()}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
              response.trim()
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Check className="w-5 h-5 inline-block mr-2" />
            Подтвердить выполнение
          </button>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Отлично! Задание выполнено
          </p>
          
          <button
            onClick={handleReset}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Выполнить заново
          </button>
        </div>
      )}
    </div>
  );
};