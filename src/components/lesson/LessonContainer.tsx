import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { useLessonData } from '../../hooks/useLessonData';
import { BlockRenderer } from '../blocks/BlockRenderer';
import { LessonHeader } from './LessonHeader';
import { LessonProgress } from './LessonProgress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!loading && !error && lesson) {
        const isLastBlock = currentBlockIndex === lesson.blocks.length - 1;
        const isFirstBlock = currentBlockIndex === 0;
        if (e.key === 'ArrowRight' && !isLastBlock) handleNextBlock();
        if (e.key === 'ArrowLeft' && !isFirstBlock) handlePrevBlock();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentBlockIndex, loading, error, lesson]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center animate-fadeIn">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300">Загрузка урока...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ошибка загрузки</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Не удалось загрузить урок</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Вернуться к курсу
            </button>
          </div>
        </div>
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
      // Show completion animation before navigating
      setTimeout(() => navigate('/'), 1500);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
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
        <div className="animate-fadeIn min-h-[400px]">
          {currentBlock ? (
            <BlockRenderer block={currentBlock} />
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Этот урок пока не содержит контента
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={handlePrevBlock}
            disabled={isFirstBlock}
            className={`group flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              isFirstBlock
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm hover:shadow-md'
            }`}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Назад
          </button>

          {/* Progress dots */}
          <div className="flex gap-2">
            {lesson.blocks.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentBlockIndex
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextBlock}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isLastBlock ? (
              <>
                Завершить урок
                <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </>
            ) : (
              <>
                Далее
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Completion animation */}
        {isLastBlock && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="opacity-0 scale-0 transition-all duration-1000" id="completion-animation">
                <CheckCircle className="w-32 h-32 text-green-500" />
                <p className="text-2xl font-bold text-green-600 mt-4">Урок завершен!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};