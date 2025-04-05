"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    img?: string;
    link?: string;
    authority?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
      setStart(true);
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "120s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "150s"); // Slower speed
      }
    }
  };

  return (<div
    ref={containerRef}
    className={cn(
      "scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
      className
    )}
  >
    <ul
      ref={scrollerRef}
      className={cn(
        "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap", // Reduced gap
        start && "animate-scroll",
        pauseOnHover && "hover:[animation-play-state:paused]"
      )}
    >
      {items.map((item, idx) => (
       <li
       key={idx}
       className="w-[300px] md:w-[400px] min-w-[300px] max-w-[400px] h-[200px] flex-shrink-0 relative rounded-xl border border-slate-800 p-4"
       style={{
         background: "rgb(4,7,29)",
         backgroundImage: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
       }}
     >
       <a
         href={item.link}
         target="_blank"
         rel="noopener noreferrer"
         className="flex items-start h-full gap-4" // Increased gap
       >
         {/* Larger Image Container */}
         <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32"> 
           <img
             src={item.img}
             alt={item.name}
             className="w-full h-full object-contain rounded-lg bg-white p-1.5"
           />
         </div>
     
         {/* Text Container */}
         <div className="flex flex-col flex-1 min-w-0">
           <h3 className="text-lg md:text-xl font-bold text-white mb-2 truncate"> 
             {item.title}
           </h3>
           <p className="text-base text-gray-300 mb-2 truncate"> 
             {item.authority}
           </p>
           <div className="mt-auto">
             <span className="text-purple-400 text-sm hover:underline">
               Verify Certification →
             </span>
           </div>
         </div>
       </a>
     </li>
      ))}
    </ul>
  </div>
);
};