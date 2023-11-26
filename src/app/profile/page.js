"use client"
import Personal from "@/components/Pages/private/Profile";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Profile = () => {
  // @ts-ignore
  const { user,userId } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!userId) router.push("/auth/login");
  }, [userId?.user_id]);

  return (
    <Personal/>
  );
};

export default Profile;
