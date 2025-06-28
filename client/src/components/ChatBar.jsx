import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import axios from 'axios';

const ChatBar = ({setMeals, setIsLoading}) => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');

  const handleSubmit = async() => {
      setIsLoading(true)
        try {
            const res = await axios.post("http://localhost:8080/api/meals", {ingredients: items})
            setMeals(res.data)
            localStorage.setItem('meals', JSON.stringify(res.data))
        } catch (error) {
            console.log(error.message)
        }
        finally{
          setIsLoading(false)
        }
    }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && item.trim() !== '') {
      setItems((prev) => [...prev, item.trim()]);
      setItem('');
    }
  };


  const removeItem = (idxToRemove) => {
    setItems((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">

      <ul className="flex flex-wrap gap-2 mb-3">
        {items.map((tag, idx) => (
          <li
            key={idx}
            className="bg-gray-200 px-3 py-1 flex items-center gap-2 rounded-full text-sm"
          >
            {tag}
            <button onClick={() => removeItem(idx)} className="hover:text-red-600">
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>


      <div className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-md">
        <input
          type="text"
          className="flex-1 border border-gray-300 px-3 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your tag and press Enter..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={() => handleSubmit()}
          className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
        >
          <Send size={20}/>
        </button>
      </div>
    </div>
  );
};

export default ChatBar;
