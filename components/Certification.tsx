"use client";

import React from "react";
import { certification } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Certifications = () => {
  const mappedCertifications = certification.map(cert => ({
   
    title: cert.title ,
    name: cert.authoruty,
    img: cert.img,
    link: cert.link
    
  }));

  return (
    <section id="certifications" className="py-16"> 
    <h1 className="heading mb-8"> 
      My
      <span className="text-purple"> Certifications</span>
    </h1>

    <div className="flex flex-col items-center">
      <div className="h-[60vh] md:h-[35rem] w-full overflow-hidden"> 
        <InfiniteMovingCards
          items={mappedCertifications}
          direction="right"
          speed="slow"
          className="px-2 md:px-4"
        />
      </div>
    </div>
  </section>
  );
};

export default Certifications;