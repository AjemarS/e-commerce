import { UserRound } from "lucide-react";
import { SignOut } from "./sign-out";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { User } from "next-auth";

export default function UserCenter({ user }: { user?: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          {user?.image ? (
            <AvatarImage src={user.image} />
          ) : (
            <div className="w-full flex items-center justify-center">
              <UserRound />
            </div>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          {user?.role === "admin" && (
            <DropdownMenuItem>
              <Link href={"/admin"}>Admin</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"https://github.com/AjemarS"} target="_blank">
            GitHub
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"mailto:sashabratashchuksasha@gmail.com"} target="_blank">
            Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="w-full flex justify-center py-1.5">
          <SignOut />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
