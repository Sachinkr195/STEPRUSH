import React from 'react';
import { FaSearch, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

const Navbar1 = ({profile}) => {
  console.log(profile)
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="text-3xl font-bold text-white tracking-wide">
        Step<span className="text-red-500">Rush</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search sneakers..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#1a1a1a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center gap-6 text-2xl">
        
        <FaShoppingCart className="hover:text-red-500 cursor-pointer" />
        <Link href= {profile? '/profile':'/User/Login'} >
                {profile ?(
          <div className="flex items-center gap-2">
            <img
              src={profile.profileImg}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-red-500"
            />
          </div>
        ) : (
          <FaUserCircle className="hover:text-red-500 cursor-pointer" />
        )}
        </Link>

        
      </div>
    </nav>
  );
};

export default Navbar1;
