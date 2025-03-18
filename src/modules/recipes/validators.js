import { createValidator } from '@/modules/core/validators';

export const recipeDescriptionSchema = {
  description: { type: 'string', required: true }
};

export const validateRecipeDescription = createValidator(recipeDescriptionSchema, 'RecipeDescription');

export const recipeSchema = {
  title: { type: 'string', required: true },
  ingredients: { type: 'array', required: true },
  instructions: { type: 'array', required: true }
};

export const validateRecipe = createValidator(recipeSchema, 'Recipe');