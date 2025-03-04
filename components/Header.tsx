import React from "react";
import Link from "next/link";
import SignIn from "./sign-in";
import { Input } from "./ui/input";
import ModeToggle from "./ModeToggle";
import { auth } from "@/auth";
import UserCenter from "./UserCenter";

export default async function Header() {
  const session = await auth();
  return (
    <header className="bg-white shadow dark:bg-black">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-xl font-bold">Logo</a>
          </Link>
        </div>
        <div className="flex-1 mx-4">
          <Input placeholder="Search it" />
        </div>
        <div className="flex items-center space-x-4">
          {session ? <UserCenter user={session.user} /> : <SignIn />}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
