"use client";
import { get, post } from "@/utils/http";
import { parseCookies, setCookie } from "nookies";
import React, { useState } from "react";
import { useGlobalAppContext } from "./context";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const { loader, loaderFalse, loaderTrue } = useGlobalAppContext();
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

  const Logout = async () => {
       function deleteCookie(name) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
    try {
      loaderTrue();
      const res = await post("/signout");

      if (res.message === "Success") {
        setAuthenticated(undefined);
        deleteCookie("accessToken");
        window.sessionStorage.clear();
        window.localStorage.clear();
        setUser(undefined);
      }

      loaderFalse();
    } catch (error) {
      loaderFalse();
    }
  };

  const unsubscribe = async () => {
    try {
      loaderTrue();
      const res = await get("/verify");
      if (res.token) {
        setCookie(null, "accessToken", res.token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/", // The cookie is accessible from the entire site
        });
        //  setUser(res);
        return res;
      } else {
        // setUser(null);
      }
      loaderFalse();
    } catch (error) {
      loaderFalse();
    }
  };
  React.useEffect(() => {
    unsubscribe();
  }, [user?.user?.user_id]);

  return (
    <AuthContext.Provider
      value={{ user, handleLoginAuth, authenticated, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
