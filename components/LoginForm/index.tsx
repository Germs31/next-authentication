"use client"

import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginForm = () => {

  const router = useRouter()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
        const login = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if(login.error) return setError("Invalid Credentials")

        router.replace("dashboard")
    } catch (error) {
        console.log(error)
    }
    
  }

  return (
    <div className='grid place-items-center h-screen'>
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className='text-xl font-bold my-4'>Enter Credentials</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email"/>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
                <button className='bg-green-600 text-white font-bold cursor px-6 py-2'>Login</button>
                {
                    error && (
                        <div className="text-sm text-white w-fit bg-red-500 py-1 px-3 rounded-md mt-2">
                            error msg
                        </div>
                    )
                }

                <Link className="text-sm mt-3 text-right" href={"/register"}>
                    Don't have an account? <span className="underline">Register</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default LoginForm