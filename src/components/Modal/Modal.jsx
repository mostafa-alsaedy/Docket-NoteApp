import React, { useContext, useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteContext } from '../../Context/NoteContext';
import Swal from 'sweetalert2';

export default function Modal({ setShowModal, updateNote, getUserNotes }) {
    const { addNoteFn, updateNoteFn } = useContext(noteContext);
    const [isLoading, setIsLoading] = useState(false);

    const schema = z.object({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Description is required"),
    });

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ mode: "all", resolver: zodResolver(schema) });

    const onSubmit = async (values) => {
        setIsLoading(true);
        try {
            if (updateNote) {
                await updateNoteFn(updateNote._id, values);
            } else {
                await addNoteFn(values);
            }
            setIsLoading(false);
            Swal.fire({
                customClass: {
                    popup: "left-[40px] w-[250px] sm:w-[500px]"
                },
                position: "center",
                icon: "success",
                title: `${updateNote ? "Note Updated Successfully" : "Note Added Successfully"}`,
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            setShowModal(false);
            getUserNotes();
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        if (updateNote) {
            setValue("title", updateNote.title);
            setValue("content", updateNote.content);
        }
    }, [updateNote]);

    return (
        <>
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="flex fixed z-50 bg-black/50 inset-0 items-center justify-center">
                <div className="p-4 w-full max-w-xl max-h-full">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-xl overflow-hidden">
                        <div className="flex justify-between items-center px-6 py-4">
                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                {updateNote ? "Edit Note" : "New Note"}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <IoIosClose className='w-6 h-6' />
                            </button>
                        </div>
                        <form className="bg-gray-50 dark:bg-gray-700 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                            <div className='border-y-2 dark:border-gray-600 p-4'>
                                <input type="title" {...register("title")} className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xl font-medium rounded-lg block outline-none w-full p-2.5 placeholder-gray-500 dark:placeholder-gray-400" required placeholder="Note Title" />
                                {errors.title && <p className='text-red-600 p-2.5'>{errors.title.message}</p>}
                                <textarea rows="2" {...register("content")} className="bg-gray-50 dark:bg-gray-700 outline-none resize-none block p-2.5 w-full text-base text-gray-900 dark:text-white rounded-lg placeholder-gray-500 dark:placeholder-gray-400" placeholder="Write your thoughts here..." />
                                {errors.content && <p className='text-red-600 p-2.5'>{errors.content.message}</p>}
                            </div>
                            <div className="px-6 py-3 flex justify-end gap-3">
                                <button className="px-4 py-2 text-black dark:text-white rounded-lg border dark:border-gray-600 text-sm font-sans hover:bg-gray-100 dark:hover:bg-gray-600">
                                    {isLoading ? <div className='animate-spin rounded-full h-5 w-5 border-b-2 dark:border-white border-gray-900 mx-auto'></div> : updateNote ? "Update Note" : "Add Note"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}