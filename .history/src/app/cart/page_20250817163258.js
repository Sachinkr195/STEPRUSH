'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Nike Air Max',
      image: '/shoe1.png',
      price: 4999,
      size: 9,
      quantity: 1,
      color: 'Black/Red',
      paid: false, // true if payment done
    },
    {
      id: 2,
      name: 'Adidas UltraBoost',
      image: '/shoe2.png',
      price: 5999,
      size: 10,
      quantity: 1,
      color: 'White/Gray',
      paid: true,
    },
  ]);

  useEffect(()=>{
    const fetchdata = async()=>{
      const res = await fetch('/api/order',{
        method: "GET",
        headers : {
          "authorization"
        }
      }

      )
    }
  })

  const getTotal = () => {
    return cartItems
      .filter(item => !item.paid)
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-8 border-b pb-2">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[#1a1a1a] p-4 rounded-xl shadow border border-gray-700"
            >
              {/* Shoe image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-contain rounded-lg border border-gray-600"
              />

              {/* Info */}
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-400">Size: {item.size}</p>
                <p className="text-sm text-gray-400">Color: {item.color}</p>
                <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
              </div>

              {/* Status & Price */}
              <div className="text-right">
                <p className="text-lg font-bold text-green-400">₹{item.price * item.quantity}</p>
                {item.paid ? (
                  <span className="text-sm text-green-400">Delivery In Progress</span>
                ) : (
                  <span className="text-sm text-yellow-400">Pending Payment</span>
                )}
              </div>
            </div>
          ))}

          {/* Checkout Section */}
          {cartItems.some(item => !item.paid) && (
            <div className="mt-6 text-right border-t pt-4">
              <p className="text-xl font-semibold mb-2">
                Total: ₹{getTotal()}
              </p>
              <Link
                href="/checkout"
                className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
