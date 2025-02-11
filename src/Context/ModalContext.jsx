import React, { createContext, useState } from 'react'

export const modalContext = createContext()

export default function ModalContext({ children }) {

    const [editingNote, setEditingNote] = useState(null)
    const [showModal, setShowModal] = useState(false)


    return (
        <modalContext.Provider value={{ editingNote, setEditingNote, showModal, setShowModal }}>
            {children}
        </modalContext.Provider>
    )
}
