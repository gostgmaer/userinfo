"use client";
import Link from "next/link";
import React from "react";

import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import { useRouter } from "next/navigation";

function Header() {
  const { id } = useGlobalAppContext();
  // @ts-ignore
  const { user } = useAuthContext();
  const router = useRouter();

  const handleSignOut = async () => {};
  return (
    <header className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"} className="text-white text-2xl font-bold">
          Your Logo
        </Link>

        {/* Navigation */}
        <nav className="space-x-4">
          {/* My Profile Link */}
          {user && (
            <Link href="/profile" className="text-white hover:text-gray-200">
              My Profile
            </Link>
          )}
          {/* Sign In Button */}
          {!user && (
            <Link href={"/login"} className="text-white hover:text-gray-200">
              Sign In
            </Link>
          )}
          {/* Sign Up Button */}
          {!user && (
            <Link
              href={"/register"}
              className="bg-white text-blue-500 hover:bg-blue-400 hover:text-gray-800 rounded-full py-2 px-6 transition duration-300"
            >
              Sign Up
            </Link>
          )}
          {user && (
            <button className="bg-red-500 hover:bg-red-400 text-white hover:text-gray-800 rounded-full py-2 px-6 transition duration-300">
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
