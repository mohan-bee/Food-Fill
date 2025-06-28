import React from 'react'
import { motion } from 'framer-motion'

const Popup = ({ content, setContentIdx, setIsPopped }) => {
  const cancel = () => {
    setIsPopped(false)
    setContentIdx(-1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-0 flex items-center transition-transform justify-center backdrop-blur-xs bg-opacity-30 z-50"
      onClick={() => setIsPopped(false)}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center gap-6 border border-gray-200">
        <p className="text-lg font-semibold text-center text-gray-800 bg-blue-100 px-4 py-2 rounded-md border border-blue-400 w-full">
          {content?.key}
        </p>
        <p className="text-md text-gray-700 bg-yellow-100 px-4 py-2 rounded-md border border-yellow-400 w-full text-center">
          ⏱ {content?.value} mins
        </p>
        <button
          onClick={cancel}
          className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all text-sm font-medium"
        >
          Close
        </button>
      </div>
    </motion.div>
  )
}

export default Popup
