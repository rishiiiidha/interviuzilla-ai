"use client";
import React from "react";
import Image from "next/image";
function HeroImage() {
  return (
    <div className="flex justify-center items-center px-16 mt-14 max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <Image
        width="300"
        height="300"
        src="/droplet-hero.png"
        alt="AI-powered mock interview illustration"
        className="max-w-full aspect-[1.12] w-[586px]"
      />
    </div>
  );
}

export default HeroImage;
