import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'

const Description = () => {
  return (
    <motion.div className='flex flex-col justify-center items-center my-24 p-6 md:px-28'
    initial={{opacity:0.2, y:100}}
    whileInView={{opacity:1, y:0}}
    transition={{duration:1}}
    viewport={{once:true}}
    >
        <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
        <p className='text-gray-800 mb-8'>Turn your ideas into images</p>

        <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>
            <img src={assets.genedFive} alt="" className='w-80 xl:w-96 rounded-lg'/>
            <div>
                <h2 className='text-3xl font-medium mb-4 max-w-lg'>Introducing the Ai Powered Text to Image Generator</h2>
                <p className='text-gray-800 mb-4'>Transform your words into stunning visuals in seconds with Texmage - your smart AI companion for image creation. Whether you're designing for social media, creating content, or just experimenting with ideas, our generator turns simple text prompts into high-quality images instantly. No design skills? No problem. Just type, click, and create.</p>
                <p className='text-gray-800'>Powered by advanced machine learning models, Texmage understands context, style, and creativity. From dreamy landscapes to abstract art, you have the freedom to explore endless visual possibilities - all from a single line of text. It's fast, intuitive, and completely free to try.</p>
            </div>
        </div>
    </motion.div>
  )
}

export default Description