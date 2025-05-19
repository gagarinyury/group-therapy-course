import { useState, useEffect } from 'react';
import { Lesson } from '../types/lesson';

export const useLessonData = (lessonId: number) => {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLesson = async () => {
      try {
        setLoading(true);
        // Пока загружаем только lesson_01.json
        const response = await import(`../data/lessons/lesson_01.json`);
        setLesson(response.default as Lesson);
      } catch (err) {
        setError('Ошибка загрузки урока');
        console.error('Error loading lesson:', err);
      } finally {
        setLoading(false);
      }
    };

    loadLesson();
  }, [lessonId]);

  return { lesson, loading, error };
};