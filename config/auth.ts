import { connectDB } from "@/lib/mongoose";
import { User } from "@/models/User";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith("/login");
      const isOnRegister = nextUrl.pathname.startsWith("/register");
      if (isLoggedIn) {
        if (isOnLogin || isOnRegister) {
          return Response.redirect(new URL("/", nextUrl));
        } else return true;
      } else if (isOnRegister) {
        return true;
      } else {
        false;
      }
    },

    async jwt({ token, user }) {
      await connectDB();
      if (user?.email) {
        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          dbUser = await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
          });
        }

        token.id = dbUser._id.toString();
        token.image = dbUser.image;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
