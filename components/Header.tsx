import React from "react";
import Link from "next/link";
import SignIn from "./sign-in";
import { Input } from "./ui/input";
import ModeToggle from "./ModeToggle";

export default function Header() {
  return (
    <header className="bg-white shadow dark:bg-slate-950">
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
          <SignIn />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
