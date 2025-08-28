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

     return NextResponse.json(person.address,person)
}


