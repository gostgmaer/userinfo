"use client";
import { useAuthContext } from "@/context/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function HeroSection() {
  const { authenticated,user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/profile");
  }, [user]);

  return (
    <section className="bg-white text-gray-900 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-semibold mb-4">
          Create Your Perfect Resume
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Build a professional resume in minutes with our easy-to-use builder.
        </p>
        <Link
          href={"/profile"}
          className="mt-6 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg font-semibold transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
