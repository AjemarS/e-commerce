import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

export default async function Home() {
  const session = await auth();
  return (
    <div className="container flex justify-center items-center h-screen">
      {session ? <SignOut /> : <SignIn />}
    </div>
  );
}
