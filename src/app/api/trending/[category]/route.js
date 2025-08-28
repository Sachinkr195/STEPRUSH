import { connectdb } from "@/lib/db";
import shoes from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectdb();
    const { category } = params;

    // get top 10 shoes by category, sorted by rating or createdAt
    const trendingShoes = await shoes
      .find({ category: category })
      .sort({ rating: -1, createdAt: -1 })
      .limit(10);

    if (!trendingShoes || trendingShoes.length === 0) {
      return NextResponse.json(
        { message: "No trending shoes found for this category." },
        { status: 404 }
      );
    }

    return NextResponse.json(trendingShoes);
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  }
}
