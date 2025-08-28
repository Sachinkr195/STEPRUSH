'use client';
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id)

  useEffect(() => {
  const fetchProduct = async () => {
    const res = await fetch(`/api/shop/product/${id}`);
    const data = await res.json();
    if (res.ok) {
      setProduct(data);
      if (data.variants?.length > 0) {
        setSelectedVariant(data.variants[0]);
        setImg(data.variants[0].img);
      }
    }
  };

  fetchProduct();
}, [params.id]);

// Fetch Recommended after product is loaded
useEffect(() => {
  const fetchRecommended = async () => {
    if (!product?.category) return; // wait until product is loaded

    const res = await fetch(`/api/trending/${product.category}`);
    const shoes = await res.json();   // ✅ await here
    if (res.ok) {
      setRecommended(shoes);
    }
  };

  fetchRecommended();
}, [product]); // run when product changes


  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">Product not found.</p>;

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.variants?.[0]?.img}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-400 mb-2">{product.brand}</p>
          <p className="text-green-400 text-2xl font-semibold mb-4">₹{product.price}</p>
          <p className="mb-6">{product.description}</p>

          <button className="bg-blue-600 px-6 py-3 rounded mr-4">
            Add to Cart
          </button>
          <button className="bg-green-600 px-6 py-3 rounded">
            Buy Now
          </button>
        </div>

        
      </div>
    </div>
  );
}
