'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const product = {
  id: 1,
  name: 'Nike Air Max',
  brand: 'Nike',
  description: 'Stylish and comfortable casual shoe perfect for daily wear.',
  price: 1200,
  category: 'casual',
  stock: 12,
  colors: [
    { color: 'Red', image: '/category/casual.jpg' },
    { color: 'Blue', image: '/category/sports.jpg' },
    { color: 'Black', image: '/category/formal.jpg' },
  ],
  sizes: [7, 8, 9, 10],
  recommended: [
    {
      id: 2,
      name: 'Puma Suede',
      price: 999,
      brand: 'Puma',
      image: '/category/casual.jpg',
    },
    {
      id: 3,
      name: 'Adidas Neo',
      price: 1100,
      brand: 'Adidas',
      image: '/category/sports.jpg',
    },
  ],
};

const ProductPage = () => {
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    const query= new URLSearchParams({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        size: selectedSize
    }).toString();
    router.push(`/checkout?${query}`);
  };

  

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-10 overflow-x-hidden">
        
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Product Image and Colors */}
        <div className="w-full md:w-1/2">
          <Image
            src={selectedColor.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-xl object-cover w-full h-[400px] max-w-[500px] p-2"
          />

          {/* Color Options */}
          <div className="flex gap-3 mt-4">
            {product.colors.map((color, i) => (
              <Image
                key={i}
                src={color.image}
                alt={color.color}
                width={40}
                height={40}
                className={`cursor-pointer rounded border-2 ${
                  selectedColor.color === color.color
                    ? 'border-red-500'
                    : 'border-gray-700'
                }`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-6 bg-[#121212] p-4 rounded-2xl">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-300">{product.description}</p>
          <p className="text-red-500 text-xl font-bold">₹{product.price}</p>
          <p className="text-green-400 font-medium">In Stock: {product.stock}</p>

          {/* Size Selection */}
          <div>
            <p className="mb-2">Select Size:</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? 'bg-red-600 text-white'
                      : 'border-gray-500 text-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <p className="mb-2">Quantity:</p>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 bg-gray-800 rounded text-lg"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 bg-gray-800 rounded text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.recommended.map((shoe) => (
            <div key={shoe.id} className="bg-[#121212] p-3 rounded-xl">
              <Image
                src={shoe.image}
                alt={shoe.name}
                width={250}
                height={160}
                className="rounded object-cover w-full h-[160px]"
              />
              <h3 className="text-lg font-bold mt-2">{shoe.name}</h3>
              <p className="text-gray-400">{shoe.brand}</p>
              <p className="text-red-500 font-semibold mt-1">₹{shoe.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
