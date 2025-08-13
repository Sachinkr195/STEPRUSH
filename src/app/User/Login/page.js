"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginModal = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "login",
          ...form
        })
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Success:", data.message);
        localStorage.setItem("token", data.token);
        router.push("/shop");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Login failed. Please try again");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white rounded-lg w-full max-w-md p-6 text-black relative">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            name="email"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            name="password"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Login
          </button>
          <Link href = '/User/Register' className >
          <p>Click here to register</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
