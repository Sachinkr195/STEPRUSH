import order from "@/models/order";
import user from "@/models/user";
import { connectdb } from "@/lib/db";
import {jwt} from 'jsonwebtoken'
import { NextResponse } from "next/server";

export async function GET(req){
    await connectdb();
    const authheader = req.headers.get('authorization');
    const token = authheader.split(' ')[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const person = await user.findById(decoded);
     
     if(!user){
        return NextResponse.json({error: 'no user found'})
     }

     return NextResponse.json(person.address,person.name,person.id)
}

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

    // make sure user exists
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
      status: "Pending"
    });

    await newOrder.save();

    return NextResponse.json({ message: "Order placed successfully", order: newOrder }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }


