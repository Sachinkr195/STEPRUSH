import { connectdb } from "@/lib/db";
import order from "@/models/order";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

connectdb();

export async function POST(req) {
    const authheader = req.headers.get('authorization');
    const token = authheader.split(' ')[1];

}