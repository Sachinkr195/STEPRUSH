import mongoose from "mongoose"

const Userschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // hashed
  profileImg: String, // optional, default avatar
  address: [
    {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    }
  ],
  role: { type: String, default: "user" }, // could be "user", "admin"
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.User || mongoose.model("User", Userschema)

