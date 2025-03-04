import "next-auth/jwt";
import "next-auth";

declare module "next-auth" {
  interface User {
    role: "user" | "admin" | "guest";
    username?: string;
  }

  interface Session {
    user: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    token: {
      id: string;
      role: "user" | "admin";
    };
  }
}
