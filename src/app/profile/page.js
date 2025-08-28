'use client';
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    img: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ fixed
        if (!token) return;

        const res = await fetch("/api/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // ✅ fixed
          },
        });

        const data = await res.json();
        if (res.ok) {
          setProfile({
            img: data.profileImg || "",
            street: data.address?.[0]?.street || "",
            city: data.address?.[0]?.city || "",
            state: data.address?.[0]?.state || "",
            postalCode: data.address?.[0]?.postalCode || "",
            country: data.address?.[0]?.country || "",
          });
        } else {
          alert(data.error || "Failed to fetch profile");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  // Upload image to Cloudinary
  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "steprush");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      alert("Cloudinary cloud name missing!");
      return;
    }

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
      setProfile((prev) => ({ ...prev, img: data.secure_url }));
    }
  }

  // Update profile
  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileImg: profile.img,
          address: [
            {
              street: profile.street,
              city: profile.city,
              state: profile.state,
              postalCode: profile.postalCode,
              country: profile.country,
            },
          ],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
      } else {
        alert(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-lg mx-auto bg-[#121212] p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={profile.img || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-red-500"
          />
          <input
            type="file"
            className="mt-3"
            onChange={(e) => uploadToCloudinary(e.target.files[0])}
          />
        </div>

        {/* Address Form */}
        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
          {["street", "city", "state", "postalCode", "country"].map((field) => (
            <div key={field}>
              <label className="block text-gray-400 mb-1 capitalize">{field}</label>
              <input
                type="text"
                value={profile[field]}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, [field]: e.target.value }))
                }
                className="w-full p-3 bg-gray-800 rounded text-white"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
