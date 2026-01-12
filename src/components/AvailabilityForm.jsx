/**
 * AvailabilityForm Component
 * 
 * Handles user input for natural language availability description
 * and tutor identification.
 */

import { useState } from 'react';
import { Card, CardTitle, CardDescription, Button, Alert } from './ui';

export default function AvailabilityForm({ onSubmit, loading }) {
  const [description, setDescription] = useState('');
  const [tutorId, setTutorId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() && tutorId.trim()) {
      onSubmit({ description: description.trim(), tutorId: tutorId.trim() });
    }
  };

  const exampleText = "I am available between noon and 4pm on weekends, after 7pm to midnight on Monday and Wednesday, and after 9pm otherwise";

  return (
    <Card>
      <CardTitle>Step 1: Describe Your Availability</CardTitle>
      <CardDescription>
        Enter your availability in natural language. The AI will understand 
        common patterns like "after 7pm", "weekends", "noon to 4pm", etc.
      </CardDescription>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Availability Description */}
        <div>
          <label 
            htmlFor="availability" 
            className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
          >
            Your Availability Description
          </label>
          <textarea
            id="availability"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Example: ${exampleText}`}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
                       text-gray-800 placeholder-gray-400 text-sm
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                       transition-all duration-200 resize-y"
          />
        </div>

        {/* Tutor ID */}
        <div>
          <label 
            htmlFor="tutorId" 
            className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
          >
            Your Name / Tutor ID
          </label>
          <input
            id="tutorId"
            type="text"
            value={tutorId}
            onChange={(e) => setTutorId(e.target.value)}
            placeholder="e.g., john_doe or tutor123"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
                       text-gray-800 placeholder-gray-400 text-sm
                       focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                       transition-all duration-200"
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full" 
          loading={loading}
          disabled={!description.trim() || !tutorId.trim()}
        >
          ✨ Generate Calendar
        </Button>
      </form>

      {loading && (
        <Alert variant="info" className="mt-4">
          Processing your availability description with AI...
        </Alert>
      )}
    </Card>
  );
}
