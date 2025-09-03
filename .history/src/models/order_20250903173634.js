import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: {String},
    Phone: {Number},
  items: [
    {
      shoeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shoe' },
      variantColor: String,
      size: String,
      quantity: Number,
      price: Number,
      img : String,
      Name: String
     
    }
  ],
  address: 
    {
      street: String,
      city: String,
      state: String,
      postalCode: String
    },
  totalAmount: Number,
  status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered
  paymentStatus: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Orders || mongoose.model("Orders", OrderSchema);