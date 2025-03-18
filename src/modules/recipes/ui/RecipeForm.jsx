import React, { useState } from 'react';
import Button from '@/shared/components/Button';
import TextArea from '@/shared/components/TextArea';
import { api } from '../api';
import { useRecipeStore } from '../internal/state';

const RecipeForm = () => {
  const [description, setDescription] = useState('');
  const { isGenerating, error, clearError } = useRecipeStore();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || isGenerating) return;
    
    clearError();
    try {
      await api.generateRecipe(description.trim());
    } catch (err) {
      // Error is handled in the service
      console.log('Form caught error:', err);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="recipe-description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción de la receta
        </label>
        <TextArea
          id="recipe-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe la receta que deseas (por ejemplo: una pasta vegetariana con calabacín, una receta saludable de pollo, postre de chocolate sin azúcar...)"
          rows={5}
        />
        <p className="mt-1 text-sm text-gray-500">
          Sé específico para obtener mejores resultados
        </p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div>
        <Button
          type="submit"
          disabled={!description.trim() || isGenerating}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
        >
          {isGenerating ? 'Generando...' : 'Generar Receta'}
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;