import Features from "@/components/Pages/public/HomePage/Feature";
import HeroSection from "@/components/Pages/public/HomePage/Hero";
import Testimonials from "@/components/Pages/public/HomePage/Testimonials";



export default function Home() {

  return (
    <main className=" bg-black">
      <HeroSection />
      <Features />
      <Testimonials />
    </main>
  );
}
