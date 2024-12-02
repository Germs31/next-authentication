import { NextResponse } from "next/server"
import User from "@/models/user"
import { connectMongo } from "@/lib/database"
import bcrypt from "bcryptjs"

export async function POST(req: any) {
  try {
    const { fullName, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    await connectMongo()

    await User.create({fullName, email, password: hashedPassword})

    return NextResponse.json({message: "User registered"}, { status: 201})
  } catch (error) {
    return NextResponse.json({message: "Error while registering user"}, { status: 500 })
  }
}