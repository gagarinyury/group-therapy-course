import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { useLessonData } from '../../hooks/useLessonData';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { LessonHeader } from './LessonHeader';
import { LessonProgress } from './LessonProgress';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const LessonContainer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { startLesson, completeBlock, completeLesson, lessonsProgress } = useProgress();
  
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  const lessonIdNum = parseInt(lessonId || '1', 10);
  const { lesson, loading, error } = useLessonData(lessonIdNum);
  const progress = lessonsProgress[lessonIdNum];

  useEffect(() => {
    if (lesson && !progress?.started) {
      startLesson(lessonIdNum);
    }
  }, [lesson, lessonIdNum, progress?.started, startLesson]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Загрузка урока...</div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Ошибка загрузки урока</div>
      </div>
    );
  }

  const currentBlock = lesson.blocks[currentBlockIndex];
  const isLastBlock = currentBlockIndex === lesson.blocks.length - 1;
  const isFirstBlock = currentBlockIndex === 0;

  const handleNextBlock = () => {
    if (currentBlock) {
      completeBlock(lessonIdNum, currentBlock.id);
    }

    if (isLastBlock) {
      completeLesson(lessonIdNum);
      navigate('/');
    } else {
      setCurrentBlockIndex(prev => prev + 1);
    }
  };

  const handlePrevBlock = () => {
    if (!isFirstBlock) {
      setCurrentBlockIndex(prev => prev - 1);
    }
  };

  const progressPercentage = lesson.blocks.length > 0
    ? ((currentBlockIndex + 1) / lesson.blocks.length) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LessonHeader
        title={lesson.title}
        onBack={() => navigate('/')}
      />
      
      <LessonProgress
        current={currentBlockIndex + 1}
        total={lesson.blocks.length}
        percentage={progressPercentage}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {currentBlock ? (
          <BlockRenderer block={currentBlock} />
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Этот урок пока не содержит контента
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mt-12">
          <button
            onClick={handlePrevBlock}
            disabled={isFirstBlock}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isFirstBlock
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>

          <button
            onClick={handleNextBlock}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            {isLastBlock ? 'Завершить урок' : 'Далее'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};