import { create } from 'zustand';
import * as Sentry from '@sentry/browser';

export const useRecipeStore = create((set) => ({
  isGenerating: false,
  currentRecipe: null,
  recipeHistory: [],
  error: null,
  
  setGenerating: (isGenerating) => set({ isGenerating }),
  
  setCurrentRecipe: (recipe) => set((state) => ({
    currentRecipe: recipe,
    recipeHistory: recipe 
      ? [recipe, ...state.recipeHistory].slice(0, 10) 
      : state.recipeHistory,
    isGenerating: false,
    error: null
  })),
  
  setError: (error) => {
    Sentry.captureException(error);
    set({ error: error.message, isGenerating: false });
  },
  
  clearCurrentRecipe: () => set({ currentRecipe: null }),
  
  clearError: () => set({ error: null })
}));