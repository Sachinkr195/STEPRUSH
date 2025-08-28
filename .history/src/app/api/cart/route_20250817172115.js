import order from "@/models/order";
import {jwt} from 'jsonwebtoken'
import user from "@/models/user";
import { connectdb } from "@/lib/db";



export async default GET(req){
    connectdb()
    const headers = req.headers.get('authorization');
    const token = headers.split[' '][1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const person = user.
}