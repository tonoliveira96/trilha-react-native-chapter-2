import React, { createContext, ReactNode, useContext, useState } from "react";

import * as AuthSession from "expo-auth-session";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>([] as User)

  async function signInWithGoogle() {
    try {
      const CLIENT_ID =
        "628375080858-0cg8kktbm9ntc7vi72pmaum40obvj9f2.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@tonoliveira96/gofinance";
      const RESPONSE_TYPE = "token";
      const SCOPE = "email%20profile";

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${SCOPE}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}`;

      const { type, params } = await AuthSession.startAsync({
        authUrl,
      }) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(`https://www.googleapis.com/oauth2/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json()
        console.log(userInfo)
        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        })
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
