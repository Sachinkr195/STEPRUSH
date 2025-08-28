import order from "@/models/order";
import user from "@/models/user";
import { connectdb } from "@/lib/db";
import { headers } from "next/headers";
import 

export async function GET(req){
    const authheader = req.headers.get('authorization');
    const token = authheader.split(' ')[1];

    const decodedid = 

}

