import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      // 这里一定不能取反，不然会导致资源被重定向到登录页面
      let isOnProtectedRoute = ["/main"].includes(
        nextUrl.pathname
      );

      if (isOnProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/main", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
