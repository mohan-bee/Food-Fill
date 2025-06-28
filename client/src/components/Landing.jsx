import React, { useState } from 'react';
import introMp4 from '../assets/introducing.mp4'; // Ensure correct relative path
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const [showBtn, setShowBtn] = useState(false)
    setTimeout(() => {
        setShowBtn(true)
    }, 15000);
    const navigate = useNavigate()
  return (
    <div className="w-full h-screen overflow-hidden">
        {showBtn && <button onClick={() => navigate('/login')} className='z-10 absolute transition-all bg-amber-100 p-3 rounded-md shadow-2xs bottom-20 right-1/4 border text-xl sm:text-xl font-bold text-zinc-800'>Get Started</button>}
      <video
        src={introMp4}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Landing;
