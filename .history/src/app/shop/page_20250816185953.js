"use client";
import React, { useState, useEffect } from 'react';
import Navbar1 from '@/components/Navbar1';
import Link from 'next/link';

const ShopPage = () => {
  const [profile, setProfile] = useState("");
  const [shoesList, setShoesList] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/shop', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        console.error("Error fetching profile");
        return;
      }

      const data = await res.json();
      setProfile(data.user);
      setShoesList(data.shoes);
      console.log("Profile fetched successfully:", data.user, data.shoes);

    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const getMostSelling = (shoes) => {
    return shoes
      .filter(shoe => shoe.sold !== undefined)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
  };

  const getTrending = (shoes) => {
    return shoes
      .filter(shoe => shoe.Likes !== undefined)
      .sort((a, b) => b.Likes - a.Likes)
      .slice(0, 5);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const sellingShoes = getMostSelling(shoesList);
  const trendingShoes = getTrending(shoesList);

  return (
    <div className="bg-black min-h-screen text-white px-2">
      <Navbar1 profile={profile} />

      {/* Trending */}
      <section className="px-8 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wide">Trending Now</h1>
          <p className="text-sm text-red-400 hover:underline cursor-pointer">View More</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trendingShoes.map((shoe) => (
            <Link key={shoe.id} href={`/product/${shoe.id}`}>
              <div className="bg-[#0d0d0d] p-4 rounded-xl flex flex-col cursor-pointer">
                <img
                  src={shoe.img}
                  alt={shoe.name}
                  className="rounded mb-3 w-full h-48 object-cover"
                />
                <p className="text-white font-medium">{shoe.name}</p>
                <p className="text-white text-sm opacity-90">₹{shoe.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Most Selling */}
      <section className="px-8 py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wide">Most Selling</h1>
          <p className="text-sm text-red-400 hover:underline cursor-pointer">View More</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {sellingShoes.map((shoe) => (
            <Link key={shoe.id} href={`/product/${shoe.id}`}>
              <div className="bg-[#0d0d0d] p-4 rounded-xl flex flex-col cursor-pointer">
                <img
                  src={shoe.img}
                  alt={shoe.name}
                  className="rounded mb-3 w-full h-48 object-cover"
                />
                <p className="text-white font-medium">{shoe.name}</p>
                <p className="text-white text-sm opacity-90">₹{shoe.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Shoes */}
      <section className="px-8 py-6">
        <div className="flex justify-center items-center mb-4">
          <span className="text-2xl font-bold uppercase tracking-wide">All Shoes</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {shoesList.map((shoe) => (
            <Link key={shoe.id} href={`//product/${shoe.id}`}>
              <div className="bg-[#0d0d0d] p-4 rounded-xl flex flex-col cursor-pointer">
                <img
                  src={shoe.img}
                  alt={shoe.name}
                  className="rounded mb-3 w-full h-48 object-cover"
                />
                <p className="text-white font-medium">{shoe.name}</p>
                <p className="text-white text-sm opacity-90">₹{shoe.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
