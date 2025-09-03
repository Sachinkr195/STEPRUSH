import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/db';
import Order from '@/models/order';
import Product from '@/models/product'; // ✅ Use your product model

export async function POST(req) {
  try {
    await connectdb();

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const body = await req.json();
    const { userid, username, item, address, total } = body;

    // 1️⃣ Create Order
    const order = await Order.create({
      userId: userid,
      username,
      address,
      items: [item],
      totalAmount: total,
      paymentStatus: 'Pending',
      status: 'Pending',
    });

    // 2️⃣ Find Product
    const product = await Product.findById(item.shoeId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // 3️⃣ Find Variant (color)
    const variant = product.variants.find(v => v.color === item.variantColor);
    if (!variant) {
      return NextResponse.json({ error: 'Variant not found' }, { status: 404 });
    }

    // 4️⃣ Find SizeStock entry
    const sizeEntry = variant.sizeStock.find(s => s.size === item.size);
    if (!sizeEntry) {
      return NextResponse.json({ error: 'Size not found' }, { status: 404 });
    }

    // 5️⃣ Check and Update Stock
    if (sizeEntry.stock < item.quantity) {
      return NextResponse.json({ error: 'Not enough stock' }, { status: 400 });
    }

    sizeEntry.stock -= item.quantity; // Reduce stock
    product.sold += item.quantity; // Increment sold count

    await product.save();

    return NextResponse.json({ message: 'Order placed successfully!', order }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
