"use client";
import { post } from "@/utils/http";
import React from "react";

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const handleLoginAuth = async (body) => {
 
   try {
    const res = await post("/signin", body);
    setUser(res)
    return res
   } catch (error) {
   }
  };

  React.useEffect(() => {}, []);

  return (
    <AuthContext.Provider value={{ user,handleLoginAuth }}>{children}</AuthContext.Provider>
  );
};
