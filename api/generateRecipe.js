import OpenAI from 'openai';
import * as Sentry from "@sentry/node";

// Initialize Sentry
Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  console.log('Received request to generate recipe');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    const { description } = req.body;
    
    if (!description || typeof description !== 'string') {
      return res.status(400).json({ error: 'Descripción inválida o vacía' });
    }
    
    console.log(`Generating recipe for description: ${description}`);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un asistente de cocina que crea recetas. Devuelve las recetas en formato JSON con título (title), ingredientes (ingredients como array), e instrucciones (instructions como array). Sé creativo y detallado. Genera la respuesta solamente en español. Devuelve únicamente el objeto JSON sin ningún otro texto."
        },
        {
          role: "user",
          content: `Crea una receta basada en esta descripción: ${description}`
        }
      ],
      response_format: { type: "json_object" }
    });
    
    // Extract the JSON from the response
    const responseText = completion.choices[0].message.content;
    console.log('Raw API response received');
    
    try {
      const recipeData = JSON.parse(responseText);
      console.log('Parsed recipe data successfully');
      
      // Validate the recipe format
      if (!recipeData.title || !Array.isArray(recipeData.ingredients) || !Array.isArray(recipeData.instructions)) {
        throw new Error('Formato de receta inválido devuelto por la IA');
      }
      
      return res.status(200).json(recipeData);
    } catch (parseError) {
      console.error('Error parsing recipe data:', parseError);
      Sentry.captureException(parseError);
      return res.status(500).json({ error: 'Error al procesar los datos de la receta' });
    }
  } catch (error) {
    console.error('Error generating recipe:', error);
    Sentry.captureException(error);
    return res.status(500).json({ error: 'Error al generar la receta' });
  }
}