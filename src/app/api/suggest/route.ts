import { NextRequest, NextResponse } from 'next/server';
import { runFlow } from 'genkit';
import { menuSuggestionFlow } from '@/ai/flows'; // Using '@/' for absolute import from src

export async function POST(request: NextRequest) {
  try {
    const { cuisineType } = await request.json();

    if (!cuisineType || typeof cuisineType !== 'string' || cuisineType.trim() === '') {
      return NextResponse.json({ error: 'Cuisine type is required and must be a non-empty string.' }, { status: 400 });
    }

    // Ensure Genkit is initialization.
    // In a production setup, Genkit initialization (genkit.config) should ideally run once when the server starts.
    // For Next.js serverless functions, it might re-run. The `dev.ts` handles local dev server.
    // For deployed environments, ensure GENKIT_ENV is set appropriately.
    // No explicit genkit.config() call here as it's expected to be handled by the environment
    // or a global setup file if necessary for production builds. `src/ai/dev.ts` covers `genkit dev`.

    const result = await runFlow(menuSuggestionFlow, { cuisineType });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error:', error);
    // Provide a generic error message to the client
    // Log the specific error on the server for debugging
    let errorMessage = 'Failed to get suggestion.';
    if (error.message) {
      errorMessage += ` Details: ${error.message}`;
    }
    // Check for Genkit specific error details if available
    if (error.details) {
      errorMessage += ` Genkit Details: ${error.details}`;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
