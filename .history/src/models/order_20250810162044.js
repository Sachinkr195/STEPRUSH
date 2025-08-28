import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      shoeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shoe' },
      variantColor: String,
      size: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered
  paymentStatus: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Orders || mongoose.model("Orders", OrderSchema);