import axios from "@/lib/axios";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email.",
        },
        password: { label: "Password", type: "password" },
      },

      // after click submit button that will do this async function
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const res = await axios.post("/authentication/login", {
          email,
          password,
        });
        const data = res.data.payload;

        if (res.status == 401) {
          console.log("\n\n\nres.statusText", res.statusText, "\n\n\n");
          throw new Error(res.statusText);
        }

        return data;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },

  // performed when user sign in and then callback will do
  callbacks: {
    // jwt callback will be called and it recieve token and user,the last will return token
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      if (trigger === "update") {
        return {
          ...token,
          ...session,
        };
      }
      return token;
    },

    // every time when this session will be get by useSession or get server session func
    // session callback will recieve data from token of jwt callback
    async session({ token, session }) {
      session = { ...session, ...token };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
