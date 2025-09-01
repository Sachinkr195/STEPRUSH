import shoes from "@/models/product";
import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";
import user from "@/models/user";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectdb();
    const token = req.headers.get("authorization")?.split(" ")[1];

    let userData = null; // 👈 Default: no profile
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        userData = await user.findById(userId).select("name profileImg email");
      } catch {
        // Token invalid: ignore, return null user
        userData = null;
      }
    }

    // ✅ Shoes are always fetched, even if not logged in
    const shoesData = await shoes.find().sort({ createdAt: -1 });

    return NextResponse.json({
      user: userData, // null if not logged in
      shoes: shoesData.map((shoe) => ({
        id: shoe._id,
        name: shoe.name,
        price: shoe.price,
        discount: shoe.discount,
        sold: shoe.sold,
        img: shoe.variants?.[0]?.img || null,
        category: shoe.category,
        description: shoe.description,
        brand: shoe.brand,
        Likes: shoe.Likes,
      })),
    });
  } catch (err) {
    console.error("GET /api/auth/user error:", err);
    return NextResponse.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  }
}
