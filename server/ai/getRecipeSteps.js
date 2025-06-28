const  { GoogleGenAI } = require("@google/genai");
const axios = require('axios')

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getRecipeSteps(recipe) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `give me a clear and detailed steps for this recipe ${recipe}
    Return the output strictly as a valid JSON array (not JavaScript, not code blocks, no explanation). Each object in the array must have:
Example format:

[
  { key: '--- Part 1: Sautéing and Grinding ---', value: 0 },
  { key: 'Heat Gingelly (Sesame) oil or any cooking oil in a pan', value: 0.5 },
  { key: 'Add 3-4 Dry Red Chillies and 1 tsp Urad Dal', value: 1 },
  { key: 'Add 4-5 chopped Garlic cloves and a small piece of Ginger', value: 1 },
  { key: 'Add 1 large chopped Onion', value: 3 },
  { key: 'Add 3 large chopped ripe Tomatoes', value: 5 },
  {
    key: 'Add 1/4 tsp Turmeric Powder ($Manjal Thool$) and 1/2 tsp Red Chilli Powder (optional, for colour and heat)',
    value: 1,
  },
  {
    key: 'Add a very small piece of Tamarind ($Puli$) to enhance the tanginess',
    value: 2,
  },
  { key: 'Turn off the stove and let the mixture cool down completely', value: 15 },
  {
    key: 'Transfer the cooled mixture to a blender, add Salt to taste, and grind to a smooth or slightly coarse paste. Do not add water.',
    value: 1,
  },
  { key: '--- Part 2: Tempering (Thalippu) ---', value: 0 },
  { key: 'In a small pan, heat 1 tsp of Gingelly (Sesame) Oil', value: 0.5 },
  { key: 'Add 1/2 tsp Mustard Seeds ($Kadugu$) and let them splutter', value: 0.3 },
  { key: 'Add 1/2 tsp Urad Dal ($Ulutham Paruppu$)', value: 0.3 },
  { key: 'Add a few Curry Leaves ($Karuveppilai$) and a pinch of Asafoetida ($Perungayam$)', value: 0.2 },
  { key: 'Pour this hot tempering over the ground chutney and mix well', value: 0 },
]
`

  });
const rawText = response.text;
const cleaned = rawText
  .replace(/```(json)?/, "")
  .replace(/```/, "")
  .trim();

const steps = JSON.parse(cleaned); 
return steps
}






module.exports =  getRecipeSteps