import order from "@/models/order";
import user from "@/models/user";
import { connectdb } from "@/lib/db";
import { headers } from "next/headers";

export async function GET(req){
    const token = req.headers.get()
}

