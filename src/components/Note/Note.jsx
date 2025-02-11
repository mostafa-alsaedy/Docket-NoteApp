import React from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { GrEdit } from 'react-icons/gr'

export default function Note({ noteId, noteTitle, noteContent, handleEditNote, deleteUserNote }) {
    return (
        <>
            <div className="w-full h-64 flex flex-col justify-between bg-gray-300 dark:bg-gray-700 dark:border-gray-700 rounded-lg border border-gray-300 mb-6 py-5 px-4">
                <div>
                    <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">{noteTitle}</h4>
                    <p className="text-gray-800 dark:text-gray-100 text-sm">{noteContent}</p>
                </div>
                <div>
                    <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
                        <button onClick={() => deleteUserNote(noteId)} className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300  focus:ring-black" aria-label="edit note" role="button">
                            <BsTrash3 className='' />
                        </button>
                        <button onClick={handleEditNote} className="w-8 h-8 rounded-full bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-gray-300  focus:ring-black" aria-label="edit note" role="button">
                            <GrEdit className='' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
