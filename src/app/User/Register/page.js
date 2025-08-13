"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";

const RegisterModal = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    image: "/profile.jpg"
  });

  const handleChange = async(e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "register",
          ...form
        })
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Success:", data.message);
        router.push("/User/Login");
      } else {
        console.error("Error:", data.error);
        alert(data.error);
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white rounded-lg w-full max-w-md p-6 text-black relative">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
