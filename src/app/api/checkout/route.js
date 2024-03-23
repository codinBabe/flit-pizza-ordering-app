import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);

    const { cartItems, details } = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const orderDoc = await Order.create({
        userEmail,
        ...details,
        cartItems,
        paid: false,
    });

    return Response.json({ ...details });
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const { _id } = await req.json();

    await Order.findByIdAndUpdate(_id, { paid: true })
    return Response.json(true);
}