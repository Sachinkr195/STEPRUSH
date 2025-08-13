import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Shoe from '@/models/product';
import Seller from '@/models/seller'; // make sure this model exists
import { connectdb } from '@/lib/db';
export async function GET(req) {
  try {
    await connectdb();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sellerId = decoded.id;

    // Fetch seller info
    const seller = await Seller.findById(sellerId).select("name profileImg");

    if (!seller) return NextResponse.json({ error: "Seller not found" }, { status: 404 });

    // Fetch all shoes from that seller
    const shoes = await Shoe.find({ sellerId });

    return NextResponse.json({
      seller: {
        name: seller.name,
        profileImg: seller.profileImg,
      },
      shoes,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
