import order from "@/models/order";
import {jwt} from 'jsonwebtoken'
import user from "@/models/user";



export async default GET(req){
    const headers = req.headers.get('authorization');
    const token = headers.split[' '][1]
}