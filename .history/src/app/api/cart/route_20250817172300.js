import order from "@/models/order";
import {jwt} from 'jsonwebtoken'
import user from "@/models/user";
import { connectdb } from "@/lib/db";



export async default GET(req){
    await connectdb()
    const headers = req.headers.get('authorization');
    const token = headers.split[' '][1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const orders = order.findById(decoded);
    if(!orders){
        return NextRequest
    }
}