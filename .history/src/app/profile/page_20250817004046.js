'use client';
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const userId = "replace-with-loggedin-user-id"; // TODO: replace with auth
  const [user, setUser] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [previewImg, setPreviewImg] = useState("");

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/profile/${userId}`);
      const data = await res.json();
      setUser(data);

      if (data.profileImg) setPreviewImg(data.profileImg);
      if (data.address && data.address.length > 0) {
        setAddress(data.address[0]); // first address
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("address", JSON.stringify(address));
    if (profileImg) formData.append("profileImg", profileImg);

    const res = await fetch(`/api/profile/${userId}`, {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();
    setUser(data);
    alert("Profile updated successfully!");
  };

  async function uploadToCloudinary(file, index) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'steprush');
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if(!cloudName){
      alert("something missing")
    }

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-lg mx-auto bg-[#121212] p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={previewImg || "/placeholder.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-red-500"
          />
          <input
            type="file"
            className="mt-3"
            onChange={(e) => {
              setProfileImg(e.target.files[0]);
              setPreviewImg(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>

        {/* Address */}
        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
          {["street", "city", "state", "postalCode", "country"].map((field) => (
            <div key={field}>
              <label className="block text-gray-400 mb-1 capitalize">{field}</label>
              <input
                type="text"
                value={address[field]}
                onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                className="w-full p-3 bg-gray-800 rounded text-white"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-semibold"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
