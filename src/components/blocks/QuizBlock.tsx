import React, { useState } from 'react';
import { QuizBlockContent } from '../../types/lesson';
import { useProgress } from '../../hooks/useProgress';
import { CheckCircle, XCircle, Circle } from 'lucide-react';

interface QuizBlockProps {
  content: QuizBlockContent;
  blockId: string;
}

export const QuizBlock: React.FC<QuizBlockProps> = ({ content, blockId }) => {
  const { userAnswers, saveAnswer } = useProgress();
  const [selectedOption, setSelectedOption] = useState<string | null>(userAnswers[blockId] || null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    saveAnswer(blockId, optionId);
    setShowFeedback(true);
  };

  const getOptionIcon = (option: typeof content.options[0]) => {
    if (!showFeedback || selectedOption !== option.id) {
      return <Circle className="w-5 h-5 text-gray-400" />;
    }
    
    return option.isCorrect
      ? <CheckCircle className="w-5 h-5 text-green-600" />
      : <XCircle className="w-5 h-5 text-red-600" />;
  };

  const getOptionClasses = (option: typeof content.options[0]) => {
    const baseClasses = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-200';
    
    if (!showFeedback) {
      return `${baseClasses} ${
        selectedOption === option.id
          ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      }`;
    }
    
    if (selectedOption === option.id) {
      return `${baseClasses} ${
        option.isCorrect
          ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
          : 'border-red-600 bg-red-50 dark:bg-red-900/20'
      }`;
    }
    
    if (option.isCorrect) {
      return `${baseClasses} border-green-600 bg-green-50 dark:bg-green-900/20`;
    }
    
    return `${baseClasses} border-gray-200 dark:border-gray-700`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Проверка знаний
      </h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {content.question}
      </p>
      
      <div className="space-y-3">
        {content.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            disabled={showFeedback}
            className={getOptionClasses(option)}
          >
            <div className="flex items-start gap-3">
              {getOptionIcon(option)}
              
              <div className="flex-1">
                <p className="text-gray-800 dark:text-gray-200">
                  {option.text}
                </p>
                
                {showFeedback && selectedOption === option.id && option.feedback && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {option.feedback}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {showFeedback && (
        <div className={`mt-6 p-4 rounded-lg ${
          content.options.find(o => o.id === selectedOption)?.isCorrect
            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
            : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
        }`}>
          <p className="font-medium">
            {content.options.find(o => o.id === selectedOption)?.isCorrect
              ? 'Правильно!'
              : 'Неправильно. Попробуйте еще раз.'}
          </p>
        </div>
      )}
    </div>
  );
};