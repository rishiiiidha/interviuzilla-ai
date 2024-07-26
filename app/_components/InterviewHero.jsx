"use client";
import React from "react";
import HeroTitle from "./HeroTitle";
import HeroImage from "./HeroImage";
import HeroSubtitle from "./HeroSubtitle";
import Image from "next/image";

function InterviewHero() {
  return (
    <section className="flex overflow-hidden relative flex-col justify-center self-stretch min-h-[972px]">
      <Image
        width="300"
        height="300"
        src="/bg-image.png"
        alt=""
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative justify-center items-center px-8 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col justify-center w-full max-w-screen-xl max-md:max-w-full">
          <div className="flex flex-col justify-center py-20 max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="flex flex-col font-semibold text-center max-md:max-w-full">
                <HeroTitle />
                <HeroSubtitle />
              </div>
              <HeroImage />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InterviewHero;
