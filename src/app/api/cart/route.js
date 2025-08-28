import jwt from "jsonwebtoken";
import order from "@/models/order";
import { connectdb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectdb();

    // Get token from headers
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch all orders of logged-in user
    const orders = await order.find({ userId: decoded.id });

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid token or server error" }, { status: 500 });
  }
}
