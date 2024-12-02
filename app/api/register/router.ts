import { NextResponse } from "next/server"

export async function POST(req: any) {
  try {
    const { fullName, email, password } = await req.json()

    return NextResponse.json({message: "User registered"}, { status: 201})
  } catch (error) {
    return NextResponse.json({message: "Error while registering user"}, { status: 500 })
  }
}