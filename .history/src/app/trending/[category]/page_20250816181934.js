'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/Productcard";

export default function TrendingCategory() {
  const { category } = useParams();
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/trending/${category}`);
        const data = await res.json();
        setShoes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center capitalize">
        Trending {category} Shoes
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : shoes.length === 0 ? (
        <p className="text-center text-gray-400">No trending shoes found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {shoes.map((shoe) => (
            <ProductCard key={shoe._id} shoe={shoe} />
          ))}
        </div>
      )}
    </div>
  );
}
