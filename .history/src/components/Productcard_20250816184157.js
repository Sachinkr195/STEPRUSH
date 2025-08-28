'use client';
import Image from 'next/image';

const ProductCard = ({ shoe }) => {
  return (
    <div className="bg-[#0e0e0ed7] p-5 rounded-xl shadow hover:shadow-xl transition max-w-[300px] w-full">
      <Image
        src={shoe.variants[0].img}
        alt={shoe.name}
        width={300}
        height={300}
        className="w-[300px] h-[300px] object-cover rounded mb-4"
      />
      <h3 className="text-xl font-semibold mb-1">{shoe.name}</h3>
      <p className="text-gray-400 capitalize">{shoe.brand}</p>
      <p className="text-red-500 mt-2 font-bold">₹{shoe.price}</p>
    </div>
  );
};

export default ProductCard;
