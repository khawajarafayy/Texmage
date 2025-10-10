import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Header = () => {
    const {user, setShowLogin} = useContext(AppContext);
    const navigate = useNavigate();

    const onClickHandler = ()=>{
        if(user){
            navigate('/result')
        }else{
            setShowLogin(true)
        }
    }
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
    initial={{opacity:0.2, y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1, y:0}}
    viewport={{once:true}}
    >
        
        <motion.div className='text-stone-800 inline-flex text-center gap-2 bg-white rounded-full px-6 py-1 border border-neutral-800'
        initial={{opacity:0, y:-20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.8, delay:0.2}}
        >
            <p>Best Text to Image Generator</p>
            <img src={assets.star_icon} alt="" />
        </motion.div>

        <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.2, duration:0.8}}
        >Turn text to <span className='[color:#3498db]'>image</span>, in seconds.</motion.h1>

        <motion.p className='text-xl text-center max-w-xl mx-auto mt-5'
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{delay:0.6, duration:0.8}}
        >AI transforms your words into art — see your imagination come to life.</motion.p>

        <motion.button onClick={onClickHandler} className='sm:text-lg text-white w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer [background-color:#1abc9c]'
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{default: {duration:0.5}, opacity: {delay:0.8, duration:1}}}
            >
            Generate Images
            <img className='h-6' src={assets.star_group} alt="" />
        </motion.button>

        

        <motion.div className='flex flex-wrap justify-center mt-16 gap-3'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1, duration:1}}
>
    {[assets.genedOne, assets.genedTwo, assets.genedThree, assets.genedFour, assets.genedFive, assets.genedSix].map((img, index) => (
        <motion.img
            className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10'
            whileHover={{scale: 1.05, duration: 0.1}}
            src={img}
            alt={`Generated_image_${index + 1}`}
            key={index}
            width={120}
        />
    ))}
</motion.div>

        <motion.p className='mt-2 mb-2 text-neutral-600'
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:1.2, duration:0.8}}
        >Generated images from Texmage</motion.p>
    </motion.div>
  )
}

export default Header