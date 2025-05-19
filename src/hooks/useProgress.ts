import { useState, useEffect } from 'react';
import { AppState } from '../types/lesson';
import { storage } from '../utils/storage';

const initialState: AppState = {
  currentLesson: null,
  lessonsProgress: {},
  userAnswers: {}
};

export const useProgress = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = storage.getAppState();
    return saved || initialState;
  });

  useEffect(() => {
    storage.saveAppState(state);
  }, [state]);

  const startLesson = (lessonId: number) => {
    setState(prev => ({
      ...prev,
      currentLesson: lessonId,
      lessonsProgress: {
        ...prev.lessonsProgress,
        [lessonId]: {
          ...prev.lessonsProgress[lessonId],
          started: true,
          completed: false,
          lastBlockId: null,
          completedBlocks: [],
          startedAt: new Date().toISOString()
        }
      }
    }));
  };

  const completeBlock = (lessonId: number, blockId: string) => {
    setState(prev => {
      const lessonProgress = prev.lessonsProgress[lessonId] || {
        started: true,
        completed: false,
        lastBlockId: null,
        completedBlocks: []
      };

      const completedBlocks = lessonProgress.completedBlocks.includes(blockId)
        ? lessonProgress.completedBlocks
        : [...lessonProgress.completedBlocks, blockId];

      return {
        ...prev,
        lessonsProgress: {
          ...prev.lessonsProgress,
          [lessonId]: {
            ...lessonProgress,
            lastBlockId: blockId,
            completedBlocks
          }
        }
      };
    });
  };

  const completeLesson = (lessonId: number) => {
    setState(prev => ({
      ...prev,
      currentLesson: null,
      lessonsProgress: {
        ...prev.lessonsProgress,
        [lessonId]: {
          ...prev.lessonsProgress[lessonId],
          completed: true,
          completedAt: new Date().toISOString()
        }
      }
    }));
  };

  const saveAnswer = (questionId: string, answer: any) => {
    setState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [questionId]: answer
      }
    }));
  };

  return {
    ...state,
    startLesson,
    completeBlock,
    completeLesson,
    saveAnswer
  };
};