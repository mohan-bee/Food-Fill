const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(express.json())
app.use(cors({
    origin: "https://food-fill.vercel.app"
}))

const getRecipies = require('./ai/getGeminiRecipes');
const getRecipeStepPrompt = require('./ai/getRecipeSteps')
const getIngredients = require('./ai/getIngredients')

app.post('/api/meals', async(req,res) => {
    try {
        const {ingredients} = req.body
        const meals = await getRecipies(ingredients)
        return res.status(200).json(meals)
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", msg: error.message})
    }
})
app.post('/api/steps', async(req,res) => {
    try {
        const {recipe} = req.body
        const steps = await getRecipeStepPrompt(recipe)
        return res.status(200).json(steps)
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", msg: error.message})
    }
})
app.post('/api/ingredients', async(req,res) => {
    try {
        const {steps} = req.body
        const ingredients = await getIngredients(JSON.stringify(steps))
        return res.status(200).json(ingredients)
    } catch (error) {
        return res.status(500).json({msg: "Internal Server Error", msg: error.message})
    }
})


app.listen(8080, () => {
    console.log("Server is running...")
})

