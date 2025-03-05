import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import client from "./mongodb";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      profile(profile) {
        // Get all the needed fields from profile
        return {
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
          emailVerified: profile.email_verified,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.role = user.role;
      return session;
    },
  },
});
