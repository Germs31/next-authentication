"use client"

import React from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const UserInfo = () => {
  const {data: session} = useSession()
  console.log(session)
  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 bg-zince-300/100 flex flex-col gap-2 my-6"> 
            <div>
                Email: <span className="font-bold">{session?.user?.email}</span>
            </div>
            <button onClick={() => signOut()} className="bg-red-500 text-white font-bold px-6 py-2 mt-3">
                Logout
            </button>
        </div>
    </div>
  )
}

export default UserInfo