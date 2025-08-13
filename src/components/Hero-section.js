"use client"
import { useState, useEffect } from "react";
import Link from "next/link";


export default function Hero() {
 
  return (
    <div className="flex items-center justify-between px-12 py-10 h-[calc(100vh-64px)]">
        {/* Left - Text Content */}
        <div className="w-1/2 space-y-6">
          <h1 className="text-6xl font-bold leading-tight">
            STEP INTO <br /> SPEED
          </h1>
          <p className="text-lg text-gray-300 max-w-md">
            Shop high-performance sneakers built for the street & sport.
          </p>
          <div className="flex gap-4">
            <Link href={"/shop"}>
            <button className="bg-red-600 text-white px-6 py-3 font-semibold rounded-md hover:scale-105 hover:bg-red-500">
              SHOP NOW
            </button>
            </Link>

            <Link href={"/trending"}>
            <button className="border border-white px-6 py-3 rounded-md hover:border-gray-400 hover:text-gray-400">
              VIEW TRENDING
            </button>
            </Link>
          </div>
        </div>

        
      </div>
  );
}
