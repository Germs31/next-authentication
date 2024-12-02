import { NextApiRequest, NextApiResponse } from "next"
import { connectMongo } from "@/lib/database"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(req: any) {
  try {
    const { email } = await req.json()
    
    await connectMongo() 
    const existingUser = await User.findOne({email}).select("_id")
    return NextResponse.json({ user: existingUser })
  } catch (error) {
    return NextResponse.json({message: "error checking if user exist", error})
  }
}