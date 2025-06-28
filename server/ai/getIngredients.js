const  { GoogleGenAI } = require("@google/genai");
const axios = require('axios')

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getIngredients(steps) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
   List all ingredients required to cook a simple mentioned in this steps ${steps}, authentic recipe using the following ingredients as a base.

Return the output strictly as a **valid JSON array**. 
Each item should be a string, e.g.:

[
  "Chicken",
  "Ginger",
  "Garlic",
  "Cumin seeds",
  "Green chili",
  "Salt",
  "Turmeric powder",
  "Oil"
]

⚠️ Important:
- Do NOT include any explanation, comments, code blocks, or variable assignments.
- Only return the pure JSON array of strings.
- Each ingredient must be usable and relevant to the dish (no duplicates, no tools).

`

  });
const rawText = response.text;
const cleaned = rawText
  .replace(/```(json)?/, "")
  .replace(/```/, "")
  .trim();

const ingredients = JSON.parse(cleaned); 
console.log(ingredients)
return ingredients
}






module.exports =  getIngredients