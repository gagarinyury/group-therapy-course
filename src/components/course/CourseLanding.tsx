import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { LessonCard } from './LessonCard';
import { ProgressBar } from './ProgressBar';

const lessons = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  title: `Урок ${i + 1}`,
  description: `Описание урока ${i + 1}`,
  duration: '30-45 мин'
}));

export const CourseLanding: React.FC = () => {
  const navigate = useNavigate();
  const { lessonsProgress } = useProgress();

  const completedLessonsCount = Object.values(lessonsProgress).filter(p => p.completed).length;
  const startedLessonsCount = Object.values(lessonsProgress).filter(p => p.started && !p.completed).length;
  const totalProgress = (completedLessonsCount / lessons.length) * 100;

  const getNextLesson = () => {
    // Find first not completed lesson
    for (const lesson of lessons) {
      if (!lessonsProgress[lesson.id]?.completed) {
        return lesson.id;
      }
    }
    return null;
  };

  const nextLessonId = getNextLesson();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Групповая терапия: курс психолога
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Погрузитесь в мир групповой психотерапии через призму работ Ирвина Ялома
          </p>
          
          {nextLessonId && (
            <button
              onClick={() => navigate(`/lesson/${nextLessonId}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              {startedLessonsCount > 0 ? 'Продолжить' : 'Начать'}
            </button>
          )}
        </header>

        <ProgressBar
          completed={completedLessonsCount}
          total={lessons.length}
          percentage={totalProgress}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {lessons.map((lesson) => {
            const progress = lessonsProgress[lesson.id];
            const isAvailable = lesson.id === 1 || lessonsProgress[lesson.id - 1]?.completed;
            
            return (
              <LessonCard
                key={lesson.id}
                id={lesson.id}
                title={lesson.title}
                description={lesson.description}
                duration={lesson.duration}
                completed={progress?.completed || false}
                started={progress?.started || false}
                available={isAvailable}
                onClick={() => isAvailable && navigate(`/lesson/${lesson.id}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};