import React from 'react'
import { assets, testimonialsData } from '../assets/assets'
import {motion} from 'framer-motion'

const Testimonials = () => {
  return (
    <motion.div className='flex flex-col justify-center items-center my-20 py-12'
    initial={{opacity:0.2, y:100}}
    whileInView={{opacity:1, y:0}}
    transition={{duration:1}}
    viewport={{once:true}}
    >
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Customers Testimonials</h1>
        <p className='text-gray-800 mb-12'>See what our customers are saying</p>

        <div className='flex flex-wrap gap-6'>
            {
                testimonialsData.map((item,index)=>(
                    <div key={index} className='bg-white/20 p-12 rounded-lg shadow-md order w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all'>
                        <div className='flex flex-col items-center'>
                            <img src={assets.profile_icon} alt="" className='rounded-full w-14'/>
                            <h2 className='text-xl font-semibold mt-3'>{item.name}</h2>
                            <p className='text-gray-700 mb-4'>{item.location}</p>
                            <div className='flex mb-4'>
                                {Array(item.stars).fill().map((items,index)=>(
                                    <img src={assets.rating_star} alt="" key={index} />
                                ))}
                            </div>
                            <div>
                                <p className='text-center text-sm text-gray-700'>{item.text}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </motion.div>
  )
}

export default Testimonials