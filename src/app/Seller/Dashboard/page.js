'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const [tokenPresent, setTokenPresent] = useState(false);
  const [name, setName] = useState('User')
  const [profileImg, setProfileImg] = useState('/profile.jpg')
  const [shoes, setShoes] = useState([])


  useEffect(() => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/Seller/Login");
      alert("Please Login to access the dashboard");
      return;
    }

    setTokenPresent(true);

    try {
      const res = await fetch('/api/seller/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      console.log(data);

      setName(data.seller.name);
      if(!data.seller.profileImg){
        setProfileImg("/profile.jpg")
      }else{
        setProfileImg(data.seller.profileImg);

      }
      setShoes(data.shoes);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}
  
, []);

  function calculateStock(shoe) {
  let stock = 0;
  for (let i = 0; i < shoe.variants.length; i++) {
    let sizeStockArray = shoe.variants[i].sizeStock;
    for (let j = 0; j < sizeStockArray.length; j++) {
      stock += sizeStockArray[j].stock; // add stock, not size
    }
  }
  return stock;
}

    
    

  if (!tokenPresent) return null; 

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
  
      <div className="flex flex-col items-center mb-10">
        <img
          src={profileImg} 
          alt="Seller"
          className="w-28 h-28 rounded-full border-4 border-red-600 object-cover shadow-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-red-600">Welcome, {name}</h1>
        <p className="text-gray-400 mt-1">Manage your products and track your sales</p>
      </div>

      {/* Upload Button */}
      <div className="flex justify-center mb-8">
        <Link href="/Seller/Dashboard/upload">
          <button className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-lg text-lg font-semibold shadow-lg">
            + Upload New Shoe
          </button>
        </Link>
      </div>

      {/* Sales & Product Container */}
      <div className="bg-red-950 rounded-xl p-6 shadow-md">
        <h2 className="text-2xl font-bold text-white mb-2">📦 Products & 📈 Sales</h2>
        <p className="text-sm text-gray-400 mb-4">Overview of your uploaded shoes and performance</p>

        {/* Sample Table (replace with real data later) */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-red-700 text-sm">
            <thead className="bg-red-800">
              <tr>
                <th className="text-left px-4 py-3 text-white">Image</th>
                <th className="text-left px-4 py-3 text-white">Name</th>
                <th className="text-left px-4 py-3 text-white">Price</th>
                <th className="text-left px-4 py-3 text-white">Stock</th>
                <th className="text-left px-4 py-3 text-white">Sold</th>
                <th className="text-left px-4 py-3 text-white">Revenue</th>

              </tr>
            </thead>
            <tbody>
               {shoes.Length ===0&& (
                <tr>
                  <td colSpan={5} className='text-center py-4 text-gray-400' >No shoes please upload shoe</td>
                </tr>
               )}
               {shoes.map((shoes) =>(
                  <tr key={shoes.id } className="hover:bg-red-800/40 transition">
                <td className="px-4 py-3">
                  <img src={shoes.variants[0].img} className="w-14 h-14 rounded object-cover" />
                </td>
                <td className="px-4 py-3">{shoes.name}</td>
                <td className="px-4 py-3">{shoes.price}</td>
                <td className="px-4 py-3">{calculateStock(shoes)}</td>
                <td className="px-4 py-3">{shoes.sold}</td>
                <td className="px-4 py-3">{shoes.price * shoes.sold}</td>

              </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
