import user from "@/models/user";
import { connectdb } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectdb();
    const { action, name, email, password, image } = await req.json();

    // REGISTER
    if (action === "register") {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            profileImg: image || "/profile.jpg"
        });
        await newUser.save();
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    }

    // LOGIN
    if (action === "login") { // lowercase for consistency
        const User = await user.findOne({ email });
        if (!User) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        const token = jwt.sign(
            { id: User._id, email: User.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return NextResponse.json({ message: "Logged in successfully", token }, { status: 200 });
    }

    // If action is invalid
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
