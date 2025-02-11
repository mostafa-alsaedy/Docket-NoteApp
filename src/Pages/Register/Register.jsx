import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { authenticationContext } from '../../Context/AuthenticationContext'
import Swal from 'sweetalert2'
import { GiNotebook } from 'react-icons/gi'
import { HiOutlineCalendar, HiOutlineMail, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi'
import { MdLockPerson } from 'react-icons/md'


export default function Register() {
    const { registerUserFn } = useContext(authenticationContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const schema = z.object({
        name: z.string().min(3, "Name must be at least 3 characters").max(12, "Name must be less than 12 characters"),
        email: z.string().email("Enter a valid email address"),
        password: z.string().regex(/^[a-zA-Z0-9]{6,}$/, "Password must be at least 6 characters long and contain at least one letter and one number"),
        age: z.coerce.number().min(18, "You must be at least 18 years old").max(100, "You must be less than 100 years old"),
        phone: z.string().regex(/^01[0125][0-9]{8}$/, "Phone number must egyptian number"),
    })

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all", resolver: zodResolver(schema) })

    const registerUser = async (values) => {
        setLoading(true)
        try {
            let { data } = await registerUserFn(values)
            console.log(data);
            setLoading(false)
            Swal.fire({
                customClass: {
                    popup: "left-[40px] w-[250px] sm:w-[500px]"
                },
                position: "center",
                icon: "success",
                title: "Account Registered Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                navigate("/login")
            }, 1500)
        } catch (error) {
            console.log(error);
            setLoading(false)
            Swal.fire({
                customClass: {
                    popup: "left-[40px] w-[250px] sm:w-[500px]"
                },
                position: "center",
                icon: "error",
                title: `${error.response.data.msg}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }



    return (
        <>
            <section className="flex items-center justify-center min-h-screen p-5 md:p-0">
                <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center dark:bg-gray-700">
                            <span className="text-white text-3xl font-bold dark:text-gray-200">
                                <GiNotebook />
                            </span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-center dark:text-white mb-5">Create an account</h2>
                    <form onSubmit={handleSubmit(registerUser)} action="">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Name</label>
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <span className="mr-2 text-gray-500 dark:text-gray-400">
                                    <HiOutlineUser />
                                </span>
                                <input type="text" {...register("name")}
                                    className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                                    placeholder="John Doe" />
                            </div>
                            {errors.name && <div className='text-red-500 text-sm m-2 dark:text-red-400'>{errors.name.message}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Email</label>
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <span className="mr-2 text-gray-500 dark:text-gray-400">
                                    <HiOutlineMail />
                                </span>
                                <input type="email" {...register("email")}
                                    className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                                    placeholder="info@pixsellz.io" />
                            </div>
                            {errors.email && <div className='text-red-500 text-sm m-2 dark:text-red-400'>{errors.email.message}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Password</label>
                            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                <span className="mr-2 text-gray-500 dark:text-gray-400">
                                    <MdLockPerson />
                                </span>
                                <input type="password" {...register("password")}
                                    className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                                    placeholder="Enter your password" />
                            </div>
                            {errors.password && <div className='text-red-500 text-sm m-2 dark:text-red-400'>{errors.password.message}</div>}
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Age</label>
                                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                    <span className="mr-2 text-gray-500 dark:text-gray-400">
                                        <HiOutlineCalendar />
                                    </span>
                                    <input type="number" {...register("age")}
                                        className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                                        placeholder="42" />
                                </div>
                                {errors.age && <div className='text-red-500 text-sm m-2 dark:text-red-400'>{errors.age.message}</div>}
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm mb-1 dark:text-gray-300">Phone Number</label>
                                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                    <span className="mr-2 text-gray-500 dark:text-gray-400">
                                        <HiOutlinePhone />
                                    </span>
                                    <input type="tel" {...register("phone")}
                                        className="w-full text-sm outline-none text-gray-700 dark:text-gray-200 bg-transparent"
                                        placeholder="01112222333" />
                                </div>
                                {errors.phone && <div className='text-red-500 text-sm m-2 dark:text-red-400'>{errors.phone.message}</div>}
                            </div>
                        </div>
                        <button type="submit" disabled={!isValid}
                            className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 
                            dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors disabled:cursor-not-allowed 
                            disabled:bg-gray-400 dark:disabled:bg-gray-500">
                            {loading ? <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto'></div> : "Create an account →"}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-4 dark:text-gray-400">
                        Already have an account? <Link to={"/login"} className="text-gray-800 font-semibold cursor-pointer dark:text-gray-200 hover:underline">Sign In</Link>
                    </p>
                </div>
            </section>
        </>
    )
}
