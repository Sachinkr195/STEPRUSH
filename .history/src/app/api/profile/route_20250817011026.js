import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectdb } from "@/lib/db";
import user from "@/models/user";
// Middleware to verify JWT
async function getUserFromToken(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // we assume token contains { id: userId }
  } catch (err) {
    return null;
  }
}

// GET profile
export async function GET(req) {
  await connectdb();
  const userId = await getUserFromToken(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await user.findById(userId).select("-password");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// UPDATE profile
export async function PUT(req) {
  await connectdb();
  const userId = await getUserFromToken(req);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { profileImg, address } = body;

    const updatedUser = await userser.findByIdAndUpdate(
      userId,
      {
        profileImg,
        address,
      },
      { new: true }
    ).select("-password");

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
