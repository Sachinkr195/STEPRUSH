'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CartPage = () => {
  const [cartData, setCartData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/cart', {
          method: 'GET',
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        });

        if (!res.ok) {
          console.error('Failed to fetch cart');
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log('FULL API RESPONSE:', data);

        // 🔍 Detect correct shape
        let cart;
        if (Array.isArray(data)) {
          cart = data[0]; // If array, take first element
        } else if (data.cart) {
          cart = data.cart; // If wrapped in { cart: { ... } }
        } else {
          cart = data; // Otherwise assume object
        }

        setCartData(cart);
        setCartItems(cart?.items || []);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-8 border-b pb-2">
        Your Cart
      </h1>

      {/* Address */}
      {cartData?.address && (
        <div className="mb-6 bg-[#1a1a1a] p-4 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          <p>{cartData.address.street}</p>
          <p>
            {cartData.address.city}, {cartData.address.state} -{' '}
            {cartData.address.postalCode}
          </p>
        </div>
      )}

      {cartItems.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, idx) => (
            <div
              key={item.shoeId || idx}
              className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[#1a1a1a] p-4 rounded-xl shadow border border-gray-700"
            >
              {/* Shoe Image */}
              <img
                src={item.img || '/placeholder.png'}
                alt={item.name || 'Shoe'}
                className="w-32 h-32 object-contain rounded-lg border border-gray-600"
              />

              {/* Info */}
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-semibold">
                  {item.name || 'Unnamed Shoe'}
                </h2>
                <p className="text-sm text-gray-400">Size: {item.size}</p>
                <p className="text-sm text-gray-400">
                  Color: {item.variantColor}
                </p>
                <p className="text-sm text-gray-400">
                  Quantity: {item.quantity}
                </p>
              </div>

              {/* Price & Status */}
              <div className="text-right">
                <p className="text-lg font-bold text-green-400">
                  ₹{item.price * item.quantity}
                </p>
                {cartData?.paymentStatus === 'Pending' ? (
                  <span className="text-sm text-yellow-400">Pending Payment</span>
                ) : (
                  <span className="text-sm text-green-400">
                    Delivery In Progress
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Checkout Section */}
          {cartData?.paymentStatus === 'Pending' && (
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
