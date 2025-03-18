import { eventBus } from '@/modules/core/events';
import { events } from '../events';
import { validateRecipeDescription } from '../validators';
import { useRecipeStore } from './state';
import * as Sentry from '@sentry/browser';

/**
 * Generates a recipe from a description by calling the API
 * @param {string} description - Description of the recipe to generate
 */
export async function generateRecipe(description) {
  try {
    // Validate the input
    validateRecipeDescription({ description }, {
      actionName: 'generateRecipe',
      location: 'recipes/internal/services.js',
      direction: 'incoming',
    });
    
    // Update state to reflect generation in progress
    useRecipeStore.getState().setGenerating(true);
    eventBus.publish(events.RECIPE_GENERATION_STARTED, { description });
    
    console.log('Sending recipe generation request for:', description);
    
    // Call the API to generate the recipe
    const response = await fetch('/api/generateRecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al generar la receta');
    }
    
    const recipe = await response.json();
    console.log('Recipe generated successfully');
    
    // Update state with the generated recipe
    useRecipeStore.getState().setCurrentRecipe(recipe);
    eventBus.publish(events.RECIPE_GENERATED, recipe);
    
    return recipe;
  } catch (error) {
    console.error('Error generating recipe:', error);
    useRecipeStore.getState().setError(error);
    eventBus.publish(events.RECIPE_GENERATION_FAILED, { error: error.message });
    Sentry.captureException(error);
    throw error;
  }
}