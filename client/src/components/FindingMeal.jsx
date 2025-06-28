import { Play } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FindingMeal = ({ meals }) => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username') || 'Guest';

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Centered Greeting */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-600 font-serif tracking-wide">
          Hello, {username} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1 font-light">
          Here are some delicious meals we picked for you.
        </p>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals &&
          meals.map((meal, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {meal.name}
                  </h3>
                  <p className="text-sm text-gray-500">{meal.time}</p>
                </div>
                <button
                  onClick={() => navigate(`/recipe/${meal.id}`)}
                  className="bg-black text-white text-sm p-2 rounded-full hover:bg-gray-800"
                >
                  <Play size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FindingMeal;
