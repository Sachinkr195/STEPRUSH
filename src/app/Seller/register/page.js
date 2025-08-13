// app/register/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // ✅ App Router
import { register } from 'next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup';


export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    image: "/profile.jpg"
  });
  
  const Router = useRouter();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/register",{
        method : "POST",
        headers: {
        "Content-Type" : "application/json"},
        body : JSON.stringify({
          action: "register",
          ...form
        })
      })
      const data = await res.json();
      if (res.ok) {
      console.log("Success:", data.message);
      // Redirect to login or seller dashboard
      Router.push("/Seller/Login")
    } else {
      console.error("Error:", data.error);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
    console.log('Register form submitted:', form);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <form onSubmit={handleRegister} className="bg-[#121212] p-8 rounded-xl w-full max-w-md space-y-4" action={register}>
        <h2 className="text-2xl font-bold mb-4 text-center">Create Seller Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold">
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link href="/Seller/Login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
