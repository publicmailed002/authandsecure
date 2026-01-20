import React from 'react'
const Input = ({icon:Icon , ...props}) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 top-0.5 items-center pl-3 pointer-events-none'>

            <Icon className="size-7 text-green-500 pt-2 " />

        </div>
        <input  
        className='w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200'
        {...props}
        />
      
    </div>
  )
}

export default Input
