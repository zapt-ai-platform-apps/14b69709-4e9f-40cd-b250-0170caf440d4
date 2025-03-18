import React from 'react';
import RecipeForm from '@/modules/recipes/ui/RecipeForm';
import RecipeResult from '@/modules/recipes/ui/RecipeResult';
import { FaUtensils } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <header className="text-center mb-8">
        <div className="flex justify-center mb-3">
          <FaUtensils className="text-4xl text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Recetas Automáticas</h1>
        <p className="text-gray-600">
          Crea deliciosas recetas con solo una descripción
        </p>
      </header>
      
      <section className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Genera tu receta</h2>
        <RecipeForm />
      </section>
      
      <section>
        <RecipeResult />
      </section>
      
      <footer className="mt-12 text-center text-sm text-gray-500">
        <a 
          href="https://www.zapt.ai" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block hover:text-blue-500 transition-colors"
        >
          Made on ZAPT
        </a>
      </footer>
    </div>
  );
};

export default Home;