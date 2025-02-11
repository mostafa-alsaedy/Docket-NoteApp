import React, { useContext, useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal';
import { noteContext } from '../../Context/NoteContext';
import Note from '../../components/Note/Note';
import { modalContext } from '../../Context/ModalContext';
import { FaPenClip } from "react-icons/fa6";
import Swal from 'sweetalert2';


export default function Home() {
    const { getUserNotesFn, deleteNoteFn } = useContext(noteContext)
    const { showModal, setShowModal, editingNote, setEditingNote } = useContext(modalContext)
    const [notes, setNotes] = useState([])

    const handleEditNote = (note) => {
        setEditingNote(note)
        setShowModal(true)
    }

    const getUserNotes = async () => {
        try {
            const data = await getUserNotesFn()
            console.log(data);
            setNotes(data.data.notes)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUserNote = async (id) => {
        try {
            const data = await deleteNoteFn(id)
            console.log(data);
            if (notes.length > 1) {
                getUserNotes()
            } else {
                setNotes([])
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteNoteAlert = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                cancelButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
                confirmButton: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2",
                customClass: {
                    popup: "left-[40px] w-[250px] sm:w-[500px]"
                },
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUserNote(id)
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    icon: "error"
                });
            }
        });
    }



    useEffect(() => {
        getUserNotes()
    }, [])


    return (
        <>
            <section className='p-10'>
                <h1 className='text-3xl pt-2 font-bold mb-10 dark:text-gray-100'>Notes</h1>
                {notes.length == 0 ? <>
                    <div className='m-auto text-center mt-16 p-16 bg-opacity-45 w-full max-w-2xl bg-white rounded-2xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700'>
                        <FaPenClip className='mx-auto text-5xl text-stone-700 dark:text-gray-300' />
                        <span className='m-auto block mt-10 text-4xl font-serif text-gray-800 dark:text-gray-200'>
                            No notes have been created yet.
                        </span>
                    </div>
                </> :
                    <>
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {notes.map((note) => <Note
                                key={note._id}
                                noteId={note._id}
                                noteTitle={note.title}
                                noteContent={note.content}
                                deleteUserNote={deleteNoteAlert}
                                handleEditNote={() => handleEditNote(note)}
                            />)}
                        </div>
                    </>}

                {showModal && <Modal setShowModal={setShowModal} updateNote={editingNote} getUserNotes={getUserNotes} />}
            </section >
        </>
    )
}
