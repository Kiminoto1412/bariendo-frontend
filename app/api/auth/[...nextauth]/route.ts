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
        // deviceId: { type: "text" },
      },

      // after click submit button that will do this async function
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        console.log("email", email);
        console.log("password", password);

        const res = await axios.post("/authentication/login", {
          email,
          password,
        });
        // console.log(1111);
        console.log("res back", res);
        const data = res.data.payload;

        // let user = data;

        if (res.status == 401) {
          console.log("\n\n\nres.statusText", res.statusText, "\n\n\n");
          throw new Error(res.statusText);
        }

        // console.log("user", user);
        // const user = await res.json();
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
      // console.log(1111);
      console.log("\n\n\nuser in jwt", user, "\n\n\n");
      console.log("\n\n\ntoken in jwt", token, "\n\n\n");

      if (user) {
        console.log(2222, "user");
        // const refreshToken = user.refreshToken;
        return {
          ...token,
          ...user,
          // expRefreshToken: decodedRefreshToken.exp,
        };
      }
      if (trigger === "update") {
        console.log(3333, "update");
        console.log("update", {
          ...token,
          ...session,
        });
        return {
          ...token,
          ...session,
        };
      }
      // console.log(" { ...token, ...user }", { ...token, ...user });

      // console.log(4444, "else");
      // console.log("token", token);
      return token;

      // if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      // return await refreshToken(token);
    },

    // every time when this session will be get by useSession or get server session func
    // session callback will recieve data from token of jwt callback
    async session({ token, session }) {
      console.log("token in session", token);
      console.log("first session in session", session);

      console.log(4444);
      session = { ...session, ...token };
      // session.payload = {
      //   // user: token.payload.data,
      //   // signinDate: token.payload.signinDate,
      //   // expiresDate: token.payload.expiresDate,
      //   roles: token.payload.roles,
      //   // roleId: token.payload.roleId,
      //   // menus: token.payload.menus,
      // };
      // session.backendTokens = {
      //   accessToken: token.token,
      //   refreshToken: token.refreshToken,
      //   expiresIn: token.exp,
      // };
      console.log("\n\n session", session, "\n\n");
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
