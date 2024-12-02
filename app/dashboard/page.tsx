import React from 'react'
import UserInfo from '@/components/UserInfo.tsx'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'


const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  if(!session) redirect("/")
  return (
    <div>
        <UserInfo/>
    </div>
  )
}

export default Dashboard