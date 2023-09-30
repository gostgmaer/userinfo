"use client"
import Personal from "@/components/Pages/private/Profile";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Profile = () => {
  // @ts-ignore
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);
  return (
    <Personal/>
  );
};

export default Profile;
