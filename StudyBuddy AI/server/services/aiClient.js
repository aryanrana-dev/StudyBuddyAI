const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../config/.env') });


/**
 * Sends a prompt to the Groq Llama 3.1 8b model using native fetch.
 * Returns a fallback message if the API call fails.
 * * @param {string} userPrompt - The text prompt to send.
 * @returns {Promise<string>} - The model's response or a fallback message.
 */
module.exports.getGeminiResponse = async function getGeminiResponse(userPrompt, userStage) {
    // 1. Define fallback response
    const fallbackResponse = "I'm currently having trouble connecting to the AI service. Please try again later.";

    if (!process.env.GEMINI_API_KEY) {
        console.error("Error: GEMINI_API_KEY is missing in .env file");
        return "System Error: API Key missing.";
    }

    const messages = `
SYSTEM INSTRUTIONS:
You are a reliable AI engine embedded inside a software application.

STRICT RULES:
- You MUST return ONLY valid JSON.
- Do NOT include markdown, code fences, or explanations outside JSON.
- Do NOT add extra keys.
- Do NOT change the JSON structure.
- Keep responses concise and deterministic.

USER INQUIRY:
${userPrompt}

USER STAGE:
${userStage}

TASK:
Analyze the inquiry, stage and respond using the JSON schema below.

REQUIRED JSON FORMAT:
{
  "summary": "string",
  "explanation": "string",
  "realWorldExamples": ["string", "string"],
  "technicalExamples": ["string", "string"],
  "steps": ["string", "string", "string", ...],
  "questionsAndAnswers": {"string": "string", "string": "string"},
}

IMPORTANT:
- Explanation length can vary in accordance to user stage, but should be under 200 words maximum.
- Summary must be concise, no more than 50 words.
- Items must be concrete
- The steps must be in logical order showing which things need to understand first to learn topic effectively.
- Steps must be actionable
- The stage shows the level of information to provide, if beginner, focus on basics, if intermediate, include more depth, if advanced, include technical details.
- Return ONLY valid JSON
`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const payload = {
    contents: [{ parts: [{ text: messages }] }],
    // Add this configuration object:
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // 3. Handle HTTP errors (e.g., 401 Unauthorized, 500 Server Error)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({})); // Try to parse error details
            console.error(`Gemini API Error (${response.status}):`, errorData);
            return fallbackResponse;
        }

        // 4. Parse success response
        const data = await response.json();
        return data.candidates?.[0]?.content.parts?.[0]?.text || fallbackResponse;

    } catch (error) {
        // 5. Handle Network errors (e.g., DNS failure, offline)
        console.error("Network Error calling Groq:", error);
        return fallbackResponse;
    }
}