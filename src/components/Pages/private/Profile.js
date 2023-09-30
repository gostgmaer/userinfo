"use client";
import Image from "next/image";
import React from "react";

const Personal = () => {
  return (
    <div className="container mx-auto py-8 text-black">
      <h1 className="text-3xl font-semibold mb-4">My Profile</h1>
      <Image
        width={100}
        height={100}
        src={"https://source.unsplash.com/random"}
        style={{ borderRadius: "50%", height: "100px" }}
        alt=""
      />
    </div>
  );
};

export default Personal;
