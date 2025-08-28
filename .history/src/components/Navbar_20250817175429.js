"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, User } from "lucide-react"; // Added User icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [islogin,setIslogin] = useState(false)
  
  useEffect(()=>{
    const token = localStorage.get('token');
    if(token){
      setIslogin(true);
    }
  })

  return (
    <nav className="bg-transparent text-white px-6 py-4 flex items-center justify-between rounded-2xl sticky">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-wider flex items-center gap-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1161/1161388.png"
          alt="logo"
          width="36"
          className="rounded-full"
        />
        StepRush
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest border-[1px] border-gray-400 py-3 px-3 rounded-2xl">
        <li className="hover:scale-110 hover:border-red-500 transition">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:scale-110 hover:border-red-500 transition">
          <Link href="/Seller/register">Become seller</Link>
        </li>
        <li className="hover:scale-110 hover:border-red-500 transition">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-4">
  <Link href="/cart" aria-label="Cart">
    <ShoppingCart className="w-6 h-6 hover:text-red-500 transition" />
  </Link>

  {
    islogin:(
       <div>

        
       </div>
    )


  }
  <Link
    href="/User/Login"
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg font-semibold text-sm transition"
  > 
    Login
  </Link>
  <button
    className="md:hidden"
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Toggle menu"
  >
    <Menu className="w-6 h-6 hover:text-red-500 transition" />
  </button>
</div>


      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden z-50">
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link href="/Seller" onClick={() => setIsOpen(false)}>Become Seller</Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
