import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
export const AppContext = createContext()

export const AppContextProvider = (props)=> {
    const [user, setUser] = useState(()=>{
        const storedUser = localStorage.getItem('user');
        if (!storedUser || storedUser === "undefined"){
            return null
        }
        try {
            return JSON.parse(storedUser);
        } catch {
            return null;
        }
    });
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const loadCreditsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/credits', {headers: {token}});
            if(data.success){
                setCredit(data.credits);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const generateImages = async (prompt) => {
        try {
            const {data} = await axios.post(backendUrl + '/image/generate-image', {prompt}, {headers: {token}});
            if(data.success){
                loadCreditsData();
                return data.resultImage;
            }else{
                console.log(data);
                toast.error(data.message);
                loadCreditsData();
                if(data.creditBalance === 0 || data.credits === 0){
                    setTimeout(() => navigate('/pricing'), 100);
                }
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(token){
            loadCreditsData();
        }
    },[token])
    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, generateImages
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
