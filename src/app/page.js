"use client";

import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero-section";


const images = [
  "/shoeshero/heroimage.png",
  "/shoeshero/heroimage1.jpg",
  "/shoeshero/heroimage2.jpg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div >
      <div className="min-h-screen bg-black text-white " style={{ backgroundImage: `url(${images[current]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
       <Navbar />
       <Hero/>
      </div>
    

     
      
    </div>
  );
}
