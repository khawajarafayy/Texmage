import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useState } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from "axios"
import { toast } from 'react-toastify';

const Login = () => {

  const [state, setState] = useState('Log In');
  const {setShowLogin, backendUrl, setToken, setUser} = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if(state === 'Log In'){
        const {data} = await axios.post(backendUrl + '/login', {email, password})
        if(data.success){
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setShowLogin(false);
          toast.success(data.message || "Login successful")
        }else{
          toast.error(data.message || "Login failed");
        }
      }else{
        const {data} = await axios.post(backendUrl + '/signup', {name,email,password});
        if(data.success){
          setToken(data.token);
          setUser(data.user);
          console.log(data.user);
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          setShowLogin(false);
          toast.success(data.message || "Signup successful")
        }else{
          toast.error(data.message || "Sign Up Failed");
        }
      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        toast.error(error.response.data.message);
      }else{
        toast.error(error.message);
      }
    }
  }

  useEffect(()=>{
    document.body.style.overflow = 'hidden';

    return()=>{
      document.body.style.overflow = 'unset';
    }
  },[])
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <motion.form
        onSubmit={onSubmitHandler}
        className='relative bg-white p-12 sm:p-16 rounded-xl text-slate-500 w-full max-w-md sm:max-w-lg'
        initial={{ opacity: 0.2, y: 100 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}>
            <h1 className='text-center text-3xl text-neutral-800 font-medium'>{state}</h1>
            <p className='text-md mt-2 mb-2 text-center'>Please {state} to continue</p>

            { state!=="Log In" && <div className='border px-6 py-3 flex items-center gap-2 rounded-full mt-5'>
                <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm flex-1' type="text" placeholder='Full Name' required />
                {/* <img className='h-4 ml-auto' src={assets.email_icon} alt="" /> */}
            </div>}

            <div className='border px-6 py-3 flex items-center gap-2 rounded-full mt-4'>
                <input value={email} onChange={e => setEmail(e.target.value)} className='outline-none text-sm flex-1' type="email" placeholder='Email Address' required />
                {/* <img className='h-4 ml-auto' src={assets.email_icon} alt="" /> */}
            </div>

            <div className='border px-6 py-3 flex items-center gap-2 rounded-full mt-4'>
                <input value={password} onChange={e => setPassword(e.target.value)} className='outline-none text-sm flex-1' type="password" placeholder='Password' required />
                {/* <img className='h-4 ml-auto' src={assets.lock_icon} alt="" /> */}
            </div>

            {state==='Log In' ? <p className='text-sm text-blue-600 my-4 cursor-pointer text-right'>Forgot Password?</p> : <p className='invisible'>Placeholder</p>}

            <button className='w-full bg-blue-400 rounded-full cursor-pointer mb-3 text-white p-1.5'>{state==='Log In' ? "Login" : "Create Account"}</button>

            { state === "Log In" ? <p className='text-center'>Don't have an account? <span className='text-blue-600  cursor-pointer' onClick={()=> setState("Sign Up")}>Sign Up</span></p>
            :
            <p className='text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=> setState('Log In')}>Log In</span></p>}

            <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
        </motion.form>
    </div>
  );
};

export default Login;