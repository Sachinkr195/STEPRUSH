// src/app/api/auth/user/route.js
import shoes from "@/models/product";
import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import user from "@/models/user";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectdb();
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;
    const userData = await user.findById(userId).select("name profileImg email");
    console.log(userData);
    const shoesData = await shoes.find().sort({ createdAt: -1 });
    console.log(shoesData);

    return NextResponse.json({
      user: userData,
      shoes: shoesData.map(shoe => ({
        id: shoe._id,
        name: shoe.name,
        price: shoe.price,
        discount: shoe.discount,
        sold: shoe.sold,
        img: shoe.variants?.[0]?.img || null,
        category: shoe.category,
        description: shoe.description,
        
        brand: shoe.brand,
        Likes: shoe.Likes
      }))
    });
  } catch (err) {
    console.error("GET /api/auth/user error:", err);
    return NextResponse.json({ error: "Something went wrong", details: err.message }, { status: 500 });
  }
}
