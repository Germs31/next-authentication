import mongoose from "mongoose"

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "")
    console.log("Connected to DB ^__^")
  } catch (error) {
    console.log("ERROR, ERROR CONNECTING TO DB >.<", error)
  }
}