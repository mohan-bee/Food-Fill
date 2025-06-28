import React, { useState } from 'react'
import ChatBar from './ChatBar'
import FindingMeal from './FindingMeal'


const RecipeApp = ({meals, setMeals, setIsLoading}) => {
  return (
    <div className='w-1/2 m-auto h-screen flex flex-col justify-between py-10'>
        <FindingMeal meals={meals}/>
        <ChatBar setMeals={setMeals} setIsLoading={setIsLoading}/>
    </div>
  )
}

export default RecipeApp