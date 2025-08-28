import order from "@/models/order";
import user from "@/models/user";
import { connectdb } from "@/lib/db";
import { headers } from "next/headers";
import {jsonwebtoken} from 'jwt'
import { NextResponse } from "next/server";

export async function GET(req){
    const authheader = req.headers.get('authorization');
    const token = authheader.split(' ')[1];

    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await user.findById(decoded);
     
     if(!user){
        return NextResponse.json({error: 'no user found'})
     }

     return NextResponse.json(user)



}

