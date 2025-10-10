import React, { useContext } from 'react';
import { assets, plans } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const BuyCredit = () => {
  const { user } = useContext(AppContext);

  return (
    <motion.div
      className='min-h-[80vh] text-center pt-14 mb-10'
      initial={{ opacity: 0.2, y: 100 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }} 
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap gap-6 justify-center'>
        {plans.map((item, index) => (
          <motion.div
            key={index}
            className='bg-white drop-shadow-sm p-12 rounded-lg py-12 px-8 text-gray-800 hover:scale-105 transition-all duration-500'
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }}
          >
            <div className=''>
              <img width={30} src={assets.lock_icon} alt="" className='mx-auto mb-2' />
              <h2 className='mt-3 mb-2 text-xl font-semibold text-blue-600'>{item.id}</h2>
              <h1 className='text-3xl font-bold text-gray-800 mb-2'>{item.price}</h1>
              <p>{item.credits}</p>
              <p>{item.desc}</p>
              <button className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 cursor-pointer'>
                {user ? 'Purchase Now' : 'Get Started'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;