import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const authenticationContext = createContext()

export default function AuthenticationContext({ children }) {

    const [token, setToken] = useState("")

    const registerUserFn = async (values) => {
        try {
            let data = await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
            console.log(data);
            localStorage.setItem("userName", data.data.user.name)
            localStorage.setItem("userEmail", data.data.user.email)
            return data;
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const loginUserFn = async (values) => {
        try {
            let data = await axios.post("https://note-sigma-black.vercel.app/api/v1/users/signin", values)
            console.log(data);
            setToken(data.data.token)  
            localStorage.setItem("userToken", data.data.token)  
            return data;
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            setToken(localStorage.getItem("userToken"))
        }
    }, [])

    return (
        <>
            <authenticationContext.Provider value={{ registerUserFn, loginUserFn, setToken, token }}>
                {children}
            </authenticationContext.Provider>
        </>
    )
}
