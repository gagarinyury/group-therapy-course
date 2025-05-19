import React, { useState } from 'react';
import { QuizBlockContent } from '../../types/lesson';
import { useProgress } from '../../hooks/useProgress';
import { CheckCircle, XCircle, Circle, AlertCircle } from 'lucide-react';

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
    const baseClasses = 'group w-full text-left p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.01]';
    
    if (!showFeedback) {
      return `${baseClasses} ${
        selectedOption === option.id
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'
      }`;
    }
    
    if (selectedOption === option.id) {
      return `${baseClasses} ${
        option.isCorrect
          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md'
          : 'border-red-500 bg-red-50 dark:bg-red-900/20 shadow-md'
      }`;
    }
    
    if (option.isCorrect) {
      return `${baseClasses} border-green-500 bg-green-50 dark:bg-green-900/20`;
    }
    
    return `${baseClasses} border-gray-200 dark:border-gray-700 opacity-60`;
  };

  const selectedOptionData = content.options.find(o => o.id === selectedOption);
  const isCorrect = selectedOptionData?.isCorrect;

  return (
    <div className="glass rounded-2xl shadow-md p-6 animate-fadeIn">
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Проверка знаний
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            {content.question}
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        {content.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            disabled={showFeedback}
            className={getOptionClasses(option)}
          >
            <div className="flex items-start gap-3">
              <div className="pt-0.5">
                {getOptionIcon(option)}
              </div>
              
              <div className="flex-1">
                <p className="text-gray-800 dark:text-gray-200 font-medium">
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
        <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 animate-fadeIn ${
          isCorrect
            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
            : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
        }`}>
          {isCorrect ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-semibold">
              {isCorrect
                ? 'Отлично!'
                : 'Неправильно'}
            </p>
            {!isCorrect && (
              <p className="text-sm mt-1">
                Правильный ответ выделен зеленым цветом
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};