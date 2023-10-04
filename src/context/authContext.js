"use client";
import { get, post } from "@/utils/http";
import { parseCookies, setCookie } from "nookies";
import React, { useState } from "react";
import { useGlobalAppContext } from "./context";
import jwt_decode from "jwt-decode";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const { loader, loaderFalse, loaderTrue } = useGlobalAppContext();
  const [user, setUser] = React.useState(undefined);
  const [userId, setUserId] = useState(null);
  const [authenticated, setAuthenticated] = useState(undefined);

  const handleLoginAuth = async (body) => {
    try {
      const res = await post("/signin", body);
      setCookie(null, "accessToken", res.token, {
        maxAge: 24 * 60 * 60, // 30 days
        path: "/", // The cookie is accessible from the entire site
      });
      const userWithTime = { ...res, loginTime: Date.now() };
      sessionStorage.setItem("user", JSON.stringify(userWithTime));
      setUser(res);
      setUserId(res.user.user_id);
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
        sessionStorage.removeItem("user");
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

      const cookies = parseCookies();

      if (cookies.accessToken) {
        const decodedToken = jwt_decode(cookies.accessToken);
        setUserId(decodedToken);

        if (decodedToken.user_id) {
          const res = await get("/protected");
          console.log(res);
          setUser(res);
        }
      }
      loaderFalse();
    } catch (error) {
      setUser(undefined);
      loaderFalse();
    }
  };
  React.useEffect(() => {
    unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, handleLoginAuth, authenticated, Logout, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
