'use client';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
  const params = useSearchParams();
  const router = useRouter()

  const name = params.get('name');
  const price = parseInt(params.get('price') || '0');
  const quantity = parseInt(params.get('quantity') || '1');
  const size = params.get('size');
  const color = params.get('color');
  const total = price * quantity;
  const Id = params.get('id');
  const img = params.get('img')

  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [item, setItem] = useState({
    shoeId: Id,
    variantColor: color,
    size: size,
    price: price,
    quantity: quantity,
    img: img
  });

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  });

  useEffect(() => {
    const fetchAddress = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`/api/profile`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (data && data.name) {
        setAddress(data.address[0] || {});
        setUsername(data.name);
        setUserid(data._id);
      }
    };
    fetchAddress();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    const orderData = { userid, username, item, address, total };

    const res = await fetch(`/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    

    const data = await res.json();
    if (res.ok) {
      alert("Order placed successfully!");
      navi
    } else {
      alert("Failed to place order: " + data.error);
    }
  };

  return (
    <div className="px-6 text-white bg-black min-h-screen">
      <Navbar className="mb-9" />
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="mb-8 bg-[#121212] p-4 rounded-xl space-y-1">
        <p><strong>Product:</strong> {name}</p>
        <p><strong>Color:</strong> {color}</p>
        <p><strong>Size:</strong> {size}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p className="text-red-500 font-semibold mt-2 text-lg">
          <strong>Total:</strong> ₹{total}
        </p>
      </div>

      <div className="bg-[#121212] p-4 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>

        <input type="text" name="street" placeholder="Street" value={address.street}
          onChange={handleInputChange} className="w-full p-2 rounded bg-gray-800 text-white" />

        <input type="text" name="city" placeholder="City" value={address.city}
          onChange={handleInputChange} className="w-full p-2 rounded bg-gray-800 text-white" />

        <input type="text" name="state" placeholder="State" value={address.state}
          onChange={handleInputChange} className="w-full p-2 rounded bg-gray-800 text-white" />

        <input type="text" name="postalCode" placeholder="Postal Code" value={address.postalCode}
          onChange={handleInputChange} className="w-full p-2 rounded bg-gray-800 text-white" />

        <input type="text" name="country" placeholder="Country" value={address.country}
          onChange={handleInputChange} className="w-full p-2 rounded bg-gray-800 text-white" />

        <button onClick={handlePlaceOrder}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg mt-4">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
