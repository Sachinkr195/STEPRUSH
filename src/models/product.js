// src/models/product.js

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  Likes: { type: Number, default: 0},
  rating: { type: Number, default: 0},
  variants: [
    {
      color: { type: String, required: true },
      img: { type: String, required: true },
      sizeStock: [
        {
          size: { type: String, required: true },
          stock: { type: Number, required: true },
        },
      ],
    },
  ],
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "seller", required: true },
}, { timestamps: true });

// ✅ Prevent model overwrite error in Next.js
export default mongoose.models.shoe || mongoose.model("shoe", ProductSchema);
