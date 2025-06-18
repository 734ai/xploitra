import { GENKIT_ENV, getGoogleCloudCredentials } from 'genkit/google';
import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit'; // Corrected import

genkit.config({
  plugins: [
    googleAI({ apiKey: process.env.GEMINI_API_KEY }), // Assumes GEMINI_API_KEY is in .env
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// The Genkit development server will automatically pick up flows defined in this directory
// (e.g., from flows.ts), so no explicit import of menuSuggestionFlow is needed here.
