'use client';
import ProductCard from "@/components/Productcard";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const category = params.category; // ✅ get category
  conso

  const [shoes, setShoes] = useState([]); // ✅ start as an array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/trending/${category}`, {
          method: 'GET'
        });
        const data = await res.json();
        setShoes(data); // ✅ store as array
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category]); // ✅ run again if category changes

  const filteredShoes = shoes.filter(
    (shoe) => shoe.category?.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-10 py-10">
      <h1 className="text-4xl font-bold mb-10 capitalize text-center">
        {category} Shoes
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
        {filteredShoes.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center">
            No shoes found in this category.
          </p>
        ) : (
          filteredShoes.map((shoe) => (
            <ProductCard key={shoe._id} shoe={shoe} />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
