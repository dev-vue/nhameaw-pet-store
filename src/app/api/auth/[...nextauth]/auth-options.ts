import { NextAuthOptions } from "next-auth";
import LineProvider, { LineProfile } from "next-auth/providers/line";

// Configure NextAuth options
export const authOptions: NextAuthOptions = {
  providers: [
    LineProvider({
      clientId: String(process.env.LINE_CLIENT_ID),
      clientSecret: String(process.env.LINE_CLIENT_SECRET),
      profile(profile: LineProfile) {
        return {
          id: profile.userId,
          name: profile.displayName,
          email: null, // LINE ไม่ส่ง email ถ้าไม่ได้ขอ permission
          image: profile.pictureUrl || null,
        };
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('jwt', token, user)
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
      }
      console.log('session', session)
      console.log('token', token)
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
};
