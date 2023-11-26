import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React from "react";


const PublicLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-gray-50 text-black">
    
      <div>{children}</div>
    
    </div>
  );
};

export default PublicLayout;
