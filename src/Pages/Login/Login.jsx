import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authenticationContext } from '../../Context/AuthenticationContext'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import Swal from 'sweetalert2'
import { MdLockPerson } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { GiNotebook } from "react-icons/gi";






export default function Login() {

    const [isLoading, setIsLoading] = useState(false)
    const { loginUserFn } = useContext(authenticationContext)
    const navigate = useNavigate()


    const schema = z.object({
        email: z.string().email("Enter a valid email"),
        password: z.string().regex(/^[A-Za-z0-9]{6,}$/, "Password must be at least 6 characters long and contain at least 1 number")
    })

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all", resolver: zodResolver(schema) })



    const loginUser = async (values) => {
        setIsLoading(true)
        try {
            let { data } = await loginUserFn(values)
            console.log(data);
            setIsLoading(false)
            Swal.fire({
                customClass: {
                    popup: "left-[40px] w-[250px] sm:w-[500px]"
                },
                position: "center",
                icon: "success",
                title: "Account Logged In Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                navigate("/")
            }, 1500)
        } catch (error) {
            console.log(error);
            setIsLoading(false)
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
                    <h2 className="text-2xl font-semibold text-center dark:text-white">Welcome back</h2>
                    <p className="text-gray-500 text-center text-sm mt-1 mb-6 dark:text-gray-400">
                        Sign in to access your notes.
                    </p>
                    <form onSubmit={handleSubmit(loginUser)} action="">
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
                        <button type='submit' disabled={!isValid} className="w-full disabled:cursor-not-allowed disabled:bg-gray-400 dark:disabled:bg-gray-500 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 
                dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors">
                            {isLoading ? <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto'></div> : "Sign in →"}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-500 mt-4 dark:text-gray-400">
                        Don’t have an account yet? <Link to={"/register"} className="text-gray-800 font-semibold cursor-pointer dark:text-gray-200 hover:underline">Sign Up</Link>
                    </p>
                </div>
            </section>
        </>
    )
}
