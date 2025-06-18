'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"; // Import Button
import { Input } from "@/components/ui/input";   // Import Input

interface SuggestionResult {
  suggestion?: string;
  details?: string;
  error?: string;
}

export default function HomePage() {
  const [cuisineType, setCuisineType] = useState<string>('');
  const [suggestion, setSuggestion] = useState<SuggestionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    if (!cuisineType.trim()) {
      setError('Please enter a cuisine type.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cuisineType }),
      });

      const result: SuggestionResult = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `API request failed with status ${response.status}`);
      }
      setSuggestion(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setSuggestion(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground">AI Menu Suggester</h1>
        <p className="text-muted-foreground mt-2">
          Enter a type of cuisine (e.g., Italian, Mexican, Japanese) to get a dish suggestion.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
          placeholder="Enter cuisine type"
          className="flex-grow"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Getting suggestion...' : 'Get Suggestion'}
        </Button>
      </form>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md mb-6">
          <h3 className="font-bold">Error</h3>
          <p>{error}</p>
        </div>
      )}

      {suggestion && suggestion.suggestion && (
        <section className="bg-card border border-border p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-card-foreground mb-3">Suggestion:</h2>
          <p className="text-xl font-bold text-primary mb-2">{suggestion.suggestion}</p>
          {suggestion.details && (
            <div className="text-muted-foreground whitespace-pre-wrap">
              <h4 className="font-semibold text-foreground mb-1">Details:</h4>
              <p>{suggestion.details}</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
