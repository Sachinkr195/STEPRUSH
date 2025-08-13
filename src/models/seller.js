import mongoose from "mongoose";

const SellerSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: {type:String, unique: true},
    image: String,
    provider: {type: String, default: "credentials"}
});

export default mongoose.models.Seller || mongoose.model("Seller", SellerSchema)