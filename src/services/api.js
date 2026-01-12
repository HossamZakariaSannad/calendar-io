/**
 * API Service - Handles communication with Perplexity AI
 * 
 * This service sends natural language availability descriptions
 * to the AI and receives structured calendar data back.
 */

// API key from environment variable
const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;
const API_URL = 'https://api.perplexity.ai/chat/completions';

/**
 * Creates the prompt for the AI to parse availability
 * @param {string} description - Natural language availability description
 * @returns {string} - Formatted prompt for the AI
 */
const createAvailabilityPrompt = (description) => {
  return `You are an expert at parsing natural language availability descriptions into structured time slots.

Given this availability description: "${description}"

Parse it into a structured JSON response with this exact format:
{
  "monday": ["09:00", "09:30", "10:00"],
  "tuesday": ["14:00", "14:30"],
  "wednesday": ["21:00", "21:30", "22:00"],
  "thursday": [],
  "friday": [],
  "saturday": ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"],
  "sunday": ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00"]
}

IMPORTANT RULES:
1. Use 24-hour format (HH:MM)
2. Use 30-minute intervals (e.g., 09:00, 09:30, 10:00)
3. Return ONLY the JSON object, no explanation text
4. All 7 days must be present, even if empty []
5. Times must be in chronological order within each day
6. "noon" = 12:00, "midnight" = 00:00 (or 23:30 as last slot)
7. "weekends" = Saturday and Sunday
8. "after X pm" means starting from X pm until a reasonable end time
9. "otherwise" or "other days" means all days not specifically mentioned

Return ONLY valid JSON, no other text.`;
};

/**
 * Parses natural language availability using Perplexity AI
 * @param {string} description - Natural language description of availability
 * @returns {Promise<Object>} - Parsed calendar data with days as keys and time arrays as values
 * @throws {Error} - If API call fails or response is invalid
 */
export const parseAvailabilityWithAI = async (description) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [{ role: 'user', content: createAvailabilityPrompt(description) }],
        max_tokens: 1024,
        temperature: 0.2,
        search_context_size: 'low'
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from AI');
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response - no valid JSON found');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate the response has all required days
    const requiredDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (const day of requiredDays) {
      if (!Array.isArray(parsed[day])) {
        parsed[day] = [];
      }
    }

    return parsed;
  } catch (error) {
    console.error('AI parsing error:', error);
    throw error;
  }
};

export default { parseAvailabilityWithAI };
