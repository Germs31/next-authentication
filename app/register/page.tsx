import React from 'react'
import RegisterForm from '@/components/RegisterForm/index'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


const Register = async () => {
  const session = await getServerSession(authOptions)
  console.log(session, '<----')

  if (session) redirect("/dashboard")

  return (
    <div>
        <RegisterForm/>
    </div>
  )
}

export default Register