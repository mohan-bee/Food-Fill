import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { animate, motion, transform } from 'framer-motion';
import { ArrowLeft, Timer } from 'lucide-react';
import Popup from './Popup';
import axios from 'axios';



const RecipeInfo = ({meals, setIsLoading}) => {
  const { id } = useParams();
  const [recipeSteps, setRecipeSteps] = useState(null)
  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState(null)
  const navigate = useNavigate()
  const [isPopped, setIsPopped] = useState(false)
  const [contentIdx, setContentIdx] = useState(-1)
  const makeItDone = (idx) => {
    if(steps[idx-1] || idx ==0){
        const updated = [...steps];
    updated[idx] = true;
    setSteps(updated);
    }
    else{
        return
    }
  };

  const openPopup = (idx) => {
    if(steps[idx]){
        setIsPopped(true)
    setContentIdx(idx)
    }
    else{
        return 
    }
  }
  

  useEffect(() => {
    const fetchSteps = async () => {
    try {
        const res = await axios.post('http://localhost:8080/api/steps', {recipe: meals[id-1].name})
        const ingredients = await axios.post('http://localhost:8080/api/ingredients', {steps: res.data})
        setRecipeSteps(res.data)
        setIngredients(ingredients.data)
    } catch (error) {
        console.log(error.message)
    }

   
  }
  fetchSteps()
    setSteps(Array(recipeSteps &&  recipeSteps.length || 0).fill(false))
  }, [])

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-white shadow-md p-6 hidden lg:block">
        <h2 className="text-xl font-bold mb-4">Ingredients</h2>
        <ul className="space-y-2 text-gray-700 text-sm">
          {ingredients && ingredients.map(el => (
            <li>{el}</li>
          ))}
        </ul>
      </aside>

      {/* Steps */}
      <main className="flex-1 p-8">
        <p className='flex gap-1 cursor-pointer hover:underline' onClick={() => navigate('/app')}><ArrowLeft /> Back </p>
        <h1 className="text-3xl font-bold mb-6">Let's Make {meals[id-1].name}</h1>

        {/* Step Tracker */}
        <div className="flex gap-2 my-5">
          {steps &&  steps.map((step, idx) => (
            <div
              key={idx}
              className={`${
                !step ? 'bg-white text-black border' : 'bg-black text-white'
              } p-3 w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border`}
              onClick={() => openPopup(idx)}
            >
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Recipe Steps */}
        <div className="flex flex-col gap-4 items-center">
         {recipeSteps &&  recipeSteps.map((step, idx) =>
  !steps[idx] && ( 
    <motion.div
      key={idx}
      initial={{ opacity: 1, x: 0, scale: 1 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200, scale: 0.9 }} 
      transition={{ duration: 0.5 }}
      layout
      className="bg-yellow-100 border rounded-lg flex w-full max-w-3xl justify-between items-center p-4"
    >
      <p className="text-gray-800">{step.key}</p>
      {/* <div className="flex gap-3 items-center text-sm text-gray-600">
        <Timer size={16} />
        <span>{step.value} mins</span>
      </div> */}
      <button
        onClick={() => makeItDone(idx)}
        className="bg-black text-white select-none px-4 py-1 items-center gap-2 flex rounded-md text-sm cursor-pointer"
      >
        <Timer size={15} /> {step.value}m <p>Done</p>
      </button>
    </motion.div>
  )
)}

        </div>
      </main>
      {isPopped && <Popup setIsPopped={setIsPopped} setContentIdx={setContentIdx} content={recipeSteps[contentIdx]}/>}

    </div>
  );
};

export default RecipeInfo