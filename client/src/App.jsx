import React, { useState } from 'react'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecipeApp from './components/RecipeApp'
import RecipeInfo from './components/RecipeInfo'
import Loader from './components/Loader'
import Landing from './components/Landing'


const App = () => {
    const [meals, setMeals] = useState(JSON.parse(localStorage.getItem('meals')) || null)
    const [isLoading, setIsLoading] = useState(false)
if(isLoading){
  return <Loader />
}
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/app' index element={<RecipeApp meals={meals} setIsLoading={setIsLoading}  setMeals={setMeals}/>}/>
        <Route path='/recipe/:id' element={<RecipeInfo meals={meals} setIsLoading={setIsLoading}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App