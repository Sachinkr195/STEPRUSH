'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/shop/product/${params.id}`);
      const data = await res.json();

      if (res.ok) {
        setProduct(data);
        if (data.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
          setImg(data.variants[0].img);
        }

        // fetch recommended only after product loads
        const recRes = await fetch(`/api/trending/${data.category}`);
        if (recRes.ok) {
          const shoes = await recRes.json();
          setRecommended(shoes);
        }
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleBuyNow = () => {
    const query = new URLSearchParams({
      id: product._id,
      name: product.name,
      price: product.price,
      img: selectedVariant?.img || '',   // ✅ Use selected variant image
      quantity,
      size: selectedSize || '',
      color: selectedVariant?.color || '',
    }).toString();

    router.push(`/checkout?${query}`);
  };

  if (!product) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-10 overflow-x-hidden">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Product Image + Color Options */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img
            src={img}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-xl object-cover w-full h-[400px] max-w-[500px] p-2"
          />

          {/* ✅ Color Options under image */}
          <div className="flex gap-3 mt-4 flex-wrap justify-center">
            {product.variants.map((variant, i) => (
              <img
                key={i}
                src={variant.img}
                alt={variant.color}
                width={50}
                height={50}
                className={`cursor-pointer rounded-md border-2 ${
                  selectedVariant?.color === variant.color
                    ? 'border-red-500 scale-110'
                    : 'border-gray-700'
                }`}
                onClick={() => {
                  setSelectedVariant(variant);
                  setImg(variant.img);
                  setSelectedSize(null);
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-6 bg-[#121212] p-4 rounded-2xl">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-300">{product.description}</p>
          <p className="text-red-500 text-xl font-bold">₹{product.price}</p>

          {selectedVariant && (
            <p className="text-green-400 font-medium">
              In Stock:{' '}
              {selectedVariant.sizeStock.reduce(
                (total, s) => total + s.stock,
                0
              )}
            </p>
          )}

          {/* Size Selection */}
          {selectedVariant && (
            <div>
              <p className="mb-2">Select Size:</p>
              <div className="flex gap-2 flex-wrap">
                {selectedVariant.sizeStock.map((sizeObj, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(sizeObj.size)}
                    disabled={sizeObj.stock === 0}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === sizeObj.size
                        ? 'bg-red-600 text-white'
                        : 'border-gray-500 text-gray-300'
                    } ${sizeObj.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {sizeObj.size}
                  </button>
                ))}
              </div>
            </div>
          )}

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

          {/* Buy Now */}
          <button
            onClick={handleBuyNow}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Recommended */}
      {recommended?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <Link></Link>{recommended.map((shoe) => (
              <div
                key={shoe._id}
                className="bg-[#121212] p-3 rounded-xl"
              >
                <img
                  src={shoe.variants?.[0]?.img || '/placeholder.png'}
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
      )}
    </div>
  );
}
