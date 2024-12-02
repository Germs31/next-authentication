"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from "next/navigation"

const RegisterForm = () => {

  const router = useRouter()

  const [ email, setEmail ] = useState<string>("")
  const [ fullName, setFullName ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const [ error, setError ] = useState<string>("")

  const handleSubmit = async (event: any) => {
    event.preventDefault() 
    if(!fullName || !email || !password) return setError("All fields are required")
        
        // Registers user but will need to check if user exist
        try {
            const registerUser = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({fullName, email, password})
            })

            registerUser.ok ? router.push("/") : console.log("user registration failed")
        } catch (error) {
            console.log("error during registration", error)
        }
  }

  return (
    <div className='grid place-items-center h-screen'>
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className='text-xl font-bold my-4'>Register</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={(e) =>setFullName(e.target.value)} type="text" placeholder="full name"/>
                <input onChange={(e) =>setEmail(e.target.value)} type="text" placeholder="email"/>
                <input onChange={(e) =>setPassword(e.target.value)} type="password" placeholder="password"/>
                <button className='bg-green-600 text-white font-bold cursor px-6 py-2'>Login</button>
                {
                    error && (
                        <div className="text-sm text-white w-fit bg-red-500 py-1 px-3 rounded-md mt-2">
                            error msg
                        </div>
                    )
                }

                <Link className="text-sm mt-3 text-right" href={"/"}>
                    have an account? <span className="underline">Login</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm