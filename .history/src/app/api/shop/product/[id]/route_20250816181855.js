import { connectdb } from "@/lib/db";
import shoes from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectdb();
    const { id } = params;
    const shoeData = await shoes.findById(id);

    if (!shoeData) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(shoeData);
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong", details: err.message },
      { status: 500 }
    );
  }
}
