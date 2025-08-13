import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server"; // ✅ Proper response for Next.js API routes
import Shoe from "@/models/product"; // ✅ Capitalize model
import { connectdb } from "@/lib/db";


export async function POST(req) {
  await connectdb();
  try {
    const authheader = req.headers.get("Authorization");

    if (!authheader) {
      return NextResponse.json({ message: "Unauthorized access" }, { status: 401 });
    }

    const token = authheader.split(" ")[1]; // ✅ Correct split
    const secret = process.env.JWT_SECRET;

    if (!token || !secret) {
      return NextResponse.json({ message: "Missing token or secret" }, { status: 500 });
    }

    const decoded = jwt.verify(token, secret); // ✅ Decode token

    const data = await req.json();
    
    if(!data.name || !data.description || !data.brand || !data.category || !data.price || !data.variants){
      return NextResponse.json({message: "All fields are required"}, {status: 400})
    }
    
    const newShoe = new Shoe({
      name: data.name,
      description: data.description,
      brand: data.brand,
      category: data.category,
      price: data.price,
      discount: data.discount,
      variants: data.variants, // ✅ fixed typo from 'variant' to 'variants'
      sellerId: decoded.id,
    });
    
    if(await newShoe.save()){
      return NextResponse.json({ message: "Shoe successfully saved"})
    }else{
      return NextResponse.json({ message: "failed to save shoe"})
    }
    

    
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
