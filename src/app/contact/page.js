'use client';
import { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can replace this with actual backend call
    console.log('User complaint submitted:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#1a1a1a] p-8 rounded-xl shadow-lg border border-red-500">
        <h2 className="text-3xl font-bold mb-6 text-red-500 border-b pb-2">Contact Us / Complaint</h2>

        {submitted ? (
          <p className="text-green-400 text-lg font-medium">Your message has been submitted. Thank you!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-red-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm">Your Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-red-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block mb-1 text-sm">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-red-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-sm">Message / Complaint</label>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-red-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold"
            >
              Submit Complaint
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
