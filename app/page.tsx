import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session , '<--asdfs')
  if (session) redirect("/dashboard")
  return (
    <main>
      <LoginForm/>
    </main>
  );
}
