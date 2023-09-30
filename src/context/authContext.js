"use client";
import { post } from "@/utils/http";
import { parseCookies, setCookie } from "nookies";
import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(undefined);
  const [authenticated, setAuthenticated] = useState(undefined);

  const handleLoginAuth = async (body) => {
    try {
      const res = await post("/signin", body);
      setCookie(null, "accessToken", res.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: "/", // The cookie is accessible from the entire site
      });
      setUser(res);
      return res;
    } catch (error) {}
  };

  const Logout = (params) => {
    setAuthenticated(undefined);
    function deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    deleteCookie("accessToken");
    setUser(undefined);
  };
  React.useEffect(() => {
    const { accessToken } = parseCookies();
    console.log(accessToken);
    if (accessToken) {
      setAuthenticated(accessToken);
    } else {
      setAuthenticated(undefined);
    }
  }, [authenticated]);

  return (
    <AuthContext.Provider
      value={{ user, handleLoginAuth, authenticated, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
