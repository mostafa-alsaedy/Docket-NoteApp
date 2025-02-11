import axios from 'axios'
import React, { createContext } from 'react'

export const noteContext = createContext()
export default function NoteContext({ children }) {

    const addNoteFn = async (values) => {
        try {
            const data = await axios.post("https://note-sigma-black.vercel.app/api/v1/notes", values, {
                headers: { token: "3b8ny__" + localStorage.getItem("userToken") }
            })
            console.log(data);
            return data
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    const getUserNotesFn = async () => {
        try {
            const data = await axios.get("https://note-sigma-black.vercel.app/api/v1/notes", {
                headers: { token: "3b8ny__" + localStorage.getItem("userToken") }
            })
            return data
        } catch (error) {
            throw error
        }
    }

    const updateNoteFn = async (id, values) => {
        try {
            const data = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, values, {
                headers: { token: "3b8ny__" + localStorage.getItem("userToken") }
            })
            return data
        } catch (error) {
            throw error
        }
    }

    const deleteNoteFn = async (id) => {
        try {
            const data = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`, {
                headers: { token: "3b8ny__" + localStorage.getItem("userToken") }
            })
            return data
        } catch (error) {
            throw error
        }
    }
    return (
        <>
            <noteContext.Provider value={{ addNoteFn, getUserNotesFn, updateNoteFn, deleteNoteFn }}>
                {children}
            </noteContext.Provider>
        </>
    )
}
