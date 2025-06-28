import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState(sessionStorage.getItem('username') || '')
    const navigate = useNavigate()
    const [showBtn, setShowBtn] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            toast.success(`Welcome ${username}`)
            sessionStorage.setItem('username', username)
            navigate('/app')
        } catch (error) {
            toast.error(error.message)
        }
    }
  return (
    <div className='flex gap-4 h-screen justify-center items-center'>
       <form onSubmit={handleSubmit} className='flex gap-2'>
         <input   className='border text-sm p-2 w-50 rounded-sm selection:bg-black selection:text-white outline-none font-sans ' type="text" placeholder='Enter a username' onChange={(e) => {setUsername(e.target.value); setShowBtn(true)}} value={username}/>
        {showBtn &&  <button type='submit' className='hover:bg-black hover:text-white p-2 rounded-md bg-white text-black border transition-all cursor-pointer'>Login</button>}
       </form>
    </div>
  )
}

export default Login