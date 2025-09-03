import User from "@/models/user";
import Order from "@/models/order";
import {connectdb} from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// GET: Get user profile
export async function GET(req) {
  try {
    await connectdb();
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const person = await User.findById(decoded.id);
    if (!person) {
      return NextResponse.json({ error: "No user found" }, { status: 404 });
    }

    return NextResponse.json({
      address: person.address,
      name: person.name,
      id: person.id,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Place an order
export async function POST(req) {
  try {
    await connectdb();
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const body = await req.json();
    const { userid, username, item, address, total } = body;

    // Make sure user exists
    const user = await User.findById(userid);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newOrder = new Order({
      userId: userid,
      username,
      items: [item],
      address,
      total,
      status: "Pending",
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Order placed successfully", order: newOrder },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
