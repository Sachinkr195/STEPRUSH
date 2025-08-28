'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

const CheckoutPage = () => {
  const params = useSearchParams();

  const name = params.get('name');
  const price = parseInt(params.get('price') || '0');
  const quantity = parseInt(params.get('quantity') || '1');
  const size = params.get('size');
  const color = params.get('color');
  const total = price * quantity;
  const image = params.get('img');

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    pincode: '',
    state: '',
  });

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (Object.values(address).some((field) => field.trim() === '')) {
      alert('Please fill in all address fields');
      return;
    }

    const options = {
      key: 'rzp_test_YourKeyHere', // Replace with your Razorpay Test Key
      amount: total * 100,
      currency: 'INR',
      name: 'StepRush Shoes',
      description: name || 'Shoe Order',
      image: '/logo.png',
      handler: function (response) {
        alert('✅ Payment Successful! Payment ID: ' + response.razorpay_payment_id);
        window.location.href = '/thankyou';
      },
      prefill: {
        name: address.fullName,
        contact: address.phone,
        email: 'user@example.com',
      },
      notes: {
        product: name,
        quantity,
        size,
        color,
        ...address,
      },
      theme: {
        color: '#ef4444',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="px-6  text-white bg-black min-h-screen">
      <Navbar className="mb-9"/>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Product Summary */}
      <div className="mb-8 bg-[#121212] p-4 rounded-xl space-y-1">
        <p><strong>Product:</strong> {name}</p>
        <p><strong>Color:</strong> {color}</p>
        <p><strong>Size:</strong> {size}</p>
        <p><strong>Quantity:</strong> {quantity}</p>
        <p className="text-red-500 font-semibold mt-2 text-lg">
          <strong>Total:</strong> ₹{total}
        </p>
      </div>

      {/* Address Form */}
      <div className="bg-[#121212] p-4 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-lg mt-4"
        >
          
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
