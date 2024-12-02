import { connectMongo } from "@/lib/database"
import User from "@/models/user"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = { 
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {label: "email", type: "text"},
        password: {label: "password", type: "password"}
      },
      async authorize(credentials) {
        const { email, password } = credentials

        try {
          await connectMongo();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn:"/"
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }