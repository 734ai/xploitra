import { defineFlow, runFlow } from 'genkit';
import { geminiPro } from '@genkit-ai/googleai'; // Assuming geminiPro is the desired model
import * as z from 'zod';

// Define the schema for the flow input
const CuisineInputSchema = z.object({
  cuisineType: z.string().min(1, "Cuisine type cannot be empty."),
});

// Define the schema for the flow output (optional but good practice)
const MealSuggestionSchema = z.object({
  suggestion: z.string(),
  details: z.string().optional(), // e.g., ingredients or a short description
});

export const menuSuggestionFlow = defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: CuisineInputSchema,
    outputSchema: MealSuggestionSchema,
  },
  async (input) => {
    const { cuisineType } = input;

    const prompt = `Suggest a popular and easy-to-make dish for ${cuisineType} cuisine. Provide a brief description of the dish.`;

    const llmResponse = await geminiPro.generate({
      prompt: prompt,
      config: { temperature: 0.7 },
    });

    const suggestionText = llmResponse.text();

    // Attempt to parse the suggestion and details if possible, or use the whole text
    // This is a simplified parsing; more robust parsing might be needed for complex outputs
    const lines = suggestionText.split('\n');
    const suggestion = lines[0] || "Could not generate a suggestion.";
    const details = lines.slice(1).join('\n').trim() || undefined;

    return {
      suggestion,
      details,
    };
  }
);

// Example of how to run the flow (for testing or from an API handler)
// async function testFlow() {
//   try {
//     const result = await runFlow(menuSuggestionFlow, { cuisineType: "Italian" });
//     console.log("Flow Result:", result);
//   } catch (error) {
//     console.error("Error running flow:", error);
//   }
// }
// testFlow(); // Uncomment for local testing if needed
