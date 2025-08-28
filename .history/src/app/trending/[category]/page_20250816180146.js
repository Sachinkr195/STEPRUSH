'use client';
import ProductCard from "@/components/Productcard";
import React from "react";

const allShoes = [
  { id: 1, name: 'Nike Air Max', brand: 'Nike', category: 'casual', price: 1200, size: 8, image: '/category/casual.jpg' },
  { id: 2, name: 'Adidas Ultraboost', brand: 'Adidas', category: 'sports', price: 1500, size: 9, image: '/category/sports.jpg' },
  { id: 3, name: 'Puma Suede', brand: 'Puma', category: 'casual', price: 900, size: 7, image: '/category/casual.jpg' },
  { id: 4, name: 'Formal Leather Shoes', brand: 'Bata', category: 'casual', price: 2000, size: 8, image: '/category/formal.jpg' },
  { id: 5, name: 'SneakerX Limited', brand: 'SneakerX', category: 'casual', price: 1700, size: 9, image: '/category/sneaker.jpg' },
];

const Page = ({ params }) => {
  const { category } = React.use(params);

  const filteredShoes = allShoes.filter(
    (shoe) => shoe.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="bg-black text-white min-h-screen px-4 md:px-10 py-10">
      <h1 className="text-4xl font-bold mb-10 capitalize text-center">{category} Shoes</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
  {filteredShoes.length === 0 ? (
    <p className="text-gray-400 col-span-full text-center">
      No shoes found in this category.
    </p>
  ) : (
    filteredShoes.map((shoe) => <ProductCard key={shoe.id} shoe={shoe} />)
  )}
</div>

    </div>
  );
};

export default Page;
