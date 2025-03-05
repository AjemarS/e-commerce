import "next-auth";

declare module "next-auth" {
  interface User {
    role: "user" | "admin";
  }

  interface Session {
    user: { _id: string; role: "user" | "admin" } & DefaultSession["user"];
  }
}
