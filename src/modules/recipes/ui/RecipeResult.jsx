import React from 'react';
import Button from '@/shared/components/Button';
import { useRecipeStore } from '../internal/state';
import Loader from '@/shared/components/Loader';

const RecipeResult = () => {
  const { currentRecipe, isGenerating, clearCurrentRecipe } = useRecipeStore();
  
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4 border rounded-lg bg-gray-50">
        <Loader size="lg" />
        <p className="text-lg font-medium text-gray-700">Generando tu receta...</p>
        <p className="text-sm text-gray-500">Esto puede tomar unos segundos</p>
      </div>
    );
  }
  
  if (!currentRecipe) {
    return null;
  }
  
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{currentRecipe.title}</h2>
        <Button 
          onClick={clearCurrentRecipe}
          className="text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100"
        >
          Nueva Receta
        </Button>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredientes:</h3>
        <ul className="list-disc pl-5 space-y-1">
          {currentRecipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600">{ingredient}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Instrucciones:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          {currentRecipe.instructions.map((instruction, index) => (
            <li key={index} className="text-gray-600">{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeResult;