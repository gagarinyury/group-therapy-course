import React, { useState } from 'react';
import { CaseBlockContent } from '../../types/lesson';
import { useProgress } from '../../hooks/useProgress';
import { CheckCircle, Circle } from 'lucide-react';

interface CaseBlockProps {
  content: CaseBlockContent;
  blockId: string;
}

export const CaseBlock: React.FC<CaseBlockProps> = ({ content, blockId }) => {
  const { userAnswers, saveAnswer } = useProgress();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    userAnswers[blockId] || []
  );
  const [showComments, setShowComments] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    if (content.allowMultiple) {
      const newSelection = selectedOptions.includes(optionId)
        ? selectedOptions.filter(id => id !== optionId)
        : [...selectedOptions, optionId];
      setSelectedOptions(newSelection);
      saveAnswer(blockId, newSelection);
    } else {
      setSelectedOptions([optionId]);
      saveAnswer(blockId, [optionId]);
      setShowComments(true);
    }
  };

  const handleShowComments = () => {
    setShowComments(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Ситуация из практики
      </h3>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {content.situation}
      </p>
      
      <div className="space-y-3">
        {content.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedOptions.includes(option.id)
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedOptions.includes(option.id) ? (
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 mt-0.5" />
              )}
              
              <div className="flex-1">
                <p className="text-gray-800 dark:text-gray-200">
                  {option.text}
                </p>
                
                {showComments && selectedOptions.includes(option.id) && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {option.comment}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {content.allowMultiple && selectedOptions.length > 0 && !showComments && (
        <button
          onClick={handleShowComments}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Показать комментарии психолога
        </button>
      )}
    </div>
  );
};