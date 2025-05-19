import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { useTheme } from '../../hooks/useTheme';
import { LessonCard } from './LessonCard';
import { ProgressBar } from './ProgressBar';
import { Sun, Moon, BookOpen, Users, Award } from 'lucide-react';

const lessons = Array.from({ length: 14 }, (_, i) => ({
  id: i + 1,
  title: `Урок ${i + 1}`,
  description: `Описание урока ${i + 1}`,
  duration: '30-45 мин',
  topics: ['Тема 1', 'Тема 2', 'Тема 3']
}));

export const CourseLanding: React.FC = () => {
  const navigate = useNavigate();
  const { lessonsProgress } = useProgress();
  const { theme, toggleTheme } = useTheme();

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 glass z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                Групповая терапия
              </h1>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Переключить тему"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-16">
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center animate-fadeIn">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
                <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Групповая терапия
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Погрузитесь в мир групповой психотерапии через призму работ Ирвина Ялома
              </p>
              
              {nextLessonId && (
                <button
                  onClick={() => navigate(`/lesson/${nextLessonId}`)}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  {startedLessonsCount > 0 ? 'Продолжить обучение' : 'Начать курс'}
                  <Award className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 text-center animate-fadeIn">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {completedLessonsCount}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Уроков пройдено</div>
            </div>
            
            <div className="glass rounded-xl p-6 text-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {Math.round(totalProgress)}%
              </div>
              <div className="text-gray-600 dark:text-gray-300">Прогресс курса</div>
            </div>
            
            <div className="glass rounded-xl p-6 text-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {lessons.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Всего уроков</div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <ProgressBar
            completed={completedLessonsCount}
            total={lessons.length}
            percentage={totalProgress}
          />
        </div>

        {/* Lessons Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Программа курса
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => {
              const progress = lessonsProgress[lesson.id];
              const isAvailable = lesson.id === 1 || lessonsProgress[lesson.id - 1]?.completed;
              
              return (
                <div
                  key={lesson.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <LessonCard
                    id={lesson.id}
                    title={lesson.title}
                    description={lesson.description}
                    duration={lesson.duration}
                    topics={lesson.topics}
                    completed={progress?.completed || false}
                    started={progress?.started || false}
                    available={isAvailable}
                    onClick={() => isAvailable && navigate(`/lesson/${lesson.id}`)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};