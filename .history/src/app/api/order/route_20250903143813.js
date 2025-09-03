import { connectdb } from "@/lib/db";
import order from "@/models/order";
import jwt f

connectdb();

export async function POST(req) {
    const authheader = req.headers.get('authorization');
    const token = authheader.split(' ')[1];
    

}