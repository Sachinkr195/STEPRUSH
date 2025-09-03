import { connectdb } from "@/lib/db";
import order from "@/models/order";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import user from "@/models/user";

connectdb();

export async function POST(req) {
    const authheader = req.headers.get('authorization');
    const token = authheader.split(' ')[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const person = await user.findById(decoded);
    if(!person){
        return NextResponse.json({error: 'no user found'})
    }
    const body = await req.json();
    const {userid,username,item,address,total} = body;
    const new


}