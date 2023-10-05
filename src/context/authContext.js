"use client";
import { get, post } from "@/utils/http";
import { parseCookies, setCookie } from "nookies";
import React, { useState } from "react";
import { useGlobalAppContext } from "./context";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const { loader, loaderFalse, loaderTrue } = useGlobalAppContext();
  const [user, setUser] = React.useState(undefined);
  const [userId, setUserId] = useState(null);
  const [authenticated, setAuthenticated] = useState(undefined);
  const router = useRouter();
  const handleLoginAuth = async (body) => {
    try {
      const res = await post("/signin", body);
      setCookie(null, "accessToken", res.token, {
        maxAge: 24 * 60 * 60, // 30 days
        path: "/", // The cookie is accessible from the entire site
      });
      setCookie(null, "session", res.session_id, {
        maxAge: 24 * 60 * 60, // 30 days
        path: "/", // The cookie is accessible from the entire site
      });
      setUser(res);
      setUserId({ ...res.user, user_id: res.user._id });
      router.push("/profile");
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
        setUserId(undefined);
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

        if (decodedToken["user_id"]) {
          const res = await post("/verify/session");
          setUser(res);
        }
      }
      loaderFalse();
    } catch (error) {
      setUser(undefined);
      setUserId(undefined);
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
