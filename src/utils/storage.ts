import { AppState } from '../types/lesson';

const STORAGE_KEY = 'group-therapy-course';

export const storage = {
  getAppState: (): AppState | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading app state:', error);
      return null;
    }
  },

  saveAppState: (state: AppState): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving app state:', error);
    }
  },

  clearAppState: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing app state:', error);
    }
  },

  getUserAnswer: (questionId: string): any => {
    const state = storage.getAppState();
    return state?.userAnswers[questionId] || null;
  },

  saveUserAnswer: (questionId: string, answer: any): void => {
    const state = storage.getAppState();
    if (state) {
      state.userAnswers[questionId] = answer;
      storage.saveAppState(state);
    }
  }
};