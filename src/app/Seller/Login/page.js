'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react"; 

export default function LoginPage() {
  const router = useRouter(); // ✅ Correct: inside the component

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type" : "application/json",
      },
      body: JSON.stringify({
      ...form,
      action: "login", 
    }),
    })

    const data = await res.json();
    if(res.ok){
      console.log("Success:", data.message)
      localStorage.setItem("token", data.token);
      router.push("/Seller/Dashboard");
    }else{
      console.error("Error:", data.error)
      alert(data.error);
    }
  };

  const handleGoogleLogin = async () => {
  try {
    await signIn("google", { callbackUrl: "/Seller/dashboard" }); // where to redirect after successful login
  } catch (error) {
    console.error("Google login failed:", error);
  }
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <form onSubmit={handleLogin}  className="bg-[#121212] p-8 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to StepRush</h2>

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
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/Seller/register" className="text-red-500 hover:underline">
            Register
          </Link>
        </p>
        <button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded font-semibold mt-2"
>
  Continue with Google
</button>

      </form>
    </div>
  );
}
