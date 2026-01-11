import NextAuth from "next-auth";
import { Theme } from ".";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      theme?: Theme;
    };
  }

  interface User {
    id: string;
    theme?: Theme;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    image?: string;
    theme?: Theme;
  }
}
