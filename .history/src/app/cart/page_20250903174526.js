'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CartPage = () => {
  const [orders, setOrders] = useState([]); // store all orders
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

        // ✅ Assume data is an array of orders
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data.orders) {
          setOrders(data.orders);
        } else {
          setOrders([data]); // fallback if single order object
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        orders.map((order, orderIndex) => (
          <div
            key={order._id || orderIndex}
            className="mb-8 p-4 rounded-xl border border-gray-700 bg-[#1a1a1a]"
          >
            {/* Address */}
            {order.address && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-1">Shipping Address</h2>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state} -{' '}
                  {order.address.postalCode}
                </p>
              </div>
            )}

            {/* Items */}
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={item.shoeId || idx}
                  className="flex flex-col md:flex-row justify-between items-center gap-6 bg-[#222] p-4 rounded-lg"
                >
                  {/* Shoe Image */}
                  <img
                    src={item.img || '/placeholder.png'}
                    alt={item.shoename || 'Shoe'}
                    className="w-28 h-28 object-contain rounded-lg border border-gray-600"
                  />

                  {/* Info */}
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-semibold">
                      {item.shoename || 'Unnamed Shoe'}
                    </h3>
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
                    <span
                      className={`text-sm ${
                        order.paymentStatus === 'Pending'
                          ? 'text-yellow-400'
                          : 'text-green-400'
                      }`}
                    >
                      {order.paymentStatus === 'Pending'
                        ? 'Pending Payment'
                        : 'Delivery In Progress'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="mt-4 text-right">
              <p className="text-lg font-semibold">
                Order Total: ₹{getTotal(order.items)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
