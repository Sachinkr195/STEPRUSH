import { connectdb } from "@/lib/db";
import seller from "@/models/seller";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function POST(req) {
  await connectdb();
  const { action, name, email, password } = await req.json();

  if (action === "register") {
    const existingUser = await seller.findOne({email});
    if(existingUser){
        return new Response(JSON.stringify({error: "User already exists"}))
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new seller({ name, email, password: hashedpassword });
    
    await user.save();
    return new Response(JSON.stringify({ message: "Registered" }), { status: 201 });
  }

  if (action === "login") {
  const user = await seller.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ error: "Invalid Credentials" }), { status: 401 });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return new Response(JSON.stringify({ message: "Logged in", token }), { status: 200 });
}

  return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
}


