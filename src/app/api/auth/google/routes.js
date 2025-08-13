import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectDb } from "@/lib/db";
import seller from "@/models/seller";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks:{
        async signIn({user}){
            await connectDb();
            const existingUser = await seller.findOne({email:user.email});
            if(!existingUser){
                await seller.create({
                    name:user.name,
                    email: user.email,
                    image : user.image,
                    provider: "google"
                })
            }
            return true;
        },
        async session({session}){
            return session;
        }
    }
})

export { handler as Get, handler as POST}