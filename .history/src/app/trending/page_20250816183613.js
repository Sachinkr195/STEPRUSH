'use client'; // If you're using the app router

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'Casuals', img: '/category/casual.jpg'},
  { name: 'Sports', img: '/category/sports.jpg' },
  { name: 'Formals', img: '/category/formal.jpg'},
  { name: 'Sneakers', img: '/category/sneaker.jpg'},
];

const TrendingPage = () => {
  return (
    <div className="bg-black text-white min-h-screen px-6 py-10 space-y-16">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">CATEGORY</h1>

      {/* Top Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <Link href={`/trending/${categories.name}`} key={i}>
            <div className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg">
              <Image
                src={cat.img}
                alt={cat.name}
                width={400}
                height={300}
                className="w-full h-44 object-cover transform duration-300 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              <div className="" />
              <p className="absolute bottom-3 w-full text-center text-lg font-semibold text-white tracking-wide drop-shadow-lg z-10">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Flex Section - Image and Text */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-6 md:p-10 bg-[#111] rounded-2xl shadow-xl">
        {/* Left - Aesthetic Image */}
        <div className="md:w-1/2 w-full">
          <Image
            src="/category/model.jpg"
            alt="Aesthetic"
            width={400}
            height={300}
            className="rounded-xl shadow-2xl object-cover w-full h-[400px] md:h-[500px]"
          />
        </div>

        {/* Right - Text */}
        <div className="md:w-1/2 w-full text-center md:text-left space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-red-500 tracking-tight">
            Chase Trends. Not Rules.
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-lg mx-auto md:mx-0">
            Your shoes tell your story. Discover collections that speak confidence, style, and bold individuality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
