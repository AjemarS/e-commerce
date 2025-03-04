import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

// Adding fields to the user object
declare module "next-auth" {
  interface Session {
    user: {
      role: "user" | "admin";
    } & DefaultSession["user"];
  }
  interface User {
    role: 'user' | 'admin';
  }
  interface JWT {
    id: string;
    role: "user" | "admin";
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      async profile(profile) {
        return {
          role: profile.role ??= "user",
          ...profile,
        };
      },
    }),
  ], //  By default, the `id` property does not exist on `token` or `session`. See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      return { ...session, user: { ...session.user, role: token.role } };
    },
  },
});
