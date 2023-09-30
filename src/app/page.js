"use client";
import Features from "@/components/Pages/public/HomePage/Feature";
import HeroSection from "@/components/Pages/public/HomePage/Hero";
import Testimonials from "@/components/Pages/public/HomePage/Testimonials";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  // @ts-ignore
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/resume-list");
  }, [user]);
  return (
    <main className=" bg-black">
      <HeroSection />
      <Features />
      <Testimonials />
    </main>
  );
}
