"use client";
import React from "react";
import Button from "./Button";

function HeroSubtitle() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h2 className=" text-5xl font-medium text-white max-md:max-w-full max-md:text-4xl">
        Your Personal AI-Powered Mock Interview
      </h2>
      <p className="text-2xl text-fuchsia-500 uppercase max-md:max-w-full">
        RESUME BASED MOCK INTERVIEW TAKER APPLICATION
      </p>
      <p className="text-sm leading-5 text-white ">
        <Button label="GET STARTED" />
      </p>
    </div>
  );
}

export default HeroSubtitle;
