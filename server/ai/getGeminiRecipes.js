const  { GoogleGenAI } = require("@google/genai");
const axios = require('axios')

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getRecipies(ingredients) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Using the following ingredients: ${ingredients.join(", ")}, list 5 simple recipes I can make.

Return the output strictly as a valid JSON array (not JavaScript, not code blocks, no explanation). Each object in the array must have:

- id: A unique number
- name: The name of the recipe
- time: Approximate time to cook (e.g., "15 mins")
- image: make sure the image name is realted to unplash image

Example format:

[
  {
    id: 1,
    name: "Iced Coffee",
    time: "5 mins",
    image: "" // have a good description of the food
  },
  ...
]
`

  });
const rawText = response.text;
const cleaned = rawText
  .replace(/```(json)?/, "")
  .replace(/```/, "")
  .trim();

const meals = JSON.parse(cleaned); 
  const updatedMeals = await Promise.all(
    meals.map(async (meal) => {
      const imageUrl = await getImage(meal.image || meal.name);
      return { ...meal, image: imageUrl };
    })
  );

return updatedMeals
}

async function getImage(name) {
  try {
    const response = await axios.get('https://pixabay.com/api', {
      params: {
        q: name,
        page: 1,
        key: '51084542-b1aabf8ea8309ea983d5accc7',
        mage_type: 'photo',
        pretty: true
      },
      // headers: {
      //   Authorization: 'Client-ID WsT6GDAbzthCFhkKtLirBJhIz8zkdC8xxvZJ9MND6Mo',
      // },
    });

    const imageUrl = response?.data?.hits[0]?.largeImageURL;
    return imageUrl
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error.message);
  }
}




module.exports =  getRecipies